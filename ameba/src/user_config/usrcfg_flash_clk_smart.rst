.. tab:: RTL8730E

   **Github**: `rtl8730e ameba_flashcfg.c <https://github.com/Ameba-AIoT/ameba-rtos/blob/master/component/soc/amebasmart/usrcfg/ameba_flashcfg.c>`_

   **Flash_Speed**

   Flash runs half as fast as the SPI Flash controller.

   **TBD**


   **Flash_ReadMode**

   .. table::
      :width: 100%
      :widths: auto

      +-------------------------+---------------------------+
      | Value of Flash_ReadMode | Description               |
      +=========================+===========================+
      | 0xFFFF                  | Address & Data 4-bit mode |
      +-------------------------+---------------------------+
      | 0x7FFF                  | Just data 4-bit mode      |
      +-------------------------+---------------------------+
      | 0x3FFF                  | Address & Data 2-bit mode |
      +-------------------------+---------------------------+
      | 0x1FFF                  | Just data 2-bit mode      |
      +-------------------------+---------------------------+
      | 0x0FFF                  | 1-bit mode                |
      +-------------------------+---------------------------+

   .. note:: If the configured read mode is not supported, other modes would be searched until finding out the appropriate mode.

   **Flash_Layout**

   The default Flash layout in the SDK are illustrated in Chapter :ref:`Flash Layout <flash_layout>`. If you want to modify the Flash layout, refer to Section :ref:`how_to_modify_flash_layout`.

   **Flash Protect Enable**

   For more information about this function, refer to Section :ref:`flash_protect_enable` .

   **Flash Pinmap**

   For more information about pinmap configuration, refer to User Manual (Chapter I/O Control).

