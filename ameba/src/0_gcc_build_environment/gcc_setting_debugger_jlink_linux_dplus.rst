.. tab:: RTL8721Dx

   KM4 Setup
   ******************
   1. Connect to KM4

      Open a new terminal under directory ``/amebadplus_gcc_project/utils/jlink_script``, and type ``$/opt/SEGGER/JLink/JLinkGDBServer -select USB-device Cortex-M33 -if SWD -scriptfileAP2_KM4.JLinkScript port 2335``.

      .. figure:: figures/dplus_linux_km4_jlink_gdb_server_connection.png
         :scale: 70%
         :align: center

         KM4 J-Link GDB server connection setting under Linux

      If the connection is successful, the log is shown as below. This terminal should NOT be closed if you want to download software or enter GDB debugger mode.

      .. figure:: figures/dplus_linux_km4_jlink_gdb_server_connection_success.png
         :scale: 70%
         :align: center

         KM4 J-Link GDB server connection success under Linux

   2. Setup J-Link for KM4

      Open a new terminal under project_km4 folder, and type ``$make setup GDB_SERVER=jlink`` command before using J-Link to download software or enter GDB debugger.

      .. figure:: figures/dplus_linux_km4_jlink_setup.png
         :scale: 70%
         :align: center

         KM4 J-Link terminal setup under Linux

   KM0 Setup
   ******************
   1. Connect to KM0

      Open a new terminal under directory ``/amebadplus_gcc_project/utils/jlink_script``, and type ``$/opt/SEGGER/JLink/JLinkGDBServer -select USB -device Cortex-M23 -if SWD -scriptfile AP1_KM0.JLinkScript port 2331``.

      .. figure:: figures/dplus_linux_km0_jlink_gdb_server_connection.png
         :scale: 70%
         :align: center

         KM0 J-Link GDB server connection setting under Linux

      If the connection is successful, the log is shown below.

      .. figure:: figures/dplus_linux_km0_jlink_gdb_server_connection_success.png
         :scale: 70%
         :align: center

         KM0 J-Link GDB server connection success under Linux

   2. Setup J-Link for KM0

      Open a new terminal under project_km0, and type ``$make setup GDB_SERVER=jlink`` command before using J-Link to download software or enter GDB debugger.

      .. figure:: figures/dplus_linux_km0_jlink_setup.png
         :scale: 70%
         :align: center

         KM0 J-Link terminal setup under Linux