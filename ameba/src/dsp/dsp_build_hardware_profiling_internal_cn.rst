Hardware Profiling
----------------------------------------------------------
Hardware Profiling provides similar functionality to the ``--profile`` option of ISS but uses statistical sampling based on the real chip Performance Monitor interrupts. The profiler, implemented as a target library, periodically records the program counter value. At the end of the profiling session, accumulated data is transferred to the host via debugger. The debugger connected to the XT-OCD is used to accomplish the file I/O to and from hardware. Unlike the ISS, hardware-based profiling both perturbs the profiled code and is subject to statistical sampling errors.

Hardware Profiling Steps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Connect DSP to J-link Debugger

   This step can refer to the chapter :ref:`debugging_dsp_program` above.

2. Modify the RTK_LSP specs file

   The SPEC file path is: ``<dsp_sdk>\project\RTK_LSP\RI-2021.8\HIFI5_PROD_1123_asic_UPG\RTK_LSP\specs``
   
   Replace the last few lines of the spec file with the following code, then ctrl + s save file.
   
   .. code-block:: c

      *startfile:
      crt1-boards%O%s crti%O%s crtbegin%O%s _sharedvectors%O%s _vectors%O%s
      *endfile:
      crtend%O%s crtn%O%s
      *lib:
      -lc -lgdbio -lc -lhandler-reset -lhandlers-board -lgdbio -lhal -lc
   
3. Modify the heap/stack position and size in the RTK_LSP

   Import RTK_LSP into Workspace, then double click :guilabel:`RTK_LSP` in the **System Overview** tab. Increase the stack space (reset_stack segment), such as 400K (the default is 40K). The specific size is determined by the complexity of profiling. It should be noted that the modified segment addresses cannot overlap and cannot exceed the total size.
   
   .. figure:: figures/increase_stack_space_to_400k.png
      :scale: 60%
      :align: center
   
   Then press ctrl + s to save. Some warnings may pop up, which can be ignored.
   
4. Config Project

   We recommend creating a new build target based on the Release settings. Then add related compile and link options.
   
   .. figure:: figures/creating_new_build_target_based_on_release_settings.png
      :scale: 60%
      :align: center
      
   .. figure:: figures/enable_callgraph_data_collection_on_hardware.png
      :scale: 80%
      :align: center   
   
   .. figure:: figures/timer_for_hardware_profiling_performance_c.png
      :scale: 80%
      :align: center 

5. Modify the code and build project

   In the sample code below, :func:`profiling_function()` is the module to be profiled.
   
   .. code-block:: c

      #include "xtensa_api.h"
      #include <xtensa/xt_profiling.h>
      void func(void)
      {
      /* If the profile is complex, it is recommended to add memory: */
      // unsigned int extra_mem_size = 256*1024;
      // void *extra_mem = malloc(extra_mem_size);
      // memset(extra_mem, 0, extra_mem_size);
      // xt_profile_add_memory(extra_mem, extra_mem_size);
      xt_profile_enable();
      
      /* Part to be analyzed */
      profiling_function();
      
      xt_profile_disable();
      exit(0);
      }
      
   Rebuild the project.

   .. figure:: figures/rebuild_project_t_hwpf_build_active.png
      :scale: 90%
      :align: center   
   
   Note that the generated bin file cannot be burned into the flash, otherwise the DSP core cannot boot normally. The HW profiling firmware is loaded into memory through j-link when start to profiling.

6. Profiling settings

   a. Add new Profile Configuration:
   
      .. figure:: figures/add_new_profile_configuration.png
         :scale: 50%
         :align: center
   
   b. Select correct Topology File (refer to :ref:`debugging_dsp_program`), then connect to XOCD:
   
      .. figure:: figures/select_topology_file_in_ocd_connection.png
         :scale: 70%
         :align: center   
   
      .. figure:: figures/more_detailed_settings_in_core0.png
         :scale: 70%
         :align: center  
   
   c. Check the statistical items according to your needs. Pay attention to the number of Counters below, up to 8 can be used. Then click OK and profile.
   
      .. figure:: figures/the_number_of_counters_according_to_needs.png
         :scale: 60%
         :align: center
   
   After hw profiling ends, you need to manually open the results in the left side:
   
   .. figure:: figures/results_in_left_side_and_profiling_event_at_lower_right_arrow.png
      :scale: 50%
      :align: center
   
   ..note:: At the lower right arrow, you can choose to view different profiling events.
 
HW Profiling Precautions
~~~~~~~~~~~~~~~~~~~~~~~~~~
When performing HW profiling, pay attention to the following:

1. The DSP image compiled by the hardware profiling project cannot be burned into the flash. The flash needs to be an image that can run normally without reporting an error.

2. Reset MCU before profile.

3. printf output will be redirected to Xplorer console.

4. Profiling in RTOS task is not recommended.

5. Sometimes due to Xplorer's own reasons, when reading profile data, a java heap insufficient error is reported. Close the pop-up window without affecting the results.

6. When profile a complex project, the default profiling memory may not be large enough. The debugger console prompts ``Hardware Profiling Error: ran out of memory.`` You need to call xt_profile_add_memory to add memory. Note that this buffer needs to be initialized to all 0, and the address is 4Byte aligned.

7. By default, as soon as the main function is entered, the profiling information will be recorded even if the enable API is not called. If you only need part of the profiling information, you can call :func:`xt_profile_disable()` when you enter main, and call :func:`xt_profile_enable()` when you need to record information.

8. It is recommended to call :func:`exit(0)` to exit profiling. If you use this interface, you don't need to call :func:`xt_profile_save_and_reset()` additionally. If you do not use :func:`exit(0)` to exit, you need to call :func:`xt_profile_save_and_reset()` to save the profiling data to the PC.

9. It runs fast, but saving data to PC is very slow Data: 8k bytes/second for XOCD

10. You must add -hwpg to the Linker. If -hwpg is not added to compiler, it still works but some details will be lost. For example, the number of function calls and call relationship statistics, as well as some event statistics.

11. Reference content: *Xtensa Software Development Toolkit User's Guide* chapter 6.1.1 Hardware Profiling

HW Profiling Compare to ISS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table:: 
   :width: 100%
   :widths: auto

   +---------------+------------------------------------------------------------------------------------+---------------------------------------------------------------------+
   | Date          | HW Profiling                                                                       | ISS Profiling                                                       |
   +===============+====================================================================================+=====================================================================+
   | Advantages    | It runs on real memory, so it is closer to the actual running result of the chip.  | Every instruction is precise. Ability to count fine-grained events. |
   +---------------+------------------------------------------------------------------------------------+---------------------------------------------------------------------+
   | Disadvantages | The result is affected by the performance counter sampling frequency.              | Cannot run simultaneously with the other two cores.                 |
   |               |                                                                                    |                                                                     |
   |               | The results are not completely accurate. If the sampling interval is too large,    | Therefore, the codes related to IPC cannot be counted.              |
   |               |                                                                                    |                                                                     |
   |               | subtle parts may not be counted. The performance counter interrupt will affect     | Also, the memory latency model cannot be very accurate.             |
   |               |                                                                                    |                                                                     |
   |               | the normal execution flow and execution speed of the program.                      |                                                                     |
   +---------------+------------------------------------------------------------------------------------+---------------------------------------------------------------------+
