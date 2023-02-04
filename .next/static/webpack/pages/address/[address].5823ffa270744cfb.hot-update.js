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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _dropdownBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdownBox */ \"./src/pages/dropdownBox.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./token */ \"./src/pages/token.js\");\n/* harmony import */ var lucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucid-cardano */ \"./node_modules/lucid-cardano/esm/mod.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _nfts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nfts */ \"./src/pages/nfts.js\");\n/* harmony import */ var _fts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fts */ \"./src/pages/fts.js\");\n/* harmony import */ var _overview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./overview */ \"./src/pages/overview.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lucid_cardano__WEBPACK_IMPORTED_MODULE_5__]);\nlucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nfunction Wallet(param) {\n    let { stakeAddress  } = param;\n    _s();\n    const [isVisibleGrid, setIsVisibleGrid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [tokensNumber, setTokensNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [projectsNumber, setProjectNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [isLoading, setisLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loadedTokens, setLoadedTokens] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [nfts, setNfts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [fts, setFts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [overviewData, setOverviewData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [refresh, setRefresh] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const refreshWallet = async ()=>{\n            if (stakeAddress == null) {\n            //base\n            } else {\n                setisLoading(\"fetching\");\n                setIsVisibleGrid(false);\n                setIsVisible(true);\n                var policies = \"\";\n                let assets = await getAssetsFromKoios(stakeAddress);\n                if (assets.length == 0) {\n                    console.log(\"no assets\");\n                } else {\n                    let tokens = await createTokens(assets[0].asset_list);\n                    let stakeData = groupTokensByPolicyId(tokens);\n                    sortTokenFungibilities(stakeData.policies);\n                    sessionStorage.setItem(stakeAddress, JSON.stringify(stakeData));\n                }\n                setisLoading(\"done\");\n                setIsVisible(false);\n                setIsVisibleGrid(true);\n            }\n        };\n        refreshWallet();\n    }, [\n        refresh\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getTokens = async ()=>{\n            if (stakeAddress == null) {\n            //base\n            } else {\n                setisLoading(\"fetching\");\n                setIsVisibleGrid(false);\n                setIsVisible(true);\n                var stakeData = \"\";\n                if (sessionStorage.getItem(stakeAddress)) {\n                    stakeData = JSON.parse(sessionStorage.getItem(stakeAddress));\n                    setOverviewData(stakeData);\n                    sortTokenFungibilities(stakeData.policies);\n                } else {\n                    let assets = await getAssetsFromKoios(stakeAddress);\n                    if (assets.length == 0) {\n                        stakeData = {\n                            stake: stakeAddress,\n                            tokenNumber: 0,\n                            projectNumber: 0,\n                            policies: []\n                        };\n                        setOverviewData(stakeData);\n                    } else {\n                        try {\n                            let tokens = await createTokens(assets[0].asset_list);\n                            stakeData = groupTokensByPolicyId(tokens);\n                            setOverviewData(stakeData);\n                            sessionStorage.setItem(stakeAddress, JSON.stringify(stakeData));\n                            sortTokenFungibilities(stakeData.policies);\n                        } catch (e) {\n                            console.log(\"no assets\");\n                        }\n                    }\n                }\n                setisLoading(\"done\");\n                setIsVisible(false);\n                setIsVisibleGrid(true);\n            }\n        };\n        getTokens();\n    }, [\n        stakeAddress\n    ]);\n    if (isLoading == \"fetching\") {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"loading-symbol\",\n                    style: {\n                        visibility: isVisible ? \"visible\" : \"hidden\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 118,\n                    columnNumber: 7\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                    className: \"loading-info\",\n                    children: loadedTokens\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 119,\n                    columnNumber: 7\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n            lineNumber: 116,\n            columnNumber: 12\n        }, this);\n    }\n    function refreshWallet() {\n        setRefresh(true);\n    }\n    function sortTokenFungibilities(policies) {\n        let poly = Object.keys(policies);\n        let _nfts = [];\n        let _fts = [];\n        for (const element of poly){\n            let p = policies[element][0];\n            if (p.quantity == 1) {\n                _nfts.push(policies[element]);\n            } else {\n                _fts.push(policies[element]);\n            }\n        }\n        setFts(_fts);\n        setNfts(_nfts);\n    }\n    async function getAssetsFromKoios(stakeAddress) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/account_assets\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_stake_addresses\": [\n                    stakeAddress\n                ]\n            })\n        });\n        const res = await req.json();\n        return res;\n    }\n    function groupTokensByPolicyId(tokenList) {\n        setTokensNumber(tokenList.length);\n        const policyList = {};\n        for(const token in tokenList){\n            const policyId = tokenList[token].policy_id;\n            if (policyId in policyList) {\n                policyList[policyId].push(tokenList[token]);\n            } else {\n                policyList[policyId] = [\n                    tokenList[token]\n                ];\n            }\n        }\n        const keys = Object.keys(policyList);\n        setProjectNumber(keys.length);\n        //sort policy list by collection number\n        const values = Object.values(policyList);\n        values.sort((a, b)=>a.length - b.length).reverse();\n        const _sorted = {};\n        for(let i = 0; i < keys.length; i++){\n            _sorted[keys[i]] = values[i];\n        }\n        const _overviewData = {\n            stake: stakeAddress,\n            tokenNumber: tokenList.length,\n            projectNumber: keys.length,\n            policies: _sorted\n        };\n        return _overviewData;\n    }\n    async function createTokens(assets) {\n        const _tokens = [];\n        for(let i = 0; i < assets.length; i++){\n            setLoadedTokens(\"Loading tokens: \" + i + \" of \" + assets.length);\n            let token = new _token__WEBPACK_IMPORTED_MODULE_4__[\"default\"](assets[i].asset_name, assets[i].policy_id, assets[i].quantity);\n            token.metadata = await token.getMetadata();\n            if (token.metadata != null) {\n                let ipfs = token.getIpfsFromMetadata();\n                token.ipfs = ipfs;\n                _tokens.push(token);\n            }\n        }\n        return _tokens;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            visibility: isVisibleGrid ? \"visible\" : \"hidden\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"sort-button\",\n                        onClick: ()=>refreshWallet(),\n                        children: \"Refresh\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 221,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 220,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 219,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"fifty\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_overview__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        data: overviewData\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 225,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fts__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        tokens: fts\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 226,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 224,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nfts__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                tokens: nfts\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 228,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n        lineNumber: 218,\n        columnNumber: 5\n    }, this);\n}\n_s(Wallet, \"8J1+vpGZnwx2nqIepvhaJm2pKyk=\");\n_c = Wallet;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Wallet);\nvar _c;\n$RefreshReg$(_c, \"Wallet\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bGV0LmpzPzlhMTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IERyb3Bkb3duQm94IGZyb20gXCIuL2Ryb3Bkb3duQm94XCI7XG5pbXBvcnQgVG9rZW4gZnJvbSBcIi4vdG9rZW5cIjtcbmltcG9ydCB7IEx1Y2lkLCBLdXBtaW9zLCBCbG9ja2Zyb3N0IH0gZnJvbSBcImx1Y2lkLWNhcmRhbm9cIjtcbmltcG9ydCB7IFJvdXRlciwgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgTmZ0cyBmcm9tIFwiLi9uZnRzXCI7XG5pbXBvcnQgRnRzIGZyb20gXCIuL2Z0c1wiO1xuaW1wb3J0IE92ZXJ2aWV3IGZyb20gXCIuL292ZXJ2aWV3XCI7XG5cblxuZnVuY3Rpb24gV2FsbGV0ICh7c3Rha2VBZGRyZXNzfSkge1xuICBjb25zdCBbaXNWaXNpYmxlR3JpZCwgc2V0SXNWaXNpYmxlR3JpZF0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbdG9rZW5zTnVtYmVyLCBzZXRUb2tlbnNOdW1iZXJdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW3Byb2plY3RzTnVtYmVyLCBzZXRQcm9qZWN0TnVtYmVyXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldGlzTG9hZGluZ10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2lzVmlzaWJsZSwgc2V0SXNWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRlZFRva2Vucywgc2V0TG9hZGVkVG9rZW5zXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFtuZnRzLCBzZXROZnRzXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFtmdHMsIHNldEZ0c10gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbb3ZlcnZpZXdEYXRhLCBzZXRPdmVydmlld0RhdGFdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW3JlZnJlc2gsIHNldFJlZnJlc2hdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBcbiAgdXNlRWZmZWN0KCgpID0+e1xuICAgIGNvbnN0IHJlZnJlc2hXYWxsZXQgPSBhc3luYyAoKSA9PntcbiAgICAgIGlmKHN0YWtlQWRkcmVzcyA9PSBudWxsKXtcbiAgICAgICAgLy9iYXNlXG4gICAgICB9XG4gICAgICBlbHNle1xuXG4gICAgICAgIHNldGlzTG9hZGluZygnZmV0Y2hpbmcnKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlR3JpZChmYWxzZSk7XG4gICAgICAgIHNldElzVmlzaWJsZSh0cnVlKTtcblxuICAgICAgICB2YXIgcG9saWNpZXMgPSAnJztcbiAgICAgICAgbGV0IGFzc2V0cyA9IGF3YWl0IGdldEFzc2V0c0Zyb21Lb2lvcyhzdGFrZUFkZHJlc3MpO1xuICAgICAgICBpZihhc3NldHMubGVuZ3RoID09IDAgKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gYXNzZXRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBsZXQgdG9rZW5zID0gYXdhaXQgY3JlYXRlVG9rZW5zKGFzc2V0c1swXS5hc3NldF9saXN0KTtcblxuICAgICAgICAgIGxldCBzdGFrZURhdGEgPSBncm91cFRva2Vuc0J5UG9saWN5SWQodG9rZW5zKTtcbiAgICAgICAgICBzb3J0VG9rZW5GdW5naWJpbGl0aWVzKHN0YWtlRGF0YS5wb2xpY2llcyk7XG5cblxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc3Rha2VBZGRyZXNzLCBKU09OLnN0cmluZ2lmeShzdGFrZURhdGEpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgc2V0aXNMb2FkaW5nKCdkb25lJyk7XG4gICAgICAgIHNldElzVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIHNldElzVmlzaWJsZUdyaWQodHJ1ZSk7XG4gICAgfX1cbiAgICByZWZyZXNoV2FsbGV0KCk7XG4gIH0sIFtyZWZyZXNoXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGdldFRva2VucyA9IGFzeW5jICgpID0+e1xuXG4gICAgICBpZihzdGFrZUFkZHJlc3MgPT0gbnVsbCl7XG4gICAgICAgIC8vYmFzZVxuICAgICAgfVxuICAgICAgZWxzZXtcblxuICAgICAgICBzZXRpc0xvYWRpbmcoJ2ZldGNoaW5nJyk7XG4gICAgICAgIHNldElzVmlzaWJsZUdyaWQoZmFsc2UpO1xuICAgICAgICBzZXRJc1Zpc2libGUodHJ1ZSk7XG5cbiAgICAgICAgdmFyIHN0YWtlRGF0YSA9ICcnO1xuXG4gICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3Rha2VBZGRyZXNzKSl7XG4gICAgICAgICAgc3Rha2VEYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHN0YWtlQWRkcmVzcykpO1xuXG4gICAgICAgICAgc2V0T3ZlcnZpZXdEYXRhKHN0YWtlRGF0YSk7XG4gICAgICAgICAgc29ydFRva2VuRnVuZ2liaWxpdGllcyhzdGFrZURhdGEucG9saWNpZXMpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcblxuICAgICAgICAgIGxldCBhc3NldHMgPSBhd2FpdCBnZXRBc3NldHNGcm9tS29pb3Moc3Rha2VBZGRyZXNzKTtcbiAgICAgICAgICBpZihhc3NldHMubGVuZ3RoID09IDAgKXtcbiAgICAgICAgICAgIHN0YWtlRGF0YSA9IHtzdGFrZSA6IHN0YWtlQWRkcmVzcywgdG9rZW5OdW1iZXI6IDAsIHByb2plY3ROdW1iZXI6MCwgcG9saWNpZXM6IFtdfTtcbiAgICAgICAgICAgIHNldE92ZXJ2aWV3RGF0YShzdGFrZURhdGEpO1xuXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgIGxldCB0b2tlbnMgPSBhd2FpdCBjcmVhdGVUb2tlbnMoYXNzZXRzWzBdLmFzc2V0X2xpc3QpO1xuXG4gICAgICAgICAgICAgIHN0YWtlRGF0YSA9IGdyb3VwVG9rZW5zQnlQb2xpY3lJZCh0b2tlbnMpO1xuICAgICAgICAgICAgICBzZXRPdmVydmlld0RhdGEoc3Rha2VEYXRhKTtcbiAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzdGFrZUFkZHJlc3MsIEpTT04uc3RyaW5naWZ5KHN0YWtlRGF0YSkpO1xuICAgICAgICAgICAgICBzb3J0VG9rZW5GdW5naWJpbGl0aWVzKHN0YWtlRGF0YS5wb2xpY2llcyk7XG4gICAgICAgICAgICB9Y2F0Y2h7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBhc3NldHMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICBzZXRpc0xvYWRpbmcoJ2RvbmUnKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlR3JpZCh0cnVlKTtcblxuICAgICAgfVxuXG4gICAgfVxuICAgICAgXG4gICAgZ2V0VG9rZW5zKCk7XG4gIH0sIFtzdGFrZUFkZHJlc3NdKTtcblxuICBpZihpc0xvYWRpbmcgPT0gJ2ZldGNoaW5nJyl7XG4gICAgcmV0dXJuIDxkaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZy1zeW1ib2xcIiBzdHlsZT17eyB2aXNpYmlsaXR5OiBpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9fT48L2Rpdj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsb2FkaW5nLWluZm9cIj57bG9hZGVkVG9rZW5zfTwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoV2FsbGV0KCl7XG4gICAgc2V0UmVmcmVzaCh0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnRUb2tlbkZ1bmdpYmlsaXRpZXMocG9saWNpZXMpe1xuICAgIGxldCBwb2x5ID0gT2JqZWN0LmtleXMocG9saWNpZXMpO1xuICAgIGxldCBfbmZ0cyA9IFtdO1xuICAgIGxldCBfZnRzID0gW107XG4gICAgZm9yKGNvbnN0IGVsZW1lbnQgb2YgcG9seSl7XG4gICAgICBsZXQgcCA9IHBvbGljaWVzW2VsZW1lbnRdWzBdO1xuICAgICAgaWYocC5xdWFudGl0eSA9PSAxKXtcbiAgICAgICAgX25mdHMucHVzaChwb2xpY2llc1tlbGVtZW50XSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBfZnRzLnB1c2gocG9saWNpZXNbZWxlbWVudF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRGdHMoX2Z0cyk7XG4gICAgc2V0TmZ0cyhfbmZ0cyk7XG4gIH1cblxuXG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzZXRzRnJvbUtvaW9zKHN0YWtlQWRkcmVzcyl7XG4gICAgY29uc3QgcmVxID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmtvaW9zLnJlc3QvYXBpL3YwL2FjY291bnRfYXNzZXRzJywge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiX3N0YWtlX2FkZHJlc3Nlc1wiOiBbXG4gICAgICAgICAgICAgIHN0YWtlQWRkcmVzc1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cblxuICBmdW5jdGlvbiBncm91cFRva2Vuc0J5UG9saWN5SWQodG9rZW5MaXN0KXtcbiAgICBzZXRUb2tlbnNOdW1iZXIodG9rZW5MaXN0Lmxlbmd0aCk7XG5cbiAgICBjb25zdCBwb2xpY3lMaXN0ID0ge307XG4gICAgZm9yKGNvbnN0IHRva2VuIGluIHRva2VuTGlzdCl7XG4gICAgICBjb25zdCBwb2xpY3lJZCA9IHRva2VuTGlzdFt0b2tlbl0ucG9saWN5X2lkO1xuICAgICAgXG4gICAgICBpZihwb2xpY3lJZCBpbiBwb2xpY3lMaXN0KXtcbiAgICAgICAgcG9saWN5TGlzdFtwb2xpY3lJZF0ucHVzaCh0b2tlbkxpc3RbdG9rZW5dKTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgcG9saWN5TGlzdFtwb2xpY3lJZF0gPSBbdG9rZW5MaXN0W3Rva2VuXV07XG4gICAgICB9XG5cbiAgICB9XG4gICAgY29uc3Qga2V5cz0gT2JqZWN0LmtleXMocG9saWN5TGlzdCk7XG4gICAgc2V0UHJvamVjdE51bWJlcihrZXlzLmxlbmd0aCk7XG5cblxuXG5cbiAgICAvL3NvcnQgcG9saWN5IGxpc3QgYnkgY29sbGVjdGlvbiBudW1iZXJcbiAgICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKHBvbGljeUxpc3QpO1xuICAgIHZhbHVlcy5zb3J0KChhLGIpID0+IGEubGVuZ3RoIC0gYi5sZW5ndGgpLnJldmVyc2UoKTtcbiAgICBjb25zdCBfc29ydGVkID0ge307XG4gICAgZm9yIChsZXQgaT0wO2k8a2V5cy5sZW5ndGg7aSsrKXtcbiAgICAgIF9zb3J0ZWRba2V5c1tpXV0gPSB2YWx1ZXMgW2ldO1xuICAgIH1cblxuICAgIGNvbnN0IF9vdmVydmlld0RhdGEgPSB7c3Rha2U6IHN0YWtlQWRkcmVzcyAsdG9rZW5OdW1iZXI6IHRva2VuTGlzdC5sZW5ndGgsIHByb2plY3ROdW1iZXI6IGtleXMubGVuZ3RoLCBwb2xpY2llczogX3NvcnRlZH07XG4gICAgcmV0dXJuIF9vdmVydmlld0RhdGE7XG5cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRva2Vucyhhc3NldHMpe1xuXG5cbiAgICBjb25zdCBfdG9rZW5zID0gW107XG4gICAgZm9yKGxldCBpID0wOyBpPGFzc2V0cy5sZW5ndGg7aSsrKXtcbiAgICAgIHNldExvYWRlZFRva2VucygnTG9hZGluZyB0b2tlbnM6ICcraSArICcgb2YgJyArYXNzZXRzLmxlbmd0aClcbiAgICAgIGxldCB0b2tlbiA9IG5ldyBUb2tlbihhc3NldHNbaV0uYXNzZXRfbmFtZSwgYXNzZXRzW2ldLnBvbGljeV9pZCwgYXNzZXRzW2ldLnF1YW50aXR5KTtcbiAgICAgIHRva2VuLm1ldGFkYXRhID0gYXdhaXQgdG9rZW4uZ2V0TWV0YWRhdGEoKTtcbiAgICAgIGlmKHRva2VuLm1ldGFkYXRhICE9IG51bGwpe1xuICAgICAgICBsZXQgaXBmcyA9IHRva2VuLmdldElwZnNGcm9tTWV0YWRhdGEoKTtcbiAgICAgICAgdG9rZW4uaXBmcyA9IGlwZnM7XG4gICAgICAgX3Rva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gX3Rva2VucztcblxuICB9XG5cblxuICByZXR1cm4oXG4gICAgPGRpdiBzdHlsZT17eyB2aXNpYmlsaXR5OiBpc1Zpc2libGVHcmlkID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfX0+XG4gICAgICA8bmF2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lID0gJ3NvcnQtYnV0dG9uJyBvbkNsaWNrPXsoKSA9PiByZWZyZXNoV2FsbGV0KCl9PlJlZnJlc2g8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlmdHlcIj5cbiAgICAgICAgPE92ZXJ2aWV3IGRhdGEgPSB7b3ZlcnZpZXdEYXRhfS8+XG4gICAgICAgIDxGdHMgdG9rZW5zPXtmdHN9PjwvRnRzPlxuICAgICAgPC9kaXY+XG4gICAgICA8TmZ0cyB0b2tlbnMgPSB7bmZ0c30vPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsZXQ7XG5cbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkxpbmsiLCJEcm9wZG93bkJveCIsIlRva2VuIiwiTHVjaWQiLCJLdXBtaW9zIiwiQmxvY2tmcm9zdCIsIlJvdXRlciIsInVzZVJvdXRlciIsIk5mdHMiLCJGdHMiLCJPdmVydmlldyIsIldhbGxldCIsInN0YWtlQWRkcmVzcyIsImlzVmlzaWJsZUdyaWQiLCJzZXRJc1Zpc2libGVHcmlkIiwidG9rZW5zTnVtYmVyIiwic2V0VG9rZW5zTnVtYmVyIiwicHJvamVjdHNOdW1iZXIiLCJzZXRQcm9qZWN0TnVtYmVyIiwiaXNMb2FkaW5nIiwic2V0aXNMb2FkaW5nIiwiaXNWaXNpYmxlIiwic2V0SXNWaXNpYmxlIiwibG9hZGVkVG9rZW5zIiwic2V0TG9hZGVkVG9rZW5zIiwibmZ0cyIsInNldE5mdHMiLCJmdHMiLCJzZXRGdHMiLCJvdmVydmlld0RhdGEiLCJzZXRPdmVydmlld0RhdGEiLCJyZWZyZXNoIiwic2V0UmVmcmVzaCIsInJlZnJlc2hXYWxsZXQiLCJwb2xpY2llcyIsImFzc2V0cyIsImdldEFzc2V0c0Zyb21Lb2lvcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJ0b2tlbnMiLCJjcmVhdGVUb2tlbnMiLCJhc3NldF9saXN0Iiwic3Rha2VEYXRhIiwiZ3JvdXBUb2tlbnNCeVBvbGljeUlkIiwic29ydFRva2VuRnVuZ2liaWxpdGllcyIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRUb2tlbnMiLCJnZXRJdGVtIiwicGFyc2UiLCJzdGFrZSIsInRva2VuTnVtYmVyIiwicHJvamVjdE51bWJlciIsImRpdiIsImNsYXNzTmFtZSIsInN0eWxlIiwidmlzaWJpbGl0eSIsImxhYmVsIiwicG9seSIsIk9iamVjdCIsImtleXMiLCJfbmZ0cyIsIl9mdHMiLCJlbGVtZW50IiwicCIsInF1YW50aXR5IiwicHVzaCIsInJlcSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJyZXMiLCJqc29uIiwidG9rZW5MaXN0IiwicG9saWN5TGlzdCIsInRva2VuIiwicG9saWN5SWQiLCJwb2xpY3lfaWQiLCJ2YWx1ZXMiLCJzb3J0IiwiYSIsImIiLCJyZXZlcnNlIiwiX3NvcnRlZCIsImkiLCJfb3ZlcnZpZXdEYXRhIiwiX3Rva2VucyIsImFzc2V0X25hbWUiLCJtZXRhZGF0YSIsImdldE1ldGFkYXRhIiwiaXBmcyIsImdldElwZnNGcm9tTWV0YWRhdGEiLCJuYXYiLCJidXR0b24iLCJvbkNsaWNrIiwiZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/wallet.js\n"));

/***/ })

});