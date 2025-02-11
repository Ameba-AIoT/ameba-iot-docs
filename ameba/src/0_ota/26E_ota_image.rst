.. tab:: RTL8726E

   The application image (:file:`kr4_km4_app.bin`, including KR4, KM4 non-secure application image and KM4 secure image) can be updated through OTA, which can be chosen to boot from OTA1 or OTA2. The layout of the whole application image is illustrated below.

   .. figure:: figures/layout_of_application_image.svg
      :scale: 130%
      :align: center

      Layout of application image

      There are two schemes to load DSP image. Refer to :ref:`DSP Image <dsp_image>` for details.

   .. include:: ota_dsp_image.rst

