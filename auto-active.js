//创建自定义指令
(function(angular){
    var app=angular.module('auto-active',[]);
    app.directive('autoActive',['$location',function($location){
        return {
            //让当前点击事件后获取样式，而其兄弟元素失去样式
            link:function(scope,element,attributes){
                element.on('click',function(){
                    //先清除其他子元素的样式，在给当前的元素添加active样式
                     element.parent().children().removeClass('active');
                    element.addClass('active');
                   
                })
                //  监视当前锚点值的变化
                scope.loca=$location;
                scope.$watch('loca.url()',function(now,old){
                 var hash = element.find('a').attr('href').substr(1)
                    //find（'a'） 找到a标签  attr(href) 找到href属性    substr(1) 去掉当前得到的URL的首字符#，
                    //因为location.url是不认识#
                    if(now.startsWith(hash)){
                        element.parent().children().removeClass('active');
                        element.addClass('active');
                    }
                        //startWith（）表示当前字符串是否以另外一个字符串开始
                    
                })
            }
        }
    }]);
})(angular)