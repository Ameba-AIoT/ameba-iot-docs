.. _ai_voice:

Introduction
------------
AIVoice provides offline AI solution to build voice related applications on Realtek Ameba SoCs.

Supported Realtek Ameba SoCs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +------------+---------+------------+------------------------------+-----------------------------------+
   | Chip       | OS      | Processor  | aivoice_lib_dir              | aivoice_example_dir               |
   +============+=========+============+==============================+===================================+
   | AmebaSmart | Linux   | CA32       | {LINUXSDK}/apps/aivoice      | {LINUXSDK}/apps/aivoice/example   |
   +------------+---------+------------+------------------------------+-----------------------------------+
   | AmebaSmart | RTOS    | CA32       | {RTOSSDK}/component/aivoice  | {RTOSSDK}/example/aivoice         |
   +------------+---------+------------+------------------------------+-----------------------------------+
   | AmebaLite  | RTOS    | HiFi5 DSP  | {DSPSDK}/lib/aivoice         | {DSPSDK}/example/example_aivoice  |
   +------------+---------+------------+------------------------------+-----------------------------------+

Modules
~~~~~~~~~~~~~~~~~~~~~~~~
AFE (Audio Front End)
^^^^^^^^^^^^^^^^^^^^^^^^
AFE is audio signal processing module for enhancing speech signals. It can improve robustness of speech recognition system or improve signal quality of communication system.

In AIVoice, AFE includes submodules:

- AEC (Acoustic Echo Cancellation)
- BF (Beamforming)
- NS (Noise Suppression)
- AGC (Automatic Gain Control)

Currently SDK provides libraries for four microphone arrays:

- 1mic
- 2mic_30mm
- 2mic_50mm
- 2mic_70mm

Other microphone arrays or performance optimizations can be provided through customized services.

KWS (Keyword Spotting)
^^^^^^^^^^^^^^^^^^^^^^^^
KWS is the module to detect specific wakeup words from audio. It is usually the first step in a voice interaction system. The device will enter the state of waiting voice commands after detecting the keyword.

In AIVoice, two solutions of KWS are available:

.. table::
   :width: 100%
   :widths: auto

   +--------------------+-------------------+----------------------------------------------------------+-----------------------------------+
   | Solution           | Training Data     | Available Keywords                                       | Feature                           |
   +--------------------+-------------------+----------------------------------------------------------+-----------------------------------+
   | Fixed Keyword      | specific keywords | keywords same as training data                           | better performance; smaller model |
   +--------------------+-------------------+----------------------------------------------------------+-----------------------------------+
   | Customized Keyword | common data       | customized keyword of the same language as training data | more flexible                     |
   +--------------------+-------------------+----------------------------------------------------------+-----------------------------------+

Currently SDK provides a fixed keyword model library of Chinese keyword "xiao-qiang-xiao-qiang" or "ni-hao-xiao-qiang". Other keywords or performance optimizations can be provided through customized services.

VAD (Voice Activity Detection)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
VAD is the module to detect the presence of human speech in audio.

In AIVoice, a neural network based VAD is provided and can be used in speech enhancement, ASR system etc.

ASR (Automatic Speech Recognition)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
ASR is the module to recognize speech to text.

In AIVoice, ASR supports recognition of Chinese speech command words offline.

Currently SDK provides libraries for 40 air-conditioning related command words, including "打开空调" and "关闭空调" etc. Other command words or performance optimizations can be provided through customized services.

Flows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Some algorithm flows have been implemented to facilitate user development.

:- Full Flow: An offline full flow including AFE, KWS and ASR. AFE and KWS are always-on, ASR turns on and supports continuous recognition when KWS detects the keyword. ASR exits after timeout.
:- AFE+KWS: Offline flow including AFE and KWS, always-on.

Configuraions
---------------
AIVoice
~~~~~~~~~~~~~~~
Configurable parameters:

:- no_cmd_timeout: ASR exits when no command word detected during this duration. **ONLY used in full flow.**
:- memory_alloc_mode: Default mode uses SDK default heap. SRAM mode uses SDK default heap while also allocate space from SRAM for memory critical data. **SRAM mode is ONLY available on AmebaLite DSP now.**

Please refer to ``${aivoice_lib_dir}/include/aivoice_sdk_config.h`` for details.

