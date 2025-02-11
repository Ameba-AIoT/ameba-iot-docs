By default, the toolchain will be automatically installed in ``/opt/rtk-toolchain`` when building the project at the first time.

1. During the compilation, we will check if the toolchain exists and if the version of the toolchain match the lastest version. Once error occurs, you should fix the error according to the prompts on the screen and try again with ``make``.

.. _make_toolchain:

2. The toolchain will be downloaded from GitHub when building the project at the first time. If the download speed from GitHub is too slow or download failed, execute the command ``make toolchain URL=aliyun`` or ``make toolchain URL=github`` first to get the toolchain before building the project. We recommend use ``make toolchain URL=aliyun`` to download the toolchain from aliyun to improve the download speed.

.. _change_installation_dir:

3. The default installation path of the toolchain is ``/opt/rtk-toolchain``. If you want to change it, modify ``TOOLCHAINDIR`` defined in ``Makefile.include.gen`` which is located both in ``project_km0`` and ``project_km4``.

.. note::

   - If an error ``Create Toolchain Dir Failed. May Not Have Permission`` appears, please create the installation directory by manual. If still fails, refer to :ref:`3 <change_installation_dir>` above to change the installtion path.
   - If an error ``Download Failed`` appears, please check if the network connection is accessible first. If still fails, refer to :ref:`2 <make_toolchain>` above to intall the toolchain again.
   - If an error ``Current Toolchain Version Mismatched`` appears, please delete the current toochain and retry with ``make``, and the latest toolchain will be installed automatically during building the project.

If the installation still fails, try with the manual installation steps below.