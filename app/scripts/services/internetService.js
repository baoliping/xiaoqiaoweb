'use strict';

/**
 * @ngdoc function
 * @name chatApp.factory:internetService
 * @description
 * # MainCtrl
 * Controller of the dipaApp
 */
angular.module('chatApp')
.factory('internetService', function($http,CHATBOT_CONSTANTS){
	var inter = CHATBOT_CONSTANTS.JSON_URL;
	var inte = CHATBOT_CONSTANTS.BASE_URL;
	var inte_A = CHATBOT_CONSTANTS.BASE_URL_T;
	//var inte='http://10.202.10.105:8088';
	return {
		navList: function () {
			return $http({
				url: inter,
				method: "get"
			})
		},
		country: function (data) {
		    return $http({
		        url: inte + '/country',
		        method: 'POST',
		        headers: { 'Content-Type': undefined },
                data: JSON.stringify(data)
		    })
		},
		ThumbUp: function (data) {
			return $http ({
				url: inte + '/thumb_up',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data: JSON.stringify(data)
			})
		},
		saveMessage : function (data) {
			return $http ({
				url: inte + '/saveMessage',
				method: 'POST',
				headers: {'Content-Type': undefined},
				withCredentials:true,
				data: JSON.stringify(data)
			})
		},
		messagePage: function (data) {
			return $http ({
				url: inte + '/messagePage',
				method: 'POST',
				headers: {'Content-Type': undefined},
				withCredentials:true,
				data: JSON.stringify(data)
			})
		},
		messageDetail:function (data) {
			return $http ({
				url: inte + '/messageDetail',
				method: 'POST',
				headers: {'Content-Type': undefined},
				withCredentials:true,
				data: JSON.stringify(data)
			})
		},
		eidNewMessage: function (data) {
			return $http ({
				url: inte + '/eidNewMessage',
				method: 'POST',
				headers: {'Content-Type': undefined},
				withCredentials:true,
				data: JSON.stringify(data)
			})
		},
		regiterMessage:function(data){
			return $http ({
				url: inte + '/register',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data: JSON.stringify(data)
			})
		},
		activitedMessage:function(data){
			return $http({
				url:inte+"/activited?"+data,
				method: 'get',
				headers: {'Content-Type': undefined},
				
			})
		},
		loginMessage:function(data){
			return $http ({
				url: inte + '/login',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data: JSON.stringify(data)
			})
		},
		myselfMessage:function(data){
			return $http ({
				url: inte + '/myself',
				withCredentials:true,
				method: 'post'
			})
		},
		modify_passwordMessage:function(data){
			return $http ({
				url: inte + '/modify_password',
				method: 'POST',
				headers: {'Content-Type': undefined},
				withCredentials:true,
				data: JSON.stringify(data)
			})
		},
		code_modify_passwordMessage:function(data){
			return $http ({
				url: inte + '/code_modify_password',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data: JSON.stringify(data)
			})
		},
		checkMessage:function(data){
			return $http ({
				url: inte + '/check',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data: JSON.stringify(data)
			})
		},
		send_codeMessage:function(data){
			return $http ({
				url: inte + '/send_code',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data: JSON.stringify(data)
			})
		},
		uploadFileMessage:function(data){
			return $http ({
				url: inte_A + '/app/file/save_file',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data:data
			})
		},
		mark_readMessage:function(data){
			return $http ({
				url: inte + '/mark_read',
				method: 'POST',
				headers: {'Content-Type': undefined},
				data:data
			})
		},
		logoutMessage:function(){
			return $http({
				url:inte+"/logout",
				method:"post",
			})
		}
	}
})