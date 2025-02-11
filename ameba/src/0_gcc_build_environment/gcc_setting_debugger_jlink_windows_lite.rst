.. tab:: RTL8726EA/RTL8720EA

   KM4 Setup
   ******************
   1. Execute the :file:`km4_jlink_combination.bat`

      Double-click the :file:`km4_jlink_combination.bat` under ``{SDK}\amebalite_gcc_project\utils\jlink_script``.
      You may have to change the path of :file:`JLinkGDBServer.exe` and :file:`JLink.exe` in the ``km4_jlink_combination.bat`` script according to your own settings.

      The started J-Link GDB server looks like below. This window should NOT be closed if you want to download the image or enter debug mode.

      .. figure:: ../figures/windows_km4_jlink_gdb_server_connection.png
         :scale: 90%
         :align: center

         KM4 J-Link GDB server connection under Windows

      .. caution:: Keep this window active to download the images to target.

   2. Setup J-Link for KM4

      a. Change the working directory to project_km4.
      b. On the MSYS2 terminal, type ``$make setup GDB_SERVER=jlink`` command before selecting J-Link debugger.

         .. figure:: ../figures/windows_km4_jlink_setup.png
            :scale: 90%
            :align: center

            KM4 J-Link setup under Windows

   KR4 Setup
   ******************
   1. Execute the :file:`kr4_jlink_combination.bat`

      Double-click the :file:`kr4_jlink_combination.bat` under ``{SDK}\amebalite_gcc_project\utils\jlink_script``, the same as executing the :file:`km4_jlink_combination.bat`.

      The started J-Link GDB server looks like below. This window should NOT be closed if you want to download the image or enter debug mode.
      Because KM4 will download all the images, you don't need to connect J-Link to KR4 when downloading images. J-Link can connect to KR4 when debugging.

      .. figure:: ../figures/windows_kr4_jlink_gdb_server_connection.png
         :scale: 90%
         :align: center

         KR4 J-Link GDB server connection under Windows

   2. Setup J-Link for KR4

      a. Change working directory to project_kr4.
      b. On the Cygwin terminal, type ``$make setup GDB_SERVER=jlink`` command to select J-Link debugger.

      .. figure:: ../figures/windows_kr4_jlink_setup.png
         :scale: 90%
         :align: center

         KR4 J-Link setup under Windows
