var app = angular.module('personal_blog_app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'blogCtrl',
			templateUrl: 'public/views/index.html'
		})
		// .when('/sign_up', {
		// 	controller: 'blogCtrl',
		// 	templateUrl: 'public/views/sign_up.html'
		// })
		.otherwise({redirectTo: '/'});
});