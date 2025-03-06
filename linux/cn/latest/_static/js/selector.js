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
const cur_os = window.location.pathname.split('/')[2];
const cur_language = window.location.pathname.split('/')[3];
const cur_version = window.location.pathname.split('/')[4];

baseURL += `/${cur_dir}`

let configURL = `${baseURL}/${cur_os}/${cur_language}/${cur_version}/_static/config.json`;


console.log(configURL);



// 获取所有的 os 名称
function get_oss(data) {
    return Object.keys(data).map(key => data[key].name);
}

// 获取指定 os、language中的所有版本
function get_versions(data, os, language) {
    const langData = data[os]?.languages?.[language];
    return  langData || [];
}

// 获取指定 IC 中所有的语言
function get_languages(data, os) {
    const languages = data[os]?.languages;
    return languages ? Object.keys(languages) : [];
}


// 获取一个language，default为en
function get_language(data, os) {
    const langs = get_languages(data, os);
    return (Array.isArray(langs) && langs.length > 0) ? langs[0] : "en";
}

// 获取一个os
function get_os(data, os_name) {
    return Object.keys(data).find(key => data[key]?.name === os_name);
  }

// 获取一个version，default为latest
function get_version(data, os, language) {
    const versions = get_versions(data, os, language);
    return (Array.isArray(versions) && versions.length > 0) ? versions[0] : "latest";
}


function add_selector() {
    return fetch(`${configURL}`)
        .then(res => res.json())
        .then(res => {
            const segments = window.location.pathname.split('/');
            const cur_os = segments[2];
            const cur_language = segments[3];
            const cur_version = segments[4];

            window.res = res
            window.oss = get_oss(res)
            window.languages = get_languages(res, cur_os)
            window.versions = get_versions(res, cur_os, cur_language)


            const labels = {
                os: cur_language === 'cn' ? '系统' : 'OS',
                language: cur_language === 'cn' ? '语言' : 'Language',
                version: cur_language === 'cn' ? '版本' : 'Version',
            };

            const labelsList = ["os", "language", "version"];
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

/* ============= Get URL Segments ============= */
function getURLSegments() {
    const segments = window.location.pathname.split('/');
    return {
        cur_os: segments[2],
        cur_language: segments[3],
        cur_version: segments[4]
    };
}


/* ============= Toggle OS ============= */
function change_os() {
    const { cur_os, cur_language, cur_version } = getURLSegments();
    const next_os = get_os(window.res, document.getElementById("os-selector").value);
    const default_language = get_language(window.res,next_os)
    const default_version = get_version(window.res, next_os, cur_language);

    window.location.href = `${baseURL}/${next_os}/${default_language}/${default_version}/`
}


/* ============= Toggle Languages ============= */
function change_language() {
    const { cur_os, cur_language, cur_version } = getURLSegments();
    const next_language = document.getElementById("language-selector").value;
    const default_version = get_version(window.res, cur_os, next_language);

    window.location.href = `${baseURL}/${cur_os}/${next_language}/${default_version}/`

}


/* ============= Toggle Version ============= */
function change_version() {
    const { cur_os, cur_language, cur_version } = getURLSegments();
    const next_version = document.getElementById("version-selector").value;

    window.location.href = `${baseURL}/${cur_os}/${cur_language}/${next_version}/`
    
}


/* ============= Init selector ============= */
document.addEventListener('DOMContentLoaded', (event) => {
    add_selector().then(() => {
        const { cur_os, cur_language, cur_version } = getURLSegments();
        document.getElementById("os-selector").value = window.res[cur_os].name;
        document.getElementById("language-selector").value = cur_language;
        document.getElementById("version-selector").value = cur_version;
    });
});
