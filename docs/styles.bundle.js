webpackJsonp(["styles"],{

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./src/styles.css":
/***/ (function(module, exports) {

module.exports = "/* You can add global styles to this file, and also import other style files */\n/* Baseline Normalize\n--------------------------------------------- */\n/* normalize.css v3.0.1 | MIT License | git.io/normalize */\nhtml{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}\nbody{margin:0}\narticle,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}\naudio,canvas,progress,video{display:inline-block;vertical-align:baseline}\naudio:not([controls]){display:none;height:0}\n[hidden],template{display:none}\na{background:0 0}\na:active,a:hover{outline:0}\nabbr[title]{border-bottom:1px dotted}\nb,strong{font-weight:600}\ndfn{font-style:italic}\nh1{font-size:2em;margin:.67em 0}\nmark{background:#ff0;color:#333}\nsmall{font-size:80%}\nsub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}\nsup{top:-.5em}\nsub{bottom:-.25em}\nimg{border:0}\nsvg:not(:root){overflow:hidden}\nfigure{margin:1em 40px}\nhr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0}\npre{overflow:auto}\ncode,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}\nbutton,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}\nbutton{overflow:visible}\nbutton,select{text-transform:none}\nbutton,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}\nbutton[disabled],html input[disabled]{cursor:default}\nbutton::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}\ninput{line-height:normal}\ninput[type=checkbox],input[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}\ninput[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}\ninput[type=search]{-webkit-appearance:textfield;-webkit-box-sizing:content-box;box-sizing:content-box}\ninput[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}\nfieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}\nlegend{border:0;padding:0}\ntextarea{overflow:auto}\noptgroup{font-weight:600}\ntable{border-collapse:collapse;border-spacing:0}\ntd,th{padding:0}\n:root {\n  --light-gray-color: #f5f5f5;\n  --footer-height: 120px;\n}\n* {\n  margin: 0;\n  padding: 0;\n}\nhtml,\nbody {\n  height: 100%;\n  background-color: var(--light-gray-color);\n}\nbody {\n   font-family: \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;\n   font-weight: 300;\n}\nimg.center {\n  margin: auto;\n  display: block;\n}\n.hidden {\n    display: none;\n}\n.clearfix::after {\n    content: \"\";\n    clear: both;\n    display: table;\n}\n.float-right {\n  float: right;\n}\n.float-left {\n  float: left;\n}\n.container {\n  width: 100%;\n}\n.col-9 {\n  width: 90%;\n}\n.col-6 {\n  width: 60%;\n}\n.col-4 {\n  width: 40%;\n}\n.padding-xl {\n  padding: 50px;\n}\n.padding-lg {\n  padding: 30px;\n}\n.padding-md {\n  padding: 20px;\n}\n.padding-sm {\n  padding: 10px;\n}\n.padding-top-lg {\n  padding-top: 30px;\n}\n.padding-top-md {\n  padding-top: 20px;\n}\n.padding-top-sm {\n  padding-top: 10px;\n}\n.padding-bottom-lg {\n  padding-bottom: 30px;\n}\n.padding-bottom-md {\n  padding-bottom: 20px;\n}\n.padding-v-lg {\n  padding-top: 30px;\n  padding-bottom: 30px;\n}\n.padding-v-md {\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.padding-v-sm {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.padding-h-sm {\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.margin-top-md {\n  margin-top: 20px;\n}\n.margin-md {\n  margin: 20px;\n}\n.margin-v-sm {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.text-sm {\n  font-size: 12px;\n}\n.text-md {\n  font-size: 18px;\n}\n.text-white {\n  color: white;\n}\n.bold {\n  font-size: 20px;\n  font-weight: 600;\n}\n.brand-blue {\n  background-color: #6baacc;\n\n}\n.text-brand-blue {\n  color: #6baacc;\n}\n.border-bottom {\n  border-bottom: 2px solid #d9d9d9;\n}\n.content {\n  background-color: white;\n  -webkit-box-shadow: 0px 0px 30px 3px rgba(109, 109, 109, 0.1);\n          box-shadow: 0px 0px 30px 3px rgba(109, 109, 109, 0.1);\n  position: relative;\n  padding: 50px;\n  min-height: 350px;\n  font-size: 25px;\n  font-weight: 100;\n}\nspan {\n  display: block;\n}\nspan.inline {\n  display: inline;\n}\nli {\n  list-style-type: none;\n  display: inline;\n}\ninput {\n  font-size: medium;\n  padding: 7px;\n  text-indent: 10px;\n  line-height: 1.5em;\n}\ninput.form-control {\n  margin-top: 20px;\n  min-width: 600px;\n}\n.form-control.half {\n  min-width: 300px;\n}\n@media screen and (max-width: 992px) {\n  input.form-control, input.form-control.half {\n    min-width: 100%;\n  }\n}\nbutton.form-control {\n  width: 165px;\n  padding: 10px;\n  background-color: #3f819e;\n  color: white;\n  font-size: 20px;\n  font-weight: 400;\n  border-radius: 10px;\n  margin: 20px;\n}\nbutton.form-control2 {\n  width: 165px;\n  padding: 10px;\n  background-color: #3f819e;\n  color: white;\n  font-size: 20px;\n  font-weight: 400;\n  border-radius: 10px;\n  margin: 5px;\n}\n.editing {\n  background-color: #d9d9d9;\n  padding-left: 30px;\n  margin-top: 15px;\n}\n::-webkit-input-placeholder,\n::-moz-placeholder,\n:-ms-input-placeholder,\n:-moz-placeholder {\n  font-size: medium;\n  font-style: italic!important;\n  color: #6b6b6b;\n  padding: 7px;\n  text-indent: 10px;\n  line-height: 1.5em;\n}\n.text-center {\n  text-align: center;\n}\n.text-right {\n  text-align: right;\n}\n.text-bold {\n  font-weight: 700;\n}\n.font-lg {\n  font-size: 30pt;\n}\n.clickable {\n  color: #3f819e;\n  font-size: 20px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.clickable.active {\n  color: white;\n  background-color: #3f819e;\n  border-radius: 50px;\n  padding: 4px 10px;\n}\n.can-click {\n  cursor: pointer;\n}\ndiv.disabled {\n  color: lightgray;\n}\ndiv.disabled button.form-control{\n  background-color: lightgray;\n}\n.flexContainer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  border: 1px solid grey;\n  padding: 0px;\n  width: 175px;\n  height: 30px;\n  margin: 1px;\n  border-radius: 10px;\n}\n.flexContainer input {\n  -webkit-box-flex: 2;\n      -ms-flex-positive: 2;\n          flex-grow: 2;\n  border: none;\n  width: 68px;\n    border-radius: 10px 0px 0px 10px\n}\n.flexContainer button {\n  border: 1px solid #3f819e;\n  background: #3f819e;\n  color: white;\n  font-size: 20px;\n  padding: 5px;\n  border-radius: 0px 10px 10px 0px;\n}\n.warning {\n  color: red;\n  font-style: italic;\n  font-weight: 600;\n  font-size: 20px;\n}\n.data-warning {\n    width: 400px;\n    padding: 20px;\n    vertical-align: middle;\n    text-align: center;\n    font-size: 10pt;\n    color: darkred;\n    margin: auto;\n    font-weight: normal;\n    background-color: lightgray;\n    border: gray dotted;\n}\n.text-sm{\n  font-size: 16px\n}\n"

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./src/styles.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/raw-loader/index.js!../node_modules/postcss-loader/lib/index.js??embedded!./styles.css", function() {
			var newContent = require("!!../node_modules/raw-loader/index.js!../node_modules/postcss-loader/lib/index.js??embedded!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/styles.css");


/***/ })

},[6]);
//# sourceMappingURL=styles.bundle.js.map