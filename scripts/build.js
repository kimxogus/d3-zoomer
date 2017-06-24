//uglifyjs index.js -c -m -o build/d3-zoomer.min.js
var path = require('path');
var fs = require('fs');
var uglifyJs = require('uglify-js');

console.log(uglifyJs.default_options())

var BUILD_PATH = 'build';

if(!fs.existsSync(BUILD_PATH)) {
  fs.mkdirSync(BUILD_PATH);
}

var d3Zoomer = fs.readFileSync('index.js', 'utf8');

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
