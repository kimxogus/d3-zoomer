/**
 * d3-svg-zoomer
 *
 * A wrapper of d3-zoom for svg.
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
  var d3Dispatch;
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
    try {
      d3Dispatch = require('d3-dispatch');
    } catch (e) {
      d3Dispatch = require('d3');
    }
    define([], function () {
      return factory(d3Zoom, d3Selection, d3Scale, d3Dispatch);
    });
  } else if (typeof module === 'object' && module.exports) {
    d3Zoom = require('d3-zoom');
    d3Selection = require('d3-selection');
    d3Scale = require('d3-scale');
    d3Dispatch = require('d3-dispatch');
    module.exports = factory(d3Zoom, d3Selection, d3Scale, d3Dispatch);
  }

  var d3 = root.d3;
  if (d3) {
    root.d3.svgZoomer = factory(d3, d3, d3, d3);
  }
/* eslint-enable no-param-reassign */
/* eslint-enable global-require no-param-reassign */
})(this, function (d3Zoom, d3Selection, d3Scale, d3Dispatch) {
  return function () {
    var svg = null,
      className = 'pan-zoom',
      zoomEnabled = true,
      zoomScaleRange = [0.1, 2],
      zoomScaleDomain = [0.1, 2],
      zoomScale = d3Scale.scaleLinear()
        .domain(zoomScaleDomain)
        .range(zoomScaleRange),
      zoom = d3Zoom.zoom()
        .scaleExtent(zoomScaleRange)
        .filter(function () {
          return zoomEnabled;
        }),
      dispatch = d3Dispatch
        .dispatch('zoom');

    function selectOrCreateContainer() {
      if (svg.selectAll('g.' + className).empty()) {
        svg.append('g').attr('class', className);
      }

      return svg.selectAll('g.' + className);
    }

    function svgZoomer(_target) {
      svg = _target;

      svg = svg.node().tagName === 'svg' ? svg : d3Selection.select(svg.node().ownerSVGElement);

      selectOrCreateContainer();

      svg.call(zoom
        .on('zoom', function () {
          selectOrCreateContainer().attr('transform', d3Selection.event.transform);
          dispatch.call('zoom', svg.node());
        }));
    }

    svgZoomer.class = function (_className) {
      if (arguments.length === 0) {
        return className;
      } else {
        className = _className;
        return svgZoomer;
      }
    };

    svgZoomer.container = function () {
      return selectOrCreateContainer();
    };

    svgZoomer.scale = function (scale) {
      if (arguments.length === 0) {
        var transform = d3Zoom.zoomTransform(svg.node());
        return zoomScale.invert(transform.k);
      } else {
        return svgZoomer.transform({ k: zoomScale(scale) });
      }
    };

    svgZoomer.scaleRange = function (_scaleRange) {
      if (arguments.length === 0) {
        return zoomScaleRange;
      } else {
        zoomScaleRange = Array.prototype.slice.call(_scaleRange);
        zoomScale.range(zoomScaleRange);
        zoom.scaleExtent(zoomScaleRange);
        return svgZoomer;
      }
    };

    svgZoomer.scaleDomain = function (_scaleDomain) {
      if (arguments.length === 0) {
        return zoomScaleDomain;
      } else {
        zoomScaleDomain = Array.prototype.slice.call(_scaleDomain);
        zoomScale.domain(zoomScaleDomain);
        return svgZoomer;
      }
    };

    svgZoomer.on = function (event, callback) {
      dispatch.on(event, callback);
      return svgZoomer;
    };

    svgZoomer.transform = function (_transform) {
      if (arguments.length === 0) {
        return d3Zoom.zoomTransform(svg.node());
      } else {
        var zoomTransform = d3Zoom.zoomTransform(svg.node());

        var x = _transform.x || _transform.x === 0 ? _transform.x : zoomTransform.x,
          y = _transform.y || _transform.y === 0 ? _transform.y : zoomTransform.y,
          scale = _transform.k || _transform.k === 0 ? _transform.k : zoomTransform.k;

        var zoomIdentity = d3Zoom.zoomIdentity.translate(x, y).scale(scale);

        svg.call(zoom.transform, zoomIdentity);

        return svgZoomer;
      }
    };

    svgZoomer.enabled = function (_zoomEnabled) {
      if (arguments.length === 0) {
        return zoomEnabled;
      } else {
        zoomEnabled = _zoomEnabled;
        return svgZoomer;
      }
    };

    return svgZoomer;
  };
});
