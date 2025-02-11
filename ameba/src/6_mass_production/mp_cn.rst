.. _mass_production:

MP 固件
---------
In response to the different needs of user, SDK provides two types of mass production (MP) image: shrink MP image and expand MP image.
Both MP images are capable to run complete MP test. The comparison between them is listed below.

.. table:: MP image comparison
   :width: 100%
   :widths: auto

   +--------+-------+------------------+-------------------+------------------------+---------------------------------------------------+
   | Image  | Size  | Download address | Download time     | Lifetime               | Description                                       |
   +========+=======+==================+===================+========================+===================================================+
   | Shrink | Small | RAM              | Short             | Lost after power off   | - Bootloader is different with normal image.      |
   |        |       |                  |                   |                        |                                                   |
   |        |       |                  |                   |                        | - Only include MP test code                       |
   +--------+-------+------------------+-------------------+------------------------+---------------------------------------------------+
   | Expand | Large | Flash            | Long              | Retain after power off | - Share the same bootloader with normal image.    |
   |        |       |                  |                   |                        |                                                   |
   |        |       |                  |                   |                        | - Besides MP test code, include application code  |
   +--------+-------+------------------+-------------------+------------------------+---------------------------------------------------+

固件产生
~~~~~~~~~~~~~~~~~~
The steps of generating MP image are depicted below:

1. Switch to work directory ``{SDK}\amebadplus_gcc_project``.
2. Use command ``$make menuconfig`` to modify the configurations.

   a. Enable MP.

      .. figure:: figures/image_gen_enable_mp.png
         :scale: 90%
         :align: center

   b. For shrink MP image, just keep default shrink MP mode. For expand MP image, change MP mode to expand.

      .. figure:: figures/image_gen_enable_shrink_expand_mp.png
         :scale: 90%
         :align: center

   c. Enable Wi-Fi.

      .. figure:: figures/image_gen_enable_wifi.png
         :scale: 90%
         :align: center

   d. Enable BT.

      .. figure:: figures/image_gen_enable_bt.png
         :scale: 90%
         :align: center

   e. Save and exit the menuconfig.

3. Use command ``$make all`` to build the project.

.. note::

   - The MP image consists of bootloader firmware and application firmware, and both of them are generated under ``{SDK}\amebadplus_gcc_project``.
   - The application firmware is :file:`km0_km4_app_mp.bin`, while the name of bootloader firmware is different.

     * For expand MP image, the bootloader firmware is :file:`km4_boot_all.bin`.
     * For shrink MP image, in order to distinguish with bootloader of normal image, the bootloader firmware is modified to :file:`km4_boot_all_mp.bin`.

固件下载
~~~~~~~~~~~~~~~
There are two methods to download MP image to the chip:

1. Use image tool to download MP image directly.

   The address configuration in image tool is different between shrink MP image and expand MP image.
   Besides, it is required to click :guilabel:`Option` menu and select :guilabel:`Reset` after download before downloading shrink MP image.

   .. table:: Image tool download configuration
      :width: 100%
      :widths: auto

      +--------+---------------------+---------------+-------------+
      | Image  | Bin                 | Start address | End address |
      +========+=====================+===============+=============+
      | Shrink | km4_boot_all_mp.bin | 0x20012000    | 0x2001A000  |
      |        +---------------------+---------------+-------------+
      |        | km0_km4_app_mp.bin  | 0x2001A000    | 0x20080000  |
      +--------+---------------------+---------------+-------------+
      | Expand | km4_boot_all.bin    | 0x08000000    | 0x08014000  |
      |        +---------------------+---------------+-------------+
      |        | km0_km4_app_mp.bin  | 0x08014000    | 0x08200000  |
      +--------+---------------------+---------------+-------------+

2. Use image tool to generate ``Image_All.bin``, then use 1-N MP tool to download ``Image_All.bin``.

   This method applies to download MP image to multiple chips at the same time.

   .. table:: Image tool generate configuration
      :width: 100%
      :widths: auto

      +--------+---------------------+---------+
      | Image  | Bin                 | Offset  |
      +========+=====================+=========+
      | Shrink | km4_boot_all_mp.bin | 0       |
      |        +---------------------+---------+
      |        | km0_km4_app_mp.bin  | 0x8000  |
      +--------+---------------------+---------+
      | Expand | km4_boot_all.bin    | 0       |
      |        +---------------------+---------+
      |        | km0_km4_app_mp.bin  | 0x14000 |
      +--------+---------------------+---------+

   .. table:: 1-N MP tool download configuration
      :width: 100%
      :widths: auto

      +--------+---------------+------------+
      | Image  | Bin           | Offset     |
      +========+===============+============+
      | Shrink | Image_All.bin | 0x20012000 |
      +--------+---------------+------------+
      | Expand | Image_All.bin | 0x08000000 |
      +--------+---------------+------------+

MP 测试
--------------
Wi-Fi 和 BT 性能验证
~~~~~~~~~~~~~~~~~~~~~~~~~~~
There are two methods to verify the Wi-Fi and BT performance of the chip: standard MP test and fast MP test.
These two methods apply to different test conditions and are included in both shrink MP image and expand MP image.

.. table:: MP test comparison
   :width: 100%
   :widths: auto

   +----------+------+-----------+----------+-------------------------------------------------------------+
   | Method   | Cost | Test time | Accuracy | Description                                                 |
   +==========+======+===========+==========+=============================================================+
   | Standard | High | Long      |          | Use the professional tester to do wired test                |
   +----------+------+-----------+----------+-------------------------------------------------------------+
   | Fast     | Low  | Short     | High     | Use the golden board offered by realtek to do wireless test |
   +----------+------+-----------+----------+-------------------------------------------------------------+

标准 MP 测试
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Refer to *MP flow.pdf* for details.

快速 MP 测试
^^^^^^^^^^^^^^^^^^^^^^^^
Refer to *Fast MP flow.pdf* for details

用户自定义功能测试
~~~~~~~~~~~~~~~~~~~~
Besides Wi-Fi and BT performance verification, adding extra function verification in MP image is supported.

For example, to verify the GPIO function of some pins, APIs defined in :file:`gpio_api.c` are available to implement a test command.
Others such as :file:`serial_api.c` and :file:`spi_api.c` apply to UART and SPI function verification.

.. note::
   For adding a custom command in SDK, refer to *atcmd.pdf* for details.

用户数据
------------------
Besides image, it is optional to download user data to chip during MP process.
According to different circumstances, it is important to select an appropriate way to download user data.

For example, for common data such as audio file, it is recommended to combine it with image into a bin file by image tool and download the combined file to every chip.
While for special data, such as product license, which is unique and corresponds to the MAC address of the chip, combining data and image before downloading may not be appropriate because data file is different between every chip.

It is more acceptable to transmit data to chip through LOGUART after MP image runs, which requires user to implement a command for receiving data file and writing it into Flash in MP image.

.. note::
   The SDK can support transmitting up to 4KB data at a time through LOGUART when longer command in menuconfig is enabled. For programing Flash, :file:`flash_api.c` provides related APIs.


