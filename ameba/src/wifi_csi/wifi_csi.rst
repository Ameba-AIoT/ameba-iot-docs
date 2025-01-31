.. _wifi_csi:

Wi-Fi CSI Introduction
=======================
Call CSI APIs to get DUT to specific STA's channel frequency response information, which we also call Channel State Information (CSI).

Realtek Wi-Fi CSI can divide into Active CSI and Passive CSI based on whether Realtek device (STA mode or SoftAP mode) participates in transmitting a CSI triggering frame.

- **Active CSI**: Realtek STA would transmit a CSI triggering frame

   - Active CSI is divided into two modes based on the type of CSI triggering frame: unicast mode and broadcast mode. The procedure is illustrated in :ref:`wifi_acitve_csi_unicast_mode` and :ref:`wifi_acitve_csi_broadcast_mode`.

   - Using Public Action Fame as CSI triggering frame in Active CSI.

- **Passive CSI**: Realtek STA does not require sending a CSI triggering frame

   - The procedure is illustrated in :ref:`wifi_passive_csi`.

.. _wifi_acitve_csi_unicast_mode:

Active CSI: Unicast mode
------------------------------------------------
- **METHOD1**: Realtek STA send unicast CSI triggering frame to the AP and capture CSI of the ACK for previous CSI triggering frame (only one-to-one).

- **METHOD1_Variant**: Realtek STA send unicast CSI triggering frame to other STAx and capture CSI of the ACK for previous CSI triggering frame (one-to-many by polling).

- **METHOD2**: Realtek SoftAP send unicast CSI triggering frame to the associated stations and capture CSI of the ACK for previous unicast CSI triggering frame (one-to-many by polling).

.. figure:: figures/collecting_csi_from_rx_ack_packet_response_mode.svg
   :scale: 100%
   :align: center
   :name: collecting_csi_from_rx_ack_packet_response_mode

   Collect CSI from Rx ACK packet for Rx response mode

.. _wifi_acitve_csi_broadcast_mode:

Active CSI: Broadcast Mode
----------------------------------------------------
- **METHOD3**: Realtek SoftAP sends broadcast packet for Realtek stations and Realtek stations captures CSI of the broadcast packet.

- **METHOD4**: Realtek STA sends broadcast packet and other Realtek stations capture CSI of the broadcast packet.

.. figure:: figures/collecting_csi_from_rx_broadcast_packet_normal_mode.svg
   :scale: 100%
   :align: center
   :name: collecting_csi_from_rx_broadcast_packet_normal_mode

   Collect CSI from Rx broadcast packet for Rx normal mode

.. _wifi_passive_csi:

Passive CSI
----------------------
Realtek STA or SoftAP captures CSI from the Rx packet (only one-to-one).

.. figure:: figures/collecting_csi_from_rx_packet_normal_mode.svg
   :scale: 100%
   :align: center
   :name: collecting_csi_from_rx_packet_normal_mode

   Collect CSI from Rx packet for Rx normal mode


Wi-Fi CSI Function Flow
==============================================
The following figure illustrates the CSI operation flow for unicast mode.

.. figure:: figures/csi_operation_flow_unicast_mode.svg
   :scale: 100%
   :align: center

   CSI operation flow for unicast mode

As described below, Wi-Fi CSI report mainly consists of three modules for unicast mode.

1. Configure and enable Wi-Fi CSI parameter

   - APP needs to call APIs to configure Wi-Fi CSI parameters which they wanted and enable Wi-Fi CSI function.

   - APP can call the APIs to disable Wi-Fi CSI function when Wi-Fi CSI is not required.

2. Register or release Wi-Fi CSI callback function

   - Register a Wi-Fi CSI callback function when enabling Wi-Fi CSI, Wi-Fi will transfer a flag inform app when per CSI packet receive ready through the callback function

   - Release the Wi-Fi CSI callback function when disabling Wi-Fi CSI

3. Report Wi-Fi CSI

   - APP should run a thread used to wait for CSI packet ready and then call APIs to fetch a CSI packet.

   - APP should give a semaphore in the Wi-Fi CSI callback function and take the semaphore in the thread.


