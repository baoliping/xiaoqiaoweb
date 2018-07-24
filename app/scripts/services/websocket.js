'use strict';

/**
 * @ngdoc function
 * @name chatApp.factory:myWebsocket
 * @description
 * # MainCtrl
 * Controller of the dipaApp
 */
angular.module('chatApp')
	.factory('myWebsocket', function($websocket, storage, $http, CHATBOT_CONSTANTS,layerAlert,$state) {
		// Open a WebSocket connection
		//
		function mywebscoket() {
			var self = this;
			this.mywebsocket = null;
			self.contents = [];
			this.socketStatus = true; //网络连接状态
			this.human_log_out = false;
			this.isConnected = false;
			var isMin = false;
			var openFlag = false;
			var inter = null;
			var open_eid = '';
			self.changlianjie = function() {
				inter = setTimeout(function() {
					if(!self.socketStatus) {
						console.log('The network connection has been disconnected, and the connection is being reconnected...')
						self.open(open_eid);
					}
				}, 5000);
			}
			this.open = function(eid) {
				if(self.isConnected) {
					return;
				}
				open_eid = eid;
				var currentTime = new Date();
				var concetion_str = '?type=web&eid=' + eid + "&date=" + currentTime;
				var dataStream = $websocket(CHATBOT_CONSTANTS.WS_BASE_URL + concetion_str);
				storage.setObject('isTyping', false);
				dataStream.socket.onopen = function(evnt) {
					self.socketStatus = true;
					self.isConnected = true;
					self.human_log_out = false;
					console.log("Webscoket opened.");
				};
				dataStream.socket.onmessage = function(evnt) {
					self.onmessage(evnt.data);
				}
				dataStream.socket.onclose = function(evnt) {
					self.isConnected = false;
					self.socketStatus = false;
					if(!self.human_log_out && !self.isConnected) {
						self.changlianjie();
					} else {
						storage.remove('token');
						storage.remove('chatContents');
						storage.remove('isTyping');
						storage.clear();
						localStorage.clear();
						self.contents = [];
					}

					console.log("Webscoket closed." + self.socketStatus);
				};
				dataStream.socket.onerror = function(evnt) {
					self.isConnected = false;
					self.socketStatus = false;
					console.log("Webscoket Error.");
				};

				self.mywebsocket = dataStream;
			}

			this.closeWebSocket = function() {

				if(self.mywebsocket != null) {
					self.mywebsocket.close();
				}
			}

			this.onmessage = function(evnt) {
					var data = JSON.parse(evnt);
					if(data.mstype &&  data.mstype == 'system_off') {   
						layerAlert.autoclose(data.text, '', 3000); 
						deleteCookie('username');
						localStorage.clear();
						self.mywebsocket.close(); 
						self.socketStatus  =  false;       
						self.human_log_out  =  true; 
						storage.clear(); 
						setTimeout(function() {  
							$state.go("login"); 
						},  1600);  
					}

					//self.isMinStatus();
					self.ishiddenfun();
					var toticemessage = data;
					console.log('document[state]', openFlag);
					if(openFlag == true && toticemessage.Text) {
						self.noticeFun('You have a new message', toticemessage.Text);
					}
					//
					console.log(">>", data)
					if(data.hasOwnProperty("isTyping")) {
						storage.setObject('isTyping', data.isTyping);
					} else {
						self.contents.push(data);
						storage.set('token', 'chat_contents');
						//$http.defaults.headers.common["Authorization"] = 'chat_contents';
						storage.setObject('chatContents', self.contents);

					}

				},

				this.get = function(data) {
					if(!data.hasOwnProperty("isTyping")) {
						var chatContents = storage.getObject('chatContents');
						if(angular.isArray(chatContents)) {
							self.contents = chatContents;
						}
						if(data.autosend == CHATBOT_CONSTANTS.autosend) {
							self.contents.push(data);
							storage.setObject('chatContents', self.contents);
						}

					}

					self.mywebsocket.socket.send(JSON.stringify(data));
				},
				this.noticeFun = function(title, msg) {
					var Notification = window.Notification || window.mozNotification || window.webkitNotification;
					if(Notification) {
						Notification.requestPermission(function(status) {
							if(status != "granted") {
								return;
							} else {
								var tag = "sds" + Math.random();
								Notification.body = msg;
								//notifyObj属于Notification构造方法的实例对象  
								var notifyObj = new Notification(
									title, {
										dir: 'auto',
										lang: 'zh-CN',
										tag: tag, //实例化的notification的id  
										icon: 'images/noticeperson.png', //icon的值显示通知图片的URL  
										body: msg
									}
								);
								notifyObj.onclick = function() {
										//如果通知消息被点击,通知窗口将被激活  
										window.focus();

									},
									notifyObj.onerror = function() {
										console.log("HTML5 message error！！！");
									};
								notifyObj.onshow = function() {
									setTimeout(function() {
										notifyObj.close();
									}, 2000)
								};
								notifyObj.onclose = function() {

								};
							}
						});
					} else {
						console.log("您的浏览器不支持桌面消息!");
					}
				},
				this.isMinStatus = function() {

					if(window.outerWidth != undefined) {
						isMin = window.outerWidth <= 600 && window.outerHeight <= 700;
					} else {
						isMin = window.screenTop < -30000 && window.screenLeft < -30000;
					}
					return isMin;
				},
				this.ishiddenfun = function() {
					// 各种浏览器兼容

					var hidden, state, visibilityChange;
					if(typeof document.hidden !== "undefined") {
						hidden = "hidden";
						visibilityChange = "visibilitychange";
						state = "visibilityState";
					} else if(typeof document.mozHidden !== "undefined") {
						hidden = "mozHidden";
						visibilityChange = "mozvisibilitychange";
						state = "mozVisibilityState";
					} else if(typeof document.msHidden !== "undefined") {
						hidden = "msHidden";
						visibilityChange = "msvisibilitychange";
						state = "msVisibilityState";
					} else if(typeof document.webkitHidden !== "undefined") {
						hidden = "webkitHidden";
						visibilityChange = "webkitvisibilitychange";
						state = "webkitVisibilityState";
					}

					// 添加监听器，在title里显示状态变化
					document.addEventListener(visibilityChange, function() {
						if(document[state] == 'hidden') {
							openFlag = true;
						} else {
							openFlag = false;
						};

					}, false);
					return openFlag;
				}
		}
		//

		jQuery.fn.formToDict = function() {
			var fields = this.serializeArray();
			var json = {}
			for(var i = 0; i < fields.length; i++) {
				json[fields[i].name] = fields[i].value;
			}
			if(json.next) delete json.next;
			return json;
		};

		var onmessage = function(evnt) {
			var data = JSON.parse(evnt);
			console.log(">>", data)
			if(data.hasOwnProperty("isTyping")) {
				storage.setObject('isTyping', data.isTyping);
			} else {
				contents.push(data);
				storage.set('token', 'chat_contents');
				//$http.defaults.headers.common["Authorization"] = 'chat_contents';
				storage.setObject('chatContents', contents);

			}
		}

		return new mywebscoket();
	});