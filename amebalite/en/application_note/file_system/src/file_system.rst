.. _amebalite_virtual_file_system:

Introduction
------------------------
This section introduces how to run Virtual File System (VFS) on |CHIP_NAME|, including FatFS and LittleFS as the underlying implementation. Users can ignore the differences between different file systems by using VFS. The VFS provides common file operation interfaces like fopen, fwrite, fread, fclose, etc. The Key-Value (KV) interfaces are based on these common file operations. The architecture of VFS is illustrated as follows:

.. figure:: ../figures/vfs_architecture.svg
   :scale: 130%
   :align: center

   VFS architecture

VFS Initialization
------------------------------------
By default, the VFS has been initialized in :file:`main.c`.

.. code-block:: c

   void app_filesystem_init(void)
   {
      int ret = 0;
      vfs_init();

   #ifdef CONFIG_FATFS_WITHIN_APP_IMG
      ret = vfs_user_register("fat", VFS_FATFS, VFS_INF_FLASH, VFS_REGION_2, VFS_RO);
      if (ret == 0) {
         RTK_LOGI(TAG, "VFS-FAT Init Success \n");
      } else {
      RTK_LOGI(TAG, "VFS-FAT Init Fail \n");
      }
   #endif

      ret = vfs_user_register(VFS_PREFIX, VFS_LITTLEFS, VFS_INF_FLASH, VFS_REGION_R1, VFS_RW);
      if (ret == 0) {
         ret = rt_kv_init();
         if (ret == 0) {
            RTK_LOGI(TAG, "File System Init Success\n");
            return;
         }
      }
      RTK_LOGE(TAG, "File System Init Fail \n");
      return;
   }

The :func:`vfs_user_register()` API will mount VFS to the Flash by users' configuration. If failed to mount, this API will check whether the Flash is clean (0xFF). And if the Flash is clean, it will program the Flash to initialize VFS.

.. code-block:: c

   int vfs_user_register(const char *prefix, int vfs_type, int interface, char region, char flag)

Where:

:**prefix**: defined by users, used to distinguish different file systems

:**vfs_type**: file system type of the underlying implementation (**FatFS** or **LittleFS**)

:**interface**: memory type (Flash only)

:**region**: Flash partition (**VFS1** or **VFS2**, described in Section :ref:`vfs_on_flash`)

:**flag**: operation authority of file system (read-write or read-only)

.. note::
   *vfs_type* of VFS_REGION_1 is set to **LittleFS** by default for read-write balance and power failure protection. To ensure proper utilization of **FatFS**, it is essential to configure the relevant settings in the menuconfig.


Usage of VFS
------------------------

.. _vfs_on_flash:

VFS on Flash
~~~~~~~~~~~~~~~~~~~~~~~~
Adjust the Flash partitions appropriately if the VFS interfaces are set to the Flash, and modify **VFS1** or **VFS2** (according to register region in :file:`main.c`) in `Flash_Layout[]` in ``{SDK}component\soc\amebalite\usrcfg\ameba_flashcfg.c``.

