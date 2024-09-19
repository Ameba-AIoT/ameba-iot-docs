/* ============= Support Multiple Versions ============= */
const baseURL = "https://ameba-aiot.github.io/ameba-iot-docs";
function add_selector() {
    return fetch(`${baseURL}/config.json`)
        .then(res => res.json())
        .then(res => {
            const cur_ic = window.location.pathname.split('/')[2];
            const cur_language = window.location.pathname.split('/')[3];
            const cur_series = window.location.pathname.split('/')[4];
            const cur_version = window.location.pathname.split('/')[5];

            const ics = Object.keys(res);

            const languages_obj = res[cur_ic];
            const languages = Object.keys(languages_obj);

            const series_obj = languages_obj[cur_language];
            const series = Object.keys(series_obj);

            const versions = series_obj[cur_series];

            // 根据 cur_language 设置表格标题
            const labels = {
                ic: cur_language === 'cn' ? '芯片' : 'IC',
                language: cur_language === 'cn' ? '语言' : 'Language',
                series: cur_language === 'cn' ? '系列' : 'Series',
                version: cur_language === 'cn' ? '版本' : 'Version'
            };

            let p = document.getElementById("rtd-search-form").parentElement;
            p.innerHTML = `
            <table>
            <tr>
            <td style="text-align: right;vertical-align: middle;">${labels.ic}</td>
            <td style="text-align: left;vertical-align: middle;"><select name="ic" id="ic-selector" title="ic" onchange="change_ic()" style="width:120px; border-radius:2px; margin:5px">
            ${ics.map(ic => {
                return `<option value="${ic}">${ic}</option>`;
            }).join('')}
            </select></td></tr>

            <tr>
            <td style="text-align: right;vertical-align: middle;">${labels.series}</td>
            <td style="text-align: left;vertical-align: middle;"><select name="series" id="series-selector" title="series" onchange="change_series()" style="width:120px; border-radius:2px; margin:5px">
            ${series.map(series => {
                return `<option value="${series}">${series}</option>`;
            }).join('')}
            </select></td></tr>

            <tr>
            <td style="text-align: right;vertical-align: middle;">${labels.language}</td>
            <td style="text-align: left;vertical-align: middle;"><select name="language" id="language-selector" title="language" onchange="change_language()" style="width:120px; border-radius:2px; margin:5px">
            ${languages.map(language => {
                return `<option value="${language}">${language}</option>`;
            }).join('')}
            </select></td></tr>

            <tr>
            <td style="text-align: right;vertical-align: middle;">${labels.version}</td>
            <td style="text-align: left;vertical-align: middle;"><select name="version" id="version-selector" title="version" onchange="change_version()" style="width:120px; border-radius:2px; margin:5px">
            ${versions.map(version => {
                return `<option value="${version}">${version}</option>`;
            }).join('')}
            </select></td></tr>
            </table>` + p.innerHTML;
        });
}

/* ============= Toggle IC ============= */
function change_ic() {
    const { cur_ic, cur_language, cur_series, cur_version } = getURLSegments();

    const next_ic = document.getElementById("ic-selector").value;
    window.location.href = `${baseURL}/${next_ic}/${cur_language}/${cur_series}/${cur_version}/`
}

/* ============= Toggle Languages ============= */
function change_language() {
    const { cur_ic, cur_language, cur_series, cur_version } = getURLSegments();

    const next_language = document.getElementById("language-selector").value;
    window.location.href = `${baseURL}/${cur_ic}/${next_language}/${cur_series}/${cur_version}/`
}

/* ============= Toggle Series ============= */
function change_series() {
    const { cur_ic, cur_language, cur_series, cur_version } = getURLSegments();
    const next_series = document.getElementById("series-selector").value;
    window.location.href = `${baseURL}/${cur_ic}/${cur_language}/${next_series}/${cur_version}/`
}

/* ============= Toggle Version ============= */
function change_version() {
    const { cur_ic, cur_language, cur_series, cur_version } = getURLSegments();
    const next_version = document.getElementById("version-selector").value;
    window.location.href = `${baseURL}/${cur_ic}/${cur_language}/${cur_series}/${next_version}/`
}

/* ============= Get URL Segments ============= */
function getURLSegments() {
    const segments = window.location.pathname.split('/');
    return {
        cur_ic: segments[2],
        cur_language: segments[3],
        cur_series: segments[4],
        cur_version: segments[5]
    };
}


/* ============= Init selector ============= */
document.addEventListener('DOMContentLoaded', (event) => {
    add_selector().then(() => {
        const { cur_ic, cur_language, cur_series, cur_version } = getURLSegments();

        document.getElementById("ic-selector").value = cur_ic;
        document.getElementById("language-selector").value = cur_language;
        document.getElementById("series-selector").value = cur_series;
        document.getElementById("version-selector").value = cur_version;
    });
});
