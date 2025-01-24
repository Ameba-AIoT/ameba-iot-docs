
On Linux, 32-bit Linux is not supported because of the toolchain.

The packages listed below should be installed for the GCC environment:

- **gcc**
- **libncurses5**
- **bash**
- **make**
- **libssl-dev**
- **binutils**
- **python3**

Some of the packages above may have been pre-installed in your operating system. You can either use package manager or type the corresponding version command on terminal to check whether these packages have already existed. If not, make them installed.

- **$ls -l /bin/sh**

  Starting from Ubuntu 6.10, dash is used by default instead of bash. You can use ``$ls -l /bin/sh`` command to check whether the system shell is bash or dash.

   - (Optional) If the system shell is dash, use ``$sudo dpkg-reconfigure dash`` command to switch from dash to bash.
   - If the system shell is bash, continue to do the subsequent operations.

  .. figure:: figures/switching_from_dash_to_bash.png
     :scale: 85%
     :align: center

- **$make -v**

  .. figure:: figures/make_v.png
     :scale: 85%
     :align: center

- **$sudo apt-get install libssl-dev**

  .. figure:: figures/libssl_dev.png
     :scale: 90%
     :align: center

- **binutils**

  Use ``ld -v`` command to check if binutils has been installed. If not, the following error may occur.

  .. figure:: figures/binutils.png
     :scale: 70%
     :align: center

