# Configuration file for the Sphinx documentation builder.
#
# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration
# Author: terra_cai@realsil.com.cn
import fnmatch
import re
import os
import shutil
from pathlib import Path
from typing import List
import logging

# 初步获取需要排除的项
exclude_patterns = []
running_path = Path.cwd()
project_dir = running_path.parent
repo_root = project_dir.parent

common_dirs_files = ["_static", "_templates", "ameba"]

BUILD_EXCLUDE_FILE = "build_exclude.txt"
KNOWN_WARNING_FILE = "known_warnings.txt"
# 获取Sphinx的根记录器
logger = logging.getLogger('sphinx')


# 检查rst是否存在，检查rst中ameba部分的层级是否正确
def check_rst(rst_file, src_root):
    # 检查文件是否存在
    if not rst_file.exists():
        logger.warning(f"{rst_file} not exists!")
        return False
    # 检查rst中ameba部分的层级是否正确
    if "ameba" in rst_file.parts:
        if os.path.relpath(rst_file, src_root).startswith(".."):
            logger.error(f"{rst_file} ameba path is not correct! "
                         f"You should treat 'ameba' as a direct subdir of {src_root}!")
            return False
    return True


# 定义排除更多与toctree无关的rst的方法
def get_toctree_rst(root_rst: Path, src_root: Path, toctree_rst_files: List) -> None:
    """
    get all used rst according to toctree
    Args:
        root_rst (Path): root rst to parser
        toctree_rst_files (List): list to store rst path

    Returns:
        None
    """
    root_rst = Path(root_rst).resolve()
    start_check = False
    if root_rst not in toctree_rst_files:
        if not check_rst(root_rst, src_root):
            return  # 检查失败,则终止当前路径
        toctree_rst_files.append(root_rst)
    else:
        return  # 已经存在,则终止当前路径,防止陷入死循环
    if root_rst.stem not in ["index", "index_nda", "index_linux", "index_linux_nda"]:
        return  # 只解析index,index_nda,提高效率
    for line in root_rst.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if line.startswith(".. toctree::"):
            start_check = True
            continue
        if start_check and line and not line.startswith(":"):
            tag_mo = re.match(".+<(.+)>", line)
            if tag_mo:
                sub_rst = tag_mo.group(1)
                sub_rst = (root_rst.parent / sub_rst).resolve()
            else:
                sub_rst = (root_rst.parent / line).resolve()
            sub_rst = sub_rst.with_suffix(".rst") if sub_rst.suffix == "" else sub_rst
            get_toctree_rst(sub_rst, src_root, toctree_rst_files)


def get_exclude_rst(root_rst: Path, src_root: Path, exclude_patterns, tags) -> List:
    """
    get exclude rst files
    Args:
        root_rst (Path): root rst path
        src_root (Path): source path
        exclude_patterns(List):

    Returns:
        List: list of exclude rst files
    """
    exclude_rst = []
    toctree_rst_files = []
    get_toctree_rst(root_rst, src_root, toctree_rst_files)
    for fpath in Path(src_root).iterdir():
        if fpath.is_dir():
            if fpath.name in exclude_patterns:  # skip already in exclude dir
                continue
            for file in fpath.rglob("*.rst"):
                if file not in toctree_rst_files:
                    exclude_rst.append(os.path.relpath(file, src_root).replace("\\", "/"))
        elif fpath.is_file() and fpath.suffix == ".rst":
            if fpath not in toctree_rst_files:
                exclude_rst.append(os.path.relpath(fpath, src_root).replace("\\", "/"))

    filter_cfg = src_root / BUILD_EXCLUDE_FILE
    run_location = os.environ.get("RUN_LOCATION", "github")
    print(f"RunLocation: {run_location}")
    if filter_cfg.exists() and run_location == "github":
        print(f"Read {filter_cfg}...")
        for line in filter_cfg.read_text().splitlines():
            if line.strip() and not line.strip().startswith("#"):
                exclude_rst.append(line.strip().replace("\\", "/"))

    if not tags.has("nda"):
        exclude_rst.append("*_nda*")  # confirm set nda exclude when not nda build

    return exclude_rst


