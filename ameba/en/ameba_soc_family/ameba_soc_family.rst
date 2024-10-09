.. _ameba_soc_family:

Introduction
-------------
Realtek's Ameba SoC family is 32-bit microcontroller based on the Arm Cortex®-M/Arm Cortex®-A processors and RISC-V processor, designed to offer new degrees of freedom to MCU users.

It offers products combining very high performance, real-time capabilities, digital signal processing, low-power/low-voltage operation, and connectivity, while maintaining full integration and ease of development.


Series Comparison
--------------------
The detailed series comparison of different Ameba SoCs is listed below.
The functions, performance, power consumption, and applications of these Ameba SoCs vary. Please choose the appropriate SoC according to your own application needs.

.. tabs::

   .. tab:: AmebaDPlus

      .. table::
         :width: 100%
         :widths: auto

         +-----------+------------------------+-----------+-----------+-----------+----------+-----------+-------------------+-----------+-------------------+-------------------+
         | Series    | Package (mm)           | Real-M300 | Real-M200 | TrustZone | NOR Flash| PSRAM     | Wi-Fi             | Bluetooth | Operating voltage | Application       | 
         +===========+========================+===========+===========+===========+==========+===========+===================+===========+===================+===================+
         | RTL8721Dx | | - QFN48 (6 x 6)      | 345MHz    | 115MHz    | √         | | - 0MB  | | - 0MB   | | Wi-Fi 4         | BLE 5.0   | | - 2.97V ~ 3.63V |                   |
         |           | | - QFN68 (8 x 8)      |           |           |           | | - 4MB  | | - 4MB   | | (2.4GHz + 5GHz) |           | | - 1.71V ~ 3.63V |                   |
         |           | | - BGA100 (5.1 x 5.1) |           |           |           |          | | - 8MB   |                   |           |                   |                   |
         +-----------+------------------------+-----------+-----------+-----------+----------+-----------+-------------------+-----------+-------------------+-------------------+
         | RTL8711Dx | | - QFN48 (6 x 6)      | 345MHz    | 115MHz    | x         | | - 0MB  | | - 0MB   | | Wi-Fi 4         | BLE 5.0   | 2.97V ~ 3.63V     |                   |
         |           | | - QFN68 (8 x 8)      |           |           |           | | - 4MB  | | - 4MB   | | (2.4GHz + 5GHz) |           |                   |                   |
         |           |                        |           |           |           |          | | - 8MB   |                   |           |                   |                   |
         +-----------+------------------------+-----------+-----------+-----------+----------+-----------+-------------------+-----------+-------------------+-------------------+

      .. note:: 
         
         - If the memory (Flash or PSRAM) size is 0MB, it means that there is no such type of memory embedded in the corresponding IC.

         - For different series and package numbers, the embedded memory can be only Flash or only PSRAM, or none of them. Refer to Datasheet for more information.

   .. tab:: AmebaLite

      .. list-table::
         :header-rows: 1
         :width: 100%
         :widths: auto

         * - Series
           - Package (mm)
           - Real-M300
           - KR4
           - HiFi 5 (DSP)
           - TrustZone
           - On-chip SRAM
           - NOR Flash
           - PSRAM
           - Wi-Fi
           - Bluetooth
           - Operating temperature
           - Application
         * - RTL8726EA
           - QFN68 (8 x 8)
           - 400MHz
           - 400MHz
           - 500MHz
           - √
           - 512KB
           - x
           - 
             - 16MB
             - 32MB
           - Wi-Fi 6 (2.4GHz)
           - BLE 5.2 (BR/EDR + BLE)
           - -20℃ ~ 85℃
           - 
         * - RTL8713EC
           - QFN68 (8 x 8)
           - 400MHz
           - 400MHz
           - 500MHz
           - x
           - 512KB
           - x
           - 
             - 16MB
             - 32MB
           - Wi-Fi 6 (2.4GHz)
           - BLE 5.2 (BR/EDR + BLE)
           - -20℃ ~ 85℃
           - 
         * - RTL8720EA
           - QFN48 (6 x 6)
           - 400MHz
           - 400MHz
           - x
           - √
           - 768KB
           - 
             - 0MB
             - 4MB
             - 8MB
           - 
             - 0MB
             - 4MB
           - Wi-Fi 6 (2.4GHz)
           - BLE 5.2 (Only BLE)
           - 
             - -20℃ ~ 85℃
             - -40℃ ~ 105℃
           - 
         * - RTL8710EC
           - QFN48 (6 x 6)
           - 400MHz
           - 400MHz
           - x
           - x
           - 512KB
           - 
             - 0MB
             - 4MB
             - 8MB
           - 
             - 0MB
             - 4MB
           - Wi-Fi 6 (2.4GHz)
           - BLE 5.2 (Only BLE)
           - 
             - -20℃ ~ 85℃
             - -40℃ ~ 105℃
           - 

      .. note:: 
         
         - If the memory (Flash or PSRAM) size is 0MB, it means that there is no such type of memory embedded in the corresponding IC.

         - For different series and package numbers, the embedded memory can be only Flash or only PSRAM. Refer to Datasheet for more information.

   .. tab:: AmebaSmart

      .. table::
         :width: 100%
         :widths: auto

         +----------+-------------------------+-------------+-----------+-----------+-----------+---------+-------------------+-------------------+------------------+-------------------+
         | Series   | Package (mm)            | CA32        | Real-M300 | Real-M200 | NOR Flash | PSRAM   | DDR               | Wi-Fi             | Bluetooth        | Application       |
         +==========+=========================+=============+===========+===========+===========+=========+===================+===================+==================+===================+
         | RTL8730E | | - QFN100 (10 x 10)    | | - 1.2GHz  | 333MHz    | 40MHz     | | - 0MB   | | - 0MB | | - 0MB           | | Wi-Fi 6         | | Bluetooth 5.3  |                   |
         |          | | - DR-QFN144 (11 x 11) | | - 1.32GHz |           |           | | - 8MB   | | - 8MB | | - 64MB (DDR2)   | | (2.4GHz + 5GHz) | | (BR/EDR + BLE) |                   |
         |          |                         |             |           |           | | - 16MB  |         | | - 128MB (DDR2)  |                   |                  |                   |
         |          |                         |             |           |           | | - 32MB  |         | | - 256MB (DDR3L) |                   |                  |                   |
         +----------+-------------------------+-------------+-----------+-----------+-----------+---------+-------------------+-------------------+------------------+-------------------+

      .. note:: 

         - The CA32 can run at a frequency of up to 1.32GHz (embedded DDR) or 1.2GHz (embedded PSRAM), depending on the in-package type of DDR/PSRAM.
         
         - If the memory (Flash or PSRAM/DDR) size is 0MB, it means that there is no such type of memory embedded in the corresponding IC.

         - For different package numbers, the embedded memory is also different. Refer to Datasheet for more information.

