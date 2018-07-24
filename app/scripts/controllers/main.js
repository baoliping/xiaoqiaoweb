'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dipaApp
 */
angular.module('chatApp')
	.controller('ModalCtrl', function($scope, $modalInstance, $rootScope) {

		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
		$rootScope.$on('CallChildMethod', function() {
			$scope.ok();
		});

	});
angular.module('chatApp')
	.controller('MainCtrl', function($scope,CHATBOT_CONSTANTS, $compile, $sce, layerAlert, $state, ngDialog, internetService, myWebsocket, $interval, storage, $modal, $rootScope) {
		myWebsocket.open(localStorage.getItem("eid"));
		if(getCookie('username')==null){
			setTimeout(function(){
				deleteCookie('username')
				localStorage.clear();
				myWebsocket.closeWebSocket();
				myWebsocket.socketStatus = false;
				myWebsocket.human_log_out = true;
				storage.clear();
				$state.go("login");
			},1600);
			
		}
		$scope.isShow = false;
		$scope.userInfo = {};
		$scope.download_url=CHATBOT_CONSTANTS.DOWNLOAD_URL;
		$scope.navlistData=[];
		$scope.navlistData_cache = {}
		$("html").on("click", function(e) {
			if(!(/setting-btn/.test(e.target.className))) {
				$scope.isShow = false;
			}
			if(!(/imgicon/.test(e.target.className))) {
				 $scope.objimg={
	       		"display":"none"
	       		}
			}
	});
	
	$scope.nowTime = new Date();
        var timer = $interval(function () {
                $scope.nowTime = new Date();
        }, 1000);
     $scope.bgImgFun=function(img_url,$event){
        
        $scope.imgurl=img_url
       $scope.objimg={
       	"display":"block"
       }
     }
     $scope.colsespan=function(){
       $scope.objimg={
       	"display":"none"
       }
     }
    

		//视屏播放
		$scope.count = 0;
		$scope.videoButton = false;
		$scope.videoPage = false;
		$scope.showVideoBtn = function(cont, text) {
			$scope.showBtn = false;
			var modalInstance = $modal.open({
			  animation: true,
			  ariaLabelledBy: 'modal-title',
			  ariaDescribedBy: 'modal-body',
			  templateUrl: 'views/vidio.html',
			  controller: 'vidoCtrl',
			  scope: $scope,
			  size:'800px',
			  resolve: {
			    items: function () {
			       return cont;
			    }
			  }
			});

		}

		var mainContrlScope = $scope;
		$scope.hideVideo = function(cont) {
			ngDialog.closeAll();
			mainContrlScope.count = mainContrlScope.count + 1;
			cont.showpage = false;
			$scope.videoButton = !$scope.videoButton;
		}

		if(localStorage.getItem("eid") == '' || localStorage.length == 0) {
			$state.go("login");
			myWebsocket.closeWebSocket();
			myWebsocket.socketStatus = false;
            myWebsocket.human_log_out = true;
			storage.clear();
		}
		$scope.useropenFun = function() {
			ngDialog.openConfirm({
				template: 'userinfo_one',
				scope: $scope,
				controller: ["$scope", function($scope) {

					$scope.closeDialog = function() {
						ngDialog.closeAll();

					}
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 500,
				height: 200
			});
		}
		$scope.menuFun = function() {
			$scope.isShow = true;
		};
		//修改密码弹框
		$scope.modifyFun = function() {
			var modalInstance = $modal.open({
			  animation: true,
			  ariaLabelledBy: 'modal-title',
			  ariaDescribedBy: 'modal-body',
			  templateUrl: 'views/modifyPassword.html',
			  controller: 'modifyPasswordCtrl',
			  scope: $scope
			  });
			
		};

		//退出
		$scope.logoutFun = function() {
			internetService.logoutMessage().then(function(response) {
					var data = response.data;
					if(data.status == 200) {
						layerAlert.autoclose("Exit the success!",1000);
						deleteCookie('username')
						localStorage.clear();
						myWebsocket.closeWebSocket();
						myWebsocket.socketStatus = false;
       					myWebsocket.human_log_out = true;
						storage.clear();
						setTimeout(function() {
							$state.go("login");
						}, 1600);
					}
		})
		};
		$scope.usermessageFun = function() {
			internetService.myselfMessage().then(function(response) {
				var data = response.data;
				if(data.status == 200) {
					$scope.userInfo = data.result;
				} else {
					    layerAlert.autoclose(data.info,'',2000);
					    deleteCookie('username');
						localStorage.clear();
						myWebsocket.closeWebSocket();
						myWebsocket.socketStatus = false;
       					myWebsocket.human_log_out = true;
						storage.clear();
						setTimeout(function() {
							$state.go("login");
						}, 2000);
				}
			})
		};
		$scope.usermessageFun();
		$scope.chat = {
			content: [],
			sendContent: $scope.inputdata,
			uuid: null,
			eid: localStorage.getItem("eid"),
			country: null,
			visibalEID: false,
			messagesFocus: false,
			isTyping: false
		}
		$scope.chat.content = storage.getObject('chatContents');
		if(angular.isArray($scope.chat.content) && angular.isArray($scope.chat.content).length>0){
			$scope.chat.content.forEach(function(item,index){
	          	if(item.Text){
	          		var span_str='';
	          		item.newText='';
	          		if(item.mstype=='text' || !item.mstype){
	          			if(item.keyword){
		          		item.keyword.forEach(function(_item,_index){
		          			if(_index==0){
	          						item.Text=item.Text.replace(_item,"<br/><span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span>');
	          					}else if(index==((item.keyword).length-1) && ((item.keyword).length-1)==0 ){
	          						item.Text=item.Text.replace(_item,"<br/><span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span><br/>');
	          					
	          					}else if(_index==((item.keyword).length-1)){
	          						item.Text=item.Text.replace(_item,"<span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span><br/>');
	          					}else{
	          						item.Text=item.Text.replace(_item,"<span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span>');
	          					
	          					}
		          			item.newText=item.Text;
		          		})
		          		}else{
		          			item.newText=item.Text;
		          		}
	          		}
	          		
	          	}
			          	
			})
		}
		 
		//弹出窗口
		$scope.openModel = function(size) {
			$scope.scenedata = [];
			var modalInstance = $modal.open({
				templateUrl: 'modelu.html',
				controller: 'ModalCtrl',
				size: size,
				backdrop: 'static',
				windowClass: 'fanzhuan',
				scope: $scope
			});
			$scope.chat.eid = '';
		};
		//$scope.openModel();
		$scope.countrys = function(msgs) {
			$scope.navlistData=[];
			internetService.navList().then(function(respons) {
				  var maxLength = 0;
					angular.forEach(respons.data.GU, function(item) {
						if(item.list.length > maxLength){
						 	 maxLength = item.list.length;
						}
						$scope.navlistData_cache[item.name] = item.list;
						if(item.name == msgs) {
							$scope.navlistData = item.list;
							console.log($scope.navlistData);
						}
					})

					for (var key in $scope.navlistData_cache){
						 var min = maxLength - $scope.navlistData_cache[key].length;
						 for (var i=0; i<min; i++){
							 $scope.navlistData_cache[key].push({})
						 }
					}

				})

		}
		$scope.addEid = function(msg) {
			if($scope.chat.eid) {
				$('#eid').val($scope.chat.eid);
				$scope.countrys(msg);
				/*$scope.eidNewMessage();*/
				$rootScope.$emit('CallChildMethod', {});
			} else {
				$scope.chat.visibalEID = true;
			}
		}
       $scope.addEid('CN');
		//生成唯一id
		/*$scope.key = 'uuid';
		$scope.uuid = function() {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for(var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			$scope.chat.uuid = uuid;
			
		}*/

		

		//展开折叠
		$scope.downList = function(event, data) {
			var event = $(event.currentTarget).parent();
			$scope.transmitData(data.name);
			$('#serializeInfo').focus();
			if(event.hasClass('opend')) {
				event.removeClass('opend');
				angular.forEach($('.erji'), function(item) {
					$(item).removeClass('nav-open1');
				});
				angular.forEach($('.sanji'), function(item) {
					$(item).removeClass('nav-open2');
				});
				angular.forEach($('.siji'), function(item) {
					$(item).removeClass('nav-open3');
				});
			} else {
				event.addClass('opend').siblings().removeClass('opend');
			}
		}
		//展开2级菜单
		$scope.childDownlist1 = function(event, data) {
			var event = $(event.currentTarget).parent();
			if(event.hasClass('nav-open1')) {
				event.removeClass('nav-open1');
			} else {
				event.addClass('nav-open1').siblings().removeClass('nav-open1');
			}
			$scope.transmitData(data.name);
			$('#serializeInfo').focus();
			//if (!data.list) {
			//  $scope.transmitData(data.name);
			//}
		}
		$scope.childDownlist2 = function(event, data) {
			var event = $(event.currentTarget).parent();
			if(event.hasClass('nav-open2')) {
				event.removeClass('nav-open2');
			} else {
				event.addClass('nav-open2').siblings().removeClass('nav-open2');
			}
			$scope.transmitData(data.name);
			$('#serializeInfo').focus();
			//if (!data.list) {
			//  $scope.transmitData(data.name);
			//}
		}
		$scope.childDownlist3 = function(event, data) {
			var event = $(event.currentTarget).parent();
			if(event.hasClass('nav-open3')) {
				event.removeClass('nav-open3');
			} else {
				event.addClass('nav-open3').siblings().removeClass('nav-open3');
			}
			$scope.transmitData(data.name);
			$('#serializeInfo').focus();
			//if (!data.list) {
			//  $scope.transmitData(data.name);
			//}
		}
		$scope.chat.sendContent='';
		//获取input数据
		$scope.transmitData = function(data) {
			$scope.chat.sendContent = data;
		}
		//图片放大
		$scope.imgurl='';
		
		//上传文件
		var mark_readMesageFun=function(){
			var messagearr=[];
			angular.forEach($scope.chat.content, function(item, index) {
				if(item.id){
					messagearr.push(item.id);
				}

			})
			var data={
				"msg_ids": messagearr
				} ;
				console.log("data",data);
			internetService.mark_readMessage(data).then(function(respones) {
					
			})
		};
		$scope.rightFun=function(cont){
			cont.rightFlag=true;
		}
		$scope.file = {};
		$scope.fileType = '';
		$scope.file_url = '';
		$scope.filedata = '';
		$scope.vodio_url = '';
		$scope.ConversationName = '';
		$scope.showfile=true;
		$scope.sendname='';
		$scope.fileChanged = function(ele) {

			angular.forEach($scope.chat.content, function(item, index) {
				if(item.Name == 'HR') {
					$scope.ConversationName = item.ConversationName;
					$scope.EID2HR = 'EID2HR';
					
				}

			})

			$scope.file.fileInfo = ele.files[0].name;
			$scope.$apply();

			var f = new FormData();
			var _file = document.querySelector('#filebtn').files[0];
			
			f.append('file', _file);
			f.append('conversation', $scope.ConversationName);
			f.append('type', 'EID2HR');
			if($scope.file.fileInfo != '') {
				internetService.uploadFileMessage(f).then(function(respones) {
					var data = respones.data;
					if(data.status == true) {
						$scope.fileType = data.type;
						if($scope.fileType == 'image') {
							$scope.file_url = data.img_url;
						}
						if($scope.fileType == 'file') {
							$scope.filedata = data.data;
							
						}
						if($scope.fileType == 'vodio') {
							$scope.vodio_url = data.vodio_url;
						}
						$scope.sendname=data.name;
						$('#filebtn').val('');
						$scope.sendMsg();
					} else {
						layerAlert.autoclose(data.status,'infomation',3000);
					}

				})
			}

		}

		//chat
		$scope.sendkey = function(target) {
			var match = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
			var keyword = target.getAttribute('data');
			if(match.test(keyword)){
				window.open(keyword);
			}else{
				var data = {
				'eid': $scope.chat.eid,
				'text': keyword,
				'type': 1,
				'autosend':2,
				'uuid': localStorage.getItem("uuid")
			};
			 myWebsocket.get(data);
			}
			
		}
		
		//发送
		$scope.sendMsg = function() {
			$scope.navlistData=[];
			var data = {
				'eid': $scope.chat.eid,
				'text': $scope.chat.sendContent,
				'type': 1,
				'autosend':2,
				'uuid': localStorage.getItem("uuid")
			}
			
			if($scope.fileType == 'image') {
				data.type = $scope.fileType;
				data.text = $scope.file_url;
				data.fileName=$scope.sendname;
			}
			if($scope.fileType == 'file') {
				data.type = $scope.fileType;
				data.text = $scope.filedata;
				data.fileName=$scope.sendname;
				
				
			}
			if($scope.fileType == 'vodio') {
				data.type = $scope.fileType;
				data.text = $scope.vodio_url;
				data.fileName=$scope.sendname;
			}
			myWebsocket.get(data);
			$scope.file = {};
			$scope.fileType = '';
			$scope.file_url = '';
			$scope.filedata = '';
			$scope.vodio_url = '';
			$scope.sendname='';
			//判断中英文
			var cnFlag = /^[\u4e00-\u9fa5]+$/;
			if (!cnFlag.test(data.text)) {
					$scope.navlistData = $scope.navlistData_cache["EN"]
				}else{
					$scope.navlistData = $scope.navlistData_cache["CN"]
			}

		}
		$scope.sendMessage = function(event) {
			if($scope.chat.sendContent || $scope.fileType != '') {
				$scope.sendMsg();
				$scope.chat.sendContent = "";
				$('#serializeInfo').focus();
			}
		}
		$scope.keyupMessage = function(event) {
			if(event.keyCode == 13 && $scope.chat.sendContent) {
				$scope.sendMsg();
				/*mark_readMesageFun();*/
				$scope.chat.sendContent = "";
				$('#serializeInfo').focus();
				return false;
			}
		}
		
		$scope.setinter = function() {
			var promise = $interval(function() {
				if(angular.isArray(storage.getObject("chatContents")) &&storage.getObject("chatContents").length  > 0) {
					//$scope.chat.content = myWebsocket.contents;
					$scope.chat.content = storage.getObject("chatContents");
					angular.forEach($scope.chat.content, function(item, index) {
					if(item.Name == 'HR') {
								$scope.ConversationName = item.ConversationName;
								$scope.showfile=false;
							}
					
					})
					
					if($scope.ConversationName==''){
						$scope.showfile=true;
					}
					$scope.chat.content.forEach(function(item,index){
			          	if(item.Text){
			          		var span_str='';
			          		item.newText='';
			          		if(item.mstype=='text' || !item.mstype){
			          			if(item.keyword){
				          		item.keyword.forEach(function(_item,_index){
				          			/*_item=_item.replace(/\)/,"");
				          			_item=_item.replace(/\(/,"");
				          			var regExp = new RegExp(_item, 'g');
				          			item.Text=item.Text.replace(regExp,"<span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span>');
				          			*/
		          					if(_index==0){
		          						item.Text=item.Text.replace(_item,"<br/><span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span>');
		          					}else if(index==((item.keyword).length-1) && ((item.keyword).length-1)==0 ){
		          						item.Text=item.Text.replace(_item,"<br/><span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span><br/>');
		          					
		          					}else if(_index==((item.keyword).length-1)){
		          						item.Text=item.Text.replace(_item,"<span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span><br/>');
		          					}else{
		          						item.Text=item.Text.replace(_item,"<span class='newhighlight fr' data='"+_item+"' ng-click='sendkey($event.target)'>" + _item + '</span>');
		          					
		          					}
		          					item.newText=item.Text;
				          		})
				          		}else{
				          		item.newText=item.Text;
				          		}
			          		}
			          		
			          	}
			          	
					})
					
					//keyword
					var isTyping = storage.getObject('isTyping');
					$scope.chat.messagesFocus = isTyping;

					if(document.getElementById('serializeInfo').id == document.activeElement.id) {
						if($scope.chat.isTyping == false) {
							$scope.chat.isTyping = true;
							var data = {
								'eid': $scope.chat.eid,
								'type': 1,
								'autosend':2,
								'uuid': localStorage.getItem("uuid"),
								'isTyping': true
							}

							myWebsocket.get(data);
						}
					} else {
						if($scope.chat.isTyping == true) {
							$scope.chat.isTyping = false;
							var data = {
								'eid': $scope.chat.eid,
								'type': 1,
								'autosend':2,
								'uuid': localStorage.getItem("uuid"),
								'isTyping': false
							}
							myWebsocket.get(data);
						}
					}
				}
				//$scope.eidNewMessage();
			}, 1000);
			return promise;
		}
		//
		$scope.timemessage=function(){
			var promisenew = $interval(function() {
				$scope.eidNewMessage();
			},300000)
			return promisenew;
		}
		var promisenew = $scope.timemessage();
		//
		var promise = $scope.setinter();
		$scope.$on("$destroy", function() {
			$interval.cancel(promise);
			$interval.cancel(promisenew);
		});
		
		$scope.$watch('chat.content + chat.sendContent', function() {
			setTimeout(function() {
				if($scope.chat.content && $('#divbot')[0]) {
					$('#divbot').scrollTop($('#divbot')[0].scrollHeight);
				}
			}, 0);
		});

		$scope.websocketIsOpend = null;
		$scope.time = function() {
			var time2 = setTimeout(function() {
				$scope.websocketIsOpend = "If there is no more question, your session is about closed in 3 mins.";
			}, 720000);
			var time2 = setTimeout(function() {
				$scope.websocketIsOpend = "Your session is closed, click here to open session again.";
			}, 900000);
		}
		$scope.time();

		//点赞
		$scope.ThumbUp = function(id) {
			var data = {
				'msg_id': id,
				'thumb_up_mark': "1"
			}
			internetService.ThumbUp(data).then(function(response) {
				if(response.status == 200) {
					// var d = {
					//   'text': "",
					//   'type': 1,
					//   'thumb_up_mark': "1"
					// }
					// $scope.chat.content.push(d);
					// storage.setObject('chatContents', $scope.chat.content);
					// $scope.chat.content = storage.getObject('chatContents');
				}
			})
		}
		$scope.ThumbDown = function(id) {
			var data = {
				msg_id: id,
				thumb_up_mark: "2"
			}
			internetService.ThumbUp(data).then(function(response) {
				if(response.status == 200) {
					//$scope.chat.handdownVsible = true;
					var d = {
						'text': "",
						'type': 1,
						'thumb_up_mark': "2"
					}
					$scope.chat.content.push(d);
				}
			})
		}

		//打开留言
		$scope.replay = {
			replayMessage: false,
			subject: null,
			content: null,
			newMsg: null
		}
		$scope.paginationNewinfo = {
			currentPage: 1,
			itemsPerPage: 5,
			perPageOptions: [5, 20, 30, 40, 50],
			totalItems: 0
		};
		var morepage_count
		$scope.openNewinfoModel = function() {
			$scope.pagecount=1;
			var modalInstance = $modal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/newinfo.html',
				controller: 'NewinfoCtrl',
				scope: $scope,
				size: 'lg',
				resolve: {
					items: function() {

					}
				}
			});
			$scope.$watch('paginationNewinfo.currentPage + paginationNewinfo.itemsPerPage', $scope.messagePage);
		}
         
		//查詢
		$scope.messagePage = function() {
			var data = {
				'eid': $scope.chat.eid,
				'curPage': $scope.paginationNewinfo.currentPage,
				'pageSize': $scope.paginationNewinfo.itemsPerPage
			}
			internetService.messagePage(data).then(function(response) {
				var data_response=response.data;
				
				$scope.messageBoards = response.data.messageBoards;
			    $scope.paginationNewinfo.totalItems = response.data.count;
				if($scope.messageBoards && $scope.messageBoards.length>0){
					$scope.messageBoards.forEach(function(item,index){
					item.childrenList=((item.childrenAndReply)[0].children).list;
					item.muti_reply_messageList=((item.childrenAndReply)[0].muti_reply_message_board).list;
					item.childrenCount=((item.childrenAndReply)[0].children).count;
					item.totalPage=item.childrenCount/10;
				 })
				}
				
				if(data_response.status==501){
					$scope.$emit('ok', {});
					$(".modal-backdrop").hide();
					deleteCookie('username');
					localStorage.clear();
					myWebsocket.closeWebSocket();
					myWebsocket.socketStatus = false;
					myWebsocket.human_log_out = true;
					storage.clear();
					$state.go("login");
					
				}
				
				

			})
		}
		//添加
		$scope.saveMessageInfo = function() {
			var data = {
				'eid': $scope.chat.eid,
				'subject': $scope.replay.subject,
				'text': $scope.replay.content
			}
			internetService.saveMessage(data).then(function(response) {
				var data=response.data;
				if(data.result == true) {
					$scope.messageBoards = response.data.messageBoards;
					$scope.replay.subject='';
					$scope.replay.content='';
					$scope.messagePage();
				}else{
					layerAlert.autoclose(data.info,300);
				}
			})
		};
		$scope.showMessage = function(msg) {
			console.log("pk", msg.id);
			$scope.messageDetailFun(msg);
		};
		$scope.mesageList = '';
		//留言详情
		
		$scope.pagecount=1;
		$scope.messageDetailFun = function(msg) {
			
			   $scope.pagecount++;
			  var toatl= msg.childrenCount
			if($scope.pagecount<=toatl){
				
				var data = {
				"pk": msg.id,
				'curPage':$scope.pagecount,
				'pageSize': 10
			}
			internetService.messageDetail(data).then(function(response) {
				var data = response.data;
				var messageBoards = data.messageBoards;
				if(messageBoards[0].muti_reply_message_board != {}) {
					 var arr= messageBoards[0].children.list;
					if(arr.length>0){
						arr.forEach(function(item,index){
							(msg.childrenList).push(item);
						})
					}
                }
			});
			}else{
				layerAlert.autoclose('暂无数据','infomation',3000);
			}
			

		};
		//发表留言
		$scope.sendFun = function(parent_id) {
			$scope.conmentObj = {};
			ngDialog.openConfirm({
				template: 'comment_one',
				scope: $scope,
				controller: ["$scope", function($scope) {
					$scope.formSubmit = function() {
						var data = {
							'eid': $scope.chat.eid,
							'subject': $scope.conmentObj.subject,
							'text': $scope.conmentObj.content,
							"parent": parent_id
						}
						internetService.saveMessage(data).then(function(response) {
							var data = response.data;
							if(data.result == true) {
								layerAlert.autoclose("save success!",'infomation',1000);
								ngDialog.closeAll();
								$scope.messageBoards = response.data.messageBoards;
								$scope.messagePage();
							}else if(data.status==501){
								deleteCookie('username');
								localStorage.clear();
								myWebsocket.closeWebSocket();
								myWebsocket.socketStatus = false;
       							myWebsocket.human_log_out = true;
								storage.clear();
								setTimeout(function() {
									$state.go("login");
								}, 1600);
							}else{
								layerAlert.autoclose(data.info,'',2000);
							}
						})
					};
					$scope.closeDialog = function() {
						ngDialog.closeAll();

					}
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600,
				height: 300
			});
		}
		//未处理消息
		$scope.eidNewMessage = function() {
			var data = {
				eid: $scope.chat.eid
			}
			localStorage.removeItem('newMsg');
			internetService.eidNewMessage(data).then(function(response) {
				$scope.replay.newMsg = response.data.count;
				localStorage.setItem('newMsg',$scope.replay.newMsg);
				
			})
		}
		$scope.newMsg=localStorage.getItem('newMsg');
		
	})
	.controller('imgCtrl', function ($scope, $modalInstance, $rootScope, items) {
	 $scope.img_url_news=items;
		
	  $scope.ok = function () {
	    $modalInstance.close();
	  };
	  
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };

  
  })
	.controller('NewinfoCtrl', function($scope, $modalInstance) {
		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	})
	.controller('vidoCtrl', function ($scope, $modalInstance, $rootScope, items) {
		var cont=items;
		$scope.ok = function () {
   			 $modalInstance.close();
  		};
	    $scope.showBtn = false;
	    setTimeout(function(){
	    	cont.showpage=true;
		   	$scope.videoButton=true;
		   	$scope.videoPage=true;
		   	$scope.showBtn=true;
		   	var videoPath ;
		   	if(cont.Name=='HR'){
		   		videoPath= cont.Text;
		   	}else{
		   		videoPath = cont.text;
		   	}
			
			var flashvars={
		      		 f:videoPath,
		      		 c:0,
		      		 p:1,
		      		 loaded:'loadedHandler'
		   		 };
		   	var video=[''+videoPath+'->video/'];
		   		CKobject.embed('ckplayer/ckplayer.swf','a1','ckplayer_a1','598','425',true,flashvars,video);
	
	    },1000);
  		$scope.cancel = function () {
   		 $modalInstance.dismiss('cancel');
  		}; 
})
.controller('modifyPasswordCtrl', function ($modalInstance,$scope, $compile, $sce, layerAlert, $state, ngDialog, internetService, myWebsocket, $interval, storage, $modal, $rootScope) {
		
		//修改密码
		$scope.newsAdd = {
			newpassword: "",
			password: ""
		};
		$scope.formSubmit = function() {
		
		if($scope.newsAdd.newpassword=='' || $scope.newsAdd.password==''){
			layerAlert.autoclose("The submission form cannot be empty!",'infomation',3000);
			return;
		}
		if($scope.newsAdd.newpassword != $scope.newsAdd.password) {
			layerAlert.autoclose("Input password inconsistent! Please re-enter",'infomation',3000);
			return;
		}
		if($scope.newsAdd.password != '') {
		var phoneFlag = passwordCheck($scope.newsAdd.password);
		if(!phoneFlag) {
			layerAlert.autoclose('password must conform to a password that contains Numbers, case letters, special characters, and longer than 8 bits','infomation',10000);
				return;
			}
		}
		var data = {
			"password": $scope.newsAdd.password
		}
		
		internetService.modify_passwordMessage(data).then(function(response) {
			var data = response.data;
			if(data.status == 200) {
				layerAlert.autoclose("Password modified successfully!",'infomation',100);
		            $modalInstance.close();
					$state.go("login");
					localStorage.clear();
					myWebsocket.closeWebSocket();
					myWebsocket.socketStatus = false;
					myWebsocket.human_log_out = true;
					storage.clear();
				}else if(data.status==501){
					deleteCookie('username');
					localStorage.clear();
					myWebsocket.closeWebSocket();
					myWebsocket.socketStatus = false;
					myWebsocket.human_log_out = true;
					storage.clear();
					setTimeout(function() {
						$state.go("login");
					}, 1600);
				}else{
					layerAlert.autoclose(data.info,'',2000);
				}
			})
		}
		$scope.ok = function () {
	    	$modalInstance.close();
	  	};
  		$scope.cancel = function () {
   		   $modalInstance.close();
  		}; 
  		
});