Wi-Fi CSI APIs
============================
wifi_csi_config
------------------------------
- Function prototype:

  .. code-block:: c

     wifi_csi_config (rtw_csi_action_parm_t *act_parm)

- Description: CSI parameter configuration

- CSI parameters configuration can be divided into two steps:

  - act = *CSI_ACT_CFG* for Wi-Fi CSI parameters input

  - act = *CSI_ACT_EN* for only Wi-Fi CSI enable or disable. If disabled, APP should reconfigure Wi-Fi CSI parameters and re-enable Wi-Fi CSI.

  .. table:: 
     :width: 100%
     :widths: auto
  
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | Parameter       | Type                  | Description                                                                                                                |
     +=================+=======================+============================================================================================================================+
     | group_num       | rtw_csi_group_type    | CSI info subcarrier decimation                                                                                             |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 0: per tone                                                                                                              |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: per 2 tone                                                                                                            |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 2: per 4 tone                                                                                                            |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 3: per 8 tone                                                                                                            |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | accuracy        | rtw_csi_accuracy_type | CSI raw data (CH I or Q) word length                                                                                       |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 0: S(8,3)                                                                                                                |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: S(16,11)                                                                                                              |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | alg_opt         | rtw_csi_alg_opt_type  | Default: 0 (not supported)                                                                                                 |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | ch_opt          | rtw_csi_alg_opt_type  | - 0: legacy portion                                                                                                        |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: non-legacy portion                                                                                                    |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | csi_role        | rtw_csi_op_role       | - 0: TRx                                                                                                                   |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: Tx                                                                                                                    |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 2: Rx                                                                                                                    |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | mode            | rtw_csi_mode_type     | - 0: Rx normal mode (estimating CSI by the currently received packet)                                                      |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: Rx ndp mode (not supported)                                                                                           |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 2: Rx response mode (estimating CSI by receiving ACK for the previous transmission)                                      |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | act             | rtw_csi_action_type   | Enable Wi-Fi CSI or configure Wi-Fi CSI parameters                                                                         |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | trig_frame_mgnt | unsigned short        | Specify frame type(s) of CSI triggering frame for fetching CSI (used for Rx normal mode and no need for Rx response mode)  |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | trig_frame_ctrl | unsigned short        | Specify frame type(s) of CSI triggering frame for fetching CSI (used for Rx normal mode and no need for Rx response mode)  |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | trig_frame_data | unsigned short        | Specify frame type(s) of CSI triggering frame for fetching CSI (used for Rx normal mode and no need for Rx response mode)  |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | enable          | unsigned char         | - 0: disable Wi-Fi CSI report                                                                                              |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: enable Wi-Fi CSI report                                                                                               |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | trig_period     | unsigned char         | Wi-Fi CSI sounding rate, unit: 320us (10~255)                                                                              |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | data_rate       | unsigned char         | Specify Tx data rate of CSI triggering frame, but the parameters is invalid in Rx response mode for getting Wi-Fi CSI      |
     |                 |                       |                                                                                                                            |
     |                 |                       | because Wi-Fi CSI dependeds on the Rx rate of ACK.                                                                         |
     |                 |                       |                                                                                                                            |
     |                 |                       | OFDM/HT/VHT mgn_rate_type (max.: 0xFF)                                                                                     |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | data_bw         | unsigned char         | Indicate the bandwidth of trigger frame                                                                                    |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 0: 20M                                                                                                                   |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: 40M                                                                                                                   |
     |                 |                       |                                                                                                                            |
     |                 |                       | - Others: reserved                                                                                                         |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | mac_addr[6]     | unsigned char         | Specify destination address (MAC address) for CSI triggering frame (purpose to fetch CSI information from response packet) |
     |                 |                       |                                                                                                                            |
     |                 |                       | - If multi_type=1, the mac_addr is reserved.                                                                               |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | multi_type      | unsigned char         | Indicate whether the CSI triggering frame is unicast or broadcast, only valid in Active CSI.                               |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 0: unicast (using unicast packet and fetching CSI from the ACK for unicast packet)                                       |
     |                 |                       |                                                                                                                            |
     |                 |                       | - 1: broadcast (using broadcast packet and fetching CSI from the broadcast packet)                                         |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+
     | trig_flag       | unsigned char         | Indicate role for transmitting CSI triggering frame in METHOD4 and role for transmitting response ACK for CSI triggering   |
     |                 |                       |                                                                                                                            |
     |                 |                       | frame in METHOD1_Variant, others are reserved.                                                                             |   
     |                 |                       |                                                                                                                            |
     |                 |                       | Value=1 ~ 15 (0 is reserved)                                                                                               |
     +-----------------+-----------------------+----------------------------------------------------------------------------------------------------------------------------+


  .. note::
  
        - The parameter configuration examples for different CSI methods are shown in Figures :ref:`collecting_csi_from_rx_ack_packet_response_mode`, :ref:`collecting_csi_from_rx_broadcast_packet_normal_mode` and :ref:`collecting_csi_from_rx_packet_normal_mode`.
  
        - You should disable power saving when using **METHOD1_Variant/2/3/4** in STA mode (as shown in the following codes, i.e. modify the corresponding parameters).
  
          .. code-block:: c
          
             wifi_user_config.lps_enable = 1;
             wifi_user_config.lps_mode = PS_MODE_LEGACY;
  
