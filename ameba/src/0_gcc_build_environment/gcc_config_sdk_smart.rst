.. tab:: RTL8730E

   Users can configure SDK options for KM0/KM4/CA32 at the same time through ``$make menuconfig`` command.

   1. Switch to the directory ``{SDK}\amebasmart_gcc_project``.
   2. Run ``$make menuconfig`` command on MSYS2 MinGW 64-bit (Windows) or terminal (Linux)

   .. note::
      ``$make menuconfig`` command is only supported under ``{SDK}\amebasmart_gcc_project``, but not supported under other paths.

   The main configurable options are divided into five parts:

   - ``General Config``: the shared kernel configurations for KM0/KM4/CA32. The configurations will take effect in all CPUs.
   - ``Network Config``: the incompatible kernel configurations for KM4 and CA32. Take Wi-Fi as an example, it can be set to INIC mode (KM4 is NP and CA32 is AP) and single core mode (KM4 is both NP and AP). The configurations will take effect in KM4 and CA32.
   - ``KM0 Config``: the configurations will take effect only in KM0.
   - ``KM4 Config``: the configurations will take effect only in KM4.
   - ``CA32 Config``: the configurations will take effect only in CA32.

   The following figure is the menuconfig UI, and the options in red may be used frequently.

   .. figure:: ../figures/menuconfig_ui_lite.svg
      :scale: 120%
      :align: center

      menuconfig UI
