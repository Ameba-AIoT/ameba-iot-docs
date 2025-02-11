.. tab:: RTL8721Dx

   Follow these steps to build the SDK of KM4 and KM0 projects one by one:

   1. Use ``$cd`` command to switch to the project directories of SDK on Windows or Linux.

      For example, you can type ``$cd {SDK}\amebadplus_gcc_project\project_km4`` to switch to the KM4 project, the same operation for the KM0 project.

   2. Build SDK under the KM0 or KM4 project directory on Windows or Linux.

      - For normal image, simply use ``$make all`` command to build SDK.
      - For MP image, refer to Section :ref:`how_to_build_mp_image` to build SDK.

   3. Check the command execution results. If somehow failed, type ``$make clean`` to clean and then redo the make procedure.

      - For KM4 project, if the terminal contains ``target_img2.axf`` and ``Image manipulating end`` message (see :ref:`dplus_km4_project_make_all`), it means that KM4 images have been built successfully. You can find them under ``\amebadplus_gcc_project\project_km4\asdk\image`` (see :ref:`dplus_km4_image_generation`).

        .. figure:: figures/dplus_km4_project_make_all.png
           :scale: 75%
           :align: center
           :name: dplus_km4_project_make_all

           KM4 project make all

        .. figure:: figures/dplus_km4_image_generation.png
           :scale: 90%
           :align: center
           :name: dplus_km4_image_generation

           KM4 image generation

      - For KM0 project, if the terminal contains ``target_img2.axf`` and ``Image manipulating end`` message (see :ref:`dplus_km0_project_make_all`), it means that KM0 image has been built successfully. You can find it under ``\amebadplus_gcc_project\project_km0\asdk\image`` (see :ref:`dplus_km0_image_generation`).

        .. figure:: figures/dplus_km0_project_make_all.png
           :scale: 75%
           :align: center
           :name: dplus_km0_project_make_all

           KM0 project make all

        .. figure:: figures/dplus_km0_image_generation.png
           :scale: 75%
           :align: center
           :name: dplus_km0_image_generation

           KM0 image generation