# Makefile for Sphinx documentation

TAGS:=
tag:=-t FreeRTOS

# This ENV var used to switch filter, if RUN_LOCATION is github, common_conf.py will bypass more source files set in filter_cfg.txt
export RUN_LOCATION=local

# Check if TAGS contains 'nda' and set SET_NDA accordingly
ifneq (,$(findstring nda,$(TAGS)))
export SET_NDA=1
endif

ifneq (,$(findstring Linux,$(TAGS)))
tag:=
endif

# Append each TAG with -t
ifneq ($(TAGS),)
  tag+=$(foreach t,$(TAGS), -t $(t))
endif
ifeq (,$(findstring nda,$(TAGS)))
  tag+=$(foreach t,$(TAGS), -t $(t), -t else_nda)
endif

.PHONY: help en cn

help:
	@echo '####################################################### Help Info ######################################################'
	@echo -e '#  \033[31mAttention\033[0m:                                                                                                          #'
	@echo '#      Before run below cmds, you need run "source active_linux" to enter virtual environment at first!                #'
	@echo '#      After run, you can use "deactivate" to exit virtual environment!                                                #'
	@echo '#  Examples:                                                                                                           #'
	@echo '#                                                                                                                      #'
	@echo '#    make en TAGS="RTLxxx"              Compile en rst with tag RTLxxx and FreeRTOS(default) to html.                  #'
	@echo '#    make en TAGS="nda RTLxxx"          Compile en nda rst with tag RTLxxx and FreeRTOS(default) to html.              #'
	@echo '#    make en TAGS="nda RTLxxx Linux"    Compile en nda rst with tag RTLxxx and Linux to html.                          #'
	@echo '#    make en TAGS="nda"                 Compile en nda rst with tag FreeRTOS(default) to html.                         #'
	@echo '#    make cn                            Compile cn rst with tag FreeRTOS(default) to html.                             #'
	@echo '#    make clean                         Clean build dir.                                                               #'
	@echo '#                                                                                                                      #'
	@echo '########################################################################################################################'

en:
	python ../sphinx_venv/Linux/bin/sphinx-build -b html $@ build/$@/latest -c $@ ${tag}

cn:
	python ../sphinx_venv/Linux/bin/sphinx-build -b html $@ build/$@/latest -c $@ ${tag}

clean:
	rm -rf build