def get_master_doc(tags):
    if tags.has("nda"):
        if tags.has("Linux"):
            master_doc = "index_linux_nda"
        else:
            master_doc = "index_nda"
    else:
        if tags.has("Linux"):
            master_doc = "index_linux"
        else:
            master_doc = "index"
    return master_doc


# -- 清理公共文件 -------------------------------------------------
def clean_common_files(source_dir):
    print("Clean common files...")
    for common_dirs_file in common_dirs_files:
        tgt_ = source_dir / common_dirs_file
        if tgt_.exists():
            try:
                if tgt_.is_file():
                    os.remove(tgt_)
                elif tgt_.is_dir():
                    shutil.rmtree(tgt_)
            except:
                print(f"[Warning]Fail to clean {tgt_}!")


# -- 复制公共文件 -------------------------------------------------
def copy_common_files(source_dir):
    for common_dirs_file in common_dirs_files:
        src_ = repo_root / common_dirs_file
        tgt_ = source_dir / common_dirs_file

        if src_.exists():
            try:
                if src_.is_file():
                    shutil.copy(src_, tgt_)
                elif src_.is_dir():
                    shutil.copytree(src_, tgt_)
                else:
                    pass
                print(f"Copy {src_}!")
            except:
                print(f"[Failed]Copy {src_}!")
        else:
            print(f"[Warning]Not exists {src_}!")


# -- 注册事件，用于清理公共文件 -------------------------------------------------
def run_after_build(app, exception):
    if exception is None:
        clean_common_files(app.srcdir)


# -- 注册事件，用于过滤部分warning -------------------------------------------------
class WarningFilter(logging.Filter):
    def __init__(self, src_root):
        super().__init__()
        self.src_root = Path(src_root)
        self.known_warnings = []
        self.__get_known_warnings()

    def __get_known_warnings(self):
        known_warn_file = self.src_root / KNOWN_WARNING_FILE
        if known_warn_file.exists():
            for line in known_warn_file.read_text().splitlines():
                if line.strip() and not line.strip().startswith("#"):
                    self.known_warnings.append(f"*{line.strip().strip('*')}*")

        if self.known_warnings:
            print(f"KnownWarnings:\n======================================================")
            for known_warn in self.known_warnings:
                print(known_warn)

    def filter(self, record):
        # 过滤掉包含特定警告信息的日志记录
        for known_warning in self.known_warnings:
            if fnmatch.fnmatch(record.msg, known_warning):
                return False
        return True


def setup(app):
    app.connect('build-finished', run_after_build)
    # 添加自定义过滤器
    logger.addFilter(WarningFilter(app.srcdir))


# 公共设置
# 设置扩展
extensions = [
    "sphinx_rtd_theme",
    "sphinx_toggleprompt",
    "sphinx_tabs.tabs",
    "sphinx.ext.autodoc",
    "sphinx.ext.viewcode",
    "sphinx_togglebutton",
    "breathe"
]

toggleprompt_offset_right = 30  # 示例：设置提示符偏移量
breathe_projects = {
    "mbed_api": Path("api_docs/xml").resolve()
}

source_suffix = {
    ".rst": "restructuredtext",
}

# 设置表格，图标标题格式
numfig_format = {
    'figure': 'Figure %s',
    'table': 'Table %s',
    #    "section": "Section %s",
    #    "subsection": "Subsection %s",
    #    "subsubsection": "Subsubsection %s",
}

# 设置资源路径
templates_path = ["_templates"]
html_static_path = ["_static"]

html_favicon = '_static/favicon.ico'

# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output
html_theme = "sphinx_rtd_theme"
# 移除view source code 并且不生成source code
html_show_sourcelink = False
display_vcs_links = True

# Latex 相关的设置
latex_engine = 'xelatex'

inkscape_converter_bin = r'\\172.29.57.200\Dic\doc_tools\Inkscape\bin\inkscape.exe'
extensions.append("sphinxcontrib.inkscapeconverter")

latex_elements = {
    "papersize": "a4paper",
    'geometry': r' \usepackage[left=2cm,right=2cm,top=2cm,bottom=2cm]{geometry}',
    'preamble': r'''
\usepackage{xeCJK}
'''
}
