@ECHO OFF
REM Run command
if "%1" == "" (
    echo "####################################################### Help Info ######################################################"
    echo "#  Examples:                                                                                                           #"
    echo "#                                                                                                                      #"
    echo "#    trans doc_file  output_dir  AmebaDplus                trans one docx to rst file into output dir.                 #"
    echo "#    trans doc_dir  output_dir  AmebaDplus                 trans all docx in doc_dir to rst files into output dir.     #"
    echo "#                                                                                                                      #"
    echo "#  Note:  AmebaDplus is the project name in your word file name. Like: AmebaDplus,Lite...                              #"
    echo "#         'Lite' for  hs002_'Lite'_pad_application_note.docx                                                           #"
    echo "########################################################################################################################"

    exit /b 0
) else (
    \\172.29.57.200\Dic\venv\Scripts\python.exe \\172.29.57.200\Dic\Tools\Wlan5_Scripts\docx2rst\trans_docs.py -r %1 -o %2 -p %3
    exit /b 0
    )
