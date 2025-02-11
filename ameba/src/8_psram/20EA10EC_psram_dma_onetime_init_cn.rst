.. tab:: RTL8720EA

   .. table::
      :width: 100%
      :widths: auto

      +-------------------------------------------------------+-------------------------------------------------------+
      | .. code-block:: c                                     | .. code-block:: c                                     |
      |                                                       |                                                       |
      |    BOOL UART_TXGDMA_Init(                             |    BOOL UART_RXGDMA_Init(                             |
      |       u8 UartIndex,                                   |       u8 UartIndex,                                   |
      |       GDMA_InitTypeDef * GDMA_InitStruct,             |       GDMA_InitTypeDef * GDMA_InitStruct,             |
      |       void *CallbackData,                             |       void *CallbackData,                             |
      |       IRQ_FUN CallBackFunc,                           |       IRQ_FUN CallBackFunc,                           |
      |       u8 *pTxBuf,                                     |       u8 *pRxBuf,                                     |
      |       int TxCount                                     |       int RxCount                                     |
      |    )                                                  |    )                                                  |
      |    {                                                  |    {                                                  |
      |       u8 GdmaChnl;                                    |       u8 GdmaChnl;                                    |
      |                                                       |       UART_TypeDef * UARTx;                           |
      |       assert_param(GDMA_InitStruct != NULL);          |       assert_param(GDMA_InitStruct != NULL);          |
      |                                                       |                                                       |
      |       DCache_CleanInvalidate((u32)pTxBuf, TxCount);   |       DCache_CleanInvalidate((u32)pRxBuf, RxCount);   |
      |    }                                                  |    }                                                  |
      +-------------------------------------------------------+-------------------------------------------------------+