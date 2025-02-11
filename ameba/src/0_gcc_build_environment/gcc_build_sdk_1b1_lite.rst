.. tab:: RTL8726EA/RTL8720EA

   Follow these steps to build the SDK of KM4 and KR4 projects one by one:

   1. Use ``$cd`` command to switch to the project directories of SDK.

      - On Windows, open MSYS2 MinGW 64-bit terminal and use ``$cd`` command.
      - On Linux, open its own terminal and use ``$cd`` command.

      For example, you can type ``$cd {SDK}\amebalite_gcc_project\project_km4`` to switch to the KM4 project, the same operation for KR4 project.

   2. Build SDK under the KM4 or KR4 project directory on Windows or Linux.

      - For normal image, simply use ``$make all`` command to build SDK.
      - For MP image, refer to Section :ref:`how_to_build_mp_image` to build SDK.

   3. Check the command execution results. If somehow failed, type ``$make clean`` to clean and then redo the make procedure.

      - For KM4 project, if the terminal contains ``target_img2.axf`` and ``Image manipulating end`` messages (see :ref:`lite_km4_project_make_all`), it means that KM4 images have been built successfully. You can find them under ``amebalite_gcc_project\project_km4\asdk\image`` , as shown in :ref:`lite_km4_image_generation`.

        .. figure:: ../figures/lite_km4_project_make_all.png
           :scale: 75%
           :align: center
           :name: lite_km4_project_make_all

           KM4 project make all

        .. figure:: ../figures/lite_km4_image_generation.png
           :scale: 95%
           :align: center
           :name: lite_km4_image_generation

           KM4 image generation

      - For KR4 project, if the terminal contains ``kr4_image2_all.bin`` and ``Image manipulating end`` messages (see :ref:`lite_kr4_project_make_all`), it means that KR4 images have been built successfully. You can find them under ``amebalite_gcc_project\project_kr4\vsdk\image`` , as shown in :ref:`lite_kr4_image_generation`.

        .. figure:: ../figures/lite_kr4_project_make_all.png
           :scale: 75%
           :align: center
           :name: lite_kr4_project_make_all

           KR4 project make all

        .. figure:: ../figures/lite_kr4_image_generation.png
           :scale: 90%
           :align: center
           :name: lite_kr4_image_generation

           KR4 image generation