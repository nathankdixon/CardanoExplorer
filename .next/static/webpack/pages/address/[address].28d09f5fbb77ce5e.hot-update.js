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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Overview; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nfunction Overview(param) {\n    let { data  } = param;\n    _s();\n    //returns an overview of wallet information\n    //ada price, usd price, last 3 transactions, staking rewards, staking pool...\n    const [out, setOut] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [balance, setBalance] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [pool, setPool] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [rewards, setRewards] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [tokenNumber, setTokenNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [projectNumber, setProjectNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [usdValue, setUsdValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [usd, setUsd] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [gbp, setGbp] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getWalletData = async ()=>{\n            if (data != null) {\n                try {\n                    let accountInfo = await getAccountInfoFromKoios(data.stake);\n                    setBalance(accountInfo[0].total_balance / 1000000);\n                    setPool(accountInfo[0].delegated_pool);\n                    setRewards(accountInfo[0].rewards / 1000000);\n                    setTokenNumber(data.tokenNumber);\n                    setProjectNumber(data.projectNumber);\n                    let req = await fetch(\"https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false\");\n                    let res = await req.json();\n                    let gbp = res.market_data.current_price.gbp;\n                    let usd = res.market_data.current_price.usd;\n                    setUsdValue(accountInfo[0].total_balance / 1000000 * usd);\n                    setUsd(usd);\n                    setGbp(gbp);\n                    console.log(gbp);\n                } catch (e) {\n                    console.log(\"overview error\");\n                }\n            }\n        };\n        getWalletData();\n    }, [\n        data\n    ]);\n    async function getAccountInfoFromKoios(stakeAddress) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/account_info\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_stake_addresses\": [\n                    stakeAddress\n                ]\n            })\n        });\n        const res = await req.json();\n        console.log(res);\n        return res;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"grid-ft\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"ada-info\",\n            children: [\n                \"Balance: ₳ \",\n                balance,\n                \" \",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 73,\n                    columnNumber: 30\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 73,\n                    columnNumber: 35\n                }, this),\n                \"USD Value : \",\n                usd,\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 74,\n                    columnNumber: 26\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 74,\n                    columnNumber: 31\n                }, this),\n                \"Staking Rewards : ₳ \",\n                rewards,\n                \" \",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 75,\n                    columnNumber: 39\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 75,\n                    columnNumber: 44\n                }, this),\n                \"Pool : \",\n                pool,\n                \" \",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 76,\n                    columnNumber: 23\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 76,\n                    columnNumber: 28\n                }, this),\n                \"Number of Tokens : \",\n                tokenNumber,\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 77,\n                    columnNumber: 41\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 77,\n                    columnNumber: 46\n                }, this),\n                \"Number of Projects : \",\n                projectNumber,\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 78,\n                    columnNumber: 45\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n                    lineNumber: 78,\n                    columnNumber: 50\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n            lineNumber: 72,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/overview.js\",\n        lineNumber: 71,\n        columnNumber: 5\n    }, this);\n}\n_s(Overview, \"eQVgiPr3ZYdTgwMKogfU41X5h3c=\");\n_c = Overview;\nvar _c;\n$RefreshReg$(_c, \"Overview\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzhCOzs7Ozs4QkFBSSw4REFBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNbEQsQ0FBQztHQWpGdUIxQztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvb3ZlcnZpZXcuanM/ODA3NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gT3ZlcnZpZXcoe2RhdGF9KXtcblxuICAgIC8vcmV0dXJucyBhbiBvdmVydmlldyBvZiB3YWxsZXQgaW5mb3JtYXRpb25cblxuICAgIC8vYWRhIHByaWNlLCB1c2QgcHJpY2UsIGxhc3QgMyB0cmFuc2FjdGlvbnMsIHN0YWtpbmcgcmV3YXJkcywgc3Rha2luZyBwb29sLi4uXG5cbiAgICBjb25zdCBbb3V0LCBzZXRPdXRdID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBbYmFsYW5jZSwgc2V0QmFsYW5jZV0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFtwb29sLCBzZXRQb29sXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3QgW3Jld2FyZHMsIHNldFJld2FyZHNdID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBbdG9rZW5OdW1iZXIsIHNldFRva2VuTnVtYmVyXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3QgWyBwcm9qZWN0TnVtYmVyLCBzZXRQcm9qZWN0TnVtYmVyXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3QgW3VzZFZhbHVlLCBzZXRVc2RWYWx1ZV0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFt1c2QsIHNldFVzZF0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFtnYnAsIHNldEdicF0gPSB1c2VTdGF0ZSgpO1xuXG5cblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdldFdhbGxldERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjY291bnRJbmZvID0gYXdhaXQgZ2V0QWNjb3VudEluZm9Gcm9tS29pb3MoZGF0YS5zdGFrZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEJhbGFuY2UoYWNjb3VudEluZm9bMF0udG90YWxfYmFsYW5jZSAvIDEwMDAwMDApO1xuICAgICAgICAgICAgICAgICAgICBzZXRQb29sKGFjY291bnRJbmZvWzBdLmRlbGVnYXRlZF9wb29sKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0UmV3YXJkcyhhY2NvdW50SW5mb1swXS5yZXdhcmRzIC8gMTAwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRva2VuTnVtYmVyKGRhdGEudG9rZW5OdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICBzZXRQcm9qZWN0TnVtYmVyKGRhdGEucHJvamVjdE51bWJlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5jb2luZ2Vja28uY29tL2FwaS92My9jb2lucy9jYXJkYW5vP2xvY2FsaXphdGlvbj1mYWxzZSZ0aWNrZXJzPWZhbHNlJmRldmVsb3Blcl9kYXRhPWZhbHNlJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBnYnAgPSByZXMubWFya2V0X2RhdGEuY3VycmVudF9wcmljZS5nYnA7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2QgPSByZXMubWFya2V0X2RhdGEuY3VycmVudF9wcmljZS51c2Q7XG4gICAgICAgICAgICAgICAgICAgIHNldFVzZFZhbHVlKChhY2NvdW50SW5mb1swXS50b3RhbF9iYWxhbmNlIC8gMTAwMDAwMCkqdXNkKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXNkKHVzZCk7XG4gICAgICAgICAgICAgICAgICAgIHNldEdicChnYnApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnYnApO1xuXG4gICAgICAgICAgICAgICAgfWNhdGNoe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb3ZlcnZpZXcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGdldFdhbGxldERhdGEoKTtcbiAgICB9LCBbZGF0YV0pO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0QWNjb3VudEluZm9Gcm9tS29pb3Moc3Rha2VBZGRyZXNzKXtcbiAgICAgICAgY29uc3QgcmVxID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmtvaW9zLnJlc3QvYXBpL3YwL2FjY291bnRfaW5mbycsIHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBcIl9zdGFrZV9hZGRyZXNzZXNcIjogW1xuICAgICAgICAgICAgICAgICAgc3Rha2VBZGRyZXNzXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCByZXEuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQtZnRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGEtaW5mb1wiPlxuICAgICAgICBCYWxhbmNlOiDigrMge2JhbGFuY2V9IDxici8+PGJyLz5cbiAgICAgICAgVVNEIFZhbHVlIDoge3VzZH08YnIvPjxici8+XG4gICAgICAgIFN0YWtpbmcgUmV3YXJkcyA6IOKCsyB7cmV3YXJkc30gPGJyLz48YnIvPlxuICAgICAgICBQb29sIDoge3Bvb2x9IDxici8+PGJyLz5cbiAgICAgICAgTnVtYmVyIG9mIFRva2VucyA6IHt0b2tlbk51bWJlcn08YnIvPjxici8+XG4gICAgICAgIE51bWJlciBvZiBQcm9qZWN0cyA6IHtwcm9qZWN0TnVtYmVyfTxici8+PGJyLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgXG4gICAgPC9kaXY+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk92ZXJ2aWV3IiwiZGF0YSIsIm91dCIsInNldE91dCIsImJhbGFuY2UiLCJzZXRCYWxhbmNlIiwicG9vbCIsInNldFBvb2wiLCJyZXdhcmRzIiwic2V0UmV3YXJkcyIsInRva2VuTnVtYmVyIiwic2V0VG9rZW5OdW1iZXIiLCJwcm9qZWN0TnVtYmVyIiwic2V0UHJvamVjdE51bWJlciIsInVzZFZhbHVlIiwic2V0VXNkVmFsdWUiLCJ1c2QiLCJzZXRVc2QiLCJnYnAiLCJzZXRHYnAiLCJnZXRXYWxsZXREYXRhIiwiYWNjb3VudEluZm8iLCJnZXRBY2NvdW50SW5mb0Zyb21Lb2lvcyIsInN0YWtlIiwidG90YWxfYmFsYW5jZSIsImRlbGVnYXRlZF9wb29sIiwicmVxIiwiZmV0Y2giLCJyZXMiLCJqc29uIiwibWFya2V0X2RhdGEiLCJjdXJyZW50X3ByaWNlIiwiY29uc29sZSIsImxvZyIsInN0YWtlQWRkcmVzcyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImRpdiIsImNsYXNzTmFtZSIsImJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/overview.js\n"));

/***/ })

});