#!/usr/bin/env bash

npm test
docco ./lib/async-cancelable-events.js
browserify ./lib/async-cancelable-events.js | uglifyjs > ./lib/async-cancelable-events.min.js
git commit -am "Automatic documentation and minification for version $npm_package_version"
git tag $npm_package_version
git push
git push --tags