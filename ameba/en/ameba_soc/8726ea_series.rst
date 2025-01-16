.. _8726ea_series:

The RTL8726EA series is a Combo SoC that supports Wi-Fi 6 (2.4GHz) and Bluetooth (BLE 5.2) specifications, with the following fetures:

**System and Platform**

- Multi cores:

  - Real-M300:

    * Arm Cortex-M55 compatible instruction set
    * Running at a frequency of up to 400MHz
    * 16KB 4-way I-Cache, 16KB 4-way D-Cache

  - KR4:

    * RISC-V compatible instruction set
    * Running at a frequency of up to 400MHz
    * 16KB 4-way I-Cache, 16KB 4-way D-Cache

  - DSP:

    * Cadence Tensilica HiFi 5 DSP
    * Running at a frequency of up to 500MHz
    * 32KB 4-way I-Cache, 48KB 3-way D-Cache, 256KB DTCM RAM

- Memory:

  * 512KB on-chip SRAM
  * Embedded DQ8 PSRAM, up to 200MHz
  * Supports QSPI Flash, up to 100MHz

**Security**

- Secure boot
- Arm TrustZone-M
- True Random Number Generator (TRNG)
- Hardware crypto engine
- ECDSA engine
- Whole or partial Flash encryption
- Read Protection (RDP)
- JTAG/SWD password protection/forbidden
- 2K bytes OTP, up to 2K bits for users

**RF Features**

- Wi-Fi

  * 802.11 b/g/n/ax 1 x 1, 2.4GHz
  * Supports MCS0 - MCS9 20MHz bandwidth
  * Supports antenna diversity
  * Tx Power:

    - 11b 11Mbps: 20dBm
    - 11g 54Mbps: 19dBm (EVM < −25dB)
    - 11n MCS7-HT20: 18dBm (EVM < −27dB)
    - 11ax MCS9-HE20: 16dBm (EVM < −32dB)

  * Rx Sensitivity:

    - 11b 11Mbps: −91dBm
    - 11g 54Mbps: −78dBm
    - 11n MCS7-HT20: −76.5dBm
    - 11ax MCS9-HE20: −70.5dBm

- BT

  * Supports BLE 5.2
  * Supports both 500kbps and 125kbps LE-Coded PHY (long range)
  * Supports scatter-net (concurrent central mode and peripheral mode)
  * Supports SIG Mesh v1.0 and v1.1
  * Supports AoA and AoD

**Peripheral Interfaces**

- Flexible design of GPIO configuration
- Multi-communication interfaces: SPI x 2, UART x 5, I2C x 2
- Supports Real-Time Clock timer together with 15 timers
- Supports 8 channels of PWM timer and 1 capture timer
- Supports 6 channels of general 12-bit ADC
- Supports 9 channels of touch pad
- Supports 8 independent channels of GDMA
- Embeds a serial LEDC to control the external LED lamps
- Integrates a thermal detector to detect and monitor the real-time temperature inside the chip
- Integrated hardware crypto engine supports AES/SHA/ECDSA
- Integrated SPI Flash controller and PSRAM controller
- Integrated Audio Codec: 4 channels DMIC and 1 channel PDM out
- I2S x 2: up to 384kHz sampling rate

**Packaging**

- QFN68 package, 8mm x 8mm
- Operating temperature: -20°C ~ 85°C


**Applications**

With dual RISC cores running up to 400MHz, enhanced computing capability, stable security performance and abundant peripheral resources, the RTL8726EA series is widely used in various fields, such as:

- Home appliance
- Line controller
- BLE gateway
- Micro inverter
- Portable energy storage
- Home energy storage

**Product Comparison**

.. table::
   :width: 100%
   :widths: auto

   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | Package number    | Real-M300 | KR4       | DSP    | On-chip SRAM | TrustZone | Flash | PSRAM | Wi-Fi             | Bluetooth | Operating temperature | Package (mm)  |
   +===================+===========+===========+========+==============+===========+=======+=======+===================+===========+=======================+===============+
   | RTL8726EAM-VA4-CG | 400MHz    | 400MHz    | 500MHz | 512KB        | Y         | X     | 16MB  | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -20°C ~ 85°C          | QFN68 (8 x 8) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | RTL8726EAM-VA5-CG | 400MHz    | 400MHz    | 500MHz | 512KB        | Y         | X     | 32MB  | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -20°C ~ 85°C          | QFN68 (8 x 8) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+

.. admonition:: More Information

    .. hlist::
       :columns: 3

       * |finger_icon| `Datasheet <https://www.realmcu.com/zh/Home/DownloadList/2f034d6d-e85d-448d-9788-5c04afedb99d>`_
       * |finger_icon| `Application Note <https://ameba-aiot.github.io/ameba-iot-docs/RTL8726EA/en/latest/application_note/index.html>`_
       * |finger_icon| `Wi-Fi Guide <https://ameba-aiot.github.io/ameba-iot-docs/RTL8726EA/en/latest/ameba/en/wifi/index.html>`_
       * |finger_icon| `AT Command <https://ameba-aiot.github.io/ameba-iot-docs/RTL8726EA/en/latest/ameba/en/at_command/src/index.html>`_
       * |finger_icon| `Software Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8726EA/en/latest/ameba/en/software_tools/index.html>`_
       * |finger_icon| `MP Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8726EA/en/latest/ameba/en/mp_tools/src/index.html>`_