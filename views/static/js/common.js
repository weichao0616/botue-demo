define(["jquery", "template", "cookie"],function($,template){
	     //从cookie中获取用户存储好的信息
     $(function () {
//判断用户是否登录了,如果没有登陆就给跳回登陆页

//判断用户是否登录的依据最好是通过向后台发送请求,问h后台是否登录了才是最严谨的判断方式,当前项目未提供接口,故无法使用该方式

//我们使用 PHPSESSID来判断是否登录了,有说明已经登录,没有说明没登录.

// 如果不在登陆页才判断下面的内容:
		if(location.pathname != "/dashboard/login"){

			 if(!$.cookie("PHPSESSID")){

             	location.href = "/dashboard/login";
             	
         	}

         	var userinfo = JSON.parse($.cookie("userinfo"));

        	var html = template("profile_tpl", userinfo);

        	 $("#profile").html(html);

		}

// 退出功能的实现

		$("#logout_btn").click(function(){
			// 向后台发送ajax请求,请求退出
			$.ajax({

				url:"/api/logout",
				type:"post",
				success:function(data){
					if(data.code == 200){
						// 接收到请求退出数据后,页面跳转到登陆页
						location.href = "/dashboard/login";
					}

				}

			})

		})

     })
	
})