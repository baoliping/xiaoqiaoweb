'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:RegisterCtrl
 * @description
 * # MainCtrl
 * Controller of the dipaApp
 */
angular.module('chatApp')
  .controller('RegisterCtrl', function ($scope,$state,layerAlert, internetService, myWebsocket, $interval, storage, $modal, $rootScope) {
       
    $scope.account = {
			eid: "",
			email: "",
			telephone:"",
			function:"",
		};
    
     $scope.registerFun = function () {
        var data = {
            "eid": $scope.account.eid,
			"email":$scope.account.email,
			"telephone":$scope.account.telephone,
			"function":$scope.account.function,

        };
        console.log(data);
        if($scope.account.eid=='' || $scope.account.email==''|| $scope.account.telephone==''||$scope.account.function ==''){
         layerAlert.autoclose("The submission form cannot be empty!","infomation",3000);
          return;
        }
		if ($scope.account.telephone != '') {
			var phoneFlag = phoneCheck(Number($scope.account.telephone));
			if (!phoneFlag) {
				layerAlert.autoclose('phone input is illegal! Please re-enter','infomation',3000);
				$scope.account.telephone='';
			     return;
			}
		}
		if ($scope.account.email != '') {
			var phoneFlag = emailCheck($scope.account.email);
			if (!phoneFlag) {
				layerAlert.autoclose('Email is illegal! Please re-enter','infomation',3000);
				$scope.account.email='';
			     return;
			}
		}
       
        internetService.regiterMessage(data).then(function (response) {
        	var data=response.data;
        	if(data.status==200){
        		layerAlert.autoclose("successfully! Go to your email to activate your password",'infomation',3000);
        		$state.go("login");
        		 $scope.account = {
					eid: "",
					email: "",
					telephone:"",
					function:"",
				};
        		
        	}else{
        		layerAlert.autoclose(data.info,'infomation',3000);
        	}
           console.log(response);
        })
    }

  });

