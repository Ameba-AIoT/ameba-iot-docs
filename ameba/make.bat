@ECHO OFF
setlocal enabledelayedexpansion

REM Set command window format
title Sphinx Maker


pushd %~dp0

REM Command file for Sphinx documentation


REM Run command
if "%1" == "" (
    echo "####################################################### Help Info ######################################################"
    echo "#  Examples:                                                                                                           #"
    echo "#                                                                                                                      #"
    echo "#    make active                Active the environmetn, the first thing you need to do.                                #"
    echo "#    make en                    Compile en rst to html.                                                                #"
    echo "#    make cn                    Compile cn rst to html.                                                                #"
    echo "#    make clean                 Clean build dir.                                                                       #"
    echo "#                                                                                                                      #"
    echo "########################################################################################################################"

    exit /b 0
) else if "%1" == "clean" (
    goto Clean
) else if "%1" == "active" (
    ..\sphinx_venv\Windows\Scripts\activate.bat
) else if "%1" == "en" (
    echo "..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1"
    python ..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1
) else if "%1" == "cn" (
    echo "..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1"
    python ..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1
) else (
    echo "Invalid target: %1."
    exit /b 1
)
exit /b 0


:Clean
REM Clean build
set folderPath=build
  
if exist "%folderPath%" (  
    echo Attempting to delete %folderPath%
    rd /s /q "%folderPath%"  
    if %errorlevel% neq 0 (  
        echo "Failed to delete %folderPath%, you should delete by hand."
        exit /b 1
    )  
    echo "Folder deleted successfully."  
    exit /b 0
)

popd
