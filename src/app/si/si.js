import os from 'os';

function eol_si() {
    const result = os.EOL;
    console.log(JSON.stringify(result));
}

//TODO: Implementing displaying of info in shaype of a table using console.table()
function cpus_si() {
    const result = os.cpus();
    const numOfCors = os.cpus().length;
    console.log(result);
    console.log("Total amount of cores: " + numOfCors / 2);
    console.log("Total amount of logical processors: " + numOfCors);
}

function homedir_si() {
    const result = os.homedir();
    console.log("Your home directory: " + result);
}

function username_si() {
    const result = os.userInfo().username;
    console.log("System user name: " + result);
}

function architecture_si() {
    const result = os.arch();
    console.log("Architecture of your CPU: " + result);
}

export function si(command) {
    switch(command) {
    case "--EOL":
        eol_si();    
        break;
    case "--cpus":
        cpus_si();
        break;
    case "--homedir":
        homedir_si();
        break;
    case "--username":
        username_si();
        break;
    case "--architecture":
        architecture_si(); 
        break;
    default:
        console.log("Ther is no such a command for OS module");
        break;
    }
}