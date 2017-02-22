/**
 * title hichat聊天室app
 * author ZhangXiaodong
 * 2016-2-23
 */
/**
 * 模块引入
 */
var http      	  =require("http"),//内部模块 处理http
	path          =require("path"),//内部模块 处理文件目录
	fs            =require("fs"),//内部模块  读取文件
	url           =require("url"),//内部模块 粗粒URL
	socket        =require("socket.io"),//第三方模块 处理服务器握手websocket协议 
	jade          =require("jade"),//第三方模块 渲染jade模板引擎
	PageService=require("./modules/PageService")
	StaticService =require("./modules/StaticService");//自定义模块


/**
 * 全局变量，俗称常量所以命名用大写hehe
 * 文件目录
 */
var BASE_DIR 	  =__dirname,//获取根目录
	STATICS_DIR   =path.join(BASE_DIR,"static"),//静态资源目录
	UPLOADS_DIR   =path.join(BASE_DIR,"upload"),//文件上传目录
	TEMPLATES_DIR =path.join(BASE_DIR,"templates");//模板放置目录

var users=[];


/**
 * 创建HTTP服务器必要函数
 * @param  {[type]} req  服务器请求参数
 * @param  {[type]} res 服务器相应参数
 */

var server=http.createServer(function(req,res){
	var pathname=url.parse(req.url).pathname;
	/**
	 * 通过jade模块渲染jade文件
	 * @param  {[type]} template jade模板引擎文件
	 * @param  {[type]} opation  接收的参数
	 */
	res.render=function(template,opation){
		var str = fs.readFileSync(template,"utf-8");
		var fn=jade.compile(str,{pretty:true,filename:template});
		var page = fn(opation);
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(page);
	}
	/**
	 * [if description] 去除nodejs自带的favicon.ico
	 */
	if(req.url === "/favicon.ico"){
		return;
	}
	/**
	 * [switch description] 处理路由方法
	 */
	switch(pathname){
		case "/index" : 
			// renderJade(path.join(TEMPLATES_DIR,"index.jade"),req,res);//渲染index.jade
			res.render(path.join(TEMPLATES_DIR,"index.jade"),{title:"嗨信聊天"});//渲染index.jade
		break;
		case "/" : 
			res.render(path.join(TEMPLATES_DIR,"index.jade"),{title:"嗨信聊天"});//渲染index.jade
		break;

		default :
			StaticService.staticRender(pathname,res,BASE_DIR);//处理静态文件请求或者404请求
		break;
	}

})

/**
 * [io description]监听socket.io
 * @type {[type]}
 */
var io=socket.listen(server);


PageService.renderJade(io,users)

/**
 * 监听3000端口                       [description]
 */
server.listen(process.env.PORT || 3000,function(){
	console.log("server on *:3000");
})