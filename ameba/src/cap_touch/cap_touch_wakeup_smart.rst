.. tab:: RTL8730E

   When using CTC as a wakeup source, configure the CTC and system as follows:

   1. Initialize CTC and enable its interrupt according to :ref:`ctc_initialization`.

   2. Set the related wakeup source (*WAKE_SRC_CTOUCH*) in ``sleep_wevent_config[]`` to *WAKEUP_AP*, *WAKEUP_NP*, or *WAKEUP_LP* (based on which CPU you want to wake). The interrupt should be registered on the same CPU selected by ``sleep_wevent_config[]``.

   3. Switch CTC clock source to 131K clock before system enters sleep mode by :func:`RCC_PeriphClockSource_CTC()`.

   4. Enter sleep mode by releasing the wakelock in CA32 (``PMU_OS`` needs to be released since it is acquired by default when boot).

   5. Clear the CTC interrupt when wake up and switch CTC clock source to LS APB clock by :func:`RCC_PeriphClockSource_CTC()`.

