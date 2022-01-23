(() => {
  // bundles/purs/index.js
  var PS = {};
  (function($PS) {
    "use strict";
    $PS["Control.Monad.Trans.Class"] = $PS["Control.Monad.Trans.Class"] || {};
    var exports = $PS["Control.Monad.Trans.Class"];
    var lift = function(dict) {
      return dict.lift;
    };
    exports["lift"] = lift;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Semigroupoid"] = $PS["Control.Semigroupoid"] || {};
    var exports = $PS["Control.Semigroupoid"];
    var semigroupoidFn = {
      compose: function(f) {
        return function(g) {
          return function(x) {
            return f(g(x));
          };
        };
      }
    };
    var compose = function(dict) {
      return dict.compose;
    };
    exports["compose"] = compose;
    exports["semigroupoidFn"] = semigroupoidFn;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Category"] = $PS["Control.Category"] || {};
    var exports = $PS["Control.Category"];
    var Control_Semigroupoid = $PS["Control.Semigroupoid"];
    var identity = function(dict) {
      return dict.identity;
    };
    var categoryFn = {
      identity: function(x) {
        return x;
      },
      Semigroupoid0: function() {
        return Control_Semigroupoid.semigroupoidFn;
      }
    };
    exports["identity"] = identity;
    exports["categoryFn"] = categoryFn;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Function"] = $PS["Data.Function"] || {};
    var exports = $PS["Data.Function"];
    var flip = function(f) {
      return function(b) {
        return function(a) {
          return f(a)(b);
        };
      };
    };
    var $$const = function(a) {
      return function(v) {
        return a;
      };
    };
    var applyFlipped = function(x) {
      return function(f) {
        return f(x);
      };
    };
    exports["flip"] = flip;
    exports["const"] = $$const;
    exports["applyFlipped"] = applyFlipped;
  })(PS);
  (function(exports) {
    "use strict";
    exports.arrayMap = function(f) {
      return function(arr) {
        var l = arr.length;
        var result = new Array(l);
        for (var i = 0; i < l; i++) {
          result[i] = f(arr[i]);
        }
        return result;
      };
    };
  })(PS["Data.Functor"] = PS["Data.Functor"] || {});
  (function(exports) {
    "use strict";
    exports.unit = {};
  })(PS["Data.Unit"] = PS["Data.Unit"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.Unit"] = $PS["Data.Unit"] || {};
    var exports = $PS["Data.Unit"];
    var $foreign = $PS["Data.Unit"];
    exports["unit"] = $foreign.unit;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Functor"] = $PS["Data.Functor"] || {};
    var exports = $PS["Data.Functor"];
    var $foreign = $PS["Data.Functor"];
    var Control_Semigroupoid = $PS["Control.Semigroupoid"];
    var Data_Function = $PS["Data.Function"];
    var Data_Unit = $PS["Data.Unit"];
    var map = function(dict) {
      return dict.map;
    };
    var $$void = function(dictFunctor) {
      return map(dictFunctor)(Data_Function["const"](Data_Unit.unit));
    };
    var voidLeft = function(dictFunctor) {
      return function(f) {
        return function(x) {
          return map(dictFunctor)(Data_Function["const"](x))(f);
        };
      };
    };
    var voidRight = function(dictFunctor) {
      return function(x) {
        return map(dictFunctor)(Data_Function["const"](x));
      };
    };
    var functorFn = {
      map: Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn)
    };
    var functorArray = {
      map: $foreign.arrayMap
    };
    exports["map"] = map;
    exports["void"] = $$void;
    exports["voidRight"] = voidRight;
    exports["voidLeft"] = voidLeft;
    exports["functorFn"] = functorFn;
    exports["functorArray"] = functorArray;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Apply"] = $PS["Control.Apply"] || {};
    var exports = $PS["Control.Apply"];
    var Control_Category = $PS["Control.Category"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var applyFn = {
      apply: function(f) {
        return function(g) {
          return function(x) {
            return f(x)(g(x));
          };
        };
      },
      Functor0: function() {
        return Data_Functor.functorFn;
      }
    };
    var apply = function(dict) {
      return dict.apply;
    };
    var applyFirst = function(dictApply) {
      return function(a) {
        return function(b) {
          return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"])(a))(b);
        };
      };
    };
    var applySecond = function(dictApply) {
      return function(a) {
        return function(b) {
          return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"](Control_Category.identity(Control_Category.categoryFn)))(a))(b);
        };
      };
    };
    exports["apply"] = apply;
    exports["applyFirst"] = applyFirst;
    exports["applySecond"] = applySecond;
    exports["applyFn"] = applyFn;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Applicative"] = $PS["Control.Applicative"] || {};
    var exports = $PS["Control.Applicative"];
    var Control_Apply = $PS["Control.Apply"];
    var Data_Unit = $PS["Data.Unit"];
    var pure = function(dict) {
      return dict.pure;
    };
    var unless = function(dictApplicative) {
      return function(v) {
        return function(v1) {
          if (!v) {
            return v1;
          }
          ;
          if (v) {
            return pure(dictApplicative)(Data_Unit.unit);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative (line 66, column 1 - line 66, column 65): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    };
    var when = function(dictApplicative) {
      return function(v) {
        return function(v1) {
          if (v) {
            return v1;
          }
          ;
          if (!v) {
            return pure(dictApplicative)(Data_Unit.unit);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative (line 61, column 1 - line 61, column 63): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    };
    var liftA1 = function(dictApplicative) {
      return function(f) {
        return function(a) {
          return Control_Apply.apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
        };
      };
    };
    exports["pure"] = pure;
    exports["liftA1"] = liftA1;
    exports["unless"] = unless;
    exports["when"] = when;
  })(PS);
  (function(exports) {
    "use strict";
    var refEq = function(r1) {
      return function(r2) {
        return r1 === r2;
      };
    };
    exports.eqBooleanImpl = refEq;
    exports.eqIntImpl = refEq;
    exports.eqStringImpl = refEq;
    exports.eqArrayImpl = function(f) {
      return function(xs) {
        return function(ys) {
          if (xs.length !== ys.length)
            return false;
          for (var i = 0; i < xs.length; i++) {
            if (!f(xs[i])(ys[i]))
              return false;
          }
          return true;
        };
      };
    };
  })(PS["Data.Eq"] = PS["Data.Eq"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.Symbol"] = $PS["Data.Symbol"] || {};
    var exports = $PS["Data.Symbol"];
    var reflectSymbol = function(dict) {
      return dict.reflectSymbol;
    };
    exports["reflectSymbol"] = reflectSymbol;
  })(PS);
  (function(exports) {
    "use strict";
    exports.unsafeGet = function(label) {
      return function(rec) {
        return rec[label];
      };
    };
  })(PS["Record.Unsafe"] = PS["Record.Unsafe"] || {});
  (function($PS) {
    "use strict";
    $PS["Record.Unsafe"] = $PS["Record.Unsafe"] || {};
    var exports = $PS["Record.Unsafe"];
    var $foreign = $PS["Record.Unsafe"];
    exports["unsafeGet"] = $foreign.unsafeGet;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Type.Proxy"] = $PS["Type.Proxy"] || {};
    var exports = $PS["Type.Proxy"];
    var $$Proxy = function() {
      function $$Proxy2() {
      }
      ;
      $$Proxy2.value = new $$Proxy2();
      return $$Proxy2;
    }();
    exports["Proxy"] = $$Proxy;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Eq"] = $PS["Data.Eq"] || {};
    var exports = $PS["Data.Eq"];
    var $foreign = $PS["Data.Eq"];
    var Data_Symbol = $PS["Data.Symbol"];
    var Record_Unsafe = $PS["Record.Unsafe"];
    var Type_Proxy = $PS["Type.Proxy"];
    var eqUnit = {
      eq: function(v) {
        return function(v1) {
          return true;
        };
      }
    };
    var eqString = {
      eq: $foreign.eqStringImpl
    };
    var eqRowNil = {
      eqRecord: function(v) {
        return function(v1) {
          return function(v2) {
            return true;
          };
        };
      }
    };
    var eqRecord = function(dict) {
      return dict.eqRecord;
    };
    var eqRec = function(dictRowToList) {
      return function(dictEqRecord) {
        return {
          eq: eqRecord(dictEqRecord)(Type_Proxy["Proxy"].value)
        };
      };
    };
    var eqInt = {
      eq: $foreign.eqIntImpl
    };
    var eqBoolean = {
      eq: $foreign.eqBooleanImpl
    };
    var eq = function(dict) {
      return dict.eq;
    };
    var eqArray = function(dictEq) {
      return {
        eq: $foreign.eqArrayImpl(eq(dictEq))
      };
    };
    var eqRowCons = function(dictEqRecord) {
      return function(dictCons) {
        return function(dictIsSymbol) {
          return function(dictEq) {
            return {
              eqRecord: function(v) {
                return function(ra) {
                  return function(rb) {
                    var tail = eqRecord(dictEqRecord)(Type_Proxy["Proxy"].value)(ra)(rb);
                    var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Type_Proxy["Proxy"].value);
                    var get = Record_Unsafe.unsafeGet(key);
                    return eq(dictEq)(get(ra))(get(rb)) && tail;
                  };
                };
              }
            };
          };
        };
      };
    };
    var notEq = function(dictEq) {
      return function(x) {
        return function(y) {
          return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
        };
      };
    };
    exports["eq"] = eq;
    exports["notEq"] = notEq;
    exports["eqInt"] = eqInt;
    exports["eqString"] = eqString;
    exports["eqUnit"] = eqUnit;
    exports["eqArray"] = eqArray;
    exports["eqRec"] = eqRec;
    exports["eqRowNil"] = eqRowNil;
    exports["eqRowCons"] = eqRowCons;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Maybe"] = $PS["Data.Maybe"] || {};
    var exports = $PS["Data.Maybe"];
    var Control_Category = $PS["Control.Category"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Nothing = function() {
      function Nothing2() {
      }
      ;
      Nothing2.value = new Nothing2();
      return Nothing2;
    }();
    var Just = function() {
      function Just2(value0) {
        this.value0 = value0;
      }
      ;
      Just2.create = function(value0) {
        return new Just2(value0);
      };
      return Just2;
    }();
    var maybe = function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v;
          }
          ;
          if (v2 instanceof Just) {
            return v1(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 230, column 1 - line 230, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    };
    var isNothing = maybe(true)(Data_Function["const"](false));
    var isJust = maybe(false)(Data_Function["const"](true));
    var functorMaybe = {
      map: function(v) {
        return function(v1) {
          if (v1 instanceof Just) {
            return new Just(v(v1.value0));
          }
          ;
          return Nothing.value;
        };
      }
    };
    var fromMaybe = function(a) {
      return maybe(a)(Control_Category.identity(Control_Category.categoryFn));
    };
    var fromJust = function(dictPartial) {
      return function(v) {
        if (v instanceof Just) {
          return v.value0;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 281, column 1 - line 281, column 46): " + [v.constructor.name]);
      };
    };
    var eqMaybe = function(dictEq) {
      return {
        eq: function(x) {
          return function(y) {
            if (x instanceof Nothing && y instanceof Nothing) {
              return true;
            }
            ;
            if (x instanceof Just && y instanceof Just) {
              return Data_Eq.eq(dictEq)(x.value0)(y.value0);
            }
            ;
            return false;
          };
        }
      };
    };
    var applyMaybe = {
      apply: function(v) {
        return function(v1) {
          if (v instanceof Just) {
            return Data_Functor.map(functorMaybe)(v.value0)(v1);
          }
          ;
          if (v instanceof Nothing) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 68, column 1 - line 70, column 30): " + [v.constructor.name, v1.constructor.name]);
        };
      },
      Functor0: function() {
        return functorMaybe;
      }
    };
    var bindMaybe = {
      bind: function(v) {
        return function(v1) {
          if (v instanceof Just) {
            return v1(v.value0);
          }
          ;
          if (v instanceof Nothing) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 126, column 1 - line 128, column 28): " + [v.constructor.name, v1.constructor.name]);
        };
      },
      Apply0: function() {
        return applyMaybe;
      }
    };
    exports["Nothing"] = Nothing;
    exports["Just"] = Just;
    exports["maybe"] = maybe;
    exports["fromMaybe"] = fromMaybe;
    exports["isJust"] = isJust;
    exports["isNothing"] = isNothing;
    exports["fromJust"] = fromJust;
    exports["functorMaybe"] = functorMaybe;
    exports["bindMaybe"] = bindMaybe;
    exports["eqMaybe"] = eqMaybe;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Either"] = $PS["Data.Either"] || {};
    var exports = $PS["Data.Either"];
    var Data_Function = $PS["Data.Function"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Left = function() {
      function Left2(value0) {
        this.value0 = value0;
      }
      ;
      Left2.create = function(value0) {
        return new Left2(value0);
      };
      return Left2;
    }();
    var Right = function() {
      function Right2(value0) {
        this.value0 = value0;
      }
      ;
      Right2.create = function(value0) {
        return new Right2(value0);
      };
      return Right2;
    }();
    var either = function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return v(v2.value0);
          }
          ;
          if (v2 instanceof Right) {
            return v1(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    };
    var hush = either(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Maybe.Just.create);
    exports["Left"] = Left;
    exports["Right"] = Right;
    exports["either"] = either;
    exports["hush"] = hush;
  })(PS);
  (function(exports) {
    "use strict";
    exports.foldrArray = function(f) {
      return function(init) {
        return function(xs) {
          var acc = init;
          var len = xs.length;
          for (var i = len - 1; i >= 0; i--) {
            acc = f(xs[i])(acc);
          }
          return acc;
        };
      };
    };
    exports.foldlArray = function(f) {
      return function(init) {
        return function(xs) {
          var acc = init;
          var len = xs.length;
          for (var i = 0; i < len; i++) {
            acc = f(acc)(xs[i]);
          }
          return acc;
        };
      };
    };
  })(PS["Data.Foldable"] = PS["Data.Foldable"] || {});
  (function(exports) {
    "use strict";
    exports.boolConj = function(b1) {
      return function(b2) {
        return b1 && b2;
      };
    };
    exports.boolDisj = function(b1) {
      return function(b2) {
        return b1 || b2;
      };
    };
    exports.boolNot = function(b) {
      return !b;
    };
  })(PS["Data.HeytingAlgebra"] = PS["Data.HeytingAlgebra"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.HeytingAlgebra"] = $PS["Data.HeytingAlgebra"] || {};
    var exports = $PS["Data.HeytingAlgebra"];
    var $foreign = $PS["Data.HeytingAlgebra"];
    var tt = function(dict) {
      return dict.tt;
    };
    var not = function(dict) {
      return dict.not;
    };
    var implies = function(dict) {
      return dict.implies;
    };
    var ff = function(dict) {
      return dict.ff;
    };
    var disj = function(dict) {
      return dict.disj;
    };
    var heytingAlgebraBoolean = {
      ff: false,
      tt: true,
      implies: function(a) {
        return function(b) {
          return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
        };
      },
      conj: $foreign.boolConj,
      disj: $foreign.boolDisj,
      not: $foreign.boolNot
    };
    var conj = function(dict) {
      return dict.conj;
    };
    var heytingAlgebraFunction = function(dictHeytingAlgebra) {
      return {
        ff: function(v) {
          return ff(dictHeytingAlgebra);
        },
        tt: function(v) {
          return tt(dictHeytingAlgebra);
        },
        implies: function(f) {
          return function(g) {
            return function(a) {
              return implies(dictHeytingAlgebra)(f(a))(g(a));
            };
          };
        },
        conj: function(f) {
          return function(g) {
            return function(a) {
              return conj(dictHeytingAlgebra)(f(a))(g(a));
            };
          };
        },
        disj: function(f) {
          return function(g) {
            return function(a) {
              return disj(dictHeytingAlgebra)(f(a))(g(a));
            };
          };
        },
        not: function(f) {
          return function(a) {
            return not(dictHeytingAlgebra)(f(a));
          };
        }
      };
    };
    exports["ff"] = ff;
    exports["disj"] = disj;
    exports["not"] = not;
    exports["heytingAlgebraBoolean"] = heytingAlgebraBoolean;
    exports["heytingAlgebraFunction"] = heytingAlgebraFunction;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Monoid"] = $PS["Data.Monoid"] || {};
    var exports = $PS["Data.Monoid"];
    var mempty = function(dict) {
      return dict.mempty;
    };
    exports["mempty"] = mempty;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Monoid.Disj"] = $PS["Data.Monoid.Disj"] || {};
    var exports = $PS["Data.Monoid.Disj"];
    var Data_HeytingAlgebra = $PS["Data.HeytingAlgebra"];
    var Disj = function(x) {
      return x;
    };
    var semigroupDisj = function(dictHeytingAlgebra) {
      return {
        append: function(v) {
          return function(v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
          };
        }
      };
    };
    var monoidDisj = function(dictHeytingAlgebra) {
      return {
        mempty: Data_HeytingAlgebra.ff(dictHeytingAlgebra),
        Semigroup0: function() {
          return semigroupDisj(dictHeytingAlgebra);
        }
      };
    };
    exports["Disj"] = Disj;
    exports["monoidDisj"] = monoidDisj;
  })(PS);
  (function(exports) {
    "use strict";
    exports.unsafeCoerce = function(x) {
      return x;
    };
  })(PS["Unsafe.Coerce"] = PS["Unsafe.Coerce"] || {});
  (function($PS) {
    "use strict";
    $PS["Unsafe.Coerce"] = $PS["Unsafe.Coerce"] || {};
    var exports = $PS["Unsafe.Coerce"];
    var $foreign = $PS["Unsafe.Coerce"];
    exports["unsafeCoerce"] = $foreign.unsafeCoerce;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Safe.Coerce"] = $PS["Safe.Coerce"] || {};
    var exports = $PS["Safe.Coerce"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var coerce = function(dictCoercible) {
      return Unsafe_Coerce.unsafeCoerce;
    };
    exports["coerce"] = coerce;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Newtype"] = $PS["Data.Newtype"] || {};
    var exports = $PS["Data.Newtype"];
    var Safe_Coerce = $PS["Safe.Coerce"];
    var unwrap = function(dictNewtype) {
      return Safe_Coerce.coerce();
    };
    var over = function(dictNewtype) {
      return function(dictNewtype1) {
        return function(v) {
          return Safe_Coerce.coerce();
        };
      };
    };
    var alaF = function(dictCoercible) {
      return function(dictCoercible1) {
        return function(dictNewtype) {
          return function(dictNewtype1) {
            return function(v) {
              return Safe_Coerce.coerce();
            };
          };
        };
      };
    };
    exports["unwrap"] = unwrap;
    exports["alaF"] = alaF;
    exports["over"] = over;
  })(PS);
  (function(exports) {
    "use strict";
    exports.concatString = function(s1) {
      return function(s2) {
        return s1 + s2;
      };
    };
    exports.concatArray = function(xs) {
      return function(ys) {
        if (xs.length === 0)
          return ys;
        if (ys.length === 0)
          return xs;
        return xs.concat(ys);
      };
    };
  })(PS["Data.Semigroup"] = PS["Data.Semigroup"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.Semigroup"] = $PS["Data.Semigroup"] || {};
    var exports = $PS["Data.Semigroup"];
    var $foreign = $PS["Data.Semigroup"];
    var semigroupString = {
      append: $foreign.concatString
    };
    var semigroupArray = {
      append: $foreign.concatArray
    };
    var append = function(dict) {
      return dict.append;
    };
    exports["append"] = append;
    exports["semigroupString"] = semigroupString;
    exports["semigroupArray"] = semigroupArray;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Foldable"] = $PS["Data.Foldable"] || {};
    var exports = $PS["Data.Foldable"];
    var $foreign = $PS["Data.Foldable"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Apply = $PS["Control.Apply"];
    var Data_Either = $PS["Data.Either"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Function = $PS["Data.Function"];
    var Data_HeytingAlgebra = $PS["Data.HeytingAlgebra"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Monoid = $PS["Data.Monoid"];
    var Data_Monoid_Disj = $PS["Data.Monoid.Disj"];
    var Data_Newtype = $PS["Data.Newtype"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Data_Unit = $PS["Data.Unit"];
    var foldr = function(dict) {
      return dict.foldr;
    };
    var traverse_ = function(dictApplicative) {
      return function(dictFoldable) {
        return function(f) {
          return foldr(dictFoldable)(function() {
            var $316 = Control_Apply.applySecond(dictApplicative.Apply0());
            return function($317) {
              return $316(f($317));
            };
          }())(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
        };
      };
    };
    var for_ = function(dictApplicative) {
      return function(dictFoldable) {
        return Data_Function.flip(traverse_(dictApplicative)(dictFoldable));
      };
    };
    var foldl = function(dict) {
      return dict.foldl;
    };
    var indexl = function(dictFoldable) {
      return function(idx) {
        var go = function(cursor) {
          return function(a) {
            if (cursor.elem instanceof Data_Maybe.Just) {
              return cursor;
            }
            ;
            var $157 = cursor.pos === idx;
            if ($157) {
              return {
                elem: new Data_Maybe.Just(a),
                pos: cursor.pos
              };
            }
            ;
            return {
              pos: cursor.pos + 1 | 0,
              elem: cursor.elem
            };
          };
        };
        var $318 = foldl(dictFoldable)(go)({
          elem: Data_Maybe.Nothing.value,
          pos: 0
        });
        return function($319) {
          return function(v) {
            return v.elem;
          }($318($319));
        };
      };
    };
    var foldableMaybe = {
      foldr: function(v) {
        return function(z) {
          return function(v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
              return z;
            }
            ;
            if (v1 instanceof Data_Maybe.Just) {
              return v(v1.value0)(z);
            }
            ;
            throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
          };
        };
      },
      foldl: function(v) {
        return function(z) {
          return function(v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
              return z;
            }
            ;
            if (v1 instanceof Data_Maybe.Just) {
              return v(z)(v1.value0);
            }
            ;
            throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
          };
        };
      },
      foldMap: function(dictMonoid) {
        return function(v) {
          return function(v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
              return Data_Monoid.mempty(dictMonoid);
            }
            ;
            if (v1 instanceof Data_Maybe.Just) {
              return v(v1.value0);
            }
            ;
            throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
          };
        };
      }
    };
    var foldableEither = {
      foldr: function(v) {
        return function(z) {
          return function(v1) {
            if (v1 instanceof Data_Either.Left) {
              return z;
            }
            ;
            if (v1 instanceof Data_Either.Right) {
              return v(v1.value0)(z);
            }
            ;
            throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
          };
        };
      },
      foldl: function(v) {
        return function(z) {
          return function(v1) {
            if (v1 instanceof Data_Either.Left) {
              return z;
            }
            ;
            if (v1 instanceof Data_Either.Right) {
              return v(z)(v1.value0);
            }
            ;
            throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
          };
        };
      },
      foldMap: function(dictMonoid) {
        return function(v) {
          return function(v1) {
            if (v1 instanceof Data_Either.Left) {
              return Data_Monoid.mempty(dictMonoid);
            }
            ;
            if (v1 instanceof Data_Either.Right) {
              return v(v1.value0);
            }
            ;
            throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name]);
          };
        };
      }
    };
    var foldMapDefaultR = function(dictFoldable) {
      return function(dictMonoid) {
        return function(f) {
          return foldr(dictFoldable)(function(x) {
            return function(acc) {
              return Data_Semigroup.append(dictMonoid.Semigroup0())(f(x))(acc);
            };
          })(Data_Monoid.mempty(dictMonoid));
        };
      };
    };
    var foldableArray = {
      foldr: $foreign.foldrArray,
      foldl: $foreign.foldlArray,
      foldMap: function(dictMonoid) {
        return foldMapDefaultR(foldableArray)(dictMonoid);
      }
    };
    var foldMap = function(dict) {
      return dict.foldMap;
    };
    var any = function(dictFoldable) {
      return function(dictHeytingAlgebra) {
        return Data_Newtype.alaF()()()()(Data_Monoid_Disj.Disj)(foldMap(dictFoldable)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra)));
      };
    };
    var elem = function(dictFoldable) {
      return function(dictEq) {
        var $326 = any(dictFoldable)(Data_HeytingAlgebra.heytingAlgebraBoolean);
        var $327 = Data_Eq.eq(dictEq);
        return function($328) {
          return $326($327($328));
        };
      };
    };
    exports["foldr"] = foldr;
    exports["foldl"] = foldl;
    exports["foldMap"] = foldMap;
    exports["traverse_"] = traverse_;
    exports["for_"] = for_;
    exports["indexl"] = indexl;
    exports["foldableArray"] = foldableArray;
    exports["foldableMaybe"] = foldableMaybe;
    exports["foldableEither"] = foldableEither;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.List.Types"] = $PS["Data.List.Types"] || {};
    var exports = $PS["Data.List.Types"];
    var Control_Apply = $PS["Control.Apply"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Monoid = $PS["Data.Monoid"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Nil = function() {
      function Nil2() {
      }
      ;
      Nil2.value = new Nil2();
      return Nil2;
    }();
    var Cons = function() {
      function Cons2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Cons2.create = function(value0) {
        return function(value1) {
          return new Cons2(value0, value1);
        };
      };
      return Cons2;
    }();
    var NonEmptyList = function(x) {
      return x;
    };
    var listMap = function(f) {
      var chunkedRevMap = function($copy_chunksAcc) {
        return function($copy_v) {
          var $tco_var_chunksAcc = $copy_chunksAcc;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(chunksAcc, v) {
            if (v instanceof Cons && (v.value1 instanceof Cons && v.value1.value1 instanceof Cons)) {
              $tco_var_chunksAcc = new Cons(v, chunksAcc);
              $copy_v = v.value1.value1.value1;
              return;
            }
            ;
            var unrolledMap = function(v1) {
              if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
                return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
              }
              ;
              if (v1 instanceof Cons && v1.value1 instanceof Nil) {
                return new Cons(f(v1.value0), Nil.value);
              }
              ;
              return Nil.value;
            };
            var reverseUnrolledMap = function($copy_v1) {
              return function($copy_acc) {
                var $tco_var_v1 = $copy_v1;
                var $tco_done1 = false;
                var $tco_result2;
                function $tco_loop2(v1, acc) {
                  if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                    $tco_var_v1 = v1.value1;
                    $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                    return;
                  }
                  ;
                  $tco_done1 = true;
                  return acc;
                }
                ;
                while (!$tco_done1) {
                  $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
                }
                ;
                return $tco_result2;
              };
            };
            $tco_done = true;
            return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return chunkedRevMap(Nil.value);
    };
    var functorList = {
      map: listMap
    };
    var foldableList = {
      foldr: function(f) {
        return function(b) {
          var rev = function() {
            var go = function($copy_acc) {
              return function($copy_v) {
                var $tco_var_acc = $copy_acc;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(acc, v) {
                  if (v instanceof Nil) {
                    $tco_done = true;
                    return acc;
                  }
                  ;
                  if (v instanceof Cons) {
                    $tco_var_acc = new Cons(v.value0, acc);
                    $copy_v = v.value1;
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Data.List.Types (line 108, column 7 - line 108, column 23): " + [acc.constructor.name, v.constructor.name]);
                }
                ;
                while (!$tco_done) {
                  $tco_result = $tco_loop($tco_var_acc, $copy_v);
                }
                ;
                return $tco_result;
              };
            };
            return go(Nil.value);
          }();
          var $205 = Data_Foldable.foldl(foldableList)(Data_Function.flip(f))(b);
          return function($206) {
            return $205(rev($206));
          };
        };
      },
      foldl: function(f) {
        var go = function($copy_b) {
          return function($copy_v) {
            var $tco_var_b = $copy_b;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(b, v) {
              if (v instanceof Nil) {
                $tco_done1 = true;
                return b;
              }
              ;
              if (v instanceof Cons) {
                $tco_var_b = f(b)(v.value0);
                $copy_v = v.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 112, column 12 - line 114, column 30): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_b, $copy_v);
            }
            ;
            return $tco_result;
          };
        };
        return go;
      },
      foldMap: function(dictMonoid) {
        return function(f) {
          return Data_Foldable.foldl(foldableList)(function(acc) {
            var $207 = Data_Semigroup.append(dictMonoid.Semigroup0())(acc);
            return function($208) {
              return $207(f($208));
            };
          })(Data_Monoid.mempty(dictMonoid));
        };
      }
    };
    var semigroupList = {
      append: function(xs) {
        return function(ys) {
          return Data_Foldable.foldr(foldableList)(Cons.create)(ys)(xs);
        };
      }
    };
    var applyList = {
      apply: function(v) {
        return function(v1) {
          if (v instanceof Nil) {
            return Nil.value;
          }
          ;
          if (v instanceof Cons) {
            return Data_Semigroup.append(semigroupList)(Data_Functor.map(functorList)(v.value0)(v1))(Control_Apply.apply(applyList)(v.value1)(v1));
          }
          ;
          throw new Error("Failed pattern match at Data.List.Types (line 158, column 1 - line 160, column 48): " + [v.constructor.name, v1.constructor.name]);
        };
      },
      Functor0: function() {
        return functorList;
      }
    };
    var applicativeList = {
      pure: function(a) {
        return new Cons(a, Nil.value);
      },
      Apply0: function() {
        return applyList;
      }
    };
    var altList = {
      alt: Data_Semigroup.append(semigroupList),
      Functor0: function() {
        return functorList;
      }
    };
    var plusList = {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
    exports["Nil"] = Nil;
    exports["Cons"] = Cons;
    exports["NonEmptyList"] = NonEmptyList;
    exports["semigroupList"] = semigroupList;
    exports["foldableList"] = foldableList;
    exports["applicativeList"] = applicativeList;
    exports["plusList"] = plusList;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Plus"] = $PS["Control.Plus"] || {};
    var exports = $PS["Control.Plus"];
    var empty = function(dict) {
      return dict.empty;
    };
    exports["empty"] = empty;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.NonEmpty"] = $PS["Data.NonEmpty"] || {};
    var exports = $PS["Data.NonEmpty"];
    var Control_Plus = $PS["Control.Plus"];
    var NonEmpty = function() {
      function NonEmpty2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      NonEmpty2.create = function(value0) {
        return function(value1) {
          return new NonEmpty2(value0, value1);
        };
      };
      return NonEmpty2;
    }();
    var singleton = function(dictPlus) {
      return function(a) {
        return new NonEmpty(a, Control_Plus.empty(dictPlus));
      };
    };
    exports["NonEmpty"] = NonEmpty;
    exports["singleton"] = singleton;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.List.NonEmpty"] = $PS["Data.List.NonEmpty"] || {};
    var exports = $PS["Data.List.NonEmpty"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_NonEmpty = $PS["Data.NonEmpty"];
    var singleton = function() {
      var $172 = Data_NonEmpty.singleton(Data_List_Types.plusList);
      return function($173) {
        return Data_List_Types.NonEmptyList($172($173));
      };
    }();
    var cons = function(y) {
      return function(v) {
        return new Data_NonEmpty.NonEmpty(y, new Data_List_Types.Cons(v.value0, v.value1));
      };
    };
    exports["singleton"] = singleton;
    exports["cons"] = cons;
  })(PS);
  (function(exports) {
    "use strict";
    var unsafeCompareImpl = function(lt) {
      return function(eq) {
        return function(gt) {
          return function(x) {
            return function(y) {
              return x < y ? lt : x === y ? eq : gt;
            };
          };
        };
      };
    };
    exports.ordIntImpl = unsafeCompareImpl;
    exports.ordStringImpl = unsafeCompareImpl;
  })(PS["Data.Ord"] = PS["Data.Ord"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.Ordering"] = $PS["Data.Ordering"] || {};
    var exports = $PS["Data.Ordering"];
    var LT = function() {
      function LT2() {
      }
      ;
      LT2.value = new LT2();
      return LT2;
    }();
    var GT = function() {
      function GT2() {
      }
      ;
      GT2.value = new GT2();
      return GT2;
    }();
    var EQ = function() {
      function EQ2() {
      }
      ;
      EQ2.value = new EQ2();
      return EQ2;
    }();
    exports["LT"] = LT;
    exports["GT"] = GT;
    exports["EQ"] = EQ;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Ord"] = $PS["Data.Ord"] || {};
    var exports = $PS["Data.Ord"];
    var $foreign = $PS["Data.Ord"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Ordering = $PS["Data.Ordering"];
    var ordUnit = {
      compare: function(v) {
        return function(v1) {
          return Data_Ordering.EQ.value;
        };
      },
      Eq0: function() {
        return Data_Eq.eqUnit;
      }
    };
    var ordString = {
      compare: $foreign.ordStringImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value),
      Eq0: function() {
        return Data_Eq.eqString;
      }
    };
    var ordInt = {
      compare: $foreign.ordIntImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value),
      Eq0: function() {
        return Data_Eq.eqInt;
      }
    };
    var compare = function(dict) {
      return dict.compare;
    };
    exports["compare"] = compare;
    exports["ordInt"] = ordInt;
    exports["ordString"] = ordString;
    exports["ordUnit"] = ordUnit;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Tuple"] = $PS["Data.Tuple"] || {};
    var exports = $PS["Data.Tuple"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Ord = $PS["Data.Ord"];
    var Data_Ordering = $PS["Data.Ordering"];
    var Tuple = function() {
      function Tuple2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Tuple2.create = function(value0) {
        return function(value1) {
          return new Tuple2(value0, value1);
        };
      };
      return Tuple2;
    }();
    var uncurry = function(f) {
      return function(v) {
        return f(v.value0)(v.value1);
      };
    };
    var snd = function(v) {
      return v.value1;
    };
    var functorTuple = {
      map: function(f) {
        return function(m) {
          return new Tuple(m.value0, f(m.value1));
        };
      }
    };
    var fst = function(v) {
      return v.value0;
    };
    var eqTuple = function(dictEq) {
      return function(dictEq1) {
        return {
          eq: function(x) {
            return function(y) {
              return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
            };
          }
        };
      };
    };
    var ordTuple = function(dictOrd) {
      return function(dictOrd1) {
        return {
          compare: function(x) {
            return function(y) {
              var v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
              if (v instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
              }
              ;
              if (v instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
              }
              ;
              return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
            };
          },
          Eq0: function() {
            return eqTuple(dictOrd.Eq0())(dictOrd1.Eq0());
          }
        };
      };
    };
    exports["Tuple"] = Tuple;
    exports["fst"] = fst;
    exports["snd"] = snd;
    exports["uncurry"] = uncurry;
    exports["ordTuple"] = ordTuple;
    exports["functorTuple"] = functorTuple;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Applicative.Free"] = $PS["Control.Applicative.Free"] || {};
    var exports = $PS["Control.Applicative.Free"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Apply = $PS["Control.Apply"];
    var Control_Category = $PS["Control.Category"];
    var Data_Either = $PS["Data.Either"];
    var Data_List_NonEmpty = $PS["Data.List.NonEmpty"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_NonEmpty = $PS["Data.NonEmpty"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Pure = function() {
      function Pure2(value0) {
        this.value0 = value0;
      }
      ;
      Pure2.create = function(value0) {
        return new Pure2(value0);
      };
      return Pure2;
    }();
    var Lift = function() {
      function Lift2(value0) {
        this.value0 = value0;
      }
      ;
      Lift2.create = function(value0) {
        return new Lift2(value0);
      };
      return Lift2;
    }();
    var Ap = function() {
      function Ap2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Ap2.create = function(value0) {
        return function(value1) {
          return new Ap2(value0, value1);
        };
      };
      return Ap2;
    }();
    var mkAp = function(fba) {
      return function(fb) {
        return new Ap(fba, fb);
      };
    };
    var liftFreeAp = Lift.create;
    var goLeft = function($copy_dictApplicative) {
      return function($copy_fStack) {
        return function($copy_valStack) {
          return function($copy_nat) {
            return function($copy_func) {
              return function($copy_count) {
                var $tco_var_dictApplicative = $copy_dictApplicative;
                var $tco_var_fStack = $copy_fStack;
                var $tco_var_valStack = $copy_valStack;
                var $tco_var_nat = $copy_nat;
                var $tco_var_func = $copy_func;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(dictApplicative, fStack, valStack, nat, func, count) {
                  if (func instanceof Pure) {
                    $tco_done = true;
                    return new Data_Tuple.Tuple(new Data_List_Types.Cons({
                      func: Control_Applicative.pure(dictApplicative)(func.value0),
                      count
                    }, fStack), valStack);
                  }
                  ;
                  if (func instanceof Lift) {
                    $tco_done = true;
                    return new Data_Tuple.Tuple(new Data_List_Types.Cons({
                      func: nat(func.value0),
                      count
                    }, fStack), valStack);
                  }
                  ;
                  if (func instanceof Ap) {
                    $tco_var_dictApplicative = dictApplicative;
                    $tco_var_fStack = fStack;
                    $tco_var_valStack = Data_List_NonEmpty.cons(func.value1)(valStack);
                    $tco_var_nat = nat;
                    $tco_var_func = func.value0;
                    $copy_count = count + 1 | 0;
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
                }
                ;
                while (!$tco_done) {
                  $tco_result = $tco_loop($tco_var_dictApplicative, $tco_var_fStack, $tco_var_valStack, $tco_var_nat, $tco_var_func, $copy_count);
                }
                ;
                return $tco_result;
              };
            };
          };
        };
      };
    };
    var goApply = function($copy_dictApplicative) {
      return function($copy_fStack) {
        return function($copy_vals) {
          return function($copy_gVal) {
            var $tco_var_dictApplicative = $copy_dictApplicative;
            var $tco_var_fStack = $copy_fStack;
            var $tco_var_vals = $copy_vals;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(dictApplicative, fStack, vals, gVal) {
              if (fStack instanceof Data_List_Types.Nil) {
                $tco_done = true;
                return new Data_Either.Left(gVal);
              }
              ;
              if (fStack instanceof Data_List_Types.Cons) {
                var gRes = Control_Apply.apply(dictApplicative.Apply0())(fStack.value0.func)(gVal);
                var $14 = fStack.value0.count === 1;
                if ($14) {
                  if (fStack.value1 instanceof Data_List_Types.Nil) {
                    $tco_done = true;
                    return new Data_Either.Left(gRes);
                  }
                  ;
                  $tco_var_dictApplicative = dictApplicative;
                  $tco_var_fStack = fStack.value1;
                  $tco_var_vals = vals;
                  $copy_gVal = gRes;
                  return;
                }
                ;
                if (vals instanceof Data_List_Types.Nil) {
                  $tco_done = true;
                  return new Data_Either.Left(gRes);
                }
                ;
                if (vals instanceof Data_List_Types.Cons) {
                  $tco_done = true;
                  return Data_Either.Right.create(new Data_Tuple.Tuple(new Data_List_Types.Cons({
                    func: gRes,
                    count: fStack.value0.count - 1 | 0
                  }, fStack.value1), new Data_NonEmpty.NonEmpty(vals.value0, vals.value1)));
                }
                ;
                throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_dictApplicative, $tco_var_fStack, $tco_var_vals, $copy_gVal);
            }
            ;
            return $tco_result;
          };
        };
      };
    };
    var functorFreeAp = {
      map: function(f) {
        return function(x) {
          return mkAp(new Pure(f))(x);
        };
      }
    };
    var foldFreeAp = function(dictApplicative) {
      return function(nat) {
        return function(z) {
          var go = function($copy_v) {
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v) {
              if (v.value1.value0 instanceof Pure) {
                var v1 = goApply(dictApplicative)(v.value0)(v.value1.value1)(Control_Applicative.pure(dictApplicative)(v.value1.value0.value0));
                if (v1 instanceof Data_Either.Left) {
                  $tco_done = true;
                  return v1.value0;
                }
                ;
                if (v1 instanceof Data_Either.Right) {
                  $copy_v = v1.value0;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
              }
              ;
              if (v.value1.value0 instanceof Lift) {
                var v1 = goApply(dictApplicative)(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
                if (v1 instanceof Data_Either.Left) {
                  $tco_done = true;
                  return v1.value0;
                }
                ;
                if (v1 instanceof Data_Either.Right) {
                  $copy_v = v1.value0;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
              }
              ;
              if (v.value1.value0 instanceof Ap) {
                var nextVals = new Data_NonEmpty.NonEmpty(v.value1.value0.value1, v.value1.value1);
                $copy_v = goLeft(dictApplicative)(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($copy_v);
            }
            ;
            return $tco_result;
          };
          return go(new Data_Tuple.Tuple(Data_List_Types.Nil.value, Data_List_NonEmpty.singleton(z)));
        };
      };
    };
    var retractFreeAp = function(dictApplicative) {
      return foldFreeAp(dictApplicative)(Control_Category.identity(Control_Category.categoryFn));
    };
    var applyFreeAp = {
      apply: function(fba) {
        return function(fb) {
          return mkAp(fba)(fb);
        };
      },
      Functor0: function() {
        return functorFreeAp;
      }
    };
    var applicativeFreeAp = {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
    var hoistFreeAp = function(f) {
      return foldFreeAp(applicativeFreeAp)(function($37) {
        return liftFreeAp(f($37));
      });
    };
    exports["retractFreeAp"] = retractFreeAp;
    exports["hoistFreeAp"] = hoistFreeAp;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Bind"] = $PS["Control.Bind"] || {};
    var exports = $PS["Control.Bind"];
    var Control_Category = $PS["Control.Category"];
    var Data_Function = $PS["Data.Function"];
    var discard = function(dict) {
      return dict.discard;
    };
    var bind = function(dict) {
      return dict.bind;
    };
    var bindFlipped = function(dictBind) {
      return Data_Function.flip(bind(dictBind));
    };
    var composeKleisliFlipped = function(dictBind) {
      return function(f) {
        return function(g) {
          return function(a) {
            return bindFlipped(dictBind)(f)(g(a));
          };
        };
      };
    };
    var discardUnit = {
      discard: function(dictBind) {
        return bind(dictBind);
      }
    };
    var join = function(dictBind) {
      return function(m) {
        return bind(dictBind)(m)(Control_Category.identity(Control_Category.categoryFn));
      };
    };
    exports["bind"] = bind;
    exports["bindFlipped"] = bindFlipped;
    exports["discard"] = discard;
    exports["join"] = join;
    exports["composeKleisliFlipped"] = composeKleisliFlipped;
    exports["discardUnit"] = discardUnit;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Monad"] = $PS["Control.Monad"] || {};
    var exports = $PS["Control.Monad"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var unlessM = function(dictMonad) {
      return function(mb) {
        return function(m) {
          return Control_Bind.bind(dictMonad.Bind1())(mb)(function(b) {
            return Control_Applicative.unless(dictMonad.Applicative0())(b)(m);
          });
        };
      };
    };
    var ap = function(dictMonad) {
      return function(f) {
        return function(a) {
          return Control_Bind.bind(dictMonad.Bind1())(f)(function(f$prime) {
            return Control_Bind.bind(dictMonad.Bind1())(a)(function(a$prime) {
              return Control_Applicative.pure(dictMonad.Applicative0())(f$prime(a$prime));
            });
          });
        };
      };
    };
    exports["unlessM"] = unlessM;
    exports["ap"] = ap;
  })(PS);
  (function(exports) {
    "use strict";
    exports.pureE = function(a) {
      return function() {
        return a;
      };
    };
    exports.bindE = function(a) {
      return function(f) {
        return function() {
          return f(a())();
        };
      };
    };
  })(PS["Effect"] = PS["Effect"] || {});
  (function($PS) {
    "use strict";
    $PS["Effect"] = $PS["Effect"] || {};
    var exports = $PS["Effect"];
    var $foreign = $PS["Effect"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Monad = $PS["Control.Monad"];
    var monadEffect = {
      Applicative0: function() {
        return applicativeEffect;
      },
      Bind1: function() {
        return bindEffect;
      }
    };
    var bindEffect = {
      bind: $foreign.bindE,
      Apply0: function() {
        return applyEffect;
      }
    };
    var applyEffect = {
      apply: Control_Monad.ap(monadEffect),
      Functor0: function() {
        return functorEffect;
      }
    };
    var applicativeEffect = {
      pure: $foreign.pureE,
      Apply0: function() {
        return applyEffect;
      }
    };
    var functorEffect = {
      map: Control_Applicative.liftA1(applicativeEffect)
    };
    exports["functorEffect"] = functorEffect;
    exports["applyEffect"] = applyEffect;
    exports["applicativeEffect"] = applicativeEffect;
    exports["bindEffect"] = bindEffect;
    exports["monadEffect"] = monadEffect;
  })(PS);
  (function(exports) {
    "use strict";
    exports.new = function(val) {
      return function() {
        return { value: val };
      };
    };
    exports.read = function(ref) {
      return function() {
        return ref.value;
      };
    };
    exports.modifyImpl = function(f) {
      return function(ref) {
        return function() {
          var t = f(ref.value);
          ref.value = t.state;
          return t.value;
        };
      };
    };
    exports.write = function(val) {
      return function(ref) {
        return function() {
          ref.value = val;
        };
      };
    };
  })(PS["Effect.Ref"] = PS["Effect.Ref"] || {});
  (function($PS) {
    "use strict";
    $PS["Effect.Ref"] = $PS["Effect.Ref"] || {};
    var exports = $PS["Effect.Ref"];
    var $foreign = $PS["Effect.Ref"];
    var Data_Functor = $PS["Data.Functor"];
    var Effect = $PS["Effect"];
    var modify$prime = $foreign.modifyImpl;
    var modify = function(f) {
      return modify$prime(function(s) {
        var s$prime = f(s);
        return {
          state: s$prime,
          value: s$prime
        };
      });
    };
    var modify_ = function(f) {
      return function(s) {
        return Data_Functor["void"](Effect.functorEffect)(modify(f)(s));
      };
    };
    exports["modify'"] = modify$prime;
    exports["modify_"] = modify_;
    exports["new"] = $foreign["new"];
    exports["read"] = $foreign.read;
    exports["write"] = $foreign.write;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Monad.Rec.Class"] = $PS["Control.Monad.Rec.Class"] || {};
    var exports = $PS["Control.Monad.Rec.Class"];
    var Control_Bind = $PS["Control.Bind"];
    var Data_Functor = $PS["Data.Functor"];
    var Effect = $PS["Effect"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Loop = function() {
      function Loop2(value0) {
        this.value0 = value0;
      }
      ;
      Loop2.create = function(value0) {
        return new Loop2(value0);
      };
      return Loop2;
    }();
    var Done = function() {
      function Done2(value0) {
        this.value0 = value0;
      }
      ;
      Done2.create = function(value0) {
        return new Done2(value0);
      };
      return Done2;
    }();
    var tailRecM = function(dict) {
      return dict.tailRecM;
    };
    var monadRecEffect = {
      tailRecM: function(f) {
        return function(a) {
          var fromDone = function(v) {
            if (v instanceof Done) {
              return v.value0;
            }
            ;
            throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 113, column 30 - line 113, column 44): " + [v.constructor.name]);
          };
          return function __do() {
            var r = Control_Bind.bindFlipped(Effect.bindEffect)(Effect_Ref["new"])(f(a))();
            (function() {
              while (!function __do2() {
                var v = Effect_Ref.read(r)();
                if (v instanceof Loop) {
                  var e = f(v.value0)();
                  Effect_Ref.write(e)(r)();
                  return false;
                }
                ;
                if (v instanceof Done) {
                  return true;
                }
                ;
                throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 104, column 22 - line 109, column 28): " + [v.constructor.name]);
              }()) {
              }
              ;
              return {};
            })();
            return Data_Functor.map(Effect.functorEffect)(fromDone)(Effect_Ref.read(r))();
          };
        };
      },
      Monad0: function() {
        return Effect.monadEffect;
      }
    };
    exports["Loop"] = Loop;
    exports["Done"] = Done;
    exports["tailRecM"] = tailRecM;
    exports["monadRecEffect"] = monadRecEffect;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.List"] = $PS["Data.List"] || {};
    var exports = $PS["Data.List"];
    var Data_List_Types = $PS["Data.List.Types"];
    var reverse = function() {
      var go = function($copy_acc) {
        return function($copy_v) {
          var $tco_var_acc = $copy_acc;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(acc, v) {
            if (v instanceof Data_List_Types.Nil) {
              $tco_done = true;
              return acc;
            }
            ;
            if (v instanceof Data_List_Types.Cons) {
              $tco_var_acc = new Data_List_Types.Cons(v.value0, acc);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List (line 372, column 3 - line 372, column 19): " + [acc.constructor.name, v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_acc, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go(Data_List_Types.Nil.value);
    }();
    var $$null = function(v) {
      if (v instanceof Data_List_Types.Nil) {
        return true;
      }
      ;
      return false;
    };
    exports["null"] = $$null;
    exports["reverse"] = reverse;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.CatQueue"] = $PS["Data.CatQueue"] || {};
    var exports = $PS["Data.CatQueue"];
    var Data_List = $PS["Data.List"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Tuple = $PS["Data.Tuple"];
    var CatQueue = function() {
      function CatQueue2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      CatQueue2.create = function(value0) {
        return function(value1) {
          return new CatQueue2(value0, value1);
        };
      };
      return CatQueue2;
    }();
    var uncons = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
          $tco_done = true;
          return Data_Maybe.Nothing.value;
        }
        ;
        if (v.value0 instanceof Data_List_Types.Nil) {
          $copy_v = new CatQueue(Data_List.reverse(v.value1), Data_List_Types.Nil.value);
          return;
        }
        ;
        if (v.value0 instanceof Data_List_Types.Cons) {
          $tco_done = true;
          return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
        }
        ;
        throw new Error("Failed pattern match at Data.CatQueue (line 83, column 1 - line 83, column 63): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    var snoc = function(v) {
      return function(a) {
        return new CatQueue(v.value0, new Data_List_Types.Cons(a, v.value1));
      };
    };
    var $$null = function(v) {
      if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
        return true;
      }
      ;
      return false;
    };
    var empty = new CatQueue(Data_List_Types.Nil.value, Data_List_Types.Nil.value);
    exports["empty"] = empty;
    exports["null"] = $$null;
    exports["snoc"] = snoc;
    exports["uncons"] = uncons;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.CatList"] = $PS["Data.CatList"] || {};
    var exports = $PS["Data.CatList"];
    var Data_CatQueue = $PS["Data.CatQueue"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Tuple = $PS["Data.Tuple"];
    var CatNil = function() {
      function CatNil2() {
      }
      ;
      CatNil2.value = new CatNil2();
      return CatNil2;
    }();
    var CatCons = function() {
      function CatCons2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      CatCons2.create = function(value0) {
        return function(value1) {
          return new CatCons2(value0, value1);
        };
      };
      return CatCons2;
    }();
    var link = function(v) {
      return function(v1) {
        if (v instanceof CatNil) {
          return v1;
        }
        ;
        if (v1 instanceof CatNil) {
          return v;
        }
        ;
        if (v instanceof CatCons) {
          return new CatCons(v.value0, Data_CatQueue.snoc(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.CatList (line 109, column 1 - line 109, column 54): " + [v.constructor.name, v1.constructor.name]);
      };
    };
    var foldr = function(k) {
      return function(b) {
        return function(q) {
          var foldl = function($copy_v) {
            return function($copy_c) {
              return function($copy_v1) {
                var $tco_var_v = $copy_v;
                var $tco_var_c = $copy_c;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(v, c, v1) {
                  if (v1 instanceof Data_List_Types.Nil) {
                    $tco_done = true;
                    return c;
                  }
                  ;
                  if (v1 instanceof Data_List_Types.Cons) {
                    $tco_var_v = v;
                    $tco_var_c = v(c)(v1.value0);
                    $copy_v1 = v1.value1;
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Data.CatList (line 125, column 3 - line 125, column 59): " + [v.constructor.name, c.constructor.name, v1.constructor.name]);
                }
                ;
                while (!$tco_done) {
                  $tco_result = $tco_loop($tco_var_v, $tco_var_c, $copy_v1);
                }
                ;
                return $tco_result;
              };
            };
          };
          var go = function($copy_xs) {
            return function($copy_ys) {
              var $tco_var_xs = $copy_xs;
              var $tco_done1 = false;
              var $tco_result;
              function $tco_loop(xs, ys) {
                var v = Data_CatQueue.uncons(xs);
                if (v instanceof Data_Maybe.Nothing) {
                  $tco_done1 = true;
                  return foldl(function(x) {
                    return function(i) {
                      return i(x);
                    };
                  })(b)(ys);
                }
                ;
                if (v instanceof Data_Maybe.Just) {
                  $tco_var_xs = v.value0.value1;
                  $copy_ys = new Data_List_Types.Cons(k(v.value0.value0), ys);
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 121, column 14 - line 123, column 67): " + [v.constructor.name]);
              }
              ;
              while (!$tco_done1) {
                $tco_result = $tco_loop($tco_var_xs, $copy_ys);
              }
              ;
              return $tco_result;
            };
          };
          return go(q)(Data_List_Types.Nil.value);
        };
      };
    };
    var uncons = function(v) {
      if (v instanceof CatNil) {
        return Data_Maybe.Nothing.value;
      }
      ;
      if (v instanceof CatCons) {
        return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0, function() {
          var $45 = Data_CatQueue["null"](v.value1);
          if ($45) {
            return CatNil.value;
          }
          ;
          return foldr(link)(CatNil.value)(v.value1);
        }()));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 100, column 1 - line 100, column 61): " + [v.constructor.name]);
    };
    var empty = CatNil.value;
    var append = link;
    var semigroupCatList = {
      append
    };
    var snoc = function(cat) {
      return function(a) {
        return append(cat)(new CatCons(a, Data_CatQueue.empty));
      };
    };
    exports["empty"] = empty;
    exports["snoc"] = snoc;
    exports["uncons"] = uncons;
    exports["semigroupCatList"] = semigroupCatList;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Monad.Free"] = $PS["Control.Monad.Free"] || {};
    var exports = $PS["Control.Monad.Free"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad = $PS["Control.Monad"];
    var Control_Monad_Rec_Class = $PS["Control.Monad.Rec.Class"];
    var Data_CatList = $PS["Data.CatList"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Free = function() {
      function Free2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Free2.create = function(value0) {
        return function(value1) {
          return new Free2(value0, value1);
        };
      };
      return Free2;
    }();
    var Return = function() {
      function Return2(value0) {
        this.value0 = value0;
      }
      ;
      Return2.create = function(value0) {
        return new Return2(value0);
      };
      return Return2;
    }();
    var Bind = function() {
      function Bind2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Bind2.create = function(value0) {
        return function(value1) {
          return new Bind2(value0, value1);
        };
      };
      return Bind2;
    }();
    var toView = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        var runExpF = function(v22) {
          return v22;
        };
        var concatF = function(v22) {
          return function(r) {
            return new Free(v22.value0, Data_Semigroup.append(Data_CatList.semigroupCatList)(v22.value1)(r));
          };
        };
        if (v.value0 instanceof Return) {
          var v2 = Data_CatList.uncons(v.value1);
          if (v2 instanceof Data_Maybe.Nothing) {
            $tco_done = true;
            return new Return(v.value0.value0);
          }
          ;
          if (v2 instanceof Data_Maybe.Just) {
            $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
            return;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
        }
        ;
        if (v.value0 instanceof Bind) {
          $tco_done = true;
          return new Bind(v.value0.value0, function(a) {
            return concatF(v.value0.value1(a))(v.value1);
          });
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    var fromView = function(f) {
      return new Free(f, Data_CatList.empty);
    };
    var freeMonad = {
      Applicative0: function() {
        return freeApplicative;
      },
      Bind1: function() {
        return freeBind;
      }
    };
    var freeFunctor = {
      map: function(k) {
        return function(f) {
          return Control_Bind.bindFlipped(freeBind)(function() {
            var $119 = Control_Applicative.pure(freeApplicative);
            return function($120) {
              return $119(k($120));
            };
          }())(f);
        };
      }
    };
    var freeBind = {
      bind: function(v) {
        return function(k) {
          return new Free(v.value0, Data_CatList.snoc(v.value1)(k));
        };
      },
      Apply0: function() {
        return freeApply;
      }
    };
    var freeApply = {
      apply: Control_Monad.ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
    var freeApplicative = {
      pure: function($121) {
        return fromView(Return.create($121));
      },
      Apply0: function() {
        return freeApply;
      }
    };
    var liftF = function(f) {
      return fromView(new Bind(f, function() {
        var $122 = Control_Applicative.pure(freeApplicative);
        return function($123) {
          return $122($123);
        };
      }()));
    };
    var substFree = function(k) {
      var go = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return Control_Applicative.pure(freeApplicative)(v.value0);
        }
        ;
        if (v instanceof Bind) {
          return Control_Bind.bind(freeBind)(k(v.value0))(Data_Functor.map(Data_Functor.functorFn)(go)(v.value1));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 168, column 10 - line 170, column 33): " + [v.constructor.name]);
      };
      return go;
    };
    var hoistFree = function(k) {
      return substFree(function($124) {
        return liftF(k($124));
      });
    };
    var foldFree = function(dictMonadRec) {
      return function(k) {
        var go = function(f) {
          var v = toView(f);
          if (v instanceof Return) {
            return Data_Functor.map(dictMonadRec.Monad0().Bind1().Apply0().Functor0())(Control_Monad_Rec_Class.Done.create)(Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(v.value0));
          }
          ;
          if (v instanceof Bind) {
            return Data_Functor.map(dictMonadRec.Monad0().Bind1().Apply0().Functor0())(function($135) {
              return Control_Monad_Rec_Class.Loop.create(v.value1($135));
            })(k(v.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
        };
        return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go);
      };
    };
    exports["liftF"] = liftF;
    exports["hoistFree"] = hoistFree;
    exports["foldFree"] = foldFree;
    exports["freeFunctor"] = freeFunctor;
    exports["freeBind"] = freeBind;
    exports["freeApplicative"] = freeApplicative;
    exports["freeMonad"] = freeMonad;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Effect.Class"] = $PS["Effect.Class"] || {};
    var exports = $PS["Effect.Class"];
    var Control_Category = $PS["Control.Category"];
    var Effect = $PS["Effect"];
    var monadEffectEffect = {
      liftEffect: Control_Category.identity(Control_Category.categoryFn),
      Monad0: function() {
        return Effect.monadEffect;
      }
    };
    var liftEffect = function(dict) {
      return dict.liftEffect;
    };
    exports["liftEffect"] = liftEffect;
    exports["monadEffectEffect"] = monadEffectEffect;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Map.Internal"] = $PS["Data.Map.Internal"] || {};
    var exports = $PS["Data.Map.Internal"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Ord = $PS["Data.Ord"];
    var Data_Ordering = $PS["Data.Ordering"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Leaf = function() {
      function Leaf2() {
      }
      ;
      Leaf2.value = new Leaf2();
      return Leaf2;
    }();
    var Two = function() {
      function Two2(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
      }
      ;
      Two2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return new Two2(value0, value1, value2, value3);
            };
          };
        };
      };
      return Two2;
    }();
    var Three = function() {
      function Three2(value0, value1, value2, value3, value4, value5, value6) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
        this.value6 = value6;
      }
      ;
      Three2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return function(value4) {
                return function(value5) {
                  return function(value6) {
                    return new Three2(value0, value1, value2, value3, value4, value5, value6);
                  };
                };
              };
            };
          };
        };
      };
      return Three2;
    }();
    var TwoLeft = function() {
      function TwoLeft2(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
      }
      ;
      TwoLeft2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return new TwoLeft2(value0, value1, value2);
          };
        };
      };
      return TwoLeft2;
    }();
    var TwoRight = function() {
      function TwoRight2(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
      }
      ;
      TwoRight2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return new TwoRight2(value0, value1, value2);
          };
        };
      };
      return TwoRight2;
    }();
    var ThreeLeft = function() {
      function ThreeLeft2(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
      }
      ;
      ThreeLeft2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return function(value4) {
                return function(value5) {
                  return new ThreeLeft2(value0, value1, value2, value3, value4, value5);
                };
              };
            };
          };
        };
      };
      return ThreeLeft2;
    }();
    var ThreeMiddle = function() {
      function ThreeMiddle2(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
      }
      ;
      ThreeMiddle2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return function(value4) {
                return function(value5) {
                  return new ThreeMiddle2(value0, value1, value2, value3, value4, value5);
                };
              };
            };
          };
        };
      };
      return ThreeMiddle2;
    }();
    var ThreeRight = function() {
      function ThreeRight2(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
      }
      ;
      ThreeRight2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return function(value4) {
                return function(value5) {
                  return new ThreeRight2(value0, value1, value2, value3, value4, value5);
                };
              };
            };
          };
        };
      };
      return ThreeRight2;
    }();
    var KickUp = function() {
      function KickUp2(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
      }
      ;
      KickUp2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return new KickUp2(value0, value1, value2, value3);
            };
          };
        };
      };
      return KickUp2;
    }();
    var values = function(v) {
      if (v instanceof Leaf) {
        return Data_List_Types.Nil.value;
      }
      ;
      if (v instanceof Two) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value2))(values(v.value3)));
      }
      ;
      if (v instanceof Three) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value2))(Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value3))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value5))(values(v.value6)))));
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 626, column 1 - line 626, column 40): " + [v.constructor.name]);
    };
    var lookup = function(dictOrd) {
      return function(k) {
        var comp = Data_Ord.compare(dictOrd);
        var go = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v instanceof Leaf) {
              $tco_done = true;
              return Data_Maybe.Nothing.value;
            }
            ;
            if (v instanceof Two) {
              var v2 = comp(k)(v.value1);
              if (v2 instanceof Data_Ordering.EQ) {
                $tco_done = true;
                return new Data_Maybe.Just(v.value2);
              }
              ;
              if (v2 instanceof Data_Ordering.LT) {
                $copy_v = v.value0;
                return;
              }
              ;
              $copy_v = v.value3;
              return;
            }
            ;
            if (v instanceof Three) {
              var v3 = comp(k)(v.value1);
              if (v3 instanceof Data_Ordering.EQ) {
                $tco_done = true;
                return new Data_Maybe.Just(v.value2);
              }
              ;
              var v4 = comp(k)(v.value4);
              if (v4 instanceof Data_Ordering.EQ) {
                $tco_done = true;
                return new Data_Maybe.Just(v.value5);
              }
              ;
              if (v3 instanceof Data_Ordering.LT) {
                $copy_v = v.value0;
                return;
              }
              ;
              if (v4 instanceof Data_Ordering.GT) {
                $copy_v = v.value6;
                return;
              }
              ;
              $copy_v = v.value3;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 211, column 5 - line 211, column 22): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go;
      };
    };
    var fromZipper = function($copy_dictOrd) {
      return function($copy_v) {
        return function($copy_tree) {
          var $tco_var_dictOrd = $copy_dictOrd;
          var $tco_var_v = $copy_v;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(dictOrd, v, tree) {
            if (v instanceof Data_List_Types.Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (v instanceof Data_List_Types.Cons) {
              if (v.value0 instanceof TwoLeft) {
                $tco_var_dictOrd = dictOrd;
                $tco_var_v = v.value1;
                $copy_tree = new Two(tree, v.value0.value0, v.value0.value1, v.value0.value2);
                return;
              }
              ;
              if (v.value0 instanceof TwoRight) {
                $tco_var_dictOrd = dictOrd;
                $tco_var_v = v.value1;
                $copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree);
                return;
              }
              ;
              if (v.value0 instanceof ThreeLeft) {
                $tco_var_dictOrd = dictOrd;
                $tco_var_v = v.value1;
                $copy_tree = new Three(tree, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
                return;
              }
              ;
              if (v.value0 instanceof ThreeMiddle) {
                $tco_var_dictOrd = dictOrd;
                $tco_var_v = v.value1;
                $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree, v.value0.value3, v.value0.value4, v.value0.value5);
                return;
              }
              ;
              if (v.value0 instanceof ThreeRight) {
                $tco_var_dictOrd = dictOrd;
                $tco_var_v = v.value1;
                $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 432, column 3 - line 437, column 88): " + [v.value0.constructor.name]);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 429, column 1 - line 429, column 80): " + [v.constructor.name, tree.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
    };
    var insert = function(dictOrd) {
      return function(k) {
        return function(v) {
          var up = function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v1, v2) {
                if (v1 instanceof Data_List_Types.Nil) {
                  $tco_done = true;
                  return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
                }
                ;
                if (v1 instanceof Data_List_Types.Cons) {
                  if (v1.value0 instanceof TwoLeft) {
                    $tco_done = true;
                    return fromZipper(dictOrd)(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                  }
                  ;
                  if (v1.value0 instanceof TwoRight) {
                    $tco_done = true;
                    return fromZipper(dictOrd)(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                  }
                  ;
                  if (v1.value0 instanceof ThreeLeft) {
                    $tco_var_v1 = v1.value1;
                    $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                    return;
                  }
                  ;
                  if (v1.value0 instanceof ThreeMiddle) {
                    $tco_var_v1 = v1.value1;
                    $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                    return;
                  }
                  ;
                  if (v1.value0 instanceof ThreeRight) {
                    $tco_var_v1 = v1.value1;
                    $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 5 - line 473, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 465, column 3 - line 465, column 56): " + [v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
          var comp = Data_Ord.compare(dictOrd);
          var down = function($copy_ctx) {
            return function($copy_v1) {
              var $tco_var_ctx = $copy_ctx;
              var $tco_done1 = false;
              var $tco_result;
              function $tco_loop(ctx, v1) {
                if (v1 instanceof Leaf) {
                  $tco_done1 = true;
                  return up(ctx)(new KickUp(Leaf.value, k, v, Leaf.value));
                }
                ;
                if (v1 instanceof Two) {
                  var v2 = comp(k)(v1.value1);
                  if (v2 instanceof Data_Ordering.EQ) {
                    $tco_done1 = true;
                    return fromZipper(dictOrd)(ctx)(new Two(v1.value0, k, v, v1.value3));
                  }
                  ;
                  if (v2 instanceof Data_Ordering.LT) {
                    $tco_var_ctx = new Data_List_Types.Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                    $copy_v1 = v1.value0;
                    return;
                  }
                  ;
                  $tco_var_ctx = new Data_List_Types.Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
                  $copy_v1 = v1.value3;
                  return;
                }
                ;
                if (v1 instanceof Three) {
                  var v3 = comp(k)(v1.value1);
                  if (v3 instanceof Data_Ordering.EQ) {
                    $tco_done1 = true;
                    return fromZipper(dictOrd)(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
                  }
                  ;
                  var v4 = comp(k)(v1.value4);
                  if (v4 instanceof Data_Ordering.EQ) {
                    $tco_done1 = true;
                    return fromZipper(dictOrd)(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
                  }
                  ;
                  if (v3 instanceof Data_Ordering.LT) {
                    $tco_var_ctx = new Data_List_Types.Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                    $copy_v1 = v1.value0;
                    return;
                  }
                  ;
                  if (v3 instanceof Data_Ordering.GT && v4 instanceof Data_Ordering.LT) {
                    $tco_var_ctx = new Data_List_Types.Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                    $copy_v1 = v1.value3;
                    return;
                  }
                  ;
                  $tco_var_ctx = new Data_List_Types.Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
                  $copy_v1 = v1.value6;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 448, column 3 - line 448, column 55): " + [ctx.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done1) {
                $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return down(Data_List_Types.Nil.value);
        };
      };
    };
    var pop = function(dictOrd) {
      return function(k) {
        var up = function($copy_ctxs) {
          return function($copy_tree) {
            var $tco_var_ctxs = $copy_ctxs;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(ctxs, tree) {
              if (ctxs instanceof Data_List_Types.Nil) {
                $tco_done = true;
                return tree;
              }
              ;
              if (ctxs instanceof Data_List_Types.Cons) {
                if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
                }
                ;
                if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
                }
                ;
                if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                  $tco_var_ctxs = ctxs.value1;
                  $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                  return;
                }
                ;
                if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                  $tco_var_ctxs = ctxs.value1;
                  $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                  return;
                }
                ;
                if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
                }
                ;
                if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
                }
                ;
                if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                }
                ;
                if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                }
                ;
                if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
                }
                ;
                if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                }
                ;
                if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                }
                ;
                if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
                }
                ;
                if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
                }
                ;
                if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                }
                ;
                if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                }
                ;
                if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
                }
                ;
                if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 9 - line 542, column 136): " + [ctxs.value0.constructor.name, tree.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 522, column 5 - line 542, column 136): " + [ctxs.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
            }
            ;
            return $tco_result;
          };
        };
        var removeMaxNode = function($copy_ctx) {
          return function($copy_m) {
            var $tco_var_ctx = $copy_ctx;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(ctx, m) {
              if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
                $tco_done1 = true;
                return up(ctx)(Leaf.value);
              }
              ;
              if (m instanceof Two) {
                $tco_var_ctx = new Data_List_Types.Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
                $tco_done1 = true;
                return up(new Data_List_Types.Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
              }
              ;
              if (m instanceof Three) {
                $tco_var_ctx = new Data_List_Types.Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
                $copy_m = m.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 554, column 5 - line 558, column 107): " + [m.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_ctx, $copy_m);
            }
            ;
            return $tco_result;
          };
        };
        var maxNode = function($copy_m) {
          var $tco_done2 = false;
          var $tco_result;
          function $tco_loop(m) {
            if (m instanceof Two && m.value3 instanceof Leaf) {
              $tco_done2 = true;
              return {
                key: m.value1,
                value: m.value2
              };
            }
            ;
            if (m instanceof Two) {
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three && m.value6 instanceof Leaf) {
              $tco_done2 = true;
              return {
                key: m.value4,
                value: m.value5
              };
            }
            ;
            if (m instanceof Three) {
              $copy_m = m.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 545, column 33 - line 549, column 45): " + [m.constructor.name]);
          }
          ;
          while (!$tco_done2) {
            $tco_result = $tco_loop($copy_m);
          }
          ;
          return $tco_result;
        };
        var comp = Data_Ord.compare(dictOrd);
        var down = function($copy_ctx) {
          return function($copy_m) {
            var $tco_var_ctx = $copy_ctx;
            var $tco_done3 = false;
            var $tco_result;
            function $tco_loop(ctx, m) {
              if (m instanceof Leaf) {
                $tco_done3 = true;
                return Data_Maybe.Nothing.value;
              }
              ;
              if (m instanceof Two) {
                var v = comp(k)(m.value1);
                if (m.value3 instanceof Leaf && v instanceof Data_Ordering.EQ) {
                  $tco_done3 = true;
                  return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, up(ctx)(Leaf.value)));
                }
                ;
                if (v instanceof Data_Ordering.EQ) {
                  var max = maxNode(m.value0);
                  $tco_done3 = true;
                  return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, removeMaxNode(new Data_List_Types.Cons(new TwoLeft(max.key, max.value, m.value3), ctx))(m.value0)));
                }
                ;
                if (v instanceof Data_Ordering.LT) {
                  $tco_var_ctx = new Data_List_Types.Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                  $copy_m = m.value0;
                  return;
                }
                ;
                $tco_var_ctx = new Data_List_Types.Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              if (m instanceof Three) {
                var leaves = function() {
                  if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                    return true;
                  }
                  ;
                  return false;
                }();
                var v = comp(k)(m.value4);
                var v3 = comp(k)(m.value1);
                if (leaves && v3 instanceof Data_Ordering.EQ) {
                  $tco_done3 = true;
                  return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
                }
                ;
                if (leaves && v instanceof Data_Ordering.EQ) {
                  $tco_done3 = true;
                  return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value5, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
                }
                ;
                if (v3 instanceof Data_Ordering.EQ) {
                  var max = maxNode(m.value0);
                  $tco_done3 = true;
                  return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, removeMaxNode(new Data_List_Types.Cons(new ThreeLeft(max.key, max.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
                }
                ;
                if (v instanceof Data_Ordering.EQ) {
                  var max = maxNode(m.value3);
                  $tco_done3 = true;
                  return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value5, removeMaxNode(new Data_List_Types.Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max.key, max.value, m.value6), ctx))(m.value3)));
                }
                ;
                if (v3 instanceof Data_Ordering.LT) {
                  $tco_var_ctx = new Data_List_Types.Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                  $copy_m = m.value0;
                  return;
                }
                ;
                if (v3 instanceof Data_Ordering.GT && v instanceof Data_Ordering.LT) {
                  $tco_var_ctx = new Data_List_Types.Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                  $copy_m = m.value3;
                  return;
                }
                ;
                $tco_var_ctx = new Data_List_Types.Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
                $copy_m = m.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 34 - line 518, column 80): " + [m.constructor.name]);
            }
            ;
            while (!$tco_done3) {
              $tco_result = $tco_loop($tco_var_ctx, $copy_m);
            }
            ;
            return $tco_result;
          };
        };
        return down(Data_List_Types.Nil.value);
      };
    };
    var foldableMap = {
      foldl: function(f) {
        return function(z) {
          return function(m) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(f)(z)(values(m));
          };
        };
      },
      foldr: function(f) {
        return function(z) {
          return function(m) {
            return Data_Foldable.foldr(Data_List_Types.foldableList)(f)(z)(values(m));
          };
        };
      },
      foldMap: function(dictMonoid) {
        return function(f) {
          return function(m) {
            return Data_Foldable.foldMap(Data_List_Types.foldableList)(dictMonoid)(f)(values(m));
          };
        };
      }
    };
    var empty = Leaf.value;
    var $$delete = function(dictOrd) {
      return function(k) {
        return function(m) {
          return Data_Maybe.maybe(m)(Data_Tuple.snd)(pop(dictOrd)(k)(m));
        };
      };
    };
    var alter = function(dictOrd) {
      return function(f) {
        return function(k) {
          return function(m) {
            var v = f(lookup(dictOrd)(k)(m));
            if (v instanceof Data_Maybe.Nothing) {
              return $$delete(dictOrd)(k)(m);
            }
            ;
            if (v instanceof Data_Maybe.Just) {
              return insert(dictOrd)(k)(v.value0)(m);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 563, column 15 - line 565, column 25): " + [v.constructor.name]);
          };
        };
      };
    };
    exports["empty"] = empty;
    exports["insert"] = insert;
    exports["lookup"] = lookup;
    exports["delete"] = $$delete;
    exports["pop"] = pop;
    exports["alter"] = alter;
    exports["foldableMap"] = foldableMap;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Data.OrdBox"] = $PS["Halogen.Data.OrdBox"] || {};
    var exports = $PS["Halogen.Data.OrdBox"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Ord = $PS["Data.Ord"];
    var OrdBox = function() {
      function OrdBox2(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
      }
      ;
      OrdBox2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return new OrdBox2(value0, value1, value2);
          };
        };
      };
      return OrdBox2;
    }();
    var mkOrdBox = function(dictOrd) {
      return OrdBox.create(Data_Eq.eq(dictOrd.Eq0()))(Data_Ord.compare(dictOrd));
    };
    var eqOrdBox = {
      eq: function(v) {
        return function(v1) {
          return v.value0(v.value2)(v1.value2);
        };
      }
    };
    var ordOrdBox = {
      compare: function(v) {
        return function(v1) {
          return v.value1(v.value2)(v1.value2);
        };
      },
      Eq0: function() {
        return eqOrdBox;
      }
    };
    exports["mkOrdBox"] = mkOrdBox;
    exports["ordOrdBox"] = ordOrdBox;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Data.Slot"] = $PS["Halogen.Data.Slot"] || {};
    var exports = $PS["Halogen.Data.Slot"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Map_Internal = $PS["Data.Map.Internal"];
    var Data_Ord = $PS["Data.Ord"];
    var Data_Symbol = $PS["Data.Symbol"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Halogen_Data_OrdBox = $PS["Halogen.Data.OrdBox"];
    var pop = function(dictCons) {
      return function(dictIsSymbol) {
        return function(dictOrd) {
          return function(sym) {
            return function(key) {
              return function(v) {
                return Data_Map_Internal.pop(Data_Tuple.ordTuple(Data_Ord.ordString)(Halogen_Data_OrdBox.ordOrdBox))(new Data_Tuple.Tuple(Data_Symbol.reflectSymbol(dictIsSymbol)(sym), Halogen_Data_OrdBox.mkOrdBox(dictOrd)(key)))(v);
              };
            };
          };
        };
      };
    };
    var lookup = function(dictCons) {
      return function(dictIsSymbol) {
        return function(dictOrd) {
          return function(sym) {
            return function(key) {
              return function(v) {
                return Data_Map_Internal.lookup(Data_Tuple.ordTuple(Data_Ord.ordString)(Halogen_Data_OrdBox.ordOrdBox))(new Data_Tuple.Tuple(Data_Symbol.reflectSymbol(dictIsSymbol)(sym), Halogen_Data_OrdBox.mkOrdBox(dictOrd)(key)))(v);
              };
            };
          };
        };
      };
    };
    var insert = function(dictCons) {
      return function(dictIsSymbol) {
        return function(dictOrd) {
          return function(sym) {
            return function(key) {
              return function(val) {
                return function(v) {
                  return Data_Map_Internal.insert(Data_Tuple.ordTuple(Data_Ord.ordString)(Halogen_Data_OrdBox.ordOrdBox))(new Data_Tuple.Tuple(Data_Symbol.reflectSymbol(dictIsSymbol)(sym), Halogen_Data_OrdBox.mkOrdBox(dictOrd)(key)))(val)(v);
                };
              };
            };
          };
        };
      };
    };
    var foreachSlot = function(dictApplicative) {
      return function(v) {
        return function(k) {
          return Data_Foldable.traverse_(dictApplicative)(Data_Map_Internal.foldableMap)(function($37) {
            return k($37);
          })(v);
        };
      };
    };
    var empty = Data_Map_Internal.empty;
    exports["empty"] = empty;
    exports["lookup"] = lookup;
    exports["insert"] = insert;
    exports["pop"] = pop;
    exports["foreachSlot"] = foreachSlot;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Query.ChildQuery"] = $PS["Halogen.Query.ChildQuery"] || {};
    var exports = $PS["Halogen.Query.ChildQuery"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var ChildQuery = function() {
      function ChildQuery2(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
      }
      ;
      ChildQuery2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return new ChildQuery2(value0, value1, value2);
          };
        };
      };
      return ChildQuery2;
    }();
    var unChildQueryBox = Unsafe_Coerce.unsafeCoerce;
    var mkChildQueryBox = Unsafe_Coerce.unsafeCoerce;
    exports["ChildQuery"] = ChildQuery;
    exports["mkChildQueryBox"] = mkChildQueryBox;
    exports["unChildQueryBox"] = unChildQueryBox;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Query.HalogenM"] = $PS["Halogen.Query.HalogenM"] || {};
    var exports = $PS["Halogen.Query.HalogenM"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Applicative_Free = $PS["Control.Applicative.Free"];
    var Control_Category = $PS["Control.Category"];
    var Control_Monad_Free = $PS["Control.Monad.Free"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Newtype = $PS["Data.Newtype"];
    var Data_Ord = $PS["Data.Ord"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect_Class = $PS["Effect.Class"];
    var Halogen_Data_Slot = $PS["Halogen.Data.Slot"];
    var Halogen_Query_ChildQuery = $PS["Halogen.Query.ChildQuery"];
    var SubscriptionId = function(x) {
      return x;
    };
    var ForkId = function(x) {
      return x;
    };
    var State = function() {
      function State2(value0) {
        this.value0 = value0;
      }
      ;
      State2.create = function(value0) {
        return new State2(value0);
      };
      return State2;
    }();
    var Subscribe = function() {
      function Subscribe2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Subscribe2.create = function(value0) {
        return function(value1) {
          return new Subscribe2(value0, value1);
        };
      };
      return Subscribe2;
    }();
    var Unsubscribe = function() {
      function Unsubscribe2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Unsubscribe2.create = function(value0) {
        return function(value1) {
          return new Unsubscribe2(value0, value1);
        };
      };
      return Unsubscribe2;
    }();
    var Lift = function() {
      function Lift2(value0) {
        this.value0 = value0;
      }
      ;
      Lift2.create = function(value0) {
        return new Lift2(value0);
      };
      return Lift2;
    }();
    var ChildQuery = function() {
      function ChildQuery2(value0) {
        this.value0 = value0;
      }
      ;
      ChildQuery2.create = function(value0) {
        return new ChildQuery2(value0);
      };
      return ChildQuery2;
    }();
    var Raise = function() {
      function Raise2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Raise2.create = function(value0) {
        return function(value1) {
          return new Raise2(value0, value1);
        };
      };
      return Raise2;
    }();
    var Par = function() {
      function Par2(value0) {
        this.value0 = value0;
      }
      ;
      Par2.create = function(value0) {
        return new Par2(value0);
      };
      return Par2;
    }();
    var Fork = function() {
      function Fork2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Fork2.create = function(value0) {
        return function(value1) {
          return new Fork2(value0, value1);
        };
      };
      return Fork2;
    }();
    var Kill = function() {
      function Kill2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Kill2.create = function(value0) {
        return function(value1) {
          return new Kill2(value0, value1);
        };
      };
      return Kill2;
    }();
    var GetRef = function() {
      function GetRef2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      GetRef2.create = function(value0) {
        return function(value1) {
          return new GetRef2(value0, value1);
        };
      };
      return GetRef2;
    }();
    var HalogenAp = function(x) {
      return x;
    };
    var HalogenM = function(x) {
      return x;
    };
    var subscribe = function(es) {
      return HalogenM(Control_Monad_Free.liftF(new Subscribe(function(v) {
        return es;
      }, Control_Category.identity(Control_Category.categoryFn))));
    };
    var raise = function(o) {
      return HalogenM(Control_Monad_Free.liftF(new Raise(o, Data_Unit.unit)));
    };
    var query = function(dictCons) {
      return function(dictIsSymbol) {
        return function(dictOrd) {
          return function(label) {
            return function(p) {
              return function(q) {
                return HalogenM(Control_Monad_Free.liftF(ChildQuery.create(Halogen_Query_ChildQuery.mkChildQueryBox(new Halogen_Query_ChildQuery.ChildQuery(function(dictApplicative) {
                  return function(k) {
                    var $132 = Data_Maybe.maybe(Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value))(k);
                    var $133 = Halogen_Data_Slot.lookup()(dictIsSymbol)(dictOrd)(label)(p);
                    return function($134) {
                      return $132($133($134));
                    };
                  };
                }, q, Control_Category.identity(Control_Category.categoryFn))))));
              };
            };
          };
        };
      };
    };
    var ordSubscriptionId = Data_Ord.ordInt;
    var ordForkId = Data_Ord.ordInt;
    var monadTransHalogenM = {
      lift: function(dictMonad) {
        return function($135) {
          return HalogenM(Control_Monad_Free.liftF(Lift.create($135)));
        };
      }
    };
    var monadHalogenM = Control_Monad_Free.freeMonad;
    var monadStateHalogenM = {
      state: function($136) {
        return HalogenM(Control_Monad_Free.liftF(State.create($136)));
      },
      Monad0: function() {
        return monadHalogenM;
      }
    };
    var monadEffectHalogenM = function(dictMonadEffect) {
      return {
        liftEffect: function() {
          var $141 = Effect_Class.liftEffect(dictMonadEffect);
          return function($142) {
            return HalogenM(Control_Monad_Free.liftF(Lift.create($141($142))));
          };
        }(),
        Monad0: function() {
          return monadHalogenM;
        }
      };
    };
    var hoist = function(dictFunctor) {
      return function(nat) {
        return function(v) {
          var go = function(v1) {
            if (v1 instanceof State) {
              return new State(v1.value0);
            }
            ;
            if (v1 instanceof Subscribe) {
              return new Subscribe(v1.value0, v1.value1);
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return new Unsubscribe(v1.value0, v1.value1);
            }
            ;
            if (v1 instanceof Lift) {
              return new Lift(nat(v1.value0));
            }
            ;
            if (v1 instanceof ChildQuery) {
              return new ChildQuery(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return new Raise(v1.value0, v1.value1);
            }
            ;
            if (v1 instanceof Par) {
              return new Par(Data_Newtype.over()()(HalogenAp)(Control_Applicative_Free.hoistFreeAp(hoist(dictFunctor)(nat)))(v1.value0));
            }
            ;
            if (v1 instanceof Fork) {
              return new Fork(hoist(dictFunctor)(nat)(v1.value0), v1.value1);
            }
            ;
            if (v1 instanceof Kill) {
              return new Kill(v1.value0, v1.value1);
            }
            ;
            if (v1 instanceof GetRef) {
              return new GetRef(v1.value0, v1.value1);
            }
            ;
            throw new Error("Failed pattern match at Halogen.Query.HalogenM (line 300, column 8 - line 310, column 29): " + [v1.constructor.name]);
          };
          return Control_Monad_Free.hoistFree(go)(v);
        };
      };
    };
    var functorHalogenM = Control_Monad_Free.freeFunctor;
    var bindHalogenM = Control_Monad_Free.freeBind;
    var applicativeHalogenM = Control_Monad_Free.freeApplicative;
    exports["State"] = State;
    exports["Subscribe"] = Subscribe;
    exports["Unsubscribe"] = Unsubscribe;
    exports["Lift"] = Lift;
    exports["ChildQuery"] = ChildQuery;
    exports["Raise"] = Raise;
    exports["Par"] = Par;
    exports["Fork"] = Fork;
    exports["Kill"] = Kill;
    exports["GetRef"] = GetRef;
    exports["raise"] = raise;
    exports["query"] = query;
    exports["SubscriptionId"] = SubscriptionId;
    exports["subscribe"] = subscribe;
    exports["ForkId"] = ForkId;
    exports["hoist"] = hoist;
    exports["functorHalogenM"] = functorHalogenM;
    exports["applicativeHalogenM"] = applicativeHalogenM;
    exports["bindHalogenM"] = bindHalogenM;
    exports["monadHalogenM"] = monadHalogenM;
    exports["monadEffectHalogenM"] = monadEffectHalogenM;
    exports["monadTransHalogenM"] = monadTransHalogenM;
    exports["monadStateHalogenM"] = monadStateHalogenM;
    exports["ordSubscriptionId"] = ordSubscriptionId;
    exports["ordForkId"] = ordForkId;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Capability.Navigate"] = $PS["App.Capability.Navigate"] || {};
    var exports = $PS["App.Capability.Navigate"];
    var Control_Monad_Trans_Class = $PS["Control.Monad.Trans.Class"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var navigate = function(dict) {
      return dict.navigate;
    };
    var logoutUser = function(dict) {
      return dict.logoutUser;
    };
    var monadNavigateHalogenM = function(dictMonadNavigate) {
      return {
        navigate: function() {
          var $4 = Control_Monad_Trans_Class.lift(Halogen_Query_HalogenM.monadTransHalogenM)(dictMonadNavigate.Monad0());
          var $5 = navigate(dictMonadNavigate);
          return function($6) {
            return $4($5($6));
          };
        }(),
        logoutUser: Control_Monad_Trans_Class.lift(Halogen_Query_HalogenM.monadTransHalogenM)(dictMonadNavigate.Monad0())(logoutUser(dictMonadNavigate)),
        Monad0: function() {
          return Halogen_Query_HalogenM.monadHalogenM;
        }
      };
    };
    exports["logoutUser"] = logoutUser;
    exports["navigate"] = navigate;
    exports["monadNavigateHalogenM"] = monadNavigateHalogenM;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Generic.Rep"] = $PS["Data.Generic.Rep"] || {};
    var exports = $PS["Data.Generic.Rep"];
    var Inl = function() {
      function Inl2(value0) {
        this.value0 = value0;
      }
      ;
      Inl2.create = function(value0) {
        return new Inl2(value0);
      };
      return Inl2;
    }();
    var Inr = function() {
      function Inr2(value0) {
        this.value0 = value0;
      }
      ;
      Inr2.create = function(value0) {
        return new Inr2(value0);
      };
      return Inr2;
    }();
    var NoArguments = function() {
      function NoArguments2() {
      }
      ;
      NoArguments2.value = new NoArguments2();
      return NoArguments2;
    }();
    var Constructor = function(x) {
      return x;
    };
    var to = function(dict) {
      return dict.to;
    };
    var from = function(dict) {
      return dict.from;
    };
    exports["to"] = to;
    exports["from"] = from;
    exports["NoArguments"] = NoArguments;
    exports["Inl"] = Inl;
    exports["Inr"] = Inr;
    exports["Constructor"] = Constructor;
  })(PS);
  (function(exports) {
    "use strict";
    exports.split = function(sep) {
      return function(s) {
        return s.split(sep);
      };
    };
    exports.joinWith = function(s) {
      return function(xs) {
        return xs.join(s);
      };
    };
  })(PS["Data.String.Common"] = PS["Data.String.Common"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.String.Common"] = $PS["Data.String.Common"] || {};
    var exports = $PS["Data.String.Common"];
    var $foreign = $PS["Data.String.Common"];
    exports["split"] = $foreign.split;
    exports["joinWith"] = $foreign.joinWith;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Alt"] = $PS["Control.Alt"] || {};
    var exports = $PS["Control.Alt"];
    var alt = function(dict) {
      return dict.alt;
    };
    exports["alt"] = alt;
  })(PS);
  (function(exports) {
    "use strict";
    exports.length = function(xs) {
      return xs.length;
    };
    exports.unconsImpl = function(empty) {
      return function(next) {
        return function(xs) {
          return xs.length === 0 ? empty({}) : next(xs[0])(xs.slice(1));
        };
      };
    };
    exports.indexImpl = function(just) {
      return function(nothing) {
        return function(xs) {
          return function(i) {
            return i < 0 || i >= xs.length ? nothing : just(xs[i]);
          };
        };
      };
    };
    exports.findIndexImpl = function(just) {
      return function(nothing) {
        return function(f) {
          return function(xs) {
            for (var i = 0, l = xs.length; i < l; i++) {
              if (f(xs[i]))
                return just(i);
            }
            return nothing;
          };
        };
      };
    };
    exports._deleteAt = function(just) {
      return function(nothing) {
        return function(i) {
          return function(l) {
            if (i < 0 || i >= l.length)
              return nothing;
            var l1 = l.slice();
            l1.splice(i, 1);
            return just(l1);
          };
        };
      };
    };
    exports.slice = function(s) {
      return function(e) {
        return function(l) {
          return l.slice(s, e);
        };
      };
    };
  })(PS["Data.Array"] = PS["Data.Array"] || {});
  (function(exports) {
    "use strict";
    exports.pushAll = function(as) {
      return function(xs) {
        return function() {
          return xs.push.apply(xs, as);
        };
      };
    };
    exports.unsafeFreeze = function(xs) {
      return function() {
        return xs;
      };
    };
    function copyImpl(xs) {
      return function() {
        return xs.slice();
      };
    }
    exports.thaw = copyImpl;
  })(PS["Data.Array.ST"] = PS["Data.Array.ST"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.Array.ST"] = $PS["Data.Array.ST"] || {};
    var exports = $PS["Data.Array.ST"];
    var $foreign = $PS["Data.Array.ST"];
    var withArray = function(f) {
      return function(xs) {
        return function __do() {
          var result = $foreign.thaw(xs)();
          f(result)();
          return $foreign.unsafeFreeze(result)();
        };
      };
    };
    var push = function(a) {
      return $foreign.pushAll([a]);
    };
    exports["withArray"] = withArray;
    exports["push"] = push;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Boolean"] = $PS["Data.Boolean"] || {};
    var exports = $PS["Data.Boolean"];
    var otherwise = true;
    exports["otherwise"] = otherwise;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Array"] = $PS["Data.Array"] || {};
    var exports = $PS["Data.Array"];
    var $foreign = $PS["Data.Array"];
    var Data_Array_ST = $PS["Data.Array.ST"];
    var Data_Boolean = $PS["Data.Boolean"];
    var Data_Function = $PS["Data.Function"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var uncons = $foreign.unconsImpl(Data_Function["const"](Data_Maybe.Nothing.value))(function(x) {
      return function(xs) {
        return new Data_Maybe.Just({
          head: x,
          tail: xs
        });
      };
    });
    var take = function(n) {
      return function(xs) {
        var $67 = n < 1;
        if ($67) {
          return [];
        }
        ;
        return $foreign.slice(0)(n)(xs);
      };
    };
    var tail = $foreign.unconsImpl(Data_Function["const"](Data_Maybe.Nothing.value))(function(v) {
      return function(xs) {
        return new Data_Maybe.Just(xs);
      };
    });
    var snoc = function(xs) {
      return function(x) {
        return Data_Array_ST.withArray(Data_Array_ST.push(x))(xs)();
      };
    };
    var singleton = function(a) {
      return [a];
    };
    var $$null = function(xs) {
      return $foreign.length(xs) === 0;
    };
    var init = function(xs) {
      if ($$null(xs)) {
        return Data_Maybe.Nothing.value;
      }
      ;
      if (Data_Boolean.otherwise) {
        return new Data_Maybe.Just($foreign.slice(0)($foreign.length(xs) - 1 | 0)(xs));
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 340, column 1 - line 340, column 45): " + [xs.constructor.name]);
    };
    var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
    var last = function(xs) {
      return index(xs)($foreign.length(xs) - 1 | 0);
    };
    var head = function(xs) {
      return index(xs)(0);
    };
    var findIndex = $foreign.findIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
    var drop = function(n) {
      return function(xs) {
        var $89 = n < 1;
        if ($89) {
          return xs;
        }
        ;
        return $foreign.slice(n)($foreign.length(xs))(xs);
      };
    };
    var deleteAt = $foreign["_deleteAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
    var deleteBy = function(v) {
      return function(v1) {
        return function(v2) {
          if (v2.length === 0) {
            return [];
          }
          ;
          return Data_Maybe.maybe(v2)(function(i) {
            return Data_Maybe.fromJust()(deleteAt(i)(v2));
          })(findIndex(v(v1))(v2));
        };
      };
    };
    var cons = function(x) {
      return function(xs) {
        return Data_Semigroup.append(Data_Semigroup.semigroupArray)([x])(xs);
      };
    };
    exports["singleton"] = singleton;
    exports["cons"] = cons;
    exports["snoc"] = snoc;
    exports["head"] = head;
    exports["last"] = last;
    exports["tail"] = tail;
    exports["init"] = init;
    exports["uncons"] = uncons;
    exports["take"] = take;
    exports["drop"] = drop;
    exports["deleteBy"] = deleteBy;
    exports["length"] = $foreign.length;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Array.NonEmpty.Internal"] = $PS["Data.Array.NonEmpty.Internal"] || {};
    var exports = $PS["Data.Array.NonEmpty.Internal"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var NonEmptyArray = function(x) {
      return x;
    };
    var semigroupNonEmptyArray = Data_Semigroup.semigroupArray;
    var functorNonEmptyArray = Data_Functor.functorArray;
    var foldableNonEmptyArray = Data_Foldable.foldableArray;
    exports["NonEmptyArray"] = NonEmptyArray;
    exports["semigroupNonEmptyArray"] = semigroupNonEmptyArray;
    exports["functorNonEmptyArray"] = functorNonEmptyArray;
    exports["foldableNonEmptyArray"] = foldableNonEmptyArray;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Array.NonEmpty"] = $PS["Data.Array.NonEmpty"] || {};
    var exports = $PS["Data.Array.NonEmpty"];
    var Data_Array = $PS["Data.Array"];
    var Data_Array_NonEmpty_Internal = $PS["Data.Array.NonEmpty.Internal"];
    var Data_Boolean = $PS["Data.Boolean"];
    var Data_Maybe = $PS["Data.Maybe"];
    var unsafeFromArray = Data_Array_NonEmpty_Internal.NonEmptyArray;
    var toArray = function(v) {
      return v;
    };
    var snoc$prime = function(xs) {
      return function(x) {
        return unsafeFromArray(Data_Array.snoc(xs)(x));
      };
    };
    var snoc = function(xs) {
      return function(x) {
        return unsafeFromArray(Data_Array.snoc(toArray(xs))(x));
      };
    };
    var singleton = function($60) {
      return unsafeFromArray(Data_Array.singleton($60));
    };
    var fromArray = function(xs) {
      if (Data_Array.length(xs) > 0) {
        return new Data_Maybe.Just(unsafeFromArray(xs));
      }
      ;
      if (Data_Boolean.otherwise) {
        return Data_Maybe.Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Array.NonEmpty (line 159, column 1 - line 159, column 58): " + [xs.constructor.name]);
    };
    var cons$prime = function(x) {
      return function(xs) {
        return unsafeFromArray(Data_Array.cons(x)(xs));
      };
    };
    var adaptMaybe = function(f) {
      var $75 = Data_Maybe.fromJust();
      return function($76) {
        return $75(f(toArray($76)));
      };
    };
    var head = adaptMaybe(Data_Array.head);
    var init = adaptMaybe(Data_Array.init);
    var last = adaptMaybe(Data_Array.last);
    var tail = adaptMaybe(Data_Array.tail);
    var adaptAny = function(f) {
      return function($78) {
        return f(toArray($78));
      };
    };
    var length = adaptAny(Data_Array.length);
    var unsafeAdapt = function(f) {
      var $79 = adaptAny(f);
      return function($80) {
        return unsafeFromArray($79($80));
      };
    };
    var cons = function(x) {
      return unsafeAdapt(Data_Array.cons(x));
    };
    exports["fromArray"] = fromArray;
    exports["singleton"] = singleton;
    exports["cons"] = cons;
    exports["cons'"] = cons$prime;
    exports["snoc"] = snoc;
    exports["snoc'"] = snoc$prime;
    exports["head"] = head;
    exports["last"] = last;
    exports["tail"] = tail;
    exports["init"] = init;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Bifunctor"] = $PS["Data.Bifunctor"] || {};
    var exports = $PS["Data.Bifunctor"];
    var Control_Category = $PS["Control.Category"];
    var Data_Tuple = $PS["Data.Tuple"];
    var bimap = function(dict) {
      return dict.bimap;
    };
    var lmap = function(dictBifunctor) {
      return function(f) {
        return bimap(dictBifunctor)(f)(Control_Category.identity(Control_Category.categoryFn));
      };
    };
    var bifunctorTuple = {
      bimap: function(f) {
        return function(g) {
          return function(v) {
            return new Data_Tuple.Tuple(f(v.value0), g(v.value1));
          };
        };
      }
    };
    exports["bimap"] = bimap;
    exports["lmap"] = lmap;
    exports["bifunctorTuple"] = bifunctorTuple;
  })(PS);
  (function(exports) {
    "use strict";
    exports.length = function(s) {
      return s.length;
    };
    exports._indexOf = function(just) {
      return function(nothing) {
        return function(x) {
          return function(s) {
            var i = s.indexOf(x);
            return i === -1 ? nothing : just(i);
          };
        };
      };
    };
    exports.take = function(n) {
      return function(s) {
        return s.substr(0, n);
      };
    };
    exports.drop = function(n) {
      return function(s) {
        return s.substring(n);
      };
    };
    exports.splitAt = function(i) {
      return function(s) {
        return { before: s.substring(0, i), after: s.substring(i) };
      };
    };
  })(PS["Data.String.CodeUnits"] = PS["Data.String.CodeUnits"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.String.CodeUnits"] = $PS["Data.String.CodeUnits"] || {};
    var exports = $PS["Data.String.CodeUnits"];
    var $foreign = $PS["Data.String.CodeUnits"];
    var Data_Maybe = $PS["Data.Maybe"];
    var stripPrefix = function(v) {
      return function(str) {
        var v1 = $foreign.splitAt($foreign.length(v))(str);
        var $15 = v1.before === v;
        if ($15) {
          return new Data_Maybe.Just(v1.after);
        }
        ;
        return Data_Maybe.Nothing.value;
      };
    };
    var indexOf = $foreign["_indexOf"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
    exports["stripPrefix"] = stripPrefix;
    exports["indexOf"] = indexOf;
    exports["length"] = $foreign.length;
    exports["take"] = $foreign.take;
    exports["drop"] = $foreign.drop;
  })(PS);
  (function(exports) {
    "use strict";
    function toRFC3896(input) {
      return input.replace(/[!'()*]/g, function(c) {
        return "%" + c.charCodeAt(0).toString(16);
      });
    }
    exports._encodeURIComponent = function encode(fail, succeed, input) {
      try {
        return succeed(toRFC3896(encodeURIComponent(input)));
      } catch (err) {
        return fail(err);
      }
    };
    function _decodeURIComponent(fail, succeed, input) {
      try {
        return succeed(decodeURIComponent(input));
      } catch (err) {
        return fail(err);
      }
    }
    exports._decodeURIComponent = _decodeURIComponent;
  })(PS["JSURI"] = PS["JSURI"] || {});
  (function(exports) {
    "use strict";
    exports.runFn3 = function(fn) {
      return function(a) {
        return function(b) {
          return function(c) {
            return fn(a, b, c);
          };
        };
      };
    };
    exports.runFn4 = function(fn) {
      return function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return fn(a, b, c, d);
            };
          };
        };
      };
    };
  })(PS["Data.Function.Uncurried"] = PS["Data.Function.Uncurried"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.Function.Uncurried"] = $PS["Data.Function.Uncurried"] || {};
    var exports = $PS["Data.Function.Uncurried"];
    var $foreign = $PS["Data.Function.Uncurried"];
    exports["runFn3"] = $foreign.runFn3;
    exports["runFn4"] = $foreign.runFn4;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["JSURI"] = $PS["JSURI"] || {};
    var exports = $PS["JSURI"];
    var $foreign = $PS["JSURI"];
    var Data_Function = $PS["Data.Function"];
    var Data_Function_Uncurried = $PS["Data.Function.Uncurried"];
    var Data_Maybe = $PS["Data.Maybe"];
    var $$encodeURIComponent = Data_Function_Uncurried.runFn3($foreign["_encodeURIComponent"])(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Maybe.Just.create);
    var $$decodeURIComponent = Data_Function_Uncurried.runFn3($foreign["_decodeURIComponent"])(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Maybe.Just.create);
    exports["encodeURIComponent"] = $$encodeURIComponent;
    exports["decodeURIComponent"] = $$decodeURIComponent;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Routing.Duplex.Parser"] = $PS["Routing.Duplex.Parser"] || {};
    var exports = $PS["Routing.Duplex.Parser"];
    var Control_Alt = $PS["Control.Alt"];
    var Data_Array = $PS["Data.Array"];
    var Data_Array_NonEmpty = $PS["Data.Array.NonEmpty"];
    var Data_Array_NonEmpty_Internal = $PS["Data.Array.NonEmpty.Internal"];
    var Data_Bifunctor = $PS["Data.Bifunctor"];
    var Data_Boolean = $PS["Data.Boolean"];
    var Data_Either = $PS["Data.Either"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Data_String_CodeUnits = $PS["Data.String.CodeUnits"];
    var Data_String_Common = $PS["Data.String.Common"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Data_Unit = $PS["Data.Unit"];
    var JSURI = $PS["JSURI"];
    var Expected = function() {
      function Expected2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Expected2.create = function(value0) {
        return function(value1) {
          return new Expected2(value0, value1);
        };
      };
      return Expected2;
    }();
    var ExpectedEndOfPath = function() {
      function ExpectedEndOfPath2(value0) {
        this.value0 = value0;
      }
      ;
      ExpectedEndOfPath2.create = function(value0) {
        return new ExpectedEndOfPath2(value0);
      };
      return ExpectedEndOfPath2;
    }();
    var EndOfPath = function() {
      function EndOfPath2() {
      }
      ;
      EndOfPath2.value = new EndOfPath2();
      return EndOfPath2;
    }();
    var Fail = function() {
      function Fail2(value0) {
        this.value0 = value0;
      }
      ;
      Fail2.create = function(value0) {
        return new Fail2(value0);
      };
      return Fail2;
    }();
    var Success = function() {
      function Success2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Success2.create = function(value0) {
        return function(value1) {
          return new Success2(value0, value1);
        };
      };
      return Success2;
    }();
    var Alt = function() {
      function Alt2(value0) {
        this.value0 = value0;
      }
      ;
      Alt2.create = function(value0) {
        return new Alt2(value0);
      };
      return Alt2;
    }();
    var Chomp = function() {
      function Chomp2(value0) {
        this.value0 = value0;
      }
      ;
      Chomp2.create = function(value0) {
        return new Chomp2(value0);
      };
      return Chomp2;
    }();
    var Prefix = function() {
      function Prefix2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Prefix2.create = function(value0) {
        return function(value1) {
          return new Prefix2(value0, value1);
        };
      };
      return Prefix2;
    }();
    var take = new Chomp(function(state) {
      var v = Data_Array.uncons(state.segments);
      if (v instanceof Data_Maybe.Just) {
        return new Success({
          segments: v.value0.tail,
          params: state.params,
          hash: state.hash
        }, v.value0.head);
      }
      ;
      return new Fail(EndOfPath.value);
    });
    var prefix = Prefix.create;
    var parsePath = function() {
      var unsafeDecodeURIComponent = function() {
        var $236 = Data_Maybe.fromJust();
        return function($237) {
          return $236(JSURI["decodeURIComponent"]($237));
        };
      }();
      var toRouteState = function(v) {
        return {
          segments: v.value0.value0,
          params: v.value0.value1,
          hash: v.value1
        };
      };
      var splitNonEmpty = function(v) {
        return function(v1) {
          if (v1 === "") {
            return [];
          }
          ;
          return Data_String_Common.split(v)(v1);
        };
      };
      var splitSegments = function() {
        var $238 = splitNonEmpty("/");
        return function($239) {
          return function(v) {
            if (v.length === 2 && (v[0] === "" && v[1] === "")) {
              return [""];
            }
            ;
            return Data_Functor.map(Data_Functor.functorArray)(unsafeDecodeURIComponent)(v);
          }($238($239));
        };
      }();
      var splitAt = function(k) {
        return function(p) {
          return function(str) {
            var v = Data_String_CodeUnits.indexOf(p)(str);
            if (v instanceof Data_Maybe.Just) {
              return new Data_Tuple.Tuple(Data_String_CodeUnits.take(v.value0)(str), Data_String_CodeUnits.drop(v.value0 + Data_String_CodeUnits.length(p) | 0)(str));
            }
            ;
            if (v instanceof Data_Maybe.Nothing) {
              return k(str);
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Parser (line 185, column 5 - line 187, column 23): " + [v.constructor.name]);
          };
        };
      };
      var splitKeyValue = function() {
        var $240 = Data_Bifunctor.bimap(Data_Bifunctor.bifunctorTuple)(unsafeDecodeURIComponent)(unsafeDecodeURIComponent);
        var $241 = splitAt(Data_Function.flip(Data_Tuple.Tuple.create)(""))("=");
        return function($242) {
          return $240($241($242));
        };
      }();
      var splitParams = function() {
        var $243 = Data_Functor.map(Data_Functor.functorArray)(splitKeyValue);
        var $244 = splitNonEmpty("&");
        return function($245) {
          return $243($244($245));
        };
      }();
      var splitPath = function() {
        var $246 = Data_Bifunctor.bimap(Data_Bifunctor.bifunctorTuple)(splitSegments)(splitParams);
        var $247 = splitAt(Data_Function.flip(Data_Tuple.Tuple.create)(""))("?");
        return function($248) {
          return $246($247($248));
        };
      }();
      var $249 = Data_Bifunctor.lmap(Data_Bifunctor.bifunctorTuple)(splitPath);
      var $250 = splitAt(Data_Function.flip(Data_Tuple.Tuple.create)(""))("#");
      return function($251) {
        return toRouteState($249($250($251)));
      };
    }();
    var hash = new Chomp(function(state) {
      return new Success(state, state.hash);
    });
    var functorRouteResult = {
      map: function(f) {
        return function(m) {
          if (m instanceof Fail) {
            return new Fail(m.value0);
          }
          ;
          if (m instanceof Success) {
            return new Success(m.value0, f(m.value1));
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 53, column 1 - line 53, column 58): " + [m.constructor.name]);
        };
      }
    };
    var functorRouteParser = {
      map: function(f) {
        return function(m) {
          if (m instanceof Alt) {
            return new Alt(Data_Functor.map(Data_Array_NonEmpty_Internal.functorNonEmptyArray)(Data_Functor.map(functorRouteParser)(f))(m.value0));
          }
          ;
          if (m instanceof Chomp) {
            return new Chomp(Data_Functor.map(Data_Functor.functorFn)(Data_Functor.map(functorRouteResult)(f))(m.value0));
          }
          ;
          if (m instanceof Prefix) {
            return new Prefix(m.value0, Data_Functor.map(functorRouteParser)(f)(m.value1));
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 72, column 1 - line 72, column 58): " + [m.constructor.name]);
        };
      }
    };
    var end = new Chomp(function(state) {
      var v = Data_Array.head(state.segments);
      if (v instanceof Data_Maybe.Nothing) {
        return new Success(state, Data_Unit.unit);
      }
      ;
      if (v instanceof Data_Maybe.Just) {
        return new Fail(new ExpectedEndOfPath(v.value0));
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 256, column 3 - line 258, column 45): " + [v.constructor.name]);
    });
    var chompPrefix = function(pre) {
      return function(state) {
        var v = Data_Array.head(state.segments);
        if (v instanceof Data_Maybe.Just && pre === v.value0) {
          return new Success({
            segments: Data_Array.drop(1)(state.segments),
            params: state.params,
            hash: state.hash
          }, Data_Unit.unit);
        }
        ;
        if (v instanceof Data_Maybe.Just) {
          return Fail.create(new Expected(pre, v.value0));
        }
        ;
        return Fail.create(EndOfPath.value);
      };
    };
    var runRouteParser = function() {
      var goAlt = function(v) {
        return function(v1) {
          return function(v2) {
            if (v1 instanceof Fail) {
              return runRouteParser(v)(v2);
            }
            ;
            return v1;
          };
        };
      };
      var go = function($copy_state) {
        return function($copy_v) {
          var $tco_var_state = $copy_state;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(state, v) {
            if (v instanceof Alt) {
              $tco_done = true;
              return Data_Foldable.foldl(Data_Array_NonEmpty_Internal.foldableNonEmptyArray)(goAlt(state))(new Fail(EndOfPath.value))(v.value0);
            }
            ;
            if (v instanceof Chomp) {
              $tco_done = true;
              return v.value0(state);
            }
            ;
            if (v instanceof Prefix) {
              var v1 = chompPrefix(v.value0)(state);
              if (v1 instanceof Fail) {
                $tco_done = true;
                return new Fail(v1.value0);
              }
              ;
              if (v1 instanceof Success) {
                $tco_var_state = v1.value0;
                $copy_v = v.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Routing.Duplex.Parser (line 149, column 7 - line 151, column 40): " + [v1.constructor.name]);
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Parser (line 145, column 14 - line 151, column 40): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_state, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go;
    }();
    var run = function(p) {
      var $254 = Data_Function.flip(runRouteParser)(p);
      return function($255) {
        return function(v) {
          if (v instanceof Fail) {
            return new Data_Either.Left(v.value0);
          }
          ;
          if (v instanceof Success) {
            return new Data_Either.Right(v.value1);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 190, column 49 - line 192, column 29): " + [v.constructor.name]);
        }($254(parsePath($255)));
      };
    };
    var applyRouteParser = {
      apply: function(fx) {
        return function(x) {
          return new Chomp(function(state) {
            var v = runRouteParser(state)(fx);
            if (v instanceof Fail) {
              return new Fail(v.value0);
            }
            ;
            if (v instanceof Success) {
              return Data_Functor.map(functorRouteResult)(v.value1)(runRouteParser(v.value0)(x));
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Parser (line 76, column 5 - line 78, column 56): " + [v.constructor.name]);
          });
        };
      },
      Functor0: function() {
        return functorRouteParser;
      }
    };
    var applicativeRouteParser = {
      pure: function() {
        var $256 = Data_Function.flip(Success.create);
        return function($257) {
          return Chomp.create($256($257));
        };
      }(),
      Apply0: function() {
        return applyRouteParser;
      }
    };
    var altSnoc = function(ls) {
      return function(v) {
        var v1 = function(v2) {
          return Data_Array_NonEmpty.snoc(ls)(v);
        };
        if (v instanceof Prefix) {
          var $197 = Data_Array_NonEmpty.last(ls);
          if ($197 instanceof Prefix) {
            var $198 = v.value0 === $197.value0;
            if ($198) {
              return Data_Array_NonEmpty["snoc'"](Data_Array_NonEmpty.init(ls))(new Prefix(v.value0, Control_Alt.alt(altRouteParser)($197.value1)(v.value1)));
            }
            ;
            return v1(true);
          }
          ;
          return v1(true);
        }
        ;
        return v1(true);
      };
    };
    var altRouteParser = {
      alt: function(v) {
        return function(v1) {
          if (v instanceof Alt && v1 instanceof Alt) {
            return new Alt(altAppend(v.value0)(v1.value0));
          }
          ;
          if (v instanceof Alt) {
            return new Alt(altSnoc(v.value0)(v1));
          }
          ;
          if (v1 instanceof Alt) {
            return new Alt(altCons(v)(v1.value0));
          }
          ;
          if (v instanceof Prefix && (v1 instanceof Prefix && v.value0 === v1.value0)) {
            return new Prefix(v.value0, Control_Alt.alt(altRouteParser)(v.value1)(v1.value1));
          }
          ;
          return new Alt(Data_Array_NonEmpty.cons(v)(Data_Array_NonEmpty.singleton(v1)));
        };
      },
      Functor0: function() {
        return functorRouteParser;
      }
    };
    var altCons = function(v) {
      return function(rs) {
        var v1 = function(v2) {
          return Data_Array_NonEmpty.cons(v)(rs);
        };
        if (v instanceof Prefix) {
          var $217 = Data_Array_NonEmpty.head(rs);
          if ($217 instanceof Prefix) {
            var $218 = v.value0 === $217.value0;
            if ($218) {
              return Data_Array_NonEmpty["cons'"](new Prefix(v.value0, Control_Alt.alt(altRouteParser)(v.value1)($217.value1)))(Data_Array_NonEmpty.tail(rs));
            }
            ;
            return v1(true);
          }
          ;
          return v1(true);
        }
        ;
        return v1(true);
      };
    };
    var altAppend = function($copy_ls) {
      return function($copy_rs) {
        var $tco_var_ls = $copy_ls;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(ls, rs) {
          var v = function(v12) {
            if (Data_Boolean.otherwise) {
              return Data_Semigroup.append(Data_Array_NonEmpty_Internal.semigroupNonEmptyArray)(ls)(rs);
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Parser (line 98, column 1 - line 101, column 32): " + [ls.constructor.name, rs.constructor.name]);
          };
          var $227 = Data_Array_NonEmpty.last(ls);
          if ($227 instanceof Prefix) {
            var $228 = Data_Array_NonEmpty.head(rs);
            if ($228 instanceof Prefix) {
              var $229 = $227.value0 === $228.value0;
              if ($229) {
                var rs$prime = Data_Array_NonEmpty["cons'"](new Prefix($227.value0, Control_Alt.alt(altRouteParser)($227.value1)($228.value1)))(Data_Array_NonEmpty.tail(rs));
                var v1 = Data_Array_NonEmpty.fromArray(Data_Array_NonEmpty.init(ls));
                if (v1 instanceof Data_Maybe.Just) {
                  $tco_var_ls = v1.value0;
                  $copy_rs = rs$prime;
                  return;
                }
                ;
                if (v1 instanceof Data_Maybe.Nothing) {
                  $tco_done = true;
                  return rs$prime;
                }
                ;
                throw new Error("Failed pattern match at Routing.Duplex.Parser (line 110, column 9 - line 112, column 26): " + [v1.constructor.name]);
              }
              ;
              $tco_done = true;
              return v(true);
            }
            ;
            $tco_done = true;
            return v(true);
          }
          ;
          $tco_done = true;
          return v(true);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_ls, $copy_rs);
        }
        ;
        return $tco_result;
      };
    };
    exports["run"] = run;
    exports["prefix"] = prefix;
    exports["end"] = end;
    exports["functorRouteParser"] = functorRouteParser;
    exports["applyRouteParser"] = applyRouteParser;
    exports["applicativeRouteParser"] = applicativeRouteParser;
    exports["altRouteParser"] = altRouteParser;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Routing.Duplex.Types"] = $PS["Routing.Duplex.Types"] || {};
    var exports = $PS["Routing.Duplex.Types"];
    var emptyRouteState = {
      segments: [],
      params: [],
      hash: ""
    };
    exports["emptyRouteState"] = emptyRouteState;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Routing.Duplex.Printer"] = $PS["Routing.Duplex.Printer"] || {};
    var exports = $PS["Routing.Duplex.Printer"];
    var Control_Category = $PS["Control.Category"];
    var Data_Array = $PS["Data.Array"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Newtype = $PS["Data.Newtype"];
    var Data_String_Common = $PS["Data.String.Common"];
    var Data_Tuple = $PS["Data.Tuple"];
    var JSURI = $PS["JSURI"];
    var Routing_Duplex_Types = $PS["Routing.Duplex.Types"];
    var semigroupRoutePrinter = {
      append: function(v) {
        return function(v1) {
          return function($25) {
            return v1(v($25));
          };
        };
      }
    };
    var put = function(str) {
      return function(state) {
        return {
          segments: Data_Array.snoc(state.segments)(str),
          params: state.params,
          hash: state.hash
        };
      };
    };
    var printPath = function(v) {
      var unsafeEncodeURIComponent = function() {
        var $26 = Data_Maybe.fromJust();
        return function($27) {
          return $26(JSURI["encodeURIComponent"]($27));
        };
      }();
      var printSegments = function(v1) {
        if (v1.length === 1 && v1[0] === "") {
          return "/";
        }
        ;
        return Data_String_Common.joinWith("/")(Data_Functor.map(Data_Functor.functorArray)(unsafeEncodeURIComponent)(v1));
      };
      var printParam = function(key) {
        return function(v1) {
          if (v1 === "") {
            return unsafeEncodeURIComponent(key);
          }
          ;
          return unsafeEncodeURIComponent(key) + ("=" + unsafeEncodeURIComponent(v1));
        };
      };
      var printParams = function(v1) {
        if (v1.length === 0) {
          return "";
        }
        ;
        return "?" + Data_String_Common.joinWith("&")(Data_Functor.map(Data_Functor.functorArray)(Data_Tuple.uncurry(printParam))(v1));
      };
      var printHash = function(v1) {
        if (v1 === "") {
          return "";
        }
        ;
        return "#" + v1;
      };
      return printSegments(v.segments) + (printParams(v.params) + printHash(v.hash));
    };
    var run = function() {
      var $28 = Data_Function.applyFlipped(Routing_Duplex_Types.emptyRouteState);
      var $29 = Data_Newtype.unwrap();
      return function($30) {
        return printPath($28($29($30)));
      };
    }();
    var monoidRoutePRinter = {
      mempty: Control_Category.identity(Control_Category.categoryFn),
      Semigroup0: function() {
        return semigroupRoutePrinter;
      }
    };
    var hash = function(h) {
      return function(v) {
        return {
          segments: v.segments,
          params: v.params,
          hash: h
        };
      };
    };
    exports["put"] = put;
    exports["run"] = run;
    exports["semigroupRoutePrinter"] = semigroupRoutePrinter;
    exports["monoidRoutePRinter"] = monoidRoutePRinter;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Routing.Duplex"] = $PS["Routing.Duplex"] || {};
    var exports = $PS["Routing.Duplex"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Apply = $PS["Control.Apply"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Monoid = $PS["Data.Monoid"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Data_String_Common = $PS["Data.String.Common"];
    var Routing_Duplex_Parser = $PS["Routing.Duplex.Parser"];
    var Routing_Duplex_Printer = $PS["Routing.Duplex.Printer"];
    var RouteDuplex = function() {
      function RouteDuplex2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      RouteDuplex2.create = function(value0) {
        return function(value1) {
          return new RouteDuplex2(value0, value1);
        };
      };
      return RouteDuplex2;
    }();
    var profunctorRouteDuplex = {
      dimap: function(f) {
        return function(g) {
          return function(v) {
            return new RouteDuplex(function($103) {
              return v.value0(f($103));
            }, Data_Functor.map(Routing_Duplex_Parser.functorRouteParser)(g)(v.value1));
          };
        };
      }
    };
    var print = function(v) {
      return function($104) {
        return Routing_Duplex_Printer.run(v.value0($104));
      };
    };
    var prefix = function(s) {
      return function(v) {
        return new RouteDuplex(function(a) {
          return Data_Semigroup.append(Routing_Duplex_Printer.semigroupRoutePrinter)(Routing_Duplex_Printer.put(s))(v.value0(a));
        }, Routing_Duplex_Parser.prefix(s)(v.value1));
      };
    };
    var path = function() {
      var $105 = Data_Function.flip(Data_Foldable.foldr(Data_Foldable.foldableArray)(prefix));
      var $106 = Data_String_Common.split("/");
      return function($107) {
        return $105($106($107));
      };
    }();
    var root = path("");
    var parse = function(v) {
      return Routing_Duplex_Parser.run(v.value1);
    };
    var functorRouteDuplex = {
      map: function(f) {
        return function(m) {
          return new RouteDuplex(m.value0, Data_Functor.map(Routing_Duplex_Parser.functorRouteParser)(f)(m.value1));
        };
      }
    };
    var end = function(v) {
      return new RouteDuplex(v.value0, Control_Apply.applyFirst(Routing_Duplex_Parser.applyRouteParser)(v.value1)(Routing_Duplex_Parser.end));
    };
    var applyRouteDuplex = {
      apply: function(v) {
        return function(v1) {
          return new RouteDuplex(Control_Apply.apply(Control_Apply.applyFn)(Data_Functor.map(Data_Functor.functorFn)(Data_Semigroup.append(Routing_Duplex_Printer.semigroupRoutePrinter))(v.value0))(v1.value0), Control_Apply.apply(Routing_Duplex_Parser.applyRouteParser)(v.value1)(v1.value1));
        };
      },
      Functor0: function() {
        return functorRouteDuplex;
      }
    };
    var applicativeRouteDuplex = {
      pure: function() {
        var $109 = RouteDuplex.create(Data_Function["const"](Data_Monoid.mempty(Routing_Duplex_Printer.monoidRoutePRinter)));
        var $110 = Control_Applicative.pure(Routing_Duplex_Parser.applicativeRouteParser);
        return function($111) {
          return $109($110($111));
        };
      }(),
      Apply0: function() {
        return applyRouteDuplex;
      }
    };
    exports["RouteDuplex"] = RouteDuplex;
    exports["parse"] = parse;
    exports["print"] = print;
    exports["prefix"] = prefix;
    exports["root"] = root;
    exports["end"] = end;
    exports["applicativeRouteDuplex"] = applicativeRouteDuplex;
    exports["profunctorRouteDuplex"] = profunctorRouteDuplex;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Profunctor"] = $PS["Data.Profunctor"] || {};
    var exports = $PS["Data.Profunctor"];
    var dimap = function(dict) {
      return dict.dimap;
    };
    exports["dimap"] = dimap;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Record"] = $PS["Record"] || {};
    var exports = $PS["Record"];
    var Data_Symbol = $PS["Data.Symbol"];
    var Record_Unsafe = $PS["Record.Unsafe"];
    var get = function(dictIsSymbol) {
      return function(dictCons) {
        return function(l) {
          return function(r) {
            return Record_Unsafe.unsafeGet(Data_Symbol.reflectSymbol(dictIsSymbol)(l))(r);
          };
        };
      };
    };
    exports["get"] = get;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Routing.Duplex.Generic"] = $PS["Routing.Duplex.Generic"] || {};
    var exports = $PS["Routing.Duplex.Generic"];
    var Control_Alt = $PS["Control.Alt"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Category = $PS["Control.Category"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Generic_Rep = $PS["Data.Generic.Rep"];
    var Data_Profunctor = $PS["Data.Profunctor"];
    var Record = $PS["Record"];
    var Routing_Duplex = $PS["Routing.Duplex"];
    var Routing_Duplex_Parser = $PS["Routing.Duplex.Parser"];
    var Type_Proxy = $PS["Type.Proxy"];
    var noArgs = Control_Applicative.pure(Routing_Duplex.applicativeRouteDuplex)(Data_Generic_Rep.NoArguments.value);
    var gRouteNoArguments = {
      gRouteDuplexCtr: Control_Category.identity(Control_Category.categoryFn)
    };
    var gRouteDuplexCtr = function(dict) {
      return dict.gRouteDuplexCtr;
    };
    var gRouteDuplex = function(dict) {
      return dict.gRouteDuplex;
    };
    var gRouteSum = function(dictGRouteDuplex) {
      return function(dictGRouteDuplex1) {
        return {
          gRouteDuplex: function(r) {
            var v = gRouteDuplex(dictGRouteDuplex)(r);
            var v1 = gRouteDuplex(dictGRouteDuplex1)(r);
            var enc = function(v2) {
              if (v2 instanceof Data_Generic_Rep.Inl) {
                return v.value0(v2.value0);
              }
              ;
              if (v2 instanceof Data_Generic_Rep.Inr) {
                return v1.value0(v2.value0);
              }
              ;
              throw new Error("Failed pattern match at Routing.Duplex.Generic (line 33, column 11 - line 35, column 22): " + [v2.constructor.name]);
            };
            var dec = Control_Alt.alt(Routing_Duplex_Parser.altRouteParser)(Data_Functor.map(Routing_Duplex_Parser.functorRouteParser)(Data_Generic_Rep.Inl.create)(v.value1))(Data_Functor.map(Routing_Duplex_Parser.functorRouteParser)(Data_Generic_Rep.Inr.create)(v1.value1));
            return new Routing_Duplex.RouteDuplex(enc, dec);
          }
        };
      };
    };
    var sum = function(dictGeneric) {
      return function(dictGRouteDuplex) {
        var $50 = Data_Profunctor.dimap(Routing_Duplex.profunctorRouteDuplex)(Data_Generic_Rep.from(dictGeneric))(Data_Generic_Rep.to(dictGeneric));
        var $51 = gRouteDuplex(dictGRouteDuplex);
        return function($52) {
          return $50($51($52));
        };
      };
    };
    var gRouteConstructor = function(dictIsSymbol) {
      return function(dictCons) {
        return function(dictGRouteDuplexCtr) {
          return {
            gRouteDuplex: function(r) {
              var v = Routing_Duplex.end(gRouteDuplexCtr(dictGRouteDuplexCtr)(Record.get(dictIsSymbol)()(Type_Proxy["Proxy"].value)(r)));
              var enc = function(v1) {
                return v.value0(v1);
              };
              var dec = Data_Functor.map(Routing_Duplex_Parser.functorRouteParser)(Data_Generic_Rep.Constructor)(v.value1);
              return new Routing_Duplex.RouteDuplex(enc, dec);
            }
          };
        };
      };
    };
    exports["gRouteDuplexCtr"] = gRouteDuplexCtr;
    exports["sum"] = sum;
    exports["noArgs"] = noArgs;
    exports["gRouteSum"] = gRouteSum;
    exports["gRouteConstructor"] = gRouteConstructor;
    exports["gRouteNoArguments"] = gRouteNoArguments;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Routing.Duplex.Generic.Syntax"] = $PS["Routing.Duplex.Generic.Syntax"] || {};
    var exports = $PS["Routing.Duplex.Generic.Syntax"];
    var Routing_Duplex = $PS["Routing.Duplex"];
    var Routing_Duplex_Generic = $PS["Routing.Duplex.Generic"];
    var gsepStringRoute = function(dictGRouteDuplexCtr) {
      return {
        gsep: function(a) {
          var $7 = Routing_Duplex.prefix(a);
          var $8 = Routing_Duplex_Generic.gRouteDuplexCtr(dictGRouteDuplexCtr);
          return function($9) {
            return $7($8($9));
          };
        }
      };
    };
    var gsep = function(dict) {
      return dict.gsep;
    };
    exports["gsep"] = gsep;
    exports["gsepStringRoute"] = gsepStringRoute;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Data.Route"] = $PS["App.Data.Route"] || {};
    var exports = $PS["App.Data.Route"];
    var Data_Generic_Rep = $PS["Data.Generic.Rep"];
    var Routing_Duplex = $PS["Routing.Duplex"];
    var Routing_Duplex_Generic = $PS["Routing.Duplex.Generic"];
    var Routing_Duplex_Generic_Syntax = $PS["Routing.Duplex.Generic.Syntax"];
    var Home = function() {
      function Home2() {
      }
      ;
      Home2.value = new Home2();
      return Home2;
    }();
    var Login = function() {
      function Login2() {
      }
      ;
      Login2.value = new Login2();
      return Login2;
    }();
    var Secrets = function() {
      function Secrets2() {
      }
      ;
      Secrets2.value = new Secrets2();
      return Secrets2;
    }();
    var genericRoute = {
      to: function(x) {
        if (x instanceof Data_Generic_Rep.Inl) {
          return Home.value;
        }
        ;
        if (x instanceof Data_Generic_Rep.Inr && x.value0 instanceof Data_Generic_Rep.Inl) {
          return Login.value;
        }
        ;
        if (x instanceof Data_Generic_Rep.Inr && x.value0 instanceof Data_Generic_Rep.Inr) {
          return Secrets.value;
        }
        ;
        throw new Error("Failed pattern match at App.Data.Route (line 20, column 1 - line 20, column 48): " + [x.constructor.name]);
      },
      from: function(x) {
        if (x instanceof Home) {
          return new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value);
        }
        ;
        if (x instanceof Login) {
          return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value));
        }
        ;
        if (x instanceof Secrets) {
          return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(Data_Generic_Rep.NoArguments.value));
        }
        ;
        throw new Error("Failed pattern match at App.Data.Route (line 20, column 1 - line 20, column 48): " + [x.constructor.name]);
      }
    };
    var routeCodec = Routing_Duplex.root(Routing_Duplex_Generic.sum(genericRoute)(Routing_Duplex_Generic.gRouteSum(Routing_Duplex_Generic.gRouteConstructor({
      reflectSymbol: function() {
        return "Home";
      }
    })()(Routing_Duplex_Generic.gRouteNoArguments))(Routing_Duplex_Generic.gRouteSum(Routing_Duplex_Generic.gRouteConstructor({
      reflectSymbol: function() {
        return "Login";
      }
    })()(Routing_Duplex_Generic.gRouteNoArguments))(Routing_Duplex_Generic.gRouteConstructor({
      reflectSymbol: function() {
        return "Secrets";
      }
    })()(Routing_Duplex_Generic.gRouteNoArguments))))({
      Home: Routing_Duplex_Generic.noArgs,
      Login: Routing_Duplex_Generic_Syntax.gsep(Routing_Duplex_Generic_Syntax.gsepStringRoute(Routing_Duplex_Generic.gRouteNoArguments))("login")(Routing_Duplex_Generic.noArgs),
      Secrets: Routing_Duplex_Generic_Syntax.gsep(Routing_Duplex_Generic_Syntax.gsepStringRoute(Routing_Duplex_Generic.gRouteNoArguments))("secrets")(Routing_Duplex_Generic.noArgs)
    }));
    var eqRoute = {
      eq: function(x) {
        return function(y) {
          if (x instanceof Home && y instanceof Home) {
            return true;
          }
          ;
          if (x instanceof Login && y instanceof Login) {
            return true;
          }
          ;
          if (x instanceof Secrets && y instanceof Secrets) {
            return true;
          }
          ;
          return false;
        };
      }
    };
    exports["Home"] = Home;
    exports["Login"] = Login;
    exports["Secrets"] = Secrets;
    exports["routeCodec"] = routeCodec;
    exports["eqRoute"] = eqRoute;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Data.Username"] = $PS["App.Data.Username"] || {};
    var exports = $PS["App.Data.Username"];
    var Data_Maybe = $PS["Data.Maybe"];
    var eqUsername = {
      eq: function(x) {
        return function(y) {
          return x === y;
        };
      }
    };
    var toString = function(v) {
      return v;
    };
    var parse = function(v) {
      if (v === "") {
        return Data_Maybe.Nothing.value;
      }
      ;
      return new Data_Maybe.Just(v);
    };
    exports["parse"] = parse;
    exports["toString"] = toString;
    exports["eqUsername"] = eqUsername;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Monad.State.Class"] = $PS["Control.Monad.State.Class"] || {};
    var exports = $PS["Control.Monad.State.Class"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Data_Unit = $PS["Data.Unit"];
    var state = function(dict) {
      return dict.state;
    };
    var modify_ = function(dictMonadState) {
      return function(f) {
        return state(dictMonadState)(function(s) {
          return new Data_Tuple.Tuple(Data_Unit.unit, f(s));
        });
      };
    };
    var gets = function(dictMonadState) {
      return function(f) {
        return state(dictMonadState)(function(s) {
          return new Data_Tuple.Tuple(f(s), s);
        });
      };
    };
    exports["gets"] = gets;
    exports["modify_"] = modify_;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Store"] = $PS["App.Store"] || {};
    var exports = $PS["App.Store"];
    var App_Data_Username = $PS["App.Data.Username"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad_State_Class = $PS["Control.Monad.State.Class"];
    var Data_Array = $PS["Data.Array"];
    var Data_Boolean = $PS["Data.Boolean"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Maybe = $PS["Data.Maybe"];
    var LoginUser = function() {
      function LoginUser2(value0) {
        this.value0 = value0;
      }
      ;
      LoginUser2.create = function(value0) {
        return new LoginUser2(value0);
      };
      return LoginUser2;
    }();
    var LogoutUser = function() {
      function LogoutUser2() {
      }
      ;
      LogoutUser2.value = new LogoutUser2();
      return LogoutUser2;
    }();
    var UpdateMessageLog = function() {
      function UpdateMessageLog2(value0) {
        this.value0 = value0;
      }
      ;
      UpdateMessageLog2.create = function(value0) {
        return new UpdateMessageLog2(value0);
      };
      return UpdateMessageLog2;
    }();
    var updateLocalState = function(dictMonadState) {
      return function(v) {
        return Control_Bind.bind(dictMonadState.Monad0().Bind1())(Control_Monad_State_Class.gets(dictMonadState)(function(v1) {
          return v1.currentUser;
        }))(function(oldUser) {
          return Control_Applicative.when(dictMonadState.Monad0().Applicative0())(Data_Eq.notEq(Data_Maybe.eqMaybe(Data_Eq.eqRec()(Data_Eq.eqRowCons(Data_Eq.eqRowNil)()({
            reflectSymbol: function() {
              return "username";
            }
          })(App_Data_Username.eqUsername))))(oldUser)(v.context))(Control_Monad_State_Class.modify_(dictMonadState)(function(v1) {
            var $9 = {};
            for (var $10 in v1) {
              if ({}.hasOwnProperty.call(v1, $10)) {
                $9[$10] = v1[$10];
              }
              ;
            }
            ;
            $9.currentUser = v.context;
            return $9;
          }));
        });
      };
    };
    var reduce = function(store) {
      return function(v) {
        if (v instanceof LoginUser) {
          return {
            currentUser: new Data_Maybe.Just(v.value0),
            recentMessageLog: store.recentMessageLog
          };
        }
        ;
        if (v instanceof LogoutUser) {
          return {
            currentUser: Data_Maybe.Nothing.value,
            recentMessageLog: store.recentMessageLog
          };
        }
        ;
        if (v instanceof UpdateMessageLog) {
          var prependMessage = function(x) {
            return function(xs) {
              if (Data_Array.length(xs) < 10) {
                return Data_Array.cons(x)(xs);
              }
              ;
              if (Data_Boolean.otherwise) {
                return Data_Array.cons(x)(Data_Array.take(9)(xs));
              }
              ;
              throw new Error("Failed pattern match at App.Store (line 35, column 7 - line 35, column 63): " + [x.constructor.name, xs.constructor.name]);
            };
          };
          return {
            currentUser: store.currentUser,
            recentMessageLog: prependMessage(v.value0)(store.recentMessageLog)
          };
        }
        ;
        throw new Error("Failed pattern match at App.Store (line 25, column 16 - line 40, column 79): " + [v.constructor.name]);
      };
    };
    exports["LoginUser"] = LoginUser;
    exports["LogoutUser"] = LogoutUser;
    exports["UpdateMessageLog"] = UpdateMessageLog;
    exports["reduce"] = reduce;
    exports["updateLocalState"] = updateLocalState;
  })(PS);
  (function(exports) {
    "use strict";
    var Aff = function() {
      var EMPTY = {};
      var PURE = "Pure";
      var THROW = "Throw";
      var CATCH = "Catch";
      var SYNC = "Sync";
      var ASYNC = "Async";
      var BIND = "Bind";
      var BRACKET = "Bracket";
      var FORK = "Fork";
      var SEQ = "Sequential";
      var MAP = "Map";
      var APPLY = "Apply";
      var ALT = "Alt";
      var CONS = "Cons";
      var RESUME = "Resume";
      var RELEASE = "Release";
      var FINALIZER = "Finalizer";
      var FINALIZED = "Finalized";
      var FORKED = "Forked";
      var FIBER = "Fiber";
      var THUNK = "Thunk";
      function Aff2(tag, _1, _2, _3) {
        this.tag = tag;
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
      }
      function AffCtr(tag) {
        var fn = function(_1, _2, _3) {
          return new Aff2(tag, _1, _2, _3);
        };
        fn.tag = tag;
        return fn;
      }
      function nonCanceler(error) {
        return new Aff2(PURE, void 0);
      }
      function runEff(eff) {
        try {
          eff();
        } catch (error) {
          setTimeout(function() {
            throw error;
          }, 0);
        }
      }
      function runSync(left, right, eff) {
        try {
          return right(eff());
        } catch (error) {
          return left(error);
        }
      }
      function runAsync(left, eff, k) {
        try {
          return eff(k)();
        } catch (error) {
          k(left(error))();
          return nonCanceler;
        }
      }
      var Scheduler = function() {
        var limit = 1024;
        var size = 0;
        var ix = 0;
        var queue = new Array(limit);
        var draining = false;
        function drain() {
          var thunk;
          draining = true;
          while (size !== 0) {
            size--;
            thunk = queue[ix];
            queue[ix] = void 0;
            ix = (ix + 1) % limit;
            thunk();
          }
          draining = false;
        }
        return {
          isDraining: function() {
            return draining;
          },
          enqueue: function(cb) {
            var i, tmp;
            if (size === limit) {
              tmp = draining;
              drain();
              draining = tmp;
            }
            queue[(ix + size) % limit] = cb;
            size++;
            if (!draining) {
              drain();
            }
          }
        };
      }();
      function Supervisor(util) {
        var fibers = {};
        var fiberId = 0;
        var count = 0;
        return {
          register: function(fiber) {
            var fid = fiberId++;
            fiber.onComplete({
              rethrow: true,
              handler: function(result) {
                return function() {
                  count--;
                  delete fibers[fid];
                };
              }
            })();
            fibers[fid] = fiber;
            count++;
          },
          isEmpty: function() {
            return count === 0;
          },
          killAll: function(killError, cb) {
            return function() {
              if (count === 0) {
                return cb();
              }
              var killCount = 0;
              var kills = {};
              function kill(fid) {
                kills[fid] = fibers[fid].kill(killError, function(result) {
                  return function() {
                    delete kills[fid];
                    killCount--;
                    if (util.isLeft(result) && util.fromLeft(result)) {
                      setTimeout(function() {
                        throw util.fromLeft(result);
                      }, 0);
                    }
                    if (killCount === 0) {
                      cb();
                    }
                  };
                })();
              }
              for (var k in fibers) {
                if (fibers.hasOwnProperty(k)) {
                  killCount++;
                  kill(k);
                }
              }
              fibers = {};
              fiberId = 0;
              count = 0;
              return function(error) {
                return new Aff2(SYNC, function() {
                  for (var k2 in kills) {
                    if (kills.hasOwnProperty(k2)) {
                      kills[k2]();
                    }
                  }
                });
              };
            };
          }
        };
      }
      var SUSPENDED = 0;
      var CONTINUE = 1;
      var STEP_BIND = 2;
      var STEP_RESULT = 3;
      var PENDING = 4;
      var RETURN = 5;
      var COMPLETED = 6;
      function Fiber(util, supervisor, aff) {
        var runTick = 0;
        var status = SUSPENDED;
        var step = aff;
        var fail = null;
        var interrupt = null;
        var bhead = null;
        var btail = null;
        var attempts = null;
        var bracketCount = 0;
        var joinId = 0;
        var joins = null;
        var rethrow = true;
        function run(localRunTick) {
          var tmp, result, attempt;
          while (true) {
            tmp = null;
            result = null;
            attempt = null;
            switch (status) {
              case STEP_BIND:
                status = CONTINUE;
                try {
                  step = bhead(step);
                  if (btail === null) {
                    bhead = null;
                  } else {
                    bhead = btail._1;
                    btail = btail._2;
                  }
                } catch (e) {
                  status = RETURN;
                  fail = util.left(e);
                  step = null;
                }
                break;
              case STEP_RESULT:
                if (util.isLeft(step)) {
                  status = RETURN;
                  fail = step;
                  step = null;
                } else if (bhead === null) {
                  status = RETURN;
                } else {
                  status = STEP_BIND;
                  step = util.fromRight(step);
                }
                break;
              case CONTINUE:
                switch (step.tag) {
                  case BIND:
                    if (bhead) {
                      btail = new Aff2(CONS, bhead, btail);
                    }
                    bhead = step._2;
                    status = CONTINUE;
                    step = step._1;
                    break;
                  case PURE:
                    if (bhead === null) {
                      status = RETURN;
                      step = util.right(step._1);
                    } else {
                      status = STEP_BIND;
                      step = step._1;
                    }
                    break;
                  case SYNC:
                    status = STEP_RESULT;
                    step = runSync(util.left, util.right, step._1);
                    break;
                  case ASYNC:
                    status = PENDING;
                    step = runAsync(util.left, step._1, function(result2) {
                      return function() {
                        if (runTick !== localRunTick) {
                          return;
                        }
                        runTick++;
                        Scheduler.enqueue(function() {
                          if (runTick !== localRunTick + 1) {
                            return;
                          }
                          status = STEP_RESULT;
                          step = result2;
                          run(runTick);
                        });
                      };
                    });
                    return;
                  case THROW:
                    status = RETURN;
                    fail = util.left(step._1);
                    step = null;
                    break;
                  case CATCH:
                    if (bhead === null) {
                      attempts = new Aff2(CONS, step, attempts, interrupt);
                    } else {
                      attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                    }
                    bhead = null;
                    btail = null;
                    status = CONTINUE;
                    step = step._1;
                    break;
                  case BRACKET:
                    bracketCount++;
                    if (bhead === null) {
                      attempts = new Aff2(CONS, step, attempts, interrupt);
                    } else {
                      attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                    }
                    bhead = null;
                    btail = null;
                    status = CONTINUE;
                    step = step._1;
                    break;
                  case FORK:
                    status = STEP_RESULT;
                    tmp = Fiber(util, supervisor, step._2);
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                    if (step._1) {
                      tmp.run();
                    }
                    step = util.right(tmp);
                    break;
                  case SEQ:
                    status = CONTINUE;
                    step = sequential(util, supervisor, step._1);
                    break;
                }
                break;
              case RETURN:
                bhead = null;
                btail = null;
                if (attempts === null) {
                  status = COMPLETED;
                  step = interrupt || fail || step;
                } else {
                  tmp = attempts._3;
                  attempt = attempts._1;
                  attempts = attempts._2;
                  switch (attempt.tag) {
                    case CATCH:
                      if (interrupt && interrupt !== tmp && bracketCount === 0) {
                        status = RETURN;
                      } else if (fail) {
                        status = CONTINUE;
                        step = attempt._2(util.fromLeft(fail));
                        fail = null;
                      }
                      break;
                    case RESUME:
                      if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                        status = RETURN;
                      } else {
                        bhead = attempt._1;
                        btail = attempt._2;
                        status = STEP_BIND;
                        step = util.fromRight(step);
                      }
                      break;
                    case BRACKET:
                      bracketCount--;
                      if (fail === null) {
                        result = util.fromRight(step);
                        attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                        if (interrupt === tmp || bracketCount > 0) {
                          status = CONTINUE;
                          step = attempt._3(result);
                        }
                      }
                      break;
                    case RELEASE:
                      attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                      status = CONTINUE;
                      if (interrupt && interrupt !== tmp && bracketCount === 0) {
                        step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                      } else if (fail) {
                        step = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                      } else {
                        step = attempt._1.completed(util.fromRight(step))(attempt._2);
                      }
                      fail = null;
                      bracketCount++;
                      break;
                    case FINALIZER:
                      bracketCount++;
                      attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                      status = CONTINUE;
                      step = attempt._1;
                      break;
                    case FINALIZED:
                      bracketCount--;
                      status = RETURN;
                      step = attempt._1;
                      fail = attempt._2;
                      break;
                  }
                }
                break;
              case COMPLETED:
                for (var k in joins) {
                  if (joins.hasOwnProperty(k)) {
                    rethrow = rethrow && joins[k].rethrow;
                    runEff(joins[k].handler(step));
                  }
                }
                joins = null;
                if (interrupt && fail) {
                  setTimeout(function() {
                    throw util.fromLeft(fail);
                  }, 0);
                } else if (util.isLeft(step) && rethrow) {
                  setTimeout(function() {
                    if (rethrow) {
                      throw util.fromLeft(step);
                    }
                  }, 0);
                }
                return;
              case SUSPENDED:
                status = CONTINUE;
                break;
              case PENDING:
                return;
            }
          }
        }
        function onComplete(join2) {
          return function() {
            if (status === COMPLETED) {
              rethrow = rethrow && join2.rethrow;
              join2.handler(step)();
              return function() {
              };
            }
            var jid = joinId++;
            joins = joins || {};
            joins[jid] = join2;
            return function() {
              if (joins !== null) {
                delete joins[jid];
              }
            };
          };
        }
        function kill(error, cb) {
          return function() {
            if (status === COMPLETED) {
              cb(util.right(void 0))();
              return function() {
              };
            }
            var canceler = onComplete({
              rethrow: false,
              handler: function() {
                return cb(util.right(void 0));
              }
            })();
            switch (status) {
              case SUSPENDED:
                interrupt = util.left(error);
                status = COMPLETED;
                step = interrupt;
                run(runTick);
                break;
              case PENDING:
                if (interrupt === null) {
                  interrupt = util.left(error);
                }
                if (bracketCount === 0) {
                  if (status === PENDING) {
                    attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error)), attempts, interrupt);
                  }
                  status = RETURN;
                  step = null;
                  fail = null;
                  run(++runTick);
                }
                break;
              default:
                if (interrupt === null) {
                  interrupt = util.left(error);
                }
                if (bracketCount === 0) {
                  status = RETURN;
                  step = null;
                  fail = null;
                }
            }
            return canceler;
          };
        }
        function join(cb) {
          return function() {
            var canceler = onComplete({
              rethrow: false,
              handler: cb
            })();
            if (status === SUSPENDED) {
              run(runTick);
            }
            return canceler;
          };
        }
        return {
          kill,
          join,
          onComplete,
          isSuspended: function() {
            return status === SUSPENDED;
          },
          run: function() {
            if (status === SUSPENDED) {
              if (!Scheduler.isDraining()) {
                Scheduler.enqueue(function() {
                  run(runTick);
                });
              } else {
                run(runTick);
              }
            }
          }
        };
      }
      function runPar(util, supervisor, par, cb) {
        var fiberId = 0;
        var fibers = {};
        var killId = 0;
        var kills = {};
        var early = new Error("[ParAff] Early exit");
        var interrupt = null;
        var root = EMPTY;
        function kill(error, par2, cb2) {
          var step = par2;
          var head = null;
          var tail = null;
          var count = 0;
          var kills2 = {};
          var tmp, kid;
          loop:
            while (true) {
              tmp = null;
              switch (step.tag) {
                case FORKED:
                  if (step._3 === EMPTY) {
                    tmp = fibers[step._1];
                    kills2[count++] = tmp.kill(error, function(result) {
                      return function() {
                        count--;
                        if (count === 0) {
                          cb2(result)();
                        }
                      };
                    });
                  }
                  if (head === null) {
                    break loop;
                  }
                  step = head._2;
                  if (tail === null) {
                    head = null;
                  } else {
                    head = tail._1;
                    tail = tail._2;
                  }
                  break;
                case MAP:
                  step = step._2;
                  break;
                case APPLY:
                case ALT:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = step;
                  step = step._1;
                  break;
              }
            }
          if (count === 0) {
            cb2(util.right(void 0))();
          } else {
            kid = 0;
            tmp = count;
            for (; kid < tmp; kid++) {
              kills2[kid] = kills2[kid]();
            }
          }
          return kills2;
        }
        function join(result, head, tail) {
          var fail, step, lhs, rhs, tmp, kid;
          if (util.isLeft(result)) {
            fail = result;
            step = null;
          } else {
            step = result;
            fail = null;
          }
          loop:
            while (true) {
              lhs = null;
              rhs = null;
              tmp = null;
              kid = null;
              if (interrupt !== null) {
                return;
              }
              if (head === null) {
                cb(fail || step)();
                return;
              }
              if (head._3 !== EMPTY) {
                return;
              }
              switch (head.tag) {
                case MAP:
                  if (fail === null) {
                    head._3 = util.right(head._1(util.fromRight(step)));
                    step = head._3;
                  } else {
                    head._3 = fail;
                  }
                  break;
                case APPLY:
                  lhs = head._1._3;
                  rhs = head._2._3;
                  if (fail) {
                    head._3 = fail;
                    tmp = true;
                    kid = killId++;
                    kills[kid] = kill(early, fail === lhs ? head._2 : head._1, function() {
                      return function() {
                        delete kills[kid];
                        if (tmp) {
                          tmp = false;
                        } else if (tail === null) {
                          join(fail, null, null);
                        } else {
                          join(fail, tail._1, tail._2);
                        }
                      };
                    });
                    if (tmp) {
                      tmp = false;
                      return;
                    }
                  } else if (lhs === EMPTY || rhs === EMPTY) {
                    return;
                  } else {
                    step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                    head._3 = step;
                  }
                  break;
                case ALT:
                  lhs = head._1._3;
                  rhs = head._2._3;
                  if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                    return;
                  }
                  if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                    fail = step === lhs ? rhs : lhs;
                    step = null;
                    head._3 = fail;
                  } else {
                    head._3 = step;
                    tmp = true;
                    kid = killId++;
                    kills[kid] = kill(early, step === lhs ? head._2 : head._1, function() {
                      return function() {
                        delete kills[kid];
                        if (tmp) {
                          tmp = false;
                        } else if (tail === null) {
                          join(step, null, null);
                        } else {
                          join(step, tail._1, tail._2);
                        }
                      };
                    });
                    if (tmp) {
                      tmp = false;
                      return;
                    }
                  }
                  break;
              }
              if (tail === null) {
                head = null;
              } else {
                head = tail._1;
                tail = tail._2;
              }
            }
        }
        function resolve(fiber) {
          return function(result) {
            return function() {
              delete fibers[fiber._1];
              fiber._3 = result;
              join(result, fiber._2._1, fiber._2._2);
            };
          };
        }
        function run() {
          var status = CONTINUE;
          var step = par;
          var head = null;
          var tail = null;
          var tmp, fid;
          loop:
            while (true) {
              tmp = null;
              fid = null;
              switch (status) {
                case CONTINUE:
                  switch (step.tag) {
                    case MAP:
                      if (head) {
                        tail = new Aff2(CONS, head, tail);
                      }
                      head = new Aff2(MAP, step._1, EMPTY, EMPTY);
                      step = step._2;
                      break;
                    case APPLY:
                      if (head) {
                        tail = new Aff2(CONS, head, tail);
                      }
                      head = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                      step = step._1;
                      break;
                    case ALT:
                      if (head) {
                        tail = new Aff2(CONS, head, tail);
                      }
                      head = new Aff2(ALT, EMPTY, step._2, EMPTY);
                      step = step._1;
                      break;
                    default:
                      fid = fiberId++;
                      status = RETURN;
                      tmp = step;
                      step = new Aff2(FORKED, fid, new Aff2(CONS, head, tail), EMPTY);
                      tmp = Fiber(util, supervisor, tmp);
                      tmp.onComplete({
                        rethrow: false,
                        handler: resolve(step)
                      })();
                      fibers[fid] = tmp;
                      if (supervisor) {
                        supervisor.register(tmp);
                      }
                  }
                  break;
                case RETURN:
                  if (head === null) {
                    break loop;
                  }
                  if (head._1 === EMPTY) {
                    head._1 = step;
                    status = CONTINUE;
                    step = head._2;
                    head._2 = EMPTY;
                  } else {
                    head._2 = step;
                    step = head;
                    if (tail === null) {
                      head = null;
                    } else {
                      head = tail._1;
                      tail = tail._2;
                    }
                  }
              }
            }
          root = step;
          for (fid = 0; fid < fiberId; fid++) {
            fibers[fid].run();
          }
        }
        function cancel(error, cb2) {
          interrupt = util.left(error);
          var innerKills;
          for (var kid in kills) {
            if (kills.hasOwnProperty(kid)) {
              innerKills = kills[kid];
              for (kid in innerKills) {
                if (innerKills.hasOwnProperty(kid)) {
                  innerKills[kid]();
                }
              }
            }
          }
          kills = null;
          var newKills = kill(error, root, cb2);
          return function(killError) {
            return new Aff2(ASYNC, function(killCb) {
              return function() {
                for (var kid2 in newKills) {
                  if (newKills.hasOwnProperty(kid2)) {
                    newKills[kid2]();
                  }
                }
                return nonCanceler;
              };
            });
          };
        }
        run();
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              return cancel(killError, killCb);
            };
          });
        };
      }
      function sequential(util, supervisor, par) {
        return new Aff2(ASYNC, function(cb) {
          return function() {
            return runPar(util, supervisor, par, cb);
          };
        });
      }
      Aff2.EMPTY = EMPTY;
      Aff2.Pure = AffCtr(PURE);
      Aff2.Throw = AffCtr(THROW);
      Aff2.Catch = AffCtr(CATCH);
      Aff2.Sync = AffCtr(SYNC);
      Aff2.Async = AffCtr(ASYNC);
      Aff2.Bind = AffCtr(BIND);
      Aff2.Bracket = AffCtr(BRACKET);
      Aff2.Fork = AffCtr(FORK);
      Aff2.Seq = AffCtr(SEQ);
      Aff2.ParMap = AffCtr(MAP);
      Aff2.ParApply = AffCtr(APPLY);
      Aff2.ParAlt = AffCtr(ALT);
      Aff2.Fiber = Fiber;
      Aff2.Supervisor = Supervisor;
      Aff2.Scheduler = Scheduler;
      Aff2.nonCanceler = nonCanceler;
      return Aff2;
    }();
    exports._pure = Aff.Pure;
    exports._throwError = Aff.Throw;
    exports._catchError = function(aff) {
      return function(k) {
        return Aff.Catch(aff, k);
      };
    };
    exports._map = function(f) {
      return function(aff) {
        if (aff.tag === Aff.Pure.tag) {
          return Aff.Pure(f(aff._1));
        } else {
          return Aff.Bind(aff, function(value) {
            return Aff.Pure(f(value));
          });
        }
      };
    };
    exports._bind = function(aff) {
      return function(k) {
        return Aff.Bind(aff, k);
      };
    };
    exports._fork = function(immediate) {
      return function(aff) {
        return Aff.Fork(immediate, aff);
      };
    };
    exports._liftEffect = Aff.Sync;
    exports._parAffMap = function(f) {
      return function(aff) {
        return Aff.ParMap(f, aff);
      };
    };
    exports._parAffApply = function(aff1) {
      return function(aff2) {
        return Aff.ParApply(aff1, aff2);
      };
    };
    exports.makeAff = Aff.Async;
    exports.generalBracket = function(acquire) {
      return function(options) {
        return function(k) {
          return Aff.Bracket(acquire, options, k);
        };
      };
    };
    exports._makeFiber = function(util, aff) {
      return function() {
        return Aff.Fiber(util, null, aff);
      };
    };
    exports._sequential = Aff.Seq;
  })(PS["Effect.Aff"] = PS["Effect.Aff"] || {});
  (function($PS) {
    "use strict";
    $PS["Control.Monad.Error.Class"] = $PS["Control.Monad.Error.Class"] || {};
    var exports = $PS["Control.Monad.Error.Class"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Data_Either = $PS["Data.Either"];
    var Data_Functor = $PS["Data.Functor"];
    var throwError = function(dict) {
      return dict.throwError;
    };
    var catchError = function(dict) {
      return dict.catchError;
    };
    var $$try = function(dictMonadError) {
      return function(a) {
        return catchError(dictMonadError)(Data_Functor.map(dictMonadError.MonadThrow0().Monad0().Bind1().Apply0().Functor0())(Data_Either.Right.create)(a))(function() {
          var $21 = Control_Applicative.pure(dictMonadError.MonadThrow0().Monad0().Applicative0());
          return function($22) {
            return $21(Data_Either.Left.create($22));
          };
        }());
      };
    };
    exports["throwError"] = throwError;
    exports["try"] = $$try;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Parallel.Class"] = $PS["Control.Parallel.Class"] || {};
    var exports = $PS["Control.Parallel.Class"];
    var sequential = function(dict) {
      return dict.sequential;
    };
    var parallel = function(dict) {
      return dict.parallel;
    };
    exports["parallel"] = parallel;
    exports["sequential"] = sequential;
  })(PS);
  (function(exports) {
    "use strict";
    exports.unsafePerformEffect = function(f) {
      return f();
    };
  })(PS["Effect.Unsafe"] = PS["Effect.Unsafe"] || {});
  (function($PS) {
    "use strict";
    $PS["Effect.Unsafe"] = $PS["Effect.Unsafe"] || {};
    var exports = $PS["Effect.Unsafe"];
    var $foreign = $PS["Effect.Unsafe"];
    exports["unsafePerformEffect"] = $foreign.unsafePerformEffect;
  })(PS);
  (function(exports) {
    "use strict";
    exports._unsafePartial = function(f) {
      return f();
    };
  })(PS["Partial.Unsafe"] = PS["Partial.Unsafe"] || {});
  (function(exports) {
    "use strict";
    exports._crashWith = function(msg) {
      throw new Error(msg);
    };
  })(PS["Partial"] = PS["Partial"] || {});
  (function($PS) {
    "use strict";
    $PS["Partial"] = $PS["Partial"] || {};
    var exports = $PS["Partial"];
    var $foreign = $PS["Partial"];
    var crashWith = function(dictPartial) {
      return $foreign["_crashWith"];
    };
    exports["crashWith"] = crashWith;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Partial.Unsafe"] = $PS["Partial.Unsafe"] || {};
    var exports = $PS["Partial.Unsafe"];
    var $foreign = $PS["Partial.Unsafe"];
    var Partial = $PS["Partial"];
    var unsafePartial = $foreign["_unsafePartial"];
    var unsafeCrashWith = function(msg) {
      return unsafePartial(function(dictPartial) {
        return Partial.crashWith()(msg);
      });
    };
    exports["unsafeCrashWith"] = unsafeCrashWith;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Effect.Aff"] = $PS["Effect.Aff"] || {};
    var exports = $PS["Effect.Aff"];
    var $foreign = $PS["Effect.Aff"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad = $PS["Control.Monad"];
    var Control_Monad_Error_Class = $PS["Control.Monad.Error.Class"];
    var Control_Monad_Rec_Class = $PS["Control.Monad.Rec.Class"];
    var Control_Parallel_Class = $PS["Control.Parallel.Class"];
    var Data_Either = $PS["Data.Either"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect = $PS["Effect"];
    var Effect_Class = $PS["Effect.Class"];
    var Effect_Unsafe = $PS["Effect.Unsafe"];
    var Partial_Unsafe = $PS["Partial.Unsafe"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var Canceler = function(x) {
      return x;
    };
    var suspendAff = $foreign["_fork"](false);
    var functorParAff = {
      map: $foreign["_parAffMap"]
    };
    var functorAff = {
      map: $foreign["_map"]
    };
    var forkAff = $foreign["_fork"](true);
    var ffiUtil = function() {
      var unsafeFromRight = function(v) {
        if (v instanceof Data_Either.Right) {
          return v.value0;
        }
        ;
        if (v instanceof Data_Either.Left) {
          return Partial_Unsafe.unsafeCrashWith("unsafeFromRight: Left");
        }
        ;
        throw new Error("Failed pattern match at Effect.Aff (line 404, column 21 - line 406, column 54): " + [v.constructor.name]);
      };
      var unsafeFromLeft = function(v) {
        if (v instanceof Data_Either.Left) {
          return v.value0;
        }
        ;
        if (v instanceof Data_Either.Right) {
          return Partial_Unsafe.unsafeCrashWith("unsafeFromLeft: Right");
        }
        ;
        throw new Error("Failed pattern match at Effect.Aff (line 399, column 20 - line 401, column 54): " + [v.constructor.name]);
      };
      var isLeft = function(v) {
        if (v instanceof Data_Either.Left) {
          return true;
        }
        ;
        if (v instanceof Data_Either.Right) {
          return false;
        }
        ;
        throw new Error("Failed pattern match at Effect.Aff (line 394, column 12 - line 396, column 20): " + [v.constructor.name]);
      };
      return {
        isLeft,
        fromLeft: unsafeFromLeft,
        fromRight: unsafeFromRight,
        left: Data_Either.Left.create,
        right: Data_Either.Right.create
      };
    }();
    var makeFiber = function(aff) {
      return $foreign["_makeFiber"](ffiUtil, aff);
    };
    var launchAff = function(aff) {
      return function __do() {
        var fiber = makeFiber(aff)();
        fiber.run();
        return fiber;
      };
    };
    var launchAff_ = function() {
      var $40 = Data_Functor["void"](Effect.functorEffect);
      return function($41) {
        return $40(launchAff($41));
      };
    }();
    var bracket = function(acquire) {
      return function(completed) {
        return $foreign.generalBracket(acquire)({
          killed: Data_Function["const"](completed),
          failed: Data_Function["const"](completed),
          completed: Data_Function["const"](completed)
        });
      };
    };
    var applyParAff = {
      apply: $foreign["_parAffApply"],
      Functor0: function() {
        return functorParAff;
      }
    };
    var monadAff = {
      Applicative0: function() {
        return applicativeAff;
      },
      Bind1: function() {
        return bindAff;
      }
    };
    var bindAff = {
      bind: $foreign["_bind"],
      Apply0: function() {
        return applyAff;
      }
    };
    var applyAff = {
      apply: Control_Monad.ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
    var applicativeAff = {
      pure: $foreign["_pure"],
      Apply0: function() {
        return applyAff;
      }
    };
    var $$finally = function(fin) {
      return function(a) {
        return bracket(Control_Applicative.pure(applicativeAff)(Data_Unit.unit))(Data_Function["const"](fin))(Data_Function["const"](a));
      };
    };
    var monadEffectAff = {
      liftEffect: $foreign["_liftEffect"],
      Monad0: function() {
        return monadAff;
      }
    };
    var effectCanceler = function() {
      var $42 = Effect_Class.liftEffect(monadEffectAff);
      return function($43) {
        return Canceler(Data_Function["const"]($42($43)));
      };
    }();
    var joinFiber = function(v) {
      return $foreign.makeAff(function(k) {
        return Data_Functor.map(Effect.functorEffect)(effectCanceler)(v.join(k));
      });
    };
    var functorFiber = {
      map: function(f) {
        return function(t) {
          return Effect_Unsafe.unsafePerformEffect(makeFiber(Data_Functor.map(functorAff)(f)(joinFiber(t))));
        };
      }
    };
    var killFiber = function(e) {
      return function(v) {
        return Control_Bind.bind(bindAff)(Effect_Class.liftEffect(monadEffectAff)(v.isSuspended))(function(v1) {
          if (v1) {
            return Effect_Class.liftEffect(monadEffectAff)(Data_Functor["void"](Effect.functorEffect)(v.kill(e, Data_Function["const"](Control_Applicative.pure(Effect.applicativeEffect)(Data_Unit.unit)))));
          }
          ;
          return $foreign.makeAff(function(k) {
            return Data_Functor.map(Effect.functorEffect)(effectCanceler)(v.kill(e, k));
          });
        });
      };
    };
    var monadThrowAff = {
      throwError: $foreign["_throwError"],
      Monad0: function() {
        return monadAff;
      }
    };
    var monadErrorAff = {
      catchError: $foreign["_catchError"],
      MonadThrow0: function() {
        return monadThrowAff;
      }
    };
    var runAff = function(k) {
      return function(aff) {
        return launchAff(Control_Bind.bindFlipped(bindAff)(function() {
          var $46 = Effect_Class.liftEffect(monadEffectAff);
          return function($47) {
            return $46(k($47));
          };
        }())(Control_Monad_Error_Class["try"](monadErrorAff)(aff)));
      };
    };
    var runAff_ = function(k) {
      return function(aff) {
        return Data_Functor["void"](Effect.functorEffect)(runAff(k)(aff));
      };
    };
    var parallelAff = {
      parallel: Unsafe_Coerce.unsafeCoerce,
      sequential: $foreign["_sequential"],
      Monad0: function() {
        return monadAff;
      },
      Applicative1: function() {
        return applicativeParAff;
      }
    };
    var applicativeParAff = {
      pure: function() {
        var $50 = Control_Parallel_Class.parallel(parallelAff);
        var $51 = Control_Applicative.pure(applicativeAff);
        return function($52) {
          return $50($51($52));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
    var monadRecAff = {
      tailRecM: function(k) {
        var go = function(a) {
          return Control_Bind.bind(bindAff)(k(a))(function(res) {
            if (res instanceof Control_Monad_Rec_Class.Done) {
              return Control_Applicative.pure(applicativeAff)(res.value0);
            }
            ;
            if (res instanceof Control_Monad_Rec_Class.Loop) {
              return go(res.value0);
            }
            ;
            throw new Error("Failed pattern match at Effect.Aff (line 102, column 7 - line 104, column 22): " + [res.constructor.name]);
          });
        };
        return go;
      },
      Monad0: function() {
        return monadAff;
      }
    };
    var nonCanceler = Data_Function["const"](Control_Applicative.pure(applicativeAff)(Data_Unit.unit));
    exports["launchAff_"] = launchAff_;
    exports["runAff_"] = runAff_;
    exports["forkAff"] = forkAff;
    exports["suspendAff"] = suspendAff;
    exports["finally"] = $$finally;
    exports["killFiber"] = killFiber;
    exports["joinFiber"] = joinFiber;
    exports["nonCanceler"] = nonCanceler;
    exports["effectCanceler"] = effectCanceler;
    exports["functorAff"] = functorAff;
    exports["applicativeAff"] = applicativeAff;
    exports["bindAff"] = bindAff;
    exports["monadAff"] = monadAff;
    exports["monadRecAff"] = monadRecAff;
    exports["monadThrowAff"] = monadThrowAff;
    exports["monadEffectAff"] = monadEffectAff;
    exports["applicativeParAff"] = applicativeParAff;
    exports["parallelAff"] = parallelAff;
    exports["functorFiber"] = functorFiber;
    exports["makeAff"] = $foreign.makeAff;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Effect.Aff.Class"] = $PS["Effect.Aff.Class"] || {};
    var exports = $PS["Effect.Aff.Class"];
    var Control_Category = $PS["Control.Category"];
    var Effect_Aff = $PS["Effect.Aff"];
    var monadAffAff = {
      liftAff: Control_Category.identity(Control_Category.categoryFn),
      MonadEffect0: function() {
        return Effect_Aff.monadEffectAff;
      }
    };
    exports["monadAffAff"] = monadAffAff;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Exists"] = $PS["Data.Exists"] || {};
    var exports = $PS["Data.Exists"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var runExists = Unsafe_Coerce.unsafeCoerce;
    var mkExists = Unsafe_Coerce.unsafeCoerce;
    exports["mkExists"] = mkExists;
    exports["runExists"] = runExists;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Data.Coyoneda"] = $PS["Data.Coyoneda"] || {};
    var exports = $PS["Data.Coyoneda"];
    var Control_Category = $PS["Control.Category"];
    var Data_Exists = $PS["Data.Exists"];
    var CoyonedaF = function() {
      function CoyonedaF2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      CoyonedaF2.create = function(value0) {
        return function(value1) {
          return new CoyonedaF2(value0, value1);
        };
      };
      return CoyonedaF2;
    }();
    var Coyoneda = function(x) {
      return x;
    };
    var unCoyoneda = function(f) {
      return function(v) {
        return Data_Exists.runExists(function(v1) {
          return f(v1.value0)(v1.value1);
        })(v);
      };
    };
    var coyoneda = function(k) {
      return function(fi) {
        return Coyoneda(Data_Exists.mkExists(new CoyonedaF(k, fi)));
      };
    };
    var functorCoyoneda = {
      map: function(f) {
        return function(v) {
          return Data_Exists.runExists(function(v1) {
            return coyoneda(function($84) {
              return f(v1.value0($84));
            })(v1.value1);
          })(v);
        };
      }
    };
    var liftCoyoneda = coyoneda(Control_Category.identity(Control_Category.categoryFn));
    exports["unCoyoneda"] = unCoyoneda;
    exports["liftCoyoneda"] = liftCoyoneda;
    exports["functorCoyoneda"] = functorCoyoneda;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Query.Input"] = $PS["Halogen.Query.Input"] || {};
    var exports = $PS["Halogen.Query.Input"];
    var RefUpdate = function() {
      function RefUpdate2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      RefUpdate2.create = function(value0) {
        return function(value1) {
          return new RefUpdate2(value0, value1);
        };
      };
      return RefUpdate2;
    }();
    var Action = function() {
      function Action2(value0) {
        this.value0 = value0;
      }
      ;
      Action2.create = function(value0) {
        return new Action2(value0);
      };
      return Action2;
    }();
    var functorInput = {
      map: function(f) {
        return function(m) {
          if (m instanceof RefUpdate) {
            return new RefUpdate(m.value0, m.value1);
          }
          ;
          if (m instanceof Action) {
            return new Action(f(m.value0));
          }
          ;
          throw new Error("Failed pattern match at Halogen.Query.Input (line 19, column 1 - line 19, column 46): " + [m.constructor.name]);
        };
      }
    };
    exports["RefUpdate"] = RefUpdate;
    exports["Action"] = Action;
    exports["functorInput"] = functorInput;
  })(PS);
  (function(exports) {
    "use strict";
    exports["null"] = null;
    exports.nullable = function(a, r, f) {
      return a == null ? r : f(a);
    };
    exports.notNull = function(x) {
      return x;
    };
  })(PS["Data.Nullable"] = PS["Data.Nullable"] || {});
  (function($PS) {
    "use strict";
    $PS["Data.Nullable"] = $PS["Data.Nullable"] || {};
    var exports = $PS["Data.Nullable"];
    var $foreign = $PS["Data.Nullable"];
    var Data_Maybe = $PS["Data.Maybe"];
    var toNullable = Data_Maybe.maybe($foreign["null"])($foreign.notNull);
    var toMaybe = function(n) {
      return $foreign.nullable(n, Data_Maybe.Nothing.value, Data_Maybe.Just.create);
    };
    exports["toMaybe"] = toMaybe;
    exports["toNullable"] = toNullable;
    exports["null"] = $foreign["null"];
  })(PS);
  (function(exports) {
    "use strict";
    exports.typeOf = function(value) {
      return typeof value;
    };
  })(PS["Foreign"] = PS["Foreign"] || {});
  (function($PS) {
    "use strict";
    $PS["Foreign"] = $PS["Foreign"] || {};
    var exports = $PS["Foreign"];
    var $foreign = $PS["Foreign"];
    exports["typeOf"] = $foreign.typeOf;
  })(PS);
  (function(exports) {
    "use strict";
    exports._lookup = function(no, yes, k, m) {
      return k in m ? yes(m[k]) : no;
    };
  })(PS["Foreign.Object"] = PS["Foreign.Object"] || {});
  (function($PS) {
    "use strict";
    $PS["Foreign.Object"] = $PS["Foreign.Object"] || {};
    var exports = $PS["Foreign.Object"];
    var $foreign = $PS["Foreign.Object"];
    var Data_Function_Uncurried = $PS["Data.Function.Uncurried"];
    var Data_Maybe = $PS["Data.Maybe"];
    var lookup = Data_Function_Uncurried.runFn4($foreign["_lookup"])(Data_Maybe.Nothing.value)(Data_Maybe.Just.create);
    exports["lookup"] = lookup;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.VDom.Machine"] = $PS["Halogen.VDom.Machine"] || {};
    var exports = $PS["Halogen.VDom.Machine"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var Step = function() {
      function Step2(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
      }
      ;
      Step2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return new Step2(value0, value1, value2, value3);
            };
          };
        };
      };
      return Step2;
    }();
    var unStep = Unsafe_Coerce.unsafeCoerce;
    var step = function(v, a) {
      return v.value2(v.value1, a);
    };
    var mkStep = Unsafe_Coerce.unsafeCoerce;
    var halt = function(v) {
      return v.value3(v.value1);
    };
    var extract = unStep(function(v) {
      return v.value0;
    });
    exports["Step"] = Step;
    exports["mkStep"] = mkStep;
    exports["unStep"] = unStep;
    exports["extract"] = extract;
    exports["step"] = step;
    exports["halt"] = halt;
  })(PS);
  (function(exports) {
    "use strict";
    exports.unsafeGetAny = function(key, obj) {
      return obj[key];
    };
    exports.unsafeHasAny = function(key, obj) {
      return obj.hasOwnProperty(key);
    };
    exports.unsafeSetAny = function(key, val, obj) {
      obj[key] = val;
    };
    exports.forE = function(a, f) {
      var b = [];
      for (var i = 0; i < a.length; i++) {
        b.push(f(i, a[i]));
      }
      return b;
    };
    exports.forEachE = function(a, f) {
      for (var i = 0; i < a.length; i++) {
        f(a[i]);
      }
    };
    exports.forInE = function(o, f) {
      var ks = Object.keys(o);
      for (var i = 0; i < ks.length; i++) {
        var k = ks[i];
        f(k, o[k]);
      }
    };
    exports.diffWithIxE = function(a1, a2, f1, f2, f3) {
      var a3 = [];
      var l1 = a1.length;
      var l2 = a2.length;
      var i = 0;
      while (1) {
        if (i < l1) {
          if (i < l2) {
            a3.push(f1(i, a1[i], a2[i]));
          } else {
            f2(i, a1[i]);
          }
        } else if (i < l2) {
          a3.push(f3(i, a2[i]));
        } else {
          break;
        }
        i++;
      }
      return a3;
    };
    exports.strMapWithIxE = function(as, fk, f) {
      var o = {};
      for (var i = 0; i < as.length; i++) {
        var a = as[i];
        var k = fk(a);
        o[k] = f(k, i, a);
      }
      return o;
    };
    exports.diffWithKeyAndIxE = function(o1, as, fk, f1, f2, f3) {
      var o2 = {};
      for (var i = 0; i < as.length; i++) {
        var a = as[i];
        var k = fk(a);
        if (o1.hasOwnProperty(k)) {
          o2[k] = f1(k, i, o1[k], a);
        } else {
          o2[k] = f3(k, i, a);
        }
      }
      for (var k in o1) {
        if (k in o2) {
          continue;
        }
        f2(k, o1[k]);
      }
      return o2;
    };
    exports.refEq = function(a, b) {
      return a === b;
    };
    exports.createTextNode = function(s, doc) {
      return doc.createTextNode(s);
    };
    exports.setTextContent = function(s, n) {
      n.textContent = s;
    };
    exports.createElement = function(ns, name, doc) {
      if (ns != null) {
        return doc.createElementNS(ns, name);
      } else {
        return doc.createElement(name);
      }
    };
    exports.insertChildIx = function(i, a, b) {
      var n = b.childNodes.item(i) || null;
      if (n !== a) {
        b.insertBefore(a, n);
      }
    };
    exports.removeChild = function(a, b) {
      if (b && a.parentNode === b) {
        b.removeChild(a);
      }
    };
    exports.parentNode = function(a) {
      return a.parentNode;
    };
    exports.setAttribute = function(ns, attr, val, el) {
      if (ns != null) {
        el.setAttributeNS(ns, attr, val);
      } else {
        el.setAttribute(attr, val);
      }
    };
    exports.removeAttribute = function(ns, attr, el) {
      if (ns != null) {
        el.removeAttributeNS(ns, attr);
      } else {
        el.removeAttribute(attr);
      }
    };
    exports.hasAttribute = function(ns, attr, el) {
      if (ns != null) {
        return el.hasAttributeNS(ns, attr);
      } else {
        return el.hasAttribute(attr);
      }
    };
    exports.addEventListener = function(ev, listener, el) {
      el.addEventListener(ev, listener, false);
    };
    exports.removeEventListener = function(ev, listener, el) {
      el.removeEventListener(ev, listener, false);
    };
    exports.jsUndefined = void 0;
  })(PS["Halogen.VDom.Util"] = PS["Halogen.VDom.Util"] || {});
  (function(exports) {
    "use strict";
    exports["new"] = function() {
      return {};
    };
  })(PS["Foreign.Object.ST"] = PS["Foreign.Object.ST"] || {});
  (function($PS) {
    "use strict";
    $PS["Foreign.Object.ST"] = $PS["Foreign.Object.ST"] || {};
    var exports = $PS["Foreign.Object.ST"];
    var $foreign = $PS["Foreign.Object.ST"];
    exports["new"] = $foreign["new"];
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.VDom.Util"] = $PS["Halogen.VDom.Util"] || {};
    var exports = $PS["Halogen.VDom.Util"];
    var $foreign = $PS["Halogen.VDom.Util"];
    var Foreign_Object_ST = $PS["Foreign.Object.ST"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var unsafeLookup = $foreign.unsafeGetAny;
    var unsafeFreeze = Unsafe_Coerce.unsafeCoerce;
    var pokeMutMap = $foreign.unsafeSetAny;
    var newMutMap = Foreign_Object_ST["new"];
    exports["newMutMap"] = newMutMap;
    exports["pokeMutMap"] = pokeMutMap;
    exports["unsafeFreeze"] = unsafeFreeze;
    exports["unsafeLookup"] = unsafeLookup;
    exports["unsafeGetAny"] = $foreign.unsafeGetAny;
    exports["unsafeHasAny"] = $foreign.unsafeHasAny;
    exports["unsafeSetAny"] = $foreign.unsafeSetAny;
    exports["forE"] = $foreign.forE;
    exports["forEachE"] = $foreign.forEachE;
    exports["forInE"] = $foreign.forInE;
    exports["diffWithIxE"] = $foreign.diffWithIxE;
    exports["diffWithKeyAndIxE"] = $foreign.diffWithKeyAndIxE;
    exports["strMapWithIxE"] = $foreign.strMapWithIxE;
    exports["refEq"] = $foreign.refEq;
    exports["createTextNode"] = $foreign.createTextNode;
    exports["setTextContent"] = $foreign.setTextContent;
    exports["createElement"] = $foreign.createElement;
    exports["insertChildIx"] = $foreign.insertChildIx;
    exports["removeChild"] = $foreign.removeChild;
    exports["parentNode"] = $foreign.parentNode;
    exports["setAttribute"] = $foreign.setAttribute;
    exports["removeAttribute"] = $foreign.removeAttribute;
    exports["hasAttribute"] = $foreign.hasAttribute;
    exports["addEventListener"] = $foreign.addEventListener;
    exports["removeEventListener"] = $foreign.removeEventListener;
    exports["jsUndefined"] = $foreign.jsUndefined;
  })(PS);
  (function(exports) {
    "use strict";
    exports.eventListener = function(fn) {
      return function() {
        return function(event) {
          return fn(event)();
        };
      };
    };
    exports.addEventListener = function(type) {
      return function(listener) {
        return function(useCapture) {
          return function(target) {
            return function() {
              return target.addEventListener(type, listener, useCapture);
            };
          };
        };
      };
    };
    exports.removeEventListener = function(type) {
      return function(listener) {
        return function(useCapture) {
          return function(target) {
            return function() {
              return target.removeEventListener(type, listener, useCapture);
            };
          };
        };
      };
    };
  })(PS["Web.Event.EventTarget"] = PS["Web.Event.EventTarget"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.Event.EventTarget"] = $PS["Web.Event.EventTarget"] || {};
    var exports = $PS["Web.Event.EventTarget"];
    var $foreign = $PS["Web.Event.EventTarget"];
    exports["eventListener"] = $foreign.eventListener;
    exports["addEventListener"] = $foreign.addEventListener;
    exports["removeEventListener"] = $foreign.removeEventListener;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.VDom.DOM.Prop"] = $PS["Halogen.VDom.DOM.Prop"] || {};
    var exports = $PS["Halogen.VDom.DOM.Prop"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Nullable = $PS["Data.Nullable"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Foreign = $PS["Foreign"];
    var Foreign_Object = $PS["Foreign.Object"];
    var Halogen_VDom_Machine = $PS["Halogen.VDom.Machine"];
    var Halogen_VDom_Util = $PS["Halogen.VDom.Util"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var Web_Event_EventTarget = $PS["Web.Event.EventTarget"];
    var Created = function() {
      function Created2(value0) {
        this.value0 = value0;
      }
      ;
      Created2.create = function(value0) {
        return new Created2(value0);
      };
      return Created2;
    }();
    var Removed = function() {
      function Removed2(value0) {
        this.value0 = value0;
      }
      ;
      Removed2.create = function(value0) {
        return new Removed2(value0);
      };
      return Removed2;
    }();
    var Attribute = function() {
      function Attribute2(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
      }
      ;
      Attribute2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return new Attribute2(value0, value1, value2);
          };
        };
      };
      return Attribute2;
    }();
    var Property = function() {
      function Property2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Property2.create = function(value0) {
        return function(value1) {
          return new Property2(value0, value1);
        };
      };
      return Property2;
    }();
    var Handler = function() {
      function Handler2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Handler2.create = function(value0) {
        return function(value1) {
          return new Handler2(value0, value1);
        };
      };
      return Handler2;
    }();
    var Ref = function() {
      function Ref2(value0) {
        this.value0 = value0;
      }
      ;
      Ref2.create = function(value0) {
        return new Ref2(value0);
      };
      return Ref2;
    }();
    var unsafeGetProperty = Halogen_VDom_Util.unsafeGetAny;
    var setProperty = Halogen_VDom_Util.unsafeSetAny;
    var removeProperty = function(key, el) {
      var v = Halogen_VDom_Util.hasAttribute(Data_Nullable["null"], key, el);
      if (v) {
        return Halogen_VDom_Util.removeAttribute(Data_Nullable["null"], key, el);
      }
      ;
      var v1 = Foreign.typeOf(Halogen_VDom_Util.unsafeGetAny(key, el));
      if (v1 === "string") {
        return Halogen_VDom_Util.unsafeSetAny(key, "", el);
      }
      ;
      if (key === "rowSpan") {
        return Halogen_VDom_Util.unsafeSetAny(key, 1, el);
      }
      ;
      if (key === "colSpan") {
        return Halogen_VDom_Util.unsafeSetAny(key, 1, el);
      }
      ;
      return Halogen_VDom_Util.unsafeSetAny(key, Halogen_VDom_Util.jsUndefined, el);
    };
    var propToStrKey = function(v) {
      if (v instanceof Attribute && v.value0 instanceof Data_Maybe.Just) {
        return "attr/" + (v.value0.value0 + (":" + v.value1));
      }
      ;
      if (v instanceof Attribute) {
        return "attr/:" + v.value1;
      }
      ;
      if (v instanceof Property) {
        return "prop/" + v.value0;
      }
      ;
      if (v instanceof Handler) {
        return "handler/" + v.value0;
      }
      ;
      if (v instanceof Ref) {
        return "ref";
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
    };
    var propFromString = Unsafe_Coerce.unsafeCoerce;
    var functorProp = {
      map: function(v) {
        return function(v1) {
          if (v1 instanceof Handler) {
            return new Handler(v1.value0, Data_Functor.map(Data_Functor.functorFn)(Data_Functor.map(Data_Maybe.functorMaybe)(v))(v1.value1));
          }
          ;
          if (v1 instanceof Ref) {
            return new Ref(Data_Functor.map(Data_Functor.functorFn)(Data_Functor.map(Data_Maybe.functorMaybe)(v))(v1.value0));
          }
          ;
          return v1;
        };
      }
    };
    var buildProp = function(emit) {
      return function(el) {
        var removeProp = function(prevEvents) {
          return function(v, v1) {
            if (v1 instanceof Attribute) {
              return Halogen_VDom_Util.removeAttribute(Data_Nullable.toNullable(v1.value0), v1.value1, el);
            }
            ;
            if (v1 instanceof Property) {
              return removeProperty(v1.value0, el);
            }
            ;
            if (v1 instanceof Handler) {
              var handler = Halogen_VDom_Util.unsafeLookup(v1.value0, prevEvents);
              return Halogen_VDom_Util.removeEventListener(v1.value0, Data_Tuple.fst(handler), el);
            }
            ;
            if (v1 instanceof Ref) {
              return Data_Unit.unit;
            }
            ;
            throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
          };
        };
        var mbEmit = function(v) {
          if (v instanceof Data_Maybe.Just) {
            return emit(v.value0)();
          }
          ;
          return Data_Unit.unit;
        };
        var haltProp = function(state) {
          var v = Foreign_Object.lookup("ref")(state.props);
          if (v instanceof Data_Maybe.Just && v.value0 instanceof Ref) {
            return mbEmit(v.value0.value0(new Removed(el)));
          }
          ;
          return Data_Unit.unit;
        };
        var diffProp = function(prevEvents, events) {
          return function(v, v1, v11, v2) {
            if (v11 instanceof Attribute && v2 instanceof Attribute) {
              var $57 = v11.value2 === v2.value2;
              if ($57) {
                return v2;
              }
              ;
              Halogen_VDom_Util.setAttribute(Data_Nullable.toNullable(v2.value0), v2.value1, v2.value2, el);
              return v2;
            }
            ;
            if (v11 instanceof Property && v2 instanceof Property) {
              var v4 = Halogen_VDom_Util.refEq(v11.value1, v2.value1);
              if (v4) {
                return v2;
              }
              ;
              if (v2.value0 === "value") {
                var elVal = unsafeGetProperty("value", el);
                var $66 = Halogen_VDom_Util.refEq(elVal, v2.value1);
                if ($66) {
                  return v2;
                }
                ;
                setProperty(v2.value0, v2.value1, el);
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            if (v11 instanceof Handler && v2 instanceof Handler) {
              var handler = Halogen_VDom_Util.unsafeLookup(v2.value0, prevEvents);
              Effect_Ref.write(v2.value1)(Data_Tuple.snd(handler))();
              Halogen_VDom_Util.pokeMutMap(v2.value0, handler, events);
              return v2;
            }
            ;
            return v2;
          };
        };
        var applyProp = function(events) {
          return function(v, v1, v2) {
            if (v2 instanceof Attribute) {
              Halogen_VDom_Util.setAttribute(Data_Nullable.toNullable(v2.value0), v2.value1, v2.value2, el);
              return v2;
            }
            ;
            if (v2 instanceof Property) {
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            if (v2 instanceof Handler) {
              var v3 = Halogen_VDom_Util.unsafeGetAny(v2.value0, events);
              if (Halogen_VDom_Util.unsafeHasAny(v2.value0, events)) {
                Effect_Ref.write(v2.value1)(Data_Tuple.snd(v3))();
                return v2;
              }
              ;
              var ref = Effect_Ref["new"](v2.value1)();
              var listener = Web_Event_EventTarget.eventListener(function(ev) {
                return function __do() {
                  var f$prime = Effect_Ref.read(ref)();
                  return mbEmit(f$prime(ev));
                };
              })();
              Halogen_VDom_Util.pokeMutMap(v2.value0, new Data_Tuple.Tuple(listener, ref), events);
              Halogen_VDom_Util.addEventListener(v2.value0, listener, el);
              return v2;
            }
            ;
            if (v2 instanceof Ref) {
              mbEmit(v2.value0(new Created(el)));
              return v2;
            }
            ;
            throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
          };
        };
        var patchProp = function(state, ps2) {
          var events = Halogen_VDom_Util.newMutMap();
          var onThis = removeProp(state.events);
          var onThese = diffProp(state.events, events);
          var onThat = applyProp(events);
          var props = Halogen_VDom_Util.diffWithKeyAndIxE(state.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: Halogen_VDom_Util.unsafeFreeze(events),
            props
          };
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(Data_Unit.unit, nextState, patchProp, haltProp));
        };
        var renderProp = function(ps1) {
          var events = Halogen_VDom_Util.newMutMap();
          var ps1$prime = Halogen_VDom_Util.strMapWithIxE(ps1, propToStrKey, applyProp(events));
          var state = {
            events: Halogen_VDom_Util.unsafeFreeze(events),
            props: ps1$prime
          };
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(Data_Unit.unit, state, patchProp, haltProp));
        };
        return renderProp;
      };
    };
    exports["Attribute"] = Attribute;
    exports["Property"] = Property;
    exports["Handler"] = Handler;
    exports["propFromString"] = propFromString;
    exports["buildProp"] = buildProp;
    exports["functorProp"] = functorProp;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.VDom.Types"] = $PS["Halogen.VDom.Types"] || {};
    var exports = $PS["Halogen.VDom.Types"];
    var Data_Bifunctor = $PS["Data.Bifunctor"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var Text = function() {
      function Text2(value0) {
        this.value0 = value0;
      }
      ;
      Text2.create = function(value0) {
        return new Text2(value0);
      };
      return Text2;
    }();
    var Elem = function() {
      function Elem2(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
      }
      ;
      Elem2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return new Elem2(value0, value1, value2, value3);
            };
          };
        };
      };
      return Elem2;
    }();
    var Keyed = function() {
      function Keyed2(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
      }
      ;
      Keyed2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return new Keyed2(value0, value1, value2, value3);
            };
          };
        };
      };
      return Keyed2;
    }();
    var Widget = function() {
      function Widget2(value0) {
        this.value0 = value0;
      }
      ;
      Widget2.create = function(value0) {
        return new Widget2(value0);
      };
      return Widget2;
    }();
    var Grafted = function() {
      function Grafted2(value0) {
        this.value0 = value0;
      }
      ;
      Grafted2.create = function(value0) {
        return new Grafted2(value0);
      };
      return Grafted2;
    }();
    var Graft = function() {
      function Graft2(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
      }
      ;
      Graft2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return new Graft2(value0, value1, value2);
          };
        };
      };
      return Graft2;
    }();
    var unGraft = function(f) {
      return function($55) {
        return f($55);
      };
    };
    var graft = Unsafe_Coerce.unsafeCoerce;
    var bifunctorGraft = {
      bimap: function(f) {
        return function(g) {
          return unGraft(function(v) {
            return graft(new Graft(function($57) {
              return f(v.value0($57));
            }, function($58) {
              return g(v.value1($58));
            }, v.value2));
          });
        };
      }
    };
    var bifunctorVDom = {
      bimap: function(v) {
        return function(v1) {
          return function(v2) {
            if (v2 instanceof Text) {
              return new Text(v2.value0);
            }
            ;
            if (v2 instanceof Grafted) {
              return new Grafted(Data_Bifunctor.bimap(bifunctorGraft)(v)(v1)(v2.value0));
            }
            ;
            return new Grafted(graft(new Graft(v, v1, v2)));
          };
        };
      }
    };
    var runGraft = unGraft(function(v) {
      var go = function(v2) {
        if (v2 instanceof Text) {
          return new Text(v2.value0);
        }
        ;
        if (v2 instanceof Elem) {
          return new Elem(v2.value0, v2.value1, v.value0(v2.value2), Data_Functor.map(Data_Functor.functorArray)(go)(v2.value3));
        }
        ;
        if (v2 instanceof Keyed) {
          return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), Data_Functor.map(Data_Functor.functorArray)(Data_Functor.map(Data_Tuple.functorTuple)(go))(v2.value3));
        }
        ;
        if (v2 instanceof Widget) {
          return new Widget(v.value1(v2.value0));
        }
        ;
        if (v2 instanceof Grafted) {
          return new Grafted(Data_Bifunctor.bimap(bifunctorGraft)(v.value0)(v.value1)(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
      };
      return go(v.value2);
    });
    exports["Text"] = Text;
    exports["Elem"] = Elem;
    exports["Keyed"] = Keyed;
    exports["Widget"] = Widget;
    exports["Grafted"] = Grafted;
    exports["runGraft"] = runGraft;
    exports["bifunctorVDom"] = bifunctorVDom;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.HTML.Core"] = $PS["Halogen.HTML.Core"] || {};
    var exports = $PS["Halogen.HTML.Core"];
    var Data_Bifunctor = $PS["Data.Bifunctor"];
    var Data_Functor = $PS["Data.Functor"];
    var Halogen_Query_Input = $PS["Halogen.Query.Input"];
    var Halogen_VDom_DOM_Prop = $PS["Halogen.VDom.DOM.Prop"];
    var Halogen_VDom_Types = $PS["Halogen.VDom.Types"];
    var HTML = function(x) {
      return x;
    };
    var widget = function($19) {
      return HTML(Halogen_VDom_Types.Widget.create($19));
    };
    var toPropValue = function(dict) {
      return dict.toPropValue;
    };
    var text = function($20) {
      return HTML(Halogen_VDom_Types.Text.create($20));
    };
    var prop = function(dictIsProp) {
      return function(v) {
        var $22 = Halogen_VDom_DOM_Prop.Property.create(v);
        var $23 = toPropValue(dictIsProp);
        return function($24) {
          return $22($23($24));
        };
      };
    };
    var isPropString = {
      toPropValue: Halogen_VDom_DOM_Prop.propFromString
    };
    var handler = Halogen_VDom_DOM_Prop.Handler.create;
    var element = function(ns) {
      return function(name) {
        return function(props) {
          return function(children) {
            return new Halogen_VDom_Types.Elem(ns, name, props, children);
          };
        };
      };
    };
    var bifunctorHTML = {
      bimap: function(f) {
        return function(g) {
          return function(v) {
            return Data_Bifunctor.bimap(Halogen_VDom_Types.bifunctorVDom)(Data_Functor.map(Data_Functor.functorArray)(Data_Functor.map(Halogen_VDom_DOM_Prop.functorProp)(Data_Functor.map(Halogen_Query_Input.functorInput)(g))))(f)(v);
          };
        };
      }
    };
    var attr = function(ns) {
      return function(v) {
        return Halogen_VDom_DOM_Prop.Attribute.create(ns)(v);
      };
    };
    exports["widget"] = widget;
    exports["text"] = text;
    exports["element"] = element;
    exports["prop"] = prop;
    exports["attr"] = attr;
    exports["handler"] = handler;
    exports["bifunctorHTML"] = bifunctorHTML;
    exports["isPropString"] = isPropString;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Query.HalogenQ"] = $PS["Halogen.Query.HalogenQ"] || {};
    var exports = $PS["Halogen.Query.HalogenQ"];
    var Initialize = function() {
      function Initialize2(value0) {
        this.value0 = value0;
      }
      ;
      Initialize2.create = function(value0) {
        return new Initialize2(value0);
      };
      return Initialize2;
    }();
    var Finalize = function() {
      function Finalize2(value0) {
        this.value0 = value0;
      }
      ;
      Finalize2.create = function(value0) {
        return new Finalize2(value0);
      };
      return Finalize2;
    }();
    var Receive = function() {
      function Receive2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Receive2.create = function(value0) {
        return function(value1) {
          return new Receive2(value0, value1);
        };
      };
      return Receive2;
    }();
    var Action = function() {
      function Action2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Action2.create = function(value0) {
        return function(value1) {
          return new Action2(value0, value1);
        };
      };
      return Action2;
    }();
    var Query = function() {
      function Query2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Query2.create = function(value0) {
        return function(value1) {
          return new Query2(value0, value1);
        };
      };
      return Query2;
    }();
    exports["Initialize"] = Initialize;
    exports["Finalize"] = Finalize;
    exports["Receive"] = Receive;
    exports["Action"] = Action;
    exports["Query"] = Query;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Web.DOM.Element"] = $PS["Web.DOM.Element"] || {};
    var exports = $PS["Web.DOM.Element"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var toNode = Unsafe_Coerce.unsafeCoerce;
    exports["toNode"] = toNode;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.VDom.DOM"] = $PS["Halogen.VDom.DOM"] || {};
    var exports = $PS["Halogen.VDom.DOM"];
    var Data_Array = $PS["Data.Array"];
    var Data_Boolean = $PS["Data.Boolean"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Nullable = $PS["Data.Nullable"];
    var Data_Tuple = $PS["Data.Tuple"];
    var Halogen_VDom_Machine = $PS["Halogen.VDom.Machine"];
    var Halogen_VDom_Types = $PS["Halogen.VDom.Types"];
    var Halogen_VDom_Util = $PS["Halogen.VDom.Util"];
    var Web_DOM_Element = $PS["Web.DOM.Element"];
    var haltWidget = function(v) {
      return Halogen_VDom_Machine.halt(v.widget);
    };
    var patchWidget = function(state, vdom) {
      if (vdom instanceof Halogen_VDom_Types.Grafted) {
        return patchWidget(state, Halogen_VDom_Types.runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Halogen_VDom_Types.Widget) {
        var res = Halogen_VDom_Machine.step(state.widget, vdom.value0);
        var res$prime = Halogen_VDom_Machine.unStep(function(v) {
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(v.value0, {
            build: state.build,
            widget: res
          }, patchWidget, haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state);
      return state.build(vdom);
    };
    var haltText = function(v) {
      var parent = Halogen_VDom_Util.parentNode(v.node);
      return Halogen_VDom_Util.removeChild(v.node, parent);
    };
    var patchText = function(state, vdom) {
      if (vdom instanceof Halogen_VDom_Types.Grafted) {
        return patchText(state, Halogen_VDom_Types.runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Halogen_VDom_Types.Text) {
        if (state.value === vdom.value0) {
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(state.node, state, patchText, haltText));
        }
        ;
        if (Data_Boolean.otherwise) {
          var nextState = {
            build: state.build,
            node: state.node,
            value: vdom.value0
          };
          Halogen_VDom_Util.setTextContent(vdom.value0, state.node);
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(state.node, nextState, patchText, haltText));
        }
        ;
      }
      ;
      haltText(state);
      return state.build(vdom);
    };
    var haltKeyed = function(v) {
      var parent = Halogen_VDom_Util.parentNode(v.node);
      Halogen_VDom_Util.removeChild(v.node, parent);
      Halogen_VDom_Util.forInE(v.children, function(v1, s) {
        return Halogen_VDom_Machine.halt(s);
      });
      return Halogen_VDom_Machine.halt(v.attrs);
    };
    var haltElem = function(v) {
      var parent = Halogen_VDom_Util.parentNode(v.node);
      Halogen_VDom_Util.removeChild(v.node, parent);
      Halogen_VDom_Util.forEachE(v.children, Halogen_VDom_Machine.halt);
      return Halogen_VDom_Machine.halt(v.attrs);
    };
    var eqElemSpec = function(ns1, v, ns2, v1) {
      var $58 = v === v1;
      if ($58) {
        if (ns1 instanceof Data_Maybe.Just && (ns2 instanceof Data_Maybe.Just && ns1.value0 === ns2.value0)) {
          return true;
        }
        ;
        if (ns1 instanceof Data_Maybe.Nothing && ns2 instanceof Data_Maybe.Nothing) {
          return true;
        }
        ;
        return false;
      }
      ;
      return false;
    };
    var patchElem = function(state, vdom) {
      if (vdom instanceof Halogen_VDom_Types.Grafted) {
        return patchElem(state, Halogen_VDom_Types.runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Halogen_VDom_Types.Elem && eqElemSpec(state.ns, state.name, vdom.value0, vdom.value1)) {
        var v = Data_Array.length(vdom.value3);
        var v1 = Data_Array.length(state.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = Halogen_VDom_Machine.step(state.attrs, vdom.value2);
          var nextState = {
            build: state.build,
            node: state.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state.children
          };
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(state.node, nextState, patchElem, haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return Halogen_VDom_Machine.halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = Halogen_VDom_Machine.step(s, v2);
          Halogen_VDom_Util.insertChildIx(ix, Halogen_VDom_Machine.extract(res), state.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state.build(v2);
          Halogen_VDom_Util.insertChildIx(ix, Halogen_VDom_Machine.extract(res), state.node);
          return res;
        };
        var children2 = Halogen_VDom_Util.diffWithIxE(state.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = Halogen_VDom_Machine.step(state.attrs, vdom.value2);
        var nextState = {
          build: state.build,
          node: state.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(state.node, nextState, patchElem, haltElem));
      }
      ;
      haltElem(state);
      return state.build(vdom);
    };
    var patchKeyed = function(state, vdom) {
      if (vdom instanceof Halogen_VDom_Types.Grafted) {
        return patchKeyed(state, Halogen_VDom_Types.runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Halogen_VDom_Types.Keyed && eqElemSpec(state.ns, state.name, vdom.value0, vdom.value1)) {
        var v = Data_Array.length(vdom.value3);
        if (state.length === 0 && v === 0) {
          var attrs2 = Halogen_VDom_Machine.step(state.attrs, vdom.value2);
          var nextState = {
            build: state.build,
            node: state.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state.children,
            length: 0
          };
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(state.node, nextState, patchKeyed, haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return Halogen_VDom_Machine.halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = Halogen_VDom_Machine.step(s, v3.value1);
          Halogen_VDom_Util.insertChildIx(ix$prime, Halogen_VDom_Machine.extract(res), state.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state.build(v3.value1);
          Halogen_VDom_Util.insertChildIx(ix, Halogen_VDom_Machine.extract(res), state.node);
          return res;
        };
        var children2 = Halogen_VDom_Util.diffWithKeyAndIxE(state.children, vdom.value3, Data_Tuple.fst, onThese, onThis, onThat);
        var attrs2 = Halogen_VDom_Machine.step(state.attrs, vdom.value2);
        var nextState = {
          build: state.build,
          node: state.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(state.node, nextState, patchKeyed, haltKeyed));
      }
      ;
      haltKeyed(state);
      return state.build(vdom);
    };
    var buildWidget = function(v, build, w) {
      var res = v.buildWidget(v)(w);
      var res$prime = Halogen_VDom_Machine.unStep(function(v1) {
        return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(v1.value0, {
          build,
          widget: res
        }, patchWidget, haltWidget));
      })(res);
      return res$prime;
    };
    var buildText = function(v, build, s) {
      var node = Halogen_VDom_Util.createTextNode(s, v.document);
      var state = {
        build,
        node,
        value: s
      };
      return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(node, state, patchText, haltText));
    };
    var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
      var el = Halogen_VDom_Util.createElement(Data_Nullable.toNullable(ns1), name1, v.document);
      var node = Web_DOM_Element.toNode(el);
      var onChild = function(v1, ix, v2) {
        var res = build(v2.value1);
        Halogen_VDom_Util.insertChildIx(ix, Halogen_VDom_Machine.extract(res), node);
        return res;
      };
      var children = Halogen_VDom_Util.strMapWithIxE(ch1, Data_Tuple.fst, onChild);
      var attrs = v.buildAttributes(el)(as1);
      var state = {
        build,
        node,
        attrs,
        ns: ns1,
        name: name1,
        children,
        length: Data_Array.length(ch1)
      };
      return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(node, state, patchKeyed, haltKeyed));
    };
    var buildElem = function(v, build, ns1, name1, as1, ch1) {
      var el = Halogen_VDom_Util.createElement(Data_Nullable.toNullable(ns1), name1, v.document);
      var node = Web_DOM_Element.toNode(el);
      var onChild = function(ix, child) {
        var res = build(child);
        Halogen_VDom_Util.insertChildIx(ix, Halogen_VDom_Machine.extract(res), node);
        return res;
      };
      var children = Halogen_VDom_Util.forE(ch1, onChild);
      var attrs = v.buildAttributes(el)(as1);
      var state = {
        build,
        node,
        attrs,
        ns: ns1,
        name: name1,
        children
      };
      return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(node, state, patchElem, haltElem));
    };
    var buildVDom = function(spec) {
      var build = function(v) {
        if (v instanceof Halogen_VDom_Types.Text) {
          return buildText(spec, build, v.value0);
        }
        ;
        if (v instanceof Halogen_VDom_Types.Elem) {
          return buildElem(spec, build, v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Halogen_VDom_Types.Keyed) {
          return buildKeyed(spec, build, v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Halogen_VDom_Types.Widget) {
          return buildWidget(spec, build, v.value0);
        }
        ;
        if (v instanceof Halogen_VDom_Types.Grafted) {
          return build(Halogen_VDom_Types.runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
      return build;
    };
    exports["buildVDom"] = buildVDom;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.VDom.Thunk"] = $PS["Halogen.VDom.Thunk"] || {};
    var exports = $PS["Halogen.VDom.Thunk"];
    var Halogen_VDom_DOM = $PS["Halogen.VDom.DOM"];
    var Halogen_VDom_Machine = $PS["Halogen.VDom.Machine"];
    var Halogen_VDom_Util = $PS["Halogen.VDom.Util"];
    var Thunk = function() {
      function Thunk2(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
      }
      ;
      Thunk2.create = function(value0) {
        return function(value1) {
          return function(value2) {
            return function(value3) {
              return new Thunk2(value0, value1, value2, value3);
            };
          };
        };
      };
      return Thunk2;
    }();
    var unsafeEqThunk = function(v, v1) {
      return Halogen_VDom_Util.refEq(v.value0, v1.value0) && (Halogen_VDom_Util.refEq(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
    };
    var thunk = function(tid, eqFn, f, a) {
      return new Thunk(tid, eqFn, f, a);
    };
    var runThunk = function(v) {
      return v.value2(v.value3);
    };
    var mapThunk = function(k) {
      return function(v) {
        return new Thunk(v.value0, v.value1, function($46) {
          return k(v.value2($46));
        }, v.value3);
      };
    };
    var hoist = mapThunk;
    var buildThunk = function(toVDom) {
      var haltThunk = function(state) {
        return Halogen_VDom_Machine.halt(state.vdom);
      };
      var patchThunk = function(state, t2) {
        var $43 = unsafeEqThunk(state.thunk, t2);
        if ($43) {
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(Halogen_VDom_Machine.extract(state.vdom), state, patchThunk, haltThunk));
        }
        ;
        var vdom = Halogen_VDom_Machine.step(state.vdom, toVDom(runThunk(t2)));
        return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(Halogen_VDom_Machine.extract(vdom), {
          vdom,
          thunk: t2
        }, patchThunk, haltThunk));
      };
      var renderThunk = function(spec) {
        return function(t) {
          var vdom = Halogen_VDom_DOM.buildVDom(spec)(toVDom(runThunk(t)));
          return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(Halogen_VDom_Machine.extract(vdom), {
            thunk: t,
            vdom
          }, patchThunk, haltThunk));
        };
      };
      return renderThunk;
    };
    exports["buildThunk"] = buildThunk;
    exports["hoist"] = hoist;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Component"] = $PS["Halogen.Component"] || {};
    var exports = $PS["Halogen.Component"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Data_Bifunctor = $PS["Data.Bifunctor"];
    var Data_Coyoneda = $PS["Data.Coyoneda"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Unit = $PS["Data.Unit"];
    var Halogen_Data_Slot = $PS["Halogen.Data.Slot"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Halogen_Query_HalogenQ = $PS["Halogen.Query.HalogenQ"];
    var Halogen_VDom_Thunk = $PS["Halogen.VDom.Thunk"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var ComponentSlot = function() {
      function ComponentSlot2(value0) {
        this.value0 = value0;
      }
      ;
      ComponentSlot2.create = function(value0) {
        return new ComponentSlot2(value0);
      };
      return ComponentSlot2;
    }();
    var ThunkSlot = function() {
      function ThunkSlot2(value0) {
        this.value0 = value0;
      }
      ;
      ThunkSlot2.create = function(value0) {
        return new ThunkSlot2(value0);
      };
      return ThunkSlot2;
    }();
    var unComponentSlot = Unsafe_Coerce.unsafeCoerce;
    var unComponent = Unsafe_Coerce.unsafeCoerce;
    var mkEval = function(args) {
      return function(v) {
        if (v instanceof Halogen_Query_HalogenQ.Initialize) {
          return Data_Functor.voidLeft(Halogen_Query_HalogenM.functorHalogenM)(Data_Foldable.traverse_(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Foldable.foldableMaybe)(args.handleAction)(args.initialize))(v.value0);
        }
        ;
        if (v instanceof Halogen_Query_HalogenQ.Finalize) {
          return Data_Functor.voidLeft(Halogen_Query_HalogenM.functorHalogenM)(Data_Foldable.traverse_(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Foldable.foldableMaybe)(args.handleAction)(args.finalize))(v.value0);
        }
        ;
        if (v instanceof Halogen_Query_HalogenQ.Receive) {
          return Data_Functor.voidLeft(Halogen_Query_HalogenM.functorHalogenM)(Data_Foldable.traverse_(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Foldable.foldableMaybe)(args.handleAction)(args.receive(v.value0)))(v.value1);
        }
        ;
        if (v instanceof Halogen_Query_HalogenQ.Action) {
          return Data_Functor.voidLeft(Halogen_Query_HalogenM.functorHalogenM)(args.handleAction(v.value0))(v.value1);
        }
        ;
        if (v instanceof Halogen_Query_HalogenQ.Query) {
          return Data_Coyoneda.unCoyoneda(function(g) {
            var $25 = Data_Functor.map(Halogen_Query_HalogenM.functorHalogenM)(Data_Maybe.maybe(v.value1(Data_Unit.unit))(g));
            return function($26) {
              return $25(args.handleQuery($26));
            };
          })(v.value0);
        }
        ;
        throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 70): " + [v.constructor.name]);
      };
    };
    var mkComponentSlot = Unsafe_Coerce.unsafeCoerce;
    var mkComponent = Unsafe_Coerce.unsafeCoerce;
    var hoistSlot = function(dictFunctor) {
      return function(nat) {
        return function(v) {
          if (v instanceof ComponentSlot) {
            return unComponentSlot(function(slot) {
              return ComponentSlot.create(mkComponentSlot({
                get: slot.get,
                pop: slot.pop,
                set: slot.set,
                component: hoist(dictFunctor)(nat)(slot.component),
                input: slot.input,
                output: slot.output
              }));
            })(v.value0);
          }
          ;
          if (v instanceof ThunkSlot) {
            return ThunkSlot.create(Halogen_VDom_Thunk.hoist(Data_Bifunctor.lmap(Halogen_HTML_Core.bifunctorHTML)(hoistSlot(dictFunctor)(nat)))(v.value0));
          }
          ;
          throw new Error("Failed pattern match at Halogen.Component (line 279, column 17 - line 284, column 53): " + [v.constructor.name]);
        };
      };
    };
    var hoist = function(dictFunctor) {
      return function(nat) {
        return unComponent(function(c) {
          return mkComponent({
            initialState: c.initialState,
            render: function() {
              var $27 = Data_Bifunctor.lmap(Halogen_HTML_Core.bifunctorHTML)(hoistSlot(dictFunctor)(nat));
              return function($28) {
                return $27(c.render($28));
              };
            }(),
            "eval": function() {
              var $29 = Halogen_Query_HalogenM.hoist(dictFunctor)(nat);
              return function($30) {
                return $29(c["eval"]($30));
              };
            }()
          });
        });
      };
    };
    var defaultEval = {
      handleAction: Data_Function["const"](Control_Applicative.pure(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Unit.unit)),
      handleQuery: Data_Function["const"](Control_Applicative.pure(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Maybe.Nothing.value)),
      receive: Data_Function["const"](Data_Maybe.Nothing.value),
      initialize: Data_Maybe.Nothing.value,
      finalize: Data_Maybe.Nothing.value
    };
    var componentSlot = function(dictCons) {
      return function(dictIsSymbol) {
        return function(dictOrd) {
          return function(label) {
            return function(p) {
              return function(comp) {
                return function(input) {
                  return function(output) {
                    return mkComponentSlot({
                      get: Halogen_Data_Slot.lookup()(dictIsSymbol)(dictOrd)(label)(p),
                      pop: Halogen_Data_Slot.pop()(dictIsSymbol)(dictOrd)(label)(p),
                      set: Halogen_Data_Slot.insert()(dictIsSymbol)(dictOrd)(label)(p),
                      component: comp,
                      input,
                      output
                    });
                  };
                };
              };
            };
          };
        };
      };
    };
    exports["mkComponent"] = mkComponent;
    exports["unComponent"] = unComponent;
    exports["hoist"] = hoist;
    exports["mkEval"] = mkEval;
    exports["defaultEval"] = defaultEval;
    exports["ComponentSlot"] = ComponentSlot;
    exports["ThunkSlot"] = ThunkSlot;
    exports["componentSlot"] = componentSlot;
    exports["unComponentSlot"] = unComponentSlot;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Monad.Reader.Class"] = $PS["Control.Monad.Reader.Class"] || {};
    var exports = $PS["Control.Monad.Reader.Class"];
    var ask = function(dict) {
      return dict.ask;
    };
    exports["ask"] = ask;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Monad.Reader.Trans"] = $PS["Control.Monad.Reader.Trans"] || {};
    var exports = $PS["Control.Monad.Reader.Trans"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Apply = $PS["Control.Apply"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad_Trans_Class = $PS["Control.Monad.Trans.Class"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Effect_Class = $PS["Effect.Class"];
    var ReaderT = function(x) {
      return x;
    };
    var runReaderT = function(v) {
      return v;
    };
    var monadTransReaderT = {
      lift: function(dictMonad) {
        return function($64) {
          return ReaderT(Data_Function["const"]($64));
        };
      }
    };
    var mapReaderT = function(f) {
      return function(v) {
        return function($65) {
          return f(v($65));
        };
      };
    };
    var functorReaderT = function(dictFunctor) {
      return {
        map: function() {
          var $66 = Data_Functor.map(dictFunctor);
          return function($67) {
            return mapReaderT($66($67));
          };
        }()
      };
    };
    var applyReaderT = function(dictApply) {
      return {
        apply: function(v) {
          return function(v1) {
            return function(r) {
              return Control_Apply.apply(dictApply)(v(r))(v1(r));
            };
          };
        },
        Functor0: function() {
          return functorReaderT(dictApply.Functor0());
        }
      };
    };
    var bindReaderT = function(dictBind) {
      return {
        bind: function(v) {
          return function(k) {
            return function(r) {
              return Control_Bind.bind(dictBind)(v(r))(function(a) {
                var v1 = k(a);
                return v1(r);
              });
            };
          };
        },
        Apply0: function() {
          return applyReaderT(dictBind.Apply0());
        }
      };
    };
    var applicativeReaderT = function(dictApplicative) {
      return {
        pure: function() {
          var $71 = Control_Applicative.pure(dictApplicative);
          return function($72) {
            return ReaderT(Data_Function["const"]($71($72)));
          };
        }(),
        Apply0: function() {
          return applyReaderT(dictApplicative.Apply0());
        }
      };
    };
    var monadReaderT = function(dictMonad) {
      return {
        Applicative0: function() {
          return applicativeReaderT(dictMonad.Applicative0());
        },
        Bind1: function() {
          return bindReaderT(dictMonad.Bind1());
        }
      };
    };
    var monadAskReaderT = function(dictMonad) {
      return {
        ask: Control_Applicative.pure(dictMonad.Applicative0()),
        Monad0: function() {
          return monadReaderT(dictMonad);
        }
      };
    };
    var monadEffectReader = function(dictMonadEffect) {
      return {
        liftEffect: function() {
          var $74 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadEffect.Monad0());
          var $75 = Effect_Class.liftEffect(dictMonadEffect);
          return function($76) {
            return $74($75($76));
          };
        }(),
        Monad0: function() {
          return monadReaderT(dictMonadEffect.Monad0());
        }
      };
    };
    exports["runReaderT"] = runReaderT;
    exports["functorReaderT"] = functorReaderT;
    exports["applicativeReaderT"] = applicativeReaderT;
    exports["bindReaderT"] = bindReaderT;
    exports["monadReaderT"] = monadReaderT;
    exports["monadEffectReader"] = monadEffectReader;
    exports["monadAskReaderT"] = monadAskReaderT;
  })(PS);
  (function(exports) {
    "use strict";
    exports.reallyUnsafeRefEq = function(a) {
      return function(b) {
        return a === b;
      };
    };
  })(PS["Unsafe.Reference"] = PS["Unsafe.Reference"] || {});
  (function($PS) {
    "use strict";
    $PS["Unsafe.Reference"] = $PS["Unsafe.Reference"] || {};
    var exports = $PS["Unsafe.Reference"];
    var $foreign = $PS["Unsafe.Reference"];
    var unsafeRefEq = $foreign.reallyUnsafeRefEq;
    exports["unsafeRefEq"] = unsafeRefEq;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Subscription"] = $PS["Halogen.Subscription"] || {};
    var exports = $PS["Halogen.Subscription"];
    var Control_Bind = $PS["Control.Bind"];
    var Data_Array = $PS["Data.Array"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Effect = $PS["Effect"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Safe_Coerce = $PS["Safe.Coerce"];
    var Unsafe_Reference = $PS["Unsafe.Reference"];
    var unsubscribe = function(v) {
      return v;
    };
    var subscribe = function(v) {
      return function(k) {
        return v(function() {
          var $55 = Data_Functor["void"](Effect.functorEffect);
          return function($56) {
            return $55(k($56));
          };
        }());
      };
    };
    var notify = function(v) {
      return function(a) {
        return v(a);
      };
    };
    var makeEmitter = Safe_Coerce.coerce();
    var functorEmitter = {
      map: function(f) {
        return function(v) {
          return function(k) {
            return v(function($57) {
              return k(f($57));
            });
          };
        };
      }
    };
    var create = function __do() {
      var subscribers = Effect_Ref["new"]([])();
      return {
        emitter: function(k) {
          return function __do2() {
            Effect_Ref.modify_(function(v) {
              return Data_Semigroup.append(Data_Semigroup.semigroupArray)(v)([k]);
            })(subscribers)();
            return Effect_Ref.modify_(Data_Array.deleteBy(Unsafe_Reference.unsafeRefEq)(k))(subscribers);
          };
        },
        listener: function(a) {
          return Control_Bind.bind(Effect.bindEffect)(Effect_Ref.read(subscribers))(Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableArray)(function(k) {
            return k(a);
          }));
        }
      };
    };
    exports["create"] = create;
    exports["notify"] = notify;
    exports["makeEmitter"] = makeEmitter;
    exports["subscribe"] = subscribe;
    exports["unsubscribe"] = unsubscribe;
    exports["functorEmitter"] = functorEmitter;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Store.Monad"] = $PS["Halogen.Store.Monad"] || {};
    var exports = $PS["Halogen.Store.Monad"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad_Reader_Class = $PS["Control.Monad.Reader.Class"];
    var Control_Monad_Reader_Trans = $PS["Control.Monad.Reader.Trans"];
    var Control_Monad_Trans_Class = $PS["Control.Monad.Trans.Class"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Effect = $PS["Effect"];
    var Effect_Aff = $PS["Effect.Aff"];
    var Effect_Class = $PS["Effect.Class"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Halogen_Subscription = $PS["Halogen.Subscription"];
    var updateStore = function(dict) {
      return dict.updateStore;
    };
    var runStoreT = function(dictMonad) {
      return function(initialStore) {
        return function(reducer) {
          return function(component) {
            return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(function __do() {
              var value = Effect_Ref["new"](initialStore)();
              var v = Halogen_Subscription.create();
              return {
                value,
                emitter: v.emitter,
                listener: v.listener,
                reducer
              };
            }))(function(hs) {
              return Control_Applicative.pure(Effect_Aff.applicativeAff)(Halogen_Component.hoist(dictMonad.Bind1().Apply0().Functor0())(function(v) {
                return Control_Monad_Reader_Trans.runReaderT(v)(hs);
              })(component));
            });
          };
        };
      };
    };
    var monadStoreT = function(dictMonad) {
      return Control_Monad_Reader_Trans.monadReaderT(dictMonad);
    };
    var monadEffectStoreT = function(dictMonadEffect) {
      return Control_Monad_Reader_Trans.monadEffectReader(dictMonadEffect);
    };
    var monadStoreStoreT = function(dictMonadAff) {
      return {
        getStore: Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(dictMonadAff.MonadEffect0().Monad0().Bind1()))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(dictMonadAff.MonadEffect0().Monad0())))(function(store) {
          return Effect_Class.liftEffect(Control_Monad_Reader_Trans.monadEffectReader(dictMonadAff.MonadEffect0()))(Effect_Ref.read(store.value));
        }),
        updateStore: function(action) {
          return Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(dictMonadAff.MonadEffect0().Monad0().Bind1()))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(dictMonadAff.MonadEffect0().Monad0())))(function(store) {
            return Effect_Class.liftEffect(Control_Monad_Reader_Trans.monadEffectReader(dictMonadAff.MonadEffect0()))(function __do() {
              var current = Effect_Ref.read(store.value)();
              var newStore = store.reducer(current)(action);
              Effect_Ref.write(newStore)(store.value)();
              return Halogen_Subscription.notify(store.listener)(newStore)();
            });
          });
        },
        emitSelected: function(v) {
          var filterEmitter = function(emitter) {
            return function(predicate) {
              return Halogen_Subscription.makeEmitter(function(k) {
                return emitter(function(a) {
                  return Control_Bind.bind(Effect.bindEffect)(predicate(a))(Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableMaybe)(k));
                });
              });
            };
          };
          return Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(dictMonadAff.MonadEffect0().Monad0().Bind1()))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(dictMonadAff.MonadEffect0().Monad0())))(function(store) {
            return Effect_Class.liftEffect(Control_Monad_Reader_Trans.monadEffectReader(dictMonadAff.MonadEffect0()))(function __do() {
              var init = Effect_Ref.read(store.value)();
              var prevRef = Effect_Ref["new"](v.select(init))();
              return filterEmitter(store.emitter)(function($$new) {
                return function __do2() {
                  var prevDerived = Effect_Ref.read(prevRef)();
                  var newDerived = v.select($$new);
                  var $23 = v.eq(prevDerived)(newDerived);
                  if ($23) {
                    return Data_Maybe.Nothing.value;
                  }
                  ;
                  Effect_Class.liftEffect(Effect_Class.monadEffectEffect)(Effect_Ref.write(newDerived)(prevRef))();
                  return new Data_Maybe.Just(newDerived);
                };
              });
            });
          });
        },
        MonadEffect0: function() {
          return monadEffectStoreT(dictMonadAff.MonadEffect0());
        }
      };
    };
    var getStore = function(dict) {
      return dict.getStore;
    };
    var functorStoreT = function(dictFunctor) {
      return Control_Monad_Reader_Trans.functorReaderT(dictFunctor);
    };
    var emitSelected = function(dict) {
      return dict.emitSelected;
    };
    var monadStoreHalogenM = function(dictMonadStore) {
      return {
        getStore: Control_Monad_Trans_Class.lift(Halogen_Query_HalogenM.monadTransHalogenM)(dictMonadStore.MonadEffect0().Monad0())(getStore(dictMonadStore)),
        updateStore: function() {
          var $26 = Control_Monad_Trans_Class.lift(Halogen_Query_HalogenM.monadTransHalogenM)(dictMonadStore.MonadEffect0().Monad0());
          var $27 = updateStore(dictMonadStore);
          return function($28) {
            return $26($27($28));
          };
        }(),
        emitSelected: function() {
          var $29 = Control_Monad_Trans_Class.lift(Halogen_Query_HalogenM.monadTransHalogenM)(dictMonadStore.MonadEffect0().Monad0());
          var $30 = emitSelected(dictMonadStore);
          return function($31) {
            return $29($30($31));
          };
        }(),
        MonadEffect0: function() {
          return Halogen_Query_HalogenM.monadEffectHalogenM(dictMonadStore.MonadEffect0());
        }
      };
    };
    var bindStoreT = function(dictBind) {
      return Control_Monad_Reader_Trans.bindReaderT(dictBind);
    };
    var applicativeStoreT = function(dictApplicative) {
      return Control_Monad_Reader_Trans.applicativeReaderT(dictApplicative);
    };
    exports["emitSelected"] = emitSelected;
    exports["getStore"] = getStore;
    exports["updateStore"] = updateStore;
    exports["runStoreT"] = runStoreT;
    exports["functorStoreT"] = functorStoreT;
    exports["applicativeStoreT"] = applicativeStoreT;
    exports["bindStoreT"] = bindStoreT;
    exports["monadStoreT"] = monadStoreT;
    exports["monadEffectStoreT"] = monadEffectStoreT;
    exports["monadStoreStoreT"] = monadStoreStoreT;
    exports["monadStoreHalogenM"] = monadStoreHalogenM;
  })(PS);
  (function(exports) {
    "use strict";
    exports.window = function() {
      return window;
    };
  })(PS["Web.HTML"] = PS["Web.HTML"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.HTML"] = $PS["Web.HTML"] || {};
    var exports = $PS["Web.HTML"];
    var $foreign = $PS["Web.HTML"];
    exports["window"] = $foreign.window;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Web.HTML.Event.HashChangeEvent.EventTypes"] = $PS["Web.HTML.Event.HashChangeEvent.EventTypes"] || {};
    var exports = $PS["Web.HTML.Event.HashChangeEvent.EventTypes"];
    var hashchange = "hashchange";
    exports["hashchange"] = hashchange;
  })(PS);
  (function(exports) {
    "use strict";
    exports.hash = function(location) {
      return function() {
        return location.hash;
      };
    };
    exports.setHash = function(hash) {
      return function(location) {
        return function() {
          location.hash = hash;
        };
      };
    };
  })(PS["Web.HTML.Location"] = PS["Web.HTML.Location"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.HTML.Location"] = $PS["Web.HTML.Location"] || {};
    var exports = $PS["Web.HTML.Location"];
    var $foreign = $PS["Web.HTML.Location"];
    exports["hash"] = $foreign.hash;
    exports["setHash"] = $foreign.setHash;
  })(PS);
  (function(exports) {
    "use strict";
    exports.document = function(window2) {
      return function() {
        return window2.document;
      };
    };
    exports.location = function(window2) {
      return function() {
        return window2.location;
      };
    };
  })(PS["Web.HTML.Window"] = PS["Web.HTML.Window"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.HTML.Window"] = $PS["Web.HTML.Window"] || {};
    var exports = $PS["Web.HTML.Window"];
    var $foreign = $PS["Web.HTML.Window"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var toEventTarget = Unsafe_Coerce.unsafeCoerce;
    exports["toEventTarget"] = toEventTarget;
    exports["document"] = $foreign.document;
    exports["location"] = $foreign.location;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Routing.Hash"] = $PS["Routing.Hash"] || {};
    var exports = $PS["Routing.Hash"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Apply = $PS["Control.Apply"];
    var Control_Bind = $PS["Control.Bind"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_String_CodeUnits = $PS["Data.String.CodeUnits"];
    var Effect = $PS["Effect"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Web_Event_EventTarget = $PS["Web.Event.EventTarget"];
    var Web_HTML = $PS["Web.HTML"];
    var Web_HTML_Event_HashChangeEvent_EventTypes = $PS["Web.HTML.Event.HashChangeEvent.EventTypes"];
    var Web_HTML_Location = $PS["Web.HTML.Location"];
    var Web_HTML_Window = $PS["Web.HTML.Window"];
    var setHash = function(h) {
      return Control_Bind.bind(Effect.bindEffect)(Control_Bind.bind(Effect.bindEffect)(Web_HTML.window)(Web_HTML_Window.location))(Web_HTML_Location.setHash(h));
    };
    var getHash = Control_Bind.bind(Effect.bindEffect)(Control_Bind.bind(Effect.bindEffect)(Web_HTML.window)(Web_HTML_Window.location))(function() {
      var $2 = Data_Functor.map(Effect.functorEffect)(function() {
        var $4 = Data_Maybe.fromMaybe("");
        var $5 = Data_String_CodeUnits.stripPrefix("#");
        return function($6) {
          return $4($5($6));
        };
      }());
      return function($3) {
        return $2(Web_HTML_Location.hash($3));
      };
    }());
    var foldHashes = function(cb) {
      return function(init) {
        return function __do() {
          var ref = Control_Bind.bindFlipped(Effect.bindEffect)(Effect_Ref["new"])(Control_Bind.bindFlipped(Effect.bindEffect)(init)(getHash))();
          var win = Data_Functor.map(Effect.functorEffect)(Web_HTML_Window.toEventTarget)(Web_HTML.window)();
          var listener = Web_Event_EventTarget.eventListener(function(v) {
            return Control_Bind.bindFlipped(Effect.bindEffect)(Data_Function.flip(Effect_Ref.write)(ref))(Control_Bind.join(Effect.bindEffect)(Control_Apply.apply(Effect.applyEffect)(Data_Functor.map(Effect.functorEffect)(cb)(Effect_Ref.read(ref)))(getHash)));
          })();
          Web_Event_EventTarget.addEventListener(Web_HTML_Event_HashChangeEvent_EventTypes.hashchange)(listener)(false)(win)();
          return Web_Event_EventTarget.removeEventListener(Web_HTML_Event_HashChangeEvent_EventTypes.hashchange)(listener)(false)(win);
        };
      };
    };
    var matchesWith = function(dictFoldable) {
      return function(parser) {
        return function(cb) {
          var go = function(a) {
            var $7 = Data_Maybe.maybe(Control_Applicative.pure(Effect.applicativeEffect)(a))(function(b) {
              return Data_Functor.voidRight(Effect.functorEffect)(new Data_Maybe.Just(b))(cb(a)(b));
            });
            var $8 = Data_Foldable.indexl(dictFoldable)(0);
            return function($9) {
              return $7($8(parser($9)));
            };
          };
          return foldHashes(go)(go(Data_Maybe.Nothing.value));
        };
      };
    };
    exports["getHash"] = getHash;
    exports["setHash"] = setHash;
    exports["matchesWith"] = matchesWith;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.AppM"] = $PS["App.AppM"] || {};
    var exports = $PS["App.AppM"];
    var App_Capability_Navigate = $PS["App.Capability.Navigate"];
    var App_Data_Route = $PS["App.Data.Route"];
    var App_Store = $PS["App.Store"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Effect_Aff = $PS["Effect.Aff"];
    var Effect_Aff_Class = $PS["Effect.Aff.Class"];
    var Effect_Class = $PS["Effect.Class"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_Store_Monad = $PS["Halogen.Store.Monad"];
    var Routing_Duplex = $PS["Routing.Duplex"];
    var Routing_Hash = $PS["Routing.Hash"];
    var runAppM = function(initialStore) {
      var $5 = Halogen_Store_Monad.runStoreT(Effect_Aff.monadAff)(initialStore)(App_Store.reduce);
      var $6 = Halogen_Component.hoist(Halogen_Store_Monad.functorStoreT(Effect_Aff.functorAff))(function(v) {
        return v;
      });
      return function($7) {
        return $5($6($7));
      };
    };
    var monadStoreAppM = Halogen_Store_Monad.monadStoreStoreT(Effect_Aff_Class.monadAffAff);
    var monadEffectAppM = Halogen_Store_Monad.monadEffectStoreT(Effect_Aff.monadEffectAff);
    var monadAppM = Halogen_Store_Monad.monadStoreT(Effect_Aff.monadAff);
    var monadLogAppM = {
      logMessage: function(msg) {
        return Halogen_Store_Monad.updateStore(monadStoreAppM)(new App_Store.UpdateMessageLog(msg));
      },
      Monad0: function() {
        return monadAppM;
      }
    };
    var bindAppM = Halogen_Store_Monad.bindStoreT(Effect_Aff.bindAff);
    var monadNavigateAppM = {
      navigate: function() {
        var $8 = Effect_Class.liftEffect(monadEffectAppM);
        var $9 = Routing_Duplex.print(App_Data_Route.routeCodec);
        return function($10) {
          return $8(Routing_Hash.setHash($9($10)));
        };
      }(),
      logoutUser: Control_Bind.discard(Control_Bind.discardUnit)(bindAppM)(Halogen_Store_Monad.updateStore(monadStoreAppM)(App_Store.LogoutUser.value))(function() {
        return App_Capability_Navigate.navigate(monadNavigateAppM)(App_Data_Route.Home.value);
      }),
      Monad0: function() {
        return monadAppM;
      }
    };
    var applicativeAppM = Halogen_Store_Monad.applicativeStoreT(Effect_Aff.applicativeAff);
    var monadUserAppM = {
      loginUser: function(username) {
        var profile = {
          username
        };
        return Control_Bind.discard(Control_Bind.discardUnit)(bindAppM)(Halogen_Store_Monad.updateStore(monadStoreAppM)(new App_Store.LoginUser(profile)))(function() {
          return Control_Applicative.pure(applicativeAppM)(new Data_Maybe.Just(profile));
        });
      },
      Monad0: function() {
        return monadAppM;
      }
    };
    exports["runAppM"] = runAppM;
    exports["monadEffectAppM"] = monadEffectAppM;
    exports["monadStoreAppM"] = monadStoreAppM;
    exports["monadNavigateAppM"] = monadNavigateAppM;
    exports["monadUserAppM"] = monadUserAppM;
    exports["monadLogAppM"] = monadLogAppM;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Capability.Log"] = $PS["App.Capability.Log"] || {};
    var exports = $PS["App.Capability.Log"];
    var Control_Monad_Trans_Class = $PS["Control.Monad.Trans.Class"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var logMessage = function(dict) {
      return dict.logMessage;
    };
    var monadLogHalogenM = function(dictMonadLog) {
      return {
        logMessage: function() {
          var $3 = Control_Monad_Trans_Class.lift(Halogen_Query_HalogenM.monadTransHalogenM)(dictMonadLog.Monad0());
          var $4 = logMessage(dictMonadLog);
          return function($5) {
            return $3($4($5));
          };
        }(),
        Monad0: function() {
          return Halogen_Query_HalogenM.monadHalogenM;
        }
      };
    };
    exports["logMessage"] = logMessage;
    exports["monadLogHalogenM"] = monadLogHalogenM;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Capability.Resource.User"] = $PS["App.Capability.Resource.User"] || {};
    var exports = $PS["App.Capability.Resource.User"];
    var Control_Monad_Trans_Class = $PS["Control.Monad.Trans.Class"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var loginUser = function(dict) {
      return dict.loginUser;
    };
    var monadUserHalogenM = function(dictMonadUser) {
      return {
        loginUser: function() {
          var $3 = Control_Monad_Trans_Class.lift(Halogen_Query_HalogenM.monadTransHalogenM)(dictMonadUser.Monad0());
          var $4 = loginUser(dictMonadUser);
          return function($5) {
            return $3($4($5));
          };
        }(),
        Monad0: function() {
          return Halogen_Query_HalogenM.monadHalogenM;
        }
      };
    };
    exports["loginUser"] = loginUser;
    exports["monadUserHalogenM"] = monadUserHalogenM;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.HTML.Elements"] = $PS["Halogen.HTML.Elements"] || {};
    var exports = $PS["Halogen.HTML.Elements"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var element = Halogen_HTML_Core.element(Data_Maybe.Nothing.value);
    var h1 = element("h1");
    var h1_ = h1([]);
    var h2 = element("h2");
    var hr = function(props) {
      return element("hr")(props)([]);
    };
    var hr_ = hr([]);
    var li = element("li");
    var li_ = li([]);
    var p = element("p");
    var p_ = p([]);
    var ul = element("ul");
    var ul_ = ul([]);
    var div = element("div");
    var div_ = div([]);
    var button = element("button");
    var a = element("a");
    exports["a"] = a;
    exports["button"] = button;
    exports["div"] = div;
    exports["div_"] = div_;
    exports["h1_"] = h1_;
    exports["h2"] = h2;
    exports["hr_"] = hr_;
    exports["li_"] = li_;
    exports["p_"] = p_;
    exports["ul_"] = ul_;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.HTML.Properties"] = $PS["Halogen.HTML.Properties"] || {};
    var exports = $PS["Halogen.HTML.Properties"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var prop = function(dictIsProp) {
      return Halogen_HTML_Core.prop(dictIsProp);
    };
    var value = prop(Halogen_HTML_Core.isPropString)("value");
    var href = prop(Halogen_HTML_Core.isPropString)("href");
    var attr = Halogen_HTML_Core.attr(Data_Maybe.Nothing.value);
    var style = attr("style");
    exports["href"] = href;
    exports["style"] = style;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Component.HTML.Util"] = $PS["App.Component.HTML.Util"] || {};
    var exports = $PS["App.Component.HTML.Util"];
    var App_Data_Route = $PS["App.Data.Route"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Semigroup = $PS["Data.Semigroup"];
    var Data_Unit = $PS["Data.Unit"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_HTML_Elements = $PS["Halogen.HTML.Elements"];
    var Halogen_HTML_Properties = $PS["Halogen.HTML.Properties"];
    var Routing_Duplex = $PS["Routing.Duplex"];
    var whenElem = function(cond) {
      return function(f) {
        if (cond) {
          return f(Data_Unit.unit);
        }
        ;
        return Halogen_HTML_Core.text("");
      };
    };
    var safeHref = function() {
      var $6 = Data_Semigroup.append(Data_Semigroup.semigroupString)("#");
      var $7 = Routing_Duplex.print(App_Data_Route.routeCodec);
      return function($8) {
        return Halogen_HTML_Properties.href($6($7($8)));
      };
    }();
    var navItem = function(route) {
      return function(label) {
        return Halogen_HTML_Elements.li_([Halogen_HTML_Elements.a([safeHref(route)])([Halogen_HTML_Core.text(label)])]);
      };
    };
    var maybeElem = function(v) {
      return function(v1) {
        if (v instanceof Data_Maybe.Just) {
          return v1(v.value0);
        }
        ;
        return Halogen_HTML_Core.text("");
      };
    };
    exports["navItem"] = navItem;
    exports["whenElem"] = whenElem;
    exports["maybeElem"] = maybeElem;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Component.HTML.Navbar"] = $PS["App.Component.HTML.Navbar"] || {};
    var exports = $PS["App.Component.HTML.Navbar"];
    var App_Component_HTML_Util = $PS["App.Component.HTML.Util"];
    var App_Data_Route = $PS["App.Data.Route"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_HTML_Elements = $PS["Halogen.HTML.Elements"];
    var Halogen_HTML_Properties = $PS["Halogen.HTML.Properties"];
    var wrapperStyle = "\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: calc(100vh - 18px)\n  ";
    var consoleStyle = "\n  min-height: 275px;\n  background: #282c34;\n  color: #e06c75;\n  font-family: 'Consolas';\n  padding: 5px 20px 5px 20px;\n  ";
    var navbarPageWrapper = function(v) {
      return function(innerHtml) {
        var navbar = Halogen_HTML_Elements.ul_([App_Component_HTML_Util.navItem(App_Data_Route.Home.value)("Home"), App_Component_HTML_Util.whenElem(Data_Maybe.isNothing(v.currentUser))(function(v1) {
          return App_Component_HTML_Util.navItem(App_Data_Route.Login.value)("Log in");
        }), App_Component_HTML_Util.whenElem(Data_Maybe.isJust(v.currentUser))(function(v1) {
          return App_Component_HTML_Util.navItem(App_Data_Route.Secrets.value)("Secrets");
        })]);
        var fakeConsole = function(messages) {
          return Halogen_HTML_Elements.div([Halogen_HTML_Properties.style(consoleStyle)])([Halogen_HTML_Elements.h2([Halogen_HTML_Properties.style("font-variant: small-caps;")])([Halogen_HTML_Core.text("Fake Console: ")]), Halogen_HTML_Elements.ul_(Data_Functor.map(Data_Functor.functorArray)(function(msg) {
            return Halogen_HTML_Elements.li_([Halogen_HTML_Core.text(msg)]);
          })(messages))]);
        };
        return Halogen_HTML_Elements.div([Halogen_HTML_Properties.style(wrapperStyle)])([Halogen_HTML_Elements.div_([navbar, innerHtml]), Halogen_HTML_Elements.div_([Halogen_HTML_Elements.hr_, fakeConsole(v.messageLog)])]);
      };
    };
    exports["navbarPageWrapper"] = navbarPageWrapper;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.HTML"] = $PS["Halogen.HTML"] || {};
    var exports = $PS["Halogen.HTML"];
    var Data_Function = $PS["Data.Function"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var slot_ = function(dictCons) {
      return function(dictIsSymbol) {
        return function(dictOrd) {
          return function(label) {
            return function(p) {
              return function(component) {
                return function(input) {
                  return Halogen_HTML_Core.widget(new Halogen_Component.ComponentSlot(Halogen_Component.componentSlot()(dictIsSymbol)(dictOrd)(label)(p)(component)(input)(Data_Function["const"](Data_Maybe.Nothing.value))));
                };
              };
            };
          };
        };
      };
    };
    var slot = function(dictCons) {
      return function(dictIsSymbol) {
        return function(dictOrd) {
          return function(label) {
            return function(p) {
              return function(component) {
                return function(input) {
                  return function(outputQuery) {
                    return Halogen_HTML_Core.widget(new Halogen_Component.ComponentSlot(Halogen_Component.componentSlot()(dictIsSymbol)(dictOrd)(label)(p)(component)(input)(function($6) {
                      return Data_Maybe.Just.create(outputQuery($6));
                    })));
                  };
                };
              };
            };
          };
        };
      };
    };
    exports["slot"] = slot;
    exports["slot_"] = slot_;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Store.Connect"] = $PS["Halogen.Store.Connect"] || {};
    var exports = $PS["Halogen.Store.Connect"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad_State_Class = $PS["Control.Monad.State.Class"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Ord = $PS["Data.Ord"];
    var Data_Unit = $PS["Data.Unit"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_HTML = $PS["Halogen.HTML"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Halogen_Store_Monad = $PS["Halogen.Store.Monad"];
    var Halogen_Subscription = $PS["Halogen.Subscription"];
    var Type_Proxy = $PS["Type.Proxy"];
    var Unsafe_Reference = $PS["Unsafe.Reference"];
    var Initialize = function() {
      function Initialize2() {
      }
      ;
      Initialize2.value = new Initialize2();
      return Initialize2;
    }();
    var Receive = function() {
      function Receive2(value0) {
        this.value0 = value0;
      }
      ;
      Receive2.create = function(value0) {
        return new Receive2(value0);
      };
      return Receive2;
    }();
    var Update = function() {
      function Update2(value0) {
        this.value0 = value0;
      }
      ;
      Update2.create = function(value0) {
        return new Update2(value0);
      };
      return Update2;
    }();
    var Raise = function() {
      function Raise2(value0) {
        this.value0 = value0;
      }
      ;
      Raise2.create = function(value0) {
        return new Raise2(value0);
      };
      return Raise2;
    }();
    var subscribe = function(dictMonadStore) {
      return function(selector) {
        return function(action) {
          return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Halogen_Store_Monad.emitSelected(Halogen_Store_Monad.monadStoreHalogenM(dictMonadStore))(selector))(function(emitter) {
            return Data_Functor["void"](Halogen_Query_HalogenM.functorHalogenM)(Halogen_Query_HalogenM.subscribe(Data_Functor.map(Halogen_Subscription.functorEmitter)(action)(emitter)));
          });
        };
      };
    };
    var connect = function(dictMonadEffect) {
      return function(dictMonadStore) {
        return function(v) {
          return function(component) {
            var renderInner = function(input) {
              return function(context) {
                return Halogen_HTML.slot()({
                  reflectSymbol: function() {
                    return "inner";
                  }
                })(Data_Ord.ordUnit)(Type_Proxy["Proxy"].value)(Data_Unit.unit)(component)({
                  input,
                  context
                })(Raise.create);
              };
            };
            var render = function(state) {
              if (state.context instanceof Data_Maybe.Just) {
                return renderInner(state.input)(state.context.value0);
              }
              ;
              return Halogen_HTML_Core.text("");
            };
            var initialState = function(input) {
              return {
                context: Data_Maybe.Nothing.value,
                initialized: false,
                input
              };
            };
            var handleAction = function(v1) {
              if (v1 instanceof Initialize) {
                return Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(subscribe(dictMonadStore)(v)(Update.create))(function() {
                  return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Data_Functor.map(Halogen_Query_HalogenM.functorHalogenM)(v.select)(Halogen_Store_Monad.getStore(Halogen_Store_Monad.monadStoreHalogenM(dictMonadStore))))(function(context) {
                    return Control_Monad_State_Class.modify_(Halogen_Query_HalogenM.monadStateHalogenM)(function(v2) {
                      var $16 = {};
                      for (var $17 in v2) {
                        if ({}.hasOwnProperty.call(v2, $17)) {
                          $16[$17] = v2[$17];
                        }
                        ;
                      }
                      ;
                      $16.context = new Data_Maybe.Just(context);
                      return $16;
                    });
                  });
                });
              }
              ;
              if (v1 instanceof Receive) {
                return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Control_Monad_State_Class.gets(Halogen_Query_HalogenM.monadStateHalogenM)(function(v2) {
                  return v2.input;
                }))(function(oldInput) {
                  return Control_Applicative.unless(Halogen_Query_HalogenM.applicativeHalogenM)(Unsafe_Reference.unsafeRefEq(oldInput)(v1.value0))(Control_Monad_State_Class.modify_(Halogen_Query_HalogenM.monadStateHalogenM)(function(v2) {
                    var $19 = {};
                    for (var $20 in v2) {
                      if ({}.hasOwnProperty.call(v2, $20)) {
                        $19[$20] = v2[$20];
                      }
                      ;
                    }
                    ;
                    $19.input = v1.value0;
                    return $19;
                  }));
                });
              }
              ;
              if (v1 instanceof Update) {
                return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Control_Monad_State_Class.gets(Halogen_Query_HalogenM.monadStateHalogenM)(function(v2) {
                  return v2.context;
                }))(function(v2) {
                  if (v2 instanceof Data_Maybe.Just && Unsafe_Reference.unsafeRefEq(v2.value0)(v1.value0)) {
                    return Control_Applicative.pure(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Unit.unit);
                  }
                  ;
                  return Control_Monad_State_Class.modify_(Halogen_Query_HalogenM.monadStateHalogenM)(function(v3) {
                    var $25 = {};
                    for (var $26 in v3) {
                      if ({}.hasOwnProperty.call(v3, $26)) {
                        $25[$26] = v3[$26];
                      }
                      ;
                    }
                    ;
                    $25.context = new Data_Maybe.Just(v1.value0);
                    return $25;
                  });
                });
              }
              ;
              if (v1 instanceof Raise) {
                return Halogen_Query_HalogenM.raise(v1.value0);
              }
              ;
              throw new Error("Failed pattern match at Halogen.Store.Connect (line 74, column 18 - line 91, column 21): " + [v1.constructor.name]);
            };
            return Halogen_Component.mkComponent({
              initialState,
              render,
              "eval": Halogen_Component.mkEval({
                handleAction,
                handleQuery: Halogen_Query_HalogenM.query()({
                  reflectSymbol: function() {
                    return "inner";
                  }
                })(Data_Ord.ordUnit)(Type_Proxy["Proxy"].value)(Data_Unit.unit),
                initialize: new Data_Maybe.Just(Initialize.value),
                finalize: Data_Maybe.Nothing.value,
                receive: function($30) {
                  return Data_Maybe.Just.create(Receive.create($30));
                }
              })
            });
          };
        };
      };
    };
    exports["connect"] = connect;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Store.Select"] = $PS["Halogen.Store.Select"] || {};
    var exports = $PS["Halogen.Store.Select"];
    var Data_Eq = $PS["Data.Eq"];
    var Selector = function(x) {
      return x;
    };
    var selectEq = function(dictEq) {
      return function($3) {
        return Selector(function(v) {
          return {
            eq: Data_Eq.eq(dictEq),
            select: v
          };
        }($3));
      };
    };
    exports["selectEq"] = selectEq;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Page.Home"] = $PS["App.Page.Home"] || {};
    var exports = $PS["App.Page.Home"];
    var App_Data_Username = $PS["App.Data.Username"];
    var App_Store = $PS["App.Store"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_HTML_Elements = $PS["Halogen.HTML.Elements"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Halogen_Store_Connect = $PS["Halogen.Store.Connect"];
    var Halogen_Store_Select = $PS["Halogen.Store.Select"];
    var Receive = function() {
      function Receive2(value0) {
        this.value0 = value0;
      }
      ;
      Receive2.create = function(value0) {
        return new Receive2(value0);
      };
      return Receive2;
    }();
    var component = function(dictMonadEffect) {
      return function(dictMonadStore) {
        var render = function(v) {
          var message = function() {
            if (v.currentUser instanceof Data_Maybe.Nothing) {
              return "Welcome, guest. Perhaps consider logging in?";
            }
            ;
            if (v.currentUser instanceof Data_Maybe.Just) {
              return "WELCOME HOME, " + (App_Data_Username.toString(v.currentUser.value0.username) + "!! Your secrets page is now available.");
            }
            ;
            throw new Error("Failed pattern match at App.Page.Home (line 58, column 17 - line 62, column 109): " + [v.currentUser.constructor.name]);
          }();
          return Halogen_HTML_Elements.div_([Halogen_HTML_Elements.h1_([Halogen_HTML_Core.text("Home page")]), Halogen_HTML_Elements.p_([Halogen_HTML_Core.text(message)])]);
        };
        var initialState = function(v) {
          return {
            currentUser: v.context
          };
        };
        var handleAction = function(v) {
          return App_Store.updateLocalState(Halogen_Query_HalogenM.monadStateHalogenM)(v.value0);
        };
        var $$eval = Halogen_Component.mkEval({
          handleAction,
          handleQuery: Halogen_Component.defaultEval.handleQuery,
          receive: function($15) {
            return Data_Maybe.Just.create(Receive.create($15));
          },
          initialize: Halogen_Component.defaultEval.initialize,
          finalize: Halogen_Component.defaultEval.finalize
        });
        return Halogen_Store_Connect.connect(dictMonadEffect)(dictMonadStore)(Halogen_Store_Select.selectEq(Data_Maybe.eqMaybe(Data_Eq.eqRec()(Data_Eq.eqRowCons(Data_Eq.eqRowNil)()({
          reflectSymbol: function() {
            return "username";
          }
        })(App_Data_Username.eqUsername))))(function(v) {
          return v.currentUser;
        }))(Halogen_Component.mkComponent({
          initialState,
          render,
          "eval": $$eval
        }));
      };
    };
    exports["component"] = component;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Web.UIEvent.MouseEvent.EventTypes"] = $PS["Web.UIEvent.MouseEvent.EventTypes"] || {};
    var exports = $PS["Web.UIEvent.MouseEvent.EventTypes"];
    var click = "click";
    exports["click"] = click;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.HTML.Events"] = $PS["Halogen.HTML.Events"] || {};
    var exports = $PS["Halogen.HTML.Events"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_Query_Input = $PS["Halogen.Query.Input"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var Web_UIEvent_MouseEvent_EventTypes = $PS["Web.UIEvent.MouseEvent.EventTypes"];
    var mouseHandler = Unsafe_Coerce.unsafeCoerce;
    var handler = function(et) {
      return function(f) {
        return Halogen_HTML_Core.handler(et)(function(ev) {
          return new Data_Maybe.Just(new Halogen_Query_Input.Action(f(ev)));
        });
      };
    };
    var onClick = function() {
      var $1 = handler(Web_UIEvent_MouseEvent_EventTypes.click);
      return function($2) {
        return $1(mouseHandler($2));
      };
    }();
    exports["onClick"] = onClick;
  })(PS);
  (function(exports) {
    "use strict";
    exports.preventDefault = function(e) {
      return function() {
        return e.preventDefault();
      };
    };
  })(PS["Web.Event.Event"] = PS["Web.Event.Event"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.Event.Event"] = $PS["Web.Event.Event"] || {};
    var exports = $PS["Web.Event.Event"];
    var $foreign = $PS["Web.Event.Event"];
    exports["preventDefault"] = $foreign.preventDefault;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Web.UIEvent.MouseEvent"] = $PS["Web.UIEvent.MouseEvent"] || {};
    var exports = $PS["Web.UIEvent.MouseEvent"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var toEvent = Unsafe_Coerce.unsafeCoerce;
    exports["toEvent"] = toEvent;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Page.Login"] = $PS["App.Page.Login"] || {};
    var exports = $PS["App.Page.Login"];
    var App_Capability_Log = $PS["App.Capability.Log"];
    var App_Capability_Navigate = $PS["App.Capability.Navigate"];
    var App_Capability_Resource_User = $PS["App.Capability.Resource.User"];
    var App_Data_Route = $PS["App.Data.Route"];
    var App_Data_Username = $PS["App.Data.Username"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Category = $PS["Control.Category"];
    var Control_Monad_State_Class = $PS["Control.Monad.State.Class"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect_Class = $PS["Effect.Class"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_HTML_Elements = $PS["Halogen.HTML.Elements"];
    var Halogen_HTML_Events = $PS["Halogen.HTML.Events"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Web_Event_Event = $PS["Web.Event.Event"];
    var Web_UIEvent_MouseEvent = $PS["Web.UIEvent.MouseEvent"];
    var HandleLogin = function() {
      function HandleLogin2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      HandleLogin2.create = function(value0) {
        return function(value1) {
          return new HandleLogin2(value0, value1);
        };
      };
      return HandleLogin2;
    }();
    var component = function(dictMonadEffect) {
      return function(dictMonadLog) {
        return function(dictMonadNavigate) {
          return function(dictMonadUser) {
            var render = function(v) {
              return Halogen_HTML_Elements.div_([Halogen_HTML_Elements.h1_([Halogen_HTML_Core.text("Sign in")]), Halogen_HTML_Elements.p_([Halogen_HTML_Core.text("Please only click the button below if you are actually 'bloodninja'")]), Halogen_HTML_Elements.button([Halogen_HTML_Events.onClick(function(mouseEvent) {
                return new HandleLogin(mouseEvent, "bloodninja");
              })])([Halogen_HTML_Core.text("Sign in as user 'bloodninja'")])]);
            };
            var initialState = Control_Category.identity(Control_Category.categoryFn);
            var handleAction = function(v) {
              return Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(Effect_Class.liftEffect(Halogen_Query_HalogenM.monadEffectHalogenM(dictMonadEffect))(Web_Event_Event.preventDefault(Web_UIEvent_MouseEvent.toEvent(v.value0))))(function() {
                var v1 = App_Data_Username.parse(v.value1);
                if (v1 instanceof Data_Maybe.Nothing) {
                  return Control_Applicative.pure(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Unit.unit);
                }
                ;
                if (v1 instanceof Data_Maybe.Just) {
                  return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(App_Capability_Resource_User.loginUser(App_Capability_Resource_User.monadUserHalogenM(dictMonadUser))(v1.value0))(function() {
                    return Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(App_Capability_Log.logMessage(App_Capability_Log.monadLogHalogenM(dictMonadLog))("Signing in as user '" + (App_Data_Username.toString(v1.value0) + "'")))(function() {
                      return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Control_Monad_State_Class.gets(Halogen_Query_HalogenM.monadStateHalogenM)(function(v2) {
                        return v2.redirect;
                      }))(function(shouldRedirect) {
                        return Control_Applicative.when(Halogen_Query_HalogenM.applicativeHalogenM)(shouldRedirect)(App_Capability_Navigate.navigate(App_Capability_Navigate.monadNavigateHalogenM(dictMonadNavigate))(App_Data_Route.Home.value));
                      });
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at App.Page.Login (line 72, column 9 - line 79, column 37): " + [v1.constructor.name]);
              });
            };
            var $$eval = Halogen_Component.mkEval({
              handleAction,
              handleQuery: Halogen_Component.defaultEval.handleQuery,
              receive: Halogen_Component.defaultEval.receive,
              initialize: Halogen_Component.defaultEval.initialize,
              finalize: Halogen_Component.defaultEval.finalize
            });
            return Halogen_Component.mkComponent({
              initialState,
              render,
              "eval": $$eval
            });
          };
        };
      };
    };
    exports["component"] = component;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Page.Secrets"] = $PS["App.Page.Secrets"] || {};
    var exports = $PS["App.Page.Secrets"];
    var App_Capability_Log = $PS["App.Capability.Log"];
    var App_Capability_Navigate = $PS["App.Capability.Navigate"];
    var App_Component_HTML_Util = $PS["App.Component.HTML.Util"];
    var App_Data_Username = $PS["App.Data.Username"];
    var App_Store = $PS["App.Store"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad_State_Class = $PS["Control.Monad.State.Class"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect_Class = $PS["Effect.Class"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_HTML_Elements = $PS["Halogen.HTML.Elements"];
    var Halogen_HTML_Events = $PS["Halogen.HTML.Events"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Halogen_Store_Connect = $PS["Halogen.Store.Connect"];
    var Halogen_Store_Select = $PS["Halogen.Store.Select"];
    var Web_Event_Event = $PS["Web.Event.Event"];
    var Web_UIEvent_MouseEvent = $PS["Web.UIEvent.MouseEvent"];
    var Initialize = function() {
      function Initialize2() {
      }
      ;
      Initialize2.value = new Initialize2();
      return Initialize2;
    }();
    var Receive = function() {
      function Receive2(value0) {
        this.value0 = value0;
      }
      ;
      Receive2.create = function(value0) {
        return new Receive2(value0);
      };
      return Receive2;
    }();
    var HandleLogout = function() {
      function HandleLogout2(value0) {
        this.value0 = value0;
      }
      ;
      HandleLogout2.create = function(value0) {
        return new HandleLogout2(value0);
      };
      return HandleLogout2;
    }();
    var component = function(dictMonadStore) {
      return function(dictMonadLog) {
        return function(dictMonadNavigate) {
          return function(dictMonadUser) {
            var render = function(v) {
              return App_Component_HTML_Util.maybeElem(v.currentUser)(function(profile) {
                var name = App_Data_Username.toString(profile.username);
                return Halogen_HTML_Elements.div_([Halogen_HTML_Elements.h1_([Halogen_HTML_Core.text(name + "'s page of secrets")]), Halogen_HTML_Elements.p_([Halogen_HTML_Core.text("Hello, " + (name + ".\n"))]), Halogen_HTML_Elements.p_([Halogen_HTML_Core.text("Your Secret: `traverse`")]), Halogen_HTML_Elements.button([Halogen_HTML_Events.onClick(function(mouseEvent) {
                  return new HandleLogout(mouseEvent);
                })])([Halogen_HTML_Core.text("Sign out")])]);
              });
            };
            var initialState = function(v) {
              return {
                currentUser: v.context
              };
            };
            var handleAction = function(v) {
              if (v instanceof Initialize) {
                return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Control_Monad_State_Class.gets(Halogen_Query_HalogenM.monadStateHalogenM)(function(v1) {
                  return v1.currentUser;
                }))(function(v1) {
                  if (v1 instanceof Data_Maybe.Nothing) {
                    return App_Capability_Navigate.logoutUser(App_Capability_Navigate.monadNavigateHalogenM(dictMonadNavigate));
                  }
                  ;
                  if (v1 instanceof Data_Maybe.Just) {
                    return Control_Applicative.pure(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Unit.unit);
                  }
                  ;
                  throw new Error("Failed pattern match at App.Page.Secrets (line 84, column 34 - line 89, column 31): " + [v1.constructor.name]);
                });
              }
              ;
              if (v instanceof Receive) {
                return App_Store.updateLocalState(Halogen_Query_HalogenM.monadStateHalogenM)(v.value0);
              }
              ;
              if (v instanceof HandleLogout) {
                return Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(Effect_Class.liftEffect(Halogen_Query_HalogenM.monadEffectHalogenM(dictMonadStore.MonadEffect0()))(Web_Event_Event.preventDefault(Web_UIEvent_MouseEvent.toEvent(v.value0))))(function() {
                  return Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(App_Capability_Log.logMessage(App_Capability_Log.monadLogHalogenM(dictMonadLog))("Signing out"))(function() {
                    return App_Capability_Navigate.logoutUser(App_Capability_Navigate.monadNavigateHalogenM(dictMonadNavigate));
                  });
                });
              }
              ;
              throw new Error("Failed pattern match at App.Page.Secrets (line 82, column 20 - line 97, column 28): " + [v.constructor.name]);
            };
            var $$eval = Halogen_Component.mkEval({
              handleAction,
              handleQuery: Halogen_Component.defaultEval.handleQuery,
              receive: function($20) {
                return Data_Maybe.Just.create(Receive.create($20));
              },
              initialize: new Data_Maybe.Just(Initialize.value),
              finalize: Halogen_Component.defaultEval.finalize
            });
            return Halogen_Store_Connect.connect(dictMonadStore.MonadEffect0())(dictMonadStore)(Halogen_Store_Select.selectEq(Data_Maybe.eqMaybe(Data_Eq.eqRec()(Data_Eq.eqRowCons(Data_Eq.eqRowNil)()({
              reflectSymbol: function() {
                return "username";
              }
            })(App_Data_Username.eqUsername))))(function(v) {
              return v.currentUser;
            }))(Halogen_Component.mkComponent({
              initialState,
              render,
              "eval": $$eval
            }));
          };
        };
      };
    };
    exports["component"] = component;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["App.Component.Router"] = $PS["App.Component.Router"] || {};
    var exports = $PS["App.Component.Router"];
    var App_Capability_Log = $PS["App.Capability.Log"];
    var App_Capability_Navigate = $PS["App.Capability.Navigate"];
    var App_Component_HTML_Navbar = $PS["App.Component.HTML.Navbar"];
    var App_Data_Route = $PS["App.Data.Route"];
    var App_Data_Username = $PS["App.Data.Username"];
    var App_Page_Home = $PS["App.Page.Home"];
    var App_Page_Login = $PS["App.Page.Login"];
    var App_Page_Secrets = $PS["App.Page.Secrets"];
    var App_Store = $PS["App.Store"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad_State_Class = $PS["Control.Monad.State.Class"];
    var Data_Either = $PS["Data.Either"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Ord = $PS["Data.Ord"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect_Class = $PS["Effect.Class"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_HTML = $PS["Halogen.HTML"];
    var Halogen_HTML_Core = $PS["Halogen.HTML.Core"];
    var Halogen_HTML_Elements = $PS["Halogen.HTML.Elements"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Halogen_Store_Connect = $PS["Halogen.Store.Connect"];
    var Halogen_Store_Monad = $PS["Halogen.Store.Monad"];
    var Halogen_Store_Select = $PS["Halogen.Store.Select"];
    var Halogen_Subscription = $PS["Halogen.Subscription"];
    var Routing_Duplex = $PS["Routing.Duplex"];
    var Routing_Hash = $PS["Routing.Hash"];
    var Type_Proxy = $PS["Type.Proxy"];
    var Navigate = function() {
      function Navigate2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
      }
      ;
      Navigate2.create = function(value0) {
        return function(value1) {
          return new Navigate2(value0, value1);
        };
      };
      return Navigate2;
    }();
    var Initialize = function() {
      function Initialize2() {
      }
      ;
      Initialize2.value = new Initialize2();
      return Initialize2;
    }();
    var Receive = function() {
      function Receive2(value0) {
        this.value0 = value0;
      }
      ;
      Receive2.create = function(value0) {
        return new Receive2(value0);
      };
      return Receive2;
    }();
    var UpdateMessageLog = function() {
      function UpdateMessageLog2(value0) {
        this.value0 = value0;
      }
      ;
      UpdateMessageLog2.create = function(value0) {
        return new UpdateMessageLog2(value0);
      };
      return UpdateMessageLog2;
    }();
    var component = function(dictMonadEffect) {
      return function(dictMonadLog) {
        return function(dictMonadNavigate) {
          return function(dictMonadUser) {
            return function(dictMonadStore) {
              var render = function(v) {
                var authorize = function(mbProfile) {
                  return function(html) {
                    if (mbProfile instanceof Data_Maybe.Nothing) {
                      return Halogen_HTML.slot_()({
                        reflectSymbol: function() {
                          return "login";
                        }
                      })(Data_Ord.ordUnit)(Type_Proxy["Proxy"].value)(Data_Unit.unit)(App_Page_Login.component(dictMonadEffect)(dictMonadLog)(dictMonadNavigate)(dictMonadUser))({
                        redirect: false
                      });
                    }
                    ;
                    if (mbProfile instanceof Data_Maybe.Just) {
                      return html;
                    }
                    ;
                    throw new Error("Failed pattern match at App.Component.Router (line 154, column 36 - line 158, column 17): " + [mbProfile.constructor.name]);
                  };
                };
                return App_Component_HTML_Navbar.navbarPageWrapper(v)(function() {
                  if (v.route instanceof Data_Maybe.Nothing) {
                    return Halogen_HTML_Elements.h1_([Halogen_HTML_Core.text("Oh no! That page wasn't found")]);
                  }
                  ;
                  if (v.route instanceof Data_Maybe.Just && v.route.value0 instanceof App_Data_Route.Home) {
                    return Halogen_HTML.slot_()({
                      reflectSymbol: function() {
                        return "home";
                      }
                    })(Data_Ord.ordUnit)(Type_Proxy["Proxy"].value)(Data_Unit.unit)(App_Page_Home.component(dictMonadEffect)(dictMonadStore))(Data_Unit.unit);
                  }
                  ;
                  if (v.route instanceof Data_Maybe.Just && v.route.value0 instanceof App_Data_Route.Login) {
                    return Halogen_HTML.slot_()({
                      reflectSymbol: function() {
                        return "login";
                      }
                    })(Data_Ord.ordUnit)(Type_Proxy["Proxy"].value)(Data_Unit.unit)(App_Page_Login.component(dictMonadEffect)(dictMonadLog)(dictMonadNavigate)(dictMonadUser))({
                      redirect: true
                    });
                  }
                  ;
                  if (v.route instanceof Data_Maybe.Just && v.route.value0 instanceof App_Data_Route.Secrets) {
                    return authorize(v.currentUser)(Halogen_HTML.slot_()({
                      reflectSymbol: function() {
                        return "secrets";
                      }
                    })(Data_Ord.ordUnit)(Type_Proxy["Proxy"].value)(Data_Unit.unit)(App_Page_Secrets.component(dictMonadStore)(dictMonadLog)(dictMonadNavigate)(dictMonadUser))(Data_Unit.unit));
                  }
                  ;
                  throw new Error("Failed pattern match at App.Component.Router (line 136, column 33 - line 147, column 72): " + [v.route.constructor.name]);
                }());
              };
              var initialState = function(v) {
                return {
                  route: Data_Maybe.Nothing.value,
                  messageLog: [],
                  currentUser: v.context
                };
              };
              var handleQuery = function() {
                var displayRouteChange = function(v) {
                  return function(v1) {
                    if (v instanceof Data_Maybe.Nothing) {
                      return "Setting initial route to /#" + Routing_Duplex.print(App_Data_Route.routeCodec)(v1);
                    }
                    ;
                    if (v instanceof Data_Maybe.Just) {
                      return "Changing route from /#" + (Routing_Duplex.print(App_Data_Route.routeCodec)(v.value0) + (" to /#" + Routing_Duplex.print(App_Data_Route.routeCodec)(v1)));
                    }
                    ;
                    throw new Error("Failed pattern match at App.Component.Router (line 126, column 30 - line 131, column 51): " + [v.constructor.name, v1.constructor.name]);
                  };
                };
                return function(v) {
                  return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Control_Monad_State_Class.gets(Halogen_Query_HalogenM.monadStateHalogenM)(function(v1) {
                    return v1.route;
                  }))(function(maybeOldRoute) {
                    return Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(Control_Applicative.when(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Eq.notEq(Data_Maybe.eqMaybe(App_Data_Route.eqRoute))(maybeOldRoute)(new Data_Maybe.Just(v.value0)))(Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(Control_Monad_State_Class.modify_(Halogen_Query_HalogenM.monadStateHalogenM)(function(v1) {
                      var $33 = {};
                      for (var $34 in v1) {
                        if ({}.hasOwnProperty.call(v1, $34)) {
                          $33[$34] = v1[$34];
                        }
                        ;
                      }
                      ;
                      $33.route = new Data_Maybe.Just(v.value0);
                      return $33;
                    }))(function() {
                      return App_Capability_Log.logMessage(App_Capability_Log.monadLogHalogenM(dictMonadLog))(displayRouteChange(maybeOldRoute)(v.value0));
                    })))(function() {
                      return Control_Applicative.pure(Halogen_Query_HalogenM.applicativeHalogenM)(new Data_Maybe.Just(v.value1));
                    });
                  });
                };
              }();
              var handleAction = function(v) {
                if (v instanceof Initialize) {
                  return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Halogen_Store_Monad.emitSelected(Halogen_Store_Monad.monadStoreHalogenM(dictMonadStore))(Halogen_Store_Select.selectEq(Data_Eq.eqArray(Data_Eq.eqString))(function(v1) {
                    return v1.recentMessageLog;
                  })))(function(newLogEmitter) {
                    return Control_Bind.discard(Control_Bind.discardUnit)(Halogen_Query_HalogenM.bindHalogenM)(Data_Functor["void"](Halogen_Query_HalogenM.functorHalogenM)(Halogen_Query_HalogenM.subscribe(Data_Functor.map(Halogen_Subscription.functorEmitter)(UpdateMessageLog.create)(newLogEmitter))))(function() {
                      return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Data_Functor.map(Halogen_Query_HalogenM.functorHalogenM)(function() {
                        var $44 = Routing_Duplex.parse(App_Data_Route.routeCodec);
                        return function($45) {
                          return Data_Either.hush($44($45));
                        };
                      }())(Effect_Class.liftEffect(Halogen_Query_HalogenM.monadEffectHalogenM(dictMonadEffect))(Routing_Hash.getHash)))(function(initialRoute) {
                        return App_Capability_Navigate.navigate(App_Capability_Navigate.monadNavigateHalogenM(dictMonadNavigate))(Data_Maybe.fromMaybe(App_Data_Route.Home.value)(initialRoute));
                      });
                    });
                  });
                }
                ;
                if (v instanceof Receive) {
                  return App_Store.updateLocalState(Halogen_Query_HalogenM.monadStateHalogenM)(v.value0);
                }
                ;
                if (v instanceof UpdateMessageLog) {
                  return Control_Bind.bind(Halogen_Query_HalogenM.bindHalogenM)(Control_Monad_State_Class.gets(Halogen_Query_HalogenM.monadStateHalogenM)(function(v1) {
                    return v1.messageLog;
                  }))(function(currentLog) {
                    return Control_Applicative.when(Halogen_Query_HalogenM.applicativeHalogenM)(Data_Eq.notEq(Data_Eq.eqArray(Data_Eq.eqString))(v.value0)(currentLog))(Control_Monad_State_Class.modify_(Halogen_Query_HalogenM.monadStateHalogenM)(function(v1) {
                      var $40 = {};
                      for (var $41 in v1) {
                        if ({}.hasOwnProperty.call(v1, $41)) {
                          $40[$41] = v1[$41];
                        }
                        ;
                      }
                      ;
                      $40.messageLog = v.value0;
                      return $40;
                    }));
                  });
                }
                ;
                throw new Error("Failed pattern match at App.Component.Router (line 85, column 20 - line 106, column 46): " + [v.constructor.name]);
              };
              var $$eval = Halogen_Component.mkEval({
                handleAction,
                handleQuery,
                receive: function($46) {
                  return Data_Maybe.Just.create(Receive.create($46));
                },
                initialize: new Data_Maybe.Just(Initialize.value),
                finalize: Halogen_Component.defaultEval.finalize
              });
              return Halogen_Store_Connect.connect(dictMonadEffect)(dictMonadStore)(Halogen_Store_Select.selectEq(Data_Maybe.eqMaybe(Data_Eq.eqRec()(Data_Eq.eqRowCons(Data_Eq.eqRowNil)()({
                reflectSymbol: function() {
                  return "username";
                }
              })(App_Data_Username.eqUsername))))(function(v) {
                return v.currentUser;
              }))(Halogen_Component.mkComponent({
                initialState,
                render,
                "eval": $$eval
              }));
            };
          };
        };
      };
    };
    exports["Navigate"] = Navigate;
    exports["component"] = component;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Monad.Fork.Class"] = $PS["Control.Monad.Fork.Class"] || {};
    var exports = $PS["Control.Monad.Fork.Class"];
    var Effect_Aff = $PS["Effect.Aff"];
    var monadForkAff = {
      suspend: Effect_Aff.suspendAff,
      fork: Effect_Aff.forkAff,
      join: Effect_Aff.joinFiber,
      Monad0: function() {
        return Effect_Aff.monadAff;
      },
      Functor1: function() {
        return Effect_Aff.functorFiber;
      }
    };
    var fork = function(dict) {
      return dict.fork;
    };
    exports["fork"] = fork;
    exports["monadForkAff"] = monadForkAff;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Control.Parallel"] = $PS["Control.Parallel"] || {};
    var exports = $PS["Control.Parallel"];
    var Control_Category = $PS["Control.Category"];
    var Control_Parallel_Class = $PS["Control.Parallel.Class"];
    var Data_Foldable = $PS["Data.Foldable"];
    var parTraverse_ = function(dictParallel) {
      return function(dictFoldable) {
        return function(f) {
          var $17 = Control_Parallel_Class.sequential(dictParallel);
          var $18 = Data_Foldable.traverse_(dictParallel.Applicative1())(dictFoldable)(function() {
            var $20 = Control_Parallel_Class.parallel(dictParallel);
            return function($21) {
              return $20(f($21));
            };
          }());
          return function($19) {
            return $17($18($19));
          };
        };
      };
    };
    var parSequence_ = function(dictParallel) {
      return function(dictFoldable) {
        return parTraverse_(dictParallel)(dictFoldable)(Control_Category.identity(Control_Category.categoryFn));
      };
    };
    exports["parSequence_"] = parSequence_;
  })(PS);
  (function(exports) {
    "use strict";
    exports.warn = function(s) {
      return function() {
        console.warn(s);
      };
    };
  })(PS["Effect.Console"] = PS["Effect.Console"] || {});
  (function($PS) {
    "use strict";
    $PS["Effect.Console"] = $PS["Effect.Console"] || {};
    var exports = $PS["Effect.Console"];
    var $foreign = $PS["Effect.Console"];
    exports["warn"] = $foreign.warn;
  })(PS);
  (function(exports) {
    "use strict";
    exports.error = function(msg) {
      return new Error(msg);
    };
    exports.throwException = function(e) {
      return function() {
        throw e;
      };
    };
  })(PS["Effect.Exception"] = PS["Effect.Exception"] || {});
  (function($PS) {
    "use strict";
    $PS["Effect.Exception"] = $PS["Effect.Exception"] || {};
    var exports = $PS["Effect.Exception"];
    var $foreign = $PS["Effect.Exception"];
    var $$throw = function($2) {
      return $foreign.throwException($foreign.error($2));
    };
    exports["throw"] = $$throw;
    exports["error"] = $foreign.error;
    exports["throwException"] = $foreign.throwException;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Aff.Driver.State"] = $PS["Halogen.Aff.Driver.State"] || {};
    var exports = $PS["Halogen.Aff.Driver.State"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_Map_Internal = $PS["Data.Map.Internal"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Halogen_Data_Slot = $PS["Halogen.Data.Slot"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var unRenderStateX = Unsafe_Coerce.unsafeCoerce;
    var unDriverStateX = Unsafe_Coerce.unsafeCoerce;
    var renderStateX_ = function(dictApplicative) {
      return function(f) {
        return unDriverStateX(function(st) {
          return Data_Foldable.traverse_(dictApplicative)(Data_Foldable.foldableMaybe)(f)(st.rendering);
        });
      };
    };
    var mkRenderStateX = Unsafe_Coerce.unsafeCoerce;
    var renderStateX = function(dictFunctor) {
      return function(f) {
        return unDriverStateX(function(st) {
          return mkRenderStateX(f(st.rendering));
        });
      };
    };
    var mkDriverStateXRef = Unsafe_Coerce.unsafeCoerce;
    var mapDriverState = function(f) {
      return function(v) {
        return f(v);
      };
    };
    var initDriverState = function(component) {
      return function(input) {
        return function(handler) {
          return function(lchs) {
            return function __do() {
              var selfRef = Effect_Ref["new"]({})();
              var childrenIn = Effect_Ref["new"](Halogen_Data_Slot.empty)();
              var childrenOut = Effect_Ref["new"](Halogen_Data_Slot.empty)();
              var handlerRef = Effect_Ref["new"](handler)();
              var pendingQueries = Effect_Ref["new"](new Data_Maybe.Just(Data_List_Types.Nil.value))();
              var pendingOuts = Effect_Ref["new"](new Data_Maybe.Just(Data_List_Types.Nil.value))();
              var pendingHandlers = Effect_Ref["new"](Data_Maybe.Nothing.value)();
              var fresh = Effect_Ref["new"](1)();
              var subscriptions = Effect_Ref["new"](new Data_Maybe.Just(Data_Map_Internal.empty))();
              var forks = Effect_Ref["new"](Data_Map_Internal.empty)();
              var ds = {
                component,
                state: component.initialState(input),
                refs: Data_Map_Internal.empty,
                children: Halogen_Data_Slot.empty,
                childrenIn,
                childrenOut,
                selfRef,
                handlerRef,
                pendingQueries,
                pendingOuts,
                pendingHandlers,
                rendering: Data_Maybe.Nothing.value,
                fresh,
                subscriptions,
                forks,
                lifecycleHandlers: lchs
              };
              Effect_Ref.write(ds)(selfRef)();
              return mkDriverStateXRef(selfRef);
            };
          };
        };
      };
    };
    exports["mapDriverState"] = mapDriverState;
    exports["unDriverStateX"] = unDriverStateX;
    exports["renderStateX"] = renderStateX;
    exports["renderStateX_"] = renderStateX_;
    exports["unRenderStateX"] = unRenderStateX;
    exports["initDriverState"] = initDriverState;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Aff.Driver.Eval"] = $PS["Halogen.Aff.Driver.Eval"] || {};
    var exports = $PS["Halogen.Aff.Driver.Eval"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Applicative_Free = $PS["Control.Applicative.Free"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad = $PS["Control.Monad"];
    var Control_Monad_Fork_Class = $PS["Control.Monad.Fork.Class"];
    var Control_Monad_Free = $PS["Control.Monad.Free"];
    var Control_Parallel = $PS["Control.Parallel"];
    var Control_Parallel_Class = $PS["Control.Parallel.Class"];
    var Data_Boolean = $PS["Data.Boolean"];
    var Data_Coyoneda = $PS["Data.Coyoneda"];
    var Data_Either = $PS["Data.Either"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_Map_Internal = $PS["Data.Map.Internal"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Ord = $PS["Data.Ord"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect = $PS["Effect"];
    var Effect_Aff = $PS["Effect.Aff"];
    var Effect_Class = $PS["Effect.Class"];
    var Effect_Exception = $PS["Effect.Exception"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Halogen_Aff_Driver_State = $PS["Halogen.Aff.Driver.State"];
    var Halogen_Query_ChildQuery = $PS["Halogen.Query.ChildQuery"];
    var Halogen_Query_HalogenM = $PS["Halogen.Query.HalogenM"];
    var Halogen_Query_HalogenQ = $PS["Halogen.Query.HalogenQ"];
    var Halogen_Query_Input = $PS["Halogen.Query.Input"];
    var Halogen_Subscription = $PS["Halogen.Subscription"];
    var Unsafe_Reference = $PS["Unsafe.Reference"];
    var unsubscribe = function(sid) {
      return function(ref) {
        return function __do() {
          var v = Effect_Ref.read(ref)();
          var subs = Effect_Ref.read(v.subscriptions)();
          return Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableMaybe)(Halogen_Subscription.unsubscribe)(Control_Bind.bindFlipped(Data_Maybe.bindMaybe)(Data_Map_Internal.lookup(Halogen_Query_HalogenM.ordSubscriptionId)(sid))(subs))();
        };
      };
    };
    var queueOrRun = function(ref) {
      return function(au) {
        return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v) {
          if (v instanceof Data_Maybe.Nothing) {
            return au;
          }
          ;
          if (v instanceof Data_Maybe.Just) {
            return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.write(new Data_Maybe.Just(new Data_List_Types.Cons(au, v.value0)))(ref));
          }
          ;
          throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 182, column 33 - line 184, column 57): " + [v.constructor.name]);
        });
      };
    };
    var handleLifecycle = function(lchs) {
      return function(f) {
        return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.write({
          initializers: Data_List_Types.Nil.value,
          finalizers: Data_List_Types.Nil.value
        })(lchs)))(function() {
          return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(f))(function(result) {
            return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(lchs)))(function(v) {
              return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Data_Foldable.traverse_(Effect_Aff.applicativeAff)(Data_List_Types.foldableList)(Control_Monad_Fork_Class.fork(Control_Monad_Fork_Class.monadForkAff))(v.finalizers))(function() {
                return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Control_Parallel.parSequence_(Effect_Aff.parallelAff)(Data_List_Types.foldableList)(v.initializers))(function() {
                  return Control_Applicative.pure(Effect_Aff.applicativeAff)(result);
                });
              });
            });
          });
        });
      };
    };
    var handleAff = Effect_Aff.runAff_(Data_Either.either(Effect_Exception.throwException)(Data_Function["const"](Control_Applicative.pure(Effect.applicativeEffect)(Data_Unit.unit))));
    var fresh = function(f) {
      return function(ref) {
        return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v) {
          return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref["modify'"](function(i) {
            return {
              state: i + 1 | 0,
              value: f(i)
            };
          })(v.fresh));
        });
      };
    };
    var evalQ = function(render) {
      return function(ref) {
        return function(q) {
          return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v) {
            return evalM(render)(ref)(v["component"]["eval"](new Halogen_Query_HalogenQ.Query(Data_Functor.map(Data_Coyoneda.functorCoyoneda)(Data_Maybe.Just.create)(Data_Coyoneda.liftCoyoneda(q)), Data_Function["const"](Data_Maybe.Nothing.value))));
          });
        };
      };
    };
    var evalM = function(render) {
      return function(initRef) {
        return function(v) {
          var evalChildQuery = function(ref) {
            return function(cqb) {
              return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v1) {
                return Halogen_Query_ChildQuery.unChildQueryBox(function(v2) {
                  var evalChild = function(v3) {
                    return Control_Parallel_Class.parallel(Effect_Aff.parallelAff)(Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(v3)))(function(dsx) {
                      return Halogen_Aff_Driver_State.unDriverStateX(function(ds) {
                        return evalQ(render)(ds.selfRef)(v2.value1);
                      })(dsx);
                    }));
                  };
                  return Data_Functor.map(Effect_Aff.functorAff)(v2.value2)(Control_Parallel_Class.sequential(Effect_Aff.parallelAff)(v2.value0(Effect_Aff.applicativeParAff)(evalChild)(v1.children)));
                })(cqb);
              });
            };
          };
          var go = function(ref) {
            return function(v1) {
              if (v1 instanceof Halogen_Query_HalogenM.State) {
                return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v2) {
                  var v3 = v1.value0(v2.state);
                  if (Unsafe_Reference.unsafeRefEq(v2.state)(v3.value1)) {
                    return Control_Applicative.pure(Effect_Aff.applicativeAff)(v3.value0);
                  }
                  ;
                  if (Data_Boolean.otherwise) {
                    return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.write({
                      component: v2.component,
                      state: v3.value1,
                      refs: v2.refs,
                      children: v2.children,
                      childrenIn: v2.childrenIn,
                      childrenOut: v2.childrenOut,
                      selfRef: v2.selfRef,
                      handlerRef: v2.handlerRef,
                      pendingQueries: v2.pendingQueries,
                      pendingOuts: v2.pendingOuts,
                      pendingHandlers: v2.pendingHandlers,
                      rendering: v2.rendering,
                      fresh: v2.fresh,
                      subscriptions: v2.subscriptions,
                      forks: v2.forks,
                      lifecycleHandlers: v2.lifecycleHandlers
                    })(ref)))(function() {
                      return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(handleLifecycle(v2.lifecycleHandlers)(render(v2.lifecycleHandlers)(ref)))(function() {
                        return Control_Applicative.pure(Effect_Aff.applicativeAff)(v3.value0);
                      });
                    });
                  }
                  ;
                  throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
                });
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.Subscribe) {
                return Control_Bind.bind(Effect_Aff.bindAff)(fresh(Halogen_Query_HalogenM.SubscriptionId)(ref))(function(sid) {
                  return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Halogen_Subscription.subscribe(v1.value0(sid))(function(act) {
                    return handleAff(evalF(render)(ref)(new Halogen_Query_Input.Action(act)));
                  })))(function(finalize) {
                    return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v2) {
                      return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.modify_(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Map_Internal.insert(Halogen_Query_HalogenM.ordSubscriptionId)(sid)(finalize)))(v2.subscriptions)))(function() {
                        return Control_Applicative.pure(Effect_Aff.applicativeAff)(v1.value1(sid));
                      });
                    });
                  });
                });
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.Unsubscribe) {
                return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(unsubscribe(v1.value0)(ref)))(function() {
                  return Control_Applicative.pure(Effect_Aff.applicativeAff)(v1.value1);
                });
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.Lift) {
                return v1.value0;
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.ChildQuery) {
                return evalChildQuery(ref)(v1.value0);
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.Raise) {
                return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v2) {
                  return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(v2.handlerRef)))(function(handler) {
                    return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(queueOrRun(v2.pendingOuts)(handler(v1.value0)))(function() {
                      return Control_Applicative.pure(Effect_Aff.applicativeAff)(v1.value1);
                    });
                  });
                });
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.Par) {
                return Control_Parallel_Class.sequential(Effect_Aff.parallelAff)(Control_Applicative_Free.retractFreeAp(Effect_Aff.applicativeParAff)(Control_Applicative_Free.hoistFreeAp(function() {
                  var $78 = Control_Parallel_Class.parallel(Effect_Aff.parallelAff);
                  var $79 = evalM(render)(ref);
                  return function($80) {
                    return $78($79($80));
                  };
                }())(v1.value0)));
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.Fork) {
                return Control_Bind.bind(Effect_Aff.bindAff)(fresh(Halogen_Query_HalogenM.ForkId)(ref))(function(fid) {
                  return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v2) {
                    return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref["new"](false)))(function(doneRef) {
                      return Control_Bind.bind(Effect_Aff.bindAff)(Control_Monad_Fork_Class.fork(Control_Monad_Fork_Class.monadForkAff)(Effect_Aff["finally"](Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(function __do() {
                        Effect_Ref.modify_(Data_Map_Internal["delete"](Halogen_Query_HalogenM.ordForkId)(fid))(v2.forks)();
                        return Effect_Ref.write(true)(doneRef)();
                      }))(evalM(render)(ref)(v1.value0))))(function(fiber) {
                        return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Control_Monad.unlessM(Effect.monadEffect)(Effect_Ref.read(doneRef))(Effect_Ref.modify_(Data_Map_Internal.insert(Halogen_Query_HalogenM.ordForkId)(fid)(fiber))(v2.forks))))(function() {
                          return Control_Applicative.pure(Effect_Aff.applicativeAff)(v1.value1(fid));
                        });
                      });
                    });
                  });
                });
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.Kill) {
                return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v2) {
                  return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(v2.forks)))(function(forkMap) {
                    return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Data_Foldable.traverse_(Effect_Aff.applicativeAff)(Data_Foldable.foldableMaybe)(Effect_Aff.killFiber(Effect_Exception.error("Cancelled")))(Data_Map_Internal.lookup(Halogen_Query_HalogenM.ordForkId)(v1.value0)(forkMap)))(function() {
                      return Control_Applicative.pure(Effect_Aff.applicativeAff)(v1.value1);
                    });
                  });
                });
              }
              ;
              if (v1 instanceof Halogen_Query_HalogenM.GetRef) {
                return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v2) {
                  return Control_Applicative.pure(Effect_Aff.applicativeAff)(v1.value1(Data_Map_Internal.lookup(Data_Ord.ordString)(v1.value0)(v2.refs)));
                });
              }
              ;
              throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 133, column 33): " + [v1.constructor.name]);
            };
          };
          return Control_Monad_Free.foldFree(Effect_Aff.monadRecAff)(go(initRef))(v);
        };
      };
    };
    var evalF = function(render) {
      return function(ref) {
        return function(v) {
          if (v instanceof Halogen_Query_Input.RefUpdate) {
            return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Data_Function.flip(Effect_Ref.modify_)(ref)(Halogen_Aff_Driver_State.mapDriverState(function(st) {
              return {
                component: st.component,
                state: st.state,
                refs: Data_Map_Internal.alter(Data_Ord.ordString)(Data_Function["const"](v.value1))(v.value0)(st.refs),
                children: st.children,
                childrenIn: st.childrenIn,
                childrenOut: st.childrenOut,
                selfRef: st.selfRef,
                handlerRef: st.handlerRef,
                pendingQueries: st.pendingQueries,
                pendingOuts: st.pendingOuts,
                pendingHandlers: st.pendingHandlers,
                rendering: st.rendering,
                fresh: st.fresh,
                subscriptions: st.subscriptions,
                forks: st.forks,
                lifecycleHandlers: st.lifecycleHandlers
              };
            })));
          }
          ;
          if (v instanceof Halogen_Query_Input.Action) {
            return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(ref)))(function(v1) {
              return evalM(render)(ref)(v1["component"]["eval"](new Halogen_Query_HalogenQ.Action(v.value0, Data_Unit.unit)));
            });
          }
          ;
          throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
        };
      };
    };
    exports["evalF"] = evalF;
    exports["evalQ"] = evalQ;
    exports["evalM"] = evalM;
    exports["handleLifecycle"] = handleLifecycle;
    exports["queueOrRun"] = queueOrRun;
    exports["handleAff"] = handleAff;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Aff.Driver"] = $PS["Halogen.Aff.Driver"] || {};
    var exports = $PS["Halogen.Aff.Driver"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Category = $PS["Control.Category"];
    var Control_Monad_Fork_Class = $PS["Control.Monad.Fork.Class"];
    var Control_Monad_Rec_Class = $PS["Control.Monad.Rec.Class"];
    var Control_Parallel = $PS["Control.Parallel"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_List = $PS["Data.List"];
    var Data_List_Types = $PS["Data.List.Types"];
    var Data_Map_Internal = $PS["Data.Map.Internal"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect = $PS["Effect"];
    var Effect_Aff = $PS["Effect.Aff"];
    var Effect_Class = $PS["Effect.Class"];
    var Effect_Console = $PS["Effect.Console"];
    var Effect_Exception = $PS["Effect.Exception"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Halogen_Aff_Driver_Eval = $PS["Halogen.Aff.Driver.Eval"];
    var Halogen_Aff_Driver_State = $PS["Halogen.Aff.Driver.State"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_Data_Slot = $PS["Halogen.Data.Slot"];
    var Halogen_Query_HalogenQ = $PS["Halogen.Query.HalogenQ"];
    var Halogen_Query_Input = $PS["Halogen.Query.Input"];
    var Halogen_Subscription = $PS["Halogen.Subscription"];
    var newLifecycleHandlers = Effect_Ref["new"]({
      initializers: Data_List_Types.Nil.value,
      finalizers: Data_List_Types.Nil.value
    });
    var handlePending = function(ref) {
      return function __do() {
        var queue = Effect_Ref.read(ref)();
        Effect_Ref.write(Data_Maybe.Nothing.value)(ref)();
        return Data_Foldable.for_(Effect.applicativeEffect)(Data_Foldable.foldableMaybe)(queue)(function() {
          var $28 = Data_Foldable.traverse_(Effect_Aff.applicativeAff)(Data_List_Types.foldableList)(Control_Monad_Fork_Class.fork(Control_Monad_Fork_Class.monadForkAff));
          return function($29) {
            return Halogen_Aff_Driver_Eval.handleAff($28(Data_List.reverse($29)));
          };
        }())();
      };
    };
    var cleanupSubscriptionsAndForks = function(v) {
      return function __do() {
        Control_Bind.bindFlipped(Effect.bindEffect)(Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableMaybe)(Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Map_Internal.foldableMap)(Halogen_Subscription.unsubscribe)))(Effect_Ref.read(v.subscriptions))();
        Effect_Ref.write(Data_Maybe.Nothing.value)(v.subscriptions)();
        Control_Bind.bindFlipped(Effect.bindEffect)(Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Map_Internal.foldableMap)(function() {
          var $30 = Effect_Aff.killFiber(Effect_Exception.error("finalized"));
          return function($31) {
            return Halogen_Aff_Driver_Eval.handleAff($30($31));
          };
        }()))(Effect_Ref.read(v.forks))();
        return Effect_Ref.write(Data_Map_Internal.empty)(v.forks)();
      };
    };
    var runUI = function(renderSpec) {
      return function(component) {
        return function(i) {
          var squashChildInitializers = function(lchs) {
            return function(preInits) {
              return Halogen_Aff_Driver_State.unDriverStateX(function(st) {
                var parentInitializer = Halogen_Aff_Driver_Eval.evalM(render)(st.selfRef)(st["component"]["eval"](new Halogen_Query_HalogenQ.Initialize(Data_Unit.unit)));
                return Effect_Ref.modify_(function(handlers) {
                  return {
                    initializers: new Data_List_Types.Cons(Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Control_Parallel.parSequence_(Effect_Aff.parallelAff)(Data_List_Types.foldableList)(Data_List.reverse(handlers.initializers)))(function() {
                      return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(parentInitializer)(function() {
                        return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(function __do() {
                          handlePending(st.pendingQueries)();
                          return handlePending(st.pendingOuts)();
                        });
                      });
                    }), preInits),
                    finalizers: handlers.finalizers
                  };
                })(lchs);
              });
            };
          };
          var runComponent = function(lchs) {
            return function(handler) {
              return function(j) {
                return Halogen_Component.unComponent(function(c) {
                  return function __do() {
                    var lchs$prime = newLifecycleHandlers();
                    var $$var = Halogen_Aff_Driver_State.initDriverState(c)(j)(handler)(lchs$prime)();
                    var pre = Effect_Ref.read(lchs)();
                    Effect_Ref.write({
                      initializers: Data_List_Types.Nil.value,
                      finalizers: pre.finalizers
                    })(lchs)();
                    Control_Bind.bindFlipped(Effect.bindEffect)(Halogen_Aff_Driver_State.unDriverStateX(function() {
                      var $32 = render(lchs);
                      return function($33) {
                        return $32(function(v) {
                          return v.selfRef;
                        }($33));
                      };
                    }()))(Effect_Ref.read($$var))();
                    Control_Bind.bindFlipped(Effect.bindEffect)(squashChildInitializers(lchs)(pre.initializers))(Effect_Ref.read($$var))();
                    return $$var;
                  };
                });
              };
            };
          };
          var renderChild = function(lchs) {
            return function(handler) {
              return function(childrenInRef) {
                return function(childrenOutRef) {
                  return Halogen_Component.unComponentSlot(function(slot) {
                    return function __do() {
                      var childrenIn = Data_Functor.map(Effect.functorEffect)(slot.pop)(Effect_Ref.read(childrenInRef))();
                      var $$var = function() {
                        if (childrenIn instanceof Data_Maybe.Just) {
                          Effect_Ref.write(childrenIn.value0.value1)(childrenInRef)();
                          var dsx = Effect_Ref.read(childrenIn.value0.value0)();
                          Halogen_Aff_Driver_State.unDriverStateX(function(st) {
                            return function __do2() {
                              Data_Function.flip(Effect_Ref.write)(st.handlerRef)(function() {
                                var $34 = Data_Maybe.maybe(Control_Applicative.pure(Effect_Aff.applicativeAff)(Data_Unit.unit))(handler);
                                return function($35) {
                                  return $34(slot.output($35));
                                };
                              }())();
                              return Halogen_Aff_Driver_Eval.handleAff(Halogen_Aff_Driver_Eval.evalM(render)(st.selfRef)(st["component"]["eval"](new Halogen_Query_HalogenQ.Receive(slot.input, Data_Unit.unit))))();
                            };
                          })(dsx)();
                          return childrenIn.value0.value0;
                        }
                        ;
                        if (childrenIn instanceof Data_Maybe.Nothing) {
                          return runComponent(lchs)(function() {
                            var $36 = Data_Maybe.maybe(Control_Applicative.pure(Effect_Aff.applicativeAff)(Data_Unit.unit))(handler);
                            return function($37) {
                              return $36(slot.output($37));
                            };
                          }())(slot.input)(slot.component)();
                        }
                        ;
                        throw new Error("Failed pattern match at Halogen.Aff.Driver (line 210, column 14 - line 219, column 98): " + [childrenIn.constructor.name]);
                      }();
                      var isDuplicate = Data_Functor.map(Effect.functorEffect)(function($38) {
                        return Data_Maybe.isJust(slot.get($38));
                      })(Effect_Ref.read(childrenOutRef))();
                      Control_Applicative.when(Effect.applicativeEffect)(isDuplicate)(Effect_Console.warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                      Effect_Ref.modify_(slot.set($$var))(childrenOutRef)();
                      return Control_Bind.bind(Effect.bindEffect)(Effect_Ref.read($$var))(Halogen_Aff_Driver_State.renderStateX(Effect.functorEffect)(function(v) {
                        if (v instanceof Data_Maybe.Nothing) {
                          return Effect_Exception["throw"]("Halogen internal error: child was not initialized in renderChild");
                        }
                        ;
                        if (v instanceof Data_Maybe.Just) {
                          return Control_Applicative.pure(Effect.applicativeEffect)(renderSpec.renderChild(v.value0));
                        }
                        ;
                        throw new Error("Failed pattern match at Halogen.Aff.Driver (line 224, column 37 - line 226, column 50): " + [v.constructor.name]);
                      }))();
                    };
                  });
                };
              };
            };
          };
          var render = function(lchs) {
            return function($$var) {
              return function __do() {
                var v = Effect_Ref.read($$var)();
                var shouldProcessHandlers = Data_Functor.map(Effect.functorEffect)(Data_Maybe.isNothing)(Effect_Ref.read(v.pendingHandlers))();
                Control_Applicative.when(Effect.applicativeEffect)(shouldProcessHandlers)(Effect_Ref.write(new Data_Maybe.Just(Data_List_Types.Nil.value))(v.pendingHandlers))();
                Effect_Ref.write(Halogen_Data_Slot.empty)(v.childrenOut)();
                Effect_Ref.write(v.children)(v.childrenIn)();
                var selfRef = Control_Category.identity(Control_Category.categoryFn)(v.selfRef);
                var pendingQueries = Control_Category.identity(Control_Category.categoryFn)(v.pendingQueries);
                var pendingHandlers = Control_Category.identity(Control_Category.categoryFn)(v.pendingHandlers);
                var handler = function() {
                  var $39 = Halogen_Aff_Driver_Eval.queueOrRun(pendingHandlers);
                  var $40 = Data_Functor["void"](Effect_Aff.functorAff);
                  var $41 = Halogen_Aff_Driver_Eval.evalF(render)(selfRef);
                  return function($42) {
                    return $39($40($41($42)));
                  };
                }();
                var childHandler = function() {
                  var $43 = Halogen_Aff_Driver_Eval.queueOrRun(pendingQueries);
                  return function($44) {
                    return $43(handler(Halogen_Query_Input.Action.create($44)));
                  };
                }();
                var rendering = renderSpec.render(function($45) {
                  return Halogen_Aff_Driver_Eval.handleAff(handler($45));
                })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
                var children = Effect_Ref.read(v.childrenOut)();
                var childrenIn = Effect_Ref.read(v.childrenIn)();
                Halogen_Data_Slot.foreachSlot(Effect.applicativeEffect)(childrenIn)(function(v1) {
                  return function __do2() {
                    var childDS = Effect_Ref.read(v1)();
                    Halogen_Aff_Driver_State.renderStateX_(Effect.applicativeEffect)(renderSpec.removeChild)(childDS)();
                    return finalize(lchs)(childDS)();
                  };
                })();
                Data_Function.flip(Effect_Ref.modify_)(v.selfRef)(Halogen_Aff_Driver_State.mapDriverState(function(ds$prime) {
                  return {
                    component: ds$prime.component,
                    state: ds$prime.state,
                    refs: ds$prime.refs,
                    children,
                    childrenIn: ds$prime.childrenIn,
                    childrenOut: ds$prime.childrenOut,
                    selfRef: ds$prime.selfRef,
                    handlerRef: ds$prime.handlerRef,
                    pendingQueries: ds$prime.pendingQueries,
                    pendingOuts: ds$prime.pendingOuts,
                    pendingHandlers: ds$prime.pendingHandlers,
                    rendering: new Data_Maybe.Just(rendering),
                    fresh: ds$prime.fresh,
                    subscriptions: ds$prime.subscriptions,
                    forks: ds$prime.forks,
                    lifecycleHandlers: ds$prime.lifecycleHandlers
                  };
                }))();
                return Control_Applicative.when(Effect.applicativeEffect)(shouldProcessHandlers)(Data_Function.flip(Control_Monad_Rec_Class.tailRecM(Control_Monad_Rec_Class.monadRecEffect))(Data_Unit.unit)(function(v1) {
                  return function __do2() {
                    var handlers = Effect_Ref.read(pendingHandlers)();
                    Effect_Ref.write(new Data_Maybe.Just(Data_List_Types.Nil.value))(pendingHandlers)();
                    Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableMaybe)(function() {
                      var $46 = Data_Foldable.traverse_(Effect_Aff.applicativeAff)(Data_List_Types.foldableList)(Control_Monad_Fork_Class.fork(Control_Monad_Fork_Class.monadForkAff));
                      return function($47) {
                        return Halogen_Aff_Driver_Eval.handleAff($46(Data_List.reverse($47)));
                      };
                    }())(handlers)();
                    var mmore = Effect_Ref.read(pendingHandlers)();
                    var $21 = Data_Maybe.maybe(false)(Data_List["null"])(mmore);
                    if ($21) {
                      return Data_Functor.voidLeft(Effect.functorEffect)(Effect_Ref.write(Data_Maybe.Nothing.value)(pendingHandlers))(new Control_Monad_Rec_Class.Done(Data_Unit.unit))();
                    }
                    ;
                    return new Control_Monad_Rec_Class.Loop(Data_Unit.unit);
                  };
                }))();
              };
            };
          };
          var finalize = function(lchs) {
            return Halogen_Aff_Driver_State.unDriverStateX(function(st) {
              return function __do() {
                cleanupSubscriptionsAndForks(st)();
                var f = Halogen_Aff_Driver_Eval.evalM(render)(st.selfRef)(st["component"]["eval"](new Halogen_Query_HalogenQ.Finalize(Data_Unit.unit)));
                Effect_Ref.modify_(function(handlers) {
                  return {
                    initializers: handlers.initializers,
                    finalizers: new Data_List_Types.Cons(f, handlers.finalizers)
                  };
                })(lchs)();
                return Halogen_Data_Slot.foreachSlot(Effect.applicativeEffect)(st.children)(function(v) {
                  return function __do2() {
                    var dsx = Effect_Ref.read(v)();
                    return finalize(lchs)(dsx)();
                  };
                })();
              };
            });
          };
          var evalDriver = function(disposed) {
            return function(ref) {
              return function(q) {
                return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref.read(disposed)))(function(v) {
                  if (v) {
                    return Control_Applicative.pure(Effect_Aff.applicativeAff)(Data_Maybe.Nothing.value);
                  }
                  ;
                  return Halogen_Aff_Driver_Eval.evalQ(render)(ref)(q);
                });
              };
            };
          };
          var dispose = function(disposed) {
            return function(lchs) {
              return function(dsx) {
                return Halogen_Aff_Driver_Eval.handleLifecycle(lchs)(function __do() {
                  var v = Effect_Ref.read(disposed)();
                  if (v) {
                    return Data_Unit.unit;
                  }
                  ;
                  Effect_Ref.write(true)(disposed)();
                  finalize(lchs)(dsx)();
                  return Halogen_Aff_Driver_State.unDriverStateX(function(v1) {
                    return function __do2() {
                      var v2 = Effect_Class.liftEffect(Effect_Class.monadEffectEffect)(Effect_Ref.read(v1.selfRef))();
                      return Data_Foldable.for_(Effect.applicativeEffect)(Data_Foldable.foldableMaybe)(v2.rendering)(renderSpec.dispose)();
                    };
                  })(dsx)();
                });
              };
            };
          };
          return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(newLifecycleHandlers))(function(lchs) {
            return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_Ref["new"](false)))(function(disposed) {
              return Halogen_Aff_Driver_Eval.handleLifecycle(lchs)(function __do() {
                var sio = Halogen_Subscription.create();
                var dsx = Control_Bind.bindFlipped(Effect.bindEffect)(Effect_Ref.read)(runComponent(lchs)(function() {
                  var $48 = Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
                  var $49 = Halogen_Subscription.notify(sio.listener);
                  return function($50) {
                    return $48($49($50));
                  };
                }())(i)(component))();
                return Halogen_Aff_Driver_State.unDriverStateX(function(st) {
                  return Control_Applicative.pure(Effect.applicativeEffect)({
                    query: evalDriver(disposed)(st.selfRef),
                    messages: sio.emitter,
                    dispose: dispose(disposed)(lchs)(dsx)
                  });
                })(dsx)();
              });
            });
          });
        };
      };
    };
    exports["runUI"] = runUI;
  })(PS);
  (function(exports) {
    "use strict";
    exports._querySelector = function(selector) {
      return function(node) {
        return function() {
          return node.querySelector(selector);
        };
      };
    };
  })(PS["Web.DOM.ParentNode"] = PS["Web.DOM.ParentNode"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.DOM.ParentNode"] = $PS["Web.DOM.ParentNode"] || {};
    var exports = $PS["Web.DOM.ParentNode"];
    var $foreign = $PS["Web.DOM.ParentNode"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Nullable = $PS["Data.Nullable"];
    var Effect = $PS["Effect"];
    var querySelector = function(qs) {
      var $0 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
      var $1 = $foreign["_querySelector"](qs);
      return function($2) {
        return $0($1($2));
      };
    };
    exports["querySelector"] = querySelector;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Web.HTML.Event.EventTypes"] = $PS["Web.HTML.Event.EventTypes"] || {};
    var exports = $PS["Web.HTML.Event.EventTypes"];
    var domcontentloaded = "DOMContentLoaded";
    exports["domcontentloaded"] = domcontentloaded;
  })(PS);
  (function(exports) {
    "use strict";
    exports._readyState = function(doc) {
      return function() {
        return doc.readyState;
      };
    };
  })(PS["Web.HTML.HTMLDocument"] = PS["Web.HTML.HTMLDocument"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.HTML.HTMLDocument.ReadyState"] = $PS["Web.HTML.HTMLDocument.ReadyState"] || {};
    var exports = $PS["Web.HTML.HTMLDocument.ReadyState"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Loading = function() {
      function Loading2() {
      }
      ;
      Loading2.value = new Loading2();
      return Loading2;
    }();
    var Interactive = function() {
      function Interactive2() {
      }
      ;
      Interactive2.value = new Interactive2();
      return Interactive2;
    }();
    var Complete = function() {
      function Complete2() {
      }
      ;
      Complete2.value = new Complete2();
      return Complete2;
    }();
    var parse = function(v) {
      if (v === "loading") {
        return new Data_Maybe.Just(Loading.value);
      }
      ;
      if (v === "interactive") {
        return new Data_Maybe.Just(Interactive.value);
      }
      ;
      if (v === "complete") {
        return new Data_Maybe.Just(Complete.value);
      }
      ;
      return Data_Maybe.Nothing.value;
    };
    exports["Loading"] = Loading;
    exports["parse"] = parse;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Web.HTML.HTMLDocument"] = $PS["Web.HTML.HTMLDocument"] || {};
    var exports = $PS["Web.HTML.HTMLDocument"];
    var $foreign = $PS["Web.HTML.HTMLDocument"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Effect = $PS["Effect"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var Web_HTML_HTMLDocument_ReadyState = $PS["Web.HTML.HTMLDocument.ReadyState"];
    var toParentNode = Unsafe_Coerce.unsafeCoerce;
    var toDocument = Unsafe_Coerce.unsafeCoerce;
    var readyState = function() {
      var $0 = Data_Functor.map(Effect.functorEffect)(function() {
        var $2 = Data_Maybe.fromMaybe(Web_HTML_HTMLDocument_ReadyState.Loading.value);
        return function($3) {
          return $2(Web_HTML_HTMLDocument_ReadyState.parse($3));
        };
      }());
      return function($1) {
        return $0($foreign["_readyState"]($1));
      };
    }();
    exports["toDocument"] = toDocument;
    exports["toParentNode"] = toParentNode;
    exports["readyState"] = readyState;
  })(PS);
  (function(exports) {
    "use strict";
    exports._read = function(nothing, just, value) {
      var tag = Object.prototype.toString.call(value);
      if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
        return just(value);
      } else {
        return nothing;
      }
    };
  })(PS["Web.HTML.HTMLElement"] = PS["Web.HTML.HTMLElement"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.HTML.HTMLElement"] = $PS["Web.HTML.HTMLElement"] || {};
    var exports = $PS["Web.HTML.HTMLElement"];
    var $foreign = $PS["Web.HTML.HTMLElement"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Unsafe_Coerce = $PS["Unsafe.Coerce"];
    var toNode = Unsafe_Coerce.unsafeCoerce;
    var fromElement = function(x) {
      return $foreign["_read"](Data_Maybe.Nothing.value, Data_Maybe.Just.create, x);
    };
    exports["fromElement"] = fromElement;
    exports["toNode"] = toNode;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Aff.Util"] = $PS["Halogen.Aff.Util"] || {};
    var exports = $PS["Halogen.Aff.Util"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Monad_Error_Class = $PS["Control.Monad.Error.Class"];
    var Data_Either = $PS["Data.Either"];
    var Data_Function = $PS["Data.Function"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect = $PS["Effect"];
    var Effect_Aff = $PS["Effect.Aff"];
    var Effect_Class = $PS["Effect.Class"];
    var Effect_Exception = $PS["Effect.Exception"];
    var Web_DOM_ParentNode = $PS["Web.DOM.ParentNode"];
    var Web_Event_EventTarget = $PS["Web.Event.EventTarget"];
    var Web_HTML = $PS["Web.HTML"];
    var Web_HTML_Event_EventTypes = $PS["Web.HTML.Event.EventTypes"];
    var Web_HTML_HTMLDocument = $PS["Web.HTML.HTMLDocument"];
    var Web_HTML_HTMLDocument_ReadyState = $PS["Web.HTML.HTMLDocument.ReadyState"];
    var Web_HTML_HTMLElement = $PS["Web.HTML.HTMLElement"];
    var Web_HTML_Window = $PS["Web.HTML.Window"];
    var selectElement = function(query) {
      return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Control_Bind.bindFlipped(Effect.bindEffect)(Control_Bind.composeKleisliFlipped(Effect.bindEffect)(function() {
        var $2 = Web_DOM_ParentNode.querySelector(query);
        return function($3) {
          return $2(Web_HTML_HTMLDocument.toParentNode($3));
        };
      }())(Web_HTML_Window.document))(Web_HTML.window)))(function(mel) {
        return Control_Applicative.pure(Effect_Aff.applicativeAff)(Control_Bind.bindFlipped(Data_Maybe.bindMaybe)(Web_HTML_HTMLElement.fromElement)(mel));
      });
    };
    var runHalogenAff = Effect_Aff.runAff_(Data_Either.either(Effect_Exception.throwException)(Data_Function["const"](Control_Applicative.pure(Effect.applicativeEffect)(Data_Unit.unit))));
    var awaitLoad = Effect_Aff.makeAff(function(callback) {
      return function __do() {
        var rs = Control_Bind.bindFlipped(Effect.bindEffect)(Web_HTML_HTMLDocument.readyState)(Control_Bind.bindFlipped(Effect.bindEffect)(Web_HTML_Window.document)(Web_HTML.window))();
        if (rs instanceof Web_HTML_HTMLDocument_ReadyState.Loading) {
          var et = Data_Functor.map(Effect.functorEffect)(Web_HTML_Window.toEventTarget)(Web_HTML.window)();
          var listener = Web_Event_EventTarget.eventListener(function(v) {
            return callback(new Data_Either.Right(Data_Unit.unit));
          })();
          Web_Event_EventTarget.addEventListener(Web_HTML_Event_EventTypes.domcontentloaded)(listener)(false)(et)();
          return Effect_Aff.effectCanceler(Web_Event_EventTarget.removeEventListener(Web_HTML_Event_EventTypes.domcontentloaded)(listener)(false)(et));
        }
        ;
        callback(new Data_Either.Right(Data_Unit.unit))();
        return Effect_Aff.nonCanceler;
      };
    });
    var awaitBody = Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(awaitLoad)(function() {
      return Control_Bind.bind(Effect_Aff.bindAff)(selectElement("body"))(function(body) {
        return Data_Maybe.maybe(Control_Monad_Error_Class.throwError(Effect_Aff.monadThrowAff)(Effect_Exception.error("Could not find body")))(Control_Applicative.pure(Effect_Aff.applicativeAff))(body);
      });
    });
    exports["awaitBody"] = awaitBody;
    exports["runHalogenAff"] = runHalogenAff;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.Query"] = $PS["Halogen.Query"] || {};
    var exports = $PS["Halogen.Query"];
    var Data_Unit = $PS["Data.Unit"];
    var mkTell = function(act) {
      return act(Data_Unit.unit);
    };
    exports["mkTell"] = mkTell;
  })(PS);
  (function(exports) {
    "use strict";
    var getEffProp = function(name) {
      return function(node) {
        return function() {
          return node[name];
        };
      };
    };
    exports._parentNode = getEffProp("parentNode");
    exports._nextSibling = getEffProp("nextSibling");
    exports.insertBefore = function(node1) {
      return function(node2) {
        return function(parent) {
          return function() {
            parent.insertBefore(node1, node2);
          };
        };
      };
    };
    exports.appendChild = function(node) {
      return function(parent) {
        return function() {
          parent.appendChild(node);
        };
      };
    };
    exports.removeChild = function(node) {
      return function(parent) {
        return function() {
          parent.removeChild(node);
        };
      };
    };
  })(PS["Web.DOM.Node"] = PS["Web.DOM.Node"] || {});
  (function($PS) {
    "use strict";
    $PS["Web.DOM.Node"] = $PS["Web.DOM.Node"] || {};
    var exports = $PS["Web.DOM.Node"];
    var $foreign = $PS["Web.DOM.Node"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Nullable = $PS["Data.Nullable"];
    var Effect = $PS["Effect"];
    var parentNode = function() {
      var $3 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
      return function($4) {
        return $3($foreign["_parentNode"]($4));
      };
    }();
    var nextSibling = function() {
      var $14 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
      return function($15) {
        return $14($foreign["_nextSibling"]($15));
      };
    }();
    exports["parentNode"] = parentNode;
    exports["nextSibling"] = nextSibling;
    exports["insertBefore"] = $foreign.insertBefore;
    exports["appendChild"] = $foreign.appendChild;
    exports["removeChild"] = $foreign.removeChild;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Halogen.VDom.Driver"] = $PS["Halogen.VDom.Driver"] || {};
    var exports = $PS["Halogen.VDom.Driver"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Control_Category = $PS["Control.Category"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_HeytingAlgebra = $PS["Data.HeytingAlgebra"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Newtype = $PS["Data.Newtype"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect = $PS["Effect"];
    var Effect_Aff = $PS["Effect.Aff"];
    var Effect_Class = $PS["Effect.Class"];
    var Effect_Ref = $PS["Effect.Ref"];
    var Halogen_Aff_Driver = $PS["Halogen.Aff.Driver"];
    var Halogen_Aff_Driver_State = $PS["Halogen.Aff.Driver.State"];
    var Halogen_Component = $PS["Halogen.Component"];
    var Halogen_VDom_DOM = $PS["Halogen.VDom.DOM"];
    var Halogen_VDom_DOM_Prop = $PS["Halogen.VDom.DOM.Prop"];
    var Halogen_VDom_Machine = $PS["Halogen.VDom.Machine"];
    var Halogen_VDom_Thunk = $PS["Halogen.VDom.Thunk"];
    var Unsafe_Reference = $PS["Unsafe.Reference"];
    var Web_DOM_Node = $PS["Web.DOM.Node"];
    var Web_HTML = $PS["Web.HTML"];
    var Web_HTML_HTMLDocument = $PS["Web.HTML.HTMLDocument"];
    var Web_HTML_HTMLElement = $PS["Web.HTML.HTMLElement"];
    var Web_HTML_Window = $PS["Web.HTML.Window"];
    var substInParent = function(v) {
      return function(v1) {
        return function(v2) {
          if (v1 instanceof Data_Maybe.Just && v2 instanceof Data_Maybe.Just) {
            return Data_Functor["void"](Effect.functorEffect)(Web_DOM_Node.insertBefore(v)(v1.value0)(v2.value0));
          }
          ;
          if (v1 instanceof Data_Maybe.Nothing && v2 instanceof Data_Maybe.Just) {
            return Data_Functor["void"](Effect.functorEffect)(Web_DOM_Node.appendChild(v)(v2.value0));
          }
          ;
          return Control_Applicative.pure(Effect.applicativeEffect)(Data_Unit.unit);
        };
      };
    };
    var removeChild = function(v) {
      return function __do() {
        var npn = Web_DOM_Node.parentNode(v.node)();
        return Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableMaybe)(function(pn) {
          return Web_DOM_Node.removeChild(v.node)(pn);
        })(npn)();
      };
    };
    var mkSpec = function(handler) {
      return function(renderChildRef) {
        return function(document) {
          var getNode = Halogen_Aff_Driver_State.unRenderStateX(function(v) {
            return v.node;
          });
          var done = function(st) {
            if (st instanceof Data_Maybe.Just) {
              return Halogen_VDom_Machine.halt(st.value0);
            }
            ;
            return Data_Unit.unit;
          };
          var buildWidget = function(spec) {
            var buildThunk = Halogen_VDom_Thunk.buildThunk(Data_Newtype.unwrap())(spec);
            var renderComponentSlot = function(cs) {
              var renderChild = Effect_Ref.read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(node, Data_Maybe.Nothing.value, patch, done));
            };
            var render = function(slot) {
              if (slot instanceof Halogen_Component.ComponentSlot) {
                return renderComponentSlot(slot.value0);
              }
              ;
              if (slot instanceof Halogen_Component.ThunkSlot) {
                var step = buildThunk(slot.value0);
                return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(Halogen_VDom_Machine.extract(step), new Data_Maybe.Just(step), patch, done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 85, column 7 - line 90, column 75): " + [slot.constructor.name]);
            };
            var patch = function(st, slot) {
              if (st instanceof Data_Maybe.Just) {
                if (slot instanceof Halogen_Component.ComponentSlot) {
                  Halogen_VDom_Machine.halt(st.value0);
                  return renderComponentSlot(slot.value0);
                }
                ;
                if (slot instanceof Halogen_Component.ThunkSlot) {
                  var step$prime = Halogen_VDom_Machine.step(st.value0, slot.value0);
                  return Halogen_VDom_Machine.mkStep(new Halogen_VDom_Machine.Step(Halogen_VDom_Machine.extract(step$prime), new Data_Maybe.Just(step$prime), patch, done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 98, column 22 - line 104, column 79): " + [slot.constructor.name]);
              }
              ;
              return render(slot);
            };
            return render;
          };
          var buildAttributes = Halogen_VDom_DOM_Prop.buildProp(handler);
          return {
            buildWidget,
            buildAttributes,
            document
          };
        };
      };
    };
    var renderSpec = function(document) {
      return function(container) {
        var render = function(handler) {
          return function(child) {
            return function(v) {
              return function(v1) {
                if (v1 instanceof Data_Maybe.Nothing) {
                  return function __do() {
                    var renderChildRef = Effect_Ref["new"](child)();
                    var spec = mkSpec(handler)(renderChildRef)(document);
                    var machine = Halogen_VDom_DOM.buildVDom(spec)(v);
                    var node = Halogen_VDom_Machine.extract(machine);
                    Data_Functor["void"](Effect.functorEffect)(Web_DOM_Node.appendChild(node)(Web_HTML_HTMLElement.toNode(container)))();
                    return {
                      machine,
                      node,
                      renderChildRef
                    };
                  };
                }
                ;
                if (v1 instanceof Data_Maybe.Just) {
                  return function __do() {
                    Effect_Ref.write(child)(v1.value0.renderChildRef)();
                    var parent = Web_DOM_Node.parentNode(v1.value0.node)();
                    var nextSib = Web_DOM_Node.nextSibling(v1.value0.node)();
                    var machine$prime = Halogen_VDom_Machine.step(v1.value0.machine, v);
                    var newNode = Halogen_VDom_Machine.extract(machine$prime);
                    Control_Applicative.when(Effect.applicativeEffect)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraFunction(Data_HeytingAlgebra.heytingAlgebraFunction(Data_HeytingAlgebra.heytingAlgebraBoolean)))(Unsafe_Reference.unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent))();
                    return {
                      machine: machine$prime,
                      node: newNode,
                      renderChildRef: v1.value0.renderChildRef
                    };
                  };
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 159, column 5 - line 175, column 80): " + [v1.constructor.name]);
              };
            };
          };
        };
        return {
          render,
          renderChild: Control_Category.identity(Control_Category.categoryFn),
          removeChild,
          dispose: removeChild
        };
      };
    };
    var runUI = function(component) {
      return function(i) {
        return function(element) {
          return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Data_Functor.map(Effect.functorEffect)(Web_HTML_HTMLDocument.toDocument)(Control_Bind.bindFlipped(Effect.bindEffect)(Web_HTML_Window.document)(Web_HTML.window))))(function(document) {
            return Halogen_Aff_Driver.runUI(renderSpec(document)(element))(component)(i);
          });
        };
      };
    };
    exports["runUI"] = runUI;
  })(PS);
  (function($PS) {
    "use strict";
    $PS["Main"] = $PS["Main"] || {};
    var exports = $PS["Main"];
    var App_AppM = $PS["App.AppM"];
    var App_Component_Router = $PS["App.Component.Router"];
    var App_Data_Route = $PS["App.Data.Route"];
    var Control_Applicative = $PS["Control.Applicative"];
    var Control_Bind = $PS["Control.Bind"];
    var Data_Eq = $PS["Data.Eq"];
    var Data_Foldable = $PS["Data.Foldable"];
    var Data_Functor = $PS["Data.Functor"];
    var Data_Maybe = $PS["Data.Maybe"];
    var Data_Unit = $PS["Data.Unit"];
    var Effect = $PS["Effect"];
    var Effect_Aff = $PS["Effect.Aff"];
    var Effect_Class = $PS["Effect.Class"];
    var Halogen_Aff_Util = $PS["Halogen.Aff.Util"];
    var Halogen_Query = $PS["Halogen.Query"];
    var Halogen_VDom_Driver = $PS["Halogen.VDom.Driver"];
    var Routing_Duplex = $PS["Routing.Duplex"];
    var Routing_Hash = $PS["Routing.Hash"];
    var main = Halogen_Aff_Util.runHalogenAff(Control_Bind.bind(Effect_Aff.bindAff)(Halogen_Aff_Util.awaitBody)(function(body) {
      var initialStore = {
        currentUser: Data_Maybe.Nothing.value,
        recentMessageLog: []
      };
      return Control_Bind.bind(Effect_Aff.bindAff)(App_AppM.runAppM(initialStore)(App_Component_Router.component(App_AppM.monadEffectAppM)(App_AppM.monadLogAppM)(App_AppM.monadNavigateAppM)(App_AppM.monadUserAppM)(App_AppM.monadStoreAppM)))(function(componentAff) {
        return Control_Bind.bind(Effect_Aff.bindAff)(Halogen_VDom_Driver.runUI(componentAff)(Data_Unit.unit)(body))(function(halogenIO) {
          return Data_Functor["void"](Effect_Aff.functorAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Routing_Hash.matchesWith(Data_Foldable.foldableEither)(Routing_Duplex.parse(App_Data_Route.routeCodec))(function(mOld) {
            return function($$new) {
              return Control_Applicative.when(Effect.applicativeEffect)(Data_Eq.notEq(Data_Maybe.eqMaybe(App_Data_Route.eqRoute))(mOld)(new Data_Maybe.Just($$new)))(Effect_Aff.launchAff_(halogenIO.query(Halogen_Query.mkTell(App_Component_Router.Navigate.create($$new)))));
            };
          })));
        });
      });
    }));
    exports["main"] = main;
  })(PS);
  PS["Main"].main();
})();