.. _ameba_soc_family:

Introduction
-------------
Realtek's Ameba SoC family is 32-bit microcontroller based on the Arm Cortex®-M/Arm Cortex®-A processors and RISC-V processor, designed to offer new degrees of freedom to MCU users.

It offers products combining very high performance, real-time capabilities, digital signal processing, low-power/low-voltage operation, and connectivity, while maintaining full integration and ease of development.


Series Comparison
--------------------
The detailed series comparison of different Ameba SoCs is listed below.
The functions, performance, power consumption, and applications of these Ameba SoCs vary. Please choose the appropriate SoC according to your own application needs.

AmebaDPlus
~~~~~~~~~~~
.. toggle::

   The AmebaDPlus (including RTL8721Dx/RTL8711Dx series) is a Combo SoC that supports dual-band Wi-Fi 4 (2.4GHz + 5GHz) and Bluetooth (BLE 5.0) specifications.

   With excellent ultra-low power consumption, enhanced encryption strategy (PSA Level 2), and abundant peripheral resources, it is widely used in various fields, such as:
   
   - Smart home appliance

   - Line controller

   - Smart door lock

   - Battery camera

   - Smart remote controller

   - Wi-Fi speaker

   - Wi-Fi Full MAC NIC

   - BLE gateway

   - Smart POS

   - ...

   .. table::
      :width: 100%
      :widths: auto

      +-----------+------------------------+-----------+-----------+-----------+----------+-----------+-------------------+-----------+-------------------+
      | Series    | Package (mm)           | Real-M300 | Real-M200 | TrustZone | NOR Flash| PSRAM     | Wi-Fi             | Bluetooth | Operating voltage | 
      +===========+========================+===========+===========+===========+==========+===========+===================+===========+===================+
      | RTL8721Dx | | - QFN48 (6 x 6)      | 345MHz    | 115MHz    | √         | | - 0MB  | | - 0MB   | | Wi-Fi 4         | BLE 5.0   | | - 2.97V ~ 3.63V |
      |           | | - QFN68 (8 x 8)      |           |           |           | | - 4MB  | | - 4MB   | | (2.4GHz + 5GHz) |           | | - 1.71V ~ 3.63V |
      |           | | - BGA100 (5.1 x 5.1) |           |           |           |          | | - 8MB   |                   |           |                   |
      +-----------+------------------------+-----------+-----------+-----------+----------+-----------+-------------------+-----------+-------------------+
      | RTL8711Dx | | - QFN48 (6 x 6)      | 345MHz    | 115MHz    | x         | | - 0MB  | | - 0MB   | | Wi-Fi 4         | BLE 5.0   | 2.97V ~ 3.63V     |
      |           | | - QFN68 (8 x 8)      |           |           |           | | - 4MB  | | - 4MB   | | (2.4GHz + 5GHz) |           |                   |
      |           |                        |           |           |           |          | | - 8MB   |                   |           |                   |
      +-----------+------------------------+-----------+-----------+-----------+----------+-----------+-------------------+-----------+-------------------+

   .. note:: 

      - If the memory (Flash or PSRAM) size is 0MB, it means that there is no such type of memory embedded in the corresponding IC.

      - For different series and package numbers, the embedded memory can be only Flash or only PSRAM, or none of them. Refer to Datasheet for more information.

AmebaLite
~~~~~~~~~~~
.. toggle::

   The AmebaLite (including RTL8726EA/RTL8713EC/RTL8720EA/RTL8710EC series) is a Combo SoC that supports Wi-Fi 6 (2.4GHz) and Bluetooth (BLE 5.2) specifications.

   With dual RISC cores running up to 400MHz, enhanced computing capability, stable security performance and abundant peripheral resources, it is widely used in various fields, such as:

   - Smart home appliance

   - Line controller

   - BLE gateway

   - Micro inverter

   - Portable energy storage

   - Home energy storage

   - ...

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

   .. note:: 
      
      - If the memory (Flash or PSRAM) size is 0MB, it means that there is no such type of memory embedded in the corresponding IC.

      - For different series and package numbers, the embedded memory can be only Flash or only PSRAM. Refer to Datasheet for more information.

AmebaSmart
~~~~~~~~~~~
.. toggle::

   The AmebaSmart (including RTL8730E series) is a Combo SoC that supports dual-band Wi-Fi 6 (2.4GHz + 5GHz) and Bluetooth 5.3 specifications.

   The integrated dual-core Arm© Cortex-A32 CPU and RISC low-power MCU can meet a wide range of customer AIoT application needs.
   Combined with abundant peripheral interfaces, it has been successfully used in various products, such as:

   - Smart speaker

   - Central control panel

   - Home theater

   - Wireless gateway

   - Smart kitchen appliance

   - Industrial control panel

   - ...

   .. table::
      :width: 100%
      :widths: auto

      +----------+-------------------------+-------------+-----------+-----------+-----------+---------+-------------------+-------------------+------------------+
      | Series   | Package (mm)            | CA32        | Real-M300 | Real-M200 | NOR Flash | PSRAM   | DDR               | Wi-Fi             | Bluetooth        |
      +==========+=========================+=============+===========+===========+===========+=========+===================+===================+==================+
      | RTL8730E | | - QFN100 (10 x 10)    | | - 1.2GHz  | 333MHz    | 40MHz     | | - 0MB   | | - 0MB | | - 0MB           | | Wi-Fi 6         | | Bluetooth 5.3  |
      |          | | - DR-QFN144 (11 x 11) | | - 1.32GHz |           |           | | - 8MB   | | - 8MB | | - 64MB (DDR2)   | | (2.4GHz + 5GHz) | | (BR/EDR + BLE) |
      |          |                         |             |           |           | | - 16MB  |         | | - 128MB (DDR2)  |                   |                  |
      |          |                         |             |           |           | | - 32MB  |         | | - 256MB (DDR3L) |                   |                  |
      +----------+-------------------------+-------------+-----------+-----------+-----------+---------+-------------------+-------------------+------------------+

   .. note::

      - The CA32 can run at a frequency of up to 1.32GHz (embedded DDR) or 1.2GHz (embedded PSRAM), depending on the in-package type of DDR/PSRAM.

      - If the memory (Flash or PSRAM/DDR) size is 0MB, it means that there is no such type of memory embedded in the corresponding IC.

      - For different package numbers, the embedded memory is also different. Refer to Datasheet for more information.

