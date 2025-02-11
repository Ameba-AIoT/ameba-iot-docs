.. tab:: RTL8726EA/RTL8720EA

   KM4 Setup
   ******************
   1. Connect to KM4

      Open a new terminal under ``amebalite_gcc_project/utils/jlink_script``, and type ``$/opt/SEGGER/JLink/JLinkGDBServer -select USB-device Cortex-M33 -if SWD -scriptfile AP0_KM4.JLinkScript port 2335``.

      .. figure:: ../figures/lite_linux_km4_jlink_gdb_server_connection.png
         :scale: 70%
         :align: center

         KM4 J-Link GDB server connection setting under Linux

      If the connection is successful, the log is shown as below. This terminal should NOT be closed if you want to download software or enter GDB debugger mode.

      .. figure:: ../figures/lite_linux_km4_jlink_gdb_server_connection_success.png
         :scale: 70%
         :align: center

         KM4 J-Link GDB server connection success under Linux

   2. Setup J-Link for KM4

      Open a new terminal under project_km4 folder, and type ``$make setup GDB_SERVER=jlink`` command before using J-Link to download software or enter GDB debugger.

      .. figure:: ../figures/lite_linux_km4_jlink_setup.png
         :scale: 70%
         :align: center

         KM4 J-Link terminal setup under Linux

   KR4 Setup
   ******************
   1. Connect to KM4

      Before connecting to KR4, open a new terminal under ``amebalite_gcc_project/utils/jlink_script``, and type ``$/opt/SEGGER/JLink/ JLinkExe -device Cortex-M33 -if swd -autoconnect 1 -speed 1000 -JLinkScriptFile KM4_SEL.JLinkScript`` to connect to KM4 by J-Link at first.

      .. figure:: ../figures/lite_linux_kr4_setup_km4_jlink_gdb_server_connection.png
         :scale: 70%
         :align: center

         KM4 J-Link connection setting under Linux

      If the connection is successful, the log is shown as below.

      .. figure:: ../figures/lite_linux_kr4_setup_km4_jlink_gdb_server_connection_success.png
         :scale: 70%
         :align: center

         KM4 J-Link connection success under Linux

   2. Connect to KR4

      After KM4 is connected by J-Link successfully, open a new terminal under the same working directory and type ``$/opt/SEGGER/JLink/JLinkGDBServer -select USB-device RV32 -if cjtag -port 2331`` to connect to KR4.

      .. figure:: ../figures/lite_linux_kr4_jlink_gdb_server_connection.png
         :scale: 70%
         :align: center

         KR4 J-Link GDB server connection setting under Linux

      If the connection is successful, the log is shown as below. This terminal should NOT be closed if you want to download software or enter GDB debugger mode. And it is OK to close the J-Link window of KM4.

      .. figure:: ../figures/lite_linux_kr4_jlink_gdb_server_connection_success.png
         :scale: 70%
         :align: center

         KR4 J-Link GDB server connection success under Linux

   3. Setup J-Link for KR4

      Open a new terminal under project_kr4, and type ``$make setup GDB_SERVER=jlink`` command before using J-Link to download software or enter GDB debugger.

      .. figure:: ../figures/lite_linux_kr4_jlink_setup.png
         :scale: 70%
         :align: center

         KR4 J-Link terminal setup under Linux