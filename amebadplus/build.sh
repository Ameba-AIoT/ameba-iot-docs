#!/bin/bash

# 获取输入的字符串
input_string="$1"

# 根据字符串内容执行不同的操作
case "$input_string" in
    "cn")
        echo "build cn ..."
        make cn TAGS="8721D"
        ;;
    "cnda")
        echo "build cn nda ..."
        make cn TAGS="nda 8721D"
        ;;
    "enda")
        echo "build en nda ..."
        make en TAGS="nda 8721D"
        ;;
    *)
        make en TAGS="8721D"
        ;;
esac
