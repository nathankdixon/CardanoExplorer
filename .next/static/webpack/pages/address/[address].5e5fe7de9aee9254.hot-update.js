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

eval(__webpack_require__.ts("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../header */ \"./src/pages/header.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../token */ \"./src/pages/token.js\");\n/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../wallet */ \"./src/pages/wallet.js\");\n/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/next/dist/compiled/buffer/index.js\")[\"Buffer\"];\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__]);\n([_header__WEBPACK_IMPORTED_MODULE_3__, _wallet__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction AddressPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const { address  } = router.query;\n    const [stake, setStake] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const someFunc = async ()=>{\n            if (address == null) {\n            //\n            } else if (address.startsWith(\"$\")) {\n                let handle = address.slice(1);\n                let _stake = await getAddressFromHandle(handle);\n                setStake[_stake];\n            } else {\n                setStake(address);\n            }\n        };\n        someFunc();\n    }, [\n        address\n    ]);\n    const getAddressFromHandle = async (handle)=>{\n        let policyID = \"f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a\";\n        // A blank Handle name should always be ignored.\n        if (handle.length === 0) {\n        // Handle error.\n        }\n        // Convert handleName to hex encoding.\n        let assetName = Buffer.from(handle).toString(\"hex\");\n        const data = await fetch(\"https://cardano-mainnet.blockfrost.io/api/v0/assets/\".concat(policyID).concat(assetName, \"/addresses\"), {\n            headers: {\n                // Your Blockfrost API key\n                project_id: \"mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh\",\n                \"Content-Type\": \"application/json\"\n            }\n        }).then((res)=>res.json());\n        let stake = await getStakeFromAddressKoios(data[0].address);\n        return stake;\n    };\n    const handleAddressUpdate = (newAddress)=>{\n        router.push(\"/address/\" + newAddress);\n    };\n    async function getStakeFromAddressKoios(address) {\n        const req = await fetch(\"https://api.koios.rest/api/v0/address_info\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                \"_addresses\": [\n                    address\n                ]\n            })\n        });\n        const res = await req.json();\n        return res[0].stake_address;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                updatedAddress: handleAddressUpdate\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 81,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"tokenList\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_wallet__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                    stakeAddress: stake\n                }, void 0, false, {\n                    fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                    lineNumber: 82,\n                    columnNumber: 36\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n                lineNumber: 82,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nathan/Desktop/explorer/src/pages/address/[address].js\",\n        lineNumber: 80,\n        columnNumber: 7\n    }, this);\n}\n_s(AddressPage, \"lcw8vg9zuu9kVhNOxexFzR90nbs=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = AddressPage;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AddressPage);\nvar _c;\n$RefreshReg$(_c, \"AddressPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYWRkcmVzcy9bYWRkcmVzc10uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNJO0FBQ2I7QUFDRjtBQUNFO0FBRy9CLFNBQVNNLGNBQWM7O0lBRW5CLE1BQU1DLFNBQVNQLHNEQUFTQTtJQUN4QixNQUFNLEVBQUVRLFFBQU8sRUFBRSxHQUFHRCxPQUFPRSxLQUFLO0lBQ2hDLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHVCwrQ0FBUUE7SUFFbENELGdEQUFTQSxDQUFDLElBQU07UUFDZCxNQUFNVyxXQUFXLFVBQVk7WUFDM0IsSUFBR0osV0FBVyxJQUFJLEVBQUM7WUFDakIsRUFBRTtZQUNKLE9BQ0ssSUFBR0EsUUFBUUssVUFBVSxDQUFDLE1BQUs7Z0JBQzlCLElBQUlDLFNBQVNOLFFBQVFPLEtBQUssQ0FBQztnQkFDM0IsSUFBSUMsU0FBUyxNQUFNQyxxQkFBcUJIO2dCQUN4Q0gsUUFBUSxDQUFDSyxPQUFPO1lBQ2xCLE9BQ0k7Z0JBQ0ZMLFNBQVNIO1lBQ1gsQ0FBQztRQUNIO1FBQ0FJO0lBQ0YsR0FBRztRQUFDSjtLQUFRO0lBRVosTUFBTVMsdUJBQXVCLE9BQU9ILFNBQVc7UUFDN0MsSUFBSUksV0FBVztRQUVmLGdEQUFnRDtRQUNoRCxJQUFJSixPQUFPSyxNQUFNLEtBQUssR0FBRztRQUN2QixnQkFBZ0I7UUFDbEIsQ0FBQztRQUVELHNDQUFzQztRQUN0QyxJQUFJQyxZQUFZQyxNQUFNQSxDQUFDQyxJQUFJLENBQUNSLFFBQVFTLFFBQVEsQ0FBQztRQUU3QyxNQUFNQyxPQUFPLE1BQU1DLE1BQ2pCLHVEQUFrRUwsT0FBWEYsVUFBcUIsT0FBVkUsV0FBVSxlQUM1RTtZQUNFTSxTQUFTO2dCQUNQLDBCQUEwQjtnQkFDMUJDLFlBQVk7Z0JBQ1osZ0JBQWdCO1lBQ2xCO1FBQ0YsR0FDQUMsSUFBSSxDQUFDQyxDQUFBQSxNQUFPQSxJQUFJQyxJQUFJO1FBRXRCLElBQUlwQixRQUFRLE1BQU1xQix5QkFBeUJQLElBQUksQ0FBQyxFQUFFLENBQUNoQixPQUFPO1FBQzFELE9BQU9FO0lBQ1Q7SUFFQSxNQUFNc0Isc0JBQXNCLENBQUNDLGFBQWU7UUFDMUMxQixPQUFPMkIsSUFBSSxDQUFDLGNBQVlEO0lBQzFCO0lBRUEsZUFBZUYseUJBQXlCdkIsT0FBTyxFQUFDO1FBQzlDLE1BQU0yQixNQUFNLE1BQU1WLE1BQU0sOENBQThDO1lBQ3BFVyxRQUFRO1lBQ1JWLFNBQVM7Z0JBQ1AsZ0JBQWdCO1lBQ2xCO1lBQ0FXLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztnQkFDbkIsY0FBYztvQkFBRS9CO2lCQUNmO1lBQ0g7UUFDRjtRQUVBLE1BQU1xQixNQUFNLE1BQU1NLElBQUlMLElBQUk7UUFDMUIsT0FBT0QsR0FBRyxDQUFDLEVBQUUsQ0FBQ1csYUFBYTtJQUM3QjtJQUlBLHFCQUNFLDhEQUFDQzs7MEJBQ0MsOERBQUN0QywrQ0FBTUE7Z0JBQUN1QyxnQkFBZ0JWOzs7Ozs7MEJBQ3hCLDhEQUFDUztnQkFBSUUsV0FBVTswQkFBWSw0RUFBQ3RDLCtDQUFNQTtvQkFBQ3VDLGNBQWNsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHekQ7R0E3RVNKOztRQUVVTixrREFBU0E7OztLQUZuQk07O0FBd0dQLCtEQUFlQSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9hZGRyZXNzL1thZGRyZXNzXS5qcz9lMGFhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vaGVhZGVyXCI7XG5pbXBvcnQgVG9rZW4gZnJvbSBcIi4uL3Rva2VuXCI7XG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuLi93YWxsZXRcIjtcblxuXG5mdW5jdGlvbiBBZGRyZXNzUGFnZSgpIHtcblxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICAgIGNvbnN0IHsgYWRkcmVzcyB9ID0gcm91dGVyLnF1ZXJ5O1xuICAgIGNvbnN0IFtzdGFrZSwgc2V0U3Rha2VdID0gdXNlU3RhdGUoKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBzb21lRnVuYyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYoYWRkcmVzcyA9PSBudWxsKXtcbiAgICAgICAgICAvL1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWRkcmVzcy5zdGFydHNXaXRoKCckJykpe1xuICAgICAgICAgIGxldCBoYW5kbGUgPSBhZGRyZXNzLnNsaWNlKDEpO1xuICAgICAgICAgIGxldCBfc3Rha2UgPSBhd2FpdCBnZXRBZGRyZXNzRnJvbUhhbmRsZShoYW5kbGUpO1xuICAgICAgICAgIHNldFN0YWtlW19zdGFrZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBzZXRTdGFrZShhZGRyZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc29tZUZ1bmMoKTtcbiAgICB9LCBbYWRkcmVzc10pXG5cbiAgICBjb25zdCBnZXRBZGRyZXNzRnJvbUhhbmRsZSA9IGFzeW5jIChoYW5kbGUpID0+IHtcbiAgICAgIGxldCBwb2xpY3lJRCA9ICdmMGZmNDhiYmI3YmJlOWQ1OWE0MGYxY2U5MGU5ZTlkMGZmNTAwMmVjNDhmMjMyYjQ5Y2EwZmI5YSc7XG4gICAgICBcbiAgICAgIC8vIEEgYmxhbmsgSGFuZGxlIG5hbWUgc2hvdWxkIGFsd2F5cyBiZSBpZ25vcmVkLlxuICAgICAgaWYgKGhhbmRsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gSGFuZGxlIGVycm9yLlxuICAgICAgfVxuICAgIFxuICAgICAgLy8gQ29udmVydCBoYW5kbGVOYW1lIHRvIGhleCBlbmNvZGluZy5cbiAgICAgIGxldCBhc3NldE5hbWUgPSBCdWZmZXIuZnJvbShoYW5kbGUpLnRvU3RyaW5nKCdoZXgnKTtcbiAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vY2FyZGFuby1tYWlubmV0LmJsb2NrZnJvc3QuaW8vYXBpL3YwL2Fzc2V0cy8ke3BvbGljeUlEfSR7YXNzZXROYW1lfS9hZGRyZXNzZXNgLFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLy8gWW91ciBCbG9ja2Zyb3N0IEFQSSBrZXlcbiAgICAgICAgICAgIHByb2plY3RfaWQ6ICdtYWlubmV0b1c2MVlZU2lPb0xTYU5RNmR6VHJrQUc0YXpYVklydmgnLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbiAgICAgIFxuICAgICAgbGV0IHN0YWtlID0gYXdhaXQgZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zKGRhdGFbMF0uYWRkcmVzcyk7XG4gICAgICByZXR1cm4gc3Rha2U7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlQWRkcmVzc1VwZGF0ZSA9IChuZXdBZGRyZXNzKSA9PiB7XG4gICAgICByb3V0ZXIucHVzaChgL2FkZHJlc3MvYCtuZXdBZGRyZXNzKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRTdGFrZUZyb21BZGRyZXNzS29pb3MoYWRkcmVzcyl7XG4gICAgICBjb25zdCByZXEgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkua29pb3MucmVzdC9hcGkvdjAvYWRkcmVzc19pbmZvJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIFwiX2FkZHJlc3Nlc1wiOiBbIGFkZHJlc3NcbiAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCByZXEuanNvbigpO1xuICAgICAgcmV0dXJuIHJlc1swXS5zdGFrZV9hZGRyZXNzO1xuICAgIH1cblxuXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlYWRlciB1cGRhdGVkQWRkcmVzcz17aGFuZGxlQWRkcmVzc1VwZGF0ZX0vPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRva2VuTGlzdFwiPjxXYWxsZXQgc3Rha2VBZGRyZXNzPXtzdGFrZX0vPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQYXRocygpIHtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIGR5bmFtaWMgcGF0aHMgZm9yIHRoZSBwYWdlLlxuICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgaGF2ZSBhIGxpc3Qgb2YgYWxsIHBvc3NpYmxlIG51bWJlcnMgYmV0d2VlbiAxIGFuZCA1IHRoYXQgd2UgY2FuIHVzZSB0byBjcmVhdGUgdGhlIHBhdGhzXG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGhzOiBbXSxcbiAgICAgIGZhbGxiYWNrOiB0cnVlXG4gICAgfTtcbiAgfVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoeyBwYXJhbXMgfSkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gZmV0Y2hlcyB0aGUgZGF0YSBmb3IgdGhlIHBhZ2UuXG4gICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBkb24ndCBuZWVkIHRvIGZldGNoIGFueSBkYXRhIGJlY2F1c2UgdGhlIG51bWJlciBpcyBhbHJlYWR5IGF2YWlsYWJsZSBpbiB0aGUgcGFyYW1zIG9iamVjdC5cbiAgICBsZXQgYWRkcmVzcyA9IHBhcmFtcy5hZGRyZXNzO1xuICBcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgYWRkcmVzc1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGRlZmF1bHQgQWRkcmVzc1BhZ2U7Il0sIm5hbWVzIjpbInVzZVJvdXRlciIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiSGVhZGVyIiwiVG9rZW4iLCJXYWxsZXQiLCJBZGRyZXNzUGFnZSIsInJvdXRlciIsImFkZHJlc3MiLCJxdWVyeSIsInN0YWtlIiwic2V0U3Rha2UiLCJzb21lRnVuYyIsInN0YXJ0c1dpdGgiLCJoYW5kbGUiLCJzbGljZSIsIl9zdGFrZSIsImdldEFkZHJlc3NGcm9tSGFuZGxlIiwicG9saWN5SUQiLCJsZW5ndGgiLCJhc3NldE5hbWUiLCJCdWZmZXIiLCJmcm9tIiwidG9TdHJpbmciLCJkYXRhIiwiZmV0Y2giLCJoZWFkZXJzIiwicHJvamVjdF9pZCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZ2V0U3Rha2VGcm9tQWRkcmVzc0tvaW9zIiwiaGFuZGxlQWRkcmVzc1VwZGF0ZSIsIm5ld0FkZHJlc3MiLCJwdXNoIiwicmVxIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGFrZV9hZGRyZXNzIiwiZGl2IiwidXBkYXRlZEFkZHJlc3MiLCJjbGFzc05hbWUiLCJzdGFrZUFkZHJlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/address/[address].js\n"));

/***/ })

});