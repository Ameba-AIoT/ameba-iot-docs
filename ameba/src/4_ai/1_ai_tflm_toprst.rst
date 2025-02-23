TensorFlow Lite for Microcontrollers (TFLM)
===========================================

Introduction
------------------------
`TensorFlow Lite for Microcontrollers <https://github.com/tensorflow/tflite-micro>`_ is an open-source library, it is a port of TensorFlow Lite designed to run machine learning models on DSPs, microcontrollers and other devices with limited memory.

Ameba-tflite-micro is a version of the TensorFlow Lite Micro library for Realtek Ameba SoCs with platform specific optimizations, and is available in `ameba-rtos <https://github.com/Ameba-AIoT/ameba-rtos>`_.

Links:

- `tflite-micro github repository <https://github.com/tensorflow/tflite-micro>`_
- `tflite-micro document <https://ai.google.dev/edge/litert/microcontrollers/overview>`_

Supported Realtek Ameba SoCs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +-----------+------------------------------------------+-------------------+
   | OS        | Chip                                     | Processor         |
   +===========+==========================================+===================+
   | FreeRTOS  | RTL8730E                                 | CA32              |
   +           +------------------------------------------+-------------------+
   |           | RTL8713EC,RTL8726EA                      | HiFi5 DSP         |
   +           +------------------------------------------+-------------------+
   |           | RTL8710EC,RTL8713EC,RTL8720EA,RTL8726EA  | KM4               |
   +           +------------------------------------------+-------------------+
   |           | RTL8721Dx,RTL8711Dx                      | KM4               |
   +-----------+------------------------------------------+-------------------+

.. _build_tflm_lib:

Build Tensorflow Lite Micro Library
--------------------------------------
.. only:: RTL8726EA

   DSP
   ~~~~~~~~~~~~~~~~~
   To build Tensorflow Lite Micro Library for DSP, import ``{DSPSDK}/lib/tflite_micro`` as a project to the workspace in Xtensa Xplorer.

   1. Click ``File > Import > General > Existing Projects into Workspace`` and choose the path of ``{DSPSDK}/lib/tflite_micro``.

      .. figure:: figures/xplorer_import_existing_project.png
         :scale: 90%
         :align: center

   2. Set *P* to ``libtflite_micro``, *C* to ``HIFI5_PROD_1123_asic_UPG`` (or ``HIFI5_PROD_1123_asic_wUPG``), *T* to ``Release``, then click ``Build Active``.

      The output library will be placed under ``{DSPSDK}/lib/tflite_micro/project/bin/HIFI5_PROD_1123_asic_UPG/Release``.

      .. figure:: figures/xplorer_build_project.png
         :scale: 90%
         :align: center


.. only:: RTL8726EA

   KM4
   ~~~~~~~~~~~~~~~~~
   To build Tensorflow Lite Micro Library for KM4, enable tflite_micro configuration in SDK menuconfig.

   1. Switch to gcc project directory

      .. code-block::

         cd {SDK}/amebalite_gcc_project
         ./menuconfig.py

   2. Choose Kernel KM4

      .. figure:: figures/menuconfig_lite_km4.png
         :scale: 100%
         :align: center

   3. Choose AI config

      .. figure:: figures/menuconfig_lite_km4_ai.png
         :scale: 100%
         :align: center

   4. Enable tflite_micro

      .. figure:: figures/menuconfig_lite_km4_ai_tflm.png
         :scale: 100%
         :align: center


.. only:: RTL8721D

   KM4
   ~~~~~~~~~~~~~~~~~
   To build Tensorflow Lite Micro Library, enable tflite_micro configuration in SDK menuconfig.

   1. Switch to gcc project directory

      .. code-block::

         cd {SDK}/amebadplus_gcc_project
         ./menuconfig.py

   2. Choose Kernel KM4

      .. figure:: figures/menuconfig_dplus_km4.png
         :scale: 100%
         :align: center

   3. Choose AI config

      .. figure:: figures/menuconfig_dplus_km4_ai.png
         :scale: 100%
         :align: center

   4. Enable tflite_micro

      .. figure:: figures/menuconfig_dplus_km4_ai_tflm.png
         :scale: 100%
         :align: center

.. _build_tflm_example:

Build Examples
------------------------
.. only:: RTL8726EA

   DSP
   ~~~~~~~~~~~~~~~~~

   TensorFlow Lite for Microcontrollers related examples for DSP are in the ``{DSPSDK}/example/tflite_micro`` directory.

   To build an example image, please refer to :ref:`dsp_build <build_environment_for_dsp>` for steps and the README in the example directory for software configurations.

.. only:: RTL8726EA or RTL8721D

   KM4
   ~~~~~~~~~~~~~~~~~

TensorFlow Lite for Microcontrollers related examples are in the ``{SDK}/component/example/tflite_micro`` directory. To build an example image such as tflm_hello_world:

.. code-block::

   ./build.py -a tflm_hello_world

Tutorial
------------------------
MNIST
~~~~~~~~~~~~~~~~~~~~~~~~
Introduction
^^^^^^^^^^^^^
The *MNIST* database (Modified National Institute of Standards and Technology database) is a large collection of handwritten digits. In this tutorial, MNIST database is used to show a full workflow **from training a model to deploying it and run inference** on Ameba SoCs with tflite-micro.