.. code-block:: c
   :emphasize-lines: 10

   FlashLayoutInfo_TypeDef Flash_Layout[] = {
      /*Region_Type,	[StartAddr,	EndAddr]		*/
      {IMG_BOOT,      0x08000000, 0x08013FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K)
      //Users should modify below according to their own memory
      {IMG_APP_OTA1,  0x08014000, 0x081F3FFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA1 + Manifest(4K) + RDP IMG OTA1

      {IMG_BOOT_OTA2, 0x08200000, 0x08213FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K) OTA
      {IMG_APP_OTA2,  0x08214000, 0x083DCFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA2 + Manifest(4K) + RDP IMG OTA2
      {FTL,           0x083DD000, 0x083DFFFF}, //FTL for BT(>=12K), The start offset of flash pages which is allocated to FTL physical map.
      {VFS1,          0x083E0000, 0x083FFFFF}, //VFS region 1 (128K)
      {IMG_DSP,       0x08400000, 0x086FFFFF}, //Manifest(4K) + DSP IMG, only one DSP region in layout
      {VFS2,          0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
      {USER,          0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user

      /* End */
      {0xFF,          0xFFFFFFFF, 0xFFFFFFFF},
   };

.. note::
   
   - The **VFS1** region must exist, and its size should always be larger than 128KB.
   
   - There are two VFS regions at most.


VFS within APP Image
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
If the user only intends to use read-only files through VFS, VFS provides a more convenient read-only configuration feature. The detailed steps are as follows:

1. Prepare the read-only files and convert them into a FAT-formatted bin file. Refer to Section :ref:`fatfs_bin_file_generation_section` for the method.

2. Name the bin file :file:`fatfs.bin` and place it in the ``amebalite_gcc_project`` directory.

3. Enable the following configurations in the menuconfig:

   .. figure:: ../figures/vfs_within_app_image_1.png
      :scale: 90%
      :align: center

   .. figure:: ../figures/vfs_within_app_image_2.png
      :scale: 90%
      :align: center

4. Rebuild the application firmware.

   The application firmware (:file:`kr4_km4_app.bin` or :file:`kr4_km4_dsp_app.bin`) will include a read-only VFS area in FAT format, which will be mounted during the startup process.

After startup, you will see the log **VFS-FAT Init Success** indicating that the read-only file system has been successfully mounted.

For the file usage method, refer to Sections :ref:`common_file_operation_section` or :ref:`key_value_operation_section`.

.. note::
   To optimize the effective space utilization of the read-only file system, only FAT format is currently supported.

.. _common_file_operation_section:

Common File Operation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The common file operation interfaces used in VFS are listed below:

.. table:: 
   :width: 100%
   :widths: 30 40 30

   +-----------+------------------------+------------------------------------------------------------------------+
   | API       | Parameters             | Description                                                            |
   +===========+========================+========================================================================+
   | fopen     | - const char * filename| Open the filename pointed to, by filename using the given mode         |
   |           |                        |                                                                        |
   |           | - const char * mode    |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fclose    | FILE * stream          | Close the stream                                                       |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fread     | - void * ptr           | Read data from the given stream by ptr into the array pointed to       |
   |           |                        |                                                                        |
   |           | - size_t size          |                                                                        |
   |           |                        |                                                                        |
   |           | - size_t count         |                                                                        |
   |           |                        |                                                                        |
   |           | - FILE * stream        |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fwrite    | - const void * ptr     | Write data from the array pointed to by ptr to the given stream        |
   |           |                        |                                                                        |
   |           | - size_t size          |                                                                        |
   |           |                        |                                                                        |
   |           | - size_t count         |                                                                        |
   |           |                        |                                                                        |
   |           | - FILE * stream        |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fseek     | - FILE * stream        | Set the file position of the stream to the given offset                |
   |           |                        |                                                                        |
   |           | - long int offset      |                                                                        |
   |           |                        |                                                                        |
   |           | - int origin           |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | rewind    | FILE * stream          | Set the file position to the beginning of the file of the given stream |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fgetpos   | - FILE * stream        | Get the current file position of the stream and writes it to pos       |
   |           |                        |                                                                        |
   |           | - fpos_t * p           |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fsetpos   | - FILE * stream        | Set the file position of the given stream to the given position        |
   |           |                        |                                                                        |
   |           | - fpos_t * p           |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fflush    | FILE * stream          | Flush the output buffer of a stream                                    |
   +-----------+------------------------+------------------------------------------------------------------------+
   | remove    | const char * filename  | Delete the given filename so that it is no longer accessible           |
   +-----------+------------------------+------------------------------------------------------------------------+
   | rename    | - const char * oldname | Cause the filename referred to from old_filename to new_filename       |
   |           |                        |                                                                        |
   |           | - const char * newname |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | feof      | FILE * stream          | Test the end-of-file indicator for the given stream                    |
   +-----------+------------------------+------------------------------------------------------------------------+
   | ferror    | FILE * stream          | Test the error indicator for the given stream                          |
   +-----------+------------------------+------------------------------------------------------------------------+
   | ftell     | FILE * stream          | Return the current file position of the given stream                   |
   +-----------+------------------------+------------------------------------------------------------------------+
   | ftruncate | - FILE * stream        | Truncate a file to a specified length                                  |
   |           |                        |                                                                        |
   |           | - off_t length         |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | opendir   | const char * name      | Open a directory                                                       |
   +-----------+------------------------+------------------------------------------------------------------------+
   | readdir   | DIR * pdir             | Read a directory                                                       |
   +-----------+------------------------+------------------------------------------------------------------------+
   | closedir  | DIR * dirp             | Close a directory                                                      |
   +-----------+------------------------+------------------------------------------------------------------------+
   | rmdir     | const char * path      | Remove a directory                                                     |
   +-----------+------------------------+------------------------------------------------------------------------+
   | mkdir     | - const char * pathname| Make a directory                                                       |
   |           |                        |                                                                        |
   |           | - mode_t mode          |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | access    | - const char * pathname| Determine accessibility of a file                                      |
   |           |                        |                                                                        |
   |           | - int mode             |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | stat      | - const char * path    | Get file status                                                        |
   |           |                        |                                                                        |
   |           | - struct stat * buf    |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+


Users can rebuild the project by ``make all EXAMPLE=vfs`` to test how common file operations work. Test logs should be like below:

.. code-block:: c

   [example_vfs_thread] fwrite succeeded !!!
   [example_vfs_thread] fread succeeded !!!
   [example_vfs_thread] remove file succeeded !!!

.. note::
   If success, ``fseek`` returns offset according to the beginning of file which is different from standard interfaces.

.. _key_value_operation_section:

Key-Value Operation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Simple KV interfaces are also provided for users. All KV APIs are placed in ``{SDK}\component\file_system\kv\kv.c.`` Users can rebuild the project by ``make all EXAMPLE=kv`` to test how KV APIs work. Test logs should be like below:

.. code-block:: c

   rt_kv_set success, write 28 letters.
   rt_kv_get success, read 28 letters.
   rt_kv_delett success.

Code Conversion
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The conversion between unicode and other codes is not supported on **FatFS** by default.


Modify the macro `FF_CODE_PAGE` in ``{SDK}\component\file_system\fatfs\r0.14b\include\ffconf.h`` to enable the code conversion function, where `FF_CODE_PAGE` should be chosen as code page number which is desired.

.. code-block:: c

   #define FF_CODE_PAGE  999
   /* This option specifies the OEM code page to be used on the target system.
   /  Incorrect code page setting can cause a file open failure.
   /   437 - U.S.
   /   720 - Arabic
   /   737 - Greek
   /   771 - KBL
   /   775 - Baltic
   /   850 - Latin 1
   /   852 - Latin 2
   /   855 - Cyrillic
   /   857 - Turkish
   /   860 - Portuguese
   /   861 - Icelandic
   /   862 - Hebrew
   /   863 - Canadian French
   /   864 - Arabic
   /   865 - Nordic
   /   866 - Russian
   /   869 - Greek 2
   /   932 - Japanese (DBCS)
   /   936 - Simplified Chinese (DBCS)
   /   949 - Korean (DBCS)
   /   950 - Traditional Chinese (DBCS)
   /   999 - Realtek defined for code size
   /     0 - Include all code pages above and configured by f_setcp()
   */

VFS Encryption
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For special storage security needs, users can configure encryption and decryption interfaces of vfs. Specific interface usage instructions are listed in ``{SDK}\component\example\storage\vfs_encrypt\readme.txt``. Users can rebuild the project by ``make all EXAMPLE=vfs_encrypt`` to test how KV APIs work. Test logs should be like below:

.. code-block:: c

   [example_vfs_encrypt_thread] fwrite succeeded !!!
   [example_vfs_encrypt_thread] fread succeeded !!!
   [example_vfs_encrypt_thread] remove file succeeded !!!



.. note::
   Plaintext will be padded according to the length of grouped data. It will take more cost of memory space if using vfs encryption.


VFS Bin File Generation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
If data needs to be placed in the Flash in advance, VFS bin file can be generated on PC. After generating the bin file, it should be downloaded to VFS region according to the Flash layout.

LittleFS Bin File Generation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Prepare a needed object folder including files before generating LittleFS bin files. For example:

   .. figure:: ../figures/littlefs_bin_generation_step1.png
      :scale: 90%
      :align: center

   **AUDIO** and **KV** directories will be LittleFS directory in the Flash.

2. Use the command ``$./mklittlefs -b 4096 -p 256 -c-s 0x20000 test image_littlefs.bin`` in ``mklittlefs`` tool located at ``\tools\littlefs``  to generate LittleFS bin files.

   Where:

   :b: block size decided by Flash

   :p: page size

   :s: bin file size

   :c: object folder

   :<Image_littlefs.bin>: LittleFS bin file name

   .. figure:: ../figures/littlefs_bin_generation_step2.png
      :scale: 90%
      :align: center

   .. note::
      ``-b 4096`` and ``-p 256`` are default configurations, users should adapt the configuration according to `block_size` and `cache_size` of **lfs_config** in ``{SDK}\component\file_system\littlefs\littlefs_adapter.c``. ``-s 0x20000`` is according to VFS region mentioned in Section :ref:`vfs_on_flash`.


3. Download the image to the Flash.

   The start address of image should be VFS Flash region address mentioned in Section :ref:`vfs_on_flash`. Test logs are shown below:

   .. code-block::

      ==========mklittlefs example==========
      [TEST1]: This is a test file for mklittle …
      [AUDIO1]: Copyright (c) 2013 Realtek …

.. _fatfs_bin_file_generation_section:

FatFS Bin File Generation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The steps to generate FatFS bin files are listed below:

1. Use command ``root@ubuntu # dd if=/dev/zero of=test.bin count=64 bs=1KB`` to create :file:`test.bin` that has 64 blocks and each block is 1KB.

2. Use command ``root@ubuntu # mkfs.fat -S 512-F 12 test.bin`` to build a FAT file system.

3. Use command ``root@ubuntu # sudo mount test.bin ./fs`` to mount :file:`test.bin` to file folder fs.

4. Use command ``root@ubuntu # sudocphello.txt ./fs`` to copy the files that users want to store into ``test.bin``.

   In this step, :file:`hello.txt` is stored in :file:`test.bin`.

5. Use command ``root@ubuntu # sudoumount ./fs`` to generate the FatFS file after unmounting :file:`test.bin`.

Users should find more related information about this topic from the internet, and copy :file:`test.bin` into user data area of Flash finally.

