"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/address/[address]",{

/***/ "./src/pages/address/[address].js":
/*!****************************************!*\
  !*** ./src/pages/address/[address].js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../header */ \"./src/pages/header.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../token */ \"./src/pages/token.js\");\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../wallet */ \"./src/pages/wallet.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__]);\n([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction AddressPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const { address  } = router.query;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                updatedAddress: handleAddressUpdate\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 15,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"tokenList\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_wallet__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                    stakeAddress: stake\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                    lineNumber: 16,\n                    columnNumber: 36\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 16,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n        lineNumber: 14,\n        columnNumber: 7\n    }, this);\n}\n_s(AddressPage, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = AddressPage;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AddressPage);\nvar _c;\n$RefreshReg$(_c, \"AddressPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYWRkcmVzcy9bYWRkcmVzc10uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ0k7QUFDYjtBQUNGO0FBQ0U7QUFHL0IsU0FBU00sY0FBYzs7SUFFbkIsTUFBTUMsU0FBU1Asc0RBQVNBO0lBQ3hCLE1BQU0sRUFBRVEsUUFBTyxFQUFFLEdBQUdELE9BQU9FLEtBQUs7SUFFaEMscUJBQ0UsOERBQUNDOzswQkFDQyw4REFBQ1AsK0NBQU1BO2dCQUFDUSxnQkFBZ0JDOzs7Ozs7MEJBQ3hCLDhEQUFDRjtnQkFBSUcsV0FBVTswQkFBWSw0RUFBQ1IsK0NBQU1BO29CQUFDUyxjQUFjQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHekQ7R0FYU1Q7O1FBRVVOLGtEQUFTQTs7O0tBRm5CTTs7QUFvQ1AsK0RBQWVBLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2FkZHJlc3MvW2FkZHJlc3NdLmpzP2UwYWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuLi9oZWFkZXJcIjtcbmltcG9ydCBUb2tlbiBmcm9tIFwiLi4vdG9rZW5cIjtcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4uL3dhbGxldFwiO1xuXG5cbmZ1bmN0aW9uIEFkZHJlc3NQYWdlKCkge1xuXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gICAgY29uc3QgeyBhZGRyZXNzIH0gPSByb3V0ZXIucXVlcnk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlYWRlciB1cGRhdGVkQWRkcmVzcz17aGFuZGxlQWRkcmVzc1VwZGF0ZX0vPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRva2VuTGlzdFwiPjxXYWxsZXQgc3Rha2VBZGRyZXNzPXtzdGFrZX0vPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgZHluYW1pYyBwYXRocyBmb3IgdGhlIHBhZ2UuXG4gICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBoYXZlIGEgbGlzdCBvZiBhbGwgcG9zc2libGUgbnVtYmVycyBiZXR3ZWVuIDEgYW5kIDUgdGhhdCB3ZSBjYW4gdXNlIHRvIGNyZWF0ZSB0aGUgcGF0aHNcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aHM6IFtdLFxuICAgICAgZmFsbGJhY2s6IHRydWVcbiAgICB9O1xuICB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyh7IHBhcmFtcyB9KSB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBmZXRjaGVzIHRoZSBkYXRhIGZvciB0aGUgcGFnZS5cbiAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIGRvbid0IG5lZWQgdG8gZmV0Y2ggYW55IGRhdGEgYmVjYXVzZSB0aGUgbnVtYmVyIGlzIGFscmVhZHkgYXZhaWxhYmxlIGluIHRoZSBwYXJhbXMgb2JqZWN0LlxuICAgIGxldCBhZGRyZXNzID0gcGFyYW1zLmFkZHJlc3M7XG4gIFxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBhZGRyZXNzXG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgZGVmYXVsdCBBZGRyZXNzUGFnZTsiXSwibmFtZXMiOlsidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJIZWFkZXIiLCJUb2tlbiIsIldhbGxldCIsIkFkZHJlc3NQYWdlIiwicm91dGVyIiwiYWRkcmVzcyIsInF1ZXJ5IiwiZGl2IiwidXBkYXRlZEFkZHJlc3MiLCJoYW5kbGVBZGRyZXNzVXBkYXRlIiwiY2xhc3NOYW1lIiwic3Rha2VBZGRyZXNzIiwic3Rha2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/address/[address].js\n"));

/***/ })

});