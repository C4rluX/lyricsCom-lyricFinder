# lyricsCom-lyricFinder
Scrapper para obtener información de una canción y su letra, de Lyrics.com

## lyricFinder.js
Con este scrapper puedes obtener información (nombre, cantante(s) y letras) de alguna canción, usando algún término de búsqueda.

Ejemplo de uso:
```
  const lyricFinder = require("./lyricFinder.js");  // Requerir el módulo
	lyricFinder("Don't stop me now")                  // Llamar al módulo, el único argumento necesario es el término de búsqueda
		.then(songInfo => console.log(songInfo))        // Mostrar en la consola la información de la canción
		.catch(err => console.log(err))                 // Mostrar en la consola el error, si ocurrió alguno
```

Ejemplo de la información que devuelve el módulo:
```
{
  name: "Don't Stop Me Now",
  singer: 'Queen',
  lyrics: "Tonight, I'm gonna have myself a real good time\n" +
    "I feel alive and the world I'll turn it inside out, yeah\n" +
    'And floating around in ecstasy\n' +
    "So don't stop me now don't stop me\n" +
    "'Cause I'm having a good time, having a good time\n" +
    '\n' +
    "I'm a shooting star, leaping through the sky\n" +
    'Like a tiger defying the laws of gravity\n' +
    "I'm a racing car, passing by like Lady Godiva\n" +
    "I'm gonna go, go, go\n" +
    "There's no stopping me\n" +
    '\n' +
    "I'm burnin' through the sky, yeah\n" +
    'Two hundred degrees\n' +
    "That's why they call me Mister Fahrenheit\n" +
    "I'm traveling at the speed of light\n" +
    'I wanna make a supersonic man out of you\n' +
    '\n' +
    "Don't stop me now, I'm having such a good time\n" +
    "I'm having a ball\n" +
    "Don't stop me now\n" +
    'If you wanna have a good time, just give me a call\n' +
    "Don't stop me now ('cause I'm having a good time)\n" +
    "Don't stop me now (yes, I'm havin' a good time)\n" +
    "I don't want to stop at all\n" +
    '\n' +
    "Yeah, I'm a rocket ship on my way to Mars\n" +
    'On a collision course\n' +
    "I am a satellite, I'm out of control\n" +
    'I am a sex machine, ready to reload\n' +
    'Like an atom bomb about to\n' +
    'Oh, oh, oh, oh, oh explode\n' +
    '\n' +
    "I'm burnin' through the sky, yeah\n" +
    'Two hundred degrees\n' +
    "That's why they call me Mister Fahrenheit\n" +
    "I'm traveling at the speed of light\n" +
    'I wanna make a supersonic woman of you\n' +
    '\n' +
    "Don't stop me, don't stop me\n" +
    "Don't stop me, hey, hey, hey\n" +
    "Don't stop me, don't stop me\n" +
    'Ooh ooh ooh, I like it\n' +
    "Don't stop me, don't stop me\n" +
    'Have a good time, good time\n' +
    "Don't stop me, don't stop me, ah\n" +
    'Oh yeah\n' +
    'Alright\n' +
    '\n' +
    "Oh, I'm burnin' through the sky, yeah\n" +
    'Two hundred degrees\n' +
    "That's why they call me Mister Fahrenheit\n" +
    "I'm traveling at the speed of light\n" +
    'I wanna make a supersonic man out of you\n' +
    '\n' +
    "Don't stop me now, I'm having such a good time\n" +
    "I'm having a ball\n" +
    "Don't stop me now\n" +
    'If you wanna have a good time (wooh)\n' +
    'Just give me a call (alright)\n' +
    "Don't stop me now ('cause I'm having a good time, yeah yeah)\n" +
    "Don't stop me now (yes, I'm havin' a good time)\n" +
    "I don't want to stop at all\n" +
    '\n' +
    'La da da da daah\n' +
    'Da da da haa\n' +
    'Ha da da ha ha haaa\n' +
    'Ha da daa ha da da aaa\n' +
    'Ooh ooh ooh',
  link: 'https://www.lyrics.com/lyric/1528937/Queen/Don%27t+Stop+Me+Now'
}
```

