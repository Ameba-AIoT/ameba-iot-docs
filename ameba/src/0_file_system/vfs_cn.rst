.. _virtual_file_system:

概述
------------------------
This section introduces how to run Virtual File System (VFS) on Ameba SoC, including FatFS and LittleFS as the underlying implementation. Users can ignore the differences between different file systems by using VFS. The VFS provides common file operation interfaces like fopen, fclose, fwrite, fread, etc. The Key-Value (KV) interfaces are based on these common file operations. The architecture of VFS is illustrated below.

.. tabs::

   .. include:: vfs_arch_26E20E21Dx.rst
   .. include:: vfs_arch_30E.rst

VFS 初始化
------------------------------------
VFS的初始化默认在 :file:`main.c` 文件中实现.

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

     ret = vfs_user_register(VFS_PREFIX, VFS_LITTLEFS, VFS_INF_FLASH, VFS_REGION_1, VFS_RW);
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

The :func:`vfs_user_register()` API will mount VFS to the Flash (or SD card, if supported) by users' configuration. If failed to mount, this API will check whether the Flash is clean (0xFF). And if the Flash is clean, it will program the Flash to initialize VFS.

.. code-block:: c

   int vfs_user_register(const char *prefix, int vfs_type, int interface, char region, char flag)

Where:

.. tabs::

   .. tab:: RTL8726EA/RTL8720EA/RTL8721Dx

      :**prefix**: defined by users, used to distinguish different file systems
      :**vfs_type**: file system type of the underlying implementation (**FatFS** or **LittleFS**)
      :**interface**: memory type (Flash only)
      :**region**: Flash partition (**VFS1** or **VFS2**, described in Section :ref:`vfs_on_flash`)
      :**flag**: operation authority of file system (read-write or read-only)

   .. tab:: RTL8730E

      :**prefix**: defined by users, used to distinguish different file systems
      :**vfs_type**: file system type of the underlying implementation (**FatFS** or **LittleFS**)
      :**interface**: memory type (Flash for LittleFS, Flash and SD card for FatFS)
      :**region**: Flash partition (**VFS1** or **VFS2**, described in Section :ref:`vfs_on_flash`)
      :**flag**: operation authority of file system (read-write or read-only)

.. note::
   *vfs_type* of VFS1 is set to **LittleFS** by default for read-write balance and power failure protection. To ensure proper utilization of **FatFS**, it is essential to configure the relevant settings in the menuconfig.

VFS 用法
------------

.. _vfs_on_flash:

Flash中的VFS
~~~~~~~~~~~~~~~
.. tabs::

   .. include:: vfs_on_flash_30E.rst
   .. include:: vfs_on_flash_26E20E.rst
   .. include:: vfs_on_flash_21Dx.rst

SD卡中的VFS
~~~~~~~~~~~~~~~
.. tabs::

   .. include:: vfs_on_sd_card_30E.rst
   .. include:: vfs_on_sd_card_26E20E21Dx.rst

应用固件包含VFS
~~~~~~~~~~~~~~~~~~~~~~~
.. tabs::

   .. include:: vfs_within_app_image_30E.rst
   .. include:: vfs_within_app_image_26E20E.rst
   .. include:: vfs_within_app_image_21Dx.rst

.. _common_file_operation_section:

普通文件操作
~~~~~~~~~~~~~
VFS 中常用的文件操作接口如下所示：

.. table::
   :width: 100%
   :widths: 30 40 30

   +-----------+------------------------+------------------------------------------------------------------------+
   | API       | Parameter              | Description                                                            |
   +===========+========================+========================================================================+
   | fopen     | - const char * filename| Open the filename pointed to, by filename using the given mode         |
   |           | - const char * mode    |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fclose    | FILE * stream          | Close the stream                                                       |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fread     | - void * ptr           | Read data from the given stream by ptr into the array pointed to       |
   |           | - size_t size          |                                                                        |
   |           | - size_t count         |                                                                        |
   |           | - FILE * stream        |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fwrite    | - const void * ptr     | Write data from the array pointed to by ptr to the given stream        |
   |           | - size_t size          |                                                                        |
   |           | - size_t count         |                                                                        |
   |           | - FILE * stream        |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fseek     | - FILE * stream        | Set the file position of the stream to the given offset                |
   |           | - long int offset      |                                                                        |
   |           | - int origin           |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | rewind    | FILE * stream          | Set the file position to the beginning of the file of the given stream |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fgetpos   | - FILE * stream        | Get the current file position of the stream and writes it to pos       |
   |           | - fpos_t * p           |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fsetpos   | - FILE * stream        | Set the file position of the given stream to the given position        |
   |           | - fpos_t * p           |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | fflush    | FILE * stream          | Flush the output buffer of a stream                                    |
   +-----------+------------------------+------------------------------------------------------------------------+
   | remove    | const char * filename  | Delete the given filename so that it is no longer accessible           |
   +-----------+------------------------+------------------------------------------------------------------------+
   | rename    | - const char * oldname | Cause the filename referred to from old_filename to new_filename       |
   |           | - const char * newname |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | feof      | FILE * stream          | Test the end-of-file indicator for the given stream                    |
   +-----------+------------------------+------------------------------------------------------------------------+
   | ferror    | FILE * stream          | Test the error indicator for the given stream                          |
   +-----------+------------------------+------------------------------------------------------------------------+
   | ftell     | FILE * stream          | Return the current file position of the given stream                   |
   +-----------+------------------------+------------------------------------------------------------------------+
   | ftruncate | - FILE * stream        | Truncate a file to a specified length                                  |
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
   |           | - mode_t mode          |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | access    | - const char * pathname| Determine accessibility of a file                                      |
   |           | - int mode             |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+
   | stat      | - const char * path    | Get file status                                                        |
   |           | - struct stat * buf    |                                                                        |
   +-----------+------------------------+------------------------------------------------------------------------+

