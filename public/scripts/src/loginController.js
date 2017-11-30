userApp.controller('loginController', function ($scope, $state, $http, $cookieStore) {
    // 客户端校验省略了
    $scope.login = function () {
        //$http简写方式 ：  $http.post(url,{数据})
        $http.post("/api/login", { 
            // loginName是所传的数据里面的一个属性，$scope.loginName 是从前面的视图页面ng-model获取到的填写的loginName
            // 注意：这里的属性名必须和app.js里面的User对象的属性相同。
            loginName: $scope.loginName,
            password: $scope.password
        }).then(function (res) {
            // res 是从app.js 的相应的接口返回的的json数据中提取data下面的code值
            if (res.data.code == "success") {
                // 登录成功后，设置cookie    $cookieStore.put()用来设置cookie
                $cookieStore.put('account', $scope.loginName);
                $state.go('nav.list'); //$state.go() 路由的跳转,匹配的是main.js里面设置的路由里面的状态的名称。
            } else {  
                alert(res.data.message);
            }
        })
    }
})