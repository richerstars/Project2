/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/Registration/style.css":
/*!******************************************!*\
  !*** ./src/pages/Registration/style.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-2/./src/pages/Registration/style.css?");

/***/ }),

/***/ "./src/pages/Registration/app.js":
/*!***************************************!*\
  !*** ./src/pages/Registration/app.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/pages/Registration/style.css\");\n\r\n\r\nconst form = document.getElementById('form');\r\nconst username = document.getElementById('username');\r\nconst email = document.getElementById('email');\r\nconst password = document.getElementById('password');\r\n\r\nform.addEventListener('submit', e => {\r\n\te.preventDefault();\r\n\t\r\n\tcheckInputs();\r\n});\r\n\r\nfunction checkInputs() {\r\n\tconst usernameValue = username.value.trim();\r\n\tconst passwordValue = password.value.trim();\r\n    console.log(!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i));\r\n\tif(usernameValue === '') {\r\n\t\tsetErrorFor(username, 'Username cannot be blank');\r\n\t} else if (!usernameValue[0].match(/[a-zA-Z]/i)) {\r\n\t\tsetErrorFor(username, 'Login must starts with a letter');\r\n\t} else if (!!usernameValue.match(/[^a-zA-Z0-9]/i)) {\r\n    setErrorFor(username, 'Login must contains only letters and numbers');\r\n    } else {\r\n        setSuccessFor(username)\r\n    }\r\n\r\n\tif(passwordValue === '') {\r\n\t\tsetErrorFor(password, 'Password cannot be blank');\r\n\t} else if (!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i)) {\r\n        setErrorFor(password, 'Password must have at least one letter and one number');\r\n\t} else if (passwordValue.length < 8 ) {\r\n        setErrorFor(password, 'Password must have minimum eight characters')\r\n    } else {\r\n        setSuccessFor(password)\r\n    }\r\n\r\n\r\nfunction setErrorFor(input, message) {\r\n\tconst formControl = input.parentElement;\r\n\tconst small = formControl.querySelector('small');\r\n\tformControl.className = 'form-control error';\r\n\tsmall.innerText = message;\r\n}\r\n\r\nfunction setSuccessFor(input) {\r\n\tconst formControl = input.parentElement;\r\n\tformControl.className = 'form-control success';\r\n}\r\n}\r\n\n\n//# sourceURL=webpack://project-2/./src/pages/Registration/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/Registration/app.js");
/******/ 	
/******/ })()
;