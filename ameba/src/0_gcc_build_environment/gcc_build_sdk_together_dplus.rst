.. tab:: RTL8721Dx

   In order to improve the efficiency of building SDK, you can also execute ``$make all`` command once under ``\amebadplus_gcc_project``, instead of executing ``$make all`` command separately under the KM0 project and KM4 project.

   - If the terminal contains ``target_img2.axf`` and ``Image manipulating end`` message (see :ref:`dplus_km4_km0_projects_make_all`), it means that all the images have been built successfully. The image files are generated under ``\amebadplus_gcc_project`` (see :ref:`dplus_km4_km0_image_generation`). You can also find them under ``\amebadplus_gcc_project\project_km0\asdk\image`` and ``\amebadplus_gcc_project\project_km4\asdk\image``.

   - If somehow failed, type ``$make clean`` to clean and then redo the make procedure.

   .. figure:: figures/dplus_km4_km0_projects_make_all.png
      :scale: 75%
      :align: center
      :name: dplus_km4_km0_projects_make_all

      KM4 & KM0 projects make all

   .. figure:: figures/dplus_km4_km0_image_generation.png
      :scale: 90%
      :align: center
      :name: dplus_km4_km0_image_generation

      KM4 & KM0 image generation

   .. note::
      If you want to search some .map files for debugging, get them under the directory ``\amebadplus_gcc_project\project_km0\asdk\image`` or ``\amebadplus_gcc_project\project_km4\asdk\image``, but not ``\amebadplus_gcc_project``.