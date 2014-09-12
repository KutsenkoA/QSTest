function ListCtrl($scope, Users) {

    Users.get().then(function(res) {
	$scope.users = res.data;
    });

    $scope.tablehead = [
        {name: 'id', title: 'id'},
        {name: 'name', title: 'Имя пользователя'},
        {name: 'login', title: 'Логин'}
    ];

}

function UserCtrl($scope, $routeParams, $location, Users) {

    Users.get($routeParams).then(function(res) {
	$scope.user = res.data;
    });

    $scope.newUser = function() {
	console.log('new user', $scope.user);
	Users.newUser($scope.user)
	    .then(function() {
		$location.path('/list');
	    });
    };

    $scope.updateUser = function() {
	Users.put($scope.user)
	    .then(function() {
		$location.path('/list');
	    });
    };

    $scope.dropUser = function() {
	if (!confirm('Вы уверены, что хотите удалить пользователя ' + $scope.user.name + '?')) {
	    return;
	}

	Users.drop($scope.user)
	    .then(function() {
		$location.path('/list');
	    });
    };
}