Example codes are in the ``{SDK}/component/example/tflite_micro/tflm_mnist`` directory.

.. note::
   Step 1-4 are for preparing necessary files on a development machine (server or PC etc.). You can skip them and use prepared files to build the image.

Step 1. Train a Model
^^^^^^^^^^^^^^^^^^^^^^
First train and evaluate a classification model for 10 digits of MNIST dataset. You can choose either **keras(tensorflow)** or **pytorch** framework by running ``python keras_train_eval.py --output keras_mnist_conv`` or ``python torch_train_eval.py --output torch_mnist_conv``.

A simple convolution based model will be trained for several epochs and then accuracy will be tested.

Due to the limited **computation resources** and **memory** of microcontrollers, we recommend paying attention to **model size** and **operation numbers**.

- Use *keras_flops* library under tensorflow/keras framework:

  .. code-block:: python

     from keras_flops import get_flops

     model.summary()
     flops = get_flops(model, batch_size=1)


- Use *ptflops* library under pytorch framework:

  .. code-block:: python

     from ptflops import get_model_complexity_info

     macs, params = get_model_complexity_info(model, (1,28,28), as_strings=False)

After training, keras model is saved in SavedModel format. Pytorch model is saved in .pt format, while a .onnx file is also exported for later conversion stage.

Step 2. Convert to Tflite
^^^^^^^^^^^^^^^^^^^^^^^^^
In this stage, **post-training integer quantization** is applied on the trained model and output .tflite format. Float model inference is also supported on Ameba SoCs, however, we recommend using integer quantization which can extremely reduce computation and memory with little performance degradation.

- For models trained by keras(tensorflow), run

  .. code-block::

     python convert.py --input-path keras_mnist_conv/saved_model --output-path keras_mnist_conv

- For models trained by pytorch, run

  .. code-block::

     python convert.py --input-path torch_mnist_conv/model.onnx --output-path torch_mnist_conv

An additional step will run to convert from .onnx to SavedModel format.

Then *tf.lite.TFLiteConverter* is used to convert SavedModel into int8 .tflite given a representative dataset:

.. code-block:: python

   converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
   converter.optimizations = [tf.lite.Optimize.DEFAULT]
   converter.representative_dataset = repr_dataset
   converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
   converter.inference_input_type = tf.int8
   converter.inference_output_type = tf.int8
   tflite_int8_model = converter.convert()

Refer to `tflite official site <https://ai.google.dev/edge/litert/models/post_training_integer_quant#convert_using_integer-only_quantization>`_ for more details about integer-only quantization.

After conversion, the performance on test set will be validated using int8 .tflite model and two .npy files containing input array and label array of 100 test images are generated for later use on SoC.

In :file:`convert.py`, `onnx_tf library <https://github.com/onnx/onnx-tensorflow>`_ is used for converting from onnx to SavedModel. Other convert libraries are available with similar purpose:

- `onnx2tf <https://github.com/PINTO0309/onnx2tf>`_

- `ai-edge-torch <https://github.com/google-ai-edge/ai-edge-torch>`_

- `nobuco <https://github.com/AlexanderLutsenko/nobuco>`_

- `onnx2tflite <https://github.com/MPolaris/onnx2tflite>`_

Step 3. Optimize Tflite and Convert to C++
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Use **tflm_model_transforms** tool from official tflite-micro repository can reduce .tflite size by running some TFLM specific transformations. It also re-align the tflite flatbuffer via the C++ flatbuffer api which can speed up inference on some Ameba platforms. This step is optional, but we strongly recommend running it:

   .. code-block::

      git clone https://github.com/tensorflow/tflite-micro.git
      cd tflite-micro

      bazel build tensorflow/lite/micro/tools:tflm_model_transforms
      bazel-bin/tensorflow/lite/micro/tools/tflm_model_transforms --input_model_path=</path/to/my_model.tflite>

      # output will be located at: /path/to/my_model_tflm_optimized.tflite

2. Convert .tflite model and .npy test data to .cc and .h files for deployment:

   .. code-block::

      python generate_cc_arrays.py models int8_tflm_optimized.tflite
      python generate_cc_arrays.py testdata input_int8.npy input_int8.npy label_int8.npy label_int8.npy

Step 4. Inference on SoC with Tflite-Micro
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
:file:`example_tflm_mnist.cc` shows how to run inference with the trained model on test data, calculate accuracy, profile memory and latency.

Use `netron <https://netron.app/>`_ to visualize the .tflite file and check the operations used by the model. Instantiate operations resolver to register and access the operations.

.. code-block:: c++

   using MnistOpResolver = tflite::MicroMutableOpResolver<4>;

   TfLiteStatus RegisterOps(MnistOpResolver& op_resolver) {
       TF_LITE_ENSURE_STATUS(op_resolver.AddFullyConnected());
       TF_LITE_ENSURE_STATUS(op_resolver.AddConv2D());
       TF_LITE_ENSURE_STATUS(op_resolver.AddMaxPool2D());
       TF_LITE_ENSURE_STATUS(op_resolver.AddReshape());
       return kTfLiteOk;
   }

Refer to `tflite-micro official site <https://ai.google.dev/edge/litert/microcontrollers/get_started#run_inference>`_ for more details about running inference with tflite-micro.

Step 5. Build Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Follow steps in :ref:`build_tflm_lib` and :ref:`build_tflm_example` to build the example image.