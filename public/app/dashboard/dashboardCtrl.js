var app = angular.module('QueuePlate')
app.controller('dashboardCtrl', function($scope) {

app.controller('dashboardCtrl', function($scope, loginService) {

	console.log(loginService.testMessage)

})
  // $scope.deliveryAddress = function(delivery) {
  //   // console.log(delivery);
  //   firstName= delivery.firstName,
  //   lastName= delivery.lastName,
  //   address= delivery.address,
  //   city= delivery.city,
  //   state= delivery.state,
  //   postalCode= delivery.postalCode
  // };



});
