angular.module('appCtrl').controller('AdminController',['$scope', '$http', '$location', '$q', 'modal',function($scope, $http, $location, $q, modal) {
	
	var baseUrl = $location.absUrl().split('#')[0];
    var REST_SERVICE_URI = baseUrl+'login/';
    console.log(REST_SERVICE_URI);
    
   
    var deferred = $q.defer();
	//console.log(data);
	$http.get(baseUrl+'/client/getAll')
    .then(
    function (response) {
    	$scope.clientList = response.data;
        deferred.resolve(response.data);
    //	alert("success");
    },
    function(errResponse){
        console.error('Error while creating User');
        deferred.reject(errResponse);
    });
	
	$http.get(baseUrl+'/client/loan/getAll')
    .then(
    function (response) {
    	$scope.clientLoanList = response.data;
    	console.log($scope.clientLoanList);
        deferred.resolve(response.data);
    //	alert("success");
    },
    function(errResponse){
        console.error('Error while creating User');
        deferred.reject(errResponse);
    });
	
	$http.get(baseUrl+'/client/loan/ornament/getAll')
    .then(
    function (response) {
    	$scope.loanOrnamentList = response.data;
    	console.log($scope.loanOrnamentList);
        deferred.resolve(response.data);
    //	alert("success");
    },
    function(errResponse){
        console.error('Error while creating User');
        deferred.reject(errResponse);
    });
	
	$scope.isClientSelected = false;
	$scope.selectedClientId = 0;
	$scope.clientFilter = function(item) {
		
		if($scope.isClientSelected) {
			//console.log(item);
			if($scope.selectedClientId == item.clientId.clientId)
				return true;
			else
				return false;
		}	
		return true;
	}
	
	
	
	$scope.getClientLoans = function(clientId) {
	//	console.log(clientId);
		$scope.isClientSelected = true;
		$scope.selectedClientId = clientId;
	/*	$http.get(baseUrl+'/client/loan/getAll')
	    .then(
	    function (response) {
	    	$scope.clientLoanList = response.data;
	    	console.log($scope.clientLoanList);
	        deferred.resolve(response.data);
	    //	alert("success");
	    },
	    function(errResponse){
	        console.error('Error while creating User');
	        deferred.reject(errResponse);
	    });*/
		
	}
	
	
	
	$scope.loanOrnament = function(clientId) {
		/*$http.get(baseUrl+'/client/loan/ornament/getAll')
	    .then(
	    function (response) {
	    	$scope.loanOrnamentList = response.data;
	    	console.log($scope.loanOrnamentList);
	        deferred.resolve(response.data);
	    //	alert("success");
	    },
	    function(errResponse){
	        console.error('Error while creating User');
	        deferred.reject(errResponse);
	    });
		*/
	}
	
	
	
    
    
    $scope.customersList = [{customerName : "Mark", idNumber : "1", mobileNo : "234567", city : "hyd", loanId : "1"},
                            {customerName : "Mark", idNumber : "2", mobileNo : "1234", city : "ameerpet", loanId : "13"},
                            {customerName : "Mark", idNumber : "4", mobileNo : "7864", city : "rampet", loanId : "6"},
                            {customerName : "Mark", idNumber : "3", mobileNo : "1234", city : "secbad", loanId : "17"},
                            {customerName : "Mark", idNumber : "5", mobileNo : "8769", city : "kmm", loanId : "011"},
                            {customerName : "Mark", idNumber : "6", mobileNo : "1234097", city : "wgl", loanId : "456"},
                            {customerName : "Mark", idNumber : "7", mobileNo : "45321", city : "vijawad", loanId : "34"},
                            {customerName : "Mark", idNumber : "8", mobileNo : "98706", city : "Guntur", loanId : "123"},
                            {customerName : "Mark", idNumber : "9", mobileNo : "123567", city : "Tenali", loanId : "987"},
                            {customerName : "Mark", idNumber : "10", mobileNo : "234567", city : "Amaravathi", loanId : "34"},
                            {customerName : "Mark", idNumber : "11", mobileNo : "234567", city : "Rajolu", loanId : "87"},
                            {customerName : "Mark", idNumber : "12", mobileNo : "234567", city : "Indira Nager", loanId : "89"},
                            {customerName : "Mark", idNumber : "13", mobileNo : "234567", city : "Madhapur", loanId : "12"},
                            {customerName : "Mark", idNumber : "14", mobileNo : "234567", city : "vizag", loanId : "876"},
                            {customerName : "Mark", idNumber : "15", mobileNo : "234567", city : "No ", loanId : "889"},
                            ];
	
    
    $scope.addCustomer = function(){
    	
    	/*var customerModal = modal.open({
    		
    		    templateUrl: 'static/templates/modal_password-forgot.html',
    		    constroller : 'AdminController',
                backdrop: 'static',
                keyboard:false,
                size: "md",
                scope: $scope
            
    		
    	})*/
    	$location.path("/client/registration" );
    	
    	
    	
    }
    
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
