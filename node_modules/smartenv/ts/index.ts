/// <reference path="typings/main.d.ts" />

import * as plugins from "./smartenv.plugins";
import * as classes from "./smartenv.classes";
import * as SmartenvEnvironment from "./smartenv.environment";
import * as SmartenvObjectstorage from "./smartenv.objectstorage";

var smartenv = {
    getEnv: SmartenvEnvironment.getEnv,
    printEnv: SmartenvEnvironment.printEnv,
    obs: SmartenvObjectstorage.obs
}; //create smartenv object

export = smartenv;
