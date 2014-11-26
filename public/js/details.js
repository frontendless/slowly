var slowlyApp = angular.module('slowlyApp',[]);

slowlyApp.controller('DetailController',
    ['$scope', function(scope) {

    scope.greeting = "Hello world!";

    scope.phones = [
        {'name': 'Nexus S',
         'snippet': 'Fast just got faster with Nexus S.'},
        {'name': 'Motorola XOOM™ with Wi-Fi',
         'snippet': 'The Next, Next Generation tablet.'}
    ];

}]);

slowlyApp.service('HelloService', function() {
    this.name = "Hello";
})






slowlyApp.controller('DataController',
    ['$scope', '$http', '$timeout', 'HelloService',
    function($scope, $http, $timeout, HelloService) {
        console.log(HelloService);
    $scope.sum = 0;

    $scope.loadData = function() {
        $http.get('/details.json').success(function(data) {
            var sum = 0;
            data.forEach(function(row) {
                row.cells.forEach(function(cell) {
                    sum += cell.text;
                })
            })
            $scope.data = data;
            $scope.sum = sum;
        });
    };

    $scope.changeData = function() {
        $scope.data[0].cells[0].key="Hallo";
    }

}]);


slowlyApp.directive('tableHighlight', function() {

    return {
        restrict: "A",
        link: function(scope, elem, attrs, controller) {

            $(elem).on('mouseover', 'td',
                function (event){
                    $(event.target)
                    .css({'background-color': 'red'})
                    .stop()
                    .animate({'background-color': 'transparent'}, 1000);
            })

        }
    }

});

slowlyApp.directive('slowlyTable', ['$filter', function($filter) {
    var numberFilter = $filter('number');
    return {
        restrict: 'E',
        transclude: true,
        link: function(scope, elem, attrs, controller, transclude) {
            console.log(attrs.ngModel);
            scope.$watch(attrs.ngModel, function watchNgModel(data) {
                if(data) {
                    console.profile("start")
                    var html = ['<table class="table table-bordered table-striped table-condensed">'];
                    html.push('<thead><tr><th></th>');
                    data[0].cells.forEach(function rowForEach(cell) {
                        html.push('<th>');
                        html.push(cell.key)
                        html.push('</th>');
                    });
                    html.push('</tr></thead><tbody>');
                    data.forEach(function(row) {
                        html.push('<tr><th>');
                        html.push(row.key);
                        html.push('</th>');
                        row.cells.forEach(function cellForEach(cell) {
                            html.push('<td>');
                            html.push(numberFilter(cell.text))
                            html.push('</td>');
                        });
                    });
                    html.push('</tbody></table>');

                    var time = new Date().getTime();
                    $(elem).html(html.join(''));
                    console.log("took", new Date() - time);
                    console.profileEnd();
                }
            });

        }
    };
}]);