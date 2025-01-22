.. tab:: Raspberry Pi

   Host driver has been tested on Raspberry Pi 4.


   You can use ``dtoverlay`` command to configure SDIO on Raspberry Pi, please input the following command in Raspberry Pi:

      .. code-block:: C

         dtoverlay sdio poll_once=off

   The subsequent steps are the same as descripted in list host porting guide.