- File path: ``component/soc/amebadplus/usrcfg/ameba_wificfg.c`` > ``wifi_set_user_config()``

  .. note::

     - *data_rate* is mandatory and must set to be greater than or equal to OFDM rate.
  
     - *trig_frame_xx/group_num/accuarcy/ch_opt/csi_role/trig_period/data_bw* are optional and can be set to the allowed value that you want.


- The format of :func:`trig_frame_xxx_type`:

  .. code-block:: c

     enum trig_frame_mgnt_type {
      CSI_TRIG_ASSOCREQ    = BIT(0),
      CSI_TRIG_ASSOCRSP    = BIT(1),
      CSI_TRIG_REASSOCREQ  = BIT(2),
      CSI_TRIG_REASSOCRSP  = BIT(3),
      CSI_TRIG_PROBEREQ    = BIT(4),
      CSI_TRIG_PROBERSP    = BIT(5),
      CSI_TRIG_BEACON      = BIT(8),
      CSI_TRIG_ATIM        = BIT(9),
      CSI_TRIG_DISASSOC    = BIT(10),
      CSI_TRIG_AUTH        = BIT(11),
      CSI_TRIG_DEAUTH      = BIT(12),
      CSI_TRIG_ACTION      = BIT(13)
     }

     enum trig_frame_ctrl_type {
      CSI_TRIG_TRIGGER    = BIT(2),
      CSI_TRIG_BA         = BIT(9),
      CSI_TRIG_PSPOLL     = BIT(10),
      CSI_TRIG_RTS        = BIT(11),
      CSI_TRIG_CTS        = BIT(12),
      CSI_TRIG_ACK        = BIT(13),
      CSI_TRIG_CFEND      = BIT(14),
      CSI_TRIG_CFEND_CFACK= BIT(15)
     } 

     enum trig_frame_data_type {
      CSI_TRIG_DATA         = BIT(0),
      CSI_TRIG_DATA_CFACK   = BIT(1),
      CSI_TRIG_DATA_CFPOLL  = BIT(2),
      CSI_TRIG_DATA_CFACKPOLL = BIT(3),
      CSI_TRIG_DATA_NULL      = BIT(4),
      CSI_TRIG_CF_ACK         = BIT(5),
      CSI_TRIG_CF_POLL        = BIT(6),
      CSI_TRIG_CF_ACKPOLL     = BIT(7),
      CSI_TRIG_QOS_DATA       = BIT(8),
      CSI_TRIG_QOS_DATA_NULL  = BIT(12)
     };

- The format of :func:`data_rate`:

  .. code-block:: c

     enum mgn_rate_type {
      MGN_6M = 0x0C,
      MGN_9M = 0x12,
      MGN_11M = 0x16,
      MGN_12M = 0x18,
      MGN_18M = 0x24,
      MGN_24M = 0x30,
      MGN_36M = 0x48,
      MGN_48M = 0x60,
      MGN_54M = 0x6C,
      MGN_MCS0 = 0x80,
      MGN_MCS1,
      MGN_MCS2,
      MGN_MCS3,
      MGN_MCS4,
      MGN_MCS5,
      MGN_MCS6,
      MGN_MCS7,
      MGN_VHT1SS_MCS0 = 0xA0,
      MGN_VHT1SS_MCS1,
      MGN_VHT1SS_MCS2,
      MGN_VHT1SS_MCS3,
      MGN_VHT1SS_MCS4,
      MGN_VHT1SS_MCS5,
      MGN_VHT1SS_MCS6,
      MGN_VHT1SS_MCS7,
      MGN_VHT1SS_MCS8,
      MGN_UNKNOWN
     };

