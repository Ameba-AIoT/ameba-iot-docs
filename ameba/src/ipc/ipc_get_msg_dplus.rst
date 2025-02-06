.. tab:: RTL8721Dx

   - Use ``ipc_get_message()`` in IPC interrupt handle or user interrupt handler.

      .. code-block:: c
         :linenos:

         void IPC_CHANNEL8_ipc_int(void *Data, u32 IrqStatus, u32 ChanNum)
         {
         /* To avoid gcc warnings */
         (void) Data;
         (void) IrqStatus;
         (void) ChanNum;
         PIPC_MSG_STRUCT  ipc_msg_temp = (PIPC_MSG_STRUCT)ipc_get_message(IPC_KM0_TO_KM4, IPC_N2A_Channel8);
         u32 addr = ipc_msg_temp->msg;
         }

      .. code-block:: c
         :linenos:

         IPC_TABLE_DATA_SECTION
         const IPC_INIT_TABLE ipc_channel8_table[] = {
         {IPC_USER_DATA, IPC_CHANNEL8_ipc_int, (VOID *)NULL, IPC_TXHandler, (VOID *)NULL, IPC_KM0_TO_KM4, IPC_N2A_Channel8},
         };

   - ``IPC_MSG_STRUCT`` is no need to cache invalidation any more after ``ipc_get_message()``.

      .. figure:: figures/ipc_suggested_usage_fig1.png
         :scale: 50%
         :align: center

   - Forcing ``IPC_MSG_STRUCT`` type conversion has risks.

      .. figure:: figures/ipc_suggested_usage_fig2.png
         :scale: 50%
         :align: center

   - Using ``ipc_get_message()`` in task also has risks.

      .. figure:: figures/ipc_suggested_usage_fig3.png
         :scale: 50%
         :align: center

   - If ``ipc_get_message()`` needs to be used in ``task`` , do as follows:

      a. Task takes the semaphore.

      b. In IPC Rx user interrupt handle, using ``ipc_get_message()`` to get a message.

      c. Copy the message to another memory after getting message in the same Rx user interrupt handle.

      d. Give semaphore.

      Then task can use the message.