AFE
~~~~~~~~~~~~~~~
AFE configuration includes microphone array, working mode, submodule switches, etc.

.. code-block:: c

   typedef struct afe_config{

       // AFE common parameter
       afe_mic_geometry_e  mic_array;          // microphone array. Make sure to choose the matched resource library
   	int ref_num;                            // reference channel number, must be 0 or 1. AEC will be disabled if ref_num=0.
   	int sample_rate;                        // sampling rate(Hz), must be 16000
       int frame_size;                         // frame length(samples), must be 256

       afe_mode_e afe_mode;                    // AFE mode, for ASR or voice communication. Only support AFE for ASR in current version.
       bool enable_aec;                        // AEC(Acoustic Echo Cancellation) module switch
       bool enable_ns;                         // NS(Noise Suppression) module switch
       bool enable_agc;                        // AGC(Automation Gain Control) module switch
       bool enable_ssl;                        // SSL(Sound Source Localization) module switch. SSL is not supported in current version.

       // AEC module parameter
       afe_aec_mode_e aec_mode;                // AEC mode, signal process or NN method. NN method is not supported in current version.
       int aec_enable_threshold;               // ref signal amplitude threshold for AEC, the value should be in [0, 100].
                                               // larger value means the minimum echo to be cancelled will be larger.
       bool enable_res;                        // AEC residual echo suppression module switch
       afe_aec_filter_tap_e aec_cost;          // higher cost means longer filter length and more echo reduction
       afe_aec_res_aggressive_mode_e res_aggressive_mode;  // higher mode means more residual echo suppression but more distortion

       // NS module parameter
       afe_ns_mode_e ns_mode;                  // NS mode, signal process or NN method. NN method is not supported in current version.
       afe_ns_aggressive_mode_e ns_aggressive_mode;        // higher mode means more stationary noise suppression but more distortion

       // AGC module parameter
       int agc_fixed_gain;                     // AGC fixed gain(dB) applied on AFE output, the value should be in [0, 18].
       bool enable_adaptive_agc;               // adaptive AGC switch. Not supported in current version.

       // SSL module parameter
       float ssl_resolution;                   // SSL solution(degree)
       int ssl_min_hz;                         // minimum frequency(Hz) of SSL module.
       int ssl_max_hz;                         // maximum frequency(Hz) of SSL module.
   } afe_config_t;

If you need to change mic_array, both configuration and afe resource library should change accordingly.

Please refer to ``${aivoice_lib_dir}/include/aivoice_afe_config.h`` for details.

.. attention::
   Please make sure the mic_array and ref_num in configuration match AFE input audio.

KWS
~~~~~~~~~~~~~~~
Configurable parameters:

:- keywords: Keywords for wake up, and **available keywords depend on KWS model**. If the KWS model is a fixed keyword solution, keywords can only be chosen from the trained words. For customized solution, keywords can be customized with any combinations of same language unit(such as pinyin for Chinese). Example: "xiao-qiang-xiao-qiang".
:- thresholds: Threshold for wake up, range [0, 1]. The higher, less false alarm, but harder to wake up. Set to 0 to use sensitivity with predefined thresholds.
:- sensitivity: Three levels of sensitivity are provided with predefined thresholds. The higher, easier to wake up but also more false alarm. **ONLY works when thresholds set to 0.**

Please refer to ``${aivoice_lib_dir}/include/aivoice_kws_config.h`` for details.

VAD
~~~~~~~~~~~~~~~
Configurable parameters:

:- sensitivity: Three levels of sensitivity are provided with predefined thresholds. The higher, easier to detect speech but also more false alarm.
:- left_margin: Time margin added to the start of speech segment, which makes the start offset earlier than raw prediction. Only affects offset_ms of VAD output, it won't affect the event trigger time of status 1.
:- right_margin: Time margin added to the end of speech segment, which makes the end offset later than raw prediction. Affects both offset_ms of VAD output and event time of status 0.

Please refer to ``${aivoice_lib_dir}/include/aivoice_vad_config.h`` for details.

.. note::
   left_margin only affects offset_ms returned by VAD, it won't affect the VAD event trigger time. If you need get the audio during left_margin, please implement a buffer to keep audio.

ASR
~~~~~~~~~~~~~~~~
Configurable parameters:

