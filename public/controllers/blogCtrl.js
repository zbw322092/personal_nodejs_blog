app.controller('blogCtrl', ['$scope', '$http', function($scope, $http) {
	
	initialPage();
	function initialPage() {
		getAllPosts();
	};

	function getAllPosts() {
		$http
			.get('/api/blogpost')
			.then(
				function(posts) {
					var i;
					for(i in posts.data) {
						posts.data[i].formattedDate = 
							posts.data[i].posted.slice(0, 10) + ' ' +
							posts.data[i].posted.slice(11, 19);
					}
					
					$scope.posts = posts.data;
				}
			);
	};

	$scope.createPost = function(post) {
		$http
			.post('/api/blogpost', post)
			.then(
				function(result) {
					if (result.data == '未登录') {
						window.location = 'http://localhost:3000/#/sign_in';
					} else {
						getAllPosts();	
					}
				},
				function(error) {
					console.log('Get posts error');
				}
			);
	};

	$scope.editPost = function(postId) {
		$http
			.get('/api/blogpost/'+postId)
			.then(
				function(post) {
					$scope.post = post.data;
				},
				function(error) {
					console.log('Edit posts error');
				}
			);
	};

	$scope.updatePost = function(post) {
		console.log(post);
		$http
			.put("/api/blogpost/"+post._id, post)
			.then(
				function(result) {
					getAllPosts();
				},
				function() {
					console.log('Update posts error');
				}
			);
	};

	$scope.deletePost = function(postId) {
		$http.delete('/api/blogpost/'+postId)
			.then(
				function(result) {
					getAllPosts()
				},
				function(error) {
					console.log('Delete posts error');
				}
			);
	};


	$scope.signOut = function() {
		$http.get('/signOut')
			.then(
				function(result) {
					if (result.data === '登出成功') {
						window.alert('登出成功');
					}
				},
				function(error) {

				}
			);
	}

	$scope.signinOrSignout = function() {
		$http.get('/sign_redirect')
			.then(
				function(result) {
					if (result.data === '未登录') {
						window.location = 'http://localhost:3000/#/sign_in';
					} else if (result.data === '已登录') {
						$scope.signOut();
					}
				},
				function(error) {
					console.log('error happen: ', error);
				}
			);
	}


}]);






















