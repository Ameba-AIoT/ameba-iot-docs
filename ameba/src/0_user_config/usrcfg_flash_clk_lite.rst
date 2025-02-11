This section introduces the Flash-related configurations including speed, read mode, layout and protect mode.

**Flash_Speed**

.. table::
   :width: 100%
   :widths: auto

   +----------------------+----------------------------------------------+----------------+
   | Value of Flash_Speed | Description                                  | Flash baudrate |
   +======================+==============================================+================+
   | 0xFFFF               | Flash baudrate will be 1/20 of PLLM          | PLLM/20        |
   +----------------------+----------------------------------------------+----------------+
   | 0x7FFF               | Flash baudrate will be 1/18 of np core clock | PLLM/18        |
   +----------------------+----------------------------------------------+----------------+
   | 0x3FFF               | Flash baudrate will be 1/16 of np core clock | PLLM/16        |
   +----------------------+----------------------------------------------+----------------+
   | 0x1FFF               | Flash baudrate will be 1/14 of np core clock | PLLM/14        |
   +----------------------+----------------------------------------------+----------------+
   | 0xFFF                | Flash baudrate will be 1/12 of np core clock | PLLM/12        |
   +----------------------+----------------------------------------------+----------------+
   | 0x7FF                | Flash baudrate will be 1/10 of np core clock | PLLM/10        |
   +----------------------+----------------------------------------------+----------------+
   | 0x3FF                | Flash baudrate will be 1/8 of np core clock  | PLLM/8         |
   +----------------------+----------------------------------------------+----------------+
   | 0x1FF                | Flash baudrate will be 1/6 of np core clock  | PLLM/6         |
   +----------------------+----------------------------------------------+----------------+
   | 0xFF                 | Flash baudrate will be 1/4 of np core clock  | PLLM/4         |
   +----------------------+----------------------------------------------+----------------+

.. note::
      - Refer to :ref:`user_configuration_soc_clock_switch` for details about PLLM.

      - The maximum clock of Flash is 120MHz. The initial flow will check whether the configured speed is higher than the maximun one or not.

      - Other value is not supported.


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

