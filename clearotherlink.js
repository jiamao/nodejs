
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
    let tmp = content.replace(googlelink, '')
            .replace(nodejsorg, '')
            .replace('<title>Node.js</title>', '<title>Nodejs 中文网</title>')
            .replace("Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.", 'nodejs中文文档: Node.js 是一个基于 Chrome V8 引擎 的 JavaScript 运行时');
    if(tmp != content) {
        fs.writeFileSync(f, tmp);
    }
}