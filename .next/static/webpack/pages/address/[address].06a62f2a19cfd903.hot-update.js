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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../header */ \"./src/pages/header.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../token */ \"./src/pages/token.js\");\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../wallet */ \"./src/pages/wallet.js\");\n/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/next/dist/compiled/buffer/index.js\")[\"Buffer\"];\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__]);\n([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction AddressPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const { address  } = router.query;\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const getAddressFromHanle = ()=>{\n            if (address == null) {\n                console.log(\"address was null\");\n            } else {\n                if (address.startsWith(\"$\")) {\n                    let handle = address.slice(1);\n                    console.log(handle);\n                }\n            }\n        };\n    });\n    const geetAddressFromHandle = async (handle)=>{\n        let policyID = \"f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a\";\n        // A blank Handle name should always be ignored.\n        if (handle.length === 0) {\n        // Handle error.\n        }\n        // Convert handleName to hex encoding.\n        let assetName = Buffer.from(handle).toString(\"hex\");\n        const data = await fetch(\"https://cardano-mainnet.blockfrost.io/api/v0/assets/\".concat(policyID).concat(assetName, \"/addresses\"), {\n            headers: {\n                // Your Blockfrost API key\n                project_id: \"mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh\",\n                \"Content-Type\": \"application/json\"\n            }\n        }).then((res)=>res.json());\n        let stake = await getStakeFromAddressKoios(data[0].address);\n        return stake;\n    };\n    const handleAddressUpdate = (newAddress)=>{\n        router.push(\"/address/\" + newAddress);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                updatedAddress: handleAddressUpdate\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 59,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"tokenList\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_wallet__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                    stakeAddress: address\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                    lineNumber: 60,\n                    columnNumber: 36\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 60,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n        lineNumber: 58,\n        columnNumber: 7\n    }, this);\n}\n_s(AddressPage, \"vQduR7x+OPXj6PSmJyFnf+hU7bg=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = AddressPage;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AddressPage);\nvar _c;\n$RefreshReg$(_c, \"AddressPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYWRkcmVzcy9bYWRkcmVzc10uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNJO0FBQ2I7QUFDRjtBQUNFO0FBRy9CLFNBQVNNLGNBQWM7O0lBRW5CLE1BQU1DLFNBQVNQLHNEQUFTQTtJQUN4QixNQUFNLEVBQUVRLFFBQU8sRUFBRSxHQUFHRCxPQUFPRSxLQUFLO0lBRWhDUixnREFBU0EsQ0FBQyxJQUFNO1FBQ2QsTUFBTVMsc0JBQXNCLElBQU07WUFDaEMsSUFBR0YsV0FBVyxJQUFJLEVBQUM7Z0JBQ2pCRyxRQUFRQyxHQUFHLENBQUM7WUFDZCxPQUNJO2dCQUNGLElBQUdKLFFBQVFLLFVBQVUsQ0FBQyxNQUFLO29CQUN6QixJQUFJQyxTQUFTTixRQUFRTyxLQUFLLENBQUM7b0JBQzNCSixRQUFRQyxHQUFHLENBQUNFO2dCQUNkLENBQUM7WUFDSCxDQUFDO1FBQ0g7SUFDRjtJQUVBLE1BQU1FLHdCQUF3QixPQUFPRixTQUFXO1FBQzlDLElBQUlHLFdBQVc7UUFFZixnREFBZ0Q7UUFDaEQsSUFBSUgsT0FBT0ksTUFBTSxLQUFLLEdBQUc7UUFDdkIsZ0JBQWdCO1FBQ2xCLENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSUMsWUFBWUMsTUFBTUEsQ0FBQ0MsSUFBSSxDQUFDUCxRQUFRUSxRQUFRLENBQUM7UUFFN0MsTUFBTUMsT0FBTyxNQUFNQyxNQUNqQix1REFBa0VMLE9BQVhGLFVBQXFCLE9BQVZFLFdBQVUsZUFDNUU7WUFDRU0sU0FBUztnQkFDUCwwQkFBMEI7Z0JBQzFCQyxZQUFZO2dCQUNaLGdCQUFnQjtZQUNsQjtRQUNGLEdBQ0FDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBT0EsSUFBSUMsSUFBSTtRQUV0QixJQUFJQyxRQUFRLE1BQU1DLHlCQUF5QlIsSUFBSSxDQUFDLEVBQUUsQ0FBQ2YsT0FBTztRQUMxRCxPQUFPc0I7SUFDVDtJQUVBLE1BQU1FLHNCQUFzQixDQUFDQyxhQUFlO1FBQzFDMUIsT0FBTzJCLElBQUksQ0FBQyxjQUFZRDtJQUMxQjtJQUVBLHFCQUNFLDhEQUFDRTs7MEJBQ0MsOERBQUNoQywrQ0FBTUE7Z0JBQUNpQyxnQkFBZ0JKOzs7Ozs7MEJBQ3hCLDhEQUFDRztnQkFBSUUsV0FBVTswQkFBWSw0RUFBQ2hDLCtDQUFNQTtvQkFBQ2lDLGNBQWM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHekQ7R0F2RFNGOztRQUVVTixrREFBU0E7OztLQUZuQk07O0FBaUZQLCtEQUFlQSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9hZGRyZXNzL1thZGRyZXNzXS5qcz9lMGFhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vaGVhZGVyXCI7XG5pbXBvcnQgVG9rZW4gZnJvbSBcIi4uL3Rva2VuXCI7XG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuLi93YWxsZXRcIjtcblxuXG5mdW5jdGlvbiBBZGRyZXNzUGFnZSgpIHtcblxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICAgIGNvbnN0IHsgYWRkcmVzcyB9ID0gcm91dGVyLnF1ZXJ5O1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGdldEFkZHJlc3NGcm9tSGFubGUgPSAoKSA9PiB7XG4gICAgICAgIGlmKGFkZHJlc3MgPT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZHJlc3Mgd2FzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgIGlmKGFkZHJlc3Muc3RhcnRzV2l0aCgnJCcpKXtcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSBhZGRyZXNzLnNsaWNlKDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaGFuZGxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgZ2VldEFkZHJlc3NGcm9tSGFuZGxlID0gYXN5bmMgKGhhbmRsZSkgPT4ge1xuICAgICAgbGV0IHBvbGljeUlEID0gJ2YwZmY0OGJiYjdiYmU5ZDU5YTQwZjFjZTkwZTllOWQwZmY1MDAyZWM0OGYyMzJiNDljYTBmYjlhJztcbiAgICAgIFxuICAgICAgLy8gQSBibGFuayBIYW5kbGUgbmFtZSBzaG91bGQgYWx3YXlzIGJlIGlnbm9yZWQuXG4gICAgICBpZiAoaGFuZGxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBIYW5kbGUgZXJyb3IuXG4gICAgICB9XG4gICAgXG4gICAgICAvLyBDb252ZXJ0IGhhbmRsZU5hbWUgdG8gaGV4IGVuY29kaW5nLlxuICAgICAgbGV0IGFzc2V0TmFtZSA9IEJ1ZmZlci5mcm9tKGhhbmRsZSkudG9TdHJpbmcoJ2hleCcpO1xuICAgIFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9jYXJkYW5vLW1haW5uZXQuYmxvY2tmcm9zdC5pby9hcGkvdjAvYXNzZXRzLyR7cG9saWN5SUR9JHthc3NldE5hbWV9L2FkZHJlc3Nlc2AsXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAvLyBZb3VyIEJsb2NrZnJvc3QgQVBJIGtleVxuICAgICAgICAgICAgcHJvamVjdF9pZDogJ21haW5uZXRvVzYxWVlTaU9vTFNhTlE2ZHpUcmtBRzRhelhWSXJ2aCcsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xuICAgICAgXG4gICAgICBsZXQgc3Rha2UgPSBhd2FpdCBnZXRTdGFrZUZyb21BZGRyZXNzS29pb3MoZGF0YVswXS5hZGRyZXNzKTtcbiAgICAgIHJldHVybiBzdGFrZTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVBZGRyZXNzVXBkYXRlID0gKG5ld0FkZHJlc3MpID0+IHtcbiAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy9gK25ld0FkZHJlc3MpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SGVhZGVyIHVwZGF0ZWRBZGRyZXNzPXtoYW5kbGVBZGRyZXNzVXBkYXRlfS8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9rZW5MaXN0XCI+PFdhbGxldCBzdGFrZUFkZHJlc3M9e2FkZHJlc3N9Lz48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUGF0aHMoKSB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBkeW5hbWljIHBhdGhzIGZvciB0aGUgcGFnZS5cbiAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIGhhdmUgYSBsaXN0IG9mIGFsbCBwb3NzaWJsZSBudW1iZXJzIGJldHdlZW4gMSBhbmQgNSB0aGF0IHdlIGNhbiB1c2UgdG8gY3JlYXRlIHRoZSBwYXRoc1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBwYXRoczogW10sXG4gICAgICBmYWxsYmFjazogdHJ1ZVxuICAgIH07XG4gIH1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKHsgcGFyYW1zIH0pIHtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGZldGNoZXMgdGhlIGRhdGEgZm9yIHRoZSBwYWdlLlxuICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgZG9uJ3QgbmVlZCB0byBmZXRjaCBhbnkgZGF0YSBiZWNhdXNlIHRoZSBudW1iZXIgaXMgYWxyZWFkeSBhdmFpbGFibGUgaW4gdGhlIHBhcmFtcyBvYmplY3QuXG4gICAgY29uc3QgYWRkcmVzcyA9IHBhcmFtcy5hZGRyZXNzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGFkZHJlc3NcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGV4cG9ydCBkZWZhdWx0IEFkZHJlc3NQYWdlOyJdLCJuYW1lcyI6WyJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkhlYWRlciIsIlRva2VuIiwiV2FsbGV0IiwiQWRkcmVzc1BhZ2UiLCJyb3V0ZXIiLCJhZGRyZXNzIiwicXVlcnkiLCJnZXRBZGRyZXNzRnJvbUhhbmxlIiwiY29uc29sZSIsImxvZyIsInN0YXJ0c1dpdGgiLCJoYW5kbGUiLCJzbGljZSIsImdlZXRBZGRyZXNzRnJvbUhhbmRsZSIsInBvbGljeUlEIiwibGVuZ3RoIiwiYXNzZXROYW1lIiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwiZGF0YSIsImZldGNoIiwiaGVhZGVycyIsInByb2plY3RfaWQiLCJ0aGVuIiwicmVzIiwianNvbiIsInN0YWtlIiwiZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zIiwiaGFuZGxlQWRkcmVzc1VwZGF0ZSIsIm5ld0FkZHJlc3MiLCJwdXNoIiwiZGl2IiwidXBkYXRlZEFkZHJlc3MiLCJjbGFzc05hbWUiLCJzdGFrZUFkZHJlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/address/[address].js\n"));

/***/ })

});