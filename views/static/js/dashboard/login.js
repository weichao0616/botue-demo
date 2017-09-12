define(["jquery","cookie"], function($){

	 $(function(){
//   1,获取表单,注册提交事件
        $("form").submit(function(){
        //1,获取用户输入的信息
            var userName = $("#tc_name").val();
            var pass = $("#tc_pass").val();

            if(userName.trim() == ""){
                alert("请输入用户名");
                return false;
            }

            if(pass.trim() == ""){
                alert("请输入用户名");
                return false;
            }


        //2, 要将数据发送给后台,让后台进行验证
        //2.1 数据接口地址,请求方式,请求要的参数
            $.ajax({
                url:"/api/login",
                type:"post",
                data:{
                    tc_name:userName,
                    tc_pass:pass
                },
                success:function(data){
                    if(data.code == 200){
//                    登陆成功之后,先将后台返回用户的头像以及用户名信息,保存到cookie中,为了让首页也使用这个信息.

//                    应该先将对象转成json格式的字符串然后再存
                        $.cookie("userinfo", JSON.stringify(data.result), {expires: 365, path: "/"});

                        location.href = "/";
                    }

                }
            })


//     阻止表单的默认提交事件
//      e.preventDefault();
            return false;
        })



    });

})