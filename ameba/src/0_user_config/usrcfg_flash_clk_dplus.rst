.. tab:: RTL8721Dx

   **Github**: `rtl8721dx ameba_flashcfg.c <https://github.com/Ameba-AIoT/ameba-rtos/blob/master/component/soc/amebalite/usrcfg/ameba_flashcfg.c>`_

   **Flash_Speed**

   Flash runs half as fast as the SPI Flash controller.
   By default, the speed of the SPI Flash controller is divided by the PLL, and the speed of the SPI Flash controller shall be less than ``SPIC_CLK_LIMIT`` (208MHz).
   If the Flash needs to run slower, change the value of ``Flash_Speed`` (SPIC0) or ``Data_Flash_Speed`` (SPIC1).

   .. code-block:: c

      const u16 Flash_Speed = CLKDIV(2);
      const u16 Data_Flash_Speed = CLKDIV(2);

   .. table::
      :width: 100%
      :widths: auto

      +----------------------+----------------------------------------------+----------------+
      | Value of Flash_Speed | Description                                  | Flash baudrate |
      +======================+==============================================+================+
      | CLKDIV(10)           | Flash baudrate will be 1/10 of PLL           | PLL/20         |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(9)            | Flash baudrate will be 1/9 of PLL            | PLL/18         |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(8)            | Flash baudrate will be 1/8 of PLL            | PLL/16         |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(7)            | Flash baudrate will be 1/7 of PLL            | PLL/14         |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(6)            | Flash baudrate will be 1/6 of PLL            | PLL/12         |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(5)            | Flash baudrate will be 1/5 of PLL            | PLL/10         |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(4)            | Flash baudrate will be 1/4 of PLL            | PLL/8          |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(3)            | Flash baudrate will be 1/3 of PLL            | PLL/6          |
      +----------------------+----------------------------------------------+----------------+
      | CLKDIV(2)            | Flash baudrate will be 1/2 of PLL            | PLL/4          |
      +----------------------+----------------------------------------------+----------------+



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

