.. tab:: RTL8730E

In order to improve the efficiency of building SDK, you can also execute ``$make all`` command once under ``{SDK}\amebasmart_gcc_project``, instead of executing ``$make all`` command separately under each project.

- If the terminal contains ``target_img2.axf`` and ``Image manipulating end`` messages (see :ref:`smart_km4_km0_ca32_make_all`), it means that the images have been built successfully. The images are generated in ``{SDK}\amebasmart_gcc_project``, as shown in :ref:`smart_km4_km0_ca32_image_generation`. You can also find other generated images under ``\project_hp\asdk\image``, ``\project_lp\asdk\image``, and ``\project_ap\asdk\image``.
- If somehow failed, type ``$make clean`` to clean and then redo the make procedure.

.. figure:: ../figures/smart_km4_km0_ca32_make_all.png
   :scale: 75%
   :align: center
   :name: smart_km4_km0_ca32_make_all

   All projects make all

.. figure:: ../figures/smart_km4_km0_ca32_image_generation.png
   :scale: 90%
   :align: center
   :name: smart_km4_km0_ca32_image_generation

   KM4 & KM0 & CA32 image generation

.. note::
   If you want to search some ``.map`` files for debug, get them under ``\project_hp\asdk\image``, ``\project_lp\asdk\image``, or ``\project_ap\asdk\image``.