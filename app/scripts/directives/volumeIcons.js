(function() {
    function volumeIcons($document, SongPlayer) {



        return {
             templateUrl: '/templates/directives/volume_icons.html',
             replace: true,
             restrict: 'E',
             scope: {
                 onChange: '&',

             },
             link: function(scope, element, attributes) {
                    scope.value = 50;
                    scope.max = 100;

                    var volumeIcons = $(element);

                   attributes.$observe('value', function(newValue) {
                        scope.value = newValue;
                        setIcon();
                    });


                    var setIcon = function() {

                        if (scope.value == 0) {
                            var icons = document.querySelectorAll(".control-group.volume .icon");
                            for (var i = 0; i < icons.length; i++){
                                icons[i].style.display = "none";
                            }
                            var muteIcon = document.querySelectorAll(".icon.ion-volume-mute");
                            muteIcon[0].style.display = "inline-block";

                        } else if (scope.value > 0 && scope.value <= 33) {
                            var icons = document.querySelectorAll(".control-group.volume .icon");
                            for (var i = 0; i < icons.length; i++){
                                icons[i].style.display = "none";
                            }
                            var lowIcon = document.querySelectorAll(".icon.ion-volume-low");
                            lowIcon[0].style.display = "inline-block";

                        } else if (scope.value > 33 && scope.value <= 66) {
                            var icons = document.querySelectorAll(".control-group.volume .icon");
                            for (var i = 0; i < icons.length; i++){
                                icons[i].style.display = "none";
                            }
                            var mediumIcon = document.querySelectorAll(".icon.ion-volume-medium");
                            mediumIcon[0].style.display = "inline-block";

                        } else if (scope.value > 66 && scope.value <=100) {
                            var icons = document.querySelectorAll(".control-group.volume .icon");
                            for (var i = 0; i < icons.length; i++){
                                icons[i].style.display = "none";
                            }
                            var highIcon = document.querySelectorAll(".icon.ion-volume-high");
                            highIcon[0].style.display = "inline-block";
                        }
                    };

                    scope.onClickIcons = function(event) {
                        if(event.target.matches(".ion-volume-mute")) {
                            event.target.style.display = "none";
                            document.querySelector(".ion-volume-high").style.display = "inline-block";
                            SongPlayer.setVolume(SongPlayer.previousVolume);
                        } else {
                            event.target.style.display = "none";
                            document.querySelector(".ion-volume-mute").style.display = "inline-block";
                            SongPlayer.setVolume(0);
                        }
                    };



                }
        };

    }

    angular
        .module('blocJams')
        .directive('volumeIcons', ['$document', 'SongPlayer', volumeIcons]);
})();
