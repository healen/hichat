/**
 * title hichat聊天室 处理socket聊天逻辑组件
 * author ZhangXiaodong
 * 2016-2-23
 */


/**
 * 通过渲染jade文件 运行聊天
 * @param  {[type]} dir [模板路径]
 * @param  {[type]} req [响应对象]
 * @param  {[type]} res [请求对象]
 * @param  {[type]} io  [socket.io对象]
 */
exports.renderJade=function(io,users){

	io.on("connection",function(socket){
		// console.log("socket connection success!");
		socket.on("login",function(nickname){
			console.log(users.indexOf(nickname));
			if(users.indexOf(nickname)>-1){
				socket.emit("nickExisted");
			}else{
				socket.userIndex = users.length;
	            socket.nickname = nickname;
	            users.push(nickname);
	            socket.emit('loginSuccess');
	            // console.log(users);
	            io.sockets.emit('system',nickname,users,users.length,'login');
			}
		})

		socket.on("disconnect",function(){
			users.splice(socket.userIndex,1);
			// console.log(users);
			socket.broadcast.emit('system',socket.nickname,users,users.length,"logout");
		})
	})

}