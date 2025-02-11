.. tab:: RTL8726E/RTL8720E

   .. code::

      const CapTouch_CHInitTypeDef ctc_ch_config[9] =
      {
         /*DiffThreshold, MbiasCurrent, ETCNNoiseThr, ETCPNoiseThr, CHEnable*/
         {800,      0x0C,      400,    400,    ENABLE}, /* Channel 0 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 1 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 2 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 3 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 4 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 5 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 6 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 7 */
         {800,      0x0C,      400,    400,    DISABLE}, /* Channel 8 */
      };

