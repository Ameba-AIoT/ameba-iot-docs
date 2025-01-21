#!/bin/bash

echo "build amebadplus"
make cn

counter=1
until [ $counter -eq 0 ]
do
    sleep 1
    echo "build ameba common after "$counter" seconds"
    ((counter--))
done

cd ../amebadplus
make en TAGS=8721D
cd -