:- sensitivity: Three levels of sensitivity are provided with predefined internal parameters.The higher, easier to detect commands but also more false alarm.

Please refer to ``${aivoice_lib_dir}/include/aivoice_asr_config.h`` for details.

Interfaces
---------------
Flow and Module Interfaces
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +----------------------------+-------------+
   | Interface                  | flow/module |
   +============================+=============+
   | aivoice_iface_full_flow_v1 | AFE+KWS+ASR |
   +----------------------------+-------------+
   | aivoice_iface_afe_kws_v1   | AFE+KWS     |
   +----------------------------+-------------+
   | aivoice_iface_afe_v1       | AFE         |
   +----------------------------+-------------+
   | aivoice_iface_vad_v1       | VAD         |
   +----------------------------+-------------+
   | aivoice_iface_kws_v1       | KWS         |
   +----------------------------+-------------+
   | aivoice_iface_asr_v1       | ASR         |
   +----------------------------+-------------+

All interfaces support below functions:

- create()
- destroy()
- reset()
- feed()

Please refer to ``${aivoice_lib_dir}/include/aivoice_interface.h`` for details.

Event and Callback Message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +-------------------------------+---------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
   | aivoice_out_event_type        | Event Trigger Time                                            | Callback Message                                                                                               |
   +===============================+===============================================================+================================================================================================================+
   | AIVOICE_EVOUT_VAD             | when VAD detects start or end point of a speech segment       | struct includes VAD status, offset.                                                                            |
   +-------------------------------+---------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
   | AIVOICE_EVOUT_WAKEUP          | when KWS detects keyword                                      | json string includes id, keyword, and score. Example: {"id":2,"keyword":"ni-hao-xiao-qiang","score":0.9}       |
   +-------------------------------+---------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
   | AIVOICE_EVOUT_ASR_RESULT      | when ASR detects command word                                 | json string includes fst type, commands and id. Example: {"type":0,"commands":[{"rec":"play music","id":14}]}  |
   +-------------------------------+---------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
   | AIVOICE_EVOUT_AFE             | every frame when AFE got input                                | struct includes AFE output data, channel number, etc.                                                          |
   +-------------------------------+---------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
   | AIVOICE_EVOUT_ASR_REC_TIMEOUT | when no command word detected during a given timeout duration | NULL                                                                                                           |
   +-------------------------------+---------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------+

AFE Event Definition
^^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: c

   struct aivoice_evout_afe {
       int     ch_num;                       /* channel number of output audio signal, default: 1 */
       short*  data;                         /* enhanced audio signal samples */
       char*   out_others_json;              /* reserved for other output data, like flags, key: value */
   };

VAD Event Definition
^^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: c

   struct aivoice_evout_vad {
       int status;                     /*  0: vad is changed from speech to silence,
                                              indicating the end point of a speech segment
                                           1: vad is changed from silence to speech,
                                              indicating the start point of a speech segment */
       unsigned int offset_ms;         /* time offset relative to reset point. */
   };

KWS Mode
~~~~~~~~~~~~~~~~
Two KWS modes are provided for different use cases. Multi mode improves KWS and ASR accuracy compared to single mode, while also increases computation consumption and heap.

.. table::
   :width: 100%
   :widths: auto

   +-------------+--------------------------------------------+--------------------------------------------------+
   | KWS Mode    | Function                                   | Description                                      |
   +=============+============================================+==================================================+
   | single mode | void rtk_aivoice_set_single_kws_mode(void) | less computation consumption and less heap used  |
   +-------------+--------------------------------------------+--------------------------------------------------+
   | multi mode  | void rtk_aivoice_set_multi_kws_mode(void)  | better kws and asr accuracy                      |
   +-------------+--------------------------------------------+--------------------------------------------------+

.. attention::
   KWS mode MUST set before create instance in these flows:
      - aivoice_iface_full_flow_v1
      - aivoice_iface_afe_kws_v1

Examples
---------------
AIVoice Full Flow Offline Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This example shows how to use AIVoice full flow with a pre-recorded 3 channel audio and will run only once after EVB reset. **Audio functions such as recording and playback are not integrated.**

