.. _8711dx_series:

The RTL8711Dx series is a Combo SoC that supports dual-band Wi-Fi 4 (2.4GHz + 5GHz) and Bluetooth (BLE 5.0) specifications, with the following fetures:

**System and Platform**

- Dual cores:

  - Real-M300:

    - Arm Cortex-M55 compatible instruction set
    - Running at a frequency of up to 345MHz
    - 16KB 4-way I-Cache, 16KB 4-way D-Cache

  - Real-M200:

    - Arm Cortex-M23 compatible instruction set
    - Running at a frequency of up to 115MHz
    - 16KB 4-way I-Cache, 16KB 4-way D-Cache

- Memory:

  - 512KB on-chip SRAM
  - Embedded DQ8 PSRAM, up to 200MHz
  - Supports QSPI Flash, up to 104MHz

**Security**

- Secure boot
- True Random Number Generator (TRNG)
- Hardware crypto engine supporting AES and SHA algorithms
- Whole or partial Flash encryption
- Read Protection (RDP)
- JTAG/SWD password protection/forbidden
- 2K bytes OTP, up to 2K bits for users

**RF Features**

- Wi-Fi

  * 802.11 a/b/g/n 1 x 1, 2.4GHz + 5GHz
  * Supports MCS0 – MCS7 40MHz bandwidth
  * Power-saving mechanism
  * Supports antenna diversity

  * Low power:

    * WoWLAN mode:

      * DTIM=10: 84µA (3.3V, 2.4G)
      * DTIM=10: 74µA (3.3V, 5G)

    * Deep-sleep mode:

      * 12.2µA (3.3V, 25°C)
      * 10.4µA (1.8V, 25°C)

- BT

  * Supports BLE 5.0
  * Supports BLE Long Range
  * Supports piconets in a scatter-net (up to 8 master roles and 3 slave roles)
  * Tx power: -10dBm ~ 10dBm, 8dBm typically
  * Rx sensitivity: -99dBm@LE1M

**Peripheral Interfaces**

- Flexible design of GPIO configuration
- Multi-communication interfaces: SPI x 2, UART x 4, I2C x 2
- Hardware Key-Scan interface supports up to 8*8 (64) keys
- Hardware IR transceiver can easily adapt to various IR protocols
- Supports Real-Time Clock timer together with 10 basic timers
- Supports 8 channels of PWM timer and 1 capture timer
- Supports 7 channels of general 12-bit ADC and 1 channel of VBAT
- Supports 4 channels of touch pad
- Supports 8 independent channels of GDMA
- Supports USB 2.0 full-speed device mode
- Supports SDIO device with 1-bit and 4-bit mode
- Embeds a serial LEDC to control the external LED lamps
- Integrated Pixel Processing Engine (PPE) to process pixel data faster
- Integrated OSPI display interface supports screens with OSPI/QSPI/SPI interfaces
- Integrated audio codec supports 2 channels DMIC interface
- I2S x 2: up to 384kHz sampling rate

**Packaging**

- QFN48 package, 6mm x 6mm
- QFN68 package, 8mm x 8mm
- BGA100 package, 5.1mm x 5.1mm
- Operating voltage:

  * Standard voltage: 2.97V ~ 3.63V
  * Wide-range voltage: 1.71V ~ 3.63V

- Operating temperature:

  * Standard temperature: -20°C ~ 85°C
  * Wide-range temperature: -40°C ~ 105°C

**Applications**

With excellent ultra-low power consumption, enhanced encryption strategy (PSA Level 2), and abundant peripheral resources, the RTL8711Dx series is widely used in various fields, such as:

- Smart home appliance
- Line controller
- Smart door lock
- Battery camera
- Smart remote controller
- Wi-Fi speaker
- Wi-Fi FullMAC NIC
- BLE gateway
- Smart POS

**Product Comparison**

.. table::
   :width: 100%
   :widths: auto

   +-------------------+-----------+-----------+--------------+-----------+-------+-------+--------------------------+-----------+-------------------+----------------------+--------------------+
   | Part number       | Real-M300 | Real-M200 | On-chip SRAM | TrustZone | Flash | PSRAM | Wi-Fi                    | Bluetooth | Operating voltage | Operating temperature| Package (mm)       |
   +===================+===========+===========+==============+===========+=======+=======+==========================+===========+===================+======================+====================+
   | RTL8711DAN-VA0-CG | 345MHz    | 115MHz    | 512KB        | X         | X     | X     | Wi-Fi 4 (2.4GHz + 5GHz)  | BLE 5.0   | 2.97V ~ 3.63V     | -20°C ~ 85°C         | QFN48 (6 x 6)      |
   +-------------------+-----------+-----------+--------------+-----------+-------+-------+--------------------------+-----------+-------------------+----------------------+--------------------+
   | RTL8711DAF-VA2-CG | 345MHz    | 115MHz    | 512KB        | X         | 4MB   | X     | Wi-Fi 4 (2.4GHz + 5GHz)  | BLE 5.0   | 2.97V ~ 3.63V     | -20°C ~ 85°C         | QFN48 (6 x 6)      |
   +-------------------+-----------+-----------+--------------+-----------+-------+-------+--------------------------+-----------+-------------------+----------------------+--------------------+
   | RTL8711DAM-VA2-CG | 345MHz    | 115MHz    | 512KB        | X         | X     | 4MB   | Wi-Fi 4 (2.4GHz + 5GHz)  | BLE 5.0   | 2.97V ~ 3.63V     | -20°C ~ 85°C         | QFN48 (6 x 6)      |
   +-------------------+-----------+-----------+--------------+-----------+-------+-------+--------------------------+-----------+-------------------+----------------------+--------------------+
   | RTL8711DCF-VA2-CG | 345MHz    | 115MHz    | 512KB        | X         | 4MB   | X     | Wi-Fi 4 (2.4GHz + 5GHz)  | BLE 5.0   | 2.97V ~ 3.63V     | -20°C ~ 85°C         | QFN68 (8 x 8)      |
   +-------------------+-----------+-----------+--------------+-----------+-------+-------+--------------------------+-----------+-------------------+----------------------+--------------------+
   | RTL8711DCM-VA2-CG | 345MHz    | 115MHz    | 512KB        | X         | X     | 4MB   | Wi-Fi 4 (2.4GHz + 5GHz)  | BLE 5.0   | 2.97V ~ 3.63V     | -20°C ~ 85°C         | QFN68 (8 x 8)      |
   +-------------------+-----------+-----------+--------------+-----------+-------+-------+--------------------------+-----------+-------------------+----------------------+--------------------+
   | RTL8711DCM-VA3-CG | 345MHz    | 115MHz    | 512KB        | X         | X     | 8MB   | Wi-Fi 4 (2.4GHz + 5GHz)  | BLE 5.0   | 2.97V ~ 3.63V     | -20°C ~ 85°C         | QFN68 (8 x 8)      |
   +-------------------+-----------+-----------+--------------+-----------+-------+-------+--------------------------+-----------+-------------------+----------------------+--------------------+


.. admonition:: More Information

   .. hlist::
      :columns: 3

      * |finger_icon| `Datasheet <https://www.realmcu.com/zh/Home/DownloadList/add965ea-d661-4a63-9514-d18b6912f8ab>`_
      * |finger_icon| `Application Note <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/application_note/index.html>`_
      * |finger_icon| `Wi-Fi Guide <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/en/wifi/index.html>`_
      * |finger_icon| `AT Command <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/en/at_command/src/index.html>`_
      * |finger_icon| `Software Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/en/software_tools/index.html>`_
      * |finger_icon| `MP Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/en/mp_tools/src/index.html>`_