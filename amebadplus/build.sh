#!/bin/bash

if [$1 -eq "cn"]; then
    make cn TAGS=8721D
else
    make en TAGS=8721D
fi
