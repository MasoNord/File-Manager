import os from "os";
import process from 'process';

import {GetSleshes} from "./os-parser.js";


//TODO: implement normilization of path for linux terminal
export class Path {
    // for cd function
    static CurrentDir = " ";
    
    // for up function
    static DirArr = [];
    
    constructor() {
        Path.CurrentDir = os.homedir();
    }

    getCurrentDir() {
        return Path.CurrentDir;
    }

    getDirArr() {
        return Path.DirArr;
    }

    setCurrentDir(value) {
        Path.CurrentDir = value;
    }

    setDirArr() {
        Path.DirArr = [];
        var temp = "";
        var i;
        try {
            for (i = 0; i < Path.CurrentDir.length; ++i) { 
                if (Path.CurrentDir[i] !== GetSleshes()) {
                    temp = temp + Path.CurrentDir[i];
                } else {
                    Path.DirArr.push(temp);
                    temp = "";
                }
            }
            Path.DirArr.push(temp);
        }catch (err) {
            console.log(err);
        }
    }

    RelOrAbsolut(FilePath) {
        try {
            const temp = FilePath + "";
            if (process.platform === "win32") {
                
                if (temp.includes(":\\"))
                    return temp;
                else if (temp.includes("./")) 
                    return Path.CurrentDir + "\\" + temp.replace("./", "");
                
                return Path.CurrentDir + "\\" + temp;
            } else {
                if (temp.includes("./")) 
                    return temp;
                return Path.CurrentDir + "/" + temp;
            }
        }catch(err) {
            console.log(err);
        }
    }

}