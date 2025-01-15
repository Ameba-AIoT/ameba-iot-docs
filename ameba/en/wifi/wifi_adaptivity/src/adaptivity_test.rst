.. _adaptivity_test:

Introduction
-------------
Standards
~~~~~~~~~
Adaptivity is an automatic channel access mechanism by which a device avoids transmission in a channel in the presence of transmission in that channel. Any equipment with maximum declared RF output power level greater than 10dBm e.i.r.p. should apply Adaptivity mechanism.

ETSI has mandated Adaptivity certification since December 31, 2017. The related Standards are *ETSI EN 300 328 V2.2.2 (for 2G)* and *ETSI EN 301 893 V2.1.1 (for 5G)*. Steps of Adaptivity test are defined by ETSI as follows:

1. Connect the test object and the companion object, and the traffic is transmitted.

2. Add the interference signal, blocking signal of out of band is also necessary for 2G.

3. The test object stops TX.

4. Only allow short control signaling transmission (e.g. ACK) for the companion object.

   - For 2G pass criteria, the TX duty cycle cannot exceed 10% within 50ms.

   - For 5G Pass criteria, the TX duty cycle within 50ms cannot exceed 5%.

5. Repeat the above steps for different channels, bandwidths and modes.

Interference Power
~~~~~~~~~~~~~~~~~~~~~~~~~
For interference signal power, the energy formula to be detected by ETSI is as follows. Additionally, the interference signal must exceed BW of the test object and have a 100% duty cycle.

- 2G: TL = -70dBm/MHz + 10*log10(100mW/Pout)

- 5G: TL = -75dBm/MHz

.. note:: Pout is the maximum TX power of test object.

Ameba is tested with the worst case in LAB.

- 2G: TL = -70dBm/MHz

- 5G: TL = -75dBm/MHz

The following table is the interference power with different frequencies and bandwidths.

.. table:: Interference power with different frequencies and bandwidths
   :width: 100%
   :widths: auto

   +-------------------------+---------------------+--------------------------------------------+
   |                         | 2G                  | 5G                                         |
   |                         +----------+----------+----------+----------+----------+-----------+
   | Item                    | 20MHZ    | 40MHZ    | 20MHZ    | 40MHZ    | 80MHZ    | 160MHZ    |
   +=========================+==========+==========+==========+==========+==========+===========+
   | Interference Power (dBm)| -57      | -54      | -62      | -59      | -56      | -53       |
   +-------------------------+----------+----------+----------+----------+----------+-----------+

When the interference power is greater than the threshold, the MAC is told to stop TX.

The following section illustrates software configuration, you can refer it to set EDCCA mode as *RTW_EDCCA_ADAPT* and adjust EDCCA threshold to pass Adaptivity test. 

Software Configuration
-----------------------
EDCCA Mode
~~~~~~~~~~~
Ameba supports four EDCCA mode types:

* **RTW_EDCCA_NORM**: Set EDCCA threshold dynamically with reference to current RSSI, default value

* **RTW_EDCCA_ADAPT**: Adaptivity certification for ETSI, fixed threshold, threshold can be modified by commands

* **RTW_EDCCA_CS**: Carrier Sense, Japan's interference avoidance laws

* **RTW_EDCCA_DISABLE**: MAC TX without checking EDCCA signal

There are two major differences between Adaptivity test (mode 1) and Carrier Sense (mode 2):

* The types of test interference required by ETSI regulations are AWGN White noise, remove preamble's OFDM packet and LTE interference. Carrier Sense is single tone.

* The interference retreat energy required by Carrier Sense is relatively high, which is -50dBm, and the interference energy threshold of ETSI is lower than that of carrier sense.

The EDCCA mode types are defined in ``component/wifi/driver/include/rtw_wifi_defs.h``.

.. code-block:: c

   /*The enumeration lists the edcca mode types*/
   enum rtw_edcca_mode {
   RTW_EDCCA_NORM = 0, /* normal*/
   RTW_EDCCA_ADAPT = 1, /* Adaptivity, ETSI*/
   RTW_EDCCA_CS = 2, /*carrier sense, Japan*/
   RTW_EDCCA_DISABLE = 9, /*disable*/
   }

Static Adjustment
^^^^^^^^^^^^^^^^^
The file for setting the EDCCA mode is in the following path, and it will be written statically during Wi-Fi initialization process.

- FreeRTOS:

  * RTL8730E: ``/component/soc/amebasmart/usrcfg/Ameba_wificfg.c``

  * RTL8726EA/RTL8713EC/RTL8720EA/RTL8710EC: ``/component/soc/amebalite/usrcfg/Ameba_wificfg.c``

  * RTL8721Dx/RTL8711Dx: ``/component/soc/amebadplus/usrcfg/Ameba_wificfg.c``

- Linux:

  * RTL8730E: ``/firmware/component/wifi/cfg80211_fullmac/rtl8730e/ipc/Ameba_wificfg.c``

Function name: :func:`wifi_set_user_config`

* For ETSI Adaptivity certification, set EDCCA mode as *RTW_EDCCA_ADAPT*

  .. code-block:: c
  
     wifi_user_config_edcca_mode = RTW_EDCCA_ADAPT;

* For Carrier Sense, set EDCCA mode as *RTW_EDCCA_CS*

  .. code-block:: c
    
     wifi_user_config_edcca_mode = RTW_EDCCA_CS;

Dynamic Adjustment
^^^^^^^^^^^^^^^^^^
In addition, EDCCA mode can also be set dynamically by commands.

