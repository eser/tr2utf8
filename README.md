# tr2utf8

This is a simple cli tool for converting turkish codepaged files into UTF-8 ones.

### Installation
```sh
npm install -g tr2utf8
```

### Usage
```sh
tr2utf8 source.txt
tr2utf8 source.txt --bom # with bom
tr2utf8 source.txt --target target.txt # save as another file
tr2utf8 source.txt --encoding iso-8859-9 # different encoding than Windows-1254
```
