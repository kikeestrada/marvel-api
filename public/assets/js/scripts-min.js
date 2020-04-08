(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

/* eslint-disable strict */

;(function ($) {
  'use strict';

  /**
   * Add integers, wrapping at 2^32.
   * This uses 16-bit operations internally to work around bugs in interpreters.
   *
   * @param {number} x First integer
   * @param {number} y Second integer
   * @returns {number} Sum
   */

  function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  }

  /**
   * Bitwise rotate a 32-bit number to the left.
   *
   * @param {number} num 32-bit number
   * @param {number} cnt Rotation count
   * @returns {number} Rotated number
   */
  function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }

  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} q q
   * @param {number} a a
   * @param {number} b b
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  /**
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   *
   * @param {Array} x Array of little-endian words
   * @param {number} len Bit length
   * @returns {Array<number>} MD5 Array
   */
  function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }

  /**
   * Convert an array of little-endian words to a string
   *
   * @param {Array<number>} input MD5 Array
   * @returns {string} MD5 string
   */
  function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  }

  /**
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   *
   * @param {string} input Raw input string
   * @returns {Array<number>} Array of little-endian words
   */
  function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  }

  /**
   * Calculate the MD5 of a raw string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
  }

  /**
   * Calculates the HMAC-MD5 of a key and some data (raw strings)
   *
   * @param {string} key HMAC key
   * @param {string} data Raw input string
   * @returns {string} Raw MD5 string
   */
  function rstrHMACMD5(key, data) {
    var i;
    var bkey = rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
  }

  /**
   * Convert a raw string to a hex string
   *
   * @param {string} input Raw input string
   * @returns {string} Hex encoded string
   */
  function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  }

  /**
   * Encode a string as UTF-8
   *
   * @param {string} input Input string
   * @returns {string} UTF8 string
   */
  function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  }

  /**
   * Encodes input string as raw MD5 string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s));
  }
  /**
   * Encodes input string as Hex encoded string
   *
   * @param {string} s Input string
   * @returns {string} Hex encoded string
   */
  function hexMD5(s) {
    return rstr2hex(rawMD5(s));
  }
  /**
   * Calculates the raw HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
  }
  /**
   * Calculates the Hex encoded HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d));
  }

  /**
   * Calculates MD5 value for a given string.
   * If a key is provided, calculates the HMAC-MD5 value.
   * Returns a Hex encoded string unless the raw argument is given.
   *
   * @param {string} string Input string
   * @param {string} [key] HMAC key
   * @param {boolean} [raw] Raw output switch
   * @returns {string} MD5 output
   */
  function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string);
      }
      return rawMD5(string);
    }
    if (!raw) {
      return hexHMACMD5(key, string);
    }
    return rawHMACMD5(key, string);
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5;
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    module.exports = md5;
  } else {
    $.md5 = md5;
  }
})(undefined);

},{}],2:[function(require,module,exports){
'use strict';

var _topNav = require('./modules/topNav');

var _marvelApi = require('./modules/marvelApi');

var _searchFilter = require('./modules/searchFilter');

var _lightBox = require('./modules/lightBox');

var _tabs = require('./modules/tabs');

var _modal = require('./modules/modal');

var _verticalMenu = require('./modules/verticalMenu');

var _btnMenu = require('./modules/btnMenu');

(function () {
	(0, _topNav.topNav)();
	(0, _lightBox.lightBox)();
	(0, _tabs.tabs)();
	(0, _modal.edModal)();
	(0, _btnMenu.btnMenu)();

	if (document.body.classList.contains('home')) {
		// functions here
	} else if (document.body.classList.contains('page2')) {
		// functions here
		(0, _searchFilter.searchFilter)();
		(0, _marvelApi.marvelApi)();
	} else if (document.body.classList.contains('page3')) {
		// functions here

	}
})();

},{"./modules/btnMenu":3,"./modules/lightBox":5,"./modules/marvelApi":6,"./modules/modal":7,"./modules/searchFilter":8,"./modules/tabs":9,"./modules/topNav":10,"./modules/verticalMenu":11}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var btnMenu = exports.btnMenu = function btnMenu() {
	var fnBtnMenu = function fnBtnMenu() {
		document.querySelector('.hamburger').addEventListener('click', function (e) {
			e.preventDefault();
			[].map.call(document.querySelectorAll('.vertical-menu-toggle'), function (el) {
				el.classList.toggle('active');
			});
		});
	};
	fnBtnMenu();
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Crear elementos con atributos e hijo
var createCustomElement = exports.createCustomElement = function createCustomElement(element, attributes, children) {
  var customElement = document.createElement(element);
  if (children !== undefined) children.forEach(function (el) {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement, attributes);
  return customElement;
};

// Añadir un objeto de atributos a un elemento
var addAttributes = exports.addAttributes = function addAttributes(element, attrObj) {
  for (var attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
  }
};

// Envolver un elemento con otro
var wrap = exports.wrap = function wrap(selector, wrapElementType, attributesObj) {
  var element = getElement(selector),
      nextSibling = element.nextElementSibling,
      parent = element.parentElement,
      wrapElement = createCustomElement(wrapElementType, attributesObj, element);

  nextSibling ? parent.insertBefore(wrapElement, nextSibling) : parent.appendChild(wrapElement);

  return wrapElement;
};

// Retornar un elemento del DOM (revisar)
var getElement = exports.getElement = function getElement(elementOrSelector) {
  var e = void 0,
      g = void 0;
  if (elementOrSelector.nodeType === 1) {
    e = elementOrSelector;
  } else {
    g = document.querySelector(elementOrSelector);
    if (document.querySelector(g)) {
      e = document.querySelector(g);
    } else {
      e = document.createElement('div');
      console.error('Function getElement() requires a DOM element\n    or a valid selector. It has been created a placeholder element to avoid\n    execution errors, please fixed as soon as posible');
    }
  }
  return e;
};

// Media queries
var mediaQuery = function mediaQuery(breakpoint, cb) {
  var isChangeSize = function isChangeSize(mql) {
    return cb(mql.matches);
  };
  breakpoint.addListener(isChangeSize);
  isChangeSize(breakpoint);
};

// From (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
var from = function from(breakpoint, cb) {
  var bp = window.matchMedia('(min-width: ' + breakpoint + ')');
  mediaQuery(bp, cb);
};

// To (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
var to = function to(breakpoint, cb) {
  var bp = window.matchMedia('(max-width: ' + breakpoint + ')');
  mediaQuery(bp, cb);
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lightBox = exports.lightBox = function lightBox() {

	// al hacer click en una imagen se abra su version grande

	// Obtener la galería de imágenes
	var getImages = function getImages(container) {
		return [].concat(_toConsumableArray(container.querySelectorAll('img')));
	};

	// Obtener un array de las rutas de las imagenes grandes
	var getLargeImages = function getLargeImages(gallery) {
		return gallery.map(function (el) {
			return el.src;
		}).map(function (el) {
			return el.replace('thumb', 'large');
		});
	};

	// Obtener las descripciones de las imágenes
	var getDescriptions = function getDescriptions(gallery) {
		return gallery.map(function (el) {
			return el.alt;
		});
	};

	// Capturar el evento click en la galería para abrir el lightbox
	var openLigthboxEvent = function openLigthboxEvent(container, gallery, larges, descriptions) {
		container.addEventListener('click', function (e) {
			var el = e.target,
			    i = gallery.indexOf(el);
			if (el.tagName === 'IMG') {
				openLightbox(gallery, i, larges, descriptions);
			}
		});
	};

	// Imprimir overlay del lightbox en el body
	var openLightbox = function openLightbox(gallery, i, larges, descriptions) {
		var lightboxElement = document.createElement('div');
		lightboxElement.innerHTML = '\n    <div class="lightbox-overlay">\n      <figure class="lightbox-container">\n        <div class="close-modal">\u2716</div>\n        <img src="' + larges[i] + '" class="ligthbox-image">\n        <figcaption>\n          <p class="lightbox-description">' + descriptions[i] + '</p>\n          <nav class="lightbox-navigation">\n            <a href="#" class="lightbox-navigation__button prev">\u25C0</a>\n            <span class="lightbox-navigation__counter">Imagen ' + (i + 1) + ' de ' + gallery.length + '</span>\n            <a href="#" class="lightbox-navigation__button next">\u25B6</a>\n          </nav>\n        </figcaption>\n      </figure>\n    </div>\n  ';
		lightboxElement.id = 'lightbox';
		document.body.appendChild(lightboxElement);
		closeModal(lightboxElement);
		navigateLightbox(lightboxElement, i, larges, descriptions);
	};

	var closeModal = function closeModal(modalElement) {
		var closeModal = modalElement.querySelector('.close-modal');
		closeModal.addEventListener('click', function (e) {
			e.preventDefault();
			document.body.removeChild(modalElement);
		});
	};

	var navigateLightbox = function navigateLightbox(lightboxElement, i, larges, descriptions) {
		var prevButton = lightboxElement.querySelector('.prev'),
		    nextButton = lightboxElement.querySelector('.next'),
		    image = lightboxElement.querySelector('img'),
		    description = lightboxElement.querySelector('p'),
		    counter = lightboxElement.querySelector('span'),
		    closeButton = lightboxElement.querySelector('.close-modal');

		window.addEventListener('keyup', function (e) {
			if (e.key === 'ArrowRight') nextButton.click();
			if (e.key === 'ArrowLeft') prevButton.click();
			if (e.key === 'Escape') closeButton.click();
		});
		lightboxElement.addEventListener('click', function (e) {
			e.preventDefault();
			var target = e.target;

			if (target === prevButton) {
				if (i > 0) {
					image.src = larges[i - 1];
					i--;
				} else {
					image.src = larges[larges.length - 1];
					i = larges.length - 1;
				}
			} else if (target === nextButton) {
				if (i < larges.length - 1) {
					image.src = larges[i + 1];
					i++;
				} else {
					image.src = larges[0];
					i = 0;
				}
			}

			description.textContent = descriptions[i];
			counter.textContent = 'Imagen ' + (i + 1) + ' de ' + larges.length;
		});
	};

	var lightbox = function lightbox(container) {
		var images = getImages(container),
		    larges = getLargeImages(images),
		    descriptions = getDescriptions(images);
		openLigthboxEvent(container, images, larges, descriptions);
	};
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.marvelApi = undefined;

var _md = require('../../../node_modules/blueimp-md5/js/md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash = (0, _md2.default)("value");

var marvelApi = exports.marvelApi = function marvelApi() {
	var privateKey = '435f8abb05853a14193201080f4a0e6ba6cb1217',
	    publicKey = 'f06f585dacbd7875721095d5d8093509',
	    content = document.getElementById('hero-grid'),
	    search = document.getElementById('search');

	// here is the method to create the connection
	var getConnection = function getConnection() {
		var ts = Date.now(),
		    hash = (0, _md2.default)(ts + privateKey + publicKey),
		    URL = 'http://gateway.marvel.com/v1/public/characters?ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
		// fetch(URL).then(response => console.log(response));
		fetch(URL).then(function (response) {
			return response.json();
		}).then(function (response) {
			response.data.results.forEach(function (e) {
				drawHero(e);
			});
		});
		// .catch(e => console.log(e));
	};

	var drawHero = function drawHero(e) {
		var heroImage = e.thumbnail.path + '/portrait_uncanny.' + e.thumbnail.extension;
		var hero = '\n\t\t\t\t<div class="hero-container__hero-item">  \n\t\t\t\t\t<h3 class="hero-container__title">' + e.name + '</h3> \n\t\t\t\t\t<img src="' + heroImage + '" class="hero-container__img">\n\t\t\t\t\t<p class="hero-container__text">' + e.description + '</p>\n\t\t\t\t</div>\n\t\t\t\t';
		content.insertAdjacentHTML('beforeEnd', hero);
	};

	var searchHero = function searchHero(name) {
		var ts = Date.now(),
		    hash = (0, _md2.default)(ts + privateKey + publicKey),
		    hero = encodeURIComponent(name),
		    URL = 'http://gateway.marvel.com/v1/public/characters?name=' + hero + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
		fetch(URL).then(function (response) {
			return response.json();
		}).then(function (response) {
			response.data.results.forEach(function (e) {
				drawHero(e);
			});
		}).catch(function (e) {
			return console.log(e);
		});
	};

	var fnSearch = function fnSearch() {
		search.addEventListener("keyup", function (e) {
			if (e.keyCode === 13) {
				content.innerHTML = '';
				searchHero(e.target.value.trim());
			}
		});
	};
	fnSearch();
	getConnection();
};

},{"../../../node_modules/blueimp-md5/js/md5":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.edModal = undefined;

var _helpers = require('./helpers');

var edModal = exports.edModal = function edModal() {
	// Imprimir modal
	var printModal = function printModal(content) {
		// crear contenedor interno
		var modalContentEl = (0, _helpers.createCustomElement)('div', {
			id: 'ed-modal-content',
			class: 'ed-modal-content'
		}, [content]),


		// crear contenedor principal
		modalContainerEl = (0, _helpers.createCustomElement)('div', {
			id: 'ed-modal-container',
			class: 'ed-modal-container'
		}, [modalContentEl]);

		// Imprimir el modal
		document.body.appendChild(modalContainerEl);

		// Remover el modal
		var removeModal = function removeModal() {
			return document.body.removeChild(modalContainerEl);
		};

		modalContainerEl.addEventListener('click', function (e) {
			if (e.target === modalContainerEl) removeModal();
		});
	};

	var saludo = '<h1>This is my Modal Component</h1>';
	document.getElementById('show-modal').addEventListener('click', function () {
		printModal(saludo);
	});
};

},{"./helpers":4}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var searchFilter = exports.searchFilter = function searchFilter() {
	// get the input data
	var fnFilter = function fnFilter(inputElement, selector, selectorContainer) {
		inputElement.addEventListener('keyup', function (e) {
			if (e.key === 'Escape') e.target.value = '';
			fnCompareElements(e.target.value.toUpperCase(), selector, selectorContainer);
		});
	};
	var fnCompareElements = function fnCompareElements(filterText, selector, selectorContainer) {
		var searchElements = document.querySelectorAll(selector);
		var searchContainers = document.querySelectorAll(selectorContainer);
		searchElements.forEach(function (el) {
			el.textContent.toUpperCase().includes(filterText) ? el.style.display = 'block' : el.style.display = 'none';
		});
		searchContainers.forEach(function (el) {
			el.textContent.toUpperCase().includes(filterText) ? el.style.display = 'block' : el.style.display = 'none';
		});
	};
	fnFilter(document.getElementById('searchInput'), '.class-item__fragment', '.class-item');
};

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var tabs = exports.tabs = function tabs() {
	var container = document.querySelector('.edui-tabs'),
	    tabsContainer = container.querySelector('.tabs'),
	    panelsContainer = container.querySelector('.panels'),
	    tabs = [].concat(_toConsumableArray(tabsContainer.querySelectorAll('.tab'))),
	    panels = [].concat(_toConsumableArray(panelsContainer.querySelectorAll('.panel')));

	tabs[0].classList.add('active');
	panels[0].classList.add('active');

	tabsContainer.addEventListener('click', function (e) {
		var t = e.target,
		    i = tabs.indexOf(t);
		if (e.target.classList.contains('tab')) {
			tabs.map(function (tab) {
				return tab.classList.remove('active');
			});
			panels.map(function (panel) {
				return panel.classList.remove('active');
			});
			t.classList.add('active');
			panels[i].classList.add('active');
		}
	});
};

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var topNav = exports.topNav = function topNav() {
	var myFunction = function myFunction() {
		document.querySelector('.hamburger').addEventListener('click', function (e) {
			e.preventDefault();
			[].map.call(document.querySelectorAll('.hamburger'), function (el) {
				el.classList.toggle('is-active');
			});
			[].map.call(document.querySelectorAll('.top-nav__menu'), function (el) {
				el.classList.toggle('show-top-nav');
			});
		});
	};
	myFunction();
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var menu = exports.menu = function menu(toggleId, navId) {
  var toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('show');
      if (navId === 'main-menu') document.body.classList.toggle('main-menu-visible');
    });
  }
};

menu('vertical-menu-toggle', 'vertical-menu');

var activeMenuItem = function activeMenuItem(containerId) {
  var links = [].concat(_toConsumableArray(document.querySelectorAll('#' + containerId + ' a')));
  var curentUrl = document.location.href;
  links.map(function (link) {
    if (link.href === curentUrl) {
      link.classList.add('active');
    }
  });
};

activeMenuItem('vertical-menu');

},{}]},{},[2]);

//# sourceMappingURL=scripts-min.js.map
