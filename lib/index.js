"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(styleApi, file) {
    const { alias, or, and, not, isNodeModule, isRelativeModule, isAbsoluteModule, isInstalledModule, moduleName, naturally, unicode, startsWith } = styleApi;
    const fixedOrder = ['@angular/core', '@angular/core/testing'];
    const ngComparator = (name1, name2) => {
        let i1 = fixedOrder.indexOf(name1);
        let i2 = fixedOrder.indexOf(name2);
        i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
        i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;
        return i1 === i2 ? naturally(name1, name2) : i1 - i2;
    };
    return [
        // angular modules
        {
            match: moduleName(startsWith('@angular')),
            sort: moduleName(ngComparator),
            sortNamedMembers: alias(unicode)
        },
        { separator: true },
        // 3rd party modules
        {
            match: or(isNodeModule, isInstalledModule(file)),
            sort: moduleName(unicode),
            sortNamedMembers: alias(unicode)
        },
        { separator: true },
        // all others
        {
            match: or(isRelativeModule, isAbsoluteModule),
            sort: moduleName(unicode),
            sortNamedMembers: alias(unicode)
        },
        { separator: true }
    ];
}
exports.default = default_1;
