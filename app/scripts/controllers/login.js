'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:LoginCtrl
 * @description
 * # MainCtrl
 * Controller of the dipaApp
 */
angular.module('chatApp')
	.controller('ActivitedPageCtrl', function($scope, $state, layerAlert, internetService, myWebsocket, $interval, storage, $modal, $rootScope) {
		var _url = window.location.href;
		var code = getUrlParam(_url, "code");
		console.log(code);
		var data = "code=" + code + "&activared_way=1";
		internetService.activitedMessage(data).then(function(response) {

			var data = response.data;
			if(data.status == 200) {
				layerAlert.autoclose("active successful",'infomation',3000);
				$state.go("login");

			} else {
				layerAlert.autoclose(data.info,'infomation',3000);
			}
		})
	})
	.controller('LoginCtrl', function($scope, $state, layerAlert, internetService, myWebsocket, $interval, storage, $modal, $rootScope) {
		var sesison_eid=localStorage.getItem("eid");
		if(sesison_eid!=undefined){
			$state.go("main");
		};
		$scope.user = {
			eid: "",
			password: ""
		};
		$scope.changeLoginShow=0;
		$scope.changeLogin1=function(){
			$scope.changeLoginShow=2;
		}
		$scope.changeLogin2=function(){
			$scope.changeLoginShow=1;
		}
		$scope.changeLogin3=function(){
			$scope.changeLoginShow=0;
		}
		$scope.changeAcoount=function(){
			$scope.changeLoginShow=1;
		}
		$scope.loginFun = function() {
			var data = {
				"eid": $scope.user.eid,
				"password": $scope.user.password,
			};
			if($scope.user.eid == '' || $scope.user.password == '') {
				
				layerAlert.autoclose("The submission form cannot be empty!",'infomation',3000);
				
				return;
			}
			
			internetService.loginMessage(data).then(function(response) {

				var data = response.data;
				if(data.status == 200) {
					//登录成功
					myWebsocket.open($scope.user.eid);
					setCookie("username",data.token)
					//document.cookie = "username=" + data.token;　
					var myCountInfo = response;
					//生成唯一id
					$scope.key = 'uuid';
					var uuid = function() {
						var s = [];
						var hexDigits = "0123456789abcdef";
						for(var i = 0; i < 36; i++) {
							s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
						}
						s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
						s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
						s[8] = s[13] = s[18] = s[23] = "-";

						var uuid = s.join("");
						//$scope.chat.uuid = uuid;
						
						localStorage.setItem("uuid", uuid);

					}　
					uuid();
					
					localStorage.setItem("username", data.token);　
					localStorage.setItem("eid", $scope.user.eid);　
					localStorage.setItem("myCountInfo", JSON.stringify(response));
					setTimeout(function(){
						if(myWebsocket.isConnected){
						$scope.sendMsgfirst($scope.user.eid);
						$state.go("main");
						
					}
					},1000)
					
					
					

				} else {
					layerAlert.autoclose(data.info,'infomation',3000);
				}
			})

		}
		$scope.sendMsgfirst=function(eid){
			var firmsg='my eid is '+eid;
			var data = {
				'eid': eid,
				'text': firmsg,
				'type': 1,
				'autosend':1,
				'uuid': localStorage.getItem("uuid")
			}
			myWebsocket.get(data);
			
		}
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
         layerAlert.autoclose("The submission form cannot be empty!","infomation",2000);
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