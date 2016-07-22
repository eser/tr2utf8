'use strict';

function getFiles(paths, includeBinaries) {
    const globAll = require('glob-all'),
        isBinaryFile = require('isbinaryfile');

    const files = globAll.sync(paths, { nosort: true, nonull: false, nodir: true }),
        result = [];

    for (let i = 0, length = files.length; i < length; i++) {
        if (includeBinaries || !isBinaryFile.sync(files[i])) {
            result.push(files[i]);
        }
    }

    return result;
}

function tr2utf8(paths, options) {
    const fs = require('fs'),
        turkishCharEncoding = require('turkish-char-encoding');

    const files = getFiles(paths, options.includeBinaries),
        encoding = turkishCharEncoding(options.encoding);

    for (let file of files) {
        const content = fs.readFileSync(file, 'binary');

        const convertedContent = ((options.bom) ? '\ufeff' : '') +
            encoding.toUTF8(content);

        fs.writeFileSync(file /* targetFile */, convertedContent, { encoding: 'utf-8' });
    }
}

module.exports = tr2utf8;
