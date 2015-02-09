/*!
 * jQuery UI Sortable Animation 0.0.1
 *
 * Copyright 2015, Egor Sharapov
 * Licensed under the MIT license.
 *
 * Depends:
 *  jquery.ui.sortable.js
 */
(function (window, $) {
  var supports = {},
      testProp = function (prefixes) {
        var testEl = document.createElement('div'), i, l;

        for (i = 0; l = prefixes.length, i < l; i += 1) {
          if (document.createElement('div').style[prefixes[i]] != undefined) {
            return prefixes[i];
          }
        }

        return '';
      },
      prepareTransition = function ($el) {
        $el.offset();
        return $el;
      },
      last_top,
      css_animation = false;

  // check for css-transforms support
  supports['transform'] = testProp([
    'transform', 'WebkitTransform',
    'MozTransform', 'OTransform',
    'msTransform'
  ]);

  // check for css-transitions support
  supports['transition'] = testProp([
    'transition', 'WebkitTransition',
    'MozTransition', 'OTransition',
    'msTransition'
  ]);

  // check for transitionEnd event
  supports['transitionend'] = function () {
    var prefixes = ['webkit', 'o', ''],
        i, l = prefixes.length;

    for (i = 0; l = prefixes.length, i < l; i += 1) {
      if (("on" + prefixes[i] + "transitionend") in window) {
        return  (prefixes[i] ? prefixes[i] + "T" : "t") + "ransitionEnd";
      }
    }

    return '';
  }();

  css_animation = supports['transform'] && supports['transition'] && supports['transitionend'];

  $.widget("app.sortable", $.ui.sortable, {
    options: {
      // adds the new `sortAnimate` option, turned off by default.
      sortAnimate: false,
      sortAnimateDuration: 150
    },

    // called internally by sortable when sortable
    // items are rearranged.
    _rearrange: function ( e, item ) {
      var $item,
          props = {},
          offset;

      // just call the original implementation of _rearrange()
      // if option `sortAnimate` is turned off
      // `currentContainer` used for animating received items
      // from another sortable container (`connectWith` option)
      if (!this.currentContainer.options.sortAnimate) {
        return this._superApply(arguments);
      }

      $item = $(item.item[0]);
      // if moved up, then move item up to its height,
      // if moved down, then move item down
      offset = (this.direction == 'up' ? '' : '-') + ($item.height()) + 'px';

      // call original _rearrange() at first
      this._superApply(arguments);

      // prepare starting css props
      if (css_animation) {
        props[supports['transform']] = 'translateY(' + offset + ')';
      } else {
        props = {
          position: 'relative',
          top: offset
        };
      }

      // set starting css props on item
      $item.css(props);

      // if css animations do not supported
      // use jQuery animations
      if (css_animation) {
        props[supports['transition']] = supports['transform'] + ' ' + this.options.sortAnimateDuration + 'ms';
        props[supports['transform']] = '';

        prepareTransition($item)
          .css(props)
          .one(supports['transitionend'], function () {
            $item
              .css(supports['transform'], '')
              .css(supports['transition'], '');
          });
      } else {
        $item.animate({
          top: '',
          position: ''
        }, this.options.sortAnimateDuration);
      }
    }
  });   
})(window, jQuery);
