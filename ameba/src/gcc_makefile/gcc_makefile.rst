.. _gcc_makefile:

Makefile Architecture
------------------------------------------
The following figures summary the makefile architectures of each project.

.. tabs::

   .. include:: gcc_makefile_arch_21Dx.rst
   .. include:: gcc_makefile_arch_20EA10EC.rst
   .. include:: gcc_makefile_arch_26EA13EC.rst
   .. include:: gcc_makefile_arch_30E.rst

How to Build Library
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

How to Add Library
------------------------------------
.. tabs::

   .. tab:: RTL8721Dx

      Open the file ``{SDK}\amebadplus_gcc_project\project_km4\asdk\Makefile``, and append ``lib_user.a`` to ``LINK_APP_LIB``.

   .. tab:: RTL8726EA/RTL8720EA

      Open the file ``{SDK}\amebalite_gcc_project\project_km4\asdk\Makefile``, and append ``lib_user.a`` into ``LINK_APP_LIB``.

   .. tab:: RTL8730E

      Open the file ``{SDK}\amebasmart_gcc_project\project_hp\asdk\Makefile``, and append ``lib_user.a`` into ``LINK_APP_LIB``.

.. code-block::

   LINK_APP_LIB += $(ROOTDIR)/lib/application/lib_user.a


