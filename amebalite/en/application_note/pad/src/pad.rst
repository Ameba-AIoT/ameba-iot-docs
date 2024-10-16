.. _pad_control:

Pad Schmitt Trigger
--------------------------------------
All I/O pins include a schmitt trigger that can be selectively disabled by setting the ``PAD_BIT_SCHMITT_TRIGGER_EN`` bit in the ``PAD_CTRL`` register. The specification of schmitt trigger is listed in the following table.

.. table:: Schmitt trigger specification
   :width: 100%
   :widths: auto

   +-----------------+----------+----------+
   | I/O power       | 1.8V     | 3.3V     |
   +=================+==========+==========+
   | Schmitt trigger | VIH: TBD | VIH: TBD |
   +-----------------+----------+----------+
   | Schmitt trigger | VIL: TBD | VIL: TBD |
   +-----------------+----------+----------+

Pad Pull-Up and Pull-Down Configuration
------------------------------------------------------------------------------
The pad diagram is given in the following figure.

.. figure:: ../figures/pad_diagram.svg
   :scale: 140%
   :align: center
   
   Pad diagram

The pad setting of pull-up (PU) and pull-down (PD) depends on the following two factors:

- PU/PD register value

- PU/PD sleep mode register value


The PU/PD configuration circuit is shown in the following figure.

.. figure:: ../figures/pu_pd_configuration_circuit.svg
   :scale: 140%
   :align: center
   
   PU/PD configuration circuit

The state of all the GPIOs are High-Z before and after system power-on except that default pull is specified as internal pull-up or pull-down.

As listed in the following table, different pads have different internal weak PU/PD resistors.

.. table:: Pad characters
   :width: 100%
   :widths: auto
   :name: table_pad_characters

   +------------------------+--------------------------------+-------------------------------+----------------------+
   | Pad No.                | Driving strength :sup:`[1][2]` | PU/PD resistors :sup:`[1][2]` | I/O power :sup:`[3]` |
   +========================+================================+===============================+======================+
   | PA0 ~ PA13             | 8mA/16mA                       | 80kΩ                          | 3.3V                 |
   +------------------------+--------------------------------+-------------------------------+----------------------+
   | PA14 ~ PA18            | 8mA/16mA                       | 4.7kΩ/10kΩ                    | 3.3V                 |
   +------------------------+--------------------------------+-------------------------------+----------------------+
   | PA19 ~ PA22            | 4mA/8mA                        | 80kΩ                          | 3.3V                 |
   +------------------------+--------------------------------+-------------------------------+----------------------+
   | PA23 ~ PA27/PB6 ~ PB10 | 8mA/16mA                       | 4.7/10kΩ                      | 1.8V/3.3V            |
   +------------------------+--------------------------------+-------------------------------+----------------------+
   | PA28 ~ PA31/PB0 ~ PB5  | 4mA/8mA                        | 80kΩ                          | 1.8V/3.3V            |
   +------------------------+--------------------------------+-------------------------------+----------------------+


.. note::
   [1] The values above are under the typical condition: 25°C, I/O power =3.3V.

   [2] When the I/O power is 1.8V, the PU/PD resistors of pad is about two times of that at 3.3V, and the driving strength of pad is about half of that at 3.3V.
   
   [3] The PA23~PB10 support 1.8V and 3.3V I/O power, which can meet the communication requirements at different levels. All other pads only support 3.3V I/O power.


The pad with only one PU/PD resistor can be configured as follows:

.. table::
   :width: 100%
   :widths: auto

   +-------------------+-----------------------------+-----------------------------+-----------------------------+
   | Control register  | K1                          | K2                          | Pull state                  |
   +===================+=============================+=============================+=============================+
   | PU = 0 AND PD = 0 | OFF                         | OFF                         | No pull                     |
   +-------------------+-----------------------------+-----------------------------+-----------------------------+
   | PU = 1 AND PD = 0 | ON                          | OFF                         | R1=80kΩ, pull-up            |
   +-------------------+-----------------------------+-----------------------------+-----------------------------+
   | PU = 0 AND PD = 1 | OFF                         | ON                          | R2=80kΩ, pull-down          |
   +-------------------+-----------------------------+-----------------------------+-----------------------------+
   | PU = 1 AND PD = 1 | This setting is not allowed                                                             |
   +-------------------+-----------------------------------------------------------------------------------------+

The pad with two PU/PD resistors can be selected by changing the value of ``PUPDC``, default value of ``PUPDC`` is 1. The specific configuration is as follows:

.. table::
   :width: 100%
   :widths: auto

   +---------------------------------+-----------------------------+-----------------------------+-----------------------------+
   | Control register                | K1                          | K2                          | Pull state                  |
   +=================================+=============================+=============================+=============================+
   | PUPDC = x AND PU = 0 AND PD = 0 | OFF                         | OFF                         | No pull                     |
   +---------------------------------+-----------------------------+-----------------------------+-----------------------------+
   | PUPDC = 0 AND PU = 1 AND PD = 0 | ON                          | OFF                         | R1=10kΩ, pull-up            |
   +---------------------------------+-----------------------------+-----------------------------+-----------------------------+
   | PUPDC = 1 AND PU = 1 AND PD = 0 | ON                          | OFF                         | R1=4.7kΩ, pull-up           |
   +---------------------------------+-----------------------------+-----------------------------+-----------------------------+
   | PUPDC = 0 AND PU = 0 AND PD = 1 | OFF                         | ON                          | R2=10kΩ, pull-down          |
   +---------------------------------+-----------------------------+-----------------------------+-----------------------------+
   | PUPDC = 1 AND PU = 0 AND PD = 1 | OFF                         | ON                          | R2=4.7kΩ, pull-down         |
   +---------------------------------+-----------------------------+-----------------------------+-----------------------------+
   | PUPDC = x AND PU = 1 AND PD = 1 | This setting is not allowed                                                             |
   +---------------------------------+-----------------------------------------------------------------------------------------+

When the IC enters the sleep mode, the pull state that the pad needs to maintain during sleep can be configured by setting the PU/PD sleep mode register.

You can set pad status for every pad in both active and sleep mode in :file:`ameba_pinmapcfg.c`. It can be set automatically when boot.


Pad Driving Strength
----------------------------------------
The output driving strength of pad can be configured by setting the pad driving strength register. Refer to :ref:`Table Pad Characters <table_pad_characters>` for the detailed driving capacity.

Pad Shutdown and RESET
--------------------------------------------
The power of an I/O pad can be shut down to save power.

The Enable/Reset of pad can only be controlled by group, the shutdown of pad is the same. They are controlled by corresponding registers.

Input Enable Share Function
------------------------------------------------------
- If PA28 ~ PB5 are used as ADC function or Cap-Touch function, ``GPIO_IE`` bit in ``GPIO_DUMMY`` register needs to be configured to *0* to disable the input of the digital path.

- If PA28 ~ PB5 are used as GPIOs or other digital functions, ``GPIO_IE`` bit in ``GPIO_DUMMY`` register needs to be configured to *1* to enable the input of the digital path.

I2C Open Drain Mode
--------------------------------------
- If a pad is used as I2C function, it will switch to open-drain mode.

- If a pad is used as GPIOs or other digital functions, it will switch to push-pull mode.

