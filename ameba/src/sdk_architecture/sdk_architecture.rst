.. _sdk_architecture:

Introduction
--------------
The SDK consists of four parts, and the contents and descriptions of each part are summarized in the following sections.

- project
- component
- tools
- doc

.. tabs::

   .. include:: sdk_architecture_introduction_21Dx.rst
   .. include:: sdk_architecture_introduction_26E20E.rst
   .. include:: sdk_architecture_introduction_30E.rst


project
--------------
.. tabs::

   .. include:: sdk_architecture_project_21Dx.rst
   .. include:: sdk_architecture_project_26E20E.rst
   .. include:: sdk_architecture_project_30E.rst

component
------------------
.. table::
   :width: 100%
   :widths: auto

   +-------------+-----------------------------------------------------------------------------------------------------+
   | Items       | Description                                                                                         |
   +=============+=====================================================================================================+
   | at_cmd      | AT commands                                                                                         |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | audio       | Drivers of alc5616/alc5640/alc5651/alc5660/alc5679/alc5680/sgtl5000                                 |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | bluetooth   | BT related source code and library                                                                  |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | example     | Utility examples: audio/network/ota/usb/…                                                           |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | file_system | File system: fatfs/littlefs/ftl/kv/vfs…                                                             |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | lwip        | LWIP APIs and driver codes                                                                          |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | network     | - cJSON                                                                                             |
   |             | - coap                                                                                              |
   |             | - dhcp                                                                                              |
   |             | - http2                                                                                             |
   |             | - httpc                                                                                             |
   |             | - httpd                                                                                             |
   |             | - mDNS                                                                                              |
   |             | - mqtt                                                                                              |
   |             | - ping                                                                                              |
   |             | - iperf                                                                                             |
   |             | - sntp                                                                                              |
   |             | - websocket                                                                                         |
   |             | - xml                                                                                               |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | os          | FreeRTOS source codes                                                                               |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | soc         | - app: monitor and shell                                                                            |
   |             | - bootloader                                                                                        |
   |             | - cmsis: Arm headers, including Arm CPU registers and operations                                    |
   |             | - cmsis-dsp: Arm CMSIS-DSP source codes                                                             |
   |             | - fwlib: user configuration, low level drivers, such as Audio Codec/SPORTS/UART/I2C/SPI/Timer/PWM … |
   |             | - img3: files for image3 (if exists)                                                                |
   |             | - hal: mbed APIs source codes, header files                                                         |
   |             | - misc: misc file like crashdump/ota/pmu …                                                          |
   |             | - swlib: standard software library supported by ROM code, such as _memcpy/_memcmp …                 |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | ssl         | mbed TLS                                                                                            |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | utils       | IPC: util for multicore communication                                                               |
   +-------------+-----------------------------------------------------------------------------------------------------+
   | wifi        | - Wi-Fi driver interface                                                                            |
   |             | - Wi-Fi promisc mode interface                                                                      |
   |             | - Wi-Fi fast connection                                                                             |
   +-------------+-----------------------------------------------------------------------------------------------------+

tools
----------
.. table::
   :width: 100%
   :widths: auto

   +-----------------------+------------------------------------------------------------------+
   | Items                 | Description                                                      |
   +=======================+==================================================================+
   | TraceTool             | Tools used to print logs and send commands                       |
   +-----------------------+------------------------------------------------------------------+
   | ImageTool             | Image tool                                                       |
   +-----------------------+------------------------------------------------------------------+
   | DownloadServer        | Used to send image to the device based on socket by OTA function |
   +-----------------------+------------------------------------------------------------------+
   | DownloadServer (HTTP) | Used to send image to the device based on HTTP by OTA function   |
   +-----------------------+------------------------------------------------------------------+
   | iperf                 | iperf for Wi-Fi performance test                                 |
   +-----------------------+------------------------------------------------------------------+
   | littlefs              | Tools to make littlefs file system                               |
   +-----------------------+------------------------------------------------------------------+

Critical Header Files
------------------------------------------
.. tabs::

   .. include:: sdk_architecture_critical_files_21Dx.rst
   .. include:: sdk_architecture_critical_files_26E20E.rst
   .. include:: sdk_architecture_critical_files_30E.rst