- Other parameters:

  .. code-block:: c

     enum rtw_csi_group_type {
      CSI_GROUP_NUM_1 = 0,
      CSI_GROUP_NUM_2,
      CSI_GROUP_NUM_4,
      CSI_GROUP_NUM_16,  /**< per 8tone in dplus*/
      CSI_GROUP_NUM_MAX
     } 
      
     enum rtw_csi_accuracy_type {
      CSI_ACCU_1BYTE = 0, /**< CSI_ACCU_1BYTE: S(8,3) */
      CSI_ACCU_2BYTES,     /**< CSI_ACCU_2BYTE: S(16,11) */
      CSI_ACCU_MAX
     }  

     enum rtw_csi_ch_opt_type {
      CSI_CH_LEGACY = 0,  /**< legacy part(L-LTF) channel estimation result */
      CSI_CH_NON_LEGACY,  /**< non-legacy(HT-LTF) part */
      CSI_CH_MAX
     } 

     enum rtw_csi_op_role {
      CSI_OP_ROLE_TRX = 0,  /**< both TRx */
      CSI_OP_ROLE_TX  = 1,  /**< only Tx CSI triggering frame */
      CSI_OP_ROLE_RX  = 2,  /**< only Rx CSI triggering frame for fetching CSI report */
      CSI_OP_ROLE_MAX
     };

Design for METHOD4
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**METHOD1**, **METHOD2** and **METHOD3** are all interactions between STA and AP in infrastructure mode, Realtek driver will follow the requirements of the Wi-Fi standard protocol to configure the correct address of A1/A2/A3 for CSI trigger frame.

For example, if the Ameba IC acts as STA role, the frame format specified in the Wi-Fi standard is shown in the following figure.

.. figure:: figures/interaction_between_sta_and_ap_infrastructure_mode.svg
   :scale: 120%
   :align: center

   Interaction between STA and AP in infrastructure mode

However, for **METHOD4**, the interaction between STAs does not comply with Wi-Fi protocol specifications. To ensure that the STA can receive packets from other STAs, the Ameba IC will transmit forged packets as the CSI triggering frame. So Realtek driver will modify ``A1=broadcast address`` and ``A2=BSSID`` in CSI Triggering frame based on the Realtek MAC layer filtering conditions.

.. note:: Only after Realtek MAC layer receives the packet, Realtek MAC layer will trigger the CSI circuit to obtain CSI packet.

.. figure:: figures/interaction_between_sta_and_sta_infrastructure_mode.svg
   :scale: 120%
   :align: center

   Interaction between STA and STA in infrastructure mode

There is still a problem for METHOD4, Ameba2 receives Wi-Fi packets from Ameba3 and Ameba1 with same content, so Ameba2 cannot distinguish whether the CSI packet triggered by this Wi-Fi packet belongs to Ameba1 or Ameba3. To solve this problem, we fill in the unique identification value in the Fragment Number subfield in Sequence Control filed in Wi-Fi packet, and the value will be carried in the corresponding CSI packet. The application layer can distinguish which device this CSI belongs to base on the trig_flag value.

.. figure:: figures/mapping_trig_flag_with_sta.svg
   :scale: 120%
   :align: center

   Mapping trig_flag with STAx

wifi_csi_report
------------------------------
- Function prototype:

  .. code-block:: c

     wifi_csi_report(u32 buf_len, u8 *csi_buf, u32 *len)

