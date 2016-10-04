/// <reference path="typings/main.d.ts" />

import helpers = require("./smartenv.classes.helpers");
export class Environment {
    runtimeEnv:string;
    isBrowser:boolean;
    userAgent:string;
    isNode:boolean;
    nodeVersion:string;
    isCI:boolean;
    isTravis:boolean;
    isC9:boolean;
    constructor() {
        this.runtimeEnv = helpers.getEnvString();
        this.isBrowser = helpers.isBrowser();
        this.userAgent = helpers.getUserAgentString();
        this.isNode = helpers.isNode();
        this.nodeVersion = helpers.getNodeVersion();
        this.isCI = helpers.isCI();
        this.isTravis = helpers.isTravis();
        this.isC9 = helpers.isC9();
    };
}
