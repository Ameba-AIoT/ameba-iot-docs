.. tab:: RTL8721Dx

   For example, KM0 sends an IPC to KM4 through channel 8.

   1. Register the receiver IRQ handler function of the selected channel in receiver IPC.

      In this case, add a new IPC_INIT_TABLE in the KM4 for channel 8 of KM0 to KM4. Rx IRQ handler, Rx IRQ data, Tx IRQ handler, Tx IRQ data, IPC direction and IPC channel should be set and defined. If message exchange is needed, you should specify the message type: data or point.

      .. code-block:: c
         :linenos:

         IPC_TABLE_DATA_SECTION
         Const IPC_INIT_TABLE ipc_channel8_table[] = {
         {IPC_USER_DATA, IPC_CHANNEL8_ipc_int, (VOID *)NULL, IPC_TXHandler, (VOID *)NULL , IPC_KM0_TO_KM4, IPC_N2A_Channel8},
         };

   2. Uncomment the corresponding channel in ``ameba_ipccfg.h`` and add some description as shown below. This macro is used in step :ref:`5 <ipc_usage_procedure_step_5>`.

      .. code-block:: c
         :emphasize-lines: 13
         :linenos:

         /** @defgroup IPC_KM0_Tx_Channel
         * @{
         */
         #define IPC_N2A_TICKLESS_INDICATION  0  /*!< KM0 -> KM4 Tickless indicate */
         #define IPC_N2A_WAKE_AP          1  /*!< KM0 -> KM4 Wakeup*/
         #define IPC_N2A_WIFI_FW_INFO      2  /*!< KM0 -> KM4 FW Info*/
         #define IPC_N2A_FLASHPG_REQ        3  /*!< KM0 -> KM4 Flash Program REQUEST*/
         #define IPC_N2A_LOGUART_RX_SWITCH    4  /*!< KM0 -> KM4 Loguart Rx Switch*/
         #define IPC_N2A_BT_API_TRAN        5  /*!< KM0 -> KM4 BT API Exchange */
         // #define IPC_N2A_BT_DATA_TRAN      5  /*!< KM0 -> KM4 BT DATA Exchange */
         #define IPC_N2A_WIFI_TRX_TRAN      6  /*!< KM0 -> KM4 WIFI Message Exchange */
         #define IPC_N2A_WIFI_API_TRAN      7  /*!< KM0 -> KM4 API WIFI Message Exchange */
         #define IPC_N2A_Channel8        8
         //#define IPC_N2A_Channel9        9
         //#define IPC_N2A_Channel10        10
         //#define IPC_N2A_Channel11        11
         //#define IPC_N2A_Channel12        12
         //#define IPC_N2A_Channel13        13
         //#define IPC_N2A_Channel14        14
         //#define IPC_N2A_Channel15        15
         /**
         * @}
         */

   .. _21dx_ipc_usage_procedure_step_3:

   3. Register the transmit IRQ handler function of the selected channel in transmit IPC and uncomment the corresponding channel. This step is ``optional`` , because this step is for register Tx interrupt, which is for transmit IPC to know that the receiver IPC has received this IPC. In this case, add a new IPC_INIT_TABLE in the KM0 for channel 8 of KM0 to KM4.

   .. _ipc_usage_procedure_step_4:

   4. SDK will enable the IPC receiver interrupt of KM4 and transmit interrupt of KM0 (if configured in step :ref:`3 <21dx_ipc_usage_procedure_step_3>`) according to ``IPC_INIT_TABLE`` , and register the corresponding IRQ handler and data for the channel.

   .. _ipc_usage_procedure_step_5:

   5. When KM0 sends an IPC request to KM4 through channel 8, it should call ``ipc_send_message()`` and specify the channel number and message. If no message is needed, just input NULL for the third parameter of ``ipc_send_message ()`` .

      .. code-block:: c
         :linenos:

         IPC_MSG_STRUCT ipc_msg_temp;
         // init ipc_msg
         ipc_msg_temp.msg_type = IPC_USER_POINT;
         ipc_msg_temp.msg = (u32)&tmp_np_log_buf;
         ipc_msg_temp.msg_len = 1;
         ipc_msg_temp.rsvd =0;
         //send ipc message
         ipc_send_message(IPC_KM0_TO_KM4, IPC_N2A_Channel8, & ipc_msg_temp);

   6. After receiving IPC from KM0 channel8, KM4 will enter IPC interrupt handler and the corresponding receive IRQ handler will be executed, call ``ipc_get_message()`` to get the message if needed.

      .. code-block:: c

         PIPC_MSG_STRUCT ipc_msg_temp = (PIPC_MSG_STRUCT)ipc_get_message(IPC_KM0_TO_KM4, IPC_N2A_Channel8);

   7. If you have configured in step :ref:`3 <21dx_ipc_usage_procedure_step_3>`, after KM4 receives the IPC, KM0 also enters IPC interrupt handler and executes the corresponding transmit IRQ handler.



   .. note::
      Several channels are already used by Realtek, you can use the remaining channels.