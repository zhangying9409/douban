(function (angular) {
    var app = angular.module('movie_list', ['ngRoute', 'myJsonpService']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:movieType/:page?', {
            templateUrl: './movie_list/movie_list.html',
            controller: 'movie_listController'
        })
    }])
    app.controller('movie_listController', [
        '$scope',
        '$http',
        '$routeParams',
        '$route',
        'MyService',

        function ($scope, $http, $routeParams, $route, MyService) {
            console.log($routeParams);
            $scope.loading = true; //加载动画
            $scope.page = ($routeParams.page || "1") - 0; //第几页 默认字符串类型 默认第一页
            $scope.pageSize = 5; //每页多少条
            var start = ($scope.page - 1) * $scope.pageSize;

            // $http.get('./movie_list/data.json').then(function(res){
            //   $scope.data=res.data;
            //本地请求
            // })//发请求，拿数据
            MyService.jsonp('https://api.douban.com/v2/movie/' + $routeParams.movieType, {
                //通过jsonp动态获取数据
                start: start, //从第几条开始
                count: $scope.pageSize ,
                q:$routeParams.q//一次取多少条
            }, function (data) {

                $scope.data = data;
                $scope.totalPage = Math.ceil($scope.data.total / $scope.pageSize);
                //根据总条数以及每页的条数来计算出一共多少页
                $scope.loading = false;
                $scope.$apply(); //异步请求给数据模型赋值，angular不知道
                //所以要通过$scope.$apply()告诉angular我们已经修改了数据模型的值
                //会把改变的值重新渲染到页面上
            })
            $scope.getPage = function (nowPage) {
                if (nowPage <= 0 || nowPage > $scope.totalPage) {
                    return; //小于等于第一页时，不允许点击上一页    大于最后一页时， 不允许点击下一页
                }
                //获取指定页的数据
                $route.updateParams({
                    page: nowPage
                })
                //此方法可以改变url中锚点的参数部分

            }

            //     $scope.data={
            //假数据
            //   "count": 20,
            //   "start": 0,
            //   "total": 47,
            //   "subjects": [
            //     {
            //       "rating": {
            //         "max": 10,
            //         "average": 7.5,
            //         "stars": "40",
            //         "min": 0
            //       },
            //       "genres": [
            //         "动作"
            //       ],
            //       "title": "战狼2",
            //       "casts": [
            //         {
            //           "alt": "https://movie.douban.com/celebrity/1000525/",
            //           "avatars": {
            //             "small": "https://img3.doubanio.com/img/celebrity/small/39105.jpg",
            //             "large": "https://img3.doubanio.com/img/celebrity/large/39105.jpg",
            //             "medium": "https://img3.doubanio.com/img/celebrity/medium/39105.jpg"
            //           },
            //           "name": "吴京",
            //           "id": "1000525"
            //         },
            //         {
            //           "alt": "https://movie.douban.com/celebrity/1100321/",
            //           "avatars": {
            //             "small": "https://img1.doubanio.com/img/celebrity/small/1415801312.29.jpg",
            //             "large": "https://img1.doubanio.com/img/celebrity/large/1415801312.29.jpg",
            //             "medium": "https://img1.doubanio.com/img/celebrity/medium/1415801312.29.jpg"
            //           },
            //           "name": "弗兰克·格里罗",
            //           "id": "1100321"
            //         },
            //         {
            //           "alt": "https://movie.douban.com/celebrity/1274840/",
            //           "avatars": {
            //             "small": "https://img3.doubanio.com/img/celebrity/small/1401440361.14.jpg",
            //             "large": "https://img3.doubanio.com/img/celebrity/large/1401440361.14.jpg",
            //             "medium": "https://img3.doubanio.com/img/celebrity/medium/1401440361.14.jpg"
            //           },
            //           "name": "吴刚",
            //           "id": "1274840"
            //         }
            //       ],
            //       "collect_count": 280230,
            //       "original_title": "战狼2",
            //       "subtype": "movie",
            //       "directors": [
            //         {
            //           "alt": "https://movie.douban.com/celebrity/1000525/",
            //           "avatars": {
            //             "small": "https://img3.doubanio.com/img/celebrity/small/39105.jpg",
            //             "large": "https://img3.doubanio.com/img/celebrity/large/39105.jpg",
            //             "medium": "https://img3.doubanio.com/img/celebrity/medium/39105.jpg"
            //           },
            //           "name": "吴京",
            //           "id": "1000525"
            //         }
            //       ],
            //       "year": "2017",
            //       "images": {
            //         "small": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2485983612.jpg",
            //         "large": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2485983612.jpg",
            //         "medium": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2485983612.jpg"
            //       },
            //       "alt": "https://movie.douban.com/subject/26363254/",
            //       "id": "26363254"
            //     },
            //     {
            //      
            // };
        }
    ])
})(angular)