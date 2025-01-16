/* ============= Support Multiple Versions ============= */
// 获取协议 (http: / https:)
const protocol = window.location.protocol;
// 获取域名 (例如: www.example.com)
const hostname = window.location.hostname;
// 获取端口 (如果有)
const port = window.location.port ? `:${window.location.port}` : '';
// 初始化 baseURL
let baseURL = `${protocol}//${hostname}${port}`;

const cur_dir = window.location.pathname.split('/')[1];
baseURL += `/${cur_dir}`;

console.log(baseURL);


// 检查指定 IC 和语言中的数据结构是否为对象（字典），以此判断是否包含OS的设置
function check_hasos(data, ic, language) {
    const langData = data[ic]?.languages?.[language];
    return typeof langData === 'object' && !Array.isArray(langData);
}


// 获取所有的 IC 名称
function get_ics(data) {
    return Object.keys(data).map(key => res[key].name);;
}

// 获取指定 IC 中所有的语言
function get_languages(data, ic) {
    const languages = data[ic]?.languages;
    return languages ? Object.keys(languages) : [];
}

// 获取指定 IC 和语言中的所有操作系统
function get_oss(data, ic, language) {
    const langData = data[ic]?.languages?.[language];
    return typeof langData === 'object' && !Array.isArray(langData) ? Object.keys(langData) : [];
}

// 获取指定 IC、操作系统和语言中的所有版本
function get_versions(data, ic, os, language) {
    const langData = data[ic]?.languages?.[language];

    // 如果 `langData` 是数组，直接返回它，因为它已经是版本信息
    if (Array.isArray(langData)) {
        return langData;
    }

    // 如果 `langData` 是对象，继续原有逻辑
    return typeof langData === 'object' ? (langData[os] || []) : [];
}

// 获取一个language，default为en
function get_language(data, ic) {
    const langs = get_languages(data, ic);
    return (Array.isArray(langs) && langs.length > 0) ? langs[0] : "en";
}

// 获取一个os，default为freertos
function get_os(data, ic, language) {
    const oss = get_oss(data, ic, language);
    return (Array.isArray(oss) && oss.length > 0) ? oss[0] : "freertos";
}

// 获取一个version，default为latest
function get_version(data, ic, os, language) {
    const versions = get_versions(data, ic, os, language);
    return (Array.isArray(versions) && versions.length > 0) ? versions[0] : "latest";
}


function add_selector() {
    return fetch(`${baseURL}/config.json`)
        .then(res => res.json())
        .then(res => {
            const segments = window.location.pathname.split('/');
            const cur_ic = segments[2];
            const cur_language = segments[3];

            const has_os = check_hasos(res, cur_ic, cur_language)

            const cur_os = has_os ? segments[4] : "";
            const cur_version = segments[has_os ? 5 : 4];

            window.res = res
            window.ics = get_ics(res)
            window.languages = get_languages(res, cur_ic)
            window.versions = get_versions(res, cur_ic, cur_os, cur_language)
            window.oss = get_oss(res, cur_ic, cur_language)



            const labels = {
                ic: cur_language === 'cn' ? '系列' : 'Series',
                language: cur_language === 'cn' ? '语言' : 'Language',
                version: cur_language === 'cn' ? '版本' : 'Version',
                os: cur_language === 'cn' ? '系统' : 'OS'
            };

            const labelsList = has_os ? ["ic", "language", "os", "version"] : ["ic", "language", "version"];
            let p = document.getElementById("rtd-search-form").parentElement;
            p.innerHTML = `
                <table>
                ${labelsList.map(label => `
                    <tr>
                        <td style="text-align: right;vertical-align: middle;">${labels[label]}</td>
                        <td style="text-align: left;vertical-align: middle;">
                            <select name="${label}" id="${label}-selector" title="${label}" onchange="change_${label}()" style="width:120px; border-radius:2px; margin:5px">
                                ${window[label + 's'].map(option => `<option value="${option}">${option}</option>`).join('')}
                            </select>
                        </td>
                    </tr>
                `).join('')}
                </table>` + p.innerHTML;
        });
}

/* ============= Toggle IC ============= */
function change_ic() {
    const next_ic = document.getElementById("ic-selector").value;

    const default_lang = get_language(window.res, next_ic);
    const default_os = get_os(window.res, next_ic, default_lang);
    const default_version = get_version(window.res, next_ic, default_os, default_lang);
    const has_os = check_hasos(window.res, next_ic, default_lang)

    if (has_os) {
        window.location.href = `${baseURL}/${next_ic}/${default_lang}/${default_os}/${default_version}/`
    }
    else {
        window.location.href = `${baseURL}/${next_ic}/${default_lang}/${default_version}/`
    }

}

/* ============= Toggle Languages ============= */
function change_language() {
    const { cur_ic, cur_language, cur_os, cur_version } = getURLSegments();
    const next_language = document.getElementById("language-selector").value;

    const default_os = get_os(window.res, cur_ic, next_language);
    const default_version = get_version(window.res, cur_ic, default_os, next_language);
    const has_os = check_hasos(window.res, cur_ic, next_language)

    if (has_os) {
        window.location.href = `${baseURL}/${cur_ic}/${next_language}/${default_os}/${default_version}/`
    }
    else {
        window.location.href = `${baseURL}/${cur_ic}/${next_language}/${default_version}/`
    }


}

/* ============= Toggle OS ============= */
function change_os() {
    const { cur_ic, cur_language, cur_os, cur_version } = getURLSegments();

    const next_os = document.getElementById("os-selector").value;

    const default_version = get_version(window.res, cur_ic, next_os, cur_language);

    window.location.href = `${baseURL}/${cur_ic}/${cur_language}/${next_os}/${default_version}/`
}

/* ============= Toggle Version ============= */
function change_version() {
    const { cur_ic, cur_language, cur_os, cur_version } = getURLSegments();
    const next_version = document.getElementById("version-selector").value;

    const has_os = check_hasos(window.res, cur_ic, cur_language)

    if (has_os) {
        window.location.href = `${baseURL}/${cur_ic}/${cur_language}/${cur_os}/${next_version}/`
    }
    else {
        window.location.href = `${baseURL}/${cur_ic}/${cur_language}/${next_version}/`
    }
}

/* ============= Get URL Segments ============= */
function getURLSegments() {
    const segments = window.location.pathname.split('/');
    const has_os = check_hasos(window.res, segments[2], segments[3]);
    if (has_os) {
        return {
            cur_ic: segments[2],
            cur_language: segments[3],
            cur_os: segments[4],
            cur_version: segments[5]
        };
    } else {
        return {
            cur_ic: segments[2],
            cur_language: segments[3],
            cur_os: "",
            cur_version: segments[4]
        };
    }
}


/* ============= Init selector ============= */
document.addEventListener('DOMContentLoaded', (event) => {
    add_selector().then(() => {
        const { cur_ic, cur_language, cur_os, cur_version } = getURLSegments();
        const has_os = check_hasos(window.res, cur_ic, cur_language);

        document.getElementById("ic-selector").value = window.res[cur_ic].name;
        document.getElementById("language-selector").value = cur_language;
        document.getElementById("version-selector").value = cur_version;
        if (has_os) {
            document.getElementById("os-selector").value = cur_os;
        }
    });
});
