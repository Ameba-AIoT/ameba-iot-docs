.. _gcc_makefile:

Makefile Architecture
------------------------------------------
The following figures summary the makefile architectures of each project.

- KM4 makefile architecture:

  ::

    project_km4\Makefile-->
       project_km4\asdk\Makefile-->
          project_km4\asdk\make\Makefile-->
            project_km4\asdk\make\application\Makefile
            project_km4\vsdk\make\at_cmd\Makefile
            project_km4\asdk\make\audio\Makefile
            project_km4\asdk\make\bluetooth\Makefile
            project_km4\asdk\make\bootloader\Makefile
            project_km4\asdk\make\cmsis\Makefile
            project_km4\asdk\make\cmsis-dsp\Makefile
            project_km4\asdk\make\example\Makefile
            project_km4\asdk\make\file_system\Makefile
            project_km4\asdk\make\flashloader\Makefile
            project_km4\asdk\make\libnosys\Makefile
            project_km4\asdk\make\mbedtls\Makefile
            project_km4\asdk\make\media\Makefile
            project_km4\asdk\make\network\Makefile
            project_km4\asdk\make\os\Makefile
            project_km4\asdk\make\project\Makefile
              project_km4\asdk\make\project\sram\Makefile: how to build code into RAM
              project_km4\asdk\make\project\xip\Makefile: how to build code into Flash
              project_km4\asdk\make\project\library\Makefile: how to build library
            project_km4\asdk\make\RT_xmodem\Makefile
            project_km4\asdk\make\target\Makefile
            project_km4\asdk\make\ui\Makefile
            project_km4\asdk\make\utilities\Makefile
            project_km4\asdk\make\utilities_example\Makefile
            project_km4\asdk\make\utils\Makefile
            project_km4\asdk\make\wpan\Makefile

- KR4 makefile architecture:

  ::

    project_kr4\Makefile-->
        project_kr4\vsdk\Makefile-->
          project_kr4\vsdk\make\Makefile-->
            project_kr4\vsdk\make\applicaiton\Makefile
            project_kr4\vsdk\make\at_cmd\Makefile
            project_kr4\vsdk\make\audio\Makefile
            project_kr4\vsdk\make\bluetooth\Makefile
            project_kr4\vsdk\make\bootloader\Makefile
            project_kr4\vsdk\make\cmsis\Makefile
            project_kr4\vsdk\make\file_system\Makefile
            project_kr4\vsdk\make\libnosys\Makefile
            project_kr4\vsdk\make\mbedtls\Makefile
            project_kr4\vsdk\make\network\Makefile
            project_kr4\vsdk\make\os\Makefile
            project_kr4\vsdk\make\project\Makefile
            project_kr4\vsdk\make\target\Makefile
            project_kr4\vsdk\make\utilities\Makefile
            project_kr4\vsdk\make\utilities_example\Makefile
            project_kr4\vsdk\make\utils\Makefile

How to Build Library
----------------------------------------
The makefile in ``{SDK}\amebalite_gcc_project\project_km4\asdk\make\project\library`` is an example to show how to build user library. As shown below, ``lib_user.a`` will be generated in \ ``{SDK}\amebalite_gcc_project\project_km4\asdk\lib\application``\ .

.. figure:: ../figures/build_lib.png
   :scale: 90%
   :align: center

How to Add Library
------------------------------------
Open the file ``{SDK}\amebalite_gcc_project\project_km4\asdk\Makefile``, and add ``lib_user.a`` into ``LINK_APP_LIB``.

.. code-block::

   LINK_APP_LIB += $(ROOTDIR)/lib/application/lib_user.a
