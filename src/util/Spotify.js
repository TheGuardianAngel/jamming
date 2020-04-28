const CLIENT_ID = 'ae6d469825b34937a768ad98c982be25';
const REDIRECT_URI = 'http://jamjamityjam.surge.sh';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
let accessToken = undefined;
let expiresIn = undefined;

export let Spotify = {
  // acquireing the access tokem so we can interact with the spotify API
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },
  // search functionality with the Spotify API
  search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris || trackUris.length === 0) return;
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userId = undefined;
    let playlistId = undefined;
    fetch(userUrl, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => (userId = jsonResponse.id))
      .then(() => {
        const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: name,
          }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => (playlistId = jsonResponse.id))
          .then(() => {
            const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
            return fetch(addPlaylistTracksUrl, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                uris: trackUris,
              }),
            });
          });
      });
  },
};
