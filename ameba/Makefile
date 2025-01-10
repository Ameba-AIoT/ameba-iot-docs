# Makefile for Sphinx documentation

# This ENV var used to switch filter, if RUN_LOCATION is github, common_conf.py will bypass more source files set in filter_cfg.txt
export RUN_LOCATION=local



.PHONY: help en cn

help:
	@echo '####################################################### Help Info ######################################################'
	@echo -e '#  \033[31mAttention\033[0m:                                                                                                          #'
	@echo '#      Before run below cmds, you need run "source activate_linux" to enter virtual environment at first!              #'
	@echo '#      After run, you can use "deactivate" to exit virtual environment!                                                #'
	@echo '#  Examples:                                                                                                           #'
	@echo '#                                                                                                                      #'
	@echo '#    make en                            Compile en rst with tag to html.                  #'
	@echo '#    make cn                            Compile cn rst with tag to html.                             #'
	@echo '#    make clean                         Clean build dir.                                                               #'
	@echo '#                                                                                                                      #'
	@echo '########################################################################################################################'

en:
	python ../sphinx_venv/Linux/bin/sphinx-build -b html $@ build/$@/latest -c $@

cn:
	python ../sphinx_venv/Linux/bin/sphinx-build -b html $@ build/$@/latest -c $@

clean:
	rm -rf build