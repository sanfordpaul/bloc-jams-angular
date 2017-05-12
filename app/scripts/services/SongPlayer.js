(function() {
    /**
    * @function SongPlayer (factory service)
    * @desc creates the SongPlayer service with its attributes and methods
    * @param {Object} song
    * @returns {Object}
    */
    function SongPlayer(Fixtures) {
        /**
        * @desc The songPlayer object that gets returned by this function
        * @type {Object}
        */
        var SongPlayer = {};

        /**
         * @desc the current album object which is returned from the fixtures service
         * @type {Object}
         */

        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */

        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

        var setSong = function(song) {
           if (currentBuzzObject) {
               currentBuzzObject.stop();
               SongPlayer.currentSong.playing = null;
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
           });

           SongPlayer.currentSong = song;
        };
        /**
        * @function playSong
        * @desc plays the audio file as currentBuzzObject
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        }
        /**
        * @function getSongIndex
        * @desc private method that returns the index of a song object
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };


        /**
        * @desc The current song object that is passed in through the public methods
        * @type {Object}
        */

        SongPlayer.currentSong = null;

        /**
        * @function SongPlayer.play
        * @desc public method which will either play a new song or start a paused song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    song.playing = true;
                }

            }
        };
        /**
        * @function SongPlayer.pause
        * @desc pauses the buzzObject given to it
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function SongPlayer.previous
        * @desc sets currentSongIndex to one less
        * @param  none
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
            return SongPlayer;
        }



     angular
         .module('blocJams')
         .factory('SongPlayer', [ 'Fixtures', SongPlayer]);
 })();
