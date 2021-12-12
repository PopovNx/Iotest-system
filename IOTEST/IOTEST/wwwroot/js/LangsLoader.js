import * as data from '../lang.json' assert {type: "json"};
window.Lang = {};

for (const key in data.default) {
    if (key !== "version")
        window.Lang[key] = data.default[key][window.LangSelected];
    else
        window.Lang[key] = data.default[key];
}
console.log(window.Lang)