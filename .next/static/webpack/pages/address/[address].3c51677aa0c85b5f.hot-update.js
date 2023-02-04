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

/***/ "./src/pages/wallet.js":
/*!*****************************!*\
  !*** ./src/pages/wallet.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _dropdownBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdownBox */ \"./src/pages/dropdownBox.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./token */ \"./src/pages/token.js\");\n/* harmony import */ var lucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucid-cardano */ \"./node_modules/lucid-cardano/esm/mod.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _nfts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nfts */ \"./src/pages/nfts.js\");\n/* harmony import */ var _fts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fts */ \"./src/pages/fts.js\");\n/* harmony import */ var _overview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./overview */ \"./src/pages/overview.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lucid_cardano__WEBPACK_IMPORTED_MODULE_5__]);\nlucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nfunction Wallet(param) {\n    let { stakeAddress  } = param;\n    _s();\n    const [isVisibleGrid, setIsVisibleGrid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [tokensNumber, setTokensNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [projectsNumber, setProjectNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [isLoading, setisLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loadedTokens, setLoadedTokens] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [nfts, setNfts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [fts, setFts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [overviewData, setOverviewData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getTokens = async ()=>{\n            if (stakeAddress == null) {\n            //base\n            } else {\n                if (stakeAddress.startsWith(\"*\")) {\n                    stakeAddress.slice(1);\n                    console.log(stakeAddress);\n                }\n                setisLoading(\"fetching\");\n                setIsVisibleGrid(false);\n                setIsVisible(true);\n                var policies = \"\";\n                if (sessionStorage.getItem(stakeAddress)) {\n                    policies = JSON.parse(sessionStorage.getItem(stakeAddress));\n                } else {\n                    let assets = await getAssetsFromKoios(stakeAddress);\n                    if (assets.length == 0) {\n                        console.log(\"no assets\");\n                    } else {\n                        let tokens = await createTokens(assets[0].asset_list);\n                        policies = groupTokensByPolicyId(tokens);\n                        sessionStorage.setItem(stakeAddress, JSON.stringify(policies));\n                    }\n                }\n                sortTokenFungibilities(policies);\n                setisLoading(\"done\");\n                setIsVisible(false);\n                setIsVisibleGrid(true);\n            }\n        };\n        getTokens();\n    }, [\n        stakeAddress\n    ]);\n    if (isLoading == \"fetching\") {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"loading-symbol\",\n                    style: {\n                        visibility: isVisible ? \"visible\" : \"hidden\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 77,\n                    columnNumber: 7\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                    className: \"loading-info\",\n                    children: loadedTokens\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 78,\n                    columnNumber: 7\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n            lineNumber: 75,\n            columnNumber: 12\n        }, this);\n    }\n    function refreshWallet() {\n        stakeAddress = \"*\" + stakeAddress;\n    }\n    function sortTokenFungibilities(policies) {\n        let poly = Object.keys(policies);\n        let _nfts = [];\n        let _fts = [];\n        for (const element of poly){\n            let p = policies[element][0];\n            if (p.quantity == 1) {\n                _nfts.push(policies[element]);\n            } else {\n                _fts.push(policies[element]);\n            }\n        }\n        setFts(_fts);\n        setNfts(_nfts);\n    }\n    async function getAssetsFromKoios(stakeAddress) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/account_assets\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_stake_addresses\": [\n                    stakeAddress\n                ]\n            })\n        });\n        const res = await req.json();\n        return res;\n    }\n    function groupTokensByPolicyId(tokenList) {\n        setTokensNumber(tokenList.length);\n        const policyList = {};\n        for(const token in tokenList){\n            const policyId = tokenList[token].policy_id;\n            if (policyId in policyList) {\n                policyList[policyId].push(tokenList[token]);\n            } else {\n                policyList[policyId] = [\n                    tokenList[token]\n                ];\n            }\n        }\n        const keys = Object.keys(policyList);\n        setProjectNumber(keys.length);\n        const _overviewData = {\n            stake: stakeAddress,\n            tokenNumber: tokenList.length,\n            projectNumber: keys.length\n        };\n        setOverviewData(_overviewData);\n        //sort policy list by collection number\n        const values = Object.values(policyList);\n        values.sort((a, b)=>a.length - b.length).reverse();\n        const _sorted = {};\n        for(let i = 0; i < keys.length; i++){\n            _sorted[keys[i]] = values[i];\n        }\n        return _sorted;\n    }\n    async function createTokens(assets) {\n        const _tokens = [];\n        for(let i = 0; i < assets.length; i++){\n            setLoadedTokens(\"Loading tokens: \" + i + \" of \" + assets.length);\n            let token = new _token__WEBPACK_IMPORTED_MODULE_4__[\"default\"](assets[i].asset_name, assets[i].policy_id, assets[i].quantity);\n            token.metadata = await token.getMetadata();\n            if (token.metadata != null) {\n                let ipfs = token.getIpfsFromMetadata();\n                token.ipfs = ipfs;\n                _tokens.push(token);\n            }\n        }\n        return _tokens;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            visibility: isVisibleGrid ? \"visible\" : \"hidden\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>refreshWallet(),\n                        children: \"Refresh\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 180,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 179,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 178,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"fifty\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_overview__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        data: overviewData\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 184,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fts__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        tokens: fts\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 185,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 183,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nfts__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                tokens: nfts\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 187,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n        lineNumber: 177,\n        columnNumber: 5\n    }, this);\n}\n_s(Wallet, \"8YNw/jtdOvFEjSLruBmlNFWcxe0=\");\n_c = Wallet;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Wallet);\nvar _c;\n$RefreshReg$(_c, \"Wallet\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDMUMsaURBQVFBO3dCQUFDd0YsTUFBUXJFOzs7Ozs7a0NBQ2xCLDhEQUFDcEIsNENBQUdBO3dCQUFDbUMsUUFBUWpCOzs7Ozs7Ozs7Ozs7MEJBRWYsOERBQUNuQiw2Q0FBSUE7Z0JBQUNvQyxRQUFVbkI7Ozs7Ozs7Ozs7OztBQUd0QjtHQWxMU2Q7S0FBQUE7QUFvTFQsK0RBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL3dhbGxldC5qcz85YTExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCBEcm9wZG93bkJveCBmcm9tIFwiLi9kcm9wZG93bkJveFwiO1xuaW1wb3J0IFRva2VuIGZyb20gXCIuL3Rva2VuXCI7XG5pbXBvcnQgeyBMdWNpZCwgS3VwbWlvcywgQmxvY2tmcm9zdCB9IGZyb20gXCJsdWNpZC1jYXJkYW5vXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IE5mdHMgZnJvbSBcIi4vbmZ0c1wiO1xuaW1wb3J0IEZ0cyBmcm9tIFwiLi9mdHNcIjtcbmltcG9ydCBPdmVydmlldyBmcm9tIFwiLi9vdmVydmlld1wiO1xuXG5cbmZ1bmN0aW9uIFdhbGxldCAoe3N0YWtlQWRkcmVzc30pIHtcbiAgY29uc3QgW2lzVmlzaWJsZUdyaWQsIHNldElzVmlzaWJsZUdyaWRdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW3Rva2Vuc051bWJlciwgc2V0VG9rZW5zTnVtYmVyXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFtwcm9qZWN0c051bWJlciwgc2V0UHJvamVjdE51bWJlcl0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRpc0xvYWRpbmddID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtpc1Zpc2libGUsIHNldElzVmlzaWJsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkZWRUb2tlbnMsIHNldExvYWRlZFRva2Vuc10gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbbmZ0cywgc2V0TmZ0c10gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbZnRzLCBzZXRGdHNdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW292ZXJ2aWV3RGF0YSwgc2V0T3ZlcnZpZXdEYXRhXSA9IHVzZVN0YXRlKCk7XG4gIFxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZ2V0VG9rZW5zID0gYXN5bmMgKCkgPT57XG5cbiAgICAgIGlmKHN0YWtlQWRkcmVzcyA9PSBudWxsKXtcbiAgICAgICAgLy9iYXNlXG4gICAgICB9XG4gICAgICBlbHNle1xuXG4gICAgICAgIGlmKHN0YWtlQWRkcmVzcy5zdGFydHNXaXRoKCcqJykpe1xuICAgICAgICAgIHN0YWtlQWRkcmVzcy5zbGljZSgxKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhzdGFrZUFkZHJlc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0aXNMb2FkaW5nKCdmZXRjaGluZycpO1xuICAgICAgICBzZXRJc1Zpc2libGVHcmlkKGZhbHNlKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKHRydWUpO1xuXG4gICAgICAgIHZhciBwb2xpY2llcyA9ICcnO1xuXG4gICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3Rha2VBZGRyZXNzKSl7XG4gICAgICAgICAgcG9saWNpZXMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3Rha2VBZGRyZXNzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcblxuICAgICAgICAgIGxldCBhc3NldHMgPSBhd2FpdCBnZXRBc3NldHNGcm9tS29pb3Moc3Rha2VBZGRyZXNzKTtcbiAgICAgICAgICBpZihhc3NldHMubGVuZ3RoID09IDAgKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBhc3NldHMnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSBhd2FpdCBjcmVhdGVUb2tlbnMoYXNzZXRzWzBdLmFzc2V0X2xpc3QpO1xuXG4gICAgICAgICAgICBwb2xpY2llcyA9IGdyb3VwVG9rZW5zQnlQb2xpY3lJZCh0b2tlbnMpO1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzdGFrZUFkZHJlc3MsIEpTT04uc3RyaW5naWZ5KHBvbGljaWVzKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBzb3J0VG9rZW5GdW5naWJpbGl0aWVzKHBvbGljaWVzKTtcblxuICAgICAgICBzZXRpc0xvYWRpbmcoJ2RvbmUnKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlR3JpZCh0cnVlKTtcblxuICAgICAgfVxuXG4gICAgfVxuICAgICAgXG4gICAgZ2V0VG9rZW5zKCk7XG4gIH0sIFtzdGFrZUFkZHJlc3NdKTtcblxuICBpZihpc0xvYWRpbmcgPT0gJ2ZldGNoaW5nJyl7XG4gICAgcmV0dXJuIDxkaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZy1zeW1ib2xcIiBzdHlsZT17eyB2aXNpYmlsaXR5OiBpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9fT48L2Rpdj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsb2FkaW5nLWluZm9cIj57bG9hZGVkVG9rZW5zfTwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoV2FsbGV0KCl7XG4gICAgc3Rha2VBZGRyZXNzID0gJyonK3N0YWtlQWRkcmVzcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnRUb2tlbkZ1bmdpYmlsaXRpZXMocG9saWNpZXMpe1xuICAgIGxldCBwb2x5ID0gT2JqZWN0LmtleXMocG9saWNpZXMpO1xuICAgIGxldCBfbmZ0cyA9IFtdO1xuICAgIGxldCBfZnRzID0gW107XG4gICAgZm9yKGNvbnN0IGVsZW1lbnQgb2YgcG9seSl7XG4gICAgICBsZXQgcCA9IHBvbGljaWVzW2VsZW1lbnRdWzBdO1xuICAgICAgaWYocC5xdWFudGl0eSA9PSAxKXtcbiAgICAgICAgX25mdHMucHVzaChwb2xpY2llc1tlbGVtZW50XSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBfZnRzLnB1c2gocG9saWNpZXNbZWxlbWVudF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRGdHMoX2Z0cyk7XG4gICAgc2V0TmZ0cyhfbmZ0cyk7XG4gIH1cblxuXG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzZXRzRnJvbUtvaW9zKHN0YWtlQWRkcmVzcyl7XG4gICAgY29uc3QgcmVxID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmtvaW9zLnJlc3QvYXBpL3YwL2FjY291bnRfYXNzZXRzJywge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiX3N0YWtlX2FkZHJlc3Nlc1wiOiBbXG4gICAgICAgICAgICAgIHN0YWtlQWRkcmVzc1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cblxuICBmdW5jdGlvbiBncm91cFRva2Vuc0J5UG9saWN5SWQodG9rZW5MaXN0KXtcbiAgICBzZXRUb2tlbnNOdW1iZXIodG9rZW5MaXN0Lmxlbmd0aCk7XG5cbiAgICBjb25zdCBwb2xpY3lMaXN0ID0ge307XG4gICAgZm9yKGNvbnN0IHRva2VuIGluIHRva2VuTGlzdCl7XG4gICAgICBjb25zdCBwb2xpY3lJZCA9IHRva2VuTGlzdFt0b2tlbl0ucG9saWN5X2lkO1xuICAgICAgXG4gICAgICBpZihwb2xpY3lJZCBpbiBwb2xpY3lMaXN0KXtcbiAgICAgICAgcG9saWN5TGlzdFtwb2xpY3lJZF0ucHVzaCh0b2tlbkxpc3RbdG9rZW5dKTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgcG9saWN5TGlzdFtwb2xpY3lJZF0gPSBbdG9rZW5MaXN0W3Rva2VuXV07XG4gICAgICB9XG5cbiAgICB9XG4gICAgY29uc3Qga2V5cz0gT2JqZWN0LmtleXMocG9saWN5TGlzdCk7XG4gICAgc2V0UHJvamVjdE51bWJlcihrZXlzLmxlbmd0aCk7XG5cbiAgICBjb25zdCBfb3ZlcnZpZXdEYXRhID0ge3N0YWtlOiBzdGFrZUFkZHJlc3MgLHRva2VuTnVtYmVyOiB0b2tlbkxpc3QubGVuZ3RoLCBwcm9qZWN0TnVtYmVyOiBrZXlzLmxlbmd0aH07XG5cbiAgICBzZXRPdmVydmlld0RhdGEoX292ZXJ2aWV3RGF0YSlcblxuICAgIC8vc29ydCBwb2xpY3kgbGlzdCBieSBjb2xsZWN0aW9uIG51bWJlclxuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocG9saWN5TGlzdCk7XG4gICAgdmFsdWVzLnNvcnQoKGEsYikgPT4gYS5sZW5ndGggLSBiLmxlbmd0aCkucmV2ZXJzZSgpO1xuICAgIGNvbnN0IF9zb3J0ZWQgPSB7fTtcbiAgICBmb3IgKGxldCBpPTA7aTxrZXlzLmxlbmd0aDtpKyspe1xuICAgICAgX3NvcnRlZFtrZXlzW2ldXSA9IHZhbHVlcyBbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9zb3J0ZWQ7XG5cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRva2Vucyhhc3NldHMpe1xuXG5cbiAgICBjb25zdCBfdG9rZW5zID0gW107XG4gICAgZm9yKGxldCBpID0wOyBpPGFzc2V0cy5sZW5ndGg7aSsrKXtcbiAgICAgIHNldExvYWRlZFRva2VucygnTG9hZGluZyB0b2tlbnM6ICcraSArICcgb2YgJyArYXNzZXRzLmxlbmd0aClcbiAgICAgIGxldCB0b2tlbiA9IG5ldyBUb2tlbihhc3NldHNbaV0uYXNzZXRfbmFtZSwgYXNzZXRzW2ldLnBvbGljeV9pZCwgYXNzZXRzW2ldLnF1YW50aXR5KTtcbiAgICAgIHRva2VuLm1ldGFkYXRhID0gYXdhaXQgdG9rZW4uZ2V0TWV0YWRhdGEoKTtcbiAgICAgIGlmKHRva2VuLm1ldGFkYXRhICE9IG51bGwpe1xuICAgICAgICBsZXQgaXBmcyA9IHRva2VuLmdldElwZnNGcm9tTWV0YWRhdGEoKTtcbiAgICAgICAgdG9rZW4uaXBmcyA9IGlwZnM7XG4gICAgICAgX3Rva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gX3Rva2VucztcblxuICB9XG5cblxuICByZXR1cm4oXG4gICAgPGRpdiBzdHlsZT17eyB2aXNpYmlsaXR5OiBpc1Zpc2libGVHcmlkID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfX0+XG4gICAgICA8bmF2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gcmVmcmVzaFdhbGxldCgpfT5SZWZyZXNoPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uYXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZnR5XCI+XG4gICAgICAgIDxPdmVydmlldyBkYXRhID0ge292ZXJ2aWV3RGF0YX0vPlxuICAgICAgICA8RnRzIHRva2Vucz17ZnRzfT48L0Z0cz5cbiAgICAgIDwvZGl2PlxuICAgICAgPE5mdHMgdG9rZW5zID0ge25mdHN9Lz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbGV0O1xuXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJMaW5rIiwiRHJvcGRvd25Cb3giLCJUb2tlbiIsIkx1Y2lkIiwiS3VwbWlvcyIsIkJsb2NrZnJvc3QiLCJSb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJOZnRzIiwiRnRzIiwiT3ZlcnZpZXciLCJXYWxsZXQiLCJzdGFrZUFkZHJlc3MiLCJpc1Zpc2libGVHcmlkIiwic2V0SXNWaXNpYmxlR3JpZCIsInRva2Vuc051bWJlciIsInNldFRva2Vuc051bWJlciIsInByb2plY3RzTnVtYmVyIiwic2V0UHJvamVjdE51bWJlciIsImlzTG9hZGluZyIsInNldGlzTG9hZGluZyIsImlzVmlzaWJsZSIsInNldElzVmlzaWJsZSIsImxvYWRlZFRva2VucyIsInNldExvYWRlZFRva2VucyIsIm5mdHMiLCJzZXROZnRzIiwiZnRzIiwic2V0RnRzIiwib3ZlcnZpZXdEYXRhIiwic2V0T3ZlcnZpZXdEYXRhIiwiZ2V0VG9rZW5zIiwic3RhcnRzV2l0aCIsInNsaWNlIiwiY29uc29sZSIsImxvZyIsInBvbGljaWVzIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwiYXNzZXRzIiwiZ2V0QXNzZXRzRnJvbUtvaW9zIiwibGVuZ3RoIiwidG9rZW5zIiwiY3JlYXRlVG9rZW5zIiwiYXNzZXRfbGlzdCIsImdyb3VwVG9rZW5zQnlQb2xpY3lJZCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzb3J0VG9rZW5GdW5naWJpbGl0aWVzIiwiZGl2IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwibGFiZWwiLCJyZWZyZXNoV2FsbGV0IiwicG9seSIsIk9iamVjdCIsImtleXMiLCJfbmZ0cyIsIl9mdHMiLCJlbGVtZW50IiwicCIsInF1YW50aXR5IiwicHVzaCIsInJlcSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJyZXMiLCJqc29uIiwidG9rZW5MaXN0IiwicG9saWN5TGlzdCIsInRva2VuIiwicG9saWN5SWQiLCJwb2xpY3lfaWQiLCJfb3ZlcnZpZXdEYXRhIiwic3Rha2UiLCJ0b2tlbk51bWJlciIsInByb2plY3ROdW1iZXIiLCJ2YWx1ZXMiLCJzb3J0IiwiYSIsImIiLCJyZXZlcnNlIiwiX3NvcnRlZCIsImkiLCJfdG9rZW5zIiwiYXNzZXRfbmFtZSIsIm1ldGFkYXRhIiwiZ2V0TWV0YWRhdGEiLCJpcGZzIiwiZ2V0SXBmc0Zyb21NZXRhZGF0YSIsIm5hdiIsImJ1dHRvbiIsIm9uQ2xpY2siLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/wallet.js\n"));

/***/ })

});