Errores:
- "Invalid search term": Cuando se envía un argumento vacío al modulo.
- "Invalid search term, must be a string": Cuando se envía un argumento que no es un String al módulo.
- "Search term not found": Cuando no se ha podido encontrar ninguna canción con el término de búsqueda especificado.
- Otro error: error ocurrido al conectarse a Lyrics.com (de node-fetch) o durante el scrapping.

## songLinkInfo.js
Con este scrapper puedes obtener información (nombre, cantante(s) y letras) de alguna canción, usando el enlace de la canción en Lyrics.com.

Ejemplo de uso:
```
  const songLinkInfo = require("./songLinkInfo.js");                              // Requerir el módulo
	songLinkInfo("https://www.lyrics.com/lyric/958332/Survivor/Eye+of+the+Tiger")   // Llamar al módulo, el único argumento necesario es el enlace de la canción en Lyrics.com 
		.then(songInfo => console.log(songInfo))                                      // Mostrar en la consola la información de la canción
		.catch(err => console.log(err))                                               // Mostrar en la consola el error, si ocurrió alguno
```

Ejemplo de la información que devuelve el módulo:
```
{
  name: 'Eye Of The Tiger',
  singer: 'Survivor',
  lyrics: "Risin' up, back on the street\n" +
    'Did my time, took my chances\n' +
    "Went the distance, now I'm back on my feet\n" +
    'Just a man and his will to survive\n' +
    '\n' +
    'So many times, it happens too fast\n' +
    'You trade your passion for glory\n' +
    "Don't lose your grip on the dreams of the past\n" +
    'You must fight just to keep them alive\n' +
    '\n' +
    "It's the eye of the tiger, it's the thrill of the fight\n" +
    "Risin' up to the challenge of our rival\n" +
    'And the last known survivor stalks his prey in the night\n' +
    "And he's watchin' us all with the eye of the tiger\n" +
    '\n' +
    'Face to face, out in the heat\n' +
    "Hangin' tough, stayin' hungry\n" +
    "They stack the odds 'til we take to the street\n" +
    'For the kill with the skill to survive\n' +
    '\n' +
    "It's the eye of the tiger, it's the thrill of the fight\n" +
    "Risin' up to the challenge of our rival\n" +
    'And the last known survivor stalks his prey in the night\n' +
    "And he's watchin' us all with the eye of the tiger\n" +
    '\n' +
    "Risin' up, straight to the top\n" +
    'Had the guts, got the glory\n' +
    "Went the distance, now I'm not gonna stop\n" +
    'Just a man and his will to survive\n' +
    '\n' +
    "It's the eye of the tiger, it's the thrill of the fight\n" +
    "Risin' up to the challenge of our rival\n" +
    'And the last known survivor stalks his prey in the night\n' +
    "And he's watchin' us all with the eye of the tiger\n" +
    '\n' +
    'The eye of the tiger\n' +
    'The eye of the tiger\n' +
    'The eye of the tiger\n' +
    'The eye of the tiger',
  link: 'https://www.lyrics.com/lyric/958332/Survivor/Eye+of+the+Tiger'
}
```

Errores:
- "Invalid link": Cuando se envía un argumento vacío al modulo.
- "Invalid link, must be a string": Cuando se envía un argumento que no es un String al módulo.
- "Invalid link format": Cuando el enlace de Lyrics.com no tiene el formato adecuado, es decir, para que el enlace sea tomado como válido debe empezar con: "https://www.lyrics.com/lyric/", "http://www.lyrics.com/lyric/", "www.lyrics.com/lyric/" o "lyrics.com/lyric/".
- "The song link doesn't work": Cuando el enlace de Lyrics.com no funciona correctamente, es decir, que al visitar ese enlace la página devuelve un error diciendo: "We couldn't find any lyrics matching your query".
- Otro error: error ocurrido al conectarse a Lyrics.com (de node-fetch) o durante el scrapping.
