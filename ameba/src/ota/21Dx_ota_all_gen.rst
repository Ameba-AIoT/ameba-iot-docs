.. tab:: RTL8721Dx

   The OTA image will be generated automatically when building the project.

   1. The :file:`km0_km4_app.bin` is included in :file:`ota_all.bin` by default.

   2. If the bootloader is needed to be upgraded,

      a. Navigate to project and open configuration menu.

      b. Select :menuselection:`CONFIG OTA OPTION > Upgrade Bootloader`, save and exit.

      c. Modify the bootloader related configurations as described in Section :ref:`ota_modifying_configurations`.

   3. If ota image compression is needed, follow the steps in :ref:`OTA Compressed Image <ota_compressed_image>`.

   4. Rebuild the project. The OTA image file called :file:`ota_all.bin` will be generated under ``{SDK}\amebadplus_gcc_project``.