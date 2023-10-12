"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argTypesExtraUtils = exports.webComponentBind = exports.setStorybookData = exports.getStorybookMeta = exports.toPascalCase = void 0;
function capitalize(string) {
    if (!string)
        throw new Error("capitalize: no string provided");
    // take first character, uppercase it
    // add the rest of the string
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function toPascalCase(str) {
    if (!str)
        throw new Error("toPascalCase: no string provided");
    // splitting words by dash
    var words = str.split("-");
    // use capitalize function to capitalize every word
    var capitalized = words.map(function (word) { return capitalize(word); });
    // glue up words with .join()
    return capitalized.join("");
}
exports.toPascalCase = toPascalCase;
function getStorybookMeta(storybookArgs, componentSetup) {
    if (!(componentSetup === null || componentSetup === void 0 ? void 0 : componentSetup.name))
        throw new Error("no component name provided");
    var copy1 = Object.assign({}, exports.argTypesExtraUtils);
    var copy2 = Object.assign({}, storybookArgs);
    var assigned = Object.assign({}, copy1, copy2);
    var meta = {
        title: componentSetup.category +
            "/" +
            toPascalCase(componentSetup.name.replace("hb-", "")),
        argTypes: assigned,
    };
    if (componentSetup.size) {
        meta.parameters = componentSetup.size;
    }
    return meta;
}
exports.getStorybookMeta = getStorybookMeta;
function setStorybookData(componentName, example, extra) {
    if (!extra)
        extra = {};
    return Object.assign({
        id: componentName + "-" + example.name,
    }, extra, example.data);
}
exports.setStorybookData = setStorybookData;
var webComponentBind = function (args, argTypes, repoName, version, options) {
    var _a;
    if (!args)
        throw new Error("no args provided");
    if (!argTypes)
        throw new Error("no argTypes provided");
    if (!repoName)
        throw new Error("no repoName provided");
    var componentName = repoName.split("/").length > 1 ? repoName.split("/")[1] : repoName;
    if (!args.id)
        args.id = componentName.replace("hb-", "") + "key";
    var attributes = Object.keys(argTypes).filter(function (f) { return argTypes[f].control && !argTypes[f].control.disable; });
    var actions = Object.keys(argTypes).filter(function (f) { return argTypes[f].action; });
    if (!document.getElementById(componentName + "-script")) {
        var script = document.createElement("script");
        script.id = componentName + "-script";
        script.src = !window.location.href.includes("localhost")
            ? "https://cdn.jsdelivr.net/npm/".concat(repoName, "@").concat(version, "/release/release.js")
            : "http://localhost:6006/".concat(componentName.replace("hb-", ""), "/dist/release.js");
        document.body.appendChild(script);
    }
    var c;
    if (document.getElementById(args.id)) {
        c = document.getElementById(args.id);
    }
    else {
        c = document.createElement(componentName);
        c.id = args.id;
        if (options === null || options === void 0 ? void 0 : options.innerHTML)
            c.innerHTML = options.innerHTML;
        var _loop_1 = function (action) {
            c.addEventListener(action, function (p) { return args[action](p.detail); });
        };
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var action = actions_1[_i];
            _loop_1(action);
        }
    }
    if (options === null || options === void 0 ? void 0 : options.style) {
        for (var _b = 0, _c = Object.keys(options.style); _b < _c.length; _b++) {
            var s = _c[_b];
            if ((_a = c === null || c === void 0 ? void 0 : c.style) === null || _a === void 0 ? void 0 : _a[s])
                c.style[s] = options.style[s];
        }
    }
    if (args._testInnerHtml)
        c.innerHTML = args._testInnerHtml;
    for (var _d = 0, attributes_1 = attributes; _d < attributes_1.length; _d++) {
        var attribute = attributes_1[_d];
        if (args[attribute] || args[attribute] === 0) {
            var val = "";
            if (args[attribute] === true) {
                val = "yes";
            }
            else if (args[attribute] === false) {
                val = "no";
            }
            else if (typeof args[attribute] === "string") {
                val = args[attribute];
            }
            else if (typeof args[attribute] === "object") {
                val = JSON.stringify(args[attribute]);
            }
            else if (typeof args[attribute] === "number") {
                val = args[attribute].toString();
            }
            else {
                console.error("unkown attr", attribute);
            }
            c.setAttribute(attribute, val);
        }
        else {
            if (c.hasAttribute(attribute))
                c.removeAttribute(attribute);
        }
    }
    return c;
};
exports.webComponentBind = webComponentBind;
exports.argTypesExtraUtils = {
    id: { control: { disable: true } },
};
//# sourceMappingURL=index.js.map