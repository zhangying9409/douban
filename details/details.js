(function(angular){
var app=angular.module('details',['ngRoute','myJsonpService']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/details',{
        templateUrl:'./details/details.html',
        controller:'detailsController'
    })
}])
app.controller('detailsController',[
    '$scope',
    '$routeProvider',
    '$routeParams',
    'MyService',function($scope,$routeParams,MyService){
    MyService.jsonp('https://api.douban.com/v2/movie/subject/'+$routeParams.id,{},function(data){
        $scope.data=data;
        $scope.$apply();

    })
    
}])
})(angular);