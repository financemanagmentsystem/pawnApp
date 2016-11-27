angular.module('appCtrl').controller('ClientRegistrationController',['$scope', '$http', '$location', '$q', 'modal', 'States',function($scope, $http, $location, $q, modal, States) {
	
	var baseUrl = $location.absUrl().split('#')[0];
    var REST_SERVICE_URI = baseUrl;
    console.log(REST_SERVICE_URI);
    $scope.clientRegister = {};
    $scope.clientOrnament = {};
    $scope.clientLoan = {};
    
    $scope.clientLoan.periodType = "MONTH";
    $scope.periodIn = [{ id: "MONTH", name: "Month" }, { id: "YEAR", name: "Year" }, { id: "DAYS",name: "Days" }];
    
    
    $scope.clientRegister.idType = "AADHAR";
    $scope.idTypeList = [{ id: "AADHAR", name: "Aadhar" }, { id: "PAN", name: "Pan" }, { id: "VOTERID",name: "VoterId" }, 
                                  { id: "PASSPORT",name: "Passport" }, { id: "OTHER",name: "Other" }];
    
   
    $scope.clientOrnament.ornamentMetal = "GOLD";
    $scope.metalTypes = [{ id: "GOLD", name: "Gold" }, { id: "SILVER", name: "Silver" }, { id: "DIMOND", name: "Dimond" }];
    
   
    $scope.clientOrnament.ornamentType = "RING";
    $scope.ornamentTypes = [{ id: "RING", name: "Ring" }, { id: "CHAIN", name: "Chain" }, { id: "LOCKET", name: "Locket" }];
    
    
    
    
    
    $scope.ornamentList = [];
    $scope.addOrnament = function() {
    	console.log($scope.clientOrnament);
    	$scope.ornamentList.push({ornamentName : $scope.clientOrnament.ornamentName, ornamentMetal: $scope.clientOrnament.ornamentMetal, 
    		ornamentType: $scope.clientOrnament.ornamentType,	ornamentQuantity :$scope.clientOrnament.ornamentQuantity ,
    		ornamentQuality : $scope.clientOrnament.ornamentQuality, ornamentValue : $scope.clientOrnament.ornamentValue })
    }
    
    $scope.formJsonData = function() {
    	console.log($scope.clientRegister);
    	console.log($scope.clientLoan);
    	console.log($scope.ornamentList);
    	$scope.saveClient();
    }
    
    
    $scope.saveClient = function(){
		console.log($scope.loginModel);
		
		var data = { clientData : JSON.stringify($scope.clientRegister) , clientLoan : JSON.stringify($scope.clientLoan), 
				clientOrnamentList : angular.toJson($scope.ornamentList)}
		var deferred = $q.defer();
		console.log(data);
		$http.post(REST_SERVICE_URI+'/client/add', JSON.stringify(data))
        .then(
        function (response) {
        	console.log(response.data)
            deferred.resolve(response.data);
        	alert("success");
        	//$scope.getAllClients();

        },
        function(errResponse){
            console.error('Error while creating User');
            deferred.reject(errResponse);
        });
		
		
		
	}
    
    

    /*$scope.getAllClients = function(){*/
		var deferred = $q.defer();
		//console.log(data);
		$http.get(REST_SERVICE_URI+'/client/getAll')
        .then(
        function (response) {
        	console.log(response.data)
            deferred.resolve(response.data);
        	alert("success");
        },
        function(errResponse){
            console.error('Error while creating User');
            deferred.reject(errResponse);
        });
	/*}*/

    
    
    
 }])
 .factory('States', function ($http) {
     return {
         get: function () {
         	return $http.get('static/js/ThirdPartyLib/StateCountry.json')
         }
     };
 });