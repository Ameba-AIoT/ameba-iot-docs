.. tab:: RTL8721Dx

   - For KM4:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-M33 -if SWD -speed 4000 -autoconnect 1

   - For KM0:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-M23 -if SWD -speed 4000 -autoconnect 1

   .. note::

      ``{Jlink_path}`` is the path your Segger J-Link installed, default is ``C:\Program Files (x86)\SEGGER\JLink``.