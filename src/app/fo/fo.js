import fs from 'fs';

import {Path} from "../util/path.js";
import { GetSleshes } from '../util/os-parser.js';

const objPath = new Path();

function cat_fo(slice) {
    slice = objPath.RelOrAbsolut(slice);
    
    try {
        if (fs.existsSync(slice)) {
            try {
                var ReadStream = fs.createReadStream(slice, "utf-8");
                ReadStream.on("data", function(chunk) {
                    console.log(chunk);
                })
                ReadStream.on("error", function(err) {
                    throw new Error(err);
                })
            }catch(err) {
                console.error(err);
            }
        }else {
            console.log("OPERATINO FAILD: there is no such file");
        }
    }catch(err) {
        console.log(err);
    }
}

function add_fo(FileName) {
    FileName = objPath.RelOrAbsolut(FileName);
    try {
        if (!fs.existsSync(FileName) && FileName !== " ") {
            fs.mkdirSync(FileName);
        }
    }catch(err) {
        console.log(err);
    }
}

function rn_fo(slice) {
    var Names = SliceParser(slice);
    Names[0] = objPath.RelOrAbsolut(Names[0]);
    Names[1] = objPath.RelOrAbsolut(Names[1]);
    
    try {
        if (fs.existsSync(Names[0])) {
            fs.rename(Names[0], Names[1], (err) => {
                if (err) console.log("ERROR: " + err);
            });
        }else {
            console.log("Specified file does not exist in the current directory");
        }
    }catch(err) {
        console.log(err);
    }
}

function cp_fo(slice) {
    var Names = SliceParser(slice);
    Names[0] = objPath.RelOrAbsolut(Names[0]);
    Names[1] = objPath.RelOrAbsolut(Names[1]);

    try {
        if (fs.existsSync(path + Names[0]) && fs.existsSync(Names[1])) {
            const readable = fs.createReadStream(path + Names[0]);
            const Copy = Names[1] + GetSleshes() + "copy-" + Names[0];
            const writable = fs.createWriteStream(Copy);
    
            readable.pipe(writable);
    
            writable.on("finish", () => {
                console.log("You have successfully created a copy");
            })
        }
    }catch(err) {
        console.log(err);
    }
}

function mv_fo(slice) {
    var Names = SliceParser(slice);
    Names[0] = objPath.RelOrAbsolut(Names[0]);
    Names[1] = objPath.RelOrAbsolut(Names[1]);
    
    try {
        if (fs.existsSync(path + Names[0]) && fs.existsSync(Names[1])) {
            const readable = fs.createReadStream(path + Names[0]);
            const Copy = Names[1] + GetSleshes() + "new-" + Names[0];
            const writable = fs.createWriteStream(Copy);
    
            readable.pipe(writable);
    
            writable.on("finish", () => {
                console.log("You have successfully move your file");
                fs.unlinkSync(path + Names[0]);
            })
        }else {
            console.log("OPERATION FAILD: wrong path");
        }
    }catch(err) {
        console.log(err);
    }
}

function rm_fo(PathToFile) {
    const workingpath = objPath.RelOrAbsolut(PathToFile);
    
    try {
        if (fs.existsSync(workingpath)) {
            fs.unlinkSync(workingpath);
        } else {
            console.log("IPERAION FAILD: file does exit on a given path");
        }
    }catch(err) {
        console.log(err);
    }
} 


export function fo(commands, slice) {
    switch(commands) {
    case "cat":
        cat_fo(slice);
        break;
    case "add":
        add_fo(slice);
        break;
    case "rn":
        rn_fo(slice);
        break;
    case "cp":
        cp_fo(slice);
        break;
    case "mv":
        mv_fo(slice);
        break;
    case "rm":
        rm_fo(slice);
        break;
    }
}

export function SliceParser(slice) {
    
    if (WordCouter(slice) > 2) {
        console.log("incorrect parameters");
    }else {
        return slice.split(" ");
    }
    return []; 
}

function WordCouter(str) {
    return str.split(" ").length;
}