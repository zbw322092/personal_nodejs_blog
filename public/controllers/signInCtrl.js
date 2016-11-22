app.controller('signInCtrl', function($scope, $http) {
	
	$scope.signIn = function() {
		$http
			.post('/signin', $scope.signInInfo)
			.then(
				function(result) {
					if (result.data === '登录成功') {
						window.location = 'http://localhost:3000/#/';
					}
				},
				function(error) {
					
				}
			);
	}
});