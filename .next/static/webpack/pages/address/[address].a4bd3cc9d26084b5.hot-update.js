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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _dropdownBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdownBox */ \"./src/pages/dropdownBox.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./token */ \"./src/pages/token.js\");\n/* harmony import */ var lucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucid-cardano */ \"./node_modules/lucid-cardano/esm/mod.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _nfts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nfts */ \"./src/pages/nfts.js\");\n/* harmony import */ var _fts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fts */ \"./src/pages/fts.js\");\n/* harmony import */ var _overview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./overview */ \"./src/pages/overview.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lucid_cardano__WEBPACK_IMPORTED_MODULE_5__]);\nlucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nfunction Wallet(param) {\n    let { stakeAddress  } = param;\n    _s();\n    const [isVisibleGrid, setIsVisibleGrid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [tokensNumber, setTokensNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [projectsNumber, setProjectNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [isLoading, setisLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loadedTokens, setLoadedTokens] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [nfts, setNfts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [fts, setFts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [overviewData, setOverviewData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [refresh, setRefresh] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const refreshWallet = async ()=>{\n            if (stakeAddress == null) {\n            //base\n            } else {\n                setisLoading(\"fetching\");\n                setIsVisibleGrid(false);\n                setIsVisible(true);\n                var policies = \"\";\n                let assets = await getAssetsFromKoios(stakeAddress);\n                if (assets.length == 0) {\n                    console.log(\"no assets\");\n                } else {\n                    let tokens = await createTokens(assets[0].asset_list);\n                    policies = groupTokensByPolicyId(tokens);\n                    sessionStorage.setItem(stakeAddress, JSON.stringify(policies));\n                }\n                sortTokenFungibilities(policies);\n                setisLoading(\"done\");\n                setIsVisible(false);\n                setIsVisibleGrid(true);\n            }\n        };\n        refreshWallet();\n    }, [\n        refresh\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getTokens = async ()=>{\n            if (stakeAddress == null) {\n            //base\n            } else {\n                setisLoading(\"fetching\");\n                setIsVisibleGrid(false);\n                setIsVisible(true);\n                var policies = \"\";\n                if (sessionStorage.getItem(stakeAddress)) {\n                    policies = JSON.parse(sessionStorage.getItem(stakeAddress));\n                } else {\n                    let assets = await getAssetsFromKoios(stakeAddress);\n                    if (assets.length == 0) {\n                        console.log(\"no assets\");\n                    } else {\n                        let tokens = await createTokens(assets[0].asset_list);\n                        policies = groupTokensByPolicyId(tokens);\n                        sessionStorage.setItem(stakeAddress, JSON.stringify(policies));\n                    }\n                }\n                sortTokenFungibilities(policies);\n                setisLoading(\"done\");\n                setIsVisible(false);\n                setIsVisibleGrid(true);\n            }\n        };\n        getTokens();\n    }, [\n        stakeAddress\n    ]);\n    if (isLoading == \"fetching\") {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"loading-symbol\",\n                    style: {\n                        visibility: isVisible ? \"visible\" : \"hidden\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 103,\n                    columnNumber: 7\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                    className: \"loading-info\",\n                    children: loadedTokens\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 104,\n                    columnNumber: 7\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n            lineNumber: 101,\n            columnNumber: 12\n        }, this);\n    }\n    function refreshWallet() {\n        setRefresh(true);\n    }\n    function sortTokenFungibilities(policies) {\n        let poly = Object.keys(policies);\n        let _nfts = [];\n        let _fts = [];\n        for (const element of poly){\n            let p = policies[element][0];\n            if (p.quantity == 1) {\n                _nfts.push(policies[element]);\n            } else {\n                _fts.push(policies[element]);\n            }\n        }\n        setFts(_fts);\n        setNfts(_nfts);\n    }\n    async function getAssetsFromKoios(stakeAddress) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/account_assets\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_stake_addresses\": [\n                    stakeAddress\n                ]\n            })\n        });\n        const res = await req.json();\n        return res;\n    }\n    function groupTokensByPolicyId(tokenList) {\n        setTokensNumber(tokenList.length);\n        const policyList = {};\n        for(const token in tokenList){\n            const policyId = tokenList[token].policy_id;\n            if (policyId in policyList) {\n                policyList[policyId].push(tokenList[token]);\n            } else {\n                policyList[policyId] = [\n                    tokenList[token]\n                ];\n            }\n        }\n        const keys = Object.keys(policyList);\n        setProjectNumber(keys.length);\n        setOverviewData(_overviewData);\n        //sort policy list by collection number\n        const values = Object.values(policyList);\n        values.sort((a, b)=>a.length - b.length).reverse();\n        const _sorted = {};\n        for(let i = 0; i < keys.length; i++){\n            _sorted[keys[i]] = values[i];\n        }\n        const _overviewData = {\n            stake: stakeAddress,\n            tokenNumber: tokenList.length,\n            projectNumber: keys.length,\n            policies: _sorted\n        };\n        return _overviewData;\n    }\n    async function createTokens(assets) {\n        const _tokens = [];\n        for(let i = 0; i < assets.length; i++){\n            setLoadedTokens(\"Loading tokens: \" + i + \" of \" + assets.length);\n            let token = new _token__WEBPACK_IMPORTED_MODULE_4__[\"default\"](assets[i].asset_name, assets[i].policy_id, assets[i].quantity);\n            token.metadata = await token.getMetadata();\n            if (token.metadata != null) {\n                let ipfs = token.getIpfsFromMetadata();\n                token.ipfs = ipfs;\n                _tokens.push(token);\n            }\n        }\n        return _tokens;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            visibility: isVisibleGrid ? \"visible\" : \"hidden\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"sort-button\",\n                        onClick: ()=>refreshWallet(),\n                        children: \"Refresh\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 208,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                    lineNumber: 207,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 206,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"fifty\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_overview__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        data: overviewData\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 212,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fts__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        tokens: fts\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                        lineNumber: 213,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 211,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nfts__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                tokens: nfts\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n                lineNumber: 215,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/wallet.js\",\n        lineNumber: 205,\n        columnNumber: 5\n    }, this);\n}\n_s(Wallet, \"8J1+vpGZnwx2nqIepvhaJm2pKyk=\");\n_c = Wallet;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Wallet);\nvar _c;\n$RefreshReg$(_c, \"Wallet\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNrRCxFQUFFLENBQUNLLFVBQVUsRUFBRXZELE1BQU0sQ0FBQ2tELEVBQUUsQ0FBQ1IsU0FBUyxFQUFFMUMsTUFBTSxDQUFDa0QsRUFBRSxDQUFDckIsUUFBUTtZQUNuRlcsTUFBTWdCLFFBQVEsR0FBRyxNQUFNaEIsTUFBTWlCLFdBQVc7WUFDeEMsSUFBR2pCLE1BQU1nQixRQUFRLElBQUksSUFBSSxFQUFDO2dCQUN4QixJQUFJRSxPQUFPbEIsTUFBTW1CLG1CQUFtQjtnQkFDcENuQixNQUFNa0IsSUFBSSxHQUFHQTtnQkFDZEosUUFBUXhCLElBQUksQ0FBQ1U7WUFDZCxDQUFDO1FBRUg7UUFDQSxPQUFPYztJQUVUO0lBR0EscUJBQ0UsOERBQUNyQztRQUFJRSxPQUFPO1lBQUVDLFlBQVkxQyxnQkFBZ0IsWUFBWSxRQUFRO1FBQUM7OzBCQUM3RCw4REFBQ2tGOzBCQUNDLDRFQUFDM0M7OEJBQ0MsNEVBQUM0Qzt3QkFBTzNDLFdBQVk7d0JBQWM0QyxTQUFTLElBQU1oRTtrQ0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBR3RFLDhEQUFDbUI7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDM0MsaURBQVFBO3dCQUFDd0YsTUFBUXJFOzs7Ozs7a0NBQ2xCLDhEQUFDcEIsNENBQUdBO3dCQUFDK0IsUUFBUWI7Ozs7Ozs7Ozs7OzswQkFFZiw4REFBQ25CLDZDQUFJQTtnQkFBQ2dDLFFBQVVmOzs7Ozs7Ozs7Ozs7QUFHdEI7R0E5TVNkO0tBQUFBO0FBZ05ULCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy93YWxsZXQuanM/OWExMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgRHJvcGRvd25Cb3ggZnJvbSBcIi4vZHJvcGRvd25Cb3hcIjtcbmltcG9ydCBUb2tlbiBmcm9tIFwiLi90b2tlblwiO1xuaW1wb3J0IHsgTHVjaWQsIEt1cG1pb3MsIEJsb2NrZnJvc3QgfSBmcm9tIFwibHVjaWQtY2FyZGFub1wiO1xuaW1wb3J0IHsgUm91dGVyLCB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBOZnRzIGZyb20gXCIuL25mdHNcIjtcbmltcG9ydCBGdHMgZnJvbSBcIi4vZnRzXCI7XG5pbXBvcnQgT3ZlcnZpZXcgZnJvbSBcIi4vb3ZlcnZpZXdcIjtcblxuXG5mdW5jdGlvbiBXYWxsZXQgKHtzdGFrZUFkZHJlc3N9KSB7XG4gIGNvbnN0IFtpc1Zpc2libGVHcmlkLCBzZXRJc1Zpc2libGVHcmlkXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFt0b2tlbnNOdW1iZXIsIHNldFRva2Vuc051bWJlcl0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbcHJvamVjdHNOdW1iZXIsIHNldFByb2plY3ROdW1iZXJdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0aXNMb2FkaW5nXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaXNWaXNpYmxlLCBzZXRJc1Zpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZGVkVG9rZW5zLCBzZXRMb2FkZWRUb2tlbnNdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW25mdHMsIHNldE5mdHNdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW2Z0cywgc2V0RnRzXSA9IHVzZVN0YXRlKCk7XG4gIGNvbnN0IFtvdmVydmlld0RhdGEsIHNldE92ZXJ2aWV3RGF0YV0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbcmVmcmVzaCwgc2V0UmVmcmVzaF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIFxuICB1c2VFZmZlY3QoKCkgPT57XG4gICAgY29uc3QgcmVmcmVzaFdhbGxldCA9IGFzeW5jICgpID0+e1xuICAgICAgaWYoc3Rha2VBZGRyZXNzID09IG51bGwpe1xuICAgICAgICAvL2Jhc2VcbiAgICAgIH1cbiAgICAgIGVsc2V7XG5cbiAgICAgICAgc2V0aXNMb2FkaW5nKCdmZXRjaGluZycpO1xuICAgICAgICBzZXRJc1Zpc2libGVHcmlkKGZhbHNlKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKHRydWUpO1xuXG4gICAgICAgIHZhciBwb2xpY2llcyA9ICcnO1xuICAgICAgICBsZXQgYXNzZXRzID0gYXdhaXQgZ2V0QXNzZXRzRnJvbUtvaW9zKHN0YWtlQWRkcmVzcyk7XG4gICAgICAgIGlmKGFzc2V0cy5sZW5ndGggPT0gMCApe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBhc3NldHMnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgIGxldCB0b2tlbnMgPSBhd2FpdCBjcmVhdGVUb2tlbnMoYXNzZXRzWzBdLmFzc2V0X2xpc3QpO1xuXG4gICAgICAgICAgcG9saWNpZXMgPSBncm91cFRva2Vuc0J5UG9saWN5SWQodG9rZW5zKTtcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHN0YWtlQWRkcmVzcywgSlNPTi5zdHJpbmdpZnkocG9saWNpZXMpKTtcbiAgICAgICAgfVxuICAgICAgICBzb3J0VG9rZW5GdW5naWJpbGl0aWVzKHBvbGljaWVzKTtcblxuICAgICAgICBzZXRpc0xvYWRpbmcoJ2RvbmUnKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlR3JpZCh0cnVlKTtcbiAgICB9fVxuICAgIHJlZnJlc2hXYWxsZXQoKTtcbiAgfSwgW3JlZnJlc2hdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZ2V0VG9rZW5zID0gYXN5bmMgKCkgPT57XG5cbiAgICAgIGlmKHN0YWtlQWRkcmVzcyA9PSBudWxsKXtcbiAgICAgICAgLy9iYXNlXG4gICAgICB9XG4gICAgICBlbHNle1xuXG4gICAgICAgIHNldGlzTG9hZGluZygnZmV0Y2hpbmcnKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlR3JpZChmYWxzZSk7XG4gICAgICAgIHNldElzVmlzaWJsZSh0cnVlKTtcblxuICAgICAgICB2YXIgcG9saWNpZXMgPSAnJztcblxuICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHN0YWtlQWRkcmVzcykpe1xuICAgICAgICAgIHBvbGljaWVzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHN0YWtlQWRkcmVzcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG5cbiAgICAgICAgICBsZXQgYXNzZXRzID0gYXdhaXQgZ2V0QXNzZXRzRnJvbUtvaW9zKHN0YWtlQWRkcmVzcyk7XG4gICAgICAgICAgaWYoYXNzZXRzLmxlbmd0aCA9PSAwICl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gYXNzZXRzJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gYXdhaXQgY3JlYXRlVG9rZW5zKGFzc2V0c1swXS5hc3NldF9saXN0KTtcblxuICAgICAgICAgICAgcG9saWNpZXMgPSBncm91cFRva2Vuc0J5UG9saWN5SWQodG9rZW5zKTtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc3Rha2VBZGRyZXNzLCBKU09OLnN0cmluZ2lmeShwb2xpY2llcykpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgc29ydFRva2VuRnVuZ2liaWxpdGllcyhwb2xpY2llcyk7XG5cbiAgICAgICAgc2V0aXNMb2FkaW5nKCdkb25lJyk7XG4gICAgICAgIHNldElzVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIHNldElzVmlzaWJsZUdyaWQodHJ1ZSk7XG5cbiAgICAgIH1cblxuICAgIH1cbiAgICAgIFxuICAgIGdldFRva2VucygpO1xuICB9LCBbc3Rha2VBZGRyZXNzXSk7XG5cbiAgaWYoaXNMb2FkaW5nID09ICdmZXRjaGluZycpe1xuICAgIHJldHVybiA8ZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRpbmctc3ltYm9sXCIgc3R5bGU9e3sgdmlzaWJpbGl0eTogaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfX0+PC9kaXY+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibG9hZGluZy1pbmZvXCI+e2xvYWRlZFRva2Vuc308L2xhYmVsPlxuICAgIDwvZGl2PlxuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaFdhbGxldCgpe1xuICAgIHNldFJlZnJlc2godHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzb3J0VG9rZW5GdW5naWJpbGl0aWVzKHBvbGljaWVzKXtcbiAgICBsZXQgcG9seSA9IE9iamVjdC5rZXlzKHBvbGljaWVzKTtcbiAgICBsZXQgX25mdHMgPSBbXTtcbiAgICBsZXQgX2Z0cyA9IFtdO1xuICAgIGZvcihjb25zdCBlbGVtZW50IG9mIHBvbHkpe1xuICAgICAgbGV0IHAgPSBwb2xpY2llc1tlbGVtZW50XVswXTtcbiAgICAgIGlmKHAucXVhbnRpdHkgPT0gMSl7XG4gICAgICAgIF9uZnRzLnB1c2gocG9saWNpZXNbZWxlbWVudF0pO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgX2Z0cy5wdXNoKHBvbGljaWVzW2VsZW1lbnRdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0RnRzKF9mdHMpO1xuICAgIHNldE5mdHMoX25mdHMpO1xuICB9XG5cblxuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldEFzc2V0c0Zyb21Lb2lvcyhzdGFrZUFkZHJlc3Mpe1xuICAgIGNvbnN0IHJlcSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5rb2lvcy5yZXN0L2FwaS92MC9hY2NvdW50X2Fzc2V0cycsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcIl9zdGFrZV9hZGRyZXNzZXNcIjogW1xuICAgICAgICAgICAgICBzdGFrZUFkZHJlc3NcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZ3JvdXBUb2tlbnNCeVBvbGljeUlkKHRva2VuTGlzdCl7XG4gICAgc2V0VG9rZW5zTnVtYmVyKHRva2VuTGlzdC5sZW5ndGgpO1xuXG4gICAgY29uc3QgcG9saWN5TGlzdCA9IHt9O1xuICAgIGZvcihjb25zdCB0b2tlbiBpbiB0b2tlbkxpc3Qpe1xuICAgICAgY29uc3QgcG9saWN5SWQgPSB0b2tlbkxpc3RbdG9rZW5dLnBvbGljeV9pZDtcbiAgICAgIFxuICAgICAgaWYocG9saWN5SWQgaW4gcG9saWN5TGlzdCl7XG4gICAgICAgIHBvbGljeUxpc3RbcG9saWN5SWRdLnB1c2godG9rZW5MaXN0W3Rva2VuXSk7XG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHBvbGljeUxpc3RbcG9saWN5SWRdID0gW3Rva2VuTGlzdFt0b2tlbl1dO1xuICAgICAgfVxuXG4gICAgfVxuICAgIGNvbnN0IGtleXM9IE9iamVjdC5rZXlzKHBvbGljeUxpc3QpO1xuICAgIHNldFByb2plY3ROdW1iZXIoa2V5cy5sZW5ndGgpO1xuXG5cbiAgICBzZXRPdmVydmlld0RhdGEoX292ZXJ2aWV3RGF0YSlcblxuICAgIC8vc29ydCBwb2xpY3kgbGlzdCBieSBjb2xsZWN0aW9uIG51bWJlclxuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocG9saWN5TGlzdCk7XG4gICAgdmFsdWVzLnNvcnQoKGEsYikgPT4gYS5sZW5ndGggLSBiLmxlbmd0aCkucmV2ZXJzZSgpO1xuICAgIGNvbnN0IF9zb3J0ZWQgPSB7fTtcbiAgICBmb3IgKGxldCBpPTA7aTxrZXlzLmxlbmd0aDtpKyspe1xuICAgICAgX3NvcnRlZFtrZXlzW2ldXSA9IHZhbHVlcyBbaV07XG4gICAgfVxuXG4gICAgY29uc3QgX292ZXJ2aWV3RGF0YSA9IHtzdGFrZTogc3Rha2VBZGRyZXNzICx0b2tlbk51bWJlcjogdG9rZW5MaXN0Lmxlbmd0aCwgcHJvamVjdE51bWJlcjoga2V5cy5sZW5ndGgsIHBvbGljaWVzOiBfc29ydGVkfTtcblxuXG4gICAgcmV0dXJuIF9vdmVydmlld0RhdGE7XG5cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRva2Vucyhhc3NldHMpe1xuXG5cbiAgICBjb25zdCBfdG9rZW5zID0gW107XG4gICAgZm9yKGxldCBpID0wOyBpPGFzc2V0cy5sZW5ndGg7aSsrKXtcbiAgICAgIHNldExvYWRlZFRva2VucygnTG9hZGluZyB0b2tlbnM6ICcraSArICcgb2YgJyArYXNzZXRzLmxlbmd0aClcbiAgICAgIGxldCB0b2tlbiA9IG5ldyBUb2tlbihhc3NldHNbaV0uYXNzZXRfbmFtZSwgYXNzZXRzW2ldLnBvbGljeV9pZCwgYXNzZXRzW2ldLnF1YW50aXR5KTtcbiAgICAgIHRva2VuLm1ldGFkYXRhID0gYXdhaXQgdG9rZW4uZ2V0TWV0YWRhdGEoKTtcbiAgICAgIGlmKHRva2VuLm1ldGFkYXRhICE9IG51bGwpe1xuICAgICAgICBsZXQgaXBmcyA9IHRva2VuLmdldElwZnNGcm9tTWV0YWRhdGEoKTtcbiAgICAgICAgdG9rZW4uaXBmcyA9IGlwZnM7XG4gICAgICAgX3Rva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gX3Rva2VucztcblxuICB9XG5cblxuICByZXR1cm4oXG4gICAgPGRpdiBzdHlsZT17eyB2aXNpYmlsaXR5OiBpc1Zpc2libGVHcmlkID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfX0+XG4gICAgICA8bmF2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lID0gJ3NvcnQtYnV0dG9uJyBvbkNsaWNrPXsoKSA9PiByZWZyZXNoV2FsbGV0KCl9PlJlZnJlc2g8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlmdHlcIj5cbiAgICAgICAgPE92ZXJ2aWV3IGRhdGEgPSB7b3ZlcnZpZXdEYXRhfS8+XG4gICAgICAgIDxGdHMgdG9rZW5zPXtmdHN9PjwvRnRzPlxuICAgICAgPC9kaXY+XG4gICAgICA8TmZ0cyB0b2tlbnMgPSB7bmZ0c30vPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsZXQ7XG5cbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkxpbmsiLCJEcm9wZG93bkJveCIsIlRva2VuIiwiTHVjaWQiLCJLdXBtaW9zIiwiQmxvY2tmcm9zdCIsIlJvdXRlciIsInVzZVJvdXRlciIsIk5mdHMiLCJGdHMiLCJPdmVydmlldyIsIldhbGxldCIsInN0YWtlQWRkcmVzcyIsImlzVmlzaWJsZUdyaWQiLCJzZXRJc1Zpc2libGVHcmlkIiwidG9rZW5zTnVtYmVyIiwic2V0VG9rZW5zTnVtYmVyIiwicHJvamVjdHNOdW1iZXIiLCJzZXRQcm9qZWN0TnVtYmVyIiwiaXNMb2FkaW5nIiwic2V0aXNMb2FkaW5nIiwiaXNWaXNpYmxlIiwic2V0SXNWaXNpYmxlIiwibG9hZGVkVG9rZW5zIiwic2V0TG9hZGVkVG9rZW5zIiwibmZ0cyIsInNldE5mdHMiLCJmdHMiLCJzZXRGdHMiLCJvdmVydmlld0RhdGEiLCJzZXRPdmVydmlld0RhdGEiLCJyZWZyZXNoIiwic2V0UmVmcmVzaCIsInJlZnJlc2hXYWxsZXQiLCJwb2xpY2llcyIsImFzc2V0cyIsImdldEFzc2V0c0Zyb21Lb2lvcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJ0b2tlbnMiLCJjcmVhdGVUb2tlbnMiLCJhc3NldF9saXN0IiwiZ3JvdXBUb2tlbnNCeVBvbGljeUlkIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInNvcnRUb2tlbkZ1bmdpYmlsaXRpZXMiLCJnZXRUb2tlbnMiLCJnZXRJdGVtIiwicGFyc2UiLCJkaXYiLCJjbGFzc05hbWUiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJsYWJlbCIsInBvbHkiLCJPYmplY3QiLCJrZXlzIiwiX25mdHMiLCJfZnRzIiwiZWxlbWVudCIsInAiLCJxdWFudGl0eSIsInB1c2giLCJyZXEiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwicmVzIiwianNvbiIsInRva2VuTGlzdCIsInBvbGljeUxpc3QiLCJ0b2tlbiIsInBvbGljeUlkIiwicG9saWN5X2lkIiwiX292ZXJ2aWV3RGF0YSIsInZhbHVlcyIsInNvcnQiLCJhIiwiYiIsInJldmVyc2UiLCJfc29ydGVkIiwiaSIsInN0YWtlIiwidG9rZW5OdW1iZXIiLCJwcm9qZWN0TnVtYmVyIiwiX3Rva2VucyIsImFzc2V0X25hbWUiLCJtZXRhZGF0YSIsImdldE1ldGFkYXRhIiwiaXBmcyIsImdldElwZnNGcm9tTWV0YWRhdGEiLCJuYXYiLCJidXR0b24iLCJvbkNsaWNrIiwiZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/wallet.js\n"));

/***/ })

});