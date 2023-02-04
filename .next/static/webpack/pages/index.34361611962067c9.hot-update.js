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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wallet */ \"./src/pages/wallet.js\");\n/* harmony import */ var lucid_cardano__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucid-cardano */ \"./node_modules/lucid-cardano/esm/mod.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header */ \"./src/pages/header.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_wallet__WEBPACK_IMPORTED_MODULE_4__, lucid_cardano__WEBPACK_IMPORTED_MODULE_5__, _header__WEBPACK_IMPORTED_MODULE_6__]);\n([_wallet__WEBPACK_IMPORTED_MODULE_4__, lucid_cardano__WEBPACK_IMPORTED_MODULE_5__, _header__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst Home = ()=>{\n    _s();\n    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [addressQuery, setAddressQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [walletLogo, setWalletLogo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Connect Wallet\");\n    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const handleAddressUpdate = (newAddress)=>{\n        setAddress(newAddress);\n    };\n    async function getStakeAddressFromWallet(wallet) {\n        const lucid = await lucid_cardano__WEBPACK_IMPORTED_MODULE_5__.Lucid[\"new\"]();\n        var api = \"\";\n        if (wallet == \"Typhon Wallet\") {\n            api = await window.cardano.typhoncip30.enable();\n        }\n        if (wallet == \"eternl\") {\n            api = await window.cardano.eternl.enable();\n        }\n        if (wallet == \"Nami\") {\n            api = await window.cardano.nami.enable();\n        }\n        if (wallet == \"Flint Wallet\") {\n            api = await window.cardano.flint.enable();\n        }\n        lucid.selectWallet(api);\n        let stake = await lucid.wallet.rewardAddress();\n        return stake;\n    }\n    async function getStakeFromAddressKoios(address) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/address_info\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_addresses\": [\n                    address\n                ]\n            })\n        });\n        const res = await req.json();\n        return res[0].stake_address;\n    }\n    const handleCustomAddress = async (event)=>{\n        event.preventDefault();\n        setShowModal(false);\n        if (addressQuery.startsWith(\"add\")) {\n            let stakeAddress = await getStakeFromAddressKoios(addressQuery);\n            router.push(\"/address/\".concat(stakeAddress));\n        } else if (addressQuery.startsWith(\"stake\")) {\n            router.push(\"/address/\".concat(address));\n        } else {\n            router.push(\"/token/\".concat(searchQuery));\n        }\n    };\n    const handleSearch = async (event)=>{\n        event.preventDefault();\n        // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.\n        if (searchQuery.startsWith(\"add\")) {\n            let stakeAddress = await getStakeFromAddressKoios(searchQuery);\n            router.push(\"/address/\".concat(stakeAddress));\n        } else if (searchQuery.startsWith(\"stake\")) {\n            router.push(\"/address/\".concat(address));\n        } else {\n            router.push(\"/token/\".concat(searchQuery));\n        }\n    };\n    const handleClick = ()=>{\n        setShowModal(true);\n    };\n    const handleClose = ()=>{\n        setShowModal(false);\n    };\n    const handleSelect = async (wallet)=>{\n        setShowModal(false);\n        let stake = await getStakeAddressFromWallet(wallet);\n        router.push(\"/address/\".concat(stake));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"app\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Cardano Token Explorer\"\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                    lineNumber: 114,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 113,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"index\"\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 116,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: \"tokenExplr.io\"\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 119,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSearch,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        placeholder: \"Search for an address or a specific token...\",\n                        value: searchQuery,\n                        onChange: (event)=>setSearchQuery(event.target.value)\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 121,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        children: \"Search\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 122,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 120,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"connect-wallet\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"Typhon Wallet\"),\n                        style: {\n                            backgroundImage: \"url(/typhon.svg)\"\n                        },\n                        children: \"Typhon\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 125,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"eternl\"),\n                        style: {\n                            backgroundImage: \"url(/eternl.png)\"\n                        },\n                        children: \"Eternl\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 126,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"Nami\"),\n                        style: {\n                            backgroundImage: \"url(/nami.svg)\"\n                        },\n                        children: \"Nami\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 127,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"walletButton\",\n                        onClick: ()=>handleSelect(\"Flint Wallet\"),\n                        style: {\n                            backgroundImage: \"url(/flint.png)\"\n                        },\n                        children: \"Flint\"\n                    }, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 128,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                        lineNumber: 128,\n                        columnNumber: 150\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n                lineNumber: 124,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/index.js\",\n        lineNumber: 112,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Home, \"85qtEmXaXsKzVoYfsK+rqG2O1Ug=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpQmUsT0FBTzs0QkFBQ0MsaUJBQWlCO3dCQUFxQjtrQ0FBRzs7Ozs7O2tDQUFjLDhEQUFDQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLdEo7R0E1SE1sRTs7UUFPV0wsa0RBQVNBOzs7S0FQcEJLO0FBOEhOLCtEQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9pbmRleC5qcz80MDgwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IFdhbGxldCBmcm9tIFwiLi93YWxsZXRcIjtcbmltcG9ydCB7IEJsb2NrZnJvc3QsIEx1Y2lkIH0gZnJvbSBcImx1Y2lkLWNhcmRhbm9cIjtcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4vaGVhZGVyXCI7XG5cbmNvbnN0IEhvbWUgPSAoKSA9PiB7XG5cbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFthZGRyZXNzUXVlcnksIHNldEFkZHJlc3NRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzaG93TW9kYWwsIHNldFNob3dNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3dhbGxldExvZ28sIHNldFdhbGxldExvZ29dID0gdXNlU3RhdGUoJ0Nvbm5lY3QgV2FsbGV0Jyk7XG4gIGNvbnN0IFthZGRyZXNzLCBzZXRBZGRyZXNzXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cblxuICAgIGNvbnN0IGhhbmRsZUFkZHJlc3NVcGRhdGUgPSAobmV3QWRkcmVzcykgPT4ge1xuICAgICAgc2V0QWRkcmVzcyhuZXdBZGRyZXNzKTtcbiAgICB9XG4gIFxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldFN0YWtlQWRkcmVzc0Zyb21XYWxsZXQod2FsbGV0KXtcbiAgICAgIGNvbnN0IGx1Y2lkID0gYXdhaXQgTHVjaWQubmV3KCk7XG4gIFxuICAgICAgdmFyIGFwaSA9ICcnO1xuICBcbiAgICAgIGlmKHdhbGxldCA9PSAnVHlwaG9uIFdhbGxldCcpe1xuICAgICAgICBhcGkgPSBhd2FpdCB3aW5kb3cuY2FyZGFuby50eXBob25jaXAzMC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICAgIGlmKHdhbGxldCA9PSAnZXRlcm5sJyl7XG4gICAgICAgIGFwaSA9IGF3YWl0IHdpbmRvdy5jYXJkYW5vLmV0ZXJubC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICAgIGlmKHdhbGxldCA9PSAnTmFtaScpe1xuICAgICAgICBhcGkgPSBhd2FpdCB3aW5kb3cuY2FyZGFuby5uYW1pLmVuYWJsZSgpO1xuICAgICAgfVxuICAgICAgaWYod2FsbGV0ID09ICdGbGludCBXYWxsZXQnKXtcbiAgICAgICAgYXBpID0gYXdhaXQgd2luZG93LmNhcmRhbm8uZmxpbnQuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGx1Y2lkLnNlbGVjdFdhbGxldChhcGkpO1xuICAgICAgbGV0IHN0YWtlID0gYXdhaXQgbHVjaWQud2FsbGV0LnJld2FyZEFkZHJlc3MoKTtcbiAgICAgIHJldHVybiBzdGFrZTtcbiAgXG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zKGFkZHJlc3Mpe1xuICAgICAgY29uc3QgcmVxID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmtvaW9zLnJlc3QvYXBpL3YwL2FkZHJlc3NfaW5mbycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBcIl9hZGRyZXNzZXNcIjogWyBhZGRyZXNzXG4gICAgICAgICAgXVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gIFxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICAgIHJldHVybiByZXNbMF0uc3Rha2VfYWRkcmVzcztcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVDdXN0b21BZGRyZXNzID0gYXN5bmMgKGV2ZW50KSA9PntcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZXRTaG93TW9kYWwoZmFsc2UpO1xuICAgICAgaWYoYWRkcmVzc1F1ZXJ5LnN0YXJ0c1dpdGgoJ2FkZCcpKXtcbiAgICAgICAgbGV0IHN0YWtlQWRkcmVzcyA9IGF3YWl0IGdldFN0YWtlRnJvbUFkZHJlc3NLb2lvcyhhZGRyZXNzUXVlcnkpO1xuICAgICAgICByb3V0ZXIucHVzaChgL2FkZHJlc3MvJHtzdGFrZUFkZHJlc3N9YCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhZGRyZXNzUXVlcnkuc3RhcnRzV2l0aCgnc3Rha2UnKSl7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy8ke2FkZHJlc3N9YCk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICByb3V0ZXIucHVzaChgL3Rva2VuLyR7c2VhcmNoUXVlcnl9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGhhbmRsZVNlYXJjaCA9IGFzeW5jICAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBVc2UgdGhlIGByb3V0ZXIucHVzaGAgbWV0aG9kIHRvIG5hdmlnYXRlIHRvIHRoZSBkeW5hbWljIHBhZ2Ugd2l0aCB0aGUgZW50ZXJlZCBudW1iZXIgYXMgdGhlIFVSTCBwYXJhbWV0ZXIuXG4gICAgICBpZihzZWFyY2hRdWVyeS5zdGFydHNXaXRoKCdhZGQnKSl7XG4gICAgICAgIGxldCBzdGFrZUFkZHJlc3MgPSBhd2FpdCBnZXRTdGFrZUZyb21BZGRyZXNzS29pb3Moc2VhcmNoUXVlcnkpO1xuICAgICAgICByb3V0ZXIucHVzaChgL2FkZHJlc3MvJHtzdGFrZUFkZHJlc3N9YCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzZWFyY2hRdWVyeS5zdGFydHNXaXRoKCdzdGFrZScpKXtcbiAgICAgICAgcm91dGVyLnB1c2goYC9hZGRyZXNzLyR7YWRkcmVzc31gKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvdG9rZW4vJHtzZWFyY2hRdWVyeX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICBcbiAgICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgIHNldFNob3dNb2RhbCh0cnVlKTtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgICAgc2V0U2hvd01vZGFsKGZhbHNlKTtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGhhbmRsZVNlbGVjdCA9IGFzeW5jICh3YWxsZXQpID0+IHtcbiAgICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG5cbiAgICAgIGxldCBzdGFrZSA9IGF3YWl0IGdldFN0YWtlQWRkcmVzc0Zyb21XYWxsZXQod2FsbGV0KTtcbiAgICAgIHJvdXRlci5wdXNoKGAvYWRkcmVzcy8ke3N0YWtlfWApO1xuXG4gICAgfVxuXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcFwiPlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5DYXJkYW5vIFRva2VuIEV4cGxvcmVyPC90aXRsZT5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kZXhcIj5cblxuICAgICAgPC9kaXY+XG4gICAgICA8bGFiZWwgPnRva2VuRXhwbHIuaW88L2xhYmVsPlxuICAgICAgICA8Zm9ybSAgb25TdWJtaXQ9e2hhbmRsZVNlYXJjaH0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIGFuIGFkZHJlc3Mgb3IgYSBzcGVjaWZpYyB0b2tlbi4uLlwiIHZhbHVlPXtzZWFyY2hRdWVyeX0gb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoUXVlcnkoZXZlbnQudGFyZ2V0LnZhbHVlKX0vPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiID5TZWFyY2g8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Qtd2FsbGV0XCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwid2FsbGV0QnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KCdUeXBob24gV2FsbGV0Jyl9IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOmB1cmwoJHsnL3R5cGhvbi5zdmcnfSlgfX0+VHlwaG9uPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwid2FsbGV0QnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KCdldGVybmwnKX0gc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6YHVybCgkeycvZXRlcm5sLnBuZyd9KWB9fT5FdGVybmw8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ3YWxsZXRCdXR0b25cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3QoJ05hbWknKX0gc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6YHVybCgkeycvbmFtaS5zdmcnfSlgfX0+TmFtaTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIndhbGxldEJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdCgnRmxpbnQgV2FsbGV0Jyl9IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOmB1cmwoJHsnL2ZsaW50LnBuZyd9KWB9fT5GbGludDwvYnV0dG9uPjxici8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lOyJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIlJlYWN0IiwiSGVhZCIsInVzZVJvdXRlciIsIldhbGxldCIsIkJsb2NrZnJvc3QiLCJMdWNpZCIsIkhlYWRlciIsIkhvbWUiLCJzZWFyY2hRdWVyeSIsInNldFNlYXJjaFF1ZXJ5IiwiYWRkcmVzc1F1ZXJ5Iiwic2V0QWRkcmVzc1F1ZXJ5Iiwic2hvd01vZGFsIiwic2V0U2hvd01vZGFsIiwid2FsbGV0TG9nbyIsInNldFdhbGxldExvZ28iLCJhZGRyZXNzIiwic2V0QWRkcmVzcyIsInJvdXRlciIsImhhbmRsZUFkZHJlc3NVcGRhdGUiLCJuZXdBZGRyZXNzIiwiZ2V0U3Rha2VBZGRyZXNzRnJvbVdhbGxldCIsIndhbGxldCIsImx1Y2lkIiwibmV3IiwiYXBpIiwid2luZG93IiwiY2FyZGFubyIsInR5cGhvbmNpcDMwIiwiZW5hYmxlIiwiZXRlcm5sIiwibmFtaSIsImZsaW50Iiwic2VsZWN0V2FsbGV0Iiwic3Rha2UiLCJyZXdhcmRBZGRyZXNzIiwiZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zIiwicmVxIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXMiLCJqc29uIiwic3Rha2VfYWRkcmVzcyIsImhhbmRsZUN1c3RvbUFkZHJlc3MiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnRzV2l0aCIsInN0YWtlQWRkcmVzcyIsInB1c2giLCJoYW5kbGVTZWFyY2giLCJoYW5kbGVDbGljayIsImhhbmRsZUNsb3NlIiwiaGFuZGxlU2VsZWN0IiwiZGl2IiwiY2xhc3NOYW1lIiwidGl0bGUiLCJsYWJlbCIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsImJ1dHRvbiIsIm9uQ2xpY2siLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.js\n"));

/***/ })

});