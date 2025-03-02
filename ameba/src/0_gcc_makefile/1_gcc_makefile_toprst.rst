.. _gcc_makefile:

Makefile Architecture
------------------------------------------
The following figures summary the makefile architectures of each project.

.. tabs::

   .. include:: gcc_makefile_arch_dplus.rst
   .. include:: gcc_makefile_arch_lite.rst
   .. include:: gcc_makefile_arch_smart.rst

How to Build Library
----------------------------------------
.. tabs::

   .. include:: gcc_makefile_build_lib_dplus.rst
   .. include:: gcc_makefile_build_lib_lite.rst
   .. include:: gcc_makefile_build_lib_smart.rst

.. figure:: figures/build_lib.png
   :scale: 90%
   :align: center

How to Add Library
------------------------------------
.. tabs::

   .. include:: gcc_makefile_add_lib_dplus.rst
   .. include:: gcc_makefile_add_lib_lite.rst
   .. include:: gcc_makefile_add_lib_smart.rst

.. code-block::

   LINK_APP_LIB += $(ROOTDIR)/lib/application/lib_user.a


