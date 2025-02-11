.. tab:: RTL8726E/RTL8720E

   For example, KR4 sends an IPC to KM4 through channel 4.

   1. Select IPC channel.

      Uncomment the corresponding channel in :file:`ameba_ipc.h`  and add some description as below. In this case, uncomment the macro ``IPC_R2M_Channel4`` which means KR4 to KM4 channel 4.

      .. code-block:: c
         :emphasize-lines: 9

         /** @defgroup IPC_KR4_Tx_Channel
         * @{
         */
         #define IPC_R2M_TICKLESS_INDICATION    0  /*!< KR4 --> KM4 Tickless indicate */
         #define IPC_R2M_WAKE_AP                1  /*!< KR4 --> KM4 Wakeup*/
         #define IPC_R2M_FLASHPG_REQ            2  /*!< KR4 --> KM4 Flash Program REQUEST*/
         #define IPC_R2M_WIFI_FW_INFO           2  /*!< KR4 --> KM4 FW Info*/
         //#define IPC_R2M_Channel3             3
         #define IPC_R2M_Channel4               4  /*Add your Description Here*/
         //#define IPC_R2M_Channel5             5
         #define IPC_R2M_WIFI_TRX_TRAN          6  /*!< NP --> AP WIFI Message Exchange */
         #define IPC_R2M_WIFI_API_TRAN          7  /*!< NP --> AP API WIFI Message Exchange */
         /**
         * @}
         */

   2. Register IRQ handler function of the selected channel.

      Add struct ``IPC_INIT_TABLE`` into your code and put this struct in IPC table section by add ``IPC_TABLE_DATA_SECTION``. This struct specifies the direction, channel, mode and IRQ function of IPC as below.

      :<USER_MSG_TYPE>: This parameter can be

         | **IPC_USER_DATA**: The contents of this IPC is data.
         | **IPC_USER_POINT**: The contents of this IPC is pointer which points to address of actual data.

      :<RxFunc>: The callback function that CPU executes after receiving IPC.

      :<RxIrqData>: The parameters that are passed into the rx callback function.

      :<TxFunc>: The callback function that CPU executes after sending IPC.

      :<TxIrqData>: The parameters that are passed into the tx callback function

      :<IPC_Direction>: This parameter can be

         | **IPC_KR4_TO_KM4**: IPC is sent from KR4 to KM4.
         | **IPC_KM4_TO_KR4**: IPC is sent from KM4 to KR4.
         | **IPC_KR4_TO_DSP**: IPC is sent from KR4 to DSP.
         | **IPC_KM4_TO_DSP**: IPC is sent from KM4 to DSP.
         | **IPC_DSP_TO_KR4**: IPC is sent from DSP to KR4.
         | **IPC_DSP_TO_KM4**: IPC is sent from DSP to KM4.

      :<IPC_R2M_Channel4>: IPC channel used, this macro is selected in the previous step.

      The SDK will automatically enable the IPC interrupt and register the corresponding IRQ handler and data for the channel. In this example, KM4 will enter IRQ_function_int after KR4 sends IPC through channel 4.

      .. code-block:: c

         void IRQ_function_int(void)
         {
         /* Add your code here*/
         }

         IPC_TABLE_DATA_SECTION
         const IPC_INIT_TABLE ipc_R2M_CH4_table[] = {
         {IPC_USER_DATA, IRQ_function_int, (VOID *) NULL, IPC_TXHandler, (VOID *)NULL, IPC_KR4_TO_KM4, IPC_R2M_Channel4},
         }

   .. _ipc_usage_procedure_step_3:

   3. Send IPC request.

      When KR4 sends an IPC request to KM4 through channel 4, it should call :func:`ipc_send_message()`  and specify the channel number and message. If no message is needed, just input ``NULL`` for the third parameter of :func:`ipc_send_message()` .

      .. code-block:: c

         IPC_MSG_STRUCT ipc_msg;
         /*init ipc_msg here*/
         ipc_msg.msg = (u32)&tmp_np_log_ buf;
         /*init ipc_msg end*/
         ipc_send_message(IPC_KR4_TO_KM4, IPC_R2M_Channel4, &ipc_msg);

   4. Get IPC message if needed.

      After receiving IPC from KR4 channel 4, KM4 will enter IPC interrupt handler and the corresponding receive IRQ handler will be executed, call :func:`ipc_get_message()` to get the message if needed.

      .. code-block:: c

         PIPC_MSG_STRUCT ipc_msg_temp = (PIPC_MSG_STRUCT)ipc_get_message(IPC_KR4_TO_KM4, IPC_R2M_Channel4);

   .. note:: Several channels are already used by Realtek, you can use the remaining channels.