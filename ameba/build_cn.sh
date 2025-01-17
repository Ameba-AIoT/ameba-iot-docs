#!/bin/bash

echo "build amebadplus"
cd ../amebadplus
make cn RTL8721D

counter=5
until [ $counter -eq 0 ]
do
    sleep 1
    echo "build ameba common after "$counter" seconds"
    ((counter--))
done

cd -
make cn
