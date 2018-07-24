'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:headerCtrl
 * @description
 * # MainCtrl
 * Controller of the dipaApp
 */
angular.module('chatApp')
  .controller('HeaderCtrl', function ($scope,ngDialog,$state,layerAlert, internetService, myWebsocket, $interval, storage, $modal, $rootScope) {
       
       $scope.modifyFun=function(){
       		ngDialog.openConfirm({
			template: 'modify_one',
			scope: $scope,
			controller: ["$scope", function($scope) {
			
			}],
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false,
			width: 600
		});
       }
  });
