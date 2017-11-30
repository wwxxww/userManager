// $http服务是用来向服务端发送请求，是对xmlhttprequest对象的封装，类似于jquery中的ajax请求，主要方法：$http({ method: "get|post", url: "", data: {}, params: {}}),
//  两个简版方法$http.get(''), $http.post('',{})
// $scope作用域服务，用来控制当前控制器中的变量只能在当前控制器中存活
// $rootScope全局作用域服务（根作用域服务），通过其定义的变量或方法可以跨作用存活。
// $state服务是状态服务，用来控制视图之间的跳转，主要方法：$state.go('路径', { 携带的数据 })
// $stateParams状态参数服务，用来接受$state服务跳转时携带过来的数据
// 注意：$state和$stateParams两个服务必须依赖ui.router模块
// $cookieStore服务用来控制angular视图之间的cookie数据传递，依赖ngCookie模块
userApp.controller('addController', function ($http, $scope, $rootScope, $state, $stateParams, $cookieStore) {
    if(!$cookieStore.get('account')){
        $state.go('login'); 
    }
     //$stateParams.user的user 和 main里面的Parmas 的user 必须一致
    var user = $stateParams.user; // 接收的是main.js --> params: { user: "" } 传递过来的数据
    // 取出传递过来的编辑对象的值渲染编辑页面表单的的默认值。
    $scope.loginName = user.loginName;
    $scope.password = user.password;
    $scope.realName = user.realName;
    $scope.age = user.age;
    $scope.sex = user.sex;
    $scope.birthday = user.birthday;

    if($scope.password == null){
        $scope.password = '123456';
    }

    // 编辑和添加共同的save方法。
    $scope.save = function () {
        // 获取编辑获取添加时候，表单内数据改变。
        var postData = {
            loginName: $scope.loginName,
            password: $scope.password,
            realName: $scope.realName,
            age: $scope.age,
            sex: $scope.sex,
            birthday: $scope.birthday
        }

        var url = "/api/addUser"; // 添加接口地址
        // 如果user存在值，说明是编辑状态
        if(user){
            postData.id = user._id;  //编辑时还需要再添加一个数据，获取这个对象的_id值，然后作为筛选条件id，进行post保存
            url = "/api/editUser"; // 编辑接口地址
        } 

        // $http.post(url,{数据})保存数据到数据库
        $http.post(url, postData)
        .then(function (res) {
            if (res.data.code == "success") {
                $state.go("nav.list");
            }
        });
    }
})