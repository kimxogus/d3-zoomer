/**
 * d3-zoomer
 *
 * @author Taehyun Kim
 * @licence MIT
 */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
(function (root, factory) {
  var d3Zoom;
  var d3Selection;
  var d3Scale;
  if (typeof define === 'function' && define.amd) {
    try {
      d3Zoom = require('d3-zoom');
    } catch (e) {
      d3Zoom = require('d3');
    }
    try {
      d3Selection = require('d3-selection');
    } catch (e) {
      d3Selection = require('d3');
    }
    try {
      d3Scale = require('d3-scale');
    } catch (e) {
      d3Scale = require('d3');
    }
    define([], function () {
      return factory(d3Zoom, d3Selection, d3Scale);
    });
  } else if (typeof module === 'object' && module.exports) {
    d3Zoom = require('d3-zoom');
    d3Selection = require('d3-selection');
    d3Scale = require('d3-scale');
    module.exports = factory(d3Zoom, d3Selection, d3Scale);
  }

  var d3 = root.d3;
  if (d3) {
    root.d3.zoomer = factory(d3, d3, d3);
  }
/* eslint-enable no-param-reassign */
/* eslint-enable global-require no-param-reassign */
})(this, function (d3Zoom, d3Selection, d3Scale) {
  var target = null,
    zoom = null,
    zoomEnabled = true,
    zoomScale = null,
    zoomScaleRange = [0.1, 3],
    zoomScaleDomain = [0.1, 3],
    onZoom = function () {};

  function zoomer(_target) {
    target = _target;

    zoomScale = d3Scale.scaleLinear()
      .range(zoomScaleRange)
      .domain(zoomScaleDomain);

    zoom = d3Zoom.zoom()
      .scaleExtent(zoomScaleRange)
      .on('zoom', function () {
        target.select('g').attr('transform', d3Selection.event.transform);
        onZoom(zoomer.scale());
      })
      .filter(function () {
        return zoomEnabled;
      });

    target.call(zoom);
  }

  zoomer.scale = function (scale) {
    if (arguments.length === 0) {
      var transform = d3Zoom.zoomTransform(self._svg.node());
      return zoomScale.invert(transform.k);
    } else {
      return zoomer.transform({ k: zoomScale(scale) });
    }
  };

  zoomer.scaleRange = function (_scaleRange) {
    if (arguments.length === 0) {
      return zoomScaleRange;
    } else {
      zoomScaleRange = Array.prototype.slice.call(_scaleRange);
      zoomScale.range(zoomScaleRange);
      zoom.scaleExtent(zoomScaleRange);
      return zoomer;
    }
  };

  zoomer.scaleDomain = function (_scaleDomain) {
    if (arguments.length === 0) {
      return zoomScaleDomain;
    } else {
      zoomScaleDomain = Array.prototype.slice.call(_scaleDomain);
      zoomScale.domain(zoomScaleDomain);
      return zoomer;
    }
  };

  zoomer.onZoom = function (_onZoom) {
    onZoom = _onZoom;
  };

  zoomer.transform = function (_transform) {
    if (arguments.length === 0) {
      return d3Zoom.zoomTransform(target.node());
    } else {
      var zoomTransform = d3Zoom.zoomTransform(target.node());

      var x = _transform.x && _transform.x !== 0 ? _transform.x : zoomTransform.x,
        y = _transform.y && _transform.y !== 0 ? _transform.y : zoomTransform.y,
        scale = _transform.k && _transform.k !== 0 ? _transform.k : zoomTransform.k;

      var zoomIdentity = d3Zoom.zoomIdentity.translate(x, y).scale(scale);

      target.call(zoom.transform, zoomIdentity);

      return zoomer;
    }
  };

  zoomer.enabled = function (_zoomEnabled) {
    if (arguments.length === 0) {
      return zoomEnabled;
    } else {
      zoomEnabled = _zoomEnabled;
      return zoomer;
    }
  };

  return zoomer;
});
