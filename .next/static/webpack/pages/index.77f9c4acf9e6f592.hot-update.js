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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wallet */ \"./src/pages/wallet.js\");\n/* harmony import */ var lucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucid-cardano */ \"./node_modules/lucid-cardano/esm/mod.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header */ \"./src/pages/header.js\");\n/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/next/dist/compiled/buffer/index.js\")[\"Buffer\"];\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_wallet__WEBPACK_IMPORTED_MODULE_4__, lucid_cardano__WEBPACK_IMPORTED_MODULE_5__, _header__WEBPACK_IMPORTED_MODULE_6__]);\n([_wallet__WEBPACK_IMPORTED_MODULE_4__, lucid_cardano__WEBPACK_IMPORTED_MODULE_5__, _header__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst Home = ()=>{\n    _s();\n    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [addressQuery, setAddressQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [walletLogo, setWalletLogo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Connect Wallet\");\n    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const handleAddressUpdate = (newAddress)=>{\n        setAddress(newAddress);\n    };\n    async function getStakeAddressFromWallet(wallet) {\n        const lucid = await lucid_cardano__WEBPACK_IMPORTED_MODULE_5__.Lucid[\"new\"]();\n        var api = \"\";\n        if (wallet == \"Typhon Wallet\") {\n            api = await window.cardano.typhoncip30.enable();\n        }\n        if (wallet == \"eternl\") {\n            api = await window.cardano.eternl.enable();\n        }\n        if (wallet == \"Nami\") {\n            api = await window.cardano.nami.enable();\n        }\n        if (wallet == \"Flint Wallet\") {\n            api = await window.cardano.flint.enable();\n        }\n        lucid.selectWallet(api);\n        let stake = await lucid.wallet.rewardAddress();\n        return stake;\n    }\n    async function getStakeFromAddressKoios(address) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/address_info\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_addresses\": [\n                    address\n                ]\n            })\n        });\n        const res = await req.json();\n        return res[0].stake_address;\n    }\n    const handleCustomAddress = async (event)=>{\n        event.preventDefault();\n        setShowModal(false);\n        if (addressQuery.startsWith(\"add\")) {\n            let stakeAddress = await getStakeFromAddressKoios(addressQuery);\n            router.push(\"/address/\".concat(stakeAddress));\n        } else if (addressQuery.startsWith(\"stake\")) {\n            router.push(\"/address/\".concat(address));\n        } else {\n            router.push(\"/token/\".concat(searchQuery));\n        }\n    };\n    const handleSearch = async (event)=>{\n        event.preventDefault();\n        // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.\n        if (searchQuery.startsWith(\"add\")) {\n            let stakeAddress = await getStakeFromAddressKoios(searchQuery);\n            router.push(\"/address/\".concat(stakeAddress));\n        } else if (searchQuery.startsWith(\"stake\")) {\n            router.push(\"/address/\".concat(address));\n        } else if (searchQuery.startsWith(\"$\")) {\n            let handle = searchQuery.slice(1);\n            let address = await getAddressFromHandle(handle);\n        } else {\n            router.push(\"/token/\".concat(searchQuery));\n        }\n    };\n    const handleClick = ()=>{\n        setShowModal(true);\n    };\n    const handleClose = ()=>{\n        setShowModal(false);\n    };\n    const handleSelect = async (wallet)=>{\n        setShowModal(false);\n        let stake = await getStakeAddressFromWallet(wallet);\n        router.push(\"/address/\".concat(stake));\n    };\n    const getAddressFromHandle = async (handle)=>{\n        let policyID = \"f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a\";\n        // A blank Handle name should always be ignored.\n        if (handle.length === 0) {\n        // Handle error.\n        }\n        // Convert handleName to hex encoding.\n        let assetName = Buffer.from(handle).toString(\"hex\");\n        const data = await fetch(\"https://cardano-mainnet.blockfrost.io/api/v0/assets/\".concat(policyID).concat(assetName, \"/addresses\"), {\n            headers: {\n                // Your Blockfrost API key\n                project_id: \"mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh\",\n                \"Content-Type\": \"application/json\"\n            }\n        }).then((res)=>res.json());\n        getStakeFromAddressKoios(data[0].address);\n        console.log(data[0].address);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"app\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Cardano Token Explorer\"\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                    lineNumber: 144,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 143,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"index\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"main-title\",\n                        children: \"Cardano Explorer\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 147,\n                        columnNumber: 7\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        className: \"search-main\",\n                        onSubmit: handleSearch,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                className: \"searchbar\",\n                                placeholder: \"Search for an address or a specific token...\",\n                                value: searchQuery,\n                                onChange: (event)=>setSearchQuery(event.target.value)\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                                lineNumber: 149,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                className: \"search-button\",\n                                children: \"Search\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                                lineNumber: 150,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 148,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"connect-wallet-main\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"walletButton-main\",\n                                onClick: ()=>handleSelect(\"Typhon Wallet\"),\n                                style: {\n                                    backgroundImage: \"url(/typhon.svg)\"\n                                },\n                                children: \"Typhon\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                                lineNumber: 153,\n                                columnNumber: 9\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"walletButton-main\",\n                                onClick: ()=>handleSelect(\"eternl\"),\n                                style: {\n                                    backgroundImage: \"url(/eternl.png)\"\n                                },\n                                children: \"Eternl\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                                lineNumber: 154,\n                                columnNumber: 9\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"walletButton-main\",\n                                onClick: ()=>handleSelect(\"Nami\"),\n                                style: {\n                                    backgroundImage: \"url(/nami.svg)\"\n                                },\n                                children: \"Nami\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                                lineNumber: 155,\n                                columnNumber: 9\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"walletButton-main\",\n                                onClick: ()=>handleSelect(\"Flint Wallet\"),\n                                style: {\n                                    backgroundImage: \"url(/flint.png)\"\n                                },\n                                children: \"Flint\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                                lineNumber: 156,\n                                columnNumber: 9\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                                lineNumber: 156,\n                                columnNumber: 155\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 152,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 146,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n        lineNumber: 142,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Home, \"85qtEmXaXsKzVoYfsK+rqG2O1Ug=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWdDO0FBQ047QUFDRztBQUNXO0FBQ1Y7QUFDb0I7QUFDcEI7QUFFOUIsTUFBTVEsT0FBTyxJQUFNOztJQUVqQixNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR1YsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDVyxjQUFjQyxnQkFBZ0IsR0FBR1osK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDYSxXQUFXQyxhQUFhLEdBQUdkLCtDQUFRQSxDQUFDLEtBQUs7SUFDaEQsTUFBTSxDQUFDZSxZQUFZQyxjQUFjLEdBQUdoQiwrQ0FBUUEsQ0FBQztJQUM3QyxNQUFNLENBQUNpQixTQUFTQyxXQUFXLEdBQUdsQiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNbUIsU0FBU2hCLHNEQUFTQTtJQUd0QixNQUFNaUIsc0JBQXNCLENBQUNDLGFBQWU7UUFDMUNILFdBQVdHO0lBQ2I7SUFFQSxlQUFlQywwQkFBMEJDLE1BQU0sRUFBQztRQUM5QyxNQUFNQyxRQUFRLE1BQU1sQix1REFBUztRQUU3QixJQUFJb0IsTUFBTTtRQUVWLElBQUdILFVBQVUsaUJBQWdCO1lBQzNCRyxNQUFNLE1BQU1DLE9BQU9DLE9BQU8sQ0FBQ0MsV0FBVyxDQUFDQyxNQUFNO1FBQy9DLENBQUM7UUFDRCxJQUFHUCxVQUFVLFVBQVM7WUFDcEJHLE1BQU0sTUFBTUMsT0FBT0MsT0FBTyxDQUFDRyxNQUFNLENBQUNELE1BQU07UUFDMUMsQ0FBQztRQUNELElBQUdQLFVBQVUsUUFBTztZQUNsQkcsTUFBTSxNQUFNQyxPQUFPQyxPQUFPLENBQUNJLElBQUksQ0FBQ0YsTUFBTTtRQUN4QyxDQUFDO1FBQ0QsSUFBR1AsVUFBVSxnQkFBZTtZQUMxQkcsTUFBTSxNQUFNQyxPQUFPQyxPQUFPLENBQUNLLEtBQUssQ0FBQ0gsTUFBTTtRQUN6QyxDQUFDO1FBRUROLE1BQU1VLFlBQVksQ0FBQ1I7UUFDbkIsSUFBSVMsUUFBUSxNQUFNWCxNQUFNRCxNQUFNLENBQUNhLGFBQWE7UUFDNUMsT0FBT0Q7SUFFVDtJQUVBLGVBQWVFLHlCQUF5QnBCLE9BQU8sRUFBQztRQUM5QyxNQUFNcUIsTUFBTSxNQUFNQyxNQUFNLDhDQUE4QztZQUNwRUMsUUFBUTtZQUNSQyxTQUFTO2dCQUNQLGdCQUFnQjtZQUNsQjtZQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7Z0JBQ25CLGNBQWM7b0JBQUUzQjtpQkFDZjtZQUNIO1FBQ0Y7UUFFQSxNQUFNNEIsTUFBTSxNQUFNUCxJQUFJUSxJQUFJO1FBQzFCLE9BQU9ELEdBQUcsQ0FBQyxFQUFFLENBQUNFLGFBQWE7SUFDN0I7SUFFQSxNQUFNQyxzQkFBc0IsT0FBT0MsUUFBUztRQUMxQ0EsTUFBTUMsY0FBYztRQUNwQnBDLGFBQWEsS0FBSztRQUNsQixJQUFHSCxhQUFhd0MsVUFBVSxDQUFDLFFBQU87WUFDaEMsSUFBSUMsZUFBZSxNQUFNZix5QkFBeUIxQjtZQUNsRFEsT0FBT2tDLElBQUksQ0FBQyxZQUF5QixPQUFiRDtRQUMxQixPQUNLLElBQUl6QyxhQUFhd0MsVUFBVSxDQUFDLFVBQVM7WUFDeENoQyxPQUFPa0MsSUFBSSxDQUFDLFlBQW9CLE9BQVJwQztRQUMxQixPQUNJO1lBQ0ZFLE9BQU9rQyxJQUFJLENBQUMsVUFBc0IsT0FBWjVDO1FBQ3hCLENBQUM7SUFDSDtJQUVBLE1BQU02QyxlQUFlLE9BQVFMLFFBQVU7UUFDckNBLE1BQU1DLGNBQWM7UUFDcEIsNkdBQTZHO1FBQzdHLElBQUd6QyxZQUFZMEMsVUFBVSxDQUFDLFFBQU87WUFDL0IsSUFBSUMsZUFBZSxNQUFNZix5QkFBeUI1QjtZQUNsRFUsT0FBT2tDLElBQUksQ0FBQyxZQUF5QixPQUFiRDtRQUMxQixPQUNLLElBQUkzQyxZQUFZMEMsVUFBVSxDQUFDLFVBQVM7WUFDdkNoQyxPQUFPa0MsSUFBSSxDQUFDLFlBQW9CLE9BQVJwQztRQUMxQixPQUNLLElBQUdSLFlBQVkwQyxVQUFVLENBQUMsTUFBSztZQUNsQyxJQUFJSSxTQUFTOUMsWUFBWStDLEtBQUssQ0FBQztZQUMvQixJQUFJdkMsVUFBVSxNQUFNd0MscUJBQXFCRjtRQUMzQyxPQUNJO1lBQ0ZwQyxPQUFPa0MsSUFBSSxDQUFDLFVBQXNCLE9BQVo1QztRQUN4QixDQUFDO0lBQ0g7SUFHQSxNQUFNaUQsY0FBYyxJQUFNO1FBQ3hCNUMsYUFBYSxJQUFJO0lBQ25CO0lBRUEsTUFBTTZDLGNBQWMsSUFBTTtRQUN4QjdDLGFBQWEsS0FBSztJQUNwQjtJQUVBLE1BQU04QyxlQUFlLE9BQU9yQyxTQUFXO1FBQ3JDVCxhQUFhLEtBQUs7UUFFbEIsSUFBSXFCLFFBQVEsTUFBTWIsMEJBQTBCQztRQUM1Q0osT0FBT2tDLElBQUksQ0FBQyxZQUFrQixPQUFObEI7SUFDMUI7SUFFQSxNQUFNc0IsdUJBQXVCLE9BQU9GLFNBQVc7UUFDN0MsSUFBSU0sV0FBVztRQUVmLGdEQUFnRDtRQUNoRCxJQUFJTixPQUFPTyxNQUFNLEtBQUssR0FBRztRQUN2QixnQkFBZ0I7UUFDbEIsQ0FBQztRQUVELHNDQUFzQztRQUN0QyxJQUFJQyxZQUFZQyxNQUFNQSxDQUFDQyxJQUFJLENBQUNWLFFBQVFXLFFBQVEsQ0FBQztRQUU3QyxNQUFNQyxPQUFPLE1BQU01QixNQUNqQix1REFBa0V3QixPQUFYRixVQUFxQixPQUFWRSxXQUFVLGVBQzVFO1lBQ0V0QixTQUFTO2dCQUNQLDBCQUEwQjtnQkFDMUIyQixZQUFZO2dCQUNaLGdCQUFnQjtZQUNsQjtRQUNGLEdBQ0FDLElBQUksQ0FBQ3hCLENBQUFBLE1BQU9BLElBQUlDLElBQUk7UUFFdEJULHlCQUF5QjhCLElBQUksQ0FBQyxFQUFFLENBQUNsRCxPQUFPO1FBQ3hDcUQsUUFBUUMsR0FBRyxDQUFDSixJQUFJLENBQUMsRUFBRSxDQUFDbEQsT0FBTztJQUU3QjtJQUdGLHFCQUNFLDhEQUFDdUQ7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUN2RSxrREFBSUE7MEJBQ0gsNEVBQUN3RTs4QkFBTTs7Ozs7Ozs7Ozs7MEJBRVQsOERBQUNGO2dCQUFJQyxXQUFVOztrQ0FDZiw4REFBQ0Q7d0JBQUlDLFdBQVk7a0NBQWE7Ozs7OztrQ0FDNUIsOERBQUNFO3dCQUFNRixXQUFXO3dCQUFhRyxVQUFVdEI7OzBDQUN2Qyw4REFBQ3VCO2dDQUFNQyxNQUFLO2dDQUFPTCxXQUFZO2dDQUFZTSxhQUFZO2dDQUErQ0MsT0FBT3ZFO2dDQUFhd0UsVUFBVSxDQUFDaEMsUUFBVXZDLGVBQWV1QyxNQUFNaUMsTUFBTSxDQUFDRixLQUFLOzs7Ozs7MENBQ2hMLDhEQUFDRztnQ0FBT0wsTUFBSztnQ0FBU0wsV0FBVTswQ0FBZ0I7Ozs7Ozs7Ozs7OztrQ0FFbEQsOERBQUNEO3dCQUFJQyxXQUFVOzswQ0FDZiw4REFBQ1U7Z0NBQU9WLFdBQVU7Z0NBQW9CVyxTQUFTLElBQU14QixhQUFhO2dDQUFrQnlCLE9BQU87b0NBQUNDLGlCQUFpQjtnQ0FBc0I7MENBQUc7Ozs7OzswQ0FDdEksOERBQUNIO2dDQUFPVixXQUFVO2dDQUFvQlcsU0FBUyxJQUFNeEIsYUFBYTtnQ0FBV3lCLE9BQU87b0NBQUNDLGlCQUFpQjtnQ0FBc0I7MENBQUc7Ozs7OzswQ0FDL0gsOERBQUNIO2dDQUFPVixXQUFVO2dDQUFvQlcsU0FBUyxJQUFNeEIsYUFBYTtnQ0FBU3lCLE9BQU87b0NBQUNDLGlCQUFpQjtnQ0FBb0I7MENBQUc7Ozs7OzswQ0FDM0gsOERBQUNIO2dDQUFPVixXQUFVO2dDQUFvQlcsU0FBUyxJQUFNeEIsYUFBYTtnQ0FBaUJ5QixPQUFPO29DQUFDQyxpQkFBaUI7Z0NBQXFCOzBDQUFHOzs7Ozs7MENBQWMsOERBQUNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU8zSjtHQTFKTS9FOztRQU9XTCxrREFBU0E7OztLQVBwQks7QUE0Sk4sK0RBQWVBLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2luZGV4LmpzPzQwODAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuL3dhbGxldFwiO1xuaW1wb3J0IHsgQmxvY2tmcm9zdCwgTHVjaWQgfSBmcm9tIFwibHVjaWQtY2FyZGFub1wiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9oZWFkZXJcIjtcblxuY29uc3QgSG9tZSA9ICgpID0+IHtcblxuICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2FkZHJlc3NRdWVyeSwgc2V0QWRkcmVzc1F1ZXJ5XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Nob3dNb2RhbCwgc2V0U2hvd01vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbd2FsbGV0TG9nbywgc2V0V2FsbGV0TG9nb10gPSB1c2VTdGF0ZSgnQ29ubmVjdCBXYWxsZXQnKTtcbiAgY29uc3QgW2FkZHJlc3MsIHNldEFkZHJlc3NdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuXG4gICAgY29uc3QgaGFuZGxlQWRkcmVzc1VwZGF0ZSA9IChuZXdBZGRyZXNzKSA9PiB7XG4gICAgICBzZXRBZGRyZXNzKG5ld0FkZHJlc3MpO1xuICAgIH1cbiAgXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0U3Rha2VBZGRyZXNzRnJvbVdhbGxldCh3YWxsZXQpe1xuICAgICAgY29uc3QgbHVjaWQgPSBhd2FpdCBMdWNpZC5uZXcoKTtcbiAgXG4gICAgICB2YXIgYXBpID0gJyc7XG4gIFxuICAgICAgaWYod2FsbGV0ID09ICdUeXBob24gV2FsbGV0Jyl7XG4gICAgICAgIGFwaSA9IGF3YWl0IHdpbmRvdy5jYXJkYW5vLnR5cGhvbmNpcDMwLmVuYWJsZSgpO1xuICAgICAgfVxuICAgICAgaWYod2FsbGV0ID09ICdldGVybmwnKXtcbiAgICAgICAgYXBpID0gYXdhaXQgd2luZG93LmNhcmRhbm8uZXRlcm5sLmVuYWJsZSgpO1xuICAgICAgfVxuICAgICAgaWYod2FsbGV0ID09ICdOYW1pJyl7XG4gICAgICAgIGFwaSA9IGF3YWl0IHdpbmRvdy5jYXJkYW5vLm5hbWkuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgICBpZih3YWxsZXQgPT0gJ0ZsaW50IFdhbGxldCcpe1xuICAgICAgICBhcGkgPSBhd2FpdCB3aW5kb3cuY2FyZGFuby5mbGludC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbHVjaWQuc2VsZWN0V2FsbGV0KGFwaSk7XG4gICAgICBsZXQgc3Rha2UgPSBhd2FpdCBsdWNpZC53YWxsZXQucmV3YXJkQWRkcmVzcygpO1xuICAgICAgcmV0dXJuIHN0YWtlO1xuICBcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRTdGFrZUZyb21BZGRyZXNzS29pb3MoYWRkcmVzcyl7XG4gICAgICBjb25zdCByZXEgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkua29pb3MucmVzdC9hcGkvdjAvYWRkcmVzc19pbmZvJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIFwiX2FkZHJlc3Nlc1wiOiBbIGFkZHJlc3NcbiAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCByZXEuanNvbigpO1xuICAgICAgcmV0dXJuIHJlc1swXS5zdGFrZV9hZGRyZXNzO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUN1c3RvbUFkZHJlc3MgPSBhc3luYyAoZXZlbnQpID0+e1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG4gICAgICBpZihhZGRyZXNzUXVlcnkuc3RhcnRzV2l0aCgnYWRkJykpe1xuICAgICAgICBsZXQgc3Rha2VBZGRyZXNzID0gYXdhaXQgZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zKGFkZHJlc3NRdWVyeSk7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy8ke3N0YWtlQWRkcmVzc31gKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFkZHJlc3NRdWVyeS5zdGFydHNXaXRoKCdzdGFrZScpKXtcbiAgICAgICAgcm91dGVyLnB1c2goYC9hZGRyZXNzLyR7YWRkcmVzc31gKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvdG9rZW4vJHtzZWFyY2hRdWVyeX1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgaGFuZGxlU2VhcmNoID0gYXN5bmMgIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIFVzZSB0aGUgYHJvdXRlci5wdXNoYCBtZXRob2QgdG8gbmF2aWdhdGUgdG8gdGhlIGR5bmFtaWMgcGFnZSB3aXRoIHRoZSBlbnRlcmVkIG51bWJlciBhcyB0aGUgVVJMIHBhcmFtZXRlci5cbiAgICAgIGlmKHNlYXJjaFF1ZXJ5LnN0YXJ0c1dpdGgoJ2FkZCcpKXtcbiAgICAgICAgbGV0IHN0YWtlQWRkcmVzcyA9IGF3YWl0IGdldFN0YWtlRnJvbUFkZHJlc3NLb2lvcyhzZWFyY2hRdWVyeSk7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy8ke3N0YWtlQWRkcmVzc31gKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNlYXJjaFF1ZXJ5LnN0YXJ0c1dpdGgoJ3N0YWtlJykpe1xuICAgICAgICByb3V0ZXIucHVzaChgL2FkZHJlc3MvJHthZGRyZXNzfWApO1xuICAgICAgfVxuICAgICAgZWxzZSBpZihzZWFyY2hRdWVyeS5zdGFydHNXaXRoKCckJykpe1xuICAgICAgICBsZXQgaGFuZGxlID0gc2VhcmNoUXVlcnkuc2xpY2UoMSk7XG4gICAgICAgIGxldCBhZGRyZXNzID0gYXdhaXQgZ2V0QWRkcmVzc0Zyb21IYW5kbGUoaGFuZGxlKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvdG9rZW4vJHtzZWFyY2hRdWVyeX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICBcbiAgICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgIHNldFNob3dNb2RhbCh0cnVlKTtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgICAgc2V0U2hvd01vZGFsKGZhbHNlKTtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGhhbmRsZVNlbGVjdCA9IGFzeW5jICh3YWxsZXQpID0+IHtcbiAgICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG5cbiAgICAgIGxldCBzdGFrZSA9IGF3YWl0IGdldFN0YWtlQWRkcmVzc0Zyb21XYWxsZXQod2FsbGV0KTtcbiAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy8ke3N0YWtlfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGdldEFkZHJlc3NGcm9tSGFuZGxlID0gYXN5bmMgKGhhbmRsZSkgPT4ge1xuICAgICAgbGV0IHBvbGljeUlEID0gJ2YwZmY0OGJiYjdiYmU5ZDU5YTQwZjFjZTkwZTllOWQwZmY1MDAyZWM0OGYyMzJiNDljYTBmYjlhJztcbiAgICAgIFxuICAgICAgLy8gQSBibGFuayBIYW5kbGUgbmFtZSBzaG91bGQgYWx3YXlzIGJlIGlnbm9yZWQuXG4gICAgICBpZiAoaGFuZGxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBIYW5kbGUgZXJyb3IuXG4gICAgICB9XG5cbiAgICAgIC8vIENvbnZlcnQgaGFuZGxlTmFtZSB0byBoZXggZW5jb2RpbmcuXG4gICAgICBsZXQgYXNzZXROYW1lID0gQnVmZmVyLmZyb20oaGFuZGxlKS50b1N0cmluZygnaGV4Jyk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vY2FyZGFuby1tYWlubmV0LmJsb2NrZnJvc3QuaW8vYXBpL3YwL2Fzc2V0cy8ke3BvbGljeUlEfSR7YXNzZXROYW1lfS9hZGRyZXNzZXNgLFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLy8gWW91ciBCbG9ja2Zyb3N0IEFQSSBrZXlcbiAgICAgICAgICAgIHByb2plY3RfaWQ6ICdtYWlubmV0b1c2MVlZU2lPb0xTYU5RNmR6VHJrQUc0YXpYVklydmgnLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbiAgICAgIFxuICAgICAgZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zKGRhdGFbMF0uYWRkcmVzcyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhWzBdLmFkZHJlc3MpO1xuXG4gICAgfVxuXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcFwiPlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5DYXJkYW5vIFRva2VuIEV4cGxvcmVyPC90aXRsZT5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kZXhcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lID0gXCJtYWluLXRpdGxlXCI+Q2FyZGFubyBFeHBsb3JlcjwvZGl2PlxuICAgICAgICA8Zm9ybSAgY2xhc3NOYW1lPSAnc2VhcmNoLW1haW4nb25TdWJtaXQ9e2hhbmRsZVNlYXJjaH0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lID0gXCJzZWFyY2hiYXJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYW4gYWRkcmVzcyBvciBhIHNwZWNpZmljIHRva2VuLi4uXCIgdmFsdWU9e3NlYXJjaFF1ZXJ5fSBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hRdWVyeShldmVudC50YXJnZXQudmFsdWUpfS8+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwic2VhcmNoLWJ1dHRvblwiPlNlYXJjaDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdC13YWxsZXQtbWFpblwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIndhbGxldEJ1dHRvbi1tYWluXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KCdUeXBob24gV2FsbGV0Jyl9IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOmB1cmwoJHsnL3R5cGhvbi5zdmcnfSlgfX0+VHlwaG9uPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwid2FsbGV0QnV0dG9uLW1haW5cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3QoJ2V0ZXJubCcpfSBzdHlsZT17e2JhY2tncm91bmRJbWFnZTpgdXJsKCR7Jy9ldGVybmwucG5nJ30pYH19PkV0ZXJubDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIndhbGxldEJ1dHRvbi1tYWluXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KCdOYW1pJyl9IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOmB1cmwoJHsnL25hbWkuc3ZnJ30pYH19Pk5hbWk8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ3YWxsZXRCdXR0b24tbWFpblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdCgnRmxpbnQgV2FsbGV0Jyl9IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOmB1cmwoJHsnL2ZsaW50LnBuZyd9KWB9fT5GbGludDwvYnV0dG9uPjxici8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJSZWFjdCIsIkhlYWQiLCJ1c2VSb3V0ZXIiLCJXYWxsZXQiLCJCbG9ja2Zyb3N0IiwiTHVjaWQiLCJIZWFkZXIiLCJIb21lIiwic2VhcmNoUXVlcnkiLCJzZXRTZWFyY2hRdWVyeSIsImFkZHJlc3NRdWVyeSIsInNldEFkZHJlc3NRdWVyeSIsInNob3dNb2RhbCIsInNldFNob3dNb2RhbCIsIndhbGxldExvZ28iLCJzZXRXYWxsZXRMb2dvIiwiYWRkcmVzcyIsInNldEFkZHJlc3MiLCJyb3V0ZXIiLCJoYW5kbGVBZGRyZXNzVXBkYXRlIiwibmV3QWRkcmVzcyIsImdldFN0YWtlQWRkcmVzc0Zyb21XYWxsZXQiLCJ3YWxsZXQiLCJsdWNpZCIsIm5ldyIsImFwaSIsIndpbmRvdyIsImNhcmRhbm8iLCJ0eXBob25jaXAzMCIsImVuYWJsZSIsImV0ZXJubCIsIm5hbWkiLCJmbGludCIsInNlbGVjdFdhbGxldCIsInN0YWtlIiwicmV3YXJkQWRkcmVzcyIsImdldFN0YWtlRnJvbUFkZHJlc3NLb2lvcyIsInJlcSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwianNvbiIsInN0YWtlX2FkZHJlc3MiLCJoYW5kbGVDdXN0b21BZGRyZXNzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0c1dpdGgiLCJzdGFrZUFkZHJlc3MiLCJwdXNoIiwiaGFuZGxlU2VhcmNoIiwiaGFuZGxlIiwic2xpY2UiLCJnZXRBZGRyZXNzRnJvbUhhbmRsZSIsImhhbmRsZUNsaWNrIiwiaGFuZGxlQ2xvc2UiLCJoYW5kbGVTZWxlY3QiLCJwb2xpY3lJRCIsImxlbmd0aCIsImFzc2V0TmFtZSIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsImRhdGEiLCJwcm9qZWN0X2lkIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJkaXYiLCJjbGFzc05hbWUiLCJ0aXRsZSIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsImJ1dHRvbiIsIm9uQ2xpY2siLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.js\n"));

/***/ })

});