// Con este scrapper puedes obtener información (nombre, cantante(s) y letras) de alguna canción
// Usando algún término de búsqueda

// Ejemplo de como usarlo:

/*

	const lyricFinder = require("./lyricFinder.js");
	lyricFinder("Don't stop me now")
		.then(songInfo => console.log(songInfo))
		.catch(err => console.log(err))

*/
const fetch = require("node-fetch");

const scrape = async (searchTerm = "") => {

    if (!searchTerm) {
        throw "Invalid search term"
    }
    if (typeof searchTerm !== "string") {
        throw "Invalid search term, must be a string"
    }

    function formatHTML(text) { // Esto es para que sea 'opcional' incluir el módulo 'formatHTMLEntities.js' en tu proyecto
        try {
            return require("./formatHTMLEntities.js").decode(text);
        } catch {
            return text;
        }
    }

    const body = await (await fetch("https://www.lyrics.com/lyrics/" + encodeURIComponent(searchTerm))).text();

    var pushString = "";
    var splitBody = [];

    body.split("").forEach(e => {
        if (e == "<") {
            if (pushString.trim()) splitBody.push(pushString.trim());
            pushString = e;
        } else if (e == ">") {
            pushString += e;
            splitBody.push(pushString.trim());
            pushString = "";
        } else pushString += e
    });

    try {
        var link = "https://www.lyrics.com" + splitBody.find(e => e.includes("<a") && e.includes('href="/lyric/')).match(/\/lyric\/.+" /g)[0].slice(0, -2);
    } catch (err) {
        try {
            var link = "https://www.lyrics.com" + splitBody.find(e => e.includes("<a") && e.includes('href="/lyric/')).match(/\/lyric\/.+">/g)[0].slice(0, -2);
        } catch (err) {
            throw "Search term not found"
        }
    }

    const songBody = await (await fetch(link)).text();

    pushString = "";
    splitBody = [];

    songBody.split("").forEach(e => {
        if (e == "<") {
            if (pushString.trim()) splitBody.push(pushString.trim());
            pushString = e;
        } else if (e == ">") {
            pushString += e;
            splitBody.push(pushString.trim());
            pushString = "";
        } else pushString += e
    });

    if (songBody.includes("We couldn't find any lyrics matching your query")) throw "Search term not found";

    const startIndex = splitBody.findIndex(e => e.startsWith('<pre id="lyric-body-text"'));
    const endIndex = splitBody.findIndex(e => e == "</pre>");
    var lyric = [];

    splitBody.slice(startIndex + 1, endIndex).forEach(element => {
        if (element.startsWith('<a') || element.startsWith('</a>')) return;
        lyric.push(element);
    });

    var singer = [];
    var index = splitBody.findIndex((e, i) => i > 1 && splitBody[i - 1].includes('class="lyric-artist"'));
    while (true) {
        if (splitBody[index] == "</h3>") break;
        if (splitBody[index] !== "</a>" && !splitBody[index].startsWith("<a")) {
            if (splitBody[index].startsWith(",")) singer.push(splitBody[index]);
            else singer.push(" " + splitBody[index]);
        }
        index++;
    }
    singer[0] = singer[0].trim();

    return {
        name: formatHTML(splitBody.find((e, i) => i > 0 && splitBody[i - 1].startsWith('<h1 id="lyric-title-text"'))),
        singer: formatHTML(singer.join("")),
        lyrics: formatHTML(lyric.join(" ").split("\n").map(e => e.trim()).join("\n")),
        link,
    }

}

module.exports = scrape;
