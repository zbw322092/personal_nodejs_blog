var app = angular.module('personal_blog_app', []);

app.controller('blogCtrl', ['$scope', '$http', function($scope, $http) {
	
	initialPage();
	function initialPage() {
		getAllPosts();
	}



	function getAllPosts() {
		$http
			.get('/api/blogpost')
			.then(
				function(posts) {
					$scope.posts = posts;
				}
			);
	}


	$scope.createPost = function(post) {
		$http.post('/api/blogpost', post);
	}
}]);