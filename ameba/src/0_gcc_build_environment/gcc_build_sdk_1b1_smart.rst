.. tab:: RTL8730E

Follow the steps below to build the SDK of all the projects one by one:

1. Use ``$cd`` command to switch to the project directories of SDK.

   - On Windows, open MSYS2 MinGW 64-bit terminal and use ``$cd`` command.
   - On Linux, open its own terminal and use ``$cd`` command.

   For example, you can type ``$cd {SDK}\amebasmart_gcc_project\project_hp`` to switch to the KM4 project directory, the same operation for other projects.

2. Build SDK under the project directory on Windows or Linux.

   - For normal image, simply use ``$make all`` command to build SDK.
   - For MP image, refer to Section :ref:`how_to_build_mp_image` to build SDK.

3. Check the command execution results. If somehow failed, type ``$make clean`` to clean and then redo the make procedure.

   - For KM4 project, if the terminal contains ``target_img2.axf`` and ``Image manipulating end`` messages, it means that the images have been built successfully. You can find them under ``{SDK}\amebasmart_gcc_project\project_hp\asdk\image``, as shown in :ref:`smart_km4_project_make_all` and :ref:`smart_km4_image_generation`.

     .. figure:: ../figures/smart_km4_project_make_all.png
        :scale: 90%
        :align: center
        :name: smart_km4_project_make_all

        KM4 project make all

     .. figure:: ../figures/smart_km4_image_generation.png
        :scale: 90%
        :align: center
        :name: smart_km4_image_generation

        KM4 image generation

   - For KM0 project, if the terminal contains ``target_img2.axf`` and ``Image manipulating end`` messages, it means that the images have been built successfully. You can find them under ``{SDK}\amebasmart_gcc_project\project_lp\asdk\image``, as shown in :ref:`smart_km0_project_make_all` and :ref:`smart_km0_image_generation`.

     .. figure:: ../figures/smart_km0_project_make_all.png
        :scale: 90%
        :align: center
        :name: smart_km0_project_make_all

        KM0 project make all

     .. figure:: ../figures/smart_km0_image_generation.png
        :scale: 90%
        :align: center
        :name: smart_km0_image_generation

        KM0 image generation

   - For CA32 project, if the terminal contains ``fip.bin`` and ``Image manipulating end`` messages, it means that the images have been built successfully. You can find them under ``{SDK}\amebasmart_gcc_project\project_ap\asdk\image``, as shown in :ref:`smart_ca32_project_make_all` and :ref:`smart_ca32_image_generation`.

     .. figure:: ../figures/smart_ca32_project_make_all.png
        :scale: 90%
        :align: center
        :name: smart_ca32_project_make_all

        CA32 project make all

     .. figure:: ../figures/smart_ca32_image_generation.png
        :scale: 90%
        :align: center
        :name: smart_ca32_image_generation

        CA32 image generation