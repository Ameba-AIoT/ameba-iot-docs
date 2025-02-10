.. _gcc_makefile:

Makefile 架构
------------------------------------------
下文详细列出了各个项目的makefile架构。

.. tabs::

   .. include:: gcc_makefile_arch_21Dx.rst
   .. include:: gcc_makefile_arch_20EA10EC.rst
   .. include:: gcc_makefile_arch_26EA13EC.rst
   .. include:: gcc_makefile_arch_30E.rst


如何编译库
----------------------------------------
.. tabs::

   .. tab:: RTL8721Dx

      The Makefile in ``{SDK}\amebadplus_gcc_project\project_km4\asdk\make\project\library`` is an example to show how to build user library. As shown below, ``lib_user.a`` will be generated in ``{SDK}\amebadplus_gcc_project\project_km4\asdk\lib\application``.

   .. tab:: RTL8726EA/RTL8720EA

      The makefile in ``{SDK}\amebalite_gcc_project\project_km4\asdk\make\project\library`` is an example to show how to build user library. As shown below, ``lib_user.a`` will be generated in ``{SDK}\amebalite_gcc_project\project_km4\asdk\lib\application``.

   .. tab:: RTL8730E

      The Makefile in path ``{SDK}\amebasmart_gcc_project\project_hp\asdk\make\project\library`` is an example to show how to build user library. As shown below, ``lib_user.a`` will be generated in ``{SDK}\amebasmart_gcc_project\project_hp\asdk\lib\application``.

.. figure:: figures/build_lib.png
   :scale: 90%
   :align: center

如何添加库
--------------
.. tabs::

   .. tab:: RTL8721Dx

      打开文件 ``{SDK}\amebadplus_gcc_project\project_km4\asdk\Makefile``，将 ``lib_user.a`` 添加至 ``LINK_APP_LIB`` 即可。

   .. tab:: RTL8726EA/RTL8720EA

      打开文件 ``{SDK}\amebalite_gcc_project\project_km4\asdk\Makefile``，将 ``lib_user.a`` 添加至 ``LINK_APP_LIB`` 即可。

   .. tab:: RTL8730E

      打开文件 ``{SDK}\amebasmart_gcc_project\project_hp\asdk\Makefile``，将 ``lib_user.a`` 添加至 ``LINK_APP_LIB`` 即可。

.. code-block::

   LINK_APP_LIB += $(ROOTDIR)/lib/application/lib_user.a


