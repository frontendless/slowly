var slowlyApp = angular.module('slowlyApp',[]);

slowlyApp.controller('DetailController', ['$scope', function($scope) {

    $scope.greeting = "Hello world!";

    $scope.phones = [
        {'name': 'Nexus S',
         'snippet': 'Fast just got faster with Nexus S.'},
        {'name': 'Motorola XOOM™ with Wi-Fi',
         'snippet': 'The Next, Next Generation tablet.'},
        {'name': 'MOTOROLA XOOM™',
         'snippet': 'The Next, Next Generation tablet.'}
    ];

}]);

slowlyApp.controller('DataController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.sum = 0;

    $scope.lightup = function(event) {
        $(event.target).css({'background-color': 'red'}).stop().animate({'background-color': 'transparent'}, 1000);
    }

    $scope.loadData = function() {
        $http.get('/details.json').success(function(data) {
            $scope.sum = data.length;
        });
    };
    $scope.loadData();

}]);

