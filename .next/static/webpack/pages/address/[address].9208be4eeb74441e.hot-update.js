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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../header */ \"./src/pages/header.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../token */ \"./src/pages/token.js\");\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../wallet */ \"./src/pages/wallet.js\");\n/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/next/dist/compiled/buffer/index.js\")[\"Buffer\"];\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__]);\n([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction AddressPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const { address  } = router.query;\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const getAddressFromHandle = async ()=>{\n            if (address == null) {\n                console.log(\"address was null\");\n            } else {\n                if (address.startsWith(\"$\")) {\n                    let handle = address.slice(1);\n                    let stake = await getHandleAddressFromBlockfrost(handle);\n                }\n            }\n        };\n        getAddressFromHanle();\n    }, [\n        address\n    ]);\n    const getHandleAddressFromBlockfrost = async (handle)=>{\n        let policyID = \"f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a\";\n        // A blank Handle name should always be ignored.\n        if (handle.length === 0) {\n        // Handle error.\n        }\n        // Convert handleName to hex encoding.\n        let assetName = Buffer.from(handle).toString(\"hex\");\n        const data = await fetch(\"https://cardano-mainnet.blockfrost.io/api/v0/assets/\".concat(policyID).concat(assetName, \"/addresses\"), {\n            headers: {\n                // Your Blockfrost API key\n                project_id: \"mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh\",\n                \"Content-Type\": \"application/json\"\n            }\n        }).then((res)=>res.json());\n        let stake = await getStakeFromAddressKoios(data[0].address);\n        return stake;\n    };\n    const handleAddressUpdate = (newAddress)=>{\n        router.push(\"/address/\" + newAddress);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                updatedAddress: handleAddressUpdate\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 62,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"tokenList\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_wallet__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                    stakeAddress: address\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                    lineNumber: 63,\n                    columnNumber: 36\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 63,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n        lineNumber: 61,\n        columnNumber: 7\n    }, this);\n}\n_s(AddressPage, \"vQduR7x+OPXj6PSmJyFnf+hU7bg=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = AddressPage;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AddressPage);\nvar _c;\n$RefreshReg$(_c, \"AddressPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYWRkcmVzcy9bYWRkcmVzc10uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNJO0FBQ2I7QUFDRjtBQUNFO0FBRy9CLFNBQVNNLGNBQWM7O0lBRW5CLE1BQU1DLFNBQVNQLHNEQUFTQTtJQUN4QixNQUFNLEVBQUVRLFFBQU8sRUFBRSxHQUFHRCxPQUFPRSxLQUFLO0lBRWhDUixnREFBU0EsQ0FBQyxJQUFNO1FBQ2QsTUFBTVMsdUJBQXVCLFVBQVk7WUFDdkMsSUFBR0YsV0FBVyxJQUFJLEVBQUM7Z0JBQ2pCRyxRQUFRQyxHQUFHLENBQUM7WUFDZCxPQUNJO2dCQUNGLElBQUdKLFFBQVFLLFVBQVUsQ0FBQyxNQUFLO29CQUN6QixJQUFJQyxTQUFTTixRQUFRTyxLQUFLLENBQUM7b0JBQzNCLElBQUlDLFFBQVEsTUFBTUMsK0JBQStCSDtnQkFHbkQsQ0FBQztZQUNILENBQUM7UUFDSDtRQUNBSTtJQUNGLEdBQUc7UUFBQ1Y7S0FBUTtJQUVaLE1BQU1TLGlDQUFpQyxPQUFPSCxTQUFXO1FBQ3ZELElBQUlLLFdBQVc7UUFFZixnREFBZ0Q7UUFDaEQsSUFBSUwsT0FBT00sTUFBTSxLQUFLLEdBQUc7UUFDdkIsZ0JBQWdCO1FBQ2xCLENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSUMsWUFBWUMsTUFBTUEsQ0FBQ0MsSUFBSSxDQUFDVCxRQUFRVSxRQUFRLENBQUM7UUFFN0MsTUFBTUMsT0FBTyxNQUFNQyxNQUNqQix1REFBa0VMLE9BQVhGLFVBQXFCLE9BQVZFLFdBQVUsZUFDNUU7WUFDRU0sU0FBUztnQkFDUCwwQkFBMEI7Z0JBQzFCQyxZQUFZO2dCQUNaLGdCQUFnQjtZQUNsQjtRQUNGLEdBQ0FDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBT0EsSUFBSUMsSUFBSTtRQUV0QixJQUFJZixRQUFRLE1BQU1nQix5QkFBeUJQLElBQUksQ0FBQyxFQUFFLENBQUNqQixPQUFPO1FBQzFELE9BQU9RO0lBQ1Q7SUFFQSxNQUFNaUIsc0JBQXNCLENBQUNDLGFBQWU7UUFDMUMzQixPQUFPNEIsSUFBSSxDQUFDLGNBQVlEO0lBQzFCO0lBRUEscUJBQ0UsOERBQUNFOzswQkFDQyw4REFBQ2pDLCtDQUFNQTtnQkFBQ2tDLGdCQUFnQko7Ozs7OzswQkFDeEIsOERBQUNHO2dCQUFJRSxXQUFVOzBCQUFZLDRFQUFDakMsK0NBQU1BO29CQUFDa0MsY0FBYy9COzs7Ozs7Ozs7Ozs7Ozs7OztBQUd6RDtHQTFEU0Y7O1FBRVVOLGtEQUFTQTs7O0tBRm5CTTs7QUFvRlAsK0RBQWVBLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2FkZHJlc3MvW2FkZHJlc3NdLmpzP2UwYWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuLi9oZWFkZXJcIjtcbmltcG9ydCBUb2tlbiBmcm9tIFwiLi4vdG9rZW5cIjtcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4uL3dhbGxldFwiO1xuXG5cbmZ1bmN0aW9uIEFkZHJlc3NQYWdlKCkge1xuXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gICAgY29uc3QgeyBhZGRyZXNzIH0gPSByb3V0ZXIucXVlcnk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgZ2V0QWRkcmVzc0Zyb21IYW5kbGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmKGFkZHJlc3MgPT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZHJlc3Mgd2FzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgIGlmKGFkZHJlc3Muc3RhcnRzV2l0aCgnJCcpKXtcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSBhZGRyZXNzLnNsaWNlKDEpO1xuICAgICAgICAgICAgbGV0IHN0YWtlID0gYXdhaXQgZ2V0SGFuZGxlQWRkcmVzc0Zyb21CbG9ja2Zyb3N0KGhhbmRsZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZ2V0QWRkcmVzc0Zyb21IYW5sZSgpO1xuICAgIH0sIFthZGRyZXNzXSlcblxuICAgIGNvbnN0IGdldEhhbmRsZUFkZHJlc3NGcm9tQmxvY2tmcm9zdCA9IGFzeW5jIChoYW5kbGUpID0+IHtcbiAgICAgIGxldCBwb2xpY3lJRCA9ICdmMGZmNDhiYmI3YmJlOWQ1OWE0MGYxY2U5MGU5ZTlkMGZmNTAwMmVjNDhmMjMyYjQ5Y2EwZmI5YSc7XG4gICAgICBcbiAgICAgIC8vIEEgYmxhbmsgSGFuZGxlIG5hbWUgc2hvdWxkIGFsd2F5cyBiZSBpZ25vcmVkLlxuICAgICAgaWYgKGhhbmRsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gSGFuZGxlIGVycm9yLlxuICAgICAgfVxuICAgIFxuICAgICAgLy8gQ29udmVydCBoYW5kbGVOYW1lIHRvIGhleCBlbmNvZGluZy5cbiAgICAgIGxldCBhc3NldE5hbWUgPSBCdWZmZXIuZnJvbShoYW5kbGUpLnRvU3RyaW5nKCdoZXgnKTtcbiAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vY2FyZGFuby1tYWlubmV0LmJsb2NrZnJvc3QuaW8vYXBpL3YwL2Fzc2V0cy8ke3BvbGljeUlEfSR7YXNzZXROYW1lfS9hZGRyZXNzZXNgLFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLy8gWW91ciBCbG9ja2Zyb3N0IEFQSSBrZXlcbiAgICAgICAgICAgIHByb2plY3RfaWQ6ICdtYWlubmV0b1c2MVlZU2lPb0xTYU5RNmR6VHJrQUc0YXpYVklydmgnLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbiAgICAgIFxuICAgICAgbGV0IHN0YWtlID0gYXdhaXQgZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zKGRhdGFbMF0uYWRkcmVzcyk7XG4gICAgICByZXR1cm4gc3Rha2U7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlQWRkcmVzc1VwZGF0ZSA9IChuZXdBZGRyZXNzKSA9PiB7XG4gICAgICByb3V0ZXIucHVzaChgL2FkZHJlc3MvYCtuZXdBZGRyZXNzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlYWRlciB1cGRhdGVkQWRkcmVzcz17aGFuZGxlQWRkcmVzc1VwZGF0ZX0vPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRva2VuTGlzdFwiPjxXYWxsZXQgc3Rha2VBZGRyZXNzPXthZGRyZXNzfS8+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgZHluYW1pYyBwYXRocyBmb3IgdGhlIHBhZ2UuXG4gICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBoYXZlIGEgbGlzdCBvZiBhbGwgcG9zc2libGUgbnVtYmVycyBiZXR3ZWVuIDEgYW5kIDUgdGhhdCB3ZSBjYW4gdXNlIHRvIGNyZWF0ZSB0aGUgcGF0aHNcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aHM6IFtdLFxuICAgICAgZmFsbGJhY2s6IHRydWVcbiAgICB9O1xuICB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyh7IHBhcmFtcyB9KSB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBmZXRjaGVzIHRoZSBkYXRhIGZvciB0aGUgcGFnZS5cbiAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIGRvbid0IG5lZWQgdG8gZmV0Y2ggYW55IGRhdGEgYmVjYXVzZSB0aGUgbnVtYmVyIGlzIGFscmVhZHkgYXZhaWxhYmxlIGluIHRoZSBwYXJhbXMgb2JqZWN0LlxuICAgIGNvbnN0IGFkZHJlc3MgPSBwYXJhbXMuYWRkcmVzcztcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBhZGRyZXNzXG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgZGVmYXVsdCBBZGRyZXNzUGFnZTsiXSwibmFtZXMiOlsidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJIZWFkZXIiLCJUb2tlbiIsIldhbGxldCIsIkFkZHJlc3NQYWdlIiwicm91dGVyIiwiYWRkcmVzcyIsInF1ZXJ5IiwiZ2V0QWRkcmVzc0Zyb21IYW5kbGUiLCJjb25zb2xlIiwibG9nIiwic3RhcnRzV2l0aCIsImhhbmRsZSIsInNsaWNlIiwic3Rha2UiLCJnZXRIYW5kbGVBZGRyZXNzRnJvbUJsb2NrZnJvc3QiLCJnZXRBZGRyZXNzRnJvbUhhbmxlIiwicG9saWN5SUQiLCJsZW5ndGgiLCJhc3NldE5hbWUiLCJCdWZmZXIiLCJmcm9tIiwidG9TdHJpbmciLCJkYXRhIiwiZmV0Y2giLCJoZWFkZXJzIiwicHJvamVjdF9pZCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zIiwiaGFuZGxlQWRkcmVzc1VwZGF0ZSIsIm5ld0FkZHJlc3MiLCJwdXNoIiwiZGl2IiwidXBkYXRlZEFkZHJlc3MiLCJjbGFzc05hbWUiLCJzdGFrZUFkZHJlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/address/[address].js\n"));

/***/ })

});