- Description: fetch CSI information (CSI header information and CSI raw data)

  .. table::
     :width: 100%
     :widths: auto
  
     +-----------+------+-----------------------------------------------------------------------+
     | Parameter | Type | Description                                                           |
     +===========+======+=======================================================================+
     | buf_len   | u32  | Buffer size for storing CSI packet which specified by APP             |
     +-----------+------+-----------------------------------------------------------------------+
     | csi_buf   | u8*  | CSI data buffer address for storing CSI packet which specified by APP |
     +-----------+------+-----------------------------------------------------------------------+
     | len       | u32* | Size of CSI raw data                                                  |
     +-----------+------+-----------------------------------------------------------------------+

CSI Buffer Layout
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The CSI buffer is separated into two parts: CSI header information and CSI raw data, and the size of CSI raw data is indicated by *csi_data_length* of CSI header information.

.. figure:: figures/csi_buffer_layout.svg
   :scale: 130%
   :align: center

   CSI buffer layout

CSI Header Information
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The CSI header information format comprises a set of fields that occur in a fixed order. The figure below depicts the CSI header information format.

.. figure:: figures/csi_header_information_format.svg
   :scale: 120%
   :align: center

   CSI header information format

The following list shows the description of each field.

.. table::
   :width: 100%
   :widths: auto

   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | Subfield              | Size (bytes)| Definition                                                                                |
   +=======================+=============+===========================================================================================+
   | csi_signature         | 2           | Pattern that may be used to detect a new CSI packet.                                      |
   |                       |             |                                                                                           |
   |                       |             | The unique pattern is set to the value 0xABCD.                                            |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | hdr_len               | 1           | Length of the CSI header information except the subfields of *csi_signature* and *hdr_len*|
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | mac_addr              | 6           | Client MAC address, specifies transmitter address (MAC address) for CSI triggering frame  |
   |                       |             |                                                                                           |
   |                       |             | in Active CSI and receiver address for CSI triggering frame in Passive CSI.               |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | trig_addr             | 6           | Client MAC address, specifies destination address (MAC address) for CSI triggering frame  |
   |                       |             |                                                                                           |
   |                       |             | in Active CSI and source address for CSI triggering frame in Passive CSI (purpose to      |
   |                       |             |                                                                                           |  
   |                       |             | fetch CSI information from response packet)                                               |                                                        
   |                       |             |                                                                                           |               
   |                       |             | .. note:: Reserved in **METHOD4**                                                         |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | hw_assigned_timestamp | 4           | CSI timestamp, unit is us.                                                                |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | channel               | 1           | Operation channel of current client                                                       |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | bandwidth             | 1           | Operation bandwidth                                                                       |
   |                       |             |                                                                                           |
   |                       |             | - 0: 20M                                                                                  |
   |                       |             |                                                                                           |
   |                       |             | - 1: 40M                                                                                  |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | rx_data_rate          | 1           | Specify the rate of source packet that triggers CSI, the value in the *rx_data_rate* field|
   |                       |             |                                                                                           |
   |                       |             | is obtained from the previously defined structure *mgn_rate_type enum*.                   |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | protocol_mode         | 1           | Specify the protocol mode of the response packet which is used to fetch CSI information   |
   |                       |             |                                                                                           |
   |                       |             | - 0: OFDM                                                                                 |
   |                       |             |                                                                                           |
   |                       |             | - 1: HT                                                                                   |
   |                       |             |                                                                                           |
   |                       |             | - 2: VHT                                                                                  |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | num_sub_carrier       | 2           | Number of subcarriers contain in CSI raw data                                             |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | num_bit_per_tone      | 1           | CSI data word length (sum of I and Q)                                                     |
   |                       |             |                                                                                           |
   |                       |             | Accuracy: S(8,3) or S(16,11)                                                              |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | evm[2]                | 2           | Error vector magnitude, only evm[0] is valid, evm[1] is reserved.                         |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | rssi                  | 1           | dbm=[value] - 110                                                                         |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | rxsc                  | 1           | Indicate which sub 20M channel is used to transmit packet                                 |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | csi_sequence          | 4           | Indicate the sequence number of a CSI packet (invalid in METHOD4).                        |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | csi_data_length       | 4           | CSI raw_data length, unit is byte                                                         |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | csi_valid             | 1           | Indicate the current CSI raw data whether valid                                           |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | trig_flag             | 1           | Valid in only METHOD4, indicates source of role for triggering CSI in METHOD4.            |
   |                       |             |                                                                                           |
   |                       |             | Reserved in other METHODs.                                                                |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+
   | antenna               | 1           | Reserved                                                                                  |
   +-----------------------+-------------+-------------------------------------------------------------------------------------------+


