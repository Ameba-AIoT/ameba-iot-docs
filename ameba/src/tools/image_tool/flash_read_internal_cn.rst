
Flash Read
-----------
This function is for internal usage only and shall be never exported to customers.

Steps to read data from Flash:

1. Make sure Image Tool is closed.
2. Enter *developer mode* by editing runtime configuration file :file:`<ImageTool>/Setting.json`, set *ExpertMode* value to *0x0BDA* for hex or *3034* for decimal, to enable the Flash read function.
   
   .. note::
      - :file:`Setting.json` will be automatically generated at the first time that Image Tool is opened and saved each time that Image Tool is normally closed.
      - The magic key 0x0BDA is Realtek's USB IF VID.
   
3. Enter into download mode as introduced above.
4. Open Image Tool, click :menuselection:`File > Open` and select the proper device profile.
5. Select the corresponding serial port and baud rate.
   
   .. note:: The baud rate will be ignored for USB download interface.

6. Input read address.

   - For NOR Flash, only Start Addr shall be specified and the value has no limitation.
   - For NAND Flash, both Start Addr and End Addr shall be specified, and the values shall be aligned to page size.

   .. note::
      Refer to the datasheet of the corresponding NAND Flash for page size, normally 2KB for <1Gbit SPI NAND Flash models.

7. Input read size.

   - For NOR Flash, the value shall be a multiple of 4KB.
   - For NAND Flash, the value shall be a multiple of page size.
   
   .. note::
      - Refer to the datasheet of the corresponding NAND Flash for page size, normally 2KB for SPI NAND Flash models.
      - For NAND Flash, Image Tool will try to read data from address Start Addr for size Size with bad blocks skipped, until the read out data size counted to Size of address exceed address End Addr.

8. Click the :menuselection:`Read` button, and the Flash data will be dumped into the same path of :file:`AmebaImageTool.exe`, named with :file:`<start address>.bin`.

   .. figure:: figures/nor_flash_read_operation.png
      :scale: 90%
      :align: center
   
      NOR Flash read operation

   .. figure:: figures/nand_flash_read_operation.png
      :scale: 90%
      :align: center
   
      NAND Flash read operation