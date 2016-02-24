/**
 * title hichat聊天室 ,前台业务JS
 * author ZhangXiaodong
 * 2016-2-23
 */
window.onload=function(){
	var hichat=new HiChat();
	hichat.init();
}
function HiChat(){
	this.socket=null;
}
HiChat.prototype={
	init:function(){
		var ELE_NICKNAME  =$("#username");
		var ELE_USERLOGIN =$("#userlogin");
		var ELE_LOGINBOX  =$("#loginbox");
		var ELE_CHATBOX   =$("#chatbox");
		var ELE_USERLIST  =$("#userlist");
		var ELE_NUM       =$("#num");
		var ELE_SHOWBOX=$("#showbox");
		var ELE_MYUSER=$("#myuser");
		var that          =this;
		var loading       =layer.load();
		this.socket=io.connect();
		this.socket.on("connect",function(){
			setTimeout(function(){
				layer.close(loading);
				$(".loginwarp").fadeIn();
			},1000)
		})
		this.socket.on("nickExisted",function(){
			layer.msg('坑爹呀！用户名已被占用，请更换其他用户名！');
			ELE_NICKNAME.addClass("error");
			ELE_CHATBOX.hide();
			ELE_NICKNAME.focus(function(){
				$(this).removeClass("error");
				layer.close(msgs)

			});
		});
		this.socket.on("loginSuccess",function(){
			// layer.close(layer.msg('用户名检测中'));
			var loadingchat = layer.load();
			ELE_LOGINBOX.fadeOut(function(){
				setTimeout(function(){
					layer.close(loadingchat);
					ELE_CHATBOX.fadeIn();
				},1000)
			})
		})
		this.socket.on("system",function(userName,userList,userCount,type){
			var html=""
			var status = (type=="login" ? "加入" : "退出")
			var system="<div class='system'><span class='msg'>系统消息：用户["+userName+"] <span class='mark'>"+status+"</span>聊天室</span></div>"
			for(var i=0;i<userList.length;i++){
				html+="<li> <img src='/static/images/empty_head.png'> <p>"+userList[i]+"</p></li>"
			}
			ELE_SHOWBOX.append(system);
			ELE_NUM.html(userCount)
			ELE_USERLIST.html(html)
		})

		ELE_USERLOGIN.on("click",function(){
			var nickName=ELE_NICKNAME.val();
			if(nickName.trim().length!=0){
				that.socket.emit("login",nickName);
				ELE_NICKNAME.removeClass("error");
				ELE_MYUSER.html(nickName)
			}else{
				ELE_NICKNAME.focus();
				ELE_NICKNAME.addClass("error")
				layer.msg('用户名不能为空！！');
			}
		})	
	}
}