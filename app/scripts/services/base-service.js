angular.module('chatApp')
.service('layerAlert', function(){
	var area = ['360px', 'auto'], //设置弹出框大小
		btn = ['sure', 'cancel'], //设置弹出框按钮组
		shift = 5,
		shadeClose = false; //点击遮罩关闭层

	this.error = function(text, title) {
		var def_title = '出错啦！';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: area,
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 2,
			shift: shift
		});
	};

	this.iframe = function(title, url) {
		var def_title = '弹出窗口';
		title = title ? title : def_title;
		layer.open({
			type: 2,
			title: title,
			maxmin: true,
			shadeClose: false, //点击遮罩关闭层
			area: ['100%', '100%'],
			content: url
		});
	};

	this.autoclose = function(text, title, time) {
		var def_title = 'tips！';
		title = title ? title : def_title;
		time = time ? time : 1000;
		if(arguments.length === 1) {
			layer.alert(text);
		} else if(arguments.length === 2) {
			time = title ? title : 1000;
			layer.alert(text, time);
		} else {
			layer.open({
				title: title,
				shadeClose: shadeClose,
				area: area,
				btn: btn,
				btnAlign: 'c',
				content: text,
				icon: 0,
				shift: shift
			});
		}
		setTimeout(function(index, layero) {
			layer.closeAll();
		}, time);
	};
	this.success = function(text, title) {
		var def_title = 'success！';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: ['360px', 'auto'],
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 1,
			shift: shift
		});
	};
	this.info = function(text, title) {
		var def_title = 'infomation！';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: area,
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 0,
			shift: shift
		});
	};

	this.confirm = function(text, todo, title) {
		var def_title = 'infomation：';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: area,
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 0,
			shift: shift,
			yes: function(index, layero) {
				if(todo) todo();
				layer.close(index);
			}
		});
	};

	this.checkone = function() {
		/*==========================================*/
		/*arguments=[title,function1,function2,btn1Text,btn2Text,btn1ClickedClose,btn1ClickedClose,text];
		* title:窗口显示标题
		* function1：回调函数1
		* function2：回调函数2
		* btn1Text:按钮1文本
		* btn2Text:按钮2文本
		* btn1ClickedClose:回调函数1执行完成是否关闭窗口
		* btn2ClickedClose:回调函数2执行完成是否关闭窗口
		* text:窗口显示内容
		/*==========================================*/
		var def_title = 'infomation:';
		var def_text = 'Select the action to perform';
		var title = arguments[0] ? arguments[0] : def_title;
		var _btn = arguments[3] && arguments[4] ? [arguments[3], arguments[4]] : btn;
		var text = arguments[7] ? arguments[7] : def_text;
		if(typeof arguments[0] == "function" && typeof arguments[1] == "function") {
			var btn1ClickedClose = arguments[4],
				btn2ClickedClose = arguments[5];
			title = def_title;
			_btn = arguments[2] && arguments[3] ? [arguments[2], arguments[3]] : btn;
			var fun1 = arguments[0],
				fun2 = arguments[1];
			layer.open({
				title: title,
				shadeClose: shadeClose,
				area: area,
				btn: _btn,
				btnAlign: 'c',
				content: text,
				icon: 0,
				shift: shift,
				btn1: function(index, layero) {
					fun1();
					if(btn1ClickedClose) layer.close(index);
				},
				btn2: function(index, layero) {
					fun2();
					if(!btn2ClickedClose) return false;
				}
			});
		} else {
			var fun1 = arguments[1],
				fun2 = arguments[2],
				btn1ClickedClose = arguments[5],
				btn2ClickedClose = arguments[6];
			layer.open({
				title: title,
				shadeClose: shadeClose,
				area: area,
				btn: _btn,
				btnAlign: 'c',
				content: text,
				icon: 0,
				shift: shift,
				btn1: function(index, layero) {
					if(fun1) fun1();
					if(btn1ClickedClose) layer.close(index);
				},
				btn2: function(index, layero) {
					if(fun2) fun2();
					if(!btn2ClickedClose) return false;
				}
			});
		}

	};
});
