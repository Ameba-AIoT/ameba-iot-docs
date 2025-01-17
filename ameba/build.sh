#!/bin/bash

echo "build amebadplus"
cd ../amebadplus
make en

counter=1
until [ $counter -eq 0 ]
do
    sleep 1
    echo "build ameba common after "$counter" seconds"
    ((counter--))
done

cd -
make en
