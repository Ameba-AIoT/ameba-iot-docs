@ECHO OFF
setlocal enabledelayedexpansion

REM Set command window format
title Sphinx Maker


pushd %~dp0

REM Command file for Sphinx documentation

REM This ENV var used to switch filter
set RUN_LOCATION=local 

REM Set Tag and NDA
set tag=-t FreeRTOS
if "%2" == "nda" (
    set tag=!tag! -t %2
    if "%3" neq "" (
        set tag=!tag! -t %3
    )
    if "%4" neq "" (
        set tag=!tag! -t %4
    )
    if "%5" neq "" (
        set tag=!tag! -t %5
    )
) else if "%2" neq "" (
    set tag=!tag! -t %2
    if "%3" neq "" (
        set tag=!tag! -t %3
    )
    if "%4" neq "" (
        set tag=!tag! -t %4
    )
)

REM parse each arg
for %%i in (%*) do (
    echo %%i | findstr /i "Linux" >nul
    if !errorlevel! equ 0 (
        REM delete "-t FreeOS"
        set tag=!tag:-t FreeRTOS=!
    )
)

REM Run command
if "%1" == "" (
    echo "####################################################### Help Info ######################################################"
    echo "#  Examples:                                                                                                           #"
    echo "#                                                                                                                      #"
    echo "#    make active                Active the environmetn, the first thing you need to do.                                #"
    echo "#    make visio                 Trans all visio files to svg files, only trans visio file which newer than svg files.  #"
    echo "#    make api_doc               Gen sdk api dox in xml format.                                                         #"
    echo "#    make en                    Compile en rst with tag FreeRTOS(default) to html.                                     #"
    echo "#    make en RTLxxx             Compile en rst with tag RTLxxx and FreeRTOS(default) to html.                          #"
    echo "#    make en nda RTLxxx         Compile en nda rst with tag RTLxxx and FreeRTOS(default) to html.                      #"
    echo "#    make en nda RTLxxx Linux   Compile en nda rst with tag RTLxxx and Linux to html.                                  #"
    echo "#    make en nda                Compile en nda rst with tag FreeRTOS(default) to html.                                 #"
    echo "#    make cn                    Compile cn rst with tag FreeRTOS(default) to html.                                     #"
    echo "#    make clean                 Clean build dir.                                                                       #"
    echo "#                                                                                                                      #"
    echo "########################################################################################################################"

    exit /b 0
) else if "%1" == "clean" (
    goto Clean
) else if "%1" == "active" (
    ..\sphinx_venv\Windows\Scripts\activate.bat
) else if "%1" == "visio" (
    python ..\sphinx_venv\Windows\Scripts\trans_visio_files.py -r ..
) else if "%1" == "api_doc" (
    ..\doxygen\doxygen\bin\doxygen.exe en\api_docs\mbed_api_doxyfile 
) else if "%1" == "en" (
    echo "..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1 !tag!"
    python ..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1 !tag!
) else if "%1" == "cn" (
    echo "..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1 !tag!"
    python ..\sphinx_venv\Windows\Scripts\sphinx-build.exe -b html %1 build/%1/latest -c %1 !tag!
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
