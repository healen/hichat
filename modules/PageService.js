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
exports.renderJade=function(dir,req,res,io){
	res.render(dir,{
		title:"嗨信网页版"
	})

}