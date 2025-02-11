.. tab:: RTL8726EA/RTL8720EA

   In order to improve the efficiency of building SDK, you can also execute ``$make all`` command once under ``{SDK}\amebalite_gcc_project``, instead of executing ``$make all`` command separately under the KR4 project and KM4 project.

   - If the terminal contains ``target_img2.axf`` and ``Image manipulating end`` message (see :ref:`lite_km4_kr4_projects_make_all`), it means that all the images have been built successfully. The images are generated under ``amebalite_gcc_project`` , as shown in :ref:`lite_km4_kr4_image_generation`. You can also find them under ``amebalite_gcc_project\project_kr4\vsdk\image`` and ``amebalite_gcc_project\project_km4\asdk\image``.

   - If somehow failed, type ``$make clean`` to clean and then redo the make procedure.

   .. figure:: ../figures/lite_km4_kr4_projects_make_all.png
      :scale: 75%
      :align: center
      :name: lite_km4_kr4_projects_make_all

      KM4 & KR4 projects make all

   .. figure:: ../figures/lite_km4_kr4_image_generation.png
      :scale: 90%
      :align: center
      :name: lite_km4_kr4_image_generation

      KM4 & KR4 image generation

   .. note::
      If you want to search some ``.map`` files for debugging, get them under the directory ``amebalite_gcc_project\project_kr4\vsdk\image`` or ``amebalite_gcc_project\project_km4\asdk\image``, but not ``amebalite_gcc_project``.