/*点的一个会话链接跳转到对应聊天框*/

//从#menu到a 中间jQuery样式有嵌套

$(document).ready(function(){
/*     	$("ul#conversations>li").click(function(){ //所有的a [name='friendName_i']"
		
		alert("被点击了！");
		initChatPage($(this).attr("name")); //要确定是点击的哪一个
	});	

*/

        $("ul#conversations").on("click","li",function(){ //为什么不能绑定事件，是没有在DOM中？
	//$("ul#conversations").delegate("li","click",function(){ //为什么不能绑定事件，是没有在DOM中？

	    	//console.log($(this));表示点击的li
                var h2_text = $(this).children().children("h2").text();
                console.log(h2_text);
                var portraitUrl = $(this).children().children("img").attr("src");
                var myportraitUrl = $("img#user-portrait").attr("src");
                alert(myportraitUrl);

         

                //return false;

                initChatPage(h2_text,portraitUrl,myportraitUrl); //经测试，使用text(),val()都可以
                //location.href = "#page2"+ "?username=" + getCookie(username);//请求到服务器~

		//initChatPage($(this).find("h2").val()); 


	});

    
               

                        
                         
                
        






/*	$("ul#conversations>li").live("click",function(){ // $(...).live is not a function
		alert("被点击了！");
	})*/

/*    $("ul[id='conversations']>li").click(function(){ //所有的a [name='friendName_i']"
      alert("被点击了！");
      initChatPage($(this).attr("name")); //要确定是点击的哪一个
      return false;
    })*/
	
	 /* $("div>ul>li>a").click(function(){
	    alert("点击了");
	  })*/
      

});

/*$(window).load(function (){ 
	$("ul#conversations").delegate("li#conversation0","click",function(){ //为什么不能绑定事件，是没有在DOM中？

		alert("被点击了！");
		initChatPage($(this).attr("name")); 

	});

		$("ul#conversations").on("click","li",function(){ //为什么不能绑定事件，是没有在DOM中？

			alert("被点击了！");
			initChatPage($(this).attr("name")); 

		});

});
*/


function initChatPage(nickname,url,myurl){
/*		var friends = [];
	for(var key in sessionStorage){
		
		var reg = new RegExp("^friendName_","g");
		
		if(reg.test(key) === true){
			var friend = sessionStorage.getItem(key);			
			
			
			$("#message-header").html(friend);
                        friends.push(friend);
		}
	}*/
         $.ajax({
                                type:"GET",
                                url:"json/message_record.json",
                                data:sessionStorage.getItem($("div#message-header").text()),
                                dataType:"json",
                                error:function(XMLHTTPRequest,textStatus,errorThrown){
                                        alert(textStatus);
                                        alert(errorThrown);
                                },

                                success: function(jsonObj){
                                        console.log(jsonObj);
                                        var MsgLenght = jsonObj.length;

                                        for(var i=0;i<MsgLenght;i++){
                                                var ifMyOwnMsg = jsonObj[i].indexOf("M:");
                                                var ifOtherMsg = jsonObj[i].indexOf("O:");
                                                if(ifMyOwnMsg > -1 ){
                                                        var timestamp = jsonObj[i].slice(jsonObj[i].indexOf("M:")+2,jsonObj[i].indexOf("#"));
                                                		var myOwnMsg = jsonObj[i].slice(jsonObj[i].indexOf("#")+1);
                                                		console.log(timestamp);
                                                		console.log(myOwnMsg);
                                                        var html = 
                                                        "<div class='chat-content-group buddy'><span class='right chat-text'><p>"+ 
                                                        "<img src='" +myurl +"' class='right portrait-icon'>"+ 


                                                        timestamp + "</p>" +myOwnMsg+"</span></div>";
                                                        $("#text-box").append(html);
                                                }else if(ifOtherMsg > -1){
                                                        var timestamp = jsonObj[i].slice(jsonObj[i].indexOf("O:")+2,jsonObj[i].indexOf("#"));
                                                        var otherMsg = jsonObj[i].slice(jsonObj[i].indexOf("#")+1);
                                                        var html = 
                                                        "<div class='chat-content-group buddy'><span class='left chat-text'><p>"+

                                                        "<img src='" +url +"' class='left portrait-icon'>"+

                                                        timestamp +"</p>" + otherMsg +"</span></div>";
                                                        $("#text-box").append(html);

                                                         

                                                }
                                                
                                                     
                                        }
                                }
        });
        $("div#message-header").text(nickname);//先设置，再跳转？还是先跳转再设置
        //使用属性选择器 用[attribute=value] 时要写全value.


        //$("div#text-box").children("div").children("img[class*='left']").attr("src",url);//img url存在sessionStorage中,nickname也需要存在img中
        //$("div#text-box").children("div").children("img[class*='right']").attr("src",myurl);//img url存在sessionStorage中,nickname也需要存在img中

}
