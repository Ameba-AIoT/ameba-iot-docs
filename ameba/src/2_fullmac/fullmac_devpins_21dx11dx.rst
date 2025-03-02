.. tab:: RTL8721Dx

   .. table::
      :width: 100%
      :widths: auto

      +------------+--------------------------+---------------+-----------------------------------------------------------------+
      | Interface  | RTL8721Dx Pin  | Function      | Description                                                     |
      +============+==========================+===============+=================================================================+
      | SPI        | PB24                     | SPI_MOSI      | SPI pins                                                        |
      | Host/Device+--------------------------+---------------+                                                                 |
      |            | PB25                     | SPI_MISO      |                                                                 |
      |            +--------------------------+---------------+                                                                 |
      |            | PB23                     | SPI_CLK       |                                                                 |
      |            +--------------------------+---------------+                                                                 |
      |            | PB26                     | SPI_CS        |                                                                 |
      |            +--------------------------+---------------+-----------------------------------------------------------------+
      |            | PB8                      | DEV_TX_REQ    | A input pin for host, output pin for dev, indicating that there |
      |            |                          |               |                                                                 |
      |            |                          |               | is a packet in dev wating to send to Host with a rising edge.   |
      |            +--------------------------+---------------+-----------------------------------------------------------------+
      |            | PB9                      | DEV_READY     | A input pin for host, output pin for dev, used to show that     |
      |            |                          |               |                                                                 |
      |            |                          |               | if dev is ready for a SPI transcation.                          |
      |            |                          |               |                                                                 |
      |            |                          |               | - 1: Device is ready.                                           |
      |            |                          |               | - 0: Device is busy.                                            |
      +------------+--------------------------+---------------+-----------------------------------------------------------------+
      | SDIO       | PB6                      | SDIO_DAT2     | SDIO pins                                                       |
      | Device     +--------------------------+---------------+                                                                 |
      |            | PB7                      | SDIO_DAT3     |                                                                 |
      |            +--------------------------+---------------+                                                                 |
      |            | PB8                      | SDIO_CMD      |                                                                 |
      |            +--------------------------+---------------+                                                                 |
      |            | PB9                      | SDIO_CLK      |                                                                 |
      |            +--------------------------+---------------+                                                                 |
      |            | PB13                     | SDIO_DAT0     |                                                                 |
      |            +--------------------------+---------------+                                                                 |
      |            | PB14                     | SDIO_DAT1     |                                                                 |
      +------------+--------------------------+---------------+-----------------------------------------------------------------+
