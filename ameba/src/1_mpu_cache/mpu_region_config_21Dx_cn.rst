.. tab:: RTL8721Dx

   .. table::
      :width: 100%
      :widths: auto

      +----------------------+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
      | Member variable name | Type     | Description                                                                                                                                              |
      +======================+==========+==========================================================================================================================================================+
      | region_base          | uint32_t | MPU region base, 32 bytes aligned                                                                                                                        |
      +----------------------+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
      | region_size          | uint32_t | MPU region size, 32 bytes aligned                                                                                                                        |
      +----------------------+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
      | xn                   | uint8_t  | Execute Never attribute                                                                                                                                  |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_EXEC_ALLOW: Allows program execution in this region                                                                                                |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_EXEC_NEVER: Does not allow program execution in this region                                                                                        |
      +----------------------+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
      | ap                   | uint8_t  | Access permissions                                                                                                                                       |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_PRIV_RW: Read/write by privileged code only                                                                                                        |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_UN_PRIV_RW: Read/write by any privilege level                                                                                                      |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_PRIV_R: Read only by privileged code only                                                                                                          |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_PRIV_W: Read only by any privilege level                                                                                                           |
      +----------------------+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
      | sh                   | uint8_t  | Share ability for Normal memory                                                                                                                          |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_NON_SHAREABLE: Non-shareable                                                                                                                       |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_OUT_SHAREABLE: Outer shareable                                                                                                                     |
      |                      |          |                                                                                                                                                          |
      |                      |          | - MPU_INR_SHAREABLE: Inner shareable                                                                                                                     |
      +----------------------+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
      | attr_idx             | uint8_t  | Memory attribute indirect index                                                                                                                          |
      |                      |          |                                                                                                                                                          |
      |                      |          | This parameter can be a value of 0 ~ 7, the detailed attribute is defined in :func:`mpu_init()` and is customized. The typical definition is as follows: |
      |                      |          |                                                                                                                                                          |
      |                      |          | - 0: MPU_MEM_ATTR_IDX_NC, defines memory attribute of Normal memory with non-cacheable.                                                                  |
      |                      |          |                                                                                                                                                          |
      |                      |          | - 1: MPU_MEM_ATTR_IDX_WT_T_RA, defines memory attribute of Normal memory with write-through transient, read allocation.                                  |
      |                      |          |                                                                                                                                                          |
      |                      |          | - 2: MPU_MEM_ATTR_IDX_WB_T_RWA, defines memory attribute of Normal memory with write-back transient, read and write allocation.                          |
      |                      |          |                                                                                                                                                          |
      |                      |          | - 3 ~ 7: MPU_MEM_ATTR_IDX_DEVICE, defines memory attribute of Device memory with non-gathering, non-recording, non-early Write Acknowledge.              |
      +----------------------+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
