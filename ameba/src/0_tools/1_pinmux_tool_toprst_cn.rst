Pinmux Tool
==========================

Introduction
-------------
The Pinmux Tool is the official pinmux and clock adjustment tool developed by Realtek for Ameba series SoC, which is used to adjust chip's pinmux and clock.

The UI of Pinmux Tool is shown below:

.. figure:: figures/pinmuxtool_ui_1.png
   :scale: 70%
   :align: center

.. figure:: figures/pinmuxtool_ui_2.png
   :scale: 70%
   :align: center

Environment Setup
------------------
Software setup:

- Environment Requirements: EX. WinXP, Win 7 or later, Microsoft .NET Framework 4.0.

- Software location: ``{SDK}\tools\Ameba\PinmuxTool\AmebaPinmuxTool.exe``

Pinmux Adjustment
------------------
Project Creation
~~~~~~~~~~~~~~~~~
The steps of creating a new project are illustrated below:

1. Click :guilabel:`Project` button in menu bar.

2. Click :guilabel:`New Project` button.

3. Choose the chip type

   .. figure:: figures/pinmuxtool_choose_chip.png
      :scale: 80%
      :align: center

Pin Assignment
~~~~~~~~~~~~~~~
The ``Pinmux`` page contains three parts:

- ``Peripherals``: shows all peripherals of the chip, containing ``Dedicated Function`` and ``Fully Programmable Function``.

- ``Signal``: shows specific peripheral's signal, used to assign pin for signal.

- ``Layout``: shows the chip's pinout.

The steps of assigning pin to peripheral are illustrated below:

1. Choose specific peripheral in ``Peripherals``.

2. Assigning pin to required signals in ``Signal``.

3. ``Layout`` will update pinout synchronously

   .. figure:: figures/pinmuxtool_layout.png
      :scale: 70%
      :align: center

.. note::

      - When both dedicated function and fully programmable function can be configured as one function, using of dedicated function can achieve a higher speed.

      - When peripherals need be used in group, select one of the functions and the remaining functions will be assigned automatically.


Function Assignment
~~~~~~~~~~~~~~~~~~~~
The ``Layout`` page shows chip's pinout. GPIO pin's color is blue, which can be assigned to different functions. The steps of assigning function to pin are illustrated below:

1. Select a pin.

2. Click the pin to show all functions it can be assigned to.

3. Select the required function.

4. Right-click to reset pin or lock function in pin.

After function assignment, the color of pin will turn **green** or **orange**:

- **Green**: means all functions of this peripheral are assigned.

- **Orange**: means not all functions of this peripheral are assigned.

The pinout table below will dynamically update the information of each pin.

.. figure:: figures/pinmuxtool_pinout_table_1.png
   :scale: 70%
   :align: center

.. figure:: figures/pinmuxtool_pinout_table_2.png
   :scale: 70%
   :align: center

File Generation
~~~~~~~~~~~~~~~~~
After assigning pinmux, a corresponding table can be generated, steps are illustrated below:

1. Click :guilabel:`Project` button.

2. Click :guilabel:`Generate File` button.

3. Select file path and enter file name

The file will be generated in the corresponding directory with the format ``.csv``.

Project Saving and Loading
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The steps of saving project are illustrated below:

1. Click :guilabel:`Project` button.

2. Click :guilabel:`Save Project` button.

3. Select file path and enter file name.

The file will be generated in the corresponding directory with the format ``.pmx``.

The steps of loading project steps are illustrated below:

1. Click :guilabel:`Project` button.

2. Click :guilabel:`Save Project` button.

3. Choose file.

4. Tool will update UI.

Clock
----------
Clock Adjustment
~~~~~~~~~~~~~~~~~
The ``Clock`` function is used to adjust chip's clock information. The adjustment steps are illustrated below:

1. Choose chip type in pinmux page.

2. Click :guilabel:`Clock` button.

3. Click open file icon.

4. Choose SDK file path.

5. Click :guilabel:`OK` button.

.. figure:: figures/pinmuxtool_clock_1.png
   :scale: 70%
   :align: center

Configuration Saving
~~~~~~~~~~~~~~~~~~~~~~
After completing the configuration of clock, click the save icon in menu bar to save it.
Modifications will be saved to the file: ``{SDK}\component\soc\amebadplus\usrcfg\ameba_bootcfg.c``

.. figure:: figures/pinmuxtool_saving.png
   :scale: 70%
   :align: center
