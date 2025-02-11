.. tab:: RTL8720EA

   To configure the pin multiplexing function, follow the steps below:


   1. Turn off the SWD pins if default function is SWD, and configure it to other functions.

      .. code-block:: c

         Pinmux_Swdoff();


   2. Configure pinmux function.

      .. code-block:: c

         Pinmux_Config(u8 PinName, u32 PinFunc);

   3. Set pin pull type.

      .. code-block:: c

         PAD_PullCtrl(u8 PinName, u8 PullType); //normal mode
         PAD_SleepPullCtrl(u8 PinName, u8 PullType); //sleep and deepsleep mode

   4. Set driving strength if needed.

      .. code-block:: c

         PAD_DrvStrength(u8 PinName, u32 DrvStrength);
