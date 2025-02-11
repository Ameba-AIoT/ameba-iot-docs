.. tab:: RTL8730E

   KM4 Setup
   ******************
   1. Open a new terminal under ``{SDK}/amebasmart_gcc_project/utils/jlink_script``.
   2. Type ``$/opt/SEGGER/JLink/JLinkGDBServer -device cortex-m33 -if SWD -scriptfile AP1_KM4.JLinkScript -port 2335``. This terminal should NOT be closed if you want to download software or enter GDB debugger mode.

   If the connection is successful, the log is shown as below.

   .. figure:: ../figures/smart_km4_jlink_gdb_server_connection_success.png
      :scale: 85%
      :align: center

      KM4 J-Link GDB server connection success

   KM0 Setup
   ******************
   1. Open a new terminal under ``{SDK}/amebasmart_gcc_project/utils/jlink_script``.
   2. Type ``$/opt/SEGGER/JLink/JLinkGDBServer -device cortex-m23 -if SWD -scriptfile AP0_KM0.JLinkScript -port 2331``. This terminal should NOT be closed if you want to download software or enter GDB debugger mode.

   If the connection is successful, the log is shown as below.

   .. figure:: ../figures/smart_km0_jlink_gdb_server_connection_success.png
      :scale: 85%
      :align: center

      KM0 J-Link GDB server connection success

   CA32 Setup
   ********************
   **For CA32 core0:**

   1. Open a new terminal under ``{SDK}/amebasmart_gcc_project/utils/jlink_script``.
   2. Type ``$/opt/SEGGER/JLink/JLinkGDBServer -device cortex-a32 -if SWD -scriptfile AP3_CA32_Core0.JLinkScript -port 2337``. This terminal should NOT be closed if you want to download software or enter GDB debugger mode.

   If the connection is successful, the log is shown as below.

   .. figure:: ../figures/smart_ca32_core0_jlink_gdb_server_connection.png
      :scale: 85%
      :align: center

      CA32 core0 J-Link GDB server connection

   **For CA32 core1:**

   1. Open a new terminal under ``{SDK}/amebasmart_gcc_project/utils/jlink_script``.
   2. Type ``$/opt/SEGGER/JLink/JLinkGDBServer -device cortex-a32 -if SWD -scriptfile AP3_CA32_Core1.JLinkScript -port 2339``. This terminal should NOT be closed if you want to download software or enter GDB debugger mode.

   If the connection is successful, the log is shown as below.

   .. figure:: ../figures/smart_ca32_core1_jlink_gdb_server_connection_under_linux.png
      :scale: 85%
      :align: center

      CA32 core1 J-Link GDB server connection under Linux