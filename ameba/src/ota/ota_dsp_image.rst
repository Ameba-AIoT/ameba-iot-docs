.. _dsp_image:

   **DSP Image**

   There are two schemes for users to load the DSP image.

   **DSP Image without Application Image**

   In this scheme, there is only one slot in Flash layout called :mod:`IMG_DSP` for the DSP image.
   When the DSP application is modified, users only need to re-download the DSP image called ``dsp_all.bin`` to :mod:`IMG_DSP` as shown below.
   So when in device DSP-development stage, we recommend this method to develop the DSP application conveniently and efficiently.

      .. figure:: figures/lite_download_dsp_image.png
         :scale: 100%
         :align: center

   To choose this scheme, users can disable the configuration of ``DSP within APP image`` by the following steps:

      a. Navigate to project and open configuration menu.

         .. code-block::

            cd amebalite_gcc_project
            ./menuconfig.py

      b. Remove the selection :menuselection:`CONFIG OTA OPTION > DSP within APP image`.

   .. note::
      This scheme should be used only in device DSP-development stage.

.. _ota_dsp_image_within_application_image:

   **DSP Image within Application Image**

   In this scheme, there are two slots in Flash layout called :mod:`IMG_APP_OTA1` and :mod:`IMG_APP_OTA2` respectively.
   Since the DSP image is merged into the application image. In order to avoid issues such as DSP boot fail after the DSP image
   is updated through OTA application when there is only one slot for DSP. For MP devices,
   the scheme of the DSP image within application image is recommended, which DSP can choose to boot from OTA1 or OTA2.

   After choosing this scheme, there is only one application image called ``kr4_km4_dsp_app.bin`` needed to be downloaded as shown below.

   .. figure:: figures/lite_download_dsp_application_image.png
      :scale: 90%
      :align: center

.. _steps_set_dsp_path:

   Steps of generating ``kr4_km4_dsp_app.bin`` are:

   1. Navigate to project and open configuration menu.
   2. Select :menuselection:`CONFIG OTA OPTION > Enable DSP > DSP within APP image` to enable the configuration of ``DSP within APP image``.
   3. Select :menuselection:`DSP_IMAGE_TARGET_DIR` to set path of :file:`dsp.bin`, click Enter to save.

      .. figure:: figures/lite_set_dsp_path.png
         :scale: 90%
         :align: center

      .. note::
         The `DSP_IMAGE_TARGET_DIR` is relative to the amebalite_gcc_project.

   4. Save and exit.

   For example, after DSP SDK is compiled finished, there will be two images generated,
   named :file:`dsp.bin` and :file:`dsp_all.bin` respectively under the path of ``{DSP_SDK}/project/image``.

   1. Copy the `dsp.bin` into ``{SDK}/component/dsp``, so the path of :file:`dsp.bin` is ``../component/dsp``.
   2. Set the path as :ref:`Step 3 <steps_set_dsp_path>` above. Check the path in ``{SDK}/amebaxxx_gcc_project/menuconfig/.config``.

      .. code-block:: c
         :emphasize-lines: 5

         # CONFIG DSP Enable
         #
         CONFIG_DSP_EN=y
         CONFIG_DSP_WITHIN_APP_IMG=y
         CONFIG_DSP_IMAGE_TARGET_DIR="../component/dsp"
         # end of CONFIG DSP Enable

   3. Rebuild the project by the following commands, and :file:`kr4_km4_dsp_app.bin` will be found in ``{SDK}/amebaxxx_gcc_project``.

      .. code-block::

         cd project folder
         ./build.py

   .. note::
      We choose this scheme and use :file:`kr4_km4_dsp_app.bin` in the following operations.