Steps of Using AIVoice
^^^^^^^^^^^^^^^^^^^^^^^
1. Select aivoice flow or modules needed. Set KWS mode to multi or single if using full flow or afe_kws flow.

   .. code-block:: c

      /* step 1:
       * Select the aivoice flow you want to use.
       * Refer to the end of aivoice_interface.h to see which flows are supported.
       */
      const struct rtk_aivoice_iface *aivoice = &aivoice_iface_full_flow_v1;
      rtk_aivoice_set_multi_kws_mode();

2. Build configuration.

   .. code-block:: c

      /* step 2:
       * Modify the default configure if needed.
       * You can modify 0 or more configures of afe/vad/kws/...
       */
      struct aivoice_config config;
      memset(&config, 0, sizeof(config));

      /*
       * here we use afe_res_2mic50mm for example.
       * you can change these configuratons according the afe resource you used.
       * refer to aivoce_afe_config.h for details;
       *
       * afe_config.mic_array MUST match the afe resource you linked.
       */
      struct afe_config afe_param = AFE_CONFIG_ASR_DEFAULT();
      afe_param.mic_array = AFE_LINEAR_2MIC_50MM;  // change this according to the linked afe resource.
      config.afe = &afe_param;

      /*
       * ONLY turn on these settings when you are sure about what you are doing.
       * it is recommend to use the default configure,
       * if you do not know the meaning of these configure parameters.
       */
      struct vad_config vad_param = VAD_CONFIG_DEFAULT();
      vad_param.left_margin = 300; // you can change the configure if needed
      config.vad = &vad_param;    // can be NULL

      struct kws_config kws_param = KWS_CONFIG_DEFAULT();
      config.kws = &kws_param;    // can be NULL

      struct asr_config asr_param = ASR_CONFIG_DEFAULT();
      config.asr = &asr_param;    // can be NULL

      struct aivoice_sdk_config aivoice_param = AIVOICE_SDK_CONFIG_DEFAULT();
      aivoice_param.no_cmd_timeout = 10;
      config.common = &aivoice_param; // can be NULL

3. Use **create()** to create and initialize aivoice instance with given configuration.

   .. code-block:: c

      /* step 3:
       * Create the aivoice instance.
       */
      void *handle = aivoice->create(&config);
      if (!handle) {
          return;
      }

4. Register callback function.

   .. code-block:: c

      /* step 4:
       * Register a callback function.
       * You may only receive some of the aivoice_out_event_type in this example,
       * depending on the flow you use.
       * */
      rtk_aivoice_register_callback(handle, aivoice_callback_process, NULL);

   The callback function can be modified according to user cases:

   .. code-block:: c

      static int aivoice_callback_process(void *userdata,
                                          enum aivoice_out_event_type event_type,
                                          const void *msg, int len)
      {

          (void)userdata;
          struct aivoice_evout_vad *vad_out;
          struct aivoice_evout_afe *afe_out;

          switch (event_type) {
          case AIVOICE_EVOUT_VAD:
                  vad_out = (struct aivoice_evout_vad *)msg;
                  printf("[user] vad. status = %d, offset = %d\n", vad_out->status, vad_out->offset_ms);
                  break;

          case AIVOICE_EVOUT_WAKEUP:
                  printf("[user] wakeup. %.*s\n", len, (char *)msg);
                  break;

          case AIVOICE_EVOUT_ASR_RESULT:
                  printf("[user] asr. %.*s\n", len, (char *)msg);
                  break;

          case AIVOICE_EVOUT_ASR_REC_TIMEOUT:
                  printf("[user] asr timeout\n");
                  break;

          case AIVOICE_EVOUT_AFE:
                  afe_out = (struct aivoice_evout_afe *)msg;

                  // afe will output audio each frame.
                  // in this example, we only print it once to make log clear
                  static int afe_out_printed = false;
                  if (!afe_out_printed) {
                          afe_out_printed = true;
                          printf("[user] afe output %d channels raw audio, others: %s\n",
                                     afe_out->ch_num, afe_out->out_others_json ? afe_out->out_others_json : "null");
                  }

                  // process afe output raw audio as needed
                  break;

          default:
                  break;
          }

          return 0;
      }