Example of CSI header information:

.. figure:: figures/comparison_between_parsed_csi_header_information_data_and_csi_buffer_data.svg
   :scale: 130%
   :align: center

   Comparison between the parsed CSI header information data and the data in the CSI buffer

CSI Raw Data Layout
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A tone index of -20M~0 corresponds to 64:127, and 0~20M corresponds to 0:63.

- legacy 20M: tone_index (102, 103, …, 127, 1, 2, …, 26)

- Non-legacy 20M: tone_index (100, 101, 102, 103, …, 127, 1, 2, …, 26, 27, 28)

- legacy 40M: tone_index (70, 71, …, 94, 95, 97, 98, …, 122, 6, 7, …, 30, 31, 33, 34, …, 57, 58)

- Non-legacy 40M: tone_index (71, 72, …, 127, 1, 2, …, 56, 57)

Example of CSI Raw Data (without Decimation):20MHz
********************************************************************************************
Each subcarrier (tone) has an Nrx*Nsts CSI matrix. Take a VHT MIMO 1x2 matrix as an example (group_num: 1 + accuracy: 0), the sequences of H are H11 and H12.

The layout of CSI data is:

.. figure:: figures/csi_raw_data_layout_without_decimation.svg
   :scale: 120%
   :align: center

   CSI raw data layout (without decimation)

Example of CSI Raw Data (with Decimation): 20MHz
************************************************************************************************
Each subcarrier (tone) has an Nrx*Nsts CSI matrix. Take a VHT MIMO 1x2 matrix as an example (group_num: 8 + accuracy: 0), the sequences of H are H11 and H12. Select tone idx based on the principle of tone%group_num==0.


The layout of CSI data is:

.. figure:: figures/csi_raw_data_layout_with_decimation.svg
   :scale: 120%
   :align: center

   CSI raw data layout (with decimation)

Number of Subcarriers for CSI Raw Data
****************************************************************************
.. table:: {N_tone(BW) * group_num}
   :width: 100%
   :widths: auto

   +--------+-----+-----+-----+-----+-----+
   |        | BW  | 1   | 1/2 | 1/4 | 1/8 |
   +========+=====+=====+=====+=====+=====+
   | Non-HT | 20M | 52  | 26  | 12  | 6   |
   +--------+-----+-----+-----+-----+-----+
   | HT     | 20M | 56  | 28  | 14  | 6   |
   +--------+-----+-----+-----+-----+-----+
   | VHT    | 20M | 56  | 28  | 14  | 6   |
   +--------+-----+-----+-----+-----+-----+
   | Non-HT | 40M | 104 | 52  | 24  | 12  |
   +--------+-----+-----+-----+-----+-----+
   | HT     | 40M | 114 | 56  | 28  | 14  |
   +--------+-----+-----+-----+-----+-----+
   | VHT    | 40M | 114 | 56  | 28  | 14  |
   +--------+-----+-----+-----+-----+-----+

wifi_reg_event_handler
--------------------------------------------
- Function prototype:

  .. code-block:: c
  
     wifi_reg_event_handler(unsigned int event_cmds, rtw_event_handler_t handler_func, void *handler_user_data)
  
- Description: register a callback function.

  :event_cmds: parameter in, unsigned int event_cmds >> WIFI_EVENT_CSI_DONE
  
  :handler_func: parameter in, rtw_event_handler_t handler_func >> function name
  
  :handler_user_data: parameter in, void \*handler_user_data >> NULL

  .. note:: The callback function need four input arguments, the first and last are pointer types and the remaining two are int types

- For example:

  .. code-block:: c
  
     void example_callback_func(char *buf, int buf_len, int flags, void *userdata)
     {
     UNUSED(buf);
     UNUSED(buf_len);
     UNUSED(flags);
     UNUSED(userdata);
     /* do something */
     return;
     }
     /* register wifi event callback function */
     wifi_reg_event_handler(Element_ID, example_callback_func, NULL);

