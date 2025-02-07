.. _flash_layout:

Introduction
------------------------
This chapter introduces the default Flash layout of |CHIP_NAME| and how to modify the Flash layout if needed.

The default Flash layout used in SDK is illustrated in the following figure and table.
The layout takes 8MB Flash as an example. The start address of boot manifest is fixed to 0x0800_0000, and other start addresses can be configured by users flexibly.

.. tabs::
   .. include:: flash_layout_dplus_21Dx.rst
   .. include:: flash_layout_lite_26E13E.rst
   .. include:: flash_layout_lite_20E10E.rst

Memory Management Unit (MMU)
--------------------------------------------------------
To achieve flexibility of image and for image encryption when RSIP is enabled (the fixed address is needed by IV when doing image encryption, refer to RSIP for more information), Flash MMU is applied by default.
The default MMU layout used in SDK is illustrated below.

.. tabs::
   .. include:: flash_layout_mmu_dplus.rst
   .. include:: flash_layout_mmu_lite_26E13E.rst
   .. include:: flash_layout_mmu_lite_20E10E.rst

.. _how_to_modify_flash_layout:

How to Modify Flash Layout
----------------------------------------------------
The following locations in the Flash can be modified:

- Bootloader OTA2 location

- APP location

   - APP OTA1

   - APP OTA2

- DSP image location(if exist)

- FTL/VFS Location

Modifying Bootloader OTA2 Location
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The location of bootloader OTA2 can be modified but requires 4KB alignment. The bootloader OTA2 is disabled by default.
If you want to enable bootloader OTA2, shift the start address of the bootloader OTA2 right by 12 bits, then burn it to the OTP 0x36C~0x36D.

The method is to modify the address of *IMG_BOOT_OTA2* in ``{SDK}\component\soc\amebaxxx\usrcfg\ameba_flashcfg.c``.
After burning the bootloader OTA2 into Flash through OTA, boot ROM will decide whether to use the bootloader OTA1 or the bootloader OTA2 according to the version number.

.. tabs::
   .. include:: flash_layout_ota2modify_dplus.rst
   .. include:: flash_layout_ota2modify_lite.rst


Modifying APP Location
~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::
   .. include:: flash_layout_appmodify_dplus.rst
   .. include:: flash_layout_appmodify_lite_26E13E.rst
   .. include:: flash_layout_appmodify_lite_20E10E.rst

Modifying FTL/VFS Location
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. tabs::
   .. include:: flash_layout_ftlmodify_dplus.rst
   .. include:: flash_layout_ftlmodify_lite.rst

.. _flash_protect_enable:

Flash Protect Enable
----------------------------------------
Before loading APP IMG, the bootloader will read the Status Register from Flash.

If only the Quad Enable (QE) bit is set in the output of bitwise AND between Status Register of Flash
and ``status_mask`` in ``Flash_AVL`` (``{SDK}\component\soc\amebaxxx\usrcfg\ameba_flashcfg.c``),
do nothing; otherwise the output of bitwise AND will be written to the Flash Status Register.

.. tabs::
   .. include:: flash_layout_flashprotect_dplus.rst
   .. include:: flash_layout_flashprotect_lite.rst

.. note::
   By default, setting the ``QE`` bit will unlock all the Block Protect bits. To avoid this operation, set Block Protect bits corresponding to ``status_mask`` in ``Flash_AVL`` to 0.
   For example, change the ``status_mask`` of Winbond in ``Flash_AVL`` to 0x000043C0.

In order to avoid the image being damaged due to improper operation when using LittleFS to write user data,
it is recommended to modify the location of FTL/LittleFS to the last 64KB area of Flash, and set the
Block Protect Bit in the Status Register of Flash at the same time.

.. note::

      - Only the last 64KB area of Flash can be modified, and the other areas are protected. Remember to unlock the Flash during OTA upgrade, and keep it locked when OTA is completed.

      - For some Flashes, you cannot set the Flash to allow only the last block to be modified through Block Protect Bit. In this case, it is recommended to enable the Flash block protection of the first half part.


