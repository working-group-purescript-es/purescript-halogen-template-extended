#!/bin/bash

rm -rf bundles/;
mkdir -p bundles/esbuild/pure-none;
mkdir -p bundles/esbuild/pure-ctors;
mkdir -p bundles/esbuild/pure-all;
mkdir -p bundles/esbuild/v0.14.5;
mkdir -p bundles/parcel/pure-none;
mkdir -p bundles/parcel/pure-ctors;
mkdir -p bundles/parcel/pure-all;
mkdir -p bundles/parcel/v0.14.5;
mkdir -p bundles/webpack/pure-none;
mkdir -p bundles/webpack/pure-ctors;
mkdir -p bundles/webpack/pure-all;
mkdir -p bundles/webpack/v0.14.5;
mkdir -p bundles/purs;
cp dev/index.cjs.html bundles/purs
(
    export PATH="$HOME/.local/bin/pure-none:$PATH"; 
    purs --version; 
    shasum -a 256 $(which purs);
    rm -rf output/;
    spago build;
    
    #### ESBUILD
    esbuild --bundle dev/index.js --platform=browser --outfile="bundles/esbuild/pure-none/index.js";
    esbuild --bundle dev/index.js --platform=browser --outfile="bundles/esbuild/pure-none/index.minified.js" --minify;

    #### PARCEL
    parcel build dev/index.html --no-source-maps --no-optimize --no-scope-hoist --dist-dir "bundles/parcel/pure-none/"
    parcel build dev/index.html --no-source-maps --dist-dir "bundles/parcel/pure-none/"

    #### WEBPACK
    webpack --env entry="./dev/index.js" --env bundleFolder="bundles/webpack/pure-none/" --env bundleName="index.js" --mode=development
    webpack --env entry="./dev/index.js" bundleFolder="bundles/webpack/pure-none/" --env bundleName="index.minified.js" --mode=production
)
(
    export PATH="$HOME/.local/bin/pure-ctors:$PATH"; 
    purs --version; 
    shasum -a 256 $(which purs);
    rm -rf output/;
    spago build;

    #### ESBUILD
    esbuild --bundle dev/index.js --platform=browser --outfile="bundles/esbuild/pure-ctors/index.js";
    esbuild --bundle dev/index.js --platform=browser --outfile="bundles/esbuild/pure-ctors/index.minified.js" --minify;

    #### PARCEL
    parcel build dev/index.html --no-source-maps --no-optimize --no-scope-hoist --dist-dir "bundles/parcel/pure-ctors/"
    parcel build dev/index.html --no-source-maps --dist-dir "bundles/parcel/pure-ctors/"

    #### WEBPACK
    webpack --env entry="./dev/index.js" --env bundleFolder="bundles/webpack/pure-ctors/" --env bundleName="index.js" --mode=development
    webpack --env entry="./dev/index.js" --env bundleFolder="bundles/webpack/pure-ctors/" --env bundleName="index.minified.js" --mode=production
)
(
    export PATH="$HOME/.local/bin/pure-all:$PATH"; 
    purs --version; 
    shasum -a 256 $(which purs);
    rm -rf output/;
    spago build;

    #### ESBUILD
    esbuild --bundle dev/index.js --platform=browser --outfile="bundles/esbuild/pure-all/index.js";
    esbuild --bundle dev/index.js --platform=browser --outfile="bundles/esbuild/pure-all/index.minified.js" --minify;
    
    #### PARCEL
    parcel build dev/index.html --no-source-maps --no-optimize --no-scope-hoist --dist-dir "bundles/parcel/pure-all/"
    parcel build dev/index.html --no-source-maps --dist-dir "bundles/parcel/pure-all/"

    #### WEBPACK
    webpack --env entry="./dev/index.js" --env bundleFolder="bundles/webpack/pure-all/" --env bundleName="index.js" --mode=development
    webpack --env entry="./dev/index.js" --env bundleFolder="bundles/webpack/pure-all/" --env bundleName="index.minified.js" --mode=production
    
)
(
    purs --version; 
    shasum -a 256 $(which purs);
    rm -rf output/;
    spago build;
    spago -x spago-v0.14.5.dhall bundle-app --to bundles/purs/index.js

    #### ESBUILD
    esbuild --bundle bundles/purs/index.js --platform=browser --outfile="bundles/esbuild/v0.14.5/index.js";
    esbuild --bundle bundles/purs/index.js --platform=browser --outfile="bundles/esbuild/v0.14.5/index.minified.js" --minify;
    
    #### PARCEL
    parcel build bundles/purs/index.cjs.html --no-source-maps --no-optimize --no-scope-hoist --dist-dir "bundles/parcel/v0.14.5/"
    parcel build bundles/purs/index.cjs.html --no-source-maps --dist-dir "bundles/parcel/v0.14.5/"

    #### WEBPACK
    webpack --env entry="./bundles/purs/index.js" --env bundleFolder="bundles/webpack/v0.14.5/" --env bundleName="index.js" --mode=development
    webpack --env entry="./bundles/purs/index.js" --env bundleFolder="bundles/webpack/v0.14.5/" --env bundleName="index.minified.js" --mode=production
    
)
find ./bundles -path '**/*.js' -exec gzip --keep {} \;