.. important:: The dynamic adjustment of EDCCA mode is supported **only** on Linux.

- Linux:

  .. toggle::
  
     The EDCCA mode has been added in ``/proc/net/rtl8730e/wlan0/edcca_mode``. You can write or read it by the following command:
     
     .. code-block::
     
        echo n > /proc/net/rtl8730e/wlan0/edcca_mode
        cat /proc/net/rtl8730e/wlan0/edcca_mode
     
     .. note::
        n is in [0, 1, 2, 9].
     
     For example (Adaptivity certification):
     
     .. code-block::
     
        / # echo 1 > /proc/net/rtl8730e/wlan0/edcca_mode
        / # cat /proc/net/rtl8730e/wlan0/edcca_mode
        1

- FreeRTOS:

  Not support.

EDCCA Threshold
~~~~~~~~~~~~~~~~
Command
^^^^^^^^
After connection with AP, you can get the current EDCCA threshold by the following command:

- FreeRTOS

  .. code-block::

     AT+WLDBG=get_edcca_th

- Linux

  .. code-block::

     ATWZ get_edcca_th

In most cases, the default values are sufficient to pass Adaptivity certification. If it doesn't work, you can modify the EDCCA threshold by the following command:

- FreeRTOS:

  .. code-block::

     AT+WLDBG=fix_edcca_th <value>

- Linux:

  .. code-block::

     ATWZ fix_edcca_th <value>

.. note:: The value's unit is dBm and the scope is [-60, -80], and the minimum step is 1.

Example
^^^^^^^
The examples of getting or setting the EDCCA threshold are as follows:

- FreeRTOS:

  .. toggle::
  
     - RTL8721Dx/RTL8711Dx 5G:
     
       .. code-block::
       
          AT+WLDBG=get_edcca_th
          [WLDBG]: _AT_WLAN_IWPRIV_
          [WLAN-A] [iwpriv_command] cmd name: get_edcca_th
          [WLAN-A] edcca L2H thre=-65 dbm
  
          AT+WLDBG=fix_edcca_th -62
          [WLDBG]: _AT_WLAN_IWPRIV_
          [WLAN-A] [iwpriv_command] cmd name: fix_edcca_th
     
     - RTL8730E 2G:
     
       .. code-block::
       
          AT+WLDBG=get_edcca_th
          [WLDBG]: _AT_WLAN_IWPRIV_
          [WLAN-A] [iwpriv_command] cmd name: get_edcca_th
          [WLAN-A] edcca thre=-60 dbm
  
          AT+WLDBG=fix_edcca_th -62
          [WLDBG]: _AT_WLAN_IWPRIV_
          [WLAN-A] [iwpriv_command] cmd name: fix_edcca_th

- Linux:

  .. toggle::
  
     - RTL8730E:
     
       .. code-block::
  
          / # ATWZ get_edcca_th
          [WLDBG]: _AT_WLAN_IWPRIV_
          [WLAN-A] [iwpriv_command] cmd name: get_edcca_th
          [WLAN-A] edcca thre=-60 dbm

          / # ATWZ fix_edcca_th -61
          [WLAN-A] [iwpriv_command] cmd name: fix_edcca_th

          / # ATWZ get_edcca_th
          [WLDBG]: _AT_WLAN_IWPRIV_
          [WLAN-A] [iwpriv_command] cmd name: get_edcca_th
          [WLAN-A] edcca thre=-61 dbm

Debug SOP
------------
1. Verify that the Adaptivity mode is turned on.

   The default SDK is normal EDCCA mode, so make sure that the driver switches to the Adaptivity mode for Adaptivity certification. Otherwise, the certification will fail.

2. Confirm whether there is a problem with the test method. For example:

   a. It is recommended to test in a shielding room, excluding that some lab is not clean and may cause FA/CCA.

   b. Adaptivity's TP measures the TX of the object instead of the RX.

   c. All antennas need to be connected to a source of interference. Otherwise, antenna diversity will cause authentication fail.

   d. The RSSI of the object to be tested should be kept at -50dBm or above to prevent certification failure due to wire breakage. When a disconnection happens, a scan will be performed, and the scan will inevitably result in Adaptivity fail.

   e. Confirm whether the interference energy size is correct. Some customers may mistake the meaning of dBM/MHZ and dBm, so they will mistype the interference energy and cause fail.

3. If the proportion of missing packets exceeds the regulatory requirements: ``2G: 10%``, ``5G: 5%``, confirm whether it is our TX signal indeed.

   You can check it by the following steps:

   a. Use the sniffer to capture packets and check whether it is the beacon or BT signal sent by the AP.

      * If it is indeed the packet of Ameba TX, check the packet type of TX. For example, is it scan packet or ACK?
      
      * If the problem is caused by AP, it is generally suggested that LAB should replace AP. This requirement is reasonable, because some AP behaviors will indeed lead to the Adaptivity failure of STA. For example, Ameba has TX silent, but the AP behavior may have been repeatedly harassing STA to let it back to ACK. ACK is a passive TX and cannot be blocked by the AdaptivIty mechanism.
      
      * If TX fail is caused by Ameba, for example, scan packet, which is sent by Ameba proactively, analyze why it enters the scan mode, which may be solved by modifying the driver code.

   b. When the proportion of missing packets is high or almost no stop TX, check whether the threshold is not appropriate. If the test energy hits correctly, the threshold can be adjusted appropriately to pass the test.

