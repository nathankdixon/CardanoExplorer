"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/[address]",{

/***/ "./src/pages/nfts.js":
/*!***************************!*\
  !*** ./src/pages/nfts.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Nfts; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nfunction Nfts(param) {\n    let { tokens  } = param;\n    _s();\n    const [display, setDisplay] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        if (tokens != null) {\n            let nfts = tokens.nfts;\n            showTokens(nfts);\n        }\n    }, [\n        tokens\n    ]);\n    const showTokens = (tokens)=>{\n        if (tokens == null) {\n        //base\n        } else {\n            let _display = [];\n            let policies = Object.keys(tokens);\n            for (const policy of policies){\n                let token = tokens[policy][0];\n                let name = token.metadata.name;\n                let collection = \"\";\n                if (token.metadata.collection != null) {\n                    collection = token.metadata.collection;\n                } else if (token.metadata.Collection != null) {\n                    collection = token.metadata.Collection;\n                } else if (token.metadata.project != null) {\n                    collection = token.metadata.project;\n                } else if (token.metadata.Project != null) {\n                    collection = token.metadata.Project;\n                } else {\n                    console.log(token);\n                }\n                if (tokens[policy].length > 1) {\n                    _display.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"grid-item-collection\",\n                        onClick: ()=>showTokensFromPolicy(tokens[policy]),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                className: \"grid-img\",\n                                src: token.ipfs,\n                                alt: \"failed to load image\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 50,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"grid-item-title\",\n                                children: name\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 51,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"grid-item-text\",\n                                children: collection\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 52,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"grid-item-text\",\n                                children: [\n                                    \"Quantity: \",\n                                    tokens[policy].length\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 53,\n                                columnNumber: 17\n                            }, this)\n                        ]\n                    }, token.asset_name + \"nft\", true, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                        lineNumber: 49,\n                        columnNumber: 13\n                    }, this));\n                } else {\n                    _display.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"grid-item\",\n                        onClick: ()=>router.push(\"/token/\" + token.policy_id + token.asset_name),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                className: \"grid-img\",\n                                src: token.ipfs,\n                                alt: \"failed to load image\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 59,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"grid-item-info\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"grid-item-title\",\n                                        children: name\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                        lineNumber: 61,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"grid-item-text\",\n                                        children: collection\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                        lineNumber: 62,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"grid-item-text\",\n                                        children: [\n                                            \"Quantity: \",\n                                            tokens[policy].length\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                        lineNumber: 63,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 60,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, token.asset_name + \"nft\", true, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                        lineNumber: 58,\n                        columnNumber: 13\n                    }, this));\n                }\n            }\n            setDisplay(_display);\n        }\n    };\n    function showTokensFromPolicy(policy) {\n        let _display = [];\n        for (const token of policy){\n            let name = token.metadata.name;\n            let collection = \"\";\n            if (token.metadata.collection != null) {\n                collection = token.metadata.collection;\n            } else if (token.metadata.Collection != null) {\n                collection = token.metadata.Collection;\n            } else if (token.metadata.project != null) {\n                collection = token.metadata.project;\n            } else if (token.metadata.Project != null) {\n                collection = token.metadata.Project;\n            } else {\n                console.log(token);\n            }\n            _display.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid-item\",\n                onClick: ()=>router.push(\"/token/\" + token.policy_id + token.asset_name),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        className: \"grid-img\",\n                        src: token.ipfs,\n                        alt: \"failed to load image\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                        lineNumber: 103,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"grid-item-info\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"grid-item-title\",\n                                children: name\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 106,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"grid-item-text\",\n                                children: collection\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                                lineNumber: 107,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                        lineNumber: 105,\n                        columnNumber: 13\n                    }, this)\n                ]\n            }, token.asset_name + \"poly\", true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                lineNumber: 102,\n                columnNumber: 11\n            }, this));\n        }\n        setDisplay(_display);\n    }\n    //returns a grid view of all NFTs grouped by policy\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: \"setting-button\",\n                    onClick: ()=>showTokens(tokens.nfts),\n                    children: \"Show All\"\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                    lineNumber: 117,\n                    columnNumber: 14\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                lineNumber: 117,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid-nft\",\n                children: display\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n                lineNumber: 118,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/nfts.js\",\n        lineNumber: 116,\n        columnNumber: 7\n    }, this);\n}\n_s(Nfts, \"TdQcjU6l/UJHsbfeJC//FZ+coQc=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Nfts;\nvar _c;\n$RefreshReg$(_c, \"Nfts\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztlQUx4QkgsTUFBTWtCLFVBQVUsR0FBRzs7Ozs7UUFRakM7UUFDQTNCLFdBQVdJO0lBQ2Y7SUFFQSxtREFBbUQ7SUFDbkQscUJBQ0UsOERBQUNnQjs7MEJBQ0MsOERBQUNVOzBCQUFJLDRFQUFDQztvQkFBT1YsV0FBVTtvQkFBaUJDLFNBQVMsSUFBTW5CLFdBQVdMLE9BQU9JLElBQUk7OEJBQUc7Ozs7Ozs7Ozs7OzBCQUNoRiw4REFBQ2tCO2dCQUFJQyxXQUFVOzBCQUFZdEI7Ozs7Ozs7Ozs7OztBQUluQyxDQUFDO0dBckh1QkY7O1FBR0xILGtEQUFTQTs7O0tBSEpHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9uZnRzLmpzPzRmY2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmZ0cyAoe3Rva2Vuc30pe1xuXG4gICAgY29uc3QgW2Rpc3BsYXksIHNldERpc3BsYXldID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGlmKHRva2VucyAhPSBudWxsKXtcbiAgICAgICAgbGV0IG5mdHMgPSB0b2tlbnMubmZ0cztcbiAgICAgICAgc2hvd1Rva2VucyhuZnRzKTtcblxuICAgICAgfVxuICAgIH0sIFt0b2tlbnNdKTtcblxuICAgIGNvbnN0IHNob3dUb2tlbnMgPSAodG9rZW5zKSA9PiB7XG4gICAgICBpZih0b2tlbnMgPT0gbnVsbCl7XG4gICAgICAgIC8vYmFzZVxuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgbGV0IF9kaXNwbGF5ID0gW107XG4gICAgICAgIGxldCBwb2xpY2llcyA9IE9iamVjdC5rZXlzKHRva2Vucyk7XG4gICAgICAgIGZvcihjb25zdCBwb2xpY3kgb2YgcG9saWNpZXMpe1xuICAgICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1twb2xpY3ldWzBdO1xuXG4gICAgICAgICAgbGV0IG5hbWUgPSB0b2tlbi5tZXRhZGF0YS5uYW1lO1xuICAgICAgICAgIGxldCBjb2xsZWN0aW9uID0gJyc7XG5cbiAgICAgICAgICBpZih0b2tlbi5tZXRhZGF0YS5jb2xsZWN0aW9uICE9IG51bGwpe1xuICAgICAgICAgICAgY29sbGVjdGlvbiA9IHRva2VuLm1ldGFkYXRhLmNvbGxlY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYodG9rZW4ubWV0YWRhdGEuQ29sbGVjdGlvbiAhPSBudWxsKXtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSB0b2tlbi5tZXRhZGF0YS5Db2xsZWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmKHRva2VuLm1ldGFkYXRhLnByb2plY3QgIT0gbnVsbCl7XG4gICAgICAgICAgICBjb2xsZWN0aW9uID0gdG9rZW4ubWV0YWRhdGEucHJvamVjdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZih0b2tlbi5tZXRhZGF0YS5Qcm9qZWN0ICE9IG51bGwpe1xuICAgICAgICAgICAgY29sbGVjdGlvbiA9IHRva2VuLm1ldGFkYXRhLlByb2plY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYodG9rZW5zW3BvbGljeV0ubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICBfZGlzcGxheS5wdXNoKFxuICAgICAgICAgICAgPGRpdiBrZXkgPSB7dG9rZW4uYXNzZXRfbmFtZSArICduZnQnfSBjbGFzc05hbWUgPSBcImdyaWQtaXRlbS1jb2xsZWN0aW9uXCIgb25DbGljayA9IHsoKSA9PiBzaG93VG9rZW5zRnJvbVBvbGljeSh0b2tlbnNbcG9saWN5XSl9PlxuICAgICAgICAgICAgICA8SW1hZ2UgY2xhc3NOYW1lPVwiZ3JpZC1pbWdcIiBzcmM9e3Rva2VuLmlwZnN9IGFsdCA9ICdmYWlsZWQgdG8gbG9hZCBpbWFnZScvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZC1pdGVtLXRpdGxlXCI+e25hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkLWl0ZW0tdGV4dFwiPntjb2xsZWN0aW9ufTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZC1pdGVtLXRleHRcIj5RdWFudGl0eToge3Rva2Vuc1twb2xpY3ldLmxlbmd0aH08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIF9kaXNwbGF5LnB1c2goXG4gICAgICAgICAgICA8ZGl2IGtleSA9IHt0b2tlbi5hc3NldF9uYW1lICsgJ25mdCd9IGNsYXNzTmFtZSA9IFwiZ3JpZC1pdGVtXCIgb25DbGljayA9IHsoKSA9PiByb3V0ZXIucHVzaCgnL3Rva2VuLycrdG9rZW4ucG9saWN5X2lkK3Rva2VuLmFzc2V0X25hbWUpfT5cbiAgICAgICAgICAgICAgPEltYWdlIGNsYXNzTmFtZT0nZ3JpZC1pbWcnIHNyYz17dG9rZW4uaXBmc30gYWx0ID0gJ2ZhaWxlZCB0byBsb2FkIGltYWdlJy8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZC1pdGVtLWluZm9cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQtaXRlbS10aXRsZVwiPntuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZC1pdGVtLXRleHRcIiA+e2NvbGxlY3Rpb259PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkLWl0ZW0tdGV4dFwiID5RdWFudGl0eToge3Rva2Vuc1twb2xpY3ldLmxlbmd0aH08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2Pik7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHNldERpc3BsYXkoX2Rpc3BsYXkpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1Rva2Vuc0Zyb21Qb2xpY3kocG9saWN5KXtcbiAgICAgICAgbGV0IF9kaXNwbGF5ID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IoY29uc3QgdG9rZW4gb2YgcG9saWN5KXtcblxuICAgICAgICAgIGxldCBuYW1lID0gdG9rZW4ubWV0YWRhdGEubmFtZTtcbiAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9ICcnO1xuXG4gICAgICAgICAgaWYodG9rZW4ubWV0YWRhdGEuY29sbGVjdGlvbiAhPSBudWxsKXtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSB0b2tlbi5tZXRhZGF0YS5jb2xsZWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmKHRva2VuLm1ldGFkYXRhLkNvbGxlY3Rpb24gIT0gbnVsbCl7XG4gICAgICAgICAgICBjb2xsZWN0aW9uID0gdG9rZW4ubWV0YWRhdGEuQ29sbGVjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZih0b2tlbi5tZXRhZGF0YS5wcm9qZWN0ICE9IG51bGwpe1xuICAgICAgICAgICAgY29sbGVjdGlvbiA9IHRva2VuLm1ldGFkYXRhLnByb2plY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYodG9rZW4ubWV0YWRhdGEuUHJvamVjdCAhPSBudWxsKXtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSB0b2tlbi5tZXRhZGF0YS5Qcm9qZWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgX2Rpc3BsYXkucHVzaChcbiAgICAgICAgICA8ZGl2IGtleSA9IHt0b2tlbi5hc3NldF9uYW1lICsgJ3BvbHknfSBjbGFzc05hbWUgPSBcImdyaWQtaXRlbVwiIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKCcvdG9rZW4vJyt0b2tlbi5wb2xpY3lfaWQrdG9rZW4uYXNzZXRfbmFtZSl9PlxuICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJncmlkLWltZ1wiIHNyYz0ge3Rva2VuLmlwZnN9XG4gICAgICAgICAgYWx0ID0gJ2ZhaWxlZCB0byBsb2FkIGltYWdlJy8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQtaXRlbS1pbmZvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQtaXRlbS10aXRsZVwiPntuYW1lfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkLWl0ZW0tdGV4dFwiID57Y29sbGVjdGlvbn08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgfVxuICAgICAgICBzZXREaXNwbGF5KF9kaXNwbGF5KTtcbiAgICB9XG5cbiAgICAvL3JldHVybnMgYSBncmlkIHZpZXcgb2YgYWxsIE5GVHMgZ3JvdXBlZCBieSBwb2xpY3lcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPG5hdj48YnV0dG9uIGNsYXNzTmFtZT1cInNldHRpbmctYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2hvd1Rva2Vucyh0b2tlbnMubmZ0cyl9PlNob3cgQWxsPC9idXR0b24+PC9uYXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZC1uZnRcIj57ZGlzcGxheX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgKVxufSJdLCJuYW1lcyI6WyJJbWFnZSIsInVzZVJvdXRlciIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTmZ0cyIsInRva2VucyIsImRpc3BsYXkiLCJzZXREaXNwbGF5Iiwicm91dGVyIiwibmZ0cyIsInNob3dUb2tlbnMiLCJfZGlzcGxheSIsInBvbGljaWVzIiwiT2JqZWN0Iiwia2V5cyIsInBvbGljeSIsInRva2VuIiwibmFtZSIsIm1ldGFkYXRhIiwiY29sbGVjdGlvbiIsIkNvbGxlY3Rpb24iLCJwcm9qZWN0IiwiUHJvamVjdCIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJwdXNoIiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsInNob3dUb2tlbnNGcm9tUG9saWN5Iiwic3JjIiwiaXBmcyIsImFsdCIsImFzc2V0X25hbWUiLCJwb2xpY3lfaWQiLCJpbWciLCJuYXYiLCJidXR0b24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/nfts.js\n"));

/***/ })

});