Users can rebuild the project by ``make all EXAMPLE=vfs`` to test how common file operations work. Test logs should be like below:

.. code-block::

   [example_vfs_thread] fwrite succeeded !!!
   [example_vfs_thread] fread succeeded !!!
   [example_vfs_thread] remove file succeeded !!!

.. note::
   If successful, ``fseek`` returns offset according to the beginning of file which is different from standard interfaces.

.. _key_value_operation_section:

Key-Value 操作
~~~~~~~~~~~~~~~~~~~~~~
Simple KV interfaces are also provided for users. All KV APIs are placed in ``{SDK}\component\file_system\kv\kv.c``. Users can rebuild the project by ``make all EXAMPLE=kv`` to test how KV APIs work. Test logs should be like below:

.. code-block::

   rt_kv_set success, write 28 letters.
   rt_kv_get success, read 28 letters.
   rt_kv_delett success.

代码转换
~~~~~~~~~~~~~~~~~~
FatFS 默认不支持 Unicode 与其他编码之间的转换。

Modify the macro ``FF_CODE_PAGE`` in ``{SDK}\component\file_system\fatfs\r0.14b\include\ffconf.h``  to enable the code conversion function, where ``FF_CODE_PAGE`` should be chosen as code page number which is desired.

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

VFS 加密
~~~~~~~~~~~~~~~~
For special storage security needs, users can configure encryption and decryption interfaces of vfs. Specific interface usage instructions are listed in ``{SDK}\component\example\storage\vfs_encrypt\readme.txt``. Users can rebuild the project by ``make all EXAMPLE=vfs_encrypt`` to test how KV APIs work. Test logs should be like below:

.. code-block::

   [example_vfs_encrypt_thread] fwrite succeeded !!!
   [example_vfs_encrypt_thread] fread succeeded !!!
   [example_vfs_encrypt_thread] remove file succeeded !!!

.. note::
   Plaintext will be padded according to the length of grouped data. It will take more cost of memory space if using vfs encryption.

.. _vfs_bin_file_generation:

VFS Bin File Generation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
If data needs to be placed in the Flash in advance, VFS bin file can be generated on PC. After generating the bin file, it should be downloaded to VFS region according to the Flash layout.

LittleFS Bin File Generation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Prepare a needed object folder including files before generating LittleFS bin files. For example:

   .. figure:: figures/littlefs_bin_generation_step1.png
      :scale: 90%
      :align: center

   **AUDIO** and **KV** directories will be LittleFS directory in the Flash. The ``test`` directory is equivalent to the root directory.

2. Use the command ``$./mklittlefs -b 4096 -p 256 -s 0x20000 -c test image_littlefs.bin`` in ``mklittlefs`` tool located at ``\tools\littlefs`` to generate LittleFS bin files.

   Where:

   :b: block size decided by Flash
   :p: page size
   :s: bin file size
   :c: object folder
   :<Image_littlefs.bin>: LittleFS bin file name

   .. figure:: figures/littlefs_bin_generation_step2.png
      :scale: 90%
      :align: center

   .. note::
      - **-b 4096** and **-p 256** are default configurations, users should adapt the configuration according to *block_size* and *cache_size* of ``lfs_config`` in ``{SDK}\component\file_system\littlefs\littlefs_adapter.c``.
      - **-s 0x20000** is according to VFS region mentioned in Section :ref:`vfs_on_flash`.

3. Download the image to the Flash.

   The start address of Image Tool should be ``StartAddr`` of VFS Flash region mentioned in Section :ref:`vfs_on_flash`. The end address of Image Tool should be it's ``EndAddr`` + 1;

   .. tabs::

      .. include:: vfs_bin_download_21Dx.rst
      .. include:: vfs_bin_download_26E20E.rst
      .. include:: vfs_bin_download_30E.rst

.. _fatfs_bin_file_generation_section:

FatFS Bin File Generation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The steps to generate FatFS bin files are listed below:

1. Use command ``root@ubuntu # dd if=/dev/zero of=test.bin count=64 bs=1KB`` to create ``test.bin`` that has 64 blocks and each block is 1KB.
2. Use command ``root@ubuntu # mkfs.fat -S 512-F 12 test.bin`` to build a FAT file system.
3. Use command ``root@ubuntu # sudo mount test.bin ./fs`` to mount ``test.bin`` to file folder fs.
4. Use command ``root@ubuntu # sudo cp hello.txt ./fs`` to copy the files that users want to store into ``test.bin``.

   In this step, ``hello.txt`` is stored in ``test.bin``.

5. Use command ``root@ubuntu # sudo umount ./fs`` to generate the FatFS file after unmounting ``test.bin``.
6. Refer to LittleFS Step 3 to write the generated bin file to the Flash.