5. Use **feed()** to input audio data to aivoice.

   .. code-block:: c

      /* when run on chips, we get online audio stream,
       * here we use a fix audio.
       * */
      const char *audio = (const char *)get_test_wav();
      int len = get_test_wav_len();
      int audio_offset = 44;
      int mics_num = 2;
      int afe_frame_bytes = (mics_num + afe_param.ref_num) * afe_param.frame_size * sizeof(short);
      while (audio_offset <= len - afe_frame_bytes) {
              /* step 5:
               * Feed the audio to the aivoice instance.
               * */
              aivoice->feed(handle,
                            (char *)audio + audio_offset,
                            afe_frame_bytes);

              audio_offset += afe_frame_bytes;
      }

6. (Optional) If need reset status, use **reset()**.

7. If aivoice no longer needed, use **destroy()** to destroy the instance.

   .. code-block:: c

      /* step 6:
      * Destroy the aivoice instance */
      aivoice->destroy(handle);

Please refer to ``${aivoice_example_dir}/full_flow_offline`` for more details.

Build Example
^^^^^^^^^^^^^^^^^^^^^^^
.. only:: RTL8726EA

   1. Build Tensorflow Lite Micro Library for DSP, refer to :ref:`build_tflm_lib`.

   2. Import ``{DSPSDK}/example/aivoice/full_flow_offline`` source in Xtensa Xplorer.

   3. Set software configurations and modify libraries such as AFE resource if needed.

      - add include path (-I)

        ${workspace_loc}/../lib/aivoice/include
      - add library search path (-L)

        ${workspace_loc}/../lib/aivoice/prebuilts/$(TARGET_CONFIG)
        ${workspace_loc}/../lib/xa_nnlib/v1.8.1/bin/$(TARGET_CONFIG)/Release
        ${workspace_loc}/../lib/lib_hifi5/project/hifi5_library/bin/$(TARGET_CONFIG)/Release
        ${workspace_loc}/../lib/tflite_micro/project/bin/$(TARGET_CONFIG)/Release
      - add libraries (-l)

        -laivoice -lafe_kernel -lafe_res_2mic50mm -lkernel -lvad -lkws -lasr -lfst -lcJSON -ltomlc99 -ltflite_micro -lxa_nnlib -lhifi5_dsp

   4. Build image, please follow steps in :ref:`dsp_build <build_environment_for_dsp>`.

Glossary
---------------
.. glossary::
   :sorted:

   AEC
      Acoustic Echo Cancellation, or echo cancellation, refers to removing the echo signal from the input signal. The echo signal is generated by a sound played through the speaker of the device then captured by the microphone.

   AFE
      Audio Front End, refers to a combination of modules for preprocessing raw audio signals. It's usually performed to improve the quality of speech signal before the voice interaction, including several speech enhancement algorithms.

   AGC
      Automatic Gain Control, an algorithm that dynamically controls the gain of a signal and automatically adjust the amplitude to maintain an optimal signal strength.

   ASR
      Automatic Speech Recognition, or Speech-to-Text, refers to recognition of spoken language from audio into text. It can be used to build voice-user interface to enable spoken human interaction with AI devices.

   BF
      BeamForming, refers to a spatial filter designed for a microphone array to enhance the signal from a specific direction and attenuate signals from other directions.

   KWS
      Keyword Spotting, or wakeup word detection, refers to identifying specific keywords from audio. It is usually the first step in a voice interaction system. The device will enter the state of waiting voice commands after detecting the keyword.

   NN
      Neural Network, is a machine learning model used for various task in artificial intelligence. Neural networks rely on training data to learn and improve their accuracy.

   NS
      Noise Suppression, or noise reduction, refers to suppressing ambient noises in the signal to enhance the speech signal, especially stationary noises.

   RES
      Residual Echo Suppression, refers to suppressing the remained echo signal after AEC processing. It is a postfilter for AEC.

   SSL
      Sound Source Localization, or direction of arrival(DOA), refers to estimating the spatial location of a sound source using a microphone array.

   TTS
      Text-To-Speech, or speech synthesis, is a technology that converts text into spoken audio. It can be used in any speech-enabled application that requires converting text to speech imitating human voice.

   VAD
      Voice Activity Detection, or speech activity detection, is a binary classifier to detect the presence or absence of human speech. It is widely used in speech enhancement, ASR system etc, and can also be used to deactivate some processes during non-speech section of an audio session, saving on computation or bandwidth.