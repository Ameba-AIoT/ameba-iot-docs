.. tab:: RTL8730E

   .. table::
      :width: 100%
      :widths: auto

      +----------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
      | Member variable            | Type                | Description                                                                                                                                            |
      +============================+=====================+========================================================================================================================================================+
      | :literal:`region_base`     | :literal:`uint32_t` | MPU region base, 32 bytes aligned                                                                                                                      |
      +----------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
      | :literal:`region_size`     | :literal:`uint32_t` | MPU region size, 32 bytes aligned                                                                                                                      |
      +----------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
      | :literal:`xn`              | :literal:`uint8_t`  | Execute Never attribute                                                                                                                                |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_EXEC_ALLOW`: Allows program execution in this region                                                                                   |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_EXEC_NEVER`: Does not allow program execution in this region                                                                           |
      +----------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
      | :literal:`ap`              | :literal:`uint8_t`  | Access permissions                                                                                                                                     |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_PRIV_RW`: Read/write by privileged code only                                                                                           |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_UN_PRIV_RW`: Read/write by any privilege level                                                                                         |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_PRIV_R`: Read only by privileged code only                                                                                             |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_PRIV_W`: Read only by any privilege level                                                                                              |
      +----------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
      | :literal:`sh`              | :literal:`uint8_t`  | Share ability for Normal memory                                                                                                                        |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_NON_SHAREABLE`: Non-shareable                                                                                                          |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_OUT_SHAREABLE`: Outer shareable                                                                                                        |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - :literal:`MPU_INR_SHAREABLE`: Inner shareable                                                                                                        |
      +----------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
      | :literal:`attr_idx`        | :literal:`uint8_t`  | Memory attribute indirect index                                                                                                                        |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | This parameter can be a value of 0 ~ 7, the detailed attribute is defined in :func:`mpu_init` and is customized. The typical definition is as follows: |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - 0: :literal:`MPU_MEM_ATTR_IDX_NC`, defines memory attribute of Normal memory with non-cacheable.                                                     |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - 1: :literal:`MPU_MEM_ATTR_IDX_WT_T_RA`, defines memory attribute of Normal memory with write-through transient, read allocation.                     |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - 2: :literal:`MPU_MEM_ATTR_IDX_WB_T_RWA`, defines memory attribute of Normal memory with write-back transient, read and write allocation.             |
      |                            |                     |                                                                                                                                                        |
      |                            |                     | - 3 ~ 7: :literal:`MPU_MEM_ATTR_IDX_DEVICE`, defines memory attribute of Device memory with non-gathering, non-recording, non-early Write Acknowledge. |
      +----------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
