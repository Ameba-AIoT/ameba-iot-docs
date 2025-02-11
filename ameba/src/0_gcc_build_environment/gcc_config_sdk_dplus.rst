.. tab:: RTL8721Dx

   User can configure SDK options for KM0 and KM4 at the same time through ``$make menuconfig`` command.

   1. Switch to the directory ``{SDK}\amebadplus_gcc_project``
   2. Run ``$make menuconfig`` command on MSYS2 MinGW 64-bit (Windows) or terminal (Linux)

   .. note::
      The command ``$make menuconfig`` is only supported under ``{SDK}\amebadplus_gcc_project``, but not supported under other paths.

   The main configurable options are divided into four parts:

   - ``General Config``: the shared kernel configurations for KM4 and KM0. The configurations will take effect in both KM4 and KM0.
   - ``Network Config``: the shared kernel configurations for KM4 and KM0. The configurations will take effect in both KM4 and KM0.
   - ``KM4 Config``: the exclusive kernel configurations for KM4. The configurations will take effect only in KM4 but not in KM0.
   - ``KM0 Config``: the exclusive kernel configurations for KM0. The configurations will take effect only in KM0 but not in KM4.

   The following figure is the menuconfig UI, and the options in red may be used frequently.

   .. figure:: figures/menuconfig_ui_dplus.svg
      :scale: 130%
      :align: center
      :name: menuconfig_ui

      menuconfig UI
