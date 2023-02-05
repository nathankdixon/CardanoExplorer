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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../header */ \"./src/pages/header.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../token */ \"./src/pages/token.js\");\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../wallet */ \"./src/pages/wallet.js\");\n/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/next/dist/compiled/buffer/index.js\")[\"Buffer\"];\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__]);\n([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction AddressPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    var { address  } = router.query;\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const getAddressFromHandle = async ()=>{\n            if (address == null) {\n                console.log(\"address was null\");\n            } else {\n                if (address.startsWith(\"$\")) {\n                    let handle = address.slice(1);\n                    let stake = await getHandleAddressFromBlockfrost(handle);\n                    address = stake;\n                }\n            }\n        };\n        getAddressFromHandle();\n    }, [\n        address\n    ]);\n    async function getStakeFromAddressKoios(address) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/address_info\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_addresses\": [\n                    address\n                ]\n            })\n        });\n        const res = await req.json();\n        return res[0].stake_address;\n    }\n    const getHandleAddressFromBlockfrost = async (handle)=>{\n        let policyID = \"f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a\";\n        // A blank Handle name should always be ignored.\n        if (handle.length === 0) {\n        // Handle error.\n        }\n        // Convert handleName to hex encoding.\n        let assetName = Buffer.from(handle).toString(\"hex\");\n        const data = await fetch(\"https://cardano-mainnet.blockfrost.io/api/v0/assets/\".concat(policyID).concat(assetName, \"/addresses\"), {\n            headers: {\n                // Your Blockfrost API key\n                project_id: \"mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh\",\n                \"Content-Type\": \"application/json\"\n            }\n        }).then((res)=>res.json());\n        let stake = await getStakeFromAddressKoios(data[0].address);\n        return stake;\n    };\n    const handleAddressUpdate = (newAddress)=>{\n        router.push(\"/address/\" + newAddress);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                updatedAddress: handleAddressUpdate\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 78,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"tokenList\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_wallet__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                    stakeAddress: address\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                    lineNumber: 79,\n                    columnNumber: 36\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 79,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n        lineNumber: 77,\n        columnNumber: 7\n    }, this);\n}\n_s(AddressPage, \"vQduR7x+OPXj6PSmJyFnf+hU7bg=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = AddressPage;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AddressPage);\nvar _c;\n$RefreshReg$(_c, \"AddressPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYWRkcmVzcy9bYWRkcmVzc10uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNJO0FBQ2I7QUFDRjtBQUNFO0FBRy9CLFNBQVNNLGNBQWM7O0lBRW5CLE1BQU1DLFNBQVNQLHNEQUFTQTtJQUN4QixJQUFJLEVBQUVRLFFBQU8sRUFBRSxHQUFHRCxPQUFPRSxLQUFLO0lBRTlCUixnREFBU0EsQ0FBQyxJQUFNO1FBQ2QsTUFBTVMsdUJBQXVCLFVBQVk7WUFDdkMsSUFBR0YsV0FBVyxJQUFJLEVBQUM7Z0JBQ2pCRyxRQUFRQyxHQUFHLENBQUM7WUFDZCxPQUNJO2dCQUNGLElBQUdKLFFBQVFLLFVBQVUsQ0FBQyxNQUFLO29CQUN6QixJQUFJQyxTQUFTTixRQUFRTyxLQUFLLENBQUM7b0JBQzNCLElBQUlDLFFBQVEsTUFBTUMsK0JBQStCSDtvQkFDakROLFVBQVVRO2dCQUVaLENBQUM7WUFDSCxDQUFDO1FBQ0g7UUFDQU47SUFDRixHQUFHO1FBQUNGO0tBQVE7SUFFWixlQUFlVSx5QkFBeUJWLE9BQU8sRUFBQztRQUM5QyxNQUFNVyxNQUFNLE1BQU1DLE1BQU0sOENBQThDO1lBQ3BFQyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsZ0JBQWdCO1lBQ2xCO1lBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztnQkFDbkIsY0FBYztvQkFBRWpCO2lCQUNmO1lBQ0g7UUFDRjtRQUVBLE1BQU1rQixNQUFNLE1BQU1QLElBQUlRLElBQUk7UUFDMUIsT0FBT0QsR0FBRyxDQUFDLEVBQUUsQ0FBQ0UsYUFBYTtJQUM3QjtJQUVBLE1BQU1YLGlDQUFpQyxPQUFPSCxTQUFXO1FBQ3ZELElBQUllLFdBQVc7UUFFZixnREFBZ0Q7UUFDaEQsSUFBSWYsT0FBT2dCLE1BQU0sS0FBSyxHQUFHO1FBQ3ZCLGdCQUFnQjtRQUNsQixDQUFDO1FBRUQsc0NBQXNDO1FBQ3RDLElBQUlDLFlBQVlDLE1BQU1BLENBQUNDLElBQUksQ0FBQ25CLFFBQVFvQixRQUFRLENBQUM7UUFFN0MsTUFBTUMsT0FBTyxNQUFNZixNQUNqQix1REFBa0VXLE9BQVhGLFVBQXFCLE9BQVZFLFdBQVUsZUFDNUU7WUFDRVQsU0FBUztnQkFDUCwwQkFBMEI7Z0JBQzFCYyxZQUFZO2dCQUNaLGdCQUFnQjtZQUNsQjtRQUNGLEdBQ0FDLElBQUksQ0FBQ1gsQ0FBQUEsTUFBT0EsSUFBSUMsSUFBSTtRQUV0QixJQUFJWCxRQUFRLE1BQU1FLHlCQUF5QmlCLElBQUksQ0FBQyxFQUFFLENBQUMzQixPQUFPO1FBQzFELE9BQU9RO0lBQ1Q7SUFFQSxNQUFNc0Isc0JBQXNCLENBQUNDLGFBQWU7UUFDMUNoQyxPQUFPaUMsSUFBSSxDQUFDLGNBQVlEO0lBQzFCO0lBRUEscUJBQ0UsOERBQUNFOzswQkFDQyw4REFBQ3RDLCtDQUFNQTtnQkFBQ3VDLGdCQUFnQko7Ozs7OzswQkFDeEIsOERBQUNHO2dCQUFJRSxXQUFVOzBCQUFZLDRFQUFDdEMsK0NBQU1BO29CQUFDdUMsY0FBY3BDOzs7Ozs7Ozs7Ozs7Ozs7OztBQUd6RDtHQTFFU0Y7O1FBRVVOLGtEQUFTQTs7O0tBRm5CTTs7QUFvR1AsK0RBQWVBLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2FkZHJlc3MvW2FkZHJlc3NdLmpzP2UwYWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuLi9oZWFkZXJcIjtcbmltcG9ydCBUb2tlbiBmcm9tIFwiLi4vdG9rZW5cIjtcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4uL3dhbGxldFwiO1xuXG5cbmZ1bmN0aW9uIEFkZHJlc3NQYWdlKCkge1xuXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gICAgdmFyIHsgYWRkcmVzcyB9ID0gcm91dGVyLnF1ZXJ5O1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGdldEFkZHJlc3NGcm9tSGFuZGxlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZihhZGRyZXNzID09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRyZXNzIHdhcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBpZihhZGRyZXNzLnN0YXJ0c1dpdGgoJyQnKSl7XG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gYWRkcmVzcy5zbGljZSgxKTtcbiAgICAgICAgICAgIGxldCBzdGFrZSA9IGF3YWl0IGdldEhhbmRsZUFkZHJlc3NGcm9tQmxvY2tmcm9zdChoYW5kbGUpO1xuICAgICAgICAgICAgYWRkcmVzcyA9IHN0YWtlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBnZXRBZGRyZXNzRnJvbUhhbmRsZSgpO1xuICAgIH0sIFthZGRyZXNzXSlcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldFN0YWtlRnJvbUFkZHJlc3NLb2lvcyhhZGRyZXNzKXtcbiAgICAgIGNvbnN0IHJlcSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5rb2lvcy5yZXN0L2FwaS92MC9hZGRyZXNzX2luZm8nLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgXCJfYWRkcmVzc2VzXCI6IFsgYWRkcmVzc1xuICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICBcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgICByZXR1cm4gcmVzWzBdLnN0YWtlX2FkZHJlc3M7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0SGFuZGxlQWRkcmVzc0Zyb21CbG9ja2Zyb3N0ID0gYXN5bmMgKGhhbmRsZSkgPT4ge1xuICAgICAgbGV0IHBvbGljeUlEID0gJ2YwZmY0OGJiYjdiYmU5ZDU5YTQwZjFjZTkwZTllOWQwZmY1MDAyZWM0OGYyMzJiNDljYTBmYjlhJztcbiAgICAgIFxuICAgICAgLy8gQSBibGFuayBIYW5kbGUgbmFtZSBzaG91bGQgYWx3YXlzIGJlIGlnbm9yZWQuXG4gICAgICBpZiAoaGFuZGxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBIYW5kbGUgZXJyb3IuXG4gICAgICB9XG4gICAgXG4gICAgICAvLyBDb252ZXJ0IGhhbmRsZU5hbWUgdG8gaGV4IGVuY29kaW5nLlxuICAgICAgbGV0IGFzc2V0TmFtZSA9IEJ1ZmZlci5mcm9tKGhhbmRsZSkudG9TdHJpbmcoJ2hleCcpO1xuICAgIFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9jYXJkYW5vLW1haW5uZXQuYmxvY2tmcm9zdC5pby9hcGkvdjAvYXNzZXRzLyR7cG9saWN5SUR9JHthc3NldE5hbWV9L2FkZHJlc3Nlc2AsXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAvLyBZb3VyIEJsb2NrZnJvc3QgQVBJIGtleVxuICAgICAgICAgICAgcHJvamVjdF9pZDogJ21haW5uZXRvVzYxWVlTaU9vTFNhTlE2ZHpUcmtBRzRhelhWSXJ2aCcsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xuICAgICAgXG4gICAgICBsZXQgc3Rha2UgPSBhd2FpdCBnZXRTdGFrZUZyb21BZGRyZXNzS29pb3MoZGF0YVswXS5hZGRyZXNzKTtcbiAgICAgIHJldHVybiBzdGFrZTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVBZGRyZXNzVXBkYXRlID0gKG5ld0FkZHJlc3MpID0+IHtcbiAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy9gK25ld0FkZHJlc3MpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SGVhZGVyIHVwZGF0ZWRBZGRyZXNzPXtoYW5kbGVBZGRyZXNzVXBkYXRlfS8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9rZW5MaXN0XCI+PFdhbGxldCBzdGFrZUFkZHJlc3M9e2FkZHJlc3N9Lz48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUGF0aHMoKSB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBkeW5hbWljIHBhdGhzIGZvciB0aGUgcGFnZS5cbiAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIGhhdmUgYSBsaXN0IG9mIGFsbCBwb3NzaWJsZSBudW1iZXJzIGJldHdlZW4gMSBhbmQgNSB0aGF0IHdlIGNhbiB1c2UgdG8gY3JlYXRlIHRoZSBwYXRoc1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBwYXRoczogW10sXG4gICAgICBmYWxsYmFjazogdHJ1ZVxuICAgIH07XG4gIH1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKHsgcGFyYW1zIH0pIHtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGZldGNoZXMgdGhlIGRhdGEgZm9yIHRoZSBwYWdlLlxuICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgZG9uJ3QgbmVlZCB0byBmZXRjaCBhbnkgZGF0YSBiZWNhdXNlIHRoZSBudW1iZXIgaXMgYWxyZWFkeSBhdmFpbGFibGUgaW4gdGhlIHBhcmFtcyBvYmplY3QuXG4gICAgY29uc3QgYWRkcmVzcyA9IHBhcmFtcy5hZGRyZXNzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGFkZHJlc3NcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGV4cG9ydCBkZWZhdWx0IEFkZHJlc3NQYWdlOyJdLCJuYW1lcyI6WyJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkhlYWRlciIsIlRva2VuIiwiV2FsbGV0IiwiQWRkcmVzc1BhZ2UiLCJyb3V0ZXIiLCJhZGRyZXNzIiwicXVlcnkiLCJnZXRBZGRyZXNzRnJvbUhhbmRsZSIsImNvbnNvbGUiLCJsb2ciLCJzdGFydHNXaXRoIiwiaGFuZGxlIiwic2xpY2UiLCJzdGFrZSIsImdldEhhbmRsZUFkZHJlc3NGcm9tQmxvY2tmcm9zdCIsImdldFN0YWtlRnJvbUFkZHJlc3NLb2lvcyIsInJlcSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwianNvbiIsInN0YWtlX2FkZHJlc3MiLCJwb2xpY3lJRCIsImxlbmd0aCIsImFzc2V0TmFtZSIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsImRhdGEiLCJwcm9qZWN0X2lkIiwidGhlbiIsImhhbmRsZUFkZHJlc3NVcGRhdGUiLCJuZXdBZGRyZXNzIiwicHVzaCIsImRpdiIsInVwZGF0ZWRBZGRyZXNzIiwiY2xhc3NOYW1lIiwic3Rha2VBZGRyZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/address/[address].js\n"));

/***/ })

});