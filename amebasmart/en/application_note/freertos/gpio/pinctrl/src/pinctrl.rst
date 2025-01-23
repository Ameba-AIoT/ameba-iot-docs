.. _pinctrl:

Usage
--------
To configure the pin multiplexing function, follow the steps below:

1. Turn off SWD or enable audio pad share if the pin default function is SWD or audio, and configure it to other functions.

   .. code-block:: c

      Pinmux_Swdoff();
      HAL_WRITE32(PINMUX_REG_BASE, REG_PAD_AUD_PAD_CTRL, 0x1FFFFF);

2. Configure the pinmux function.

   .. code-block:: c

      Pinmux_Config(u8 PinName, u32 PinFunc);

3. Set the pin pull type.

   .. code-block:: c

      PAD_PullCtrl(u8 PinName, u8 PullType); //normal mode
      PAD_SleepPullCtrl(u8 PinName, u8 PullType); //sleep and deepsleep mode

4. Set the driving strength if needed.

   .. code-block:: c

      PAD_DrvStrength(u8 PinName, u32 DrvStrength);
