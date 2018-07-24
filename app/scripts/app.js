'use strict';

/**
 * @ngdoc overview
 * @name chatApp
 * @description
 * # dipaApp
 *
 * Main module of the application.
 */
var App=angular
  .module('chatApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    //'ngRoute',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngTouch',
    'chatApp',
    'ngWebSocket',
    'angular-loading-bar',
    'ngDialog',
    'tm.pagination'
  ])
  App.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });
  App.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      /* .state('register', {
        url: '/register',
        title:"register",
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })*/
       .state('forgetPassword', {
        url: '/forgetPassword',
        title:"forgetPassword",
        templateUrl: 'views/forgetPassword.html',
        controller: 'ForgetPasswordCtrl'
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .state('activitedPage', {
        url: '/activitedPage',
        templateUrl: 'views/pages/activitedPage.html',
        controller: 'ActivitedPageCtrl'
      })
      .state('header', {
        url: '/header',
        templateUrl: 'views/pages/header.html',
        controller: 'HeaderCtrl'
      });
    $urlRouterProvider.otherwise('/login');
  });

App.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
  }])
 App.filter("highLightFilter", function($sce){  
        return function(text, item){  
            
            //
            if(item.Text){
          		var result='';
          		if(item.mstype=='text' || !item.mstype){
          			if(item.keyword){
	          		item.keyword.forEach(function(_item,_index){
	          			var ket=_item;
	          			var regExp = new RegExp(_item, 'g');
	          			 result=item.Text.replace(regExp,"<span class='newhighlight fr' data='"+ket+"' ng-click='sendkey($event.target)'>" + ket + '</span>');
	          		
	          		})
	          	 }else{
	          	 	 return $sce.trustAsHtml(text);  
	          	 }
			          		
			}
            // 
            return $sce.trustAsHtml(result);
           
        };  
   } });
   App.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});