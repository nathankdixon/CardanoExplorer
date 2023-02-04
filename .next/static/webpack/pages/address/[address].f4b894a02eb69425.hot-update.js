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

/***/ "./src/pages/overview.js":
/*!*******************************!*\
  !*** ./src/pages/overview.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Overview; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nfunction Overview(param) {\n    let { data  } = param;\n    _s();\n    //returns an overview of wallet information\n    //ada price, usd price, last 3 transactions, staking rewards, staking pool...\n    const [out, setOut] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [balance, setBalance] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [pool, setPool] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [rewards, setRewards] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [tokenNumber, setTokenNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [projectNumber, setProjectNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [usd, setUsd] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getWalletData = async ()=>{\n            if (data != null) {\n                try {\n                    let accountInfo = await getAccountInfoFromKoios(data.stake);\n                    setBalance(accountInfo[0].total_balance / 1000000);\n                    setPool(accountInfo[0].delegated_pool);\n                    setRewards(accountInfo[0].rewards / 1000000);\n                    setTokenNumber(data.tokenNumber);\n                    setProjectNumber(data.projectNumber);\n                    let req = await fetch(\"https://api.coingecko.com/api/v3/coins/liqwid-finance?localization=false&tickers=false&developer_data=false\");\n                    let res = await req.json();\n                    let gbp = res.market_data.current_price.gbp;\n                    setUsd(gbp);\n                    console.log(gbp);\n                } catch (e) {\n                    console.log(\"overview error\");\n                }\n            }\n        };\n        getWalletData();\n    }, [\n        data\n    ]);\n    async function getAccountInfoFromKoios(stakeAddress) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/account_info\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_stake_addresses\": [\n                    stakeAddress\n                ]\n            })\n        });\n        const res = await req.json();\n        console.log(res);\n        return res;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"grid-ft\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"ada-info\",\n            children: [\n                \"Balance: ₳ \",\n                balance,\n                \" \",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 67,\n                    columnNumber: 30\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 67,\n                    columnNumber: 35\n                }, this),\n                \"USD Value : \",\n                usd,\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 68,\n                    columnNumber: 26\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 68,\n                    columnNumber: 31\n                }, this),\n                \"Staking Rewards : ₳ \",\n                rewards,\n                \" \",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 69,\n                    columnNumber: 39\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 69,\n                    columnNumber: 44\n                }, this),\n                \"Pool : \",\n                pool,\n                \" \",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 70,\n                    columnNumber: 23\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 70,\n                    columnNumber: 28\n                }, this),\n                \"Number of Tokens : \",\n                tokenNumber,\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 71,\n                    columnNumber: 41\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 71,\n                    columnNumber: 46\n                }, this),\n                \"Number of Projects : \",\n                projectNumber,\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 72,\n                    columnNumber: 45\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 72,\n                    columnNumber: 50\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n            lineNumber: 66,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n        lineNumber: 65,\n        columnNumber: 5\n    }, this);\n}\n_s(Overview, \"OD9rUJmmpkx70vb0NdqiQvuHTHk=\");\n_c = Overview;\nvar _c;\n$RefreshReg$(_c, \"Overview\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvb3ZlcnZpZXcuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEyQztBQUU1QixTQUFTRSxTQUFTLEtBQU0sRUFBQztRQUFQLEVBQUNDLEtBQUksRUFBQyxHQUFOOztJQUU3QiwyQ0FBMkM7SUFFM0MsNkVBQTZFO0lBRTdFLE1BQU0sQ0FBQ0MsS0FBS0MsT0FBTyxHQUFHSiwrQ0FBUUE7SUFDOUIsTUFBTSxDQUFDSyxTQUFTQyxXQUFXLEdBQUdOLCtDQUFRQTtJQUN0QyxNQUFNLENBQUNPLE1BQU1DLFFBQVEsR0FBR1IsK0NBQVFBO0lBQ2hDLE1BQU0sQ0FBQ1MsU0FBU0MsV0FBVyxHQUFHViwrQ0FBUUE7SUFDdEMsTUFBTSxDQUFDVyxhQUFhQyxlQUFlLEdBQUdaLCtDQUFRQTtJQUM5QyxNQUFNLENBQUVhLGVBQWVDLGlCQUFpQixHQUFHZCwrQ0FBUUE7SUFDbkQsTUFBTSxDQUFDZSxLQUFLQyxPQUFPLEdBQUdoQiwrQ0FBUUE7SUFHOUJELGdEQUFTQSxDQUFDLElBQU07UUFDWixNQUFNa0IsZ0JBQWdCLFVBQVk7WUFDOUIsSUFBR2YsUUFBUSxJQUFJLEVBQUM7Z0JBQ1osSUFBRztvQkFDQyxJQUFJZ0IsY0FBYyxNQUFNQyx3QkFBd0JqQixLQUFLa0IsS0FBSztvQkFDMURkLFdBQVdZLFdBQVcsQ0FBQyxFQUFFLENBQUNHLGFBQWEsR0FBRztvQkFDMUNiLFFBQVFVLFdBQVcsQ0FBQyxFQUFFLENBQUNJLGNBQWM7b0JBQ3JDWixXQUFXUSxXQUFXLENBQUMsRUFBRSxDQUFDVCxPQUFPLEdBQUc7b0JBQ3BDRyxlQUFlVixLQUFLUyxXQUFXO29CQUMvQkcsaUJBQWlCWixLQUFLVyxhQUFhO29CQUVuQyxJQUFJVSxNQUFNLE1BQU1DLE1BQU07b0JBQ3RCLElBQUlDLE1BQU0sTUFBTUYsSUFBSUcsSUFBSTtvQkFFeEIsSUFBSUMsTUFBTUYsSUFBSUcsV0FBVyxDQUFDQyxhQUFhLENBQUNGLEdBQUc7b0JBQzNDWCxPQUFPVztvQkFDUEcsUUFBUUMsR0FBRyxDQUFDSjtnQkFFaEIsRUFBQyxVQUFLO29CQUNGRyxRQUFRQyxHQUFHLENBQUM7Z0JBQ2hCO1lBRUosQ0FBQztRQUVMO1FBQ0FkO0lBQ0osR0FBRztRQUFDZjtLQUFLO0lBRVQsZUFBZWlCLHdCQUF3QmEsWUFBWSxFQUFDO1FBQ2hELE1BQU1ULE1BQU0sTUFBTUMsTUFBTSw4Q0FBOEM7WUFDaEVTLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7WUFDbEI7WUFDQUMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO2dCQUNuQixvQkFBb0I7b0JBQ2xCTDtpQkFDRDtZQUNIO1FBQ0Y7UUFFSixNQUFNUCxNQUFNLE1BQU1GLElBQUlHLElBQUk7UUFDMUJJLFFBQVFDLEdBQUcsQ0FBQ047UUFDWixPQUFPQTtJQUNUO0lBRUYscUJBQ0EsOERBQUNhO1FBQUlDLFdBQVU7a0JBQ1gsNEVBQUNEO1lBQUlDLFdBQVU7O2dCQUFXO2dCQUNkbEM7Z0JBQVE7OEJBQUMsOERBQUNtQzs7Ozs7OEJBQUksOERBQUNBOzs7OztnQkFBSTtnQkFDbEJ6Qjs4QkFBSSw4REFBQ3lCOzs7Ozs4QkFBSSw4REFBQ0E7Ozs7O2dCQUFJO2dCQUNOL0I7Z0JBQVE7OEJBQUMsOERBQUMrQjs7Ozs7OEJBQUksOERBQUNBOzs7OztnQkFBSTtnQkFDaENqQztnQkFBSzs4QkFBQyw4REFBQ2lDOzs7Ozs4QkFBSSw4REFBQ0E7Ozs7O2dCQUFJO2dCQUNKN0I7OEJBQVksOERBQUM2Qjs7Ozs7OEJBQUksOERBQUNBOzs7OztnQkFBSTtnQkFDcEIzQjs4QkFBYyw4REFBQzJCOzs7Ozs4QkFBSSw4REFBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNbEQsQ0FBQztHQTNFdUJ2QztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvb3ZlcnZpZXcuanM/ODA3NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gT3ZlcnZpZXcoe2RhdGF9KXtcblxuICAgIC8vcmV0dXJucyBhbiBvdmVydmlldyBvZiB3YWxsZXQgaW5mb3JtYXRpb25cblxuICAgIC8vYWRhIHByaWNlLCB1c2QgcHJpY2UsIGxhc3QgMyB0cmFuc2FjdGlvbnMsIHN0YWtpbmcgcmV3YXJkcywgc3Rha2luZyBwb29sLi4uXG5cbiAgICBjb25zdCBbb3V0LCBzZXRPdXRdID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBbYmFsYW5jZSwgc2V0QmFsYW5jZV0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFtwb29sLCBzZXRQb29sXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3QgW3Jld2FyZHMsIHNldFJld2FyZHNdID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBbdG9rZW5OdW1iZXIsIHNldFRva2VuTnVtYmVyXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3QgWyBwcm9qZWN0TnVtYmVyLCBzZXRQcm9qZWN0TnVtYmVyXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3QgW3VzZCwgc2V0VXNkXSA9IHVzZVN0YXRlKCk7XG5cblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdldFdhbGxldERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjY291bnRJbmZvID0gYXdhaXQgZ2V0QWNjb3VudEluZm9Gcm9tS29pb3MoZGF0YS5zdGFrZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEJhbGFuY2UoYWNjb3VudEluZm9bMF0udG90YWxfYmFsYW5jZSAvIDEwMDAwMDApO1xuICAgICAgICAgICAgICAgICAgICBzZXRQb29sKGFjY291bnRJbmZvWzBdLmRlbGVnYXRlZF9wb29sKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0UmV3YXJkcyhhY2NvdW50SW5mb1swXS5yZXdhcmRzIC8gMTAwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRva2VuTnVtYmVyKGRhdGEudG9rZW5OdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICBzZXRQcm9qZWN0TnVtYmVyKGRhdGEucHJvamVjdE51bWJlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5jb2luZ2Vja28uY29tL2FwaS92My9jb2lucy9saXF3aWQtZmluYW5jZT9sb2NhbGl6YXRpb249ZmFsc2UmdGlja2Vycz1mYWxzZSZkZXZlbG9wZXJfZGF0YT1mYWxzZScpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxLmpzb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2JwID0gcmVzLm1hcmtldF9kYXRhLmN1cnJlbnRfcHJpY2UuZ2JwO1xuICAgICAgICAgICAgICAgICAgICBzZXRVc2QoZ2JwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2JwKTtcblxuICAgICAgICAgICAgICAgIH1jYXRjaHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ292ZXJ2aWV3IGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBnZXRXYWxsZXREYXRhKCk7XG4gICAgfSwgW2RhdGFdKTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnRJbmZvRnJvbUtvaW9zKHN0YWtlQWRkcmVzcyl7XG4gICAgICAgIGNvbnN0IHJlcSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5rb2lvcy5yZXN0L2FwaS92MC9hY2NvdW50X2luZm8nLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgXCJfc3Rha2VfYWRkcmVzc2VzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHN0YWtlQWRkcmVzc1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJncmlkLWZ0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRhLWluZm9cIj5cbiAgICAgICAgQmFsYW5jZTog4oKzIHtiYWxhbmNlfSA8YnIvPjxici8+XG4gICAgICAgIFVTRCBWYWx1ZSA6IHt1c2R9PGJyLz48YnIvPlxuICAgICAgICBTdGFraW5nIFJld2FyZHMgOiDigrMge3Jld2FyZHN9IDxici8+PGJyLz5cbiAgICAgICAgUG9vbCA6IHtwb29sfSA8YnIvPjxici8+XG4gICAgICAgIE51bWJlciBvZiBUb2tlbnMgOiB7dG9rZW5OdW1iZXJ9PGJyLz48YnIvPlxuICAgICAgICBOdW1iZXIgb2YgUHJvamVjdHMgOiB7cHJvamVjdE51bWJlcn08YnIvPjxici8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIFxuICAgIDwvZGl2PlxuICAgIClcbn0iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJPdmVydmlldyIsImRhdGEiLCJvdXQiLCJzZXRPdXQiLCJiYWxhbmNlIiwic2V0QmFsYW5jZSIsInBvb2wiLCJzZXRQb29sIiwicmV3YXJkcyIsInNldFJld2FyZHMiLCJ0b2tlbk51bWJlciIsInNldFRva2VuTnVtYmVyIiwicHJvamVjdE51bWJlciIsInNldFByb2plY3ROdW1iZXIiLCJ1c2QiLCJzZXRVc2QiLCJnZXRXYWxsZXREYXRhIiwiYWNjb3VudEluZm8iLCJnZXRBY2NvdW50SW5mb0Zyb21Lb2lvcyIsInN0YWtlIiwidG90YWxfYmFsYW5jZSIsImRlbGVnYXRlZF9wb29sIiwicmVxIiwiZmV0Y2giLCJyZXMiLCJqc29uIiwiZ2JwIiwibWFya2V0X2RhdGEiLCJjdXJyZW50X3ByaWNlIiwiY29uc29sZSIsImxvZyIsInN0YWtlQWRkcmVzcyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImRpdiIsImNsYXNzTmFtZSIsImJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/overview.js\n"));

/***/ })

});