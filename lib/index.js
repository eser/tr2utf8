'use strict';

const globAll = require('glob-all'),
    fs = require('fs'),
    turkishCharEncoding = require('turkish-char-encoding'),
    isBinaryFile = require('isbinaryfile');

function getFiles(paths) {
    return globAll.sync(paths, { nosort: true, nonull: false, nodir: true });
}

function tr2utf8(paths, options) {
    const files = getFiles(paths),
        encoding = turkishCharEncoding(options.encoding);

    for (let file of files) {
        if (!options.includeBinaries && isBinaryFile.sync(file)) {
            continue;
        }

        const content = fs.readFileSync(file, 'binary');

        const convertedContent = ((options.bom) ? '\ufeff' : '') +
            encoding.toUTF8(content);

        if (options.verbose) {
            console.log('Processing ' + file + '...');
        }

        fs.writeFileSync(file /* targetFile */, convertedContent, { encoding: 'utf-8' });
    }
}

module.exports = tr2utf8;
