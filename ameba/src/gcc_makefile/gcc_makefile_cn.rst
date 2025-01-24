.. _gcc_makefile:

Makefile 架构
------------------------------------------
下文详细列出了各个项目的makefile架构。

- KM4 makefile 架构：

  ::

     project_km4\Makefile-->
        project_km4\asdk\Makefile-->
          project_km4\asdk\make\Makefile-->
            project_km4\asdk\make\api\Makefile
            project_km4\asdk\make\application\Makefile
            project_km4\asdk\make\at_cmd\Makefile
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
            project_km4\asdk\make\rtk_coex\Makefile
            project_km4\asdk\make\target\Makefile
            project_km4\asdk\make\ui\Makefile
            project_km4\asdk\make\usb_otg\Makefile
            project_km4\asdk\make\utilities\Makefile
            project_km4\asdk\make\utilities_example\Makefile
            project_km4\asdk\make\utils\Makefile
            project_km4\asdk\make\wpan\Makefile
            project_km4\asdk\make\wps\Makefile

- KM0 makefile 架构：

  ::

     project_km0\Makefile-->
        project_km0\asdk\Makefile-->
          project_km0\asdk\make\Makefile-->
            project_km0\asdk\make\api\Makefile
            project_km0\asdk\make\at_cmd\Makefile
            project_km0\asdk\make\bootloader\Makefile
            project_km0\asdk\make\cmsis\Makefile
            project_km0\asdk\make\os\Makefile
            project_km0\asdk\make\project\Makefile
            project_km0\asdk\make\rtk_coex\Makefile
            project_km0\asdk\make\target\Makefile
            project_km0\asdk\make\utils\Makefile


如何编译库
----------------------------------------
The Makefile in ``{SDK}\amebadplus_gcc_project\project_km4\asdk\make\project\library`` is an example to show how to build user library. As shown below, ``lib_user.a`` will be generated in ``{SDK}\amebadplus_gcc_project\project_km4\asdk\lib\application``.

.. figure:: ../figures/build_lib.png
   :scale: 90%
   :align: center

如何添加库
------------------------------------
打开文件 ``{SDK}\amebadplus_gcc_project\project_km4\asdk\Makefile``，将 ``lib_user.a`` 添加至 ``LINK_APP_LIB``即可。

.. code-block::

   LINK_APP_LIB += $(ROOTDIR)/lib/application/lib_user.a


