/**
 * title hichat聊天室 静态文件处理模块
 * author ZhangXiaodong
 * 2016-2-23
 */


var fs     = require("fs"),//内部模块 处理文件操作
	path   =require("path"),//内部模块 处理路径操作
	mime   =require("./mime").types;//自定义模块请求处理文档类型操作
	
/**
 * 404 NOT FOUNT 函数
 * @param  {[type]} res [请求对象]
 */
function send404(res){
	res.writeHead(404,{"Content-Type":"text/plain"});
	res.end("404 not found");
}

/**
 * 静态文件请求函数
 * @param  {[type]} realpath [绝对路径]
 * @param  {[type]} res      [服务器请求对象]
 */
function staticServer(realpath,res){
	fs.readFile(realpath,function(err,data){
		if(!err){
			var extname=path.extname(realpath);
			res.writeHead(200,{"Content-Type":mime[extname]});
			res.end(data);
		}else{
			send404(res);
		}
	});
}
/**
 * 静态服务器主入口模块
 * @param  {[type]} pathname [请求路径名称]
 * @param  {[type]} res      [请求对象]
 * @param  {[type]} base_dir [根目录]
 */
exports.staticRender=function(pathname,res,base_dir){
	var reg = /^\/static|upload/;//目录匹配
	if(reg.test(pathname)){
		fs.exists(path.join(base_dir,pathname),function(exists){
			if(exists){
				staticServer(path.join(base_dir,pathname),res)
			}else{
				send404(res);
			}
		})
	}else{
		send404(res);
	}
}