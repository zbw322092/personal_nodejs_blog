app.controller('signUpCtrl', function($scope, $http) {
	$scope.signUp = function() {
		$http
			.post('/signup', $scope.signUpInfo)
			.then(
				function(result) {
					console.log(result.data);
					if (result.data === '注册成功') {
						window.location = 'http://localhost:3000/#/';
					}
				},
				function(error) {

				}
			);
	}
});