/*邮箱，手机注册切换*/
$("a#logup-mail-page").click(function(){
	this.addClass("blue")
});

$("a#logup-phone-page").click(function(){
	this.addClass("blue");
});


$(function(){
		var confirm = confirmForm();

})



 //提交登录表单。如果正确跳转
/*$(function(){
	$("#submit").click(function(){
		$.post("json/login.json",{
			username: $("input #username").val(),
			password: $("input #password").val()
		},function(jsonObj,textStatus){
			console.log(jsonObj);
			if(jsonObj.status == "1"){
				window.location.href = "index.html";
			}
			if(jsonObj.status == "2" || jsonObj.status == "3"){
				alert("您输入的用户名或密码错误。");
			}
			
		});
		
	});

})*/


//提交登录表单2
$(function(){
	$("#submit").bind("click",function(){

		
		 $.ajax({
					type:"POST",
					url:"login.do",
					data:$("form#loginform").serialize(),
					dataType:"json",
					error:function(XMLHTTPRequest,textStatus,errorThrown){
						alert(textStatus);
						alert(errorThrown);
					},

					success: function(jsonObj){
						
						console.log(jsonObj);

						if(jsonObj.status == "1"){
							setCookie("username",$("#username").val());//靠，忘记写val()了
							location.href = "../user/index.do";
							
							return;
						}
						if(jsonObj.status == "2" || jsonObj.status == "3"){
							alert("您输入的用户名或密码错误。");
							return;
						}
					}
		});
	});
})



/*$(function(){
	$("form#loginForm").submit(function(){
		$.post("json/login.json",
			$("form#loginForm").serialize(),
			function(data){
				alert("成功");
				alert(data);

			});
		return false;		
	});
})*/





//注册界面表单提交:表单均验证正确，并且点击确认提交才提交表单并跳转到主页




//提交注册表单
/*function postReigster(){
	$("a#submitRegister").click(function(){
		$.post("#href",{
			email:$("input#id").val(),
			username:$("input#username").val(),
			password:$("input#password").val()
		},function(data){
			if(status="1"){
				alert("恭喜，注册成功！");//这样就可以了。alert()没有返回值
				window.location.href = "../index.html"
			}
			if(status="2"){
				alert("注册失败");
			}
			if(status="302"){
				alert("您已登录！");
			}
		})
	});
}*/

//提交注册表单
$(function(){
	$("a#submitRegister").bind("click",function(){	
		if(confirm===true){
			postReigster();
		}

		var postReigster = $.ajax({
					type:"POST",
					url:"json/logup.json",
					data:$("form#registerform").serialize(),
					dataType:"json",
					error:function(XMLHTTPRequest,textStatus,errorThrown){
						alert(textStatus);
						alert(errorThrown);

					},

					success: function(jsonObj){
						setCookie("username",$("#username").val());
						
						console.log(jsonObj);
						if(jsonObj.status == "1"){
							alert("注册成功！");
							location.href = "/simsimi/index.html";
							
							return;
						}
						if(jsonObj.status == "2"){
							alert("注册失败！");
							return;
						}
						if(jsonObj.status == "302"){
							alert("您已经登录，不需要注册。");
							return;
						}
					}
		});
	});
})






/*表单验证*/
//<![CDATA[
 function confirmForm(){
		$('form :input').blur(function(){
			//这个jquery-mobile 里的有冲突。 jquery-mobile会自动为input加上一层div来
			//控制<input>的样式，而logup.html中的div 在jquery-mobile div的外层
			var $parent = $(this).parent().parent();
			var confirmForm;//是否全部验证通过

			$parent.find(".formtips").remove();
			


			if( $(this).is("#username") ){
				if(this.value== "" || this.value.length<6){
					var errorMsg = '请输入至少6位的用户名';
					var confirm1 = false;
					$parent.append('<span class="formatips onError"> ' + errorMsg +'</span>');

				}else{
					var okMsg = '输入正确.';
					var confirm1 = true;
					$parent.append('<span class="formtips onSuccess">' +okMsg +'</span>');
				}
			}
				
			if( $(this).is('#email') ){
					if(this.value=="" || (this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value))){
						var errorMsg = '请输入正确的E-mail地址';
						var confirm2 = false;
						$parent.append('<span class="formtips onError">' +errorMsg + '</span>');
					}else{
						var okMsg='输入正确';
						var confirm2 = true;
						$parent.append('<span class="formtips onSuccess">' +okMsg + '</span>');
					}

			}

			if( $(this).is("#phoneNum") ){
					if(this.value=="" || (this.value!="" && !/^1[34578]\d{9}$/.test(this.value))){
						var errorMsg = '请输入正确的手机号';
						var confirm3 = false;
						$parent.append('<span class="formtips onError">' +errorMsg+ '</span>');
					}else{
						var okMsg='输入正确';
						var confirm3 = true;
						$parent.append('<span class="formtips onSuccess"');
					}
			}

			if( $(this).is("#password") ){
				if(this.value== "" || this.value.length<6){

					var errorMsg = '请输入至少6位的密码';
					var confirm4 = false;
					$parent.append('<span class="formatips onError"> ' + errorMsg +'</span>');

				}else{
					var okMsg = '输入正确.';
					var confirm4 = true;
					$parent.append('<span class="formtips onSuccess">' +okMsg +'</span>');
				}
			}
			//注意作用域，每个if下面相当于一个函数，所以都在自己的作用域内
			var passwd = this.value;	

			
					

			if( $(this).is("#comfirmPassword") ){
				if(this.value != passwd){

					/*console.log(this.value);*/
					//用value 结果是undefined 用val()就是正确结果
					//console.log($("#password").val());
					//console.log($("#password").value);

					var errorMsg = '两次输入密码不相同';
					var confirm5 = false;
					$parent.append('<span class="formatips onError"> ' + errorMsg +'</span>');

				}else{
					
					var okMsg = '输入正确.';
					var confirm5 = true;
					$parent.append('<span class="formtips onSuccess">' +okMsg +'</span>');
				}
			}




			return confirmForm = confirm1 && confirm2 && confirm3 && confirm4 && confirm5;
		});

}

//]]>

function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

