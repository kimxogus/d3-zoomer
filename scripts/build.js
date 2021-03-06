//uglifyjs index.js -c -m -o build/d3-zoomer.min.js
var path = require('path');
var fs = require('fs-extra');
var uglifyJs = require('uglify-js');

var BUILD_PATH = 'build';

if(fs.existsSync(BUILD_PATH)) {
  fs.removeSync(BUILD_PATH);
}

fs.mkdirpSync(BUILD_PATH);

var d3Zoomer = fs.readFileSync(path.join('src', 'index.js'), 'utf8');

fs.writeFileSync(path.join(BUILD_PATH, 'd3-zoomer.js'), d3Zoomer);

var minified = uglifyJs.minify(d3Zoomer, {
  mangle: {
    ie8: true,
  },
  output: {
    ie8: true,
  },
});

fs.writeFileSync(path.join(BUILD_PATH, 'd3-zoomer.min.js'), minified.code);
