
const path = require('path');
const fs = require('fs');
const googlelink = /\<link\s+[^\>]*?googleapis\.com[^\>]*?\>/g;
const nodejsorg = /http(s)?:\/\/nodejs.org/g;
const sourcePath = path.join(__dirname, 'nodejs.org/build');

eachDirection(sourcePath);

// 递归处理目录
function eachDirection(dir) {
    const dirs = fs.readdirSync(dir);
    if(dirs && dirs.length) {
        dirs.forEach((p, i) => {
            let tmp = path.join(dir, p);
            let stat = fs.statSync(tmp);
            if(stat.isFile()) {
                clearLinks(tmp);
            }
            else {
                eachDirection(tmp);
            }
        });
    }
}

// 清理其中的外连link
function clearLinks(f) {
    
    let ext = path.extname(f);
    if(!['.html','.htm','.shtml'].includes(ext)) {
        console.log(`${f} is not html`);
        return;
    }
    console.log(`clear ${f}`);

    let content = fs.readFileSync(f, 'utf8');
    let tmp = content.replace(googlelink, '').replace(nodejsorg, '');
    if(tmp != content) {
        fs.writeFileSync(f, tmp);
    }
}