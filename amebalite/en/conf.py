# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import sys
from pathlib import Path

config_file = Path(__file__).resolve()
config_dir = config_file.parent
source_dir = config_dir
en_or_cn = config_dir.stem
repo_root = config_dir.parent.parent

print(f"SourceDir:{source_dir}")
print(f"ConfigDir:{config_dir}")

# 导入公共配置
sys.path.insert(0, str(repo_root))
from common_conf import *
# 清理公共文件
clean_common_files(source_dir)
# 复制公共文件
copy_common_files(source_dir)

# 确定NDA或非NDA入口
master_doc = get_master_doc(tags)
master_doc_path = source_dir / f"{master_doc}.rst"
print(f"MASTER_DOC: {master_doc_path}")


exclude_rst = get_exclude_rst(master_doc_path, source_dir, exclude_patterns, tags)
exclude_patterns.extend(exclude_rst)
print("Exclude:\n=============================================================")
for ign in exclude_patterns:
    print(ign)


##############################################################################################
# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information
# Settings by project
# 项目设置
language = "en" if en_or_cn == "en" else "cn"

# 宏替换
CHIP_NAME = "RTL8726EA" if tags.has("RTL8726EA") else "RTL8720EA"

VERSION = '1.0.0'
project = f"{CHIP_NAME} Docs"

rst_prolog = """
.. |CHIP_NAME| replace:: {0}
.. |VERSION| replace:: {1}
""".format(CHIP_NAME, VERSION)
