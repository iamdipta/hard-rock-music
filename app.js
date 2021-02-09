const searchSong = async() => {
        const searchText = document.getElementById('search-field').value;
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
        // load data
        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySongs(data.data);
        } catch (error) {
            displayError(error);
        }
    }
    // display song
const displaySongs = songs => {
        const songContainer = document.getElementById('song-container');
        songContainer.innerHTML = '';
        // forEach loop for print data 
        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'single-result row align-items-center my-3 p-3';
            songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick = "getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
            songContainer.appendChild(songDiv);
        })

    }
    // lyrics url :https://api.lyrics.ovh/v1/:artist/:title

const getLyrics = async(artist, title) => {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);

    }
    // display lyrics 
const displayLyrics = lyrics => {
        const songLyrics = document.getElementById('song-lyrics');
        songLyrics.innerText = lyrics;
    }
    // error massage
const displayError = error => {
    const errorTag = document.getElementById('error-massage');
    errorTag.innerText = "Something Went Wrong";
}