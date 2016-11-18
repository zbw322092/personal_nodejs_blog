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
					$scope.posts = posts.data;
				}
			);
	}

	$scope.deletePost = function(postId) {
		$http.delete('/api/blogpost/'+postId)
			.then(
				function(result) {
					getAllPosts()
				},
				function() {
					console.log('Delete posts error');
				}
			);
	}


	$scope.createPost = function(post) {
		$http
			.post('/api/blogpost', post)
			.then(
				function(result) {
					getAllPosts()
				},
				function(error) {
					console.log('Get posts error');
				}
			);
	}
}]);