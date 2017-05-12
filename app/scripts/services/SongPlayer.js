(function() {
    /**
    * @function SongPlayer (factory service)
    * @desc creates the SongPlayer service with its attributes and methods
    * @param {Object} song
    * @returns {Object}
    */
     function SongPlayer() {
        /**
        * @desc The songPlayer object that gets returned by this function
        * @type {Object}
        */
        var SongPlayer = {};
        /**
        * @desc The current song object that is passed in through the public methods
        * @type {Object}
        */

        var currentSong = null;

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
               currentSong.playing = null;
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
           });

           currentSong = song;
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
        /**
        * @function SongPlayer.play
        * @desc public method which will either play a new song or start a paused song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
            return SongPlayer;
        }



     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
