import crypto from 'crypto';
import fs from 'fs';
import {Path} from "../util/path.js";

const objPath = new Path();

export function main_hash(path_to_file) {
    const working_path = objPath.RelOrAbsolut(path_to_file);
    var content = "";

    if (fs.existsSync(working_path)) {
        if (fs.statSync(working_path).isFile()) {
            content = fs.readFileSync(working_path, {encoding: "utf-8"}, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            const hash = crypto
                .createHash("SHA256")
                .update(content)
                .digest("hex");
            console.log(hash);
        } else {
            console.log("We can't get SHA for folders");
        }
    }
    else {
        console.log("OPERATION FAILD: wrong path");
    }
    

}