userApp.controller('registerController', function ($scope, $http, $cookieStore, $state,$window) {
    // $state 跳转
    $scope.register = function () { 
        // 调取视图里面的 ng-model="loginName" 
        // 在控制器中获取在元素中填写的值，是通过$scope.(ng-modole所对相应的值)
        if(!$scope.loginName || !$scope.password || !$scope.confirmPassword){
            $window.alert('请输入登录名，密码，确认密码');
            return; 
        }
 
        if($scope.password != $scope.confirmPassword){
            $window.alert('两次输入的密码不一致');
            return;
        }
 
        //对应 app.js 里面定义的接口 ，第二个参数，以对象形式（设置的属性名和属性值的形式）传递给后台的app.js 操作数据库的业务逻辑接口。
        $http.post('/api/register', {
            loginName: $scope.loginName,
            password: $scope.password,
            confirmPassword: $scope.confirmPassword
        }).then(function (res) {
            if (res.data.code == "success") {
                // $cookieStore --> 前提是必须在main.js 里面的userApp里面的引入的服务：$ngCookies
                $cookieStore.put('account', $scope.loginName);
                $state.go('nav.list');
            } else {
                alert(res.data.message);
            }
        })
    }
});