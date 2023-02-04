"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wallet */ \"./src/pages/wallet.js\");\n/* harmony import */ var lucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucid-cardano */ \"./node_modules/lucid-cardano/esm/mod.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header */ \"./src/pages/header.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_wallet__WEBPACK_IMPORTED_MODULE_4__, lucid_cardano__WEBPACK_IMPORTED_MODULE_5__, _header__WEBPACK_IMPORTED_MODULE_6__]);\n([_wallet__WEBPACK_IMPORTED_MODULE_4__, lucid_cardano__WEBPACK_IMPORTED_MODULE_5__, _header__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst Home = ()=>{\n    _s();\n    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [addressQuery, setAddressQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [walletLogo, setWalletLogo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Connect Wallet\");\n    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const handleAddressUpdate = (newAddress)=>{\n        setAddress(newAddress);\n    };\n    async function getStakeAddressFromWallet(wallet) {\n        const lucid = await lucid_cardano__WEBPACK_IMPORTED_MODULE_5__.Lucid[\"new\"]();\n        var api = \"\";\n        if (wallet == \"Typhon Wallet\") {\n            api = await window.cardano.typhoncip30.enable();\n        }\n        if (wallet == \"eternl\") {\n            api = await window.cardano.eternl.enable();\n        }\n        if (wallet == \"Nami\") {\n            api = await window.cardano.nami.enable();\n        }\n        if (wallet == \"Flint Wallet\") {\n            api = await window.cardano.flint.enable();\n        }\n        lucid.selectWallet(api);\n        let stake = await lucid.wallet.rewardAddress();\n        return stake;\n    }\n    async function getStakeFromAddressKoios(address) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/address_info\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_addresses\": [\n                    address\n                ]\n            })\n        });\n        const res = await req.json();\n        return res[0].stake_address;\n    }\n    const handleCustomAddress = async (event)=>{\n        event.preventDefault();\n        setShowModal(false);\n        if (addressQuery.startsWith(\"add\")) {\n            let stakeAddress = await getStakeFromAddressKoios(addressQuery);\n            router.push(\"/address/\".concat(stakeAddress));\n        } else if (addressQuery.startsWith(\"stake\")) {\n            router.push(\"/address/\".concat(address));\n        } else {\n            router.push(\"/token/\".concat(searchQuery));\n        }\n    };\n    const handleSearch = async (event)=>{\n        event.preventDefault();\n        // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.\n        if (searchQuery.startsWith(\"add\")) {\n            let stakeAddress = await getStakeFromAddressKoios(searchQuery);\n            router.push(\"/address/\".concat(stakeAddress));\n        } else if (searchQuery.startsWith(\"stake\")) {\n            router.push(\"/address/\".concat(address));\n        } else {\n            router.push(\"/token/\".concat(searchQuery));\n        }\n    };\n    const handleClick = ()=>{\n        setShowModal(true);\n    };\n    const handleClose = ()=>{\n        setShowModal(false);\n    };\n    const handleSelect = async (wallet)=>{\n        setShowModal(false);\n        let stake = await getStakeAddressFromWallet(wallet);\n        router.push(\"/address/\".concat(stake));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"app\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Cardano Token Explorer\"\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                    lineNumber: 114,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 113,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                className: \"main-label\",\n                children: \"tokenExplr.io\"\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 116,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"searchForm\",\n                onSubmit: handleSearch,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        className: \"search-input\",\n                        placeholder: \"Search for an address or a specific token...\",\n                        value: searchQuery,\n                        onChange: (event)=>setSearchQuery(event.target.value)\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 118,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"search-button\",\n                        children: \"Search\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 119,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 117,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"connect-wallet\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"connect-wallet-button\",\n                        onClick: ()=>router.push(\"/\"),\n                        children: \"Home\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 122,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"connect-wallet-button\",\n                        onClick: handleClick,\n                        children: walletLogo\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 123,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"Typhon Wallet\"),\n                        style: {\n                            backgroundImage: \"url(/typhon.svg)\"\n                        },\n                        children: \"Typhon\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 124,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"eternl\"),\n                        style: {\n                            backgroundImage: \"url(/eternl.png)\"\n                        },\n                        children: \"Eternl\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 125,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"Nami\"),\n                        style: {\n                            backgroundImage: \"url(/nami.svg)\"\n                        },\n                        children: \"Nami\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 126,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"Flint Wallet\"),\n                        style: {\n                            backgroundImage: \"url(/flint.png)\"\n                        },\n                        children: \"Flint\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 127,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 127,\n                        columnNumber: 158\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 121,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n        lineNumber: 112,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Home, \"85qtEmXaXsKzVoYfsK+rqG2O1Ug=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Rzs7Ozs7O2tDQUMxSCw4REFBQ0g7d0JBQU9YLFdBQVU7d0JBQWVZLFNBQVMsSUFBTWQsYUFBYTt3QkFBU2UsT0FBTzs0QkFBQ0MsaUJBQWlCO3dCQUFvQjtrQ0FBRzs7Ozs7O2tDQUN0SCw4REFBQ0g7d0JBQU9YLFdBQVU7d0JBQWVZLFNBQVMsSUFBTWQsYUFBYTt3QkFBaUJlLE9BQU87NEJBQUNDLGlCQUFpQjt3QkFBcUI7a0NBQUc7Ozs7OztrQ0FBYyw4REFBQ0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSzlKO0dBM0hNbEU7O1FBT1dMLGtEQUFTQTs7O0tBUHBCSztBQTZITiwrREFBZUEsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXguanM/NDA4MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZX0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4vd2FsbGV0XCI7XG5pbXBvcnQgeyBCbG9ja2Zyb3N0LCBMdWNpZCB9IGZyb20gXCJsdWNpZC1jYXJkYW5vXCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL2hlYWRlclwiO1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbYWRkcmVzc1F1ZXJ5LCBzZXRBZGRyZXNzUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFt3YWxsZXRMb2dvLCBzZXRXYWxsZXRMb2dvXSA9IHVzZVN0YXRlKCdDb25uZWN0IFdhbGxldCcpO1xuICBjb25zdCBbYWRkcmVzcywgc2V0QWRkcmVzc10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG5cbiAgICBjb25zdCBoYW5kbGVBZGRyZXNzVXBkYXRlID0gKG5ld0FkZHJlc3MpID0+IHtcbiAgICAgIHNldEFkZHJlc3MobmV3QWRkcmVzcyk7XG4gICAgfVxuICBcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRTdGFrZUFkZHJlc3NGcm9tV2FsbGV0KHdhbGxldCl7XG4gICAgICBjb25zdCBsdWNpZCA9IGF3YWl0IEx1Y2lkLm5ldygpO1xuICBcbiAgICAgIHZhciBhcGkgPSAnJztcbiAgXG4gICAgICBpZih3YWxsZXQgPT0gJ1R5cGhvbiBXYWxsZXQnKXtcbiAgICAgICAgYXBpID0gYXdhaXQgd2luZG93LmNhcmRhbm8udHlwaG9uY2lwMzAuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgICBpZih3YWxsZXQgPT0gJ2V0ZXJubCcpe1xuICAgICAgICBhcGkgPSBhd2FpdCB3aW5kb3cuY2FyZGFuby5ldGVybmwuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgICBpZih3YWxsZXQgPT0gJ05hbWknKXtcbiAgICAgICAgYXBpID0gYXdhaXQgd2luZG93LmNhcmRhbm8ubmFtaS5lbmFibGUoKTtcbiAgICAgIH1cbiAgICAgIGlmKHdhbGxldCA9PSAnRmxpbnQgV2FsbGV0Jyl7XG4gICAgICAgIGFwaSA9IGF3YWl0IHdpbmRvdy5jYXJkYW5vLmZsaW50LmVuYWJsZSgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBsdWNpZC5zZWxlY3RXYWxsZXQoYXBpKTtcbiAgICAgIGxldCBzdGFrZSA9IGF3YWl0IGx1Y2lkLndhbGxldC5yZXdhcmRBZGRyZXNzKCk7XG4gICAgICByZXR1cm4gc3Rha2U7XG4gIFxuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldFN0YWtlRnJvbUFkZHJlc3NLb2lvcyhhZGRyZXNzKXtcbiAgICAgIGNvbnN0IHJlcSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5rb2lvcy5yZXN0L2FwaS92MC9hZGRyZXNzX2luZm8nLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgXCJfYWRkcmVzc2VzXCI6IFsgYWRkcmVzc1xuICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICBcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgICByZXR1cm4gcmVzWzBdLnN0YWtlX2FkZHJlc3M7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlQ3VzdG9tQWRkcmVzcyA9IGFzeW5jIChldmVudCkgPT57XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0U2hvd01vZGFsKGZhbHNlKTtcbiAgICAgIGlmKGFkZHJlc3NRdWVyeS5zdGFydHNXaXRoKCdhZGQnKSl7XG4gICAgICAgIGxldCBzdGFrZUFkZHJlc3MgPSBhd2FpdCBnZXRTdGFrZUZyb21BZGRyZXNzS29pb3MoYWRkcmVzc1F1ZXJ5KTtcbiAgICAgICAgcm91dGVyLnB1c2goYC9hZGRyZXNzLyR7c3Rha2VBZGRyZXNzfWApO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYWRkcmVzc1F1ZXJ5LnN0YXJ0c1dpdGgoJ3N0YWtlJykpe1xuICAgICAgICByb3V0ZXIucHVzaChgL2FkZHJlc3MvJHthZGRyZXNzfWApO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgcm91dGVyLnB1c2goYC90b2tlbi8ke3NlYXJjaFF1ZXJ5fWApO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBoYW5kbGVTZWFyY2ggPSBhc3luYyAgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gVXNlIHRoZSBgcm91dGVyLnB1c2hgIG1ldGhvZCB0byBuYXZpZ2F0ZSB0byB0aGUgZHluYW1pYyBwYWdlIHdpdGggdGhlIGVudGVyZWQgbnVtYmVyIGFzIHRoZSBVUkwgcGFyYW1ldGVyLlxuICAgICAgaWYoc2VhcmNoUXVlcnkuc3RhcnRzV2l0aCgnYWRkJykpe1xuICAgICAgICBsZXQgc3Rha2VBZGRyZXNzID0gYXdhaXQgZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zKHNlYXJjaFF1ZXJ5KTtcbiAgICAgICAgcm91dGVyLnB1c2goYC9hZGRyZXNzLyR7c3Rha2VBZGRyZXNzfWApO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VhcmNoUXVlcnkuc3RhcnRzV2l0aCgnc3Rha2UnKSl7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy8ke2FkZHJlc3N9YCk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICByb3V0ZXIucHVzaChgL3Rva2VuLyR7c2VhcmNoUXVlcnl9YCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICBzZXRTaG93TW9kYWwodHJ1ZSk7XG4gICAgfVxuICBcbiAgICBjb25zdCBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG4gICAgfVxuICBcbiAgICBjb25zdCBoYW5kbGVTZWxlY3QgPSBhc3luYyAod2FsbGV0KSA9PiB7XG4gICAgICBzZXRTaG93TW9kYWwoZmFsc2UpO1xuXG4gICAgICBsZXQgc3Rha2UgPSBhd2FpdCBnZXRTdGFrZUFkZHJlc3NGcm9tV2FsbGV0KHdhbGxldCk7XG4gICAgICByb3V0ZXIucHVzaChgL2FkZHJlc3MvJHtzdGFrZX1gKTtcblxuICAgIH1cblxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+Q2FyZGFubyBUb2tlbiBFeHBsb3JlcjwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibWFpbi1sYWJlbFwiPnRva2VuRXhwbHIuaW88L2xhYmVsPlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2hGb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVNlYXJjaH0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lID0gXCJzZWFyY2gtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYW4gYWRkcmVzcyBvciBhIHNwZWNpZmljIHRva2VuLi4uXCIgdmFsdWU9e3NlYXJjaFF1ZXJ5fSBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hRdWVyeShldmVudC50YXJnZXQudmFsdWUpfS8+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwic2VhcmNoLWJ1dHRvblwiPlNlYXJjaDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdC13YWxsZXRcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjb25uZWN0LXdhbGxldC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaCgnLycpfT5Ib21lPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY29ubmVjdC13YWxsZXQtYnV0dG9uXCIgb25DbGljaz17aGFuZGxlQ2xpY2t9Pnt3YWxsZXRMb2dvfTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIndhbGxldEJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdCgnVHlwaG9uIFdhbGxldCcpfSBzdHlsZT17e2JhY2tncm91bmRJbWFnZTpgdXJsKCR7Jy90eXBob24uc3ZnJ30pYH19PlR5cGhvbjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwid2FsbGV0QnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KCdldGVybmwnKX0gc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6YHVybCgkeycvZXRlcm5sLnBuZyd9KWB9fT5FdGVybmw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIndhbGxldEJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdCgnTmFtaScpfSBzdHlsZT17e2JhY2tncm91bmRJbWFnZTpgdXJsKCR7Jy9uYW1pLnN2Zyd9KWB9fT5OYW1pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ3YWxsZXRCdXR0b25cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3QoJ0ZsaW50IFdhbGxldCcpfSBzdHlsZT17e2JhY2tncm91bmRJbWFnZTpgdXJsKCR7Jy9mbGludC5wbmcnfSlgfX0+RmxpbnQ8L2J1dHRvbj48YnIvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJSZWFjdCIsIkhlYWQiLCJ1c2VSb3V0ZXIiLCJXYWxsZXQiLCJCbG9ja2Zyb3N0IiwiTHVjaWQiLCJIZWFkZXIiLCJIb21lIiwic2VhcmNoUXVlcnkiLCJzZXRTZWFyY2hRdWVyeSIsImFkZHJlc3NRdWVyeSIsInNldEFkZHJlc3NRdWVyeSIsInNob3dNb2RhbCIsInNldFNob3dNb2RhbCIsIndhbGxldExvZ28iLCJzZXRXYWxsZXRMb2dvIiwiYWRkcmVzcyIsInNldEFkZHJlc3MiLCJyb3V0ZXIiLCJoYW5kbGVBZGRyZXNzVXBkYXRlIiwibmV3QWRkcmVzcyIsImdldFN0YWtlQWRkcmVzc0Zyb21XYWxsZXQiLCJ3YWxsZXQiLCJsdWNpZCIsIm5ldyIsImFwaSIsIndpbmRvdyIsImNhcmRhbm8iLCJ0eXBob25jaXAzMCIsImVuYWJsZSIsImV0ZXJubCIsIm5hbWkiLCJmbGludCIsInNlbGVjdFdhbGxldCIsInN0YWtlIiwicmV3YXJkQWRkcmVzcyIsImdldFN0YWtlRnJvbUFkZHJlc3NLb2lvcyIsInJlcSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwianNvbiIsInN0YWtlX2FkZHJlc3MiLCJoYW5kbGVDdXN0b21BZGRyZXNzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0c1dpdGgiLCJzdGFrZUFkZHJlc3MiLCJwdXNoIiwiaGFuZGxlU2VhcmNoIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVDbG9zZSIsImhhbmRsZVNlbGVjdCIsImRpdiIsImNsYXNzTmFtZSIsInRpdGxlIiwibGFiZWwiLCJmb3JtIiwib25TdWJtaXQiLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJidXR0b24iLCJvbkNsaWNrIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.js\n"));

/***/ })

});