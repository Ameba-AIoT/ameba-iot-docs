.. tab:: RTL8721Dx

    If the user only intends to use read-only files through VFS, VFS provides a more convenient read-only configuration feature on flash. The detailed steps are as follows:

    1. Prepare the read-only files and convert them into a FAT-formatted bin file. Refer to section :ref:`fatfs_bin_file_generation_section` for the method.
    2. Name the bin file :file:`fatfs.bin` and place it in ``{SDK}\amebadplus_gcc_project``.
    3. Enable the following configurations in the menuconfig:

    .. figure:: figures/vfs_within_app_image_1.png
        :scale: 90%
        :align: center

    .. figure:: figures/vfs_within_app_image_2.png
        :scale: 90%
        :align: center

    4. Rebuild the application firmware.

    The application firmware (:file:`km0_km4_app.bin`) will include a read-only VFS area in FAT format, which will be mounted during the startup process.

    After startup, you will see the log **VFS-FAT Init Success** indicating that the read-only file system has been successfully mounted.

    For the file usage method, refer to Section :ref:`common_file_operation_section` or :ref:`key_value_operation_section`.

    .. note::
        To optimize the effective space utilization of the read-only file system, only FAT format is currently supported.
