app.controller('signUpCtrl', function($scope, $http) {
	$scope.signUp = function() {
		$http
			.post('/signup', $scope.signUpInfo)
			.then(
				function(result) {

				},
				function(error) {

				}
			);
	}
});