.. tab:: RTL8721Dx

   .. code::

      const CapTouch_CHInitTypeDef ctc_ch_config[4] =
      {
         /*DiffThreshold, MbiasCurrent, ETCNNoiseThr, ETCPNoiseThr, CHEnable*/
         {80,      0x0C,      40,    40,    ENABLE}, /* Channel 0 */
         {80,      0x0C,      40,    40,    DISABLE}, /* Channel 1 */
         {80,      0x0C,      40,    40,    DISABLE}, /* Channel 2 */
         {80,      0x0C,      40,    40,    DISABLE}, /* Channel 3 */
      };