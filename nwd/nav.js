import process from "process";
import console, { table } from "console";
import os from 'os';
import fs from 'fs';

import {Path} from "../path.js";

const objPath = new Path();

// Go up

function up_nav() {
    var temp = objPath.getCurrentDir();
    var TempArr = objPath.getDirArr()
    
    if (TempArr.length > 2) {
        objPath.setCurrentDir(temp.replace( "\\" + TempArr[TempArr.length - 1], ""));
    } else if (TempArr.length === 2) {
        objPath.setCurrentDir(temp.replace(TempArr[TempArr.length - 1], ""));
    }
    
}

// Go to dedicated folder
function cd_nav(slice) {
    slice = objPath.RelOrAbsolut(slice);

    try {
        if (fs.existsSync(slice) && (fs.lstatSync(slice).isDirectory()))
            objPath.setCurrentDir(slice);
        else {
            process.stdout.write("Cannot find path\n")
        }
    }catch(err) {
        console.log(err);
    }
    
}

// Print in console list of contents in the current directory
function ls_nav() {
    // TODO: Implement sorting of files in alphabetic order and folders goes first
    // TODO: resolve a problem with a file access, try to use readdir flags
    fs.readdir(objPath.getCurrentDir(), function(err, files) {
        var values = [];
        if (err) {
            return console.log("unable to scan directory: " + err);
        } 
        files.forEach(function(file) {
            if (fs.lstatSync(objPath.getCurrentDir() + "\\" + file).isDirectory()) {
                values.push({
                    "Name": file,
                    "Type": "directory"
                });
            }else if (fs.lstatSync(objPath.getCurrentDir() + "\\" + file).isSymbolicLink()) {
                values.push({
                    "Name": file,
                    "Type": "symbolink"
                })
            }else {
                values.push({
                    "Name": file,
                    "Type": "file"
                })
            }
        });
        console.table(values);      
    });
}

export function nav(commands, slice) {

    switch(commands) {
        case "up":
            up_nav();
            break;
        case "cd":
            cd_nav(slice);
            break;
        case "ls":
            ls_nav();    
            break;
    }
}

