# express-body-formatter

An express middleware that formats the request body to a particular unified style

## Installation
Using npm

    npm install --save express-body-formatter
Using yarn

    yarn add express-body-formatter

## Usage

    const express = require("express");
    const bodyParser = require("body-parser");
    const bodyFormatter = require("express-body-formatter");
    const app = express();

    app.use(bodyParser.json());
    const options = { exclude: ["name"], trim: true, toLowerCase: false }
    app.use(bodyFormatter(options));
    app.use("/", function(req, res) {
      res.json(req.body);
    });

    app.listen(3000);

if a json object is sent to the server, for example:

    {"name": "John Doe ", "status": " I love programmING "}
    
your object will become:

    {name: "John Doe ", "status": "i love programming"}

name will remain the same because it was inluded in the `exclude` array option but status will be formatted accordingly

### Options

all options are optional, to use the default options, you can either send an empty object as an argument or not send an arguement at all


| options | type | description |
| ------: | ---- | :---------- |
| exclude | array | an array of object keys to exclude from formatting, useful when exempting data that needs to remain it was sent |
| trim | boolean | if set to true, it removes any whitespace before and after a given value, default value is true |
| toLowerCase | boolean | if set to true, it converts all string to lowercase characters, default value is true |
