userApp.controller('navController', function ($scope, $cookieStore, $state) {
    $scope.logout = function () {
        $cookieStore.remove('account');
        $state.go('login');
    } 
})