# d3-zoomer

[![npm version][npm-image]][npm-url]
[![npm downloads][downloads-image]][downloads-url]

A library to use d3-zoom easily.

See how to use [d3-zoomer example](https://kimxogus.github.io/d3-zoomer).

## Installing
- d3-zoomer is based on d3 version 4.

- NPM
```bash
npm install d3-zoomer
```
```js
var d3Zoomer = require('d3-zoomer');
```

- Download
[latest release](https://github.com/kimxogus/d3-zoomer/releases/latest).
AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:


```html
<script src="path/to/d3.min.js"></script>
<script src="path/to/d3-zoomer.min.js"></script>
<script>

var zoomer = d3.zoomer();

</script>
```

## Usage
- You can call *zoomer* with *svg* or *g* which is child of *svg*. Zoomer will add class name to target *g* elements, and those target elements will be zoomed and panned.
- When you call *zoomer* with *svg*, only *g* elements with [targetClass](#targetClass) will be targeted.
- When you call *zoomer* with *g*, [targetClass](#targetClass) will be added to the *g* elements and they will be targeted.

```js
// Usage 1
var svg = d3.select('svg').call(zoomer);

// Usage 2
var g = d3.select('svg').append('g').call(zoomer);
```

## API Reference

<a name="zoomer" href="#zoomer">#</a> d3.<b>zoomer</b>() [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js "Source")

Creates a new zoomer.

<a name="targetClass" href="#targetClass">#</a> *zoomer*.<b>targetClass</b>([<i>targetClass</i>]) [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L101 "Source")

Sets target class name(```'pan-zoom'``` by default) to be zoomed and panned. Zoomer will select all *g* classed with *targetClass*. If there are no *g* with *targetClass*, Zoomer will create a new *g* with *targetClass*.

If *targetClass* is not specified, current *targetClass* will be returned.

<a name="target" href="#target">#</a> *zoomer*.<b>target</b>() [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L110 "Source")

Returns current targets(*g* elements with [targetClass](#targetClass))

<a name="scale" href="#scale">#</a> *zoomer*.<b>scale</b>([<i>scale</i>]) [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L114 "Source")

ScaleTo function. If *scale* is not specified, current scale will be returned.

*scale* of this function is not the scale of transform attribute. It's translated value from [scaleRange](#scaleRange) to [scaleDomain](#scaleDomain).

<a name="scaleRange" href="#scaleRange">#</a> *zoomer*.<b>scaleRange</b>([<i>scaleRange</i>]) [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L122 "Source")

Sets scaleRange with specified array of numbers [*k0*, *k1*], which [*0.1*, *2*] by default, where *k0* is lower limit of actual scale of transform and *k1* is upper limit.

If *scaleRange* is not specified, current *scaleRange* will be returned.

<a name="scaleDomain" href="#scaleDomain">#</a> *zoomer*.<b>scaleDomain</b>([<i>scaleDomain</i>]) [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L133 "Source")

Sets scaleDomain with specified array of numbers [*k0*, *k1*], which [*0.1*, *2*] by default, where *k0* is translated scale of lower limit of *scaleRange* and *k1* is translated scale of upper limit.

If *scaleDomain* is not specified, current *scaleDomain* will be returned.

<a name="on" href="#on">#</a> *zoomer*.<b>on</b>(<i>typename</i>[, <i>callback</i>]) [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L143 "Source")

If *callback* is specified, register event listener for *typename*. If not, currently registered *callback* for *typename* will be returned.
Available *typenames* are as follows.

- ```start```: after zooming begins.
- ```zoom```: after a change to the zoom transform.
- ```end```: after zooming ends.

See [d3-zoom.on](https://github.com/d3/d3-zoom#zoom_on) for details.

<a name="transform" href="#transform">#</a> *zoomer*.<b>transform</b>([<i>transform</i>]) [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L148 "Source")

If *transform* is specified, apply the transform to [target](#target). To apply transform, *transform* should be an object with properties of *x*, *y* and *k*. You can specify only one or two of those properties like
```js
zoomer.transform({
  x: 100
});
```

If *transform* is not specified, current transform object([d3-zoom.zoomTransform](https://github.com/d3/d3-zoom#zoomTransform) object) will be returned.

<a name="enabled" href="#enabled">#</a> *zoomer*.<b>enabled</b>([<i>enabled</i>]) [<>](https://github.com/kimxogus/d3-zoomer/blob/master/index.js#L175 "Source")

Sets if zoom is enabled. If *enabled* is specified, zoom will be enabled(*true*) or disabled(*false*) as [d3-zoom.filter](https://github.com/d3/d3-zoom#zoom_filter).
If not, it will return current *enabled* status of d3-zoom.

[npm-image]: https://img.shields.io/npm/v/d3-zoomer.svg
[npm-url]: https://npmjs.org/package/d3-zoomer
[downloads-image]: https://img.shields.io/npm/dm/d3-zoomer.svg
[downloads-url]: https://npmjs.org/package/d3-zoomer
