/// <reference path="typings/main.d.ts" />
import plugins = require("./smartenv.plugins");
export var obs:any = {
    add: function(paramNameArg = "undefined",objectArg = "undefined") {
        if (paramNameArg == "undefined"){
            console.log("paramName is undefined");
            return;
        }
        if (objectArg == "undefined"){
            console.log("objectArg is undefined");
        }
        if (typeof obsItems[paramNameArg] === "undefined"){
            obsItems[paramNameArg] = objectArg;
        } else {
            console.log("object is already present, so add operation has failed.");
        }
        return obsItems[paramNameArg];
    },
    replace: function(paramNameArg,objectArg){
        obsItems[paramNameArg] = objectArg;
    },
    merge: function(paramNameArg,objectArg){
        if(!(typeof obsItems[paramNameArg] === "undefined")){
            obsItems[paramNameArg] = plugins._.assign(obsItems[paramNameArg],objectArg);
        } else {
            console.log("object is not present, so there is nothing to merge");
        }
    },
    get: function(keyName) {
        return obsItems[keyName];
    },
    getAll: function () {
        return obsItems;
    },
    addComplete: function(itemsArg) {
        obsItems = plugins._.assign(obsItems,itemsArg);
        return obsItems;
    }
};
export var obsItems:any = {};