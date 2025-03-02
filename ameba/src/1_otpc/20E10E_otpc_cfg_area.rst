.. tab:: RTL8713E
   
   .. table:: 
      :width: 100%
      :widths: auto
   
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      | Offset | Bit    | Symbol                         | Description                                         | Usage                                                      |
      +========+========+================================+=====================================================+============================================================+
      | 0x360  | [31:0] | SWD_ID                         | SWDID use to mapping the real SWD Key               | :ref:`SWD Protection <swd_protection>`                     |
      +--------+--------+--------------------------------+-----------------------------------------------------+                                                            |
      | 0x364  | [0]    | SWD_PWD_EN                     | SWD password enable                                 |                                                            |
      |        +--------+--------------------------------+-----------------------------------------------------+                                                            |
      |        | [1]    | SWD_DBGEN                      | SWD external debug authentication                   |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [2]    | SWD_NIDEN                      |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [3]    | SWD_SPIDEN                     |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [4]    | SWD_SPNIDEN                    |                                                     |                                                            |
      |        +--------+--------------------------------+-----------------------------------------------------+                                                            |
      |        | [5]    | SWD_PWD_R_Protection_EN        | Key write protection and read protections           |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [6]    | SWD_PWD_W_Forbidden_EN         |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     +------------------------------------------------------------+
      |        | [7]    | HUK_W_Forbidden_EN             |                                                     | :ref:`HUK Derivation <huk_derivation>`                     |
      +--------+--------+--------------------------------+                                                     +------------------------------------------------------------+
      | 0x365  | [0]    | RSVD                           |                                                     | \-                                                         |
      |        +--------+--------------------------------+                                                     +------------------------------------------------------------+
      |        | [1]    | PK1_W_Forbidden_EN             |                                                     | :ref:`Secure Boot <secure_boot>`                           |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [2]    | PK2_W_Forbidden_EN             |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     +------------------------------------------------------------+
      |        | [3]    | RSVD                           |                                                     | :ref:`Hardware Crypto Engine <hardware_crypto_engine>`     |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [4]    | RSVD                           |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [5]    | S_IPSEC_Key2_R_Protection_EN   |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [6]    | S_IPSEC_Key2_W_Forbidden_EN    |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [7]    | NS_IPSEC_Key1_R_Protection_EN  |                                                     |                                                            |
      +--------+--------+--------------------------------+                                                     |                                                            |
      | 0x366  | [0]    | NS_IPSEC_Key1_W_Forbidden_EN   |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [1]    | NS_IPSEC_Key2_R_Protection_EN  |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [2]    | NS_IPSEC_Key2_W_Forbidden_EN   |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     +------------------------------------------------------------+
      |        | [3]    | ECDSA_PRI_KEY1_R_Protection_EN |                                                     | :ref:`ECDSA Engine <ecdsa_engine>`                         |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [4]    | ECDSA_PRI_KEY1_W_Forbidden_EN  |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [5]    | ECDSA_PRI_KEY2_R_Protection_EN |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [6]    | ECDSA_PRI_KEY2_W_Forbidden_EN  |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     +------------------------------------------------------------+
      |        | [7]    | RSIP_KEY1_R_Protection_EN      |                                                     | :ref:`Secure Image Protection <rsip>`                      |
      +--------+--------+--------------------------------+                                                     |                                                            |
      | 0x367  | [0]    | RSIP_KEY1_W_Forbidden_EN       |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [1]    | RSIP_KEY2_R_Protection_EN      |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [2]    | RSIP_KEY2_W_Forbidden_EN       |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [3]    | RSIP_MODE_W_Forbidden_EN       |                                                     |                                                            |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [4]    | SIC_SECURE_EN                  | Permit SIC to access secure zone                    | Program it or keep default value at your requirement       |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 1: Permit                                           |                                                            |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 0: Forbid                                           |                                                            |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [5]    | CPU_PC_DBG_EN                  | Enable get KM4/KR4 PC value through debug port      | Program it or keep default value at your requirement       |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 1: Enable                                           |                                                            |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 0: Disable                                          |                                                            |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [6]    | RSVD                           | \-                                                  | \-                                                         |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [7]    | RSVD                           | \-                                                  | \-                                                         |
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      | 0x368  | [0]    | UART_DOWNLOAD_DISABLE          | Used in ROM to disable power on latch UART download | To disable power on latch UART download, program this bit. |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 0: Disable                                          |                                                            |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 1: Enable (default)                                 |                                                            |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [1]    | RSVD                           | \-                                                  | \-                                                         |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [2]    | RSIP_EN                        | Enable/Disable RSIP control                         | :ref:`Secure Image Protection <rsip>`                      |
      |        +--------+--------------------------------+                                                     +------------------------------------------------------------+
      |        | [3]    | SECURE_BOOT_EN                 |                                                     | :ref:`Secure Boot <secure_boot>`                           |
      |        +--------+--------------------------------+                                                     |                                                            |
      |        | [4]    | SECURE_BOOT_HW_DIS             |                                                     |                                                            |
      |        +--------+--------------------------------+                                                     +------------------------------------------------------------+
      |        | [5]    | RSVD                           |                                                     | \-                                                         |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [6]    | Anti_Rollback_EN               |                                                     | :ref:`OTA Firmware Update <ota_firmware_update>`           |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [7]    | FAULT_LOG_PRINT_DIS            | Used in ROM to disable ROM hard fault log           | To disable hard fault log, program this bit.               |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 0: Disable                                          |                                                            |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 1: Enable (default)                                 |                                                            |
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      | 0x369  | [1:0]  | RSIP_MODE                      | RSIP Mode                                           | :ref:`Secure Image Protection <rsip>`                      |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [2]    | HUK_DERIV_EN                   | Enable/Disable HUK derive                           | :ref:`HUK Derivation <huk_derivation>`                     |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [3]    | SWTRIG_UART_DOWNLOAD_DISABLE   | Used in ROM to disable SW trigger UART download     | To disable SW trigger UART download, program this bit.     |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 0: Disable                                          |                                                            |
      |        |        |                                |                                                     |                                                            |
      |        |        |                                | 1: Enable (default)                                 |                                                            |
      |        +--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      |        | [7:4]  | SW_RSVD0                       | \-                                                  | \-                                                         |
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      | 0x36A  | [7:0]  | RSVD                           | \-                                                  | \-                                                         |
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      | 0x36B  | [3:0]  | SECURE_BOOT_AUTH_LOG           | Secure boot Auth Algorithm                          | :ref:`Secure Boot <secure_boot>`                           |
      |        +--------+--------------------------------+-----------------------------------------------------+                                                            |
      |        | [7:4]  | SECURE_BOOT_HASH_LOG           | Secure boot Hash Algorithm                          |                                                            |
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      | 0x36C  | [15:0] | OTA_ADDR[15:0]                 | OTA address, 4K aligned                             | :ref:`OTA Firmware Update <ota_firmware_update>`           |
      +--------+--------+--------------------------------+-----------------------------------------------------+                                                            |
      | 0x36E  | [15:0] | BOOTLOADER[15:0]               | Bootloader version                                  |                                                            |
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
      | 0x370  | [31:0] | CRC0[31:0]                     | CRC check                                           | :ref:`CRC <otpc_usage_security_zone_config_area_crc>`      |
      +--------+--------+--------------------------------+                                                     |                                                            |
      | 0x374  | [31:0] | CRC1[31:0]                     |                                                     |                                                            |
      +--------+--------+--------------------------------+                                                     |                                                            |
      | 0x378  | [31:0] | CRC2[31:0]                     |                                                     |                                                            |
      +--------+--------+--------------------------------+                                                     |                                                            |
      | 0x37C  | [31:0] | CRC3[31:0]                     |                                                     |                                                            |
      +--------+--------+--------------------------------+-----------------------------------------------------+------------------------------------------------------------+
