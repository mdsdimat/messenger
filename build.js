import { execSync} from "child_process"
import * as fs from "fs"
import * as path from "path"

//function to recurse dirs finding files
// source https://github.com/microsoft/TypeScript/issues/16577#issuecomment-695745869
const regForCompile = /(import .* from\s+['"])(?!.*\.js['"])(\..*?)(?=['"])/g;
function fromDir(startPath, filter, callback) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    let files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    }
}

function addDotJsToLocalImports(filename) {
    let buf = fs.readFileSync(filename);
    let replaced = buf.toString().replace(regForCompile, '$1$2.js')
    if (replaced !== buf.toString()) {
        fs.writeFileSync(filename, replaced)
        console.log("fixed imports at "+filename )
    }
}

execSync("npx tsc --build -verbose", { stdio: 'inherit' })
fromDir("./static", /\.js$/, addDotJsToLocalImports)

