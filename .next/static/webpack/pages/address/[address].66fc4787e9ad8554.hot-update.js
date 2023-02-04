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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _dropdownBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdownBox */ \"./src/pages/dropdownBox.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./token */ \"./src/pages/token.js\");\n/* harmony import */ var lucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucid-cardano */ \"./node_modules/lucid-cardano/esm/mod.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _nfts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nfts */ \"./src/pages/nfts.js\");\n/* harmony import */ var _fts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fts */ \"./src/pages/fts.js\");\n/* harmony import */ var _overview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./overview */ \"./src/pages/overview.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lucid_cardano__WEBPACK_IMPORTED_MODULE_5__]);\nlucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nfunction Wallet(param) {\n    let { stakeAddress  } = param;\n    _s();\n    const [isVisibleGrid, setIsVisibleGrid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [tokensNumber, setTokensNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [projectsNumber, setProjectNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [isLoading, setisLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loadedTokens, setLoadedTokens] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [nfts, setNfts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [fts, setFts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [overviewData, setOverviewData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [refresh, setRefresh] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const refreshWallet = ()=>{};\n    }, [\n        refresh\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getTokens = async ()=>{\n            if (stakeAddress == null) {\n            //base\n            } else {\n                setisLoading(\"fetching\");\n                setIsVisibleGrid(false);\n                setIsVisible(true);\n                var policies = \"\";\n                if (sessionStorage.getItem(stakeAddress)) {\n                    policies = JSON.parse(sessionStorage.getItem(stakeAddress));\n                } else {\n                    let assets = await getAssetsFromKoios(stakeAddress);\n                    if (assets.length == 0) {\n                        console.log(\"no assets\");\n                    } else {\n                        let tokens = await createTokens(assets[0].asset_list);\n                        policies = groupTokensByPolicyId(tokens);\n                        sessionStorage.setItem(stakeAddress, JSON.stringify(policies));\n                    }\n                }\n                sortTokenFungibilities(policies);\n                setisLoading(\"done\");\n                setIsVisible(false);\n                setIsVisibleGrid(true);\n            }\n        };\n        getTokens();\n    }, [\n        stakeAddress\n    ]);\n    if (isLoading == \"fetching\") {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"loading-symbol\",\n                    style: {\n                        visibility: isVisible ? \"visible\" : \"hidden\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 78,\n                    columnNumber: 7\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                    className: \"loading-info\",\n                    children: loadedTokens\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 79,\n                    columnNumber: 7\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n            lineNumber: 76,\n            columnNumber: 12\n        }, this);\n    }\n    function refreshWallet() {\n        setRefresh(true);\n    }\n    function sortTokenFungibilities(policies) {\n        let poly = Object.keys(policies);\n        let _nfts = [];\n        let _fts = [];\n        for (const element of poly){\n            let p = policies[element][0];\n            if (p.quantity == 1) {\n                _nfts.push(policies[element]);\n            } else {\n                _fts.push(policies[element]);\n            }\n        }\n        setFts(_fts);\n        setNfts(_nfts);\n    }\n    async function getAssetsFromKoios(stakeAddress) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/account_assets\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_stake_addresses\": [\n                    stakeAddress\n                ]\n            })\n        });\n        const res = await req.json();\n        return res;\n    }\n    function groupTokensByPolicyId(tokenList) {\n        setTokensNumber(tokenList.length);\n        const policyList = {};\n        for(const token in tokenList){\n            const policyId = tokenList[token].policy_id;\n            if (policyId in policyList) {\n                policyList[policyId].push(tokenList[token]);\n            } else {\n                policyList[policyId] = [\n                    tokenList[token]\n                ];\n            }\n        }\n        const keys = Object.keys(policyList);\n        setProjectNumber(keys.length);\n        const _overviewData = {\n            stake: stakeAddress,\n            tokenNumber: tokenList.length,\n            projectNumber: keys.length\n        };\n        setOverviewData(_overviewData);\n        //sort policy list by collection number\n        const values = Object.values(policyList);\n        values.sort((a, b)=>a.length - b.length).reverse();\n        const _sorted = {};\n        for(let i = 0; i < keys.length; i++){\n            _sorted[keys[i]] = values[i];\n        }\n        return _sorted;\n    }\n    async function createTokens(assets) {\n        const _tokens = [];\n        for(let i = 0; i < assets.length; i++){\n            setLoadedTokens(\"Loading tokens: \" + i + \" of \" + assets.length);\n            let token = new _token__WEBPACK_IMPORTED_MODULE_4__[\"default\"](assets[i].asset_name, assets[i].policy_id, assets[i].quantity);\n            token.metadata = await token.getMetadata();\n            if (token.metadata != null) {\n                let ipfs = token.getIpfsFromMetadata();\n                token.ipfs = ipfs;\n                _tokens.push(token);\n            }\n        }\n        return _tokens;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            visibility: isVisibleGrid ? \"visible\" : \"hidden\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>refreshWallet(),\n                        children: \"Refresh\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 181,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 180,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 179,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"fifty\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_overview__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        data: overviewData\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 185,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fts__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        tokens: fts\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 186,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 184,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nfts__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                tokens: nfts\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 188,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n        lineNumber: 178,\n        columnNumber: 5\n    }, this);\n}\n_s(Wallet, \"8J1+vpGZnwx2nqIepvhaJm2pKyk=\");\n_c = Wallet;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Wallet);\nvar _c;\n$RefreshReg$(_c, \"Wallet\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qyw4REFBQ21CO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQzNDLGlEQUFRQTt3QkFBQ3dGLE1BQVFyRTs7Ozs7O2tDQUNsQiw4REFBQ3BCLDRDQUFHQTt3QkFBQ29DLFFBQVFsQjs7Ozs7Ozs7Ozs7OzBCQUVmLDhEQUFDbkIsNkNBQUlBO2dCQUFDcUMsUUFBVXBCOzs7Ozs7Ozs7Ozs7QUFHdEI7R0FuTFNkO0tBQUFBO0FBcUxULCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy93YWxsZXQuanM/OWExMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgRHJvcGRvd25Cb3ggZnJvbSBcIi4vZHJvcGRvd25Cb3hcIjtcbmltcG9ydCBUb2tlbiBmcm9tIFwiLi90b2tlblwiO1xuaW1wb3J0IHsgTHVjaWQsIEt1cG1pb3MsIEJsb2NrZnJvc3QgfSBmcm9tIFwibHVjaWQtY2FyZGFub1wiO1xuaW1wb3J0IHsgUm91dGVyLCB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBOZnRzIGZyb20gXCIuL25mdHNcIjtcbmltcG9ydCBGdHMgZnJvbSBcIi4vZnRzXCI7XG5pbXBvcnQgT3ZlcnZpZXcgZnJvbSBcIi4vb3ZlcnZpZXdcIjtcblxuXG5mdW5jdGlvbiBXYWxsZXQgKHtzdGFrZUFkZHJlc3N9KSB7XG4gIGNvbnN0IFtpc1Zpc2libGVHcmlkLCBzZXRJc1Zpc2libGVHcmlkXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFt0b2tlbnNOdW1iZXIsIHNldFRva2Vuc051bWJlcl0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbcHJvamVjdHNOdW1iZXIsIHNldFByb2plY3ROdW1iZXJdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0aXNMb2FkaW5nXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaXNWaXNpYmxlLCBzZXRJc1Zpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZGVkVG9rZW5zLCBzZXRMb2FkZWRUb2tlbnNdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW25mdHMsIHNldE5mdHNdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW2Z0cywgc2V0RnRzXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFtvdmVydmlld0RhdGEsIHNldE92ZXJ2aWV3RGF0YV0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbcmVmcmVzaCwgc2V0UmVmcmVzaF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIFxuICB1c2VFZmZlY3QoKCkgPT57XG4gICAgY29uc3QgcmVmcmVzaFdhbGxldCA9ICgpID0+e1xuXG4gICAgfVxuICB9LCBbcmVmcmVzaF0pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBnZXRUb2tlbnMgPSBhc3luYyAoKSA9PntcblxuICAgICAgaWYoc3Rha2VBZGRyZXNzID09IG51bGwpe1xuICAgICAgICAvL2Jhc2VcbiAgICAgIH1cbiAgICAgIGVsc2V7XG5cbiAgICAgICAgc2V0aXNMb2FkaW5nKCdmZXRjaGluZycpO1xuICAgICAgICBzZXRJc1Zpc2libGVHcmlkKGZhbHNlKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKHRydWUpO1xuXG4gICAgICAgIHZhciBwb2xpY2llcyA9ICcnO1xuXG4gICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3Rha2VBZGRyZXNzKSl7XG4gICAgICAgICAgcG9saWNpZXMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3Rha2VBZGRyZXNzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcblxuICAgICAgICAgIGxldCBhc3NldHMgPSBhd2FpdCBnZXRBc3NldHNGcm9tS29pb3Moc3Rha2VBZGRyZXNzKTtcbiAgICAgICAgICBpZihhc3NldHMubGVuZ3RoID09IDAgKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBhc3NldHMnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSBhd2FpdCBjcmVhdGVUb2tlbnMoYXNzZXRzWzBdLmFzc2V0X2xpc3QpO1xuXG4gICAgICAgICAgICBwb2xpY2llcyA9IGdyb3VwVG9rZW5zQnlQb2xpY3lJZCh0b2tlbnMpO1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzdGFrZUFkZHJlc3MsIEpTT04uc3RyaW5naWZ5KHBvbGljaWVzKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBzb3J0VG9rZW5GdW5naWJpbGl0aWVzKHBvbGljaWVzKTtcblxuICAgICAgICBzZXRpc0xvYWRpbmcoJ2RvbmUnKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlR3JpZCh0cnVlKTtcblxuICAgICAgfVxuXG4gICAgfVxuICAgICAgXG4gICAgZ2V0VG9rZW5zKCk7XG4gIH0sIFtzdGFrZUFkZHJlc3NdKTtcblxuICBpZihpc0xvYWRpbmcgPT0gJ2ZldGNoaW5nJyl7XG4gICAgcmV0dXJuIDxkaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZy1zeW1ib2xcIiBzdHlsZT17eyB2aXNpYmlsaXR5OiBpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9fT48L2Rpdj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsb2FkaW5nLWluZm9cIj57bG9hZGVkVG9rZW5zfTwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoV2FsbGV0KCl7XG4gICAgc2V0UmVmcmVzaCh0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnRUb2tlbkZ1bmdpYmlsaXRpZXMocG9saWNpZXMpe1xuICAgIGxldCBwb2x5ID0gT2JqZWN0LmtleXMocG9saWNpZXMpO1xuICAgIGxldCBfbmZ0cyA9IFtdO1xuICAgIGxldCBfZnRzID0gW107XG4gICAgZm9yKGNvbnN0IGVsZW1lbnQgb2YgcG9seSl7XG4gICAgICBsZXQgcCA9IHBvbGljaWVzW2VsZW1lbnRdWzBdO1xuICAgICAgaWYocC5xdWFudGl0eSA9PSAxKXtcbiAgICAgICAgX25mdHMucHVzaChwb2xpY2llc1tlbGVtZW50XSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBfZnRzLnB1c2gocG9saWNpZXNbZWxlbWVudF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRGdHMoX2Z0cyk7XG4gICAgc2V0TmZ0cyhfbmZ0cyk7XG4gIH1cblxuXG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzZXRzRnJvbUtvaW9zKHN0YWtlQWRkcmVzcyl7XG4gICAgY29uc3QgcmVxID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmtvaW9zLnJlc3QvYXBpL3YwL2FjY291bnRfYXNzZXRzJywge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiX3N0YWtlX2FkZHJlc3Nlc1wiOiBbXG4gICAgICAgICAgICAgIHN0YWtlQWRkcmVzc1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cblxuICBmdW5jdGlvbiBncm91cFRva2Vuc0J5UG9saWN5SWQodG9rZW5MaXN0KXtcbiAgICBzZXRUb2tlbnNOdW1iZXIodG9rZW5MaXN0Lmxlbmd0aCk7XG5cbiAgICBjb25zdCBwb2xpY3lMaXN0ID0ge307XG4gICAgZm9yKGNvbnN0IHRva2VuIGluIHRva2VuTGlzdCl7XG4gICAgICBjb25zdCBwb2xpY3lJZCA9IHRva2VuTGlzdFt0b2tlbl0ucG9saWN5X2lkO1xuICAgICAgXG4gICAgICBpZihwb2xpY3lJZCBpbiBwb2xpY3lMaXN0KXtcbiAgICAgICAgcG9saWN5TGlzdFtwb2xpY3lJZF0ucHVzaCh0b2tlbkxpc3RbdG9rZW5dKTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgcG9saWN5TGlzdFtwb2xpY3lJZF0gPSBbdG9rZW5MaXN0W3Rva2VuXV07XG4gICAgICB9XG5cbiAgICB9XG4gICAgY29uc3Qga2V5cz0gT2JqZWN0LmtleXMocG9saWN5TGlzdCk7XG4gICAgc2V0UHJvamVjdE51bWJlcihrZXlzLmxlbmd0aCk7XG5cbiAgICBjb25zdCBfb3ZlcnZpZXdEYXRhID0ge3N0YWtlOiBzdGFrZUFkZHJlc3MgLHRva2VuTnVtYmVyOiB0b2tlbkxpc3QubGVuZ3RoLCBwcm9qZWN0TnVtYmVyOiBrZXlzLmxlbmd0aH07XG5cbiAgICBzZXRPdmVydmlld0RhdGEoX292ZXJ2aWV3RGF0YSlcblxuICAgIC8vc29ydCBwb2xpY3kgbGlzdCBieSBjb2xsZWN0aW9uIG51bWJlclxuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocG9saWN5TGlzdCk7XG4gICAgdmFsdWVzLnNvcnQoKGEsYikgPT4gYS5sZW5ndGggLSBiLmxlbmd0aCkucmV2ZXJzZSgpO1xuICAgIGNvbnN0IF9zb3J0ZWQgPSB7fTtcbiAgICBmb3IgKGxldCBpPTA7aTxrZXlzLmxlbmd0aDtpKyspe1xuICAgICAgX3NvcnRlZFtrZXlzW2ldXSA9IHZhbHVlcyBbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9zb3J0ZWQ7XG5cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRva2Vucyhhc3NldHMpe1xuXG5cbiAgICBjb25zdCBfdG9rZW5zID0gW107XG4gICAgZm9yKGxldCBpID0wOyBpPGFzc2V0cy5sZW5ndGg7aSsrKXtcbiAgICAgIHNldExvYWRlZFRva2VucygnTG9hZGluZyB0b2tlbnM6ICcraSArICcgb2YgJyArYXNzZXRzLmxlbmd0aClcbiAgICAgIGxldCB0b2tlbiA9IG5ldyBUb2tlbihhc3NldHNbaV0uYXNzZXRfbmFtZSwgYXNzZXRzW2ldLnBvbGljeV9pZCwgYXNzZXRzW2ldLnF1YW50aXR5KTtcbiAgICAgIHRva2VuLm1ldGFkYXRhID0gYXdhaXQgdG9rZW4uZ2V0TWV0YWRhdGEoKTtcbiAgICAgIGlmKHRva2VuLm1ldGFkYXRhICE9IG51bGwpe1xuICAgICAgICBsZXQgaXBmcyA9IHRva2VuLmdldElwZnNGcm9tTWV0YWRhdGEoKTtcbiAgICAgICAgdG9rZW4uaXBmcyA9IGlwZnM7XG4gICAgICAgX3Rva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gX3Rva2VucztcblxuICB9XG5cblxuICByZXR1cm4oXG4gICAgPGRpdiBzdHlsZT17eyB2aXNpYmlsaXR5OiBpc1Zpc2libGVHcmlkID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfX0+XG4gICAgICA8bmF2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gcmVmcmVzaFdhbGxldCgpfT5SZWZyZXNoPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uYXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZnR5XCI+XG4gICAgICAgIDxPdmVydmlldyBkYXRhID0ge292ZXJ2aWV3RGF0YX0vPlxuICAgICAgICA8RnRzIHRva2Vucz17ZnRzfT48L0Z0cz5cbiAgICAgIDwvZGl2PlxuICAgICAgPE5mdHMgdG9rZW5zID0ge25mdHN9Lz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbGV0O1xuXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJMaW5rIiwiRHJvcGRvd25Cb3giLCJUb2tlbiIsIkx1Y2lkIiwiS3VwbWlvcyIsIkJsb2NrZnJvc3QiLCJSb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJOZnRzIiwiRnRzIiwiT3ZlcnZpZXciLCJXYWxsZXQiLCJzdGFrZUFkZHJlc3MiLCJpc1Zpc2libGVHcmlkIiwic2V0SXNWaXNpYmxlR3JpZCIsInRva2Vuc051bWJlciIsInNldFRva2Vuc051bWJlciIsInByb2plY3RzTnVtYmVyIiwic2V0UHJvamVjdE51bWJlciIsImlzTG9hZGluZyIsInNldGlzTG9hZGluZyIsImlzVmlzaWJsZSIsInNldElzVmlzaWJsZSIsImxvYWRlZFRva2VucyIsInNldExvYWRlZFRva2VucyIsIm5mdHMiLCJzZXROZnRzIiwiZnRzIiwic2V0RnRzIiwib3ZlcnZpZXdEYXRhIiwic2V0T3ZlcnZpZXdEYXRhIiwicmVmcmVzaCIsInNldFJlZnJlc2giLCJyZWZyZXNoV2FsbGV0IiwiZ2V0VG9rZW5zIiwicG9saWNpZXMiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJhc3NldHMiLCJnZXRBc3NldHNGcm9tS29pb3MiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwidG9rZW5zIiwiY3JlYXRlVG9rZW5zIiwiYXNzZXRfbGlzdCIsImdyb3VwVG9rZW5zQnlQb2xpY3lJZCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzb3J0VG9rZW5GdW5naWJpbGl0aWVzIiwiZGl2IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwibGFiZWwiLCJwb2x5IiwiT2JqZWN0Iiwia2V5cyIsIl9uZnRzIiwiX2Z0cyIsImVsZW1lbnQiLCJwIiwicXVhbnRpdHkiLCJwdXNoIiwicmVxIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInJlcyIsImpzb24iLCJ0b2tlbkxpc3QiLCJwb2xpY3lMaXN0IiwidG9rZW4iLCJwb2xpY3lJZCIsInBvbGljeV9pZCIsIl9vdmVydmlld0RhdGEiLCJzdGFrZSIsInRva2VuTnVtYmVyIiwicHJvamVjdE51bWJlciIsInZhbHVlcyIsInNvcnQiLCJhIiwiYiIsInJldmVyc2UiLCJfc29ydGVkIiwiaSIsIl90b2tlbnMiLCJhc3NldF9uYW1lIiwibWV0YWRhdGEiLCJnZXRNZXRhZGF0YSIsImlwZnMiLCJnZXRJcGZzRnJvbU1ldGFkYXRhIiwibmF2IiwiYnV0dG9uIiwib25DbGljayIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/wallet.js\n"));

/***/ })

});