angular.module('appCtrl').controller('AdminController',['$scope', '$http', '$location', '$q',function($scope, $http, $location, $q) {
	
	var baseUrl = $location.absUrl().split('#')[0];
    var REST_SERVICE_URI = baseUrl+'login/';
    console.log(REST_SERVICE_URI);
	
/*	$scope.loginModel = [];
	$scope.login = function(){
		console.log($scope.loginModel);
		var data = {userName :$scope.loginModel.userName , password : $scope.loginModel.password }
		var deferred = $q.defer();
		$http.post(REST_SERVICE_URI, JSON.stringify(data))
        .then(
        function (response) {
        	console.log(response.data)
            deferred.resolve(response.data);
        },
        function(errResponse){
            console.error('Error while creating User');
            deferred.reject(errResponse);
        });
		
	}
	
	$scope.register = function(){
		
	}
*/	
}]).controller("indexDropDownCtrl",['$scope',function($scope){
    $scope.openAccountSettings=function(){
      /*  var modalInstance = modal.open({
            templateUrl: '/assets/partials/modal_useraccount.html',
            scope: $scope,
            keyboard:false,
            backdrop:'static',
            size:'lg',
            controller:'UserProfileCtrl'

        });*/
    }

}])
