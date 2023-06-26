import fs from 'fs';
import {Path} from "../util/path.js";
import { SliceParser } from "../fo/fo.js";
import  zlib  from "node:zlib";

const objPath = new Path();


// TODO: add handling of both cases when you have path to file and path to folder
export function main_comp(slice) {
    var Names = SliceParser(slice);
    Names[0] = objPath.RelOrAbsolut(Names[0]);
    Names[1] = objPath.RelOrAbsolut(Names[1]);

    if (fs.existsSync(Names[0])) {
        if (fs.statSync(Names[0]).isFile()) {
            const readStream = fs.createReadStream(Names[0]);
            const writeStream = fs.createWriteStream(Names[1]);
            const brotlialgo = zlib.createBrotliCompress();

            const stream = readStream.pipe(brotlialgo).pipe(writeStream);
            stream.on('finish', () => {
                console.log("Done compressing");
            })
        }else {
            console.log("OPERATION FAILD: " + "we can't compress folders");
        }
    }else {
        console.log("OPERAITON FAILD: " + "incorrect path");
    }
}