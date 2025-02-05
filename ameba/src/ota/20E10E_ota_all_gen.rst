.. tab:: RTL8720E

   The OTA image will be generated automatically when building the project.

      1. :file:`kr4_km4_app.bin` is included in :file:`ota_all.bin` by default.
      2. If the bootloader is needed to be upgraded,

         a. Navigate to project and open configuration menu.

         b. Select :menuselection:`CONFIG OTA OPTION > Upgrade Bootloader`, then save and exit.

         c. Modify the bootloader related configurations as described in :ref:`Modifying Configurations <ota_modifying_configurations>`.
      3. If ota image compression is needed, follow the steps in :ref:`OTA Compressed Image <ota_compressed_image>`.

      4. Rebuild the project. The OTA image file :file:`ota_all.bin` will be generated in ``{SDK}\amebalite_gcc_project``.
