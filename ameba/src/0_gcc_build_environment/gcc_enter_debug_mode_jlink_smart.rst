.. tab:: RTL8730E

   - For KM4:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-M33 -if SWD -speed 4000 -autoconnect 1 -JLinkScriptFile {script_path}\AP1_KM4.JLinkScript

   - For KM0:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-M23 -if SWD -speed 4000 -autoconnect 1 -JLinkScriptFile {script_path}\AP0_KM0.JLinkScript

   - For CA32 core0:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-A32 -if SWD -speed 4000 -autoconnect 1 -JLinkScriptFile {script_path}\AP3_CA32_Core0.JLinkScript

   - For CA32 core1:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-A32 -if SWD -speed 4000 -autoconnect 1 -JLinkScriptFile {script_path}\AP3_CA32_Core1.JlinkScript

   .. note::

      The J-Link connection command path mentioned above are:

      - `{Jlink_path}`: the path your Segger J-Link installed, default is ``C:\Program Files (x86)\SEGGER\JLink``.
      - `{script_path}`: ``{SDK}\amebasmart_gcc_project\utils\jlink_script``.
