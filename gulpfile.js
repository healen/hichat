var gulp = require("gulp"),
	clean = require("gulp-clean"),
	less = require("gulp-less");
gulp.task("less",['clean'],function(){
	gulp.src("./Mose/less/*.less")
	.pipe(less({compress: true}))
	.on("error",function(e){console.log(e)})
	.pipe(gulp.dest("./static/css"));
})

gulp.task("clean",function(){
	gulp.src("./static/css/*.css",{read:true})
	.pipe(clean());
})

gulp.task("watch",function(){
	gulp.watch("./Mose/**/*.less",function(){
	    	gulp.run('less','clean',"watch");
	})
})
gulp.task("default",function(){
	gulp.run('less','clean',"watch");
})
