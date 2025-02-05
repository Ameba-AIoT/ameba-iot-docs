.. tab :: RTL8720E

   Usually, system data has their initial value, and you can program specific bits according to your demands. Table below lists some scenarios that specific bits need to be programmed at your requirements.


   .. table::
      :width: 100%
      :widths: auto

      +--------+-----+--------------------+-----+---------------------------------------------+---------------------------------------------------------------------------------------+
      | Offset | Bit | Symbol             | INI | Description                                 | Scenarios                                                                             |
      +========+=====+====================+=====+=============================================+=======================================================================================+
      | 0x02   | [1] | SPIC_ADDR_4BYTE_EN | 0   | SPI Flash controller address 4-byte enable  | - If embedded Flash is used, ignore it.                                               |
      |        |     |                    |     |                                             |                                                                                       |
      |        |     |                    |     | 0: Disable                                  | - If external Flash is used, moreover, its size is larger than 16M bytes, program it. |
      |        |     |                    |     |                                             |                                                                                       |
      |        |     |                    |     | 1: Enable                                   |                                                                                       |
      +--------+-----+--------------------+-----+---------------------------------------------+---------------------------------------------------------------------------------------+
      | 0x03   | [1] | LOW_BAUD_LOG_EN    | 0   | LOGUART baud rate selection                 | If the LOGUART baud rate needs to be changed from 1.5Mbps to 115200bps, program it.   |
      |        |     |                    |     |                                             |                                                                                       |
      |        |     |                    |     | 0: 1.5Mbps                                  |                                                                                       |
      |        |     |                    |     |                                             |                                                                                       |
      |        |     |                    |     | 1: 115200bps                                |                                                                                       |
      +--------+-----+--------------------+-----+---------------------------------------------+---------------------------------------------------------------------------------------+
      | 0x03   | [0] | DIS_BOOT_LOG_EN    | 0   | Boot ROM log disable                        | If boot ROM log needs to be disabled, program it.                                     |
      |        |     |                    |     |                                             |                                                                                       |
      |        |     |                    |     | 0: Enable                                   |                                                                                       |
      |        |     |                    |     |                                             |                                                                                       |
      |        |     |                    |     | 1: Disable                                  |                                                                                       |
      +--------+-----+--------------------+-----+---------------------------------------------+---------------------------------------------------------------------------------------+
