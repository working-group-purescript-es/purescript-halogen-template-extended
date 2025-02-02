-- | See comments in purescript-halogen-realworld (RHW)'s `Conduit.Component.Router` module:
-- | https://github.com/thomashoneyman/purescript-halogen-realworld/blob/main/src/Component/Router.purs

module App.Component.Router where

import Prologue

import Halogen as H
import Halogen.HTML as HH
import Halogen.Store.Connect as HSC
import Halogen.Store.Select as HSS
import Halogen.Store.Monad (class MonadStore)
import Halogen.Store.Monad as HSM
import Routing.Duplex as RD
import Routing.Hash as RH

import App.Capability.Navigate (class MonadNavigate)
import App.Capability.Navigate as Navigate
import App.Capability.Log (class MonadLog, logMessage)
import App.Capability.Resource.User (class MonadUser)
import App.Component.HTML.Navbar (navbarPageWrapper)
import App.Data.Profile (Profile)
import App.Data.Route (Route(..), routeCodec)
import App.Page.Home as Home
import App.Page.Login as Login
import App.Page.Secrets as Secrets
import App.Store as Store
import App.Store (Store)

data Query a = Navigate Route a

type Context = Maybe Profile
type Input  = Unit
type ConnectedInput = HSC.Connected Context Input

type State =
  { route :: Maybe Route
  , messageLog :: Array String
  , currentUser :: Maybe Profile
  }

data Action
  = Initialize
  | Receive { input :: Input, context :: Context } -- i.e. `Receive ConnectedInput`
  | UpdateMessageLog (Array String)

type ChildSlots =
  ( home     :: Home.Slot
  , login    :: Login.Slot
  , secrets  :: Secrets.Slot
  )

component
  :: forall o m
   . MonadEffect m
  => MonadLog m
  => MonadNavigate m
  => MonadUser m
  => MonadStore Store.Action Store m
  => H.Component Query Input o m
component =
  HSC.connect (HSS.selectEq _.currentUser) $
    H.mkComponent { initialState, render, eval }
  where
    eval
      :: H.HalogenQ Query Action ConnectedInput
      ~> H.HalogenM State Action ChildSlots o m
    eval = H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , initialize = Just Initialize
      , receive = (Just <<< Receive) :: ConnectedInput -> Maybe Action
      }
    
    initialState :: ConnectedInput -> State
    initialState = \{ context: currentUser } ->
      { route: Nothing
      , messageLog: []
      , currentUser
      }
  
    handleAction
      :: Action
      -> H.HalogenM State Action ChildSlots o m Unit
    handleAction = case _ of

      Initialize -> do
        -- Example of subscribing to changes in the `Store`
        -- by creating an emitter (instead of using `connect`
        -- to Receive updates from the store).
        newLogEmitter <- HSM.emitSelected (HSS.selectEq _.recentMessageLog)
        void $ H.subscribe (UpdateMessageLog <$> newLogEmitter)

        -- Handles setting of the initial route on app startup. All
        -- subsequent route changes handled through `Navigate`
        -- query sent by driver in `main`
        initialRoute <- hush <<< RD.parse routeCodec <$> H.liftEffect RH.getHash
        Navigate.navigate $ fromMaybe Home initialRoute
        
      Receive connectedInput ->
        Store.updateLocalState connectedInput

      UpdateMessageLog newLog -> do
        currentLog <- H.gets _.messageLog
        when (newLog /= currentLog) do
          H.modify_ _ { messageLog = newLog }

    handleQuery
      :: forall a
       . Query a 
      -> H.HalogenM State Action ChildSlots o m ( Maybe a )
    handleQuery = case _ of
      
      Navigate newRoute a -> do
        -- This query runs every time the brower's hash route changes,
        -- sent down by `matchesWith` in `main`. Also logs the route
        -- change to a fake console.
        maybeOldRoute <- H.gets _.route
        when (maybeOldRoute /= Just newRoute) do
          H.modify_ _ { route = Just newRoute }
          logMessage $ displayRouteChange maybeOldRoute newRoute      
        pure ( Just a )
        
      where
        displayRouteChange :: Maybe Route -> Route -> String
        displayRouteChange = case _, _ of
          Nothing, new ->
            "Setting initial route to /#" <> RD.print routeCodec new
          Just old, new ->
               "Changing route from /#" <> RD.print routeCodec old
            <> " to /#" <> RD.print routeCodec new

    -- | Renders a page component depending on which route is matched.
    render :: State -> H.ComponentHTML Action ChildSlots m
    render state@{ route, currentUser } =
      navbarPageWrapper state $ case route of
        Nothing ->
          HH.h1_ [ HH.text "Oh no! That page wasn't found" ]
        Just Home ->
          HH.slot_ (Proxy :: _ "home") unit Home.component unit
            
        Just Login ->
          HH.slot_ (Proxy :: _ "login") unit Login.component ({ redirect: true } :: Login.Input)
            
        Just Secrets ->
          authorize currentUser $
            HH.slot_ (Proxy :: _ "secrets") unit Secrets.component unit
          
      where
        authorize
          :: Maybe Profile
          -> H.ComponentHTML Action ChildSlots m
          -> H.ComponentHTML Action ChildSlots m
        authorize mbProfile html = case mbProfile of
          Nothing ->
            HH.slot_ (Proxy :: _ "login") unit Login.component { redirect: false }
          Just _ ->
            html
