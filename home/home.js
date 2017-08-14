(function (angular) {
    // "use strict";
var myapp=angular.module('home',['ngRoute']);
myapp.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/home_page',{
        templateUrl:'home/home.html'
    })
}])
})(angular);