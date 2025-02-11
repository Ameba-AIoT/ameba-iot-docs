
For Windows, use MSYS2 and MinGW as the GCC environment.

- MSYS2 is a collection of tools and libraries providing an easy-to-use environment for building, installing, and running native Windows software.
- MinGW is an advancement of the original mingw.org project. It is created to support the GCC compiler on Windows system.

The steps to prepare GCC environment are as follows:

1. Download MSYS2 from its official website https://www.msys2.org.
2. Run the installer. MSYS2 requires 64-bit Windows 7 or later.
3. Enter your desired ``Installation Folder`` (ASCII, no accents, spaces nor symlinks, short path)
4. When done, tick ``Run MSYS2 now``.

   .. figure:: figures/windows_gcc_msy32_installation.svg
      :scale: 120%
      :align: center

5. Update the package database and base packages with:

   .. code-block::

      pacman -Syu

   When ``Proceed with installation? [Y/n]`` is displayed, type ``Y`` and continue until the package installation is done.

   .. figure:: figures/proceed_with_installation.svg
      :scale: 130%
      :align: center

   .. caution::
      After installation of MSYS2, there will be four start modes:

      - MSYS2 MinGW 32-bit
      - MSYS2 MinGW 64-bit
      - MSYS2 MinGW UCRT 64-bit
      - MSYS2 MSYS

      Because the toolchain release will base on 64-bit MinGW, choose ``MSYS2 MinGW 64-bit`` when starting the MinGW terminal.

6. Run ``MSYS2 MinGW 64-bit`` from ``Start`` menu. Update the rest of the base packages with:

   .. code-block::

      pacman -Syu

   When ``Proceed with installation? [Y/n]`` is displayed, type ``Y`` and continue until the package installation is done.

   .. figure:: figures/proceed_with_installation_y.png
      :scale: 90%
      :align: center

7. Install the necessary software packages with the commands below in order:

   .. code-block::

      pacman –S make
      pacman –S unzip
      pacman –S gcc
      pacman –S python
      pacman –S ncurses-devel
      pacman –S openssl-devel
      pacman -S mingw-w64-x86_64-gcc-libs

   When ``Proceed with installation? [Y/n]`` is displayed, type ``Y`` and continue until each software package installation is done.

8. Search the needed packages (used to compile TF-M) in and install them as you need with the commands below.

   .. code-block::

      pacman -S diffutils
      pacman -S vim
      pacman -S python-pip
      pacman -S cmake
      pip install Jinja2

9. Remove the file path length limit by editing the registry to allow the file paths longer than 260 characters.

   a. Press ``Win+R`` keys to open the ``Run`` dialog box, then type ``regedit`` and press ``Enter`` to open the ``Registry Editor``.
   b. Navigate to the registry key: ``Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem``.
   c. Search and check if the ``LongPathsEnabled`` item exists. If not, continue to **Step d**; otherwise, go to **Step e**.
   d. Right-click on an empty space in the right pane, then select ::menuselection:`New > DWORD (32-bit) Value`, and name it ``LongPathsEnabled``.
   e. Double-click on ``LongPathsEnabled`` and set its value to 1, then click ``OK`` to save.

