.. _key_scan:

Supported ICs
------------------------
.. table::
   :width: 100%
   :widths: auto

   +------------+------------+----------+----------+----------+
   | IC         | RTL8721Dx  | RTL8726E | RTL8720E | RTL8730E |
   +============+============+==========+==========+==========+
   | Supported  |     Y      |     N    |     N    |     N    |
   +------------+------------+----------+----------+----------+

Introduction
------------------------
As a keypad scan device, Key-Scan supports up to 8*8 keypad array, and its rows and columns are configurable. Key-Scan supports multi-key detect, and it can work in low power mode.

Block Diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~
The block diagram of Key-Scan is illustrated in the following figure.

.. figure:: figures/key_scan_block_diagram.svg
   :scale: 130%
   :align: center
   
   Key-Scan block diagram

Key-Scan contains 6 main parts:

- **Interrupt control**: control and manage interrupts.

- **Register and FIFO**: configure Key-Scan parameters and FIFO.

- **Clock**: Key-Scan clock, 131K clock is used for stuck row detect.

- **Keypad control**: contains Key-Scan control, wake up control and key input/output control.

- **Keypad**: up to 8*8 keypad array with use of 16 GPIOs

Keypad
~~~~~~~~~~~~
The columns and rows of Key-Scan are configurable, and the maximum columns or rows can be as 8.

.. figure:: figures/keypad_array.svg
   :scale: 130%
   :align: center
   :name: Keypad array
   
   Keypad array

At the beginning, all columns output low, and all rows are set as input with internal pull up.
When there is a key or multiple keys pressed (short between the Column and the Row), it triggers an internal state machine to start a Key-Scan cycle to determine the column and row of the key that is pressed.
The state machine sets first column as an output low and all other columns are in Hi-Z state. The state machine then scans all rows to determine which keys are being pressed, and then second column is output low until the last column.

Work Mode
~~~~~~~~~~~~~~~~~~
Key-Scan contains two work modes: Event Trigger Mode and Regular Scan Mode. The following figure shows the difference of FIFO items between Event Trigger Mode and Regular Scan Mode during a key press and release.

- In Event Trigger Mode, key press or release event is stored in the key event FIFO only once in each key press and release operation.

- In Regular Scan Mode, at each full scan, any key press event is stored in the key event FIFO until it is released (in this condition, only key press event is stored in the key event FIFO).

.. figure:: figures/difference_FIFO_items_between_two_work_modes.svg
   :scale: 130%
   :align: center
   
   Difference of FIFO items between two work modes

FIFO Mechanism
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The FIFO depth of Key-Scan is 16, and the FIFO entry width is 12 bits. Its structure is illustrated in the following figure.

.. figure:: figures/FIFO_structure.svg
   :scale: 130%
   :align: center
   
   FIFO structure


.. table:: FIFO Structure
   :width: 100%
   :widths: auto

   +------+--------------+-------------------------+
   | Bit  | Indication   | Description             |
   +======+==============+=========================+
   | [8]  | Event        | - 1: key press event.   |
   |      |              |                         |
   |      |              | - 0: key release event. |
   +------+--------------+-------------------------+
   | [7:4]| Row index    | - 1: row 0              |
   |      |              |                         |
   |      |              | - 2: row 1              |
   |      |              |                         |
   |      |              | - 3: row 2              |
   |      |              |                         |
   |      |              | - …                     |
   |      |              |                         |
   |      |              | - 8: row 7              |
   +------+--------------+-------------------------+
   | [3:0]| Column index | - 1: column 0           |
   |      |              |                         |
   |      |              | - 2: column 1           |
   |      |              |                         |
   |      |              | - 3: column 2           |
   |      |              |                         |
   |      |              | - …                     |
   |      |              |                         |
   |      |              | - 8: column 7           |
   +------+--------------+-------------------------+

Low Power
~~~~~~~~~~~~~~~~~~
Active
^^^^^^^^^^^^
In active mode, Key-Scan circuit keeps power on all the time. When Key-Scan scans column *x* (*x* is any column), it sets column *x* as an output low and all other columns are in Hi-Z state, then it scans all rows to determine which keys are being pressed or released, after this, one column scans end. Key-Scan scans column in sequence, and will be cyclic scanning column by column.

Sleep
^^^^^^^^^^
In practical application scenarios, Key-Scan keeps active is high power consumption. To save power consumption and optimize application, Key-Scan often works in sleep mode.


In sleep mode, CPU enter in low power state, but when a key or keys are pressed, it will wake up CPU and then Key-Scan will start to scan to determine which keys are being pressed. Key-Scan keeps scanning when keys are pressed, after keys are released and there is no other event occurs, CPU sleeps again.

Stuck Key
~~~~~~~~~~~~~~~~~~
Key stuck may occur in some applications. In this case, if there is no solution in reply to key stuck, CPU will keep active to perform continuous keypad scans, thus CPU cannot enter low power mode, which will result in high power consumption.

To solve this problem, the Key-Scan supports auto check key stuck function. When enabling this function, if a key stuck time is over than stuck time threshold, this key will be regarded as a stuck key. Read key stuck status registers to get the stuck key, and set the default status of the stuck key row to let CPU enter low power mode.

To lower the power consumption, stuck row detection function may be enabled to set row pins "no pull" detection time interval.

Usage
----------
Event Trigger Mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To use Key-Scan event trigger mode, perform the following procedures:

