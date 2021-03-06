var app = angular.module('serverConfigApp', ['tractdb.config']);

app.controller(
    'serverConfigController',
    [
        '$scope', '$http', 'BASEURL_PYRAMID',
        function ($scope, $http, BASEURL_PYRAMID) {
            $http({
                method: 'GET',
                url: BASEURL_PYRAMID,
                headers: {'Content-Type': 'application/json'},
                data: ''
            }).then(function onSuccess(response) {
                $scope.serverConfig = JSON.stringify(response.data, undefined, 2);
            }, function onError(response) {
                $scope.myWelcome = response.statusText;
            });
        }
    ]
);
