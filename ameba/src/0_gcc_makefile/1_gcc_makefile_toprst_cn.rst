.. _gcc_makefile:

Makefile 架构
------------------------------------------
下文详细列出了各个项目的makefile架构。

.. tabs::

   .. include:: gcc_makefile_arch_dplus.rst
   .. include:: gcc_makefile_arch_lite.rst
   .. include:: gcc_makefile_arch_smart.rst


如何编译库
----------------------------------------
.. tabs::

   .. include:: gcc_makefile_build_lib_dplus.rst
   .. include:: gcc_makefile_build_lib_lite.rst
   .. include:: gcc_makefile_build_lib_smart.rst

.. figure:: figures/build_lib.png
   :scale: 90%
   :align: center

如何添加库
--------------
.. tabs::

   .. include:: gcc_makefile_add_lib_dplus.rst
   .. include:: gcc_makefile_add_lib_lite.rst
   .. include:: gcc_makefile_add_lib_smart.rst

.. code-block::

   LINK_APP_LIB += $(ROOTDIR)/lib/application/lib_user.a


