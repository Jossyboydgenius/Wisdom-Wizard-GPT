"use client";
"use strict";
exports.__esModule = true;
exports.ConvexClientProvider = void 0;
var react_1 = require("react");
var nextjs_1 = require("@clerk/nextjs");
var react_2 = require("convex/react");
var react_clerk_1 = require("convex/react-clerk");
;
var convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
var convex = new react_2.ConvexReactClient(convexUrl);
exports.ConvexClientProvider = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement(nextjs_1.ClerkProvider, { afterSignUpUrl: "/sign-up" },
        react_1["default"].createElement(react_clerk_1.ConvexProviderWithClerk, { useAuth: nextjs_1.useAuth, client: convex, children: undefined },
            react_1["default"].createElement(react_2.Authenticated, { children: undefined }, children),
            react_1["default"].createElement(react_2.Unauthenticated, { children: undefined }, children))));
};
exports["default"] = exports.ConvexClientProvider;
