var app = angular.module('personal_blog_app', []);

app.controller('blogCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.createPost = function(post) {
		$http.post('/api/blogpost', post);
	}
}]);