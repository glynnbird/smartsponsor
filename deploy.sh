#!/bin/bash
# strip comments from the Solidity source
str=`cat smartsponsor.sol | sed 's/\/\/.*//g' | tr  '\n' ' '`
# put the source into the template JavaScript
SRC="$str" envsubst < template.js > ss.js
# writing the output to ss.js

