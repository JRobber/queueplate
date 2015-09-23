var app = angular.module('QueuePlate')

app.service('registerService', function($http, $q, $rootScope) {


	this.checkVerified = function(id) {
		var deferred = $q.defer();
		$http({
			method: "GET", 
			url: "/api/users/" + id
		}).then(function(response) {
			deferred.resolve(response.data)
		})
		    return deferred.promise
		    console.log(deferred.promise)
	}

	this.register = function(user, UID) {
		var deferred = $q.defer()

		$http.put('/api/users/' + UID + '/pref', {
			firstName: user.firstName, 
			lastName: user.lastName,
			age: user.age, 
			gender: user.gender,
			addLine1: user.addLine1,
			addCity: user.addCity, 
			addZip: user.addZip, 
			addState: user.addState, 
			phoneNumber: user.phoneNumber
			// cardNumber: cardNumber, 
			// securityDigits: securityDigits, 
			// dateOfExp: dateOfExp, 
			
		})
		.then(function(data) {
			deferred.resolve(data) //this passes everything back to controller
			
			$rootScope.welcomeUser = data.config.data.firstName;

		});
		
		return deferred.promise
	}

})


