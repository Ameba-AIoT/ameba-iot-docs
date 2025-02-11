.. tab:: RTL8726EA/RTL8720EA

   User can configure SDK options for KR4 and KM4 at the same time by ``$make menuconfig`` command.

   1. Switch to the directory ``{SDK}\amebalite_gcc_project``.
   2. Run ``$make menuconfig`` command on MSYS2 MinGW 64-bit (Windows) or terminal (Linux).

   .. note::
      ``$make menuconfig`` command is only supported under ``{SDK}\amebalite_gcc_project``, but not supported under other paths.

   The main configurable options are divided into four parts:

   - ``General Config``: the shared kernel configurations for KM4 and KR4. The configurations will take effect in both KM4 and KR4.
   - ``Network Config``: the incompatible kernel configurations for KM4 and KR4. Take Wi-Fi processor role as an example, KR4 is AP when KM4 is NP, while KM4 is AP when KR4 is NP. The configurations will take effect in both KM4 and KR4.
   - ``KM4 Config``: the exclusive kernel configurations for KM4. The configurations will take effect only in KM4 but not in KR4.
   - ``KR4 Config``: the exclusive kernel configurations for KR4. The configurations will take effect only in KR4 but not in KM4.

   The following figure is the menuconfig UI, and the options in red may be used frequently.

   .. figure:: ../figures/menuconfig_ui_lite.svg
      :scale: 130%
      :align: center
      :name: menuconfig_ui

      menuconfig UI
