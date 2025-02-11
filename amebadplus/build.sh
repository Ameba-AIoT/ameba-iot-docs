#!/bin/bash

if [[$1 == "cn"]]; then
    make cn TAGS=8721D
elif [[$1 == "cnda"]]; then
    make cn TAGS="nda 8721D"
elif [[$1 == "enda"]]; then
    make en TAGS="nda 8721D"
else
    make en TAGS=8721D
fi