wifi_unreg_event_handler
------------------------------------------------
- Function prototype:

  .. code-block:: c
  
     wifi_unreg_event_handler(unsigned int event_cmds, rtw_event_handler_t handler_func)

- Description: release a callback function.

  :event_cmds: parameter in, unsigned int event_cmds >> WIFI_EVENT_CSI_DONE
  
  :handler_func: parameter in, rtw_event_handler_t handler_func >> function name

- For example:

  .. code-block:: c 
  
     /* release wifi event callback function */
     wifi_unreg_event_handler(WIFI_EVENT_CSI_DONE, example_callback_func);


Example of Wi-Fi CSI
========================================
This section describes the path and structure of the Wi-Fi CSI example. The file path is ``{SDK}\component\example\wifi\wifi_csi``.

Overview of Example Code
------------------------------------------------
.. figure:: figures/example_flow_csi.svg
   :scale: 125%
   :align: center

   Example flow of Wi-Fi CSI


Initialization
----------------------------
When power on or chip reset, :func:`app_example()` will be called in :func:`main()` and the following codes will be executed:

.. code-block:: c 

   void app_example(void)
   {
    example_wifi_csi();  /* calling the entry function of wifi CSI example */
   }


example_wifi_csi
--------------------------------
When executing CSI example: :func:`example_wifi_csi()`, a Wi-Fi CSI thread will be created.

.. code-block:: c

   void example_wifi_csi(void)
   {
    if (rtos_task_create(NULL, ((const char *)"wifi_csi_thread"), wifi_csi_thread, NULL, 1024 * 4, 0) != SUCCESS) {
        printf("\n\r%s rtos_task_create(wifi_csi_thread) failed", __FUNCTION__);
    }
    return;
   }

wifi_csi_thread
------------------------------
1. Wi-Fi CSI parameters assignment

   .. code-block:: c

      /* Configure the value according to your requirements */
      unsigned char assoc_ap_mac[6] = {0xa4, 0x39, 0xb3, 0xa4, 0xbe, 0x2d};  /* need modify to mac address of associated AP when sta mode */
      act_param.group_num = 0;
      act_param.mode = 2;
      act_param.accuracy = 0;
      act_param.trig_period = 200;  /* units: depend on ICs */
      act_param.data_rate = 0xC;  /* ofdm 6 mpbs*/
      act_param.trig_frame_mgnt = 0;   /* no need for Rx resp mode, default 0*/
      act_param.trig_frame_ctrl = 0;   /* no need for Rx resp mode, default 0*/
      act_param.trig_frame_data = 0;   /* no need for Rx resp mode, default 0*/
      memcpy(act_param.mac_addr, assoc_ap_mac, 6);

2. Check Wi-Fi is on & Wi-Fi connect success or Wi-Fi is on & SoftAP start

   a. If SoftAP starts, the CSI must be enable by SoftAP role regardless of whether STA role is in an associated state. Then wait for a STA to connect to the AP role and enable CSI with the first associated STA.

      If not associated, `vTaskDelay(2000)`

   b. If SoftAP is disabled, we support fetch CSI information form the device which associated.

      If STA role is not connected, `vTaskDelay(2000)`


   .. code-block:: c

      while (1) {
      NEXT:
      if (wifi_is_running(SOFTAP_WLAN_INDEX)) {
       wifi_get_associated_client_list(&client_info);
       if (client_info.count) {
           memcpy(act_param.mac_addr, client_info.mac_list[0].octet, 6);
           printf(" ### SOFTAP Break ###\n");
       break;
       }
       rtos_time_delay_ms(2000);  /* 2s */
       goto NEXT;
      }
      if (wifi_is_running(STA_WLAN_INDEX) && (wifi_get_join_status() == RTW_JOINSTATUS_SUCCESS) && (*(u32 *)LwIP_GetIP(0) != IP_ADDR_INVALID)) {
       rtos_time_delay_ms(2000);  /* 2s */
       printf(" ### STA Break ###\n");
       break;
       }
       rtos_time_delay_ms(2000);  /* 2s */
      }

3. Register a Wi-Fi CSI callback function :func:`example_wifi_csi_report_cb()`

