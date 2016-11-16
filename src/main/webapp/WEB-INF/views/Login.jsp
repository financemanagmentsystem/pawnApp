<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en" ng-app="appCtrl">
  <head>

    <title ng-bind = 'title'></title>

    <link href="<c:url value='/static/css/api/bootstrap.css' />" rel="stylesheet">
	<link href="<c:url value='/static/css/login.css' />" rel="stylesheet">
    <style>
		body {
		  padding-top: 10px;
		  background-color: #F5F5F5;
		}
    </style>

   
  </head>

  <body >
  	<div class="container">
		<div class="row">
		<div class="col-md-12 col-sm-12 col-lg-12">
		  	<div ng-view></div>
		</div>

		</div>

    </div>
		<!-- <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script> -->
		 <script src="<c:url value='/static/js/api/angularjs/angular.js' />"></script>
		 <script src="<c:url value='/static/js/api/angularjs/angular-route.min.js' />"></script>
		 
		 <script src="<c:url value='/static/js/api/angularjs/angular-cookies.min.js'/>"></script>
		 <script src="<c:url value='/static/js/api/angularjs/angular-resource.min.js'/>"></script>
		 <script src="<c:url value='/static/js/api/angularjs/angular-sanitize.min.js'/>"></script>
		 <script src="<c:url value='/static/js/api/Externals/ng-toasty.js'/>"></script> 
		 <script src="<c:url value='/static/js/api/angular-gridster.min.js'/>"></script>
		 <script src="<c:url value='/static/js/api/angular-dragdrop.min.js'/>"></script>
		 <script src="<c:url value='/static/js/api/Externals/angularjs/angular-animate.min.js'/>"></script>
		 <script src="<c:url value='/static/js/api/Externals/loading-bar.min.js'/>"></script>
		 <script src="<c:url value='/static/js/api/Externals/checklist-model.js'/>"></script>
		 <script src="<c:url value='/static/js/api/Externals/ui-bootstrap-tpls-0.12.0.js'/>"></script>
		 <script src="<c:url value='/static/js/api/angular-nicescroll.js'/>"></script>
					  
		  <script src="<c:url value='/static/js/api/jquery.js'/>"></script>
		  <script src="<c:url value='/static/js/api/jquery.nicescroll.js'/>"></script>
		
		 <!-- /ScrapApp/src/main/webapp/static/js/api/Externals/ng-toasty.js
		 
		 /ScrapApp/src/main/webapp/static/js/api/Externals/angularjs/angular-animate.min.js
		 
		  -->
		 
		 
		 
		 
		 
	  <script src="<c:url value='/static/js/controller/loginController.js' />"></script>
	   <script src="<c:url value='/static/js/controller/loginCtrl.js' />"></script>
	   <script src="<c:url value='/static/js/controller/adminCtrl.js' />"></script>
  </body>
</html>
