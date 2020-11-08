import { execSync} from "child_process"
import * as util from "util"
import * as fs from "fs"
import * as path from "path"

//function to recurse dirs finding files
function fromDir(startPath, filter, callback) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

//this add .js to lines like:  import .* from "\.  <-- only imports from ./ or ../ are touched
function addDotJsToLocalImports(filename) {
    var buf = fs.readFileSync(filename);
    let replaced = buf.toString().replace(/(import .* from\s+['"])(?!.*\.js['"])(\..*?)(?=['"])/g, '$1$2.js')
    if (replaced !== buf.toString()) {
        fs.writeFileSync(filename, replaced)
        console.log("fixed imports at "+filename )
    }
}

//------------------------
//---BUILD TASK START
//------------------------

execSync("npx tsc --build -verbose", { stdio: 'inherit' })

//add .js to generated imports so tsconfig.json module:"ES2020" works with node
//see: https://github.com/microsoft/TypeScript/issues/16577
fromDir("./static", /\.js$/, addDotJsToLocalImports)

