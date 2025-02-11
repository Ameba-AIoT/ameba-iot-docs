.. tab:: RTL8730E

   .. code::

      const CapTouch_CHInitTypeDef ctc_ch_config[9] = {
         /*DiffThreshold, MbiasCurrent, ETCNNoiseThr, ETCPNoiseThr, CHEnable*/
         {400,      0x0C,      200,    200,      ENABLE}, /* Channel 0 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 1 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 2 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 3 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 4 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 5 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 6 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 7 */
         {400,      0x0C,      200,    200,      DISABLE}, /* Channel 8 */
      };
