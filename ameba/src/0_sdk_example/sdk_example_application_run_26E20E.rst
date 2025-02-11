.. tab:: RTL8726EA/RTL8720EA

   The :func:`app_example()` in :file:`main.c` under ``{SDK}\amebalite_gcc_project\project_km4\src`` or ``{SDK}\amebalite_gcc_project\project_kr4\src``. will be replaced automatically when the application example is built.

   .. code-block:: c

      // default main
      int main(void)
      {
         ...
         app_example();
         ...
         /* enable schedule, start kernel */
         vTaskStartSchedule();
      }

   The application examples normally run on AP (KM4 or KR4). To run application example, you only need to:

   1. Check software and hardware settings in :file:`README.txt` of the example.
   2. Add compile options ``EXAMPLE={examplefolder name}`` when building the project, and replace ``{example folder name}`` with the specific folder name of this example.

   For example, if you want to build xml example to start an xml example thread, you need to:

   1. Set the macro in SDK according to :file:`README.txt` in ``{SDK}\component\example\xml``
   2. Enter ``make EXAMPLE=xml`` for AP on MSYS2 MinGW 64-bit (Windows) or terminal (Linux).

   .. figure:: figures/building_xml_application_example_26E20E.png
      :scale: 90%
      :align: center

      Building XML application example