/**
 * d3-zoomer
 *
 * A wrapper of d3-zoom.
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
    root.d3.zoomer = factory(d3, d3, d3, d3);
  }
/* eslint-enable no-param-reassign */
/* eslint-enable global-require no-param-reassign */
})(this, function (d3Zoom, d3Selection, d3Scale, d3Dispatch) {
  return function () {
    var svg = null,
      targetClass = 'pan-zoom',
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

    function selectOrCreateTarget() {
      if (svg.selectAll('g.' + targetClass).empty()) {
        svg.append('g').attr('class', targetClass);
      }

      return svg.selectAll('g.' + targetClass);
    }

    function zoomer(_target) {
      svg = _target.select(function () {
        return this.tagName.toLowerCase() === 'svg'
          ? this
          : this.ownerSVGElement;
      });

      selectOrCreateTarget();

      svg.call(zoom
        .on('zoom', function () {
          selectOrCreateTarget().attr('transform', d3Selection.event.transform);
          dispatch.call('zoom', svg.node());
        }));
    }

    zoomer.targetClass = function (_className) {
      if (arguments.length === 0) {
        return targetClass;
      } else {
        targetClass = _className;
        return zoomer;
      }
    };

    zoomer.target = function () {
      return selectOrCreateTarget();
    };

    zoomer.scale = function (scale) {
      if (arguments.length === 0) {
        return zoomScale.invert(zoomer.transform().k);
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

    zoomer.on = function (event, callback) {
      dispatch.on(event, callback);
      return zoomer;
    };

    zoomer.transform = function (_transform) {
      if (arguments.length === 0) {
        return d3Zoom.zoomTransform(svg.node());
      } else {
        var zoomTransform = d3Zoom.zoomTransform(svg.node());

        var x = _transform.x || _transform.x === 0 ? _transform.x : zoomTransform.x,
          y = _transform.y || _transform.y === 0 ? _transform.y : zoomTransform.y,
          scale = _transform.k || _transform.k === 0 ? _transform.k : zoomTransform.k;

        var zoomIdentity = d3Zoom.zoomIdentity.translate(x, y).scale(scale);

        svg.call(zoom.transform, zoomIdentity);

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
  };
});
