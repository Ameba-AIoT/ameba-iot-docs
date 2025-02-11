.. tab:: RTL8726E

   **Introduction**

   IPC queue is designed for cores communication. Define an IPC queue between every two cores, and the two cores can send and receive messages through this IPC queue.


   IPC Message Queue:

   1. Packets send data from Core A to Core B through IPC message queue.

   2. Sender copy a complete packet into queue.

   3. Receiver copy packet with custom size from queue.

   For receiver, IPC interrupt is necessary.

   .. figure:: figures/ipc_message_queue_block_diagram_lite.svg
      :scale: 130%
      :align: center

      IPC Message Queue block diagram

   **How to Use IPC Application**

   Before use IPC application, users should enable this function and initial it in each core.

   - For KM4: :menuselection:`make menuconfig > MENUCONFIG FOR KM4 CONFIG > CONFIG IPC Message Queue > Enable IPC Message Queue`

   - For KR4: :menuselection:`make menuconfig > MENUCONFIG FOR KR4 CONFIG > CONFIG IPC Message Queue > Enable IPC Message Queue`

   - For DSP: Open project_dsp with Xplorer, then click :menuselection:`project_dsp > Build Properties > Symbols`, and set :guilabel:`CONFIG_RPC_EN` to 1

   The procedure will call :func:`ipc_app_init()` in :func:`main()` to initial IPC application when IPC application is enabled. The initialization include IPC queue initialization.

   **How to Use IPC Queue**

   For example, communication between KM4 and KR4 through ``IPC_ID_KR4_TO_KM4``.

   1. ``IPC_ID_KR4_TO_KM4`` definition in enumeration ``IPC_ID`` in :file:`ipc.h` is shown below. This definition is used in :ref:`Stap 2 <26e_how_to_use_ipc_queue_step_2>`.

      .. code-block:: c
         :emphasize-lines: 2

         typedef enum {
            IPC_ID_KR4_TO_KM4 = 0,
            IPC_ID_KM4_TO_KR4 = 1,
            IPC_ID_KR4_TO_DSP = 2,
            IPC_ID_DSP_TO_KR4 = 3,
            IPC_ID_DSP_TO_KM4 = 4,
            IPC_ID_KM4_TO_DSP = 5,
            /*14-19 used for RPC*/
            IPC_ID_NUM        = 20
         } IPC_ID;

   .. _26e_how_to_use_ipc_queue_step_2:

   2. When KR4 sends a message to KM4 through ``IPC_ID_KR4_TO_KM4``, it should call :func:`IPC_Message_Queue_Send()` and specify the queue ID and message.

      .. code-block:: c

         int32_t ret =  IPC_Message_Queue_Send(IPC_ID_KR4_TO_KM4, buf, IMQ_BUF_SIZE, WAIT_FOREVER);

   3. When KM4 receives a message from KR4 through IPC_ID_KR4_TO_KM4, it should call :func:`IPC_Message_Queue_Recv()` and the queue ID and a buffer to receive message.

      .. code-block:: c

         size = IMQ_BUF_SIZE;
         int32_t ret =  IPC_Message_Queue_Recv(IPC_ID_KR4_TO_KM4, buf, &size);

   .. note::
         - The memory regions are only defined in AP core, the maximum data region is 40kB.

         - Users can use default test demo to verify IPC queue by command ``test_ipc_message`` in console both in KR4 and KM4.

