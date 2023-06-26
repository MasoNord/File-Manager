import process from 'process';
import readline from 'readline';

import {nav} from "./nwd/nav.js";
import {fo} from "./fo/fo.js";
import {si} from "./si/si.js";
import {main_hash} from './hash/hash.js';
import {main_comp} from './comp/comp.js';
import {main_decomp} from "./decomp/decomp.js";

import {Path} from "./path.js";

/*
    -TODO: make function for getting name of working OS and for different operating systems
    create different versions of subtasks
    
    -TODO: if I will have enough time, try to make all function async
    
    -TODO: fix problem problem "slice" part for functions

    -TODO: fix problem with path_to_file either you want to do something with a file in current directory 
    or pick full path to a file starting from disk drive 

*/

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const greetings = () => {
    const argv = process.argv.slice(2);
    let result = "";

    argv.forEach(function(value, index, array) {
        var pass = false;
        
        for (var i = 0; i < value.length; ++i) {
            if (pass)
                result += value[i];
            else if (value[i] === '=')
                pass = true;
        }
    });

    return result;
}

 
function main() {
    var slice = " ";
    var path = new Path();

    process.stdout.write(`Welcome to the File Manager, ${greetings()}\n`);
    process.stdout.write(`You are currently in ${path.getCurrentDir()}\n`);
    
    var UserInput = () => {

        reader.setMaxListeners(0);
        reader.question("", (command) => {
            if (command === ".exit") {
                reader.close();
            }
            
            if (command.includes(" ")) {
                slice =  command.substring(command.indexOf(" "), command.length);
                slice = slice.replace(slice[0], "");
                command = command.substring(0, command.indexOf(" "));
            }

            switch(command) {
            case "up": case "ls": case "cd": case "cd..":
                path.setDirArr();
                nav(command, slice);
                break;
            case "cat": case "add": case "rn": case "cp": case "mv": case "rm":
                fo(command, slice);
                break;
            case "os":
                si(slice);
                break;
            case "hash":
                main_hash(slice);
                break;
            case "compress": 
                main_comp(slice);
                break;
            case "decompress":
                main_decomp(slice);
                break;
            case "cls": case "clear":

                break;
            default:
                console.log("Invalid input");
                break;
            }

            process.stdout.write(`You are currently in ${path.getCurrentDir()}\n`);
            UserInput();
        });
        reader.once("close", () => {
            console.log(`\nThank you for using File Manager, ${greetings()}, goodbye!`);
            process.exit(0);
        });
    }

    UserInput();
}

main();