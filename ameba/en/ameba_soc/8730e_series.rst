.. _8730e_series:

The RTL8730E is a Combo SoC that supports dual-band Wi-Fi 6 (2.4GHz + 5GHz) and Bluetooth 5.3 specifications, with the following fetures:

* Multi cores:

  - Dual-core CA32: Arm Cortex-A32 compatible instruction set, up to 1.2GHz
  - Real-M300: Arm Cortex-M55 compatible instruction set, up to 333MHz
  - Real-M200: Arm Cortex-M55 compatible instruction set, up to 40MHz

* Secure boot
* TrustZone-M
* Hardware crypto engine

The integrated dual-core Arm? Cortex-A32 CPU and RISC low-power MCU can meet a wide range of customer AIoT application needs.
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
      * |finger_icon| `Application Note <https://ameba-aiot.github.io/ameba-iot-docs/amebasmart/en/latest/application_note/index.html>`_
      * |finger_icon| `Wi-Fi Guide <https://ameba-aiot.github.io/ameba-iot-docs/amebasmart/en/latest/ameba/en/wifi/index.html>`_
      * |finger_icon| `AT Command  <https://ameba-aiot.github.io/ameba-iot-docs/amebasmart/en/latest/ameba/en/at_command/src/index.html>`_
      * |finger_icon| `Software Tools <https://ameba-aiot.github.io/ameba-iot-docs/amebasmart/en/latest/ameba/en/software_tools/index.html>`_
      * |finger_icon| `MP Tools <https://ameba-aiot.github.io/ameba-iot-docs/amebasmart/en/latest/ameba/en/mp_tools/src/index.html>`_