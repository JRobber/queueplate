var app = angular.module('QueuePlate')

app.service('loginService', function($http, $q, authTokenService) {

	this.login = function(email, password) {
		
		return $http.post('/api/users', {
			email: email, 
			password: password

		})
		.success(function(data) {
			this.userData = data; 
			console.log(userData)
			authTokenService.setToken(data.token)
			return data;
		})
	}

	this.logout = function() {
		authTokenService.setToken();
		
	}

	this.isLoggedIn = function() {
		if(authTokenService.getToken())
				return true;
		else
			return false;
	}

	this.getUser = function() {
		if(authTokenService.getToken())
			return $http.get('/api/me');
		else
			return $q.reject({message: "User has no token"})
	}

	this.getUserById = function(id) {
		if(authTokenService.getToken())
			return $http.get('/api/users?userID=' + id);
		else
			return $q.reject({message: "User has no token"})
	}

});

app.service('authTokenService', function($window) {

	this.getToken = function() {
		return $window.localStorage.getItem('token');
	}

	this.setToken = function(token) {

		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	}

})

app.factory('AuthInterceptor', function($q, $location, authTokenService) {

	var interceptorService = {};

	interceptorService.request = function(config) {

		var token = authTokenService.getToken();

		if(token) {

			config.headers['x-access-token'] = token;
		}
		return config;
	};

	interceptorService.responseError = function(response) {
		if(response.status == 403)
			$location.path('/login');

		return $q.reject(response);

	}

	return interceptorService;
});

