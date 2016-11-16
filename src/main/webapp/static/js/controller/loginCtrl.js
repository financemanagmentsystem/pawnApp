angular.module('appCtrl').controller('LoginController',['$scope', '$http', '$location', '$q', '$modal',function($scope, $http, $location, $q,  $modal) {
	
	var baseUrl = $location.absUrl().split('#')[0];
    var REST_SERVICE_URI = baseUrl+'login/';
    console.log(REST_SERVICE_URI);
    
    $scope.isLogin = true;
    $scope.isRegister = false;
    $scope.isForgetPassword = false;
    
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    $scope.userNamePattern = /^[a-zA-Z0-9]*$/;
    
    $scope.enableLogin = function(){
    	$scope.isLogin = true;
        $scope.isRegister = false;
        $scope.isForgetPassword = false;
        
    }
    
    $scope.enableRegister = function(){
    	$scope.isLogin = false;
        $scope.isRegister = true;
        $scope.isForgetPassword = false;
    }
    
    $scope.enableForgotPassword = function(){
    	$scope.isLogin = false;
        $scope.isRegister = false;
        $scope.isForgetPassword = true;
    }
	//console.log(modal);
	$scope.loginModel = [];
	$scope.login = function(){
		console.log($scope.loginModel);
		var data = {userName :$scope.loginModel.userName , password : $scope.loginModel.password }
		var deferred = $q.defer();
		$http.post(REST_SERVICE_URI, JSON.stringify(data))
        .then(
        function (response) {
        	console.log(response.data)
            deferred.resolve(response.data);
        	$location.path( "/AdminDashboard" );

        },
        function(errResponse){
            console.error('Error while creating User');
            deferred.reject(errResponse);
        });
		
	}
	
	$scope.register = function(){
		
	}
	
	/*$scope.forgotPassword = function(){
		console.log('Called');
		$modal.open({
             templateUrl: 'static/templates/modals/modal_password-forgot.html',
             backdrop: 'static',
             keyboard:false,
             size: "md",
             scope: $scope
         });
	}*/
	
	$scope.signUp = function() {
		
		var data = {userName :$scope.signUp.userName , password : $scope.signUp.password , mobileNo : $scope.signUp.mobile, email : $scope.signUp.email }
		var deferred = $q.defer();
		$http.post(REST_SERVICE_URI+'signUp/', JSON.stringify(data))
        .then(
        function (response) {
        	console.log(response)
            deferred.resolve(response.data);
        },
        function(errResponse){
            console.error('Error while creating User');
            deferred.reject(errResponse);
        });

		
		
		
	}
	
}]).directive('compareTo', [function () {
	return {
	      require: "ngModel",
	      scope: {
	        otherModelValue: "=compareTo"
	      },
	      link: function(scope, element, attributes, ngModel) {

	        ngModel.$validators.compareTo = function(modelValue) {
	          return modelValue == scope.otherModelValue;
	        };

	        scope.$watch("otherModelValue", function() {
	          ngModel.$validate();
	        });
	      }
	    };
    }]);
