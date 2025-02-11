.. tab:: RTL8730E

   KM4 Setup
   ******************
   1. Execute the :file:`cm4_jlink.bat`

      Double-click the :file:`cm4_jlink.bat` under ``{SDK}\amebasmart_gcc_project\utils\jlink_script``. You may have to change the path of :file:`JLinkGDBServer.exe` in the :file:`cm4_jlink.bat` script according to your own settings.

      The started J-Link GDB server looks like below. This window should NOT be closed if you want to download the image or enter debug mode.

      .. figure:: ../figures/km4_j_link_gdb_server_connection_under_windows.png
         :scale: 90%
         :align: center

         KM4 J-Link GDB server connection under Windows

      .. caution:: Keep this window active to download the images to target.

   2. Switch directory to project_hp for KM4

      Use ``$cd`` command to change the directory to project_hp, then you can input commands in section :ref:`command_lists` or :ref:`gdb_command_lists`.

   KM0 Setup
   ******************
   1. Execute the :file:`cm0_jlink.bat`

      Double-click the :file:`cm0_jlink.bat` under ``{SDK}\amebasmart_gcc_project\utils\jlink_script``, the same as executing the :file:`cm4_jlink.bat`.

      The started J-Link GDB server looks like below. This window should NOT be closed if you want to download the image or enter debug mode. Because KM4 will download all the images, you don't need to connect J-Link to KM0 when downloading images. J-Link can connect to KM0 when debugging.

      .. figure:: ../figures/km0_j_link_gdb_server_connection_under_windows.png
         :scale: 90%
         :align: center

         KM0 J-Link GDB server connection under Windows

   2. Switch directory to project_lp for KM0

      Use ``$cd`` command to change the directory to project_lp, then you can input command in section :ref:`command_lists` or :ref:`gdb_command_lists`.

   CA32 Setup
   ********************
   The CA32 has two cores named core0 and core1, which can be debugged separately. By default, :file:`ca32_jlink_core0.bat` is for core0 and :file:`ca32_jlink_core1.bat` is for core1.

   1. Double-click the :file:`ca32_jlink_core0.bat` under ``{SDK}\amebasmart_gcc_project\utils\jlink_script``.

      The started J-Link GDB server looks like below. CA32 core0 listens on port 2337 by default. This GDB Server window should NOT be closed if you want to enter debug mode.

      .. figure:: ../figures/ca32_core0_j_link_gdb_server_connection_under_windows.png
         :scale: 90%
         :align: center

         CA32 core0 J-Link GDB server connection under Windows

   2. Double click the :file:`ca32_jlink_core1.bat` under ``{SDK}\amebasmart_gcc_project\utils\jlink_script``.

      The started J-Link GDB server looks like below. CA32 core1 listens on port 2339 by default.

      .. figure:: ../figures/ca32_core1_j_link_gdb_server_connection_under_windows.png
         :scale: 90%
         :align: center

         CA32 core1 J-Link GDB server connection under Windows

   .. caution::
      - When opening core1 GDB server, core0 and core1 will halt and can't run together. Open this window only when you want to debug two cores together, and you know what you are doing.
      - To debug core0 and core1 separately, make sure that function :func:`EnabelCrossTrigger()` is commented out as below.

      .. code-block:: c

         void InitTarget(void) {
            Report("******************************************************");
            Report("J-Link script: AmebaSmart (Cortex-A32 CPU0) J-Link script");
            Report("******************************************************");
            …
            //EnabelCrossTrigger();  // comment out if needed
         }
