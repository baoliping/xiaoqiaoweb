'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:ForgetPasswordCtrl
 * @description
 * # MainCtrl
 * Controller of the dipaApp
 */
angular.module('chatApp')
	.controller('ForgetPasswordCtrl', function($scope, layerAlert, $state, ngDialog, internetService, myWebsocket, $interval, storage, $modal, $rootScope) {

		$scope.checkobj = {
			eid: "",
			telephone: "",
			code: "",
			password: "",
			Confirmpassword:"",
			validCode:""
		};
		$scope.checkCode = '';
		$scope.checkflag = 1;
		$scope.classflagtwo = '';
		$scope.classflagone = "active";
		$scope.codeFlag=false;
		$scope.checkobj.inp='2';
		$scope.checkFun = function() {
			if($scope.checkobj.eid == '') {
				layerAlert.autoclose("eid Can't be empty!",'infomation',3000);
				return;
			}

			var data = {
				"eid": $scope.checkobj.eid,
				"action": 2,
				'type': Number($scope.checkobj.inp),
				'validCode':$scope.checkobj.validCode
			};

			
			internetService.checkMessage(data).then(function (response) {
		  	 	var data=response.data;
				if(data.status==200){
					$scope.checkflag=2;
			        $scope.checkobj.code=data.code;
			        
			        $scope.classflagtwo="";
					$scope.classflagone="";
					$scope.classflagthree="active";
			        layerAlert.autoclose("success!");
			      }else{
			      	layerAlert.autoclose(data.info,'infomation',3000);
			      }
		     })
		};

		$scope.sendCodeFun = function() {
			if($scope.checkobj.eid == '') {
				layerAlert.autoclose("eid Can't be empty!",'infomation',2000);
				return;
			}

			var data = {
				"eid": $scope.checkobj.eid,
				"action": 2,
				'type':Number($scope.checkobj.inp)
			};

			internetService.send_codeMessage(data).then(function(response) {
				var data = response.data;
				if(data.status == 200) {
					$scope.codeFlag=true;
					$scope.classflagtwo="active";
					$scope.classflagone="";
					$scope.classflagthree="";
					layerAlert.autoclose("send success!");
				} else {
					layerAlert.autoclose(data.info,'infomation',3000);
				}
			})
		}
		$scope.modifyCodeFun = function() {
			var data = {
				"code": $scope.checkobj.code,
				"password": $scope.checkobj.password

			};
			if($scope.checkobj.password == '') {
				layerAlert.autoclose("password Can't be empty!",'infomation',3000);
				return;
			}
			if($scope.checkobj.password !=$scope.checkobj.Confirmpassword) {
				layerAlert.autoclose("Password entry is inconsistent!",'infomation',3000);
				return;
			}
			if($scope.checkobj.password != '') {
				var phoneFlag = passwordCheck($scope.checkobj.password);
				if(!phoneFlag) {
					layerAlert.autoclose('password must conform to a password that contains Numbers, case letters, special characters, and longer than 8 bits','infomation',10000);
					$scope.checkobj.password = '';
					return;
				}
			}
			
			internetService.code_modify_passwordMessage(data).then(function(response) {
				var data = response.data;
				if(data.status == 200) {
					layerAlert.autoclose("Password reset successfully!",'infomation',1000);
					$scope.classflagtwo = "";
					$scope.classflagone = "";
					$scope.classflagthree = "";
					setTimeout(function() {
						$state.go("login");
					}, 1600);

				} else {
					layerAlert.autoclose(data.info,'infomation',3000);
				}
			})
		};
	});