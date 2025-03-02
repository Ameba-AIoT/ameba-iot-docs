.. _power_saving:

Power Architecture
-----------------------------------

SoC has an advanced Power Management Controller (PMC), which can flexibly power up different power domains of the chip, to achieve the best balance between chip performance and power consumption. AON, SYSON, SOC are three main power domains in digital system. Functions in different power domains will be turned off differently in different power-saving modes.

.. tabs::

   .. include:: ps_power_arch_dplus.rst
   .. include:: ps_power_arch_lite_26E13E.rst
   .. include:: ps_power_arch_lite_20E10E.rst
   .. include:: ps_power_arch_smart.rst

Power-Saving Mode
------------------
.. include:: ps_mode.rst

Tickless for FreeRTOS
-----------------------
.. include:: ps_tickles.rst

Wi-Fi Power Saving
------------------------------------
.. include:: ps_wifi_power_save.rst

Wakeup Source
--------------------------
.. tabs::
   .. include:: ps_wake_source_dplius.rst
   .. include:: ps_wake_source_lite_26E13E.rst
   .. include:: ps_wake_source_lite_20E10E.rst
   .. include:: ps_wake_source_smart.rst

Entering Sleep Mode
--------------------------------------
.. include:: ps_sleep_enter.rst

Entering Deep-Sleep Mode
------------------------------------------------
.. include:: ps_dsleep_enter.rst

Power-Saving Configuration
----------------------------
Please reference User Config chapter for detail information.

Power-Saving Related APIs
--------------------------------------------------
.. include:: ps_apis.rst

Wakeup Reason APIs
~~~~~~~~~~~~~~~~~~~~
.. tabs::
   .. include:: ps_wake_reason_dplus.rst
   .. include:: ps_wake_reason_lite.rst
   .. include:: ps_wake_reason_smart.rst

Wakeup time
--------------------------------------------
.. tabs::
   .. include:: ps_wake_time_dplus.rst
   .. include:: ps_wake_time_lite.rst
   .. include:: ps_wake_time_smart.rst

UART and LOGUART
--------------------------------------
.. tabs::
   .. include:: ps_uart_loguart_dplus.rst
   .. include:: ps_uart_loguart_lite.rst
   .. include:: ps_uart_loguart_smart.rst