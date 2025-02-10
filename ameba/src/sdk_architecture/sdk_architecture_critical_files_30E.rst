.. tab:: RTL8730E

   .. table::
      :width: 100%
      :widths: auto

      +------------------+-----------------------------------------------------------------------------+--------------------------------------------------+
      | Items            | Description                                                                 | Location                                         |
      +==================+=============================================================================+==================================================+
      | basic_types.h    | - SUCCESS/FAIL                                                              | {SDK}\component\soc\amebasmart\fwlib\include     |
      |                  | - TRUE/FALSE                                                                |                                                  |
      |                  | - ENABLE/DISABLE                                                            |                                                  |
      |                  | - ON/OFF                                                                    |                                                  |
      |                  | - NULL                                                                      |                                                  |
      |                  | - u8/u16/u32/u64                                                            |                                                  |
      |                  | - BOOL                                                                      |                                                  |
      |                  | - BIT *x*                                                                   |                                                  |
      |                  | - ...                                                                       |                                                  |
      +------------------+-----------------------------------------------------------------------------+                                                  |
      | section_config.h | Section definition used in link script:                                     |                                                  |
      |                  |                                                                             |                                                  |
      |                  | - BOOT_RAM_DATA_SECTION                                                     |                                                  |
      |                  | - IMAGE2_RAM_TEXT_SECTION                                                   |                                                  |
      |                  | - ...                                                                       |                                                  |
      +------------------+-----------------------------------------------------------------------------+                                                  |
      | ameba_soc.h      | Peripheral header files for raw APIs                                        |                                                  |
      |                  |                                                                             |                                                  |
      |                  | Raw APIs have more features than mbed APIs, which just have basic features. |                                                  |
      |                  |                                                                             |                                                  |
      |                  | If you want to use raw APIs, this header must be included.                  |                                                  |
      +------------------+-----------------------------------------------------------------------------+--------------------------------------------------+
      | mbed API headers | Peripheral header files for mbed APIs.                                      | {SDK}\component\soc\amebasmart\hal               |
      |                  |                                                                             |                                                  |
      |                  | If you want to use mbed APIs, related headers must be included.             |                                                  |
      +------------------+-----------------------------------------------------------------------------+--------------------------------------------------+
