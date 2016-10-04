/// <reference path="typings/main.d.ts" />

export var getEnvString = function():string {
    if (typeof window !== "undefined") {
        return "browser";
    } else if (typeof process !== "undefined") {
        return "node";
    }
};

export var getUserAgentString = function():string{
    if(isBrowser()){
        return  navigator.userAgent;
    } else {
        return undefined;
    }
};

export var isNode = function():boolean {
    return getEnvString() === "node"
};

export var getNodeVersion = function():string {
    return process.version;
};

export var isBrowser = function():boolean {
    return !isNode();
};

export var isCI = function(){
    if(process.env.CI){
        return true;
    } else {
        return false;
    };
};

export var isC9 = function(){
    if (process.env.C9_HOSTNAME){
        return true;
    } else {
        return false;
    }
};

export var isTravis = function(){
    if(process.env.TRAVIS){
        return true;
    } else {
        return false;
    };
};