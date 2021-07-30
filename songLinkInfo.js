// Con este scrapper puedes obtener información (nombre, cantante(s) y letras) de alguna canción
// Usando el enlace de la canción en lyrics.com

// Ejemplo de como usarlo:

/*

	const songLinkInfo = require("./lyricCom-songInfo.js");
	songLinkInfo("https://www.lyrics.com/lyric/958332/Survivor/Eye+of+the+Tiger")
		.then(songInfo => console.log(songInfo))
		.catch(err => console.log(err))

*/

const fetch = require("node-fetch");

const scrape = async (link = "") => {

    if (!link) { throw "Invalid link" }
	if (typeof link !== "string") { throw "Invalid link, must be a string" }

    function formatHTML(text) { // Esto es para que sea 'opcional' incluir el módulo 'formatHTMLEntities.js' en tu proyecto
		try { return require("./formatHTMLEntities.js").decode(text); }
		catch { return text; }
	}

    let songLink;
    if (link.startsWith("https://www.lyrics.com/lyric/")) { songLink = link; }
    else if (link.startsWith("http://www.lyrics.com/lyric/")) { songLink = link.replace("http://www.lyrics.com/lyric/", "https://www.lyrics.com/lyric/"); }
    else if (link.startsWith("www.lyrics.com/lyric/")) { songLink = "https://" + link; }
    else if (link.startsWith("lyrics.com/lyric/")) { songLink = "https://www." + link; }
    else { throw "Invalid link format"; }

	const songBody = await (await fetch(songLink)).text(); 
    
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

	if (songBody.includes("We couldn't find any lyrics matching your query")) throw "The song link doesn't work";

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
		name: formatHTML( splitBody.find((e, i) => i > 0 && splitBody[i - 1].startsWith('<h1 id="lyric-title-text"')) ),
		singer: formatHTML( singer.join("") ),
		lyrics: formatHTML( lyric.join(" ").split("\n").map(e => e.trim()).join("\n") ),
        link: songLink,
	}

}

module.exports = scrape;