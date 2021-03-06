(function() {
    /**
    * @function SongPlayer (factory service)
    * @desc creates the SongPlayer service with its attributes and methods
    * @param {Object} song
    * @returns {Object}
    */
    function SongPlayer($rootScope, Fixtures) {
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


        var currentBuzzObject = null;


        const startVolume = 75;

        SongPlayer.previousVolume = 75;

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
           currentBuzzObject.bind('ended', function() {
               SongPlayer.next();
           })

           currentBuzzObject.bind('timeupdate', function() {
               $rootScope.$apply(function() {
                   SongPlayer.currentTime = currentBuzzObject.getTime();
               });
           })

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
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

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
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                SongPlayer.previousVolume = currentBuzzObject.getVolume();
                SongPlayer.volume = volume;
                currentBuzzObject.setVolume(volume);

            }
        };

        SongPlayer.init = function(){
            setSong(currentAlbum.songs[0]);
            SongPlayer.setVolume(startVolume);

        }


        SongPlayer.init();
        return SongPlayer;
        }



     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
