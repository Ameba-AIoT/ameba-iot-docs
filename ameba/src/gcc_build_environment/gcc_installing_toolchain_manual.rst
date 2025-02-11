Windows
^^^^^^^^
This section introduces the steps to prepare the toolchain environment manually.

1. Acquire the zip files of the toolchain from Realtek.
2. Create a new directory ``rtk-toolchain`` under the path ``{MSYS2_path}\opt``.

   For example, if your MSYS2 installation path is as set in Section :ref:`windows_gcc_environment` **Step 3**, the ``rtk-toolchain`` should be in ``C:\msys64\opt``.

   .. figure:: figures/windows_rtk_toolchain_1.png
      :scale: 100%
      :align: center

3. Unzip ``asdk-10.3.x-mingw32-newlib-build-xxxx.zip`` and place the toolchain folder ``asdk-10.3.x`` to the folder ``rtk-toolchain`` created in **Step 2**.

   .. figure:: figures/windows_rtk_toolchain_2.png
      :scale: 90%
      :align: center

.. note::
   The unzip folders should stay the same with the figure above and do NOT change them, otherwise you need to modify the toolchain directory in makefile to customize the path.

Linux
^^^^^^^^
This section introduces the steps to prepare the toolchain environment manually.

1. Acquire the zip files of the toolchain from Realtek.

2. Create a new directory ``rtk-toolchain`` under the path ``/opt``.

   .. figure:: figures/linux_rtk_toolchain_1.png
      :scale: 80%
      :align: center

3. Unzip ``asdk-10.3.x-linux-newlib-build-xxxx.tar.bz2`` to ``/opt/rtk-toolchain`` , then you can get the directory below:

   .. figure:: figures/linux_rtk_toolchain_2.png
      :scale: 75%
      :align: center

.. note::
   The unzip folders should stay the same with the figure above and do NOT change them, otherwise you need to modify the toolchain directory in makefile to customize the path.