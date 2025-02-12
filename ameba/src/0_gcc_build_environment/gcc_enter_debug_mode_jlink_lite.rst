.. tab:: RTL8726EA/RTL8720EA

   - For KM4:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-M33 -if SWD -speed 4000 -autoconnect 1

   - For KR4:

      First:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-M33 -if SWD -speed 4000 -autoconnect 1 -JLinkScriptFile {script_path}\KM4_SEL.JLinkScript

      Then:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device RV32 -if cjtag -speed 4000 -JTAGConf -1,-1 -autoconnect 1

   - From KR4 to KM4:

      First:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device RV32 -if cjtag -speed 4000 -JTAGConf -1,-1 -JLinkScriptFile {script_path}\KR4_DMI.JLinkScript

      Then:

      .. code-block::

         "{Jlink_path}\JLink.exe" -device Cortex-M33 -if SWD -speed 4000 -autoconnect 1

   .. note::
      The J-Link connection command path mentioned above are:

      - `{Jlink_path}`: the path your Segger J-Link installed, default is ``C:\Program Files (x86)\SEGGER\JLink``.
      - `{script_path}`: ``{SDK}\amebalite_gcc_project\utils\jlink_script``