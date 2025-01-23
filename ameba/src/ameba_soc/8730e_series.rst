.. _8730e_series:

The RTL8730E is a Combo SoC that supports dual-band Wi-Fi 6 (2.4GHz + 5GHz) and Bluetooth 5.3 specifications, with the following fetures:

**System and Platform**

- Multi-Cores:

  - Dual-core Arm Cortex-A32:

    - Arm Cortex-A32 compatible instruction set
    - Running at a frequency of up to 1.32GHz
    - 32KB 2-way I-Cache, 32KB 4-way D-Cache
    - 256KB 8-way L2 Cache

  - Real-M300:

    - Arm Cortex-M55 compatible instruction set
    - Running at a frequency of up to 333MHz
    - 16KB 4-way I-Cache, 32KB 4-way D-Cache

  - Real-M200:

    - Arm Cortex-M23 compatible instruction set
    - Running at a frequency of up to 40MHz
    - 16KB 2-way I-Cache, 8KB 2-way D-Cache

- Memory:

  - Supports NOR or NAND Flash
  - Supports PSRAM or DDR Extended Memory

**Security**

- Secure boot
- Arm TrustZone and TrustZone-M
- True Random Number Generator (TRNG)
- Hardware crypto engine supporting AES and SHA algorithms
- ECDSA/EdDSA/RSA engines
- Whole or partial Flash encryption
- Read Protection (RDP)
- JTAG/SWD password protection/forbidden
- 2K bytes OTP, up to 2K bits for users

**RF Features**

- Wi-Fi

  - 802.11 a/b/g/n/ax 1 x 1, 2.4GHz + 5GHz
  - Supports MCS0 – MCS9 20MHz bandwidth
  - Power-saving mechanism
  - Supports antenna diversity

- BT

  - Supports Bluetooth 5.3:

    - BR/EDR
    - BLE

  - Supports BLE Long Range
  - Separated antenna for Bluetooth
  - Supports scatter-net (concurrent central mode and peripheral mode)
  - Supports SIG Mesh v1.0 and v1.1
  - Supports AoA and AoD
  - Supports LE Audio (both CIS and BIS)

**Peripheral Interfaces**

- Flexible design of GPIO configuration
- Multi-communication interfaces: SPI x 2, UART x 4, I2C x 3
- Hardware IR transceiver can easily adapt to various IR protocols
- Supports Real-Time Clock timer together with 12 basic timers
- Supports 6 channels of PWM timer and 1 capture timer
- Supports 6 channels of general 12-bit ADC and 1 channel of VBAT
- Supports 9 channels of touch pad
- Supports 8 independent channels of GDMA
- Supports USB 2.0 OTG
- Integrates SD host controller to access SD card and eMMC device
- Embeds a serial LEDC to control the external LED lamps
- Integrates a thermal detector to detect and monitor the real-time temperature inside the chip
- 2-lane MIPI-DSI interface with D-PHY and the maximum bit rate of 1Gbps per lane
- Audio Codec:

  - 5 channels ADC or 8 channels DMIC
  - 2 channels DAC and headphone amplifier

- I2S x 2: up to 384kHz sampling rate
- Low-power VAD

**Packaging**

- QFN100 package, 10mm x 10mm
- DR-QFN144 package, 11mm x 11mm

**Applications**

The integrated dual-core Arm? Cortex-A32 CPU and RISC low-power MCU can meet a wide range of customer AIoT application needs.
Combined with abundant peripheral interfaces, the RTL8730E series has been successfully used in various products, such as:

- Smart speaker
- Central control panel
- Home theater
- Wireless gateway
- Smart kitchen appliance
- Industrial control panel

**Product Comparison**

.. table::
   :width: 100%
   :widths: auto

   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | Package number    | CA32  | Real-M300 | Real-M300 | On-chip SRAM | TrustZone | NOR Flash  | PSRAM | DDR          | Wi-Fi                   | Bluetooth    | GPIO  | Package (mm)        |
   +===================+=======+===========+===========+==============+===========+============+=======+==============+=========================+==============+=======+=====================+
   | RTL8730EAH-VA3-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 8MB        | 8MB   | X            | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730EAH-VD3-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 16MB       | 8MB   | X            | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730EAH-VH6-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 32MB       | X     | 64MB (DDR2)  | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730EAM-VA6-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | X          | X     | 64MB (DDR2)  | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730ELH-VA3-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 8MB        | 8MB   | X            | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 61    | DR-QFN144 (11 x 11) |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730ELM-VA7-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | X          | X     | 128MB (DDR2) | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 61    | DR-QFN144 (11 x 11) |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730ELM-VA8-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | X          | X     | 256MB (DDR3L)| Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 61    | DR-QFN144 (11 x 11) |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+


.. admonition:: More Information

   .. hlist::
      :columns: 3

      * |finger_icon| `Datasheet <https://www.realmcu.com/zh/Home/DownloadList/20d00b7b-4a60-4ece-9bca-820267a0af53>`_
      * |finger_icon| `Application Note <https://ameba-aiot.github.io/ameba-iot-docs/RTL8730E/en/latest/application_note/index.html>`_
      * |finger_icon| `Wi-Fi Guide <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/wifi/wifi_guide_index.html>`_
      * |finger_icon| `AT Command <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/at_command/at_command_index.html>`_
      * |finger_icon| `Software Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/tools/tools_index.html>`_
      * |finger_icon| `MP Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/mptools/mptools_index.html>`_