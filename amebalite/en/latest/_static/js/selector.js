/* ============= Support Multiple Versions ============= */
// 当前的完整URL
const fullUrl = window.location.href;

// 使用 window.location.origin 和 window.location.pathname 来构建基本URL
const origin = window.location.origin; // 获取协议＋域名＋端口
const pathname = window.location.pathname;

// 判断末尾是否斜杠
const basePath = pathname.endsWith('/') ? pathname : pathname.substring(0, pathname.lastIndexOf('/') + 1);

// 在 pathname 中排除任何子路径或文件名
const baseURL = `${origin}${basePath}`;

console.log(baseUrl); // 输出 'https://ameba-aiot.github.io/ameba-iot-docs/'
function add_selector() {
    return fetch(`${baseURL}/config.json`)
        .then(res => res.json())
        .then(res => {
            const cur_ic = window.location.pathname.split('/')[2];
            const cur_language = window.location.pathname.split('/')[3];
            const cur_version = window.location.pathname.split('/')[4];

            window.res = res
            window.ics = Object.keys(res).map(key => res[key].name);
            cur_ic_name = res[cur_ic].name

            const languages_obj = res[cur_ic].languages;
            window.languages = Object.keys(languages_obj);

            window.versions = languages_obj[cur_language];


            // 根据 cur_language 设置表格标题
            const labels = {
                ic: cur_language === 'cn' ? '芯片' : 'IC',
                language: cur_language === 'cn' ? '语言' : 'Language',
                version: cur_language === 'cn' ? '版本' : 'Version'
            };

            let p = document.getElementById("rtd-search-form").parentElement;

            const labelsList = ["ic", "language", "version"];

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
    const { cur_ic, cur_language, cur_version } = getURLSegments();

    const next_ic = document.getElementById("ic-selector").value.toLowerCase();
    window.location.href = `${baseURL}/${next_ic}/${cur_language}/${cur_version}/`
}

/* ============= Toggle Languages ============= */
function change_language() {
    const { cur_ic, cur_language, cur_version } = getURLSegments();

    const next_language = document.getElementById("language-selector").value;
    window.location.href = `${baseURL}/${cur_ic}/${next_language}/${cur_version}/`
}


/* ============= Toggle Version ============= */
function change_version() {
    const { cur_ic, cur_language, cur_version } = getURLSegments();
    const next_version = document.getElementById("version-selector").value;
    window.location.href = `${baseURL}/${cur_ic}/${cur_language}/${next_version}/`
}

/* ============= Get URL Segments ============= */
function getURLSegments() {
    const segments = window.location.pathname.split('/');
    return {
        cur_ic: segments[2],
        cur_language: segments[3],
        cur_version: segments[4]
    };
}


/* ============= Init selector ============= */
document.addEventListener('DOMContentLoaded', (event) => {
    add_selector().then(() => {
        const { cur_ic, cur_language, cur_version } = getURLSegments();

        document.getElementById("ic-selector").value = window.res[cur_ic].name;
        document.getElementById("language-selector").value = cur_language;
        document.getElementById("version-selector").value = cur_version;
    });
});
