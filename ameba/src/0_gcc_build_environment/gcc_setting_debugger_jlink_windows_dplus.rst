.. tab:: RTL8721Dx

   KM4 Setup
   ******************
   1. Execute the ``cm4_jlink.bat``

      Double-click the ``cm4_jlink.bat`` under ``{SDK}\amebadplus_gcc_project\utils\jlink_script``. You may have to change the path of JLinkGDBServer.exe and JLink.exe in the ``cm4_jlink.bat`` script according to your own settings.

      The started J-Link GDB server looks like below. This window should NOT be closed if you want to download the image or enter debug mode.

      .. figure:: figures/dplus_windows_km4_jlink_gdb_server_connection.png
         :scale: 90%
         :align: center

         KM4 J-Link GDB server connection under Windows

      .. note::
         Keep this window active to download the images to target.

   2. Setup J-Link for KM4

      a. Change the working directory to project_km4.
      b. On the MSYS2 terminal, type ``$make setup GDB_SERVER=jlink`` command before selecting J-Link debugger.

         .. figure:: figures/dplus_windows_km4_jlink_setup.png
            :scale: 90%
            :align: center

            KM4 J-Link setup under Windows

   KM0 Setup
   ******************
   1. Execute the ``cm0_jlink.bat``

      Double-click the ``cm0_jlink.bat`` under ``{SDK}\amebadplus_gcc_project\utils\jlink_script``, the same as executing the ``cm4_jlink.bat``.

      The started J-Link GDB server looks like below. This window should NOT be closed if you want to download the image or enter debug mode. Because KM4 will download all the images, you don't need to connect J-Link to KM0 when downloading images. J-Link can connect to KM0 when debugging.

      .. figure:: figures/dplus_windows_km0_jlink_gdb_server_connection.png
         :scale: 90%
         :align: center

         KM0 J-Link GDB server connection under Windows

   2. Setup J-Link for KM0

      a. Change working directory to project_km0.
      b. On the Cygwin terminal, type ``$make setup GDB_SERVER=jlink`` command to select J-Link debugger.

      .. figure:: figures/dplus_windows_km0_jlink_setup.png
         :scale: 90%
         :align: center

         KM0 J-Link setup under Windows