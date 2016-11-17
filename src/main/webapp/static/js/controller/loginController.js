angular.module('appCtrl', ['ngCookies','ngResource','ngSanitize', 'angular-loading-bar', 'ngRoute', 'checklist-model','gridster', 'ngDragDrop','ui.bootstrap','angular-nicescroll'])
.factory('modal',['$modal','gaTrack',function($modal,gaTrack){
    return{
        open: function(modalOptions){
            gaTrack.track(modalOptions.templateUrl);
            return $modal.open(modalOptions)
        }
    }
}])
.factory('displayAlert',['toasty',function(toasty){
    return {
        success: function(text) {
            toasty.pop.success({
                title: text
            });
        }, error:function(text) {
            toasty.pop.error({
                title: text
            });
        }, warning:function(text) {
            toasty.pop.warning({
                title: text
            });
        }, errorDisplay:function(text){
            toasty.pop.warning({
                title: text,
                timeout: 0,
                showClose: true,
                clickToClose: false
            });
        }, clear:function(){
            toasty.clear();
        }
    }
}])

.factory('gaTrack',['$rootScope','$location','$route',function($rootScope, $location,$route){
    return {
        track: function(page) {
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                ga('create', 'UA-63912127-1', {
                    'cookieDomain': 'none'
                });
                ga('send', 'pageview', {
                    'page': page,
                    'title': $route.current.$$route.title
                });
        }
    }
}])

.config(['$routeProvider',
         function($routeProvider) {
	$routeProvider.
	when('/Login', {
		templateUrl: 'static/templates/login.html',
		controller: 'LoginController',
		title: 'Login'
	}).
	when('/ShowOrders', {
		templateUrl: 'static/templates/show_orders.html',
		controller: 'ShowOrdersController'
	}).
	when('/AdminDashboard', {
		templateUrl: 'static/templates/adminDashboard.html',
		controller: 'AdminController',
		title: 'Admin Dashboard'
	})/*.when('/static/templates/modals/modal_password-forgot.html', {
		templateUrl: 'static/templates/modals/modal_password-forgot.html',
		controller: 'AdminController',
		title: 'Admin Dashboard'
	})*/.
	
	otherwise({
		redirectTo: '/Login'
	});
	
}]).run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

        if (current.hasOwnProperty('$$route')) {

            $rootScope.title = current.$$route.title;
        }
    });
}]);

/*

sampleApp.controller('ShowOrdersController', function($scope) {

	$scope.message = 'This is Show orders screen';

});
 */