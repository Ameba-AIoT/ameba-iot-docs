.. tab:: RTL8726EA

   1. Turn off the SWD pins or enable audio share pad pins if default function is SWD or audio, and configure it to other functions.

      - For SWD pad:

         .. code-block:: c

            Pinmux_Swdoff();

      - For audio share pad (PB11~PB19):

         A. Enable audio codec analog IP active function

            .. code-block:: c

               RCC_PeriphClockCmd(APBPeriph_AC_AIP, NULL, ENABLE);

         B. Operation for specific pin

            .. code-block:: c

               switch (PinName) {
               case _PB_11:
               case _PB_12:
               AUDIO_CODEC_SetMicBstChnMute(AMIC1, MICIN, MUTE);
               break;
               case _PB_13:
               case _PB_14:
               AUDIO_CODEC_SetMicBstChnMute(AMIC2, MICIN, MUTE);
               break;
               case _PB_18:
               case _PB_19:
               AUDIO_CODEC_SetMicBstChnMute(AMIC3, MICIN, MUTE);
               break;

         C. Enable digital path input for audio share pad:

            .. code-block:: c

               APAD_InputCtrl(PinName, ENABLE);

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