1. Configure Pinmux for Key-Scan keypads.

   a. Set column pads to no-pull, and set column pinmux function.

      .. code-block:: c

         PAD_PullCtrl(pad_colx, GPIO_PuPd_NOPULL);
         Pinmux_Config(pad_colx, PINMUX_FUNCTION_KEY_COLx);

   b. Set row pads to pull-up, and set key row pinmux function.

      .. code-block:: c

         PAD_PullCtrl(pad_rowx, GPIO_PuPd_UP);
         Pinmux_Config(pad_rowx, PINMUX_FUNCTION_KEY_ROWx);

2. Initialize Key-Scan parameters.

   Select key row number and column number (one bit one row or column) according to keypads, and set work mode to event trigger mode, etc.

   .. code-block:: c
   
      KeyScan_StructInit(&KeyScan_InitStruct);
      KeyScan_InitStruct.KS_ColSel = 0xFF;  //8 columns
      KeyScan_InitStruct.KS_RowSel = 0xFF;  //8 rows
      KeyScan_InitStruct.KS_WorkMode = KS_EVENT_TRIGGER_MODE;
      KeyScan_Init(KeyScan, &KeyScan_InitStruct);

3. Enable Key-Scan interrupt and register Key-Scan interrupt handle.

4. Enable Key-Scan.

   .. code-block:: c
   
      KeyScan_Cmd(KeyScan, ENABLE);

5. Wait Key-Scan interrupt, and handle Key-Scan interrupts.

Regular Scan Mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To use Key-Scan regular scan mode, perform the following procedures:

1. Configure Pinmux for Key-Scan keypads.

   a. Set column pads to no-pull, and set column pinmux function.

      .. code-block:: c

         PAD_PullCtrl(pad_colx, GPIO_PuPd_NOPULL);
         Pinmux_Config(pad_colx, PINMUX_FUNCTION_KEY_COLx);

   b. Set row pads to pull-up, and set key row pinmux function.

      .. code-block:: c

       PAD_PullCtrl(pad_rowx, GPIO_PuPd_UP);
       Pinmux_Config(pad_rowx, PINMUX_FUNCTION_KEY_ROWx);

2. Initialize Key-Scan parameters.

   Select key row number and column number (one bit one row or column) according to keypads, set work mode to regular scan mode, etc.

   .. code-block:: c
   
      KeyScan_StructInit(&KeyScan_InitStruct);
      KeyScan_InitStruct.KS_ColSel = 0xFF;  //8 columns
      KeyScan_InitStruct.KS_RowSel = 0xFF;  //8 rows
      KeyScan_InitStruct.KS_WorkMode = KS_REGULAR_SCAN_MODE;
      KeyScan_Init(KeyScan, &KeyScan_InitStruct);

3. Enable Key-Scan interrupt and register Key-Scan interrupt handle.

4. Enable Key-Scan.

   .. code-block:: c
   
      KeyScan_Cmd(KeyScan, ENABLE);

5. Wait Key-Scan interrupt, and handle Key-Scan interrupts.

Key Stuck
~~~~~~~~~~~~~~~~~~
When existing key stuck, perform the following procedures:

1. Configure Pinmux for Key-Scan keypads.

   a. Set column pads to no-pull, and set column pinmux function.

      .. code-block:: c

         PAD_PullCtrl(pad_colx, GPIO_PuPd_NOPULL);
         Pinmux_Config(pad_colx, PINMUX_FUNCTION_KEY_COLx);

   b. Set row pads to pull-up, and set key row pinmux function.

      .. code-block:: c
      
         PAD_PullCtrl(pad_rowx, GPIO_PuPd_UP);
         Pinmux_Config(pad_rowx, PINMUX_FUNCTION_KEY_ROWx);

2. Initialize Key-Scan parameters.

   Select key row number and column number (one bit one row or column) according to keypads, set work mode to regular scan mode, etc.

   .. code-block:: c
   
      KeyScan_StructInit(&KeyScan_InitStruct);
      KeyScan_InitStruct.KS_ColSel = 0xFF;  //8 columns
      KeyScan_InitStruct.KS_RowSel = 0xFF;  //8 rows
      KeyScan_Init(KeyScan, &KeyScan_InitStruct);

3. Enable Key-Scan stuck auto check function.

   .. code-block:: c
   
      KeyScan_StuckAutoCmd(KeyScan, ENABLE);

4. Set stuck time threshold, and configure stuckrow detect time and interval time.

   .. code-block:: c
   
      KeyScan_SetStuckThreshold(KeyScan, 10);  //stuck time threshold: 10ms
      KeyScan_StuckPeriodicalPull(KeyScan,2000,4000);//pull time:2000us, no pull time:4000us

5. Enable Key-Scan stuck and all default interrupt and register Key-Scan interrupt handle.

6. Enable Key-Scan.

   .. code-block:: c
   
      KeyScan_Cmd(KeyScan, ENABLE);

7. Wait Key-Scan interrupt, and handle Key-Scan interrupts.

   - In stuck event interrupt, get row status, and set row default status to indicate stuck row, then mask all the keys of the stuck row.

     .. code-block:: c
     
        row_status = KeyScan_GetStuckRow(KeyScan);
        KeyScan_SetStuckRow(KeyScan, row_status);

   - In all default interrupt, reset row default status to initial value, disable stuck event interrupt and all default interrupt, enable scan event interrupt and all release interrupt, then other keys except the stuck key can work normally.

     .. code-block:: c
     
        KeyScan_INTConfig(KeyScan, KS_BIT_ALL_DEFAULT_INT_MASK | KS_BIT_STUCK_EVENT_INT_MASK, DISABLE);
        KeyScan_SetStuckRow(KeyScan, 0);
        KeyScan_INTConfig(KeyScan, KS_BIT_ALL_RELEASE_INT_MASK | KS_BIT_SCAN_EVENT_INT_MASK, ENABLE);

8. Key or keys except the stuck press or release will generate the corresponding interrupt normally.