4. Initialize a semephore ``wc_ready_sema``, and you should use semaphore to wait Wi-Fi CSI event happen

   .. code-block:: c

      /* register wifi event callback function */
      wifi_reg_event_handler(WIFI_EVENT_CSI_DONE, example_wifi_csi_report_cb, NULL);
      /**
      * should use semaphore to wait wifi event happen
      * the following example shows that we wait for wifi csi ready
      */
      rtos_sema_create(&wc_ready_sema, 0, 0xFFFFFFFF);
      if (!wc_ready_sema) {
       printf("\nInit wc_ready_sema failed\n");
      }

5. Configure Wi-Fi CSI parameters and enable Wi-Fi CSI

   .. code-block:: c

      /* cis cfg and csi en */
      act_param.act = 1;  /* csi cfg */
      act_param.enable = 0;
      wifi_csi_config(&act_param);
      act_param.act = 0;  /* csi en */
      act_param.enable = 1;
      wifi_csi_config(&act_param);

6. Wait for the semaphore and fetch the CSI packet

   .. code-block:: c

      while (1) {
      /* example: when wifi csi Rx done, call csi report handle function. */
      if (rtos_sema_take(wc_ready_sema, 0xFFFFFFFF) != SUCCESS) {
       rtos_sema_delete(wc_ready_sema);
       act_param.act = 0;  /* csi dis */
       act_param.enable = 0;
       wifi_csi_config(&act_param);
       break;
      }
      csi_buf = rtos_mem_malloc(csi_data_len);
      if (csi_buf != NULL) {
       wifi_csi_report(csi_data_len, csi_buf, &len);
       /*do something for handing csi info*/
       timestamp = (unsigned int)(csi_buf[18] << 24) | (unsigned int)(csi_buf[17] << 16) | (unsigned int)(csi_buf[16] << 8) | (unsigned int)csi_buf[15];
       printf("\n[CH INFO] timestamp = %d us, csi data(header+raw data): \n", timestamp);
       buff_tmp = (u64 *)csi_buf;
       for (i = 0; i < 8; i++) {
           printf("[%02d]0x%016llx\n", i, buff_tmp[i]);
       }
       printf("[CH INFO] ...(only show 64 bytes)\n");
      } else {
       printf("\n csi_buf malloc fail\n");
      }
       if (csi_buf != NULL) {
       rtos_mem_free(csi_buf);
      }
      }

7. Exit

   a. Release the Wi-Fi CSI callback function

   b. Free the semaphore ``wc_ready_sema``

   c. `vTaskDelete`

   .. code-block:: c

      /* unregister wifi event callback function */
      wifi_unreg_event_handler(WIFI_EVENT_CSI_DONE, example_wifi_csi_report_cb);
      if (wc_ready_sema) {
       rtos_sema_delete(&wc_ready_sema);
      }
      rtos_task_delete(NULL);

Wi-Fi CSI Callback Function
------------------------------------------------------
When Wi-Fi gets a CSI report done, it will use the Wi-Fi CSI callback function to send a signal to the APP.
For example, APP can up SEMA in the callback function to trigger :func:`wifi_csi_thread` for fetching a CSI report.

.. note::
    
   - Try to avoid time-consuming operations in the callback function that may affect Rx performance.

   - APP may can use "flags", which specify the length of current CSI raw data.


.. code-block:: c

   void example_wifi_csi_report_cb(char *buf, int buf_len, int flags, void *userdata)
   {
    rtos_sema_give(wc_ready_sema);  /* trigger thread */
    csi_data_len = flags;  /* APP can use for malloc csi_buf */
    return;
   }


How to Compile Image for Wi-Fi CSI
====================================================================
1. Navigate to ``{SDK}/amebadplus_gcc_project`` and run the following command

   .. code-block:: c

      make menuconfig

2. Select :menuselection:`CONFIG WIFI > Enable CSI`, then save and exit

   .. figure:: figures/menuconfig_enable_csi.png
      :scale: 70%
      :align: center

3. Navigate to ``{SDK}/amebadplus_gcc_project`` again and run the following command

   .. code-block:: c

      make all EXAMPLE=wifi_csi

The image bin files (**km0_km4_app.bin** & **km4_boot_all.bin**) can be found in ``{SDK}/amebadplus_gcc_project``.

