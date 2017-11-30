userApp.controller('listController', function ($rootScope, $scope, $state, $http, $window, $cookieStore) {
    // 判断是都为登录状态 
    if(!$cookieStore.get('account')){
        $state.go('login'); //匹配的是路由的第一参数：状态名称
    } 
    // $scope.userLists=''; 下面的find方法相当于重新给其赋值了，在本控制器里面，这个变量都能使用。
    $scope.search = function (page) {
        $http({ 
            method: "get", 
            url: "/api/getUser",
            // 这里的params参数，就相当于之前的在url路径中传入的参数。
            params: {
                realName: $scope.realName,
                page: page || 1, // 在视图页面用户选择了特定的页码数的时候，还是传过来的p值，如果没有传递页码数，就默认找出第一页数据。
                pageSize: 10     
            } 
        }).then(function (res) {
            // 查找出来的用户，传递给视图层循环渲染页面使用。
            $scope.userLists = res.data.users;
            // 下面的分页部分的一排数字
            $scope.pages = res.data.pages;
            // 页面的总页数
            $scope.pageCount = res.data.pageCount;
            // 当前的页码（需要传递给视图，因为用户在点击左右的箭头上下页的时候，需要获取当前的页码数—/+1页，然后再次被params传入后台获取相应页码的数据）
            $scope.currentPage = res.data.currentPage;
        })
    }

    $scope.edit = function (index) { 
        // 数据$scope.userLists 是跨控制器才生效的，所以，在这个控制器里面上面find()查找出来的数据，已经存在，和函数作用域不同了！
        // 通过index 索引值，在所有查找获取渲染到list页面的$scope.userLists数据中，找到所编辑的那个用户的数据，传递到mian.js nav.add的接口的params参数里面接收
        $state.go('nav.add', { user: $scope.userLists[index]});
    } 
    $scope.remove = function (id) {
        if($window.confirm("确定要删除此条数据吗？")){
            $http({
                method: "post",
                url: "/api/remove",
                params: { id }
            }).then(function(res){
                // 删除成功后再去查询
                $scope.search(1);
            })
        }
    }
    // 高亮显示
    $scope.isActive = function (page) {
        return page === $scope.currentPage;
    }
   // 在最后一个的时候，不能在点击。
    $scope.noNext = function () {
        return $scope.currentPage === $scope.pageCount;
    }

    // 没有前一页，禁用
    $scope.noPrevious = function () {
        return $scope.currentPage === 1;
    }

    // 刚开始进入页面自动调取search()方法，获取第一页的数据，直接渲染到list.html的页面上！！！
    if (!$scope.userLists) {
        $scope.search(1);
    }
})