angular.module('appCtrl').controller('ClientRegistrationController',['$scope', '$http', '$location', '$q', 'modal', 'States',function($scope, $http, $location, $q, modal, States) {
	
	var baseUrl = $location.absUrl().split('#')[0];
    var REST_SERVICE_URI = baseUrl;
    console.log(REST_SERVICE_URI);
     	
 }])
 .factory('States', function ($http) {
     return {
         get: function () {
         	return $http.get('static/js/ThirdPartyLib/StateCountry.json')
         }
     };
 });