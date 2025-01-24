.. tab :: RTL8721Dx

   The SoC supports ISP (In-System Programming)  via LOGUART (``PB4`` and ``PB5``). The ISP mode is determined by the state of ``PB5`` when boot.


   .. table:: ISP mode
      :width: 100%
      :widths: auto

      +-----------+---------------------+-------------------------------------------------+
      | Boot Mode | PB5 (UART_DOWNLOAD) | Description                                     |
      +===========+=====================+=================================================+
      | No ISP    | HIGH                | ISP bypassed. Part attempts to boot from Flash. |
      +-----------+---------------------+-------------------------------------------------+
      | ISP       | LOW                 | Part enters ISP via LOGUART.                    |
      +-----------+---------------------+-------------------------------------------------+

