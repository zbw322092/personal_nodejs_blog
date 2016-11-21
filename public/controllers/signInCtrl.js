app.controller('signInCtrl', function($scope, $http) {
	
	$scope.signIn = function() {
		$http
			.post('/signin', $scope.signInInfo)
			.then(
				function(result) {

				},
				function(error) {
					
				}
			);
	}
});