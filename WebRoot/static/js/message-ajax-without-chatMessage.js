//获取登录，注册页面的cookie，并请求主页（会话列表）页面数据
$(document).ready(function(){
    var username=getCookie("username");
    $.ajax({
                type:"GET",
                url:"index_info.do?username="+username,
                //data:username,
                //dataType:"json",
                error:function(XMLHTTPRequest,textStatus,errorThrown){
                    alert(textStatus);
                    alert(errorThrown);

                },

                success: function(jsonObj){
                   /*页面数据*/
                   /*var nickname = jsonObj.user.nickname;
                   var imgUrl = jsonObj.user.url;*/
                   $.each(jsonObj,function(index,item){
                        if(index == "user"){
                            $("#user-nickname").html(item.nickname);
                            $("#user-signature").html(item.signature);
                            $("#usr-portrait").attr("src",item.url);
                        }
                        if(index == "friends"){
                            for(var i in item){ //item应该是
                                //$("li#conversation>a>img").attr("src",item[i].url);
                                //$("li#conversation>a>h2").html(item[i].nickname);
                                //$("li#conversation>a>p").html(item[i].last_message);
                                //$("li#conversation>a>span").html(item.message_num);
                                var message_num = item[i].message_num

                                if(message_num==0 || message_num==undefined){
                                    var converHtml =  //jquery mobile 的渲染
                                    
                                        "<li data-icon=\"false\" id=\"conversation"+ i +"\" >"
                                            + "<a class=\"ui-btn\" href=\"#\"><img src=\""+ item[i].url + "\" />" 
                                            + "<h2>"+ item[i].nickname + "</h2>"
                                            + "<p>"+item[i].last_message+ "</p>"
                                           
                                            + "</a>"
                                      + "</li>"   

                                }else{
                                    var converHtml =  //jquery mobile 的渲染
                                    
                                        "<li data-icon=\"false\" id=\"conversation"+ i +"\" >"
                                            + "<a class=\"ui-btn\" href=\"#\"><img src=\""+ item[i].url + "\" />" 
                                            + "<h2>"+ item[i].nickname + "</h2>"
                                            + "<p>"+item[i].last_message+ "</p>"
                                            + "<span class=\"ui-li-count\">" + message_num + "</span>"
                                            + "</a>"
                                      + "</li>"   
                                }

                                $("ul#conversations").append(converHtml);
                              


                             
                            }
                            //放在循环内的话$("ul#conversations").childre("li");会重复选中所有的ul > li
                            $("ul#conversations").children("li").addClass("ui-li-has-count ui-li-has-thumb ui-first-child ui-last-child");;//这个返回的是$("ul#conversations") jQuery对象
                            //console.log($li);
                            //if(!item[i].message_num){

                        }
                   })

            
                }
    });
    //var username=document.cookie.split(";")[0].split("=")[1];      
})




/*聊天消息改由websocket处理
 包括：提交聊天消息，更新聊天消息

$(function(){
        timestamp = 0;
        // user_name=$("form>label#user-label").html();
        //updateMsg();

        $("#chatform").submit(function(){
                       
                $.post("./backend.php",{//可以传输form外的吗？不可以，并且只能传表单元素的内容
                         name:$("label#name-label").html(),
                        message: $("#inputting").val(),
                        action:"postmsg",
                        time:timestamp,
                        func: "getNameAndTime"

                },function(jsonObj,textStatus){//请求结果和状态
                                //清除消息文本框内容
                               
                        $("#inputting").val("");
                        addMessages(jsonObj);
                },"json");
                return false;

        });
}); //$()是$(document).ready()的缩写


//更新信息函数，每隔一定时间去服务器读取数据

        function updateMsg(){ //更新的时候请求的时间
                $.post("./backend.php",{time:timestamp},
                			
                        function(jsonObj,textStatus){

                                console.log(jsonObj);
                                addMessages(jsonObj);
                        },"json");
                //刷新自己和对方发的消息。有新消息就返回数据
                setTimeout('updateMsg()',4000);//为什么不是interval,因为这里有递归，自带循环
        }

        //解析json文档函数，把数据显示到页面上
        function addMessages(jsonObj){//json替换xml
                if(jsonObj.status == 2) return; //没有新消息就直接返回

                //消息加进去了，但是没有取出来，要到下一次刷新才取出来的原因是？
                timestamp = jsonObj.time;
                var user_name = $("label#name-label").html();
                //console.log(timestamp);

                //$.each循环数据
                $.each(jsonObj,function(index,items){//comment表示jsonObj的每一条！
                        //显示头像先放一边。 注意这里的items是形参，代表jsonObj的每一项

                        if(index == "messages"){//遍历到第三个键值对了messages表示[{"user":...}]
                                //console.log(items);

                                for(var i in items){

                                        var username = items[i]["user"];
                                        var content =  items[i]["msg"];
                                        //需要按index.html格式处理
                                        if(username==user_name){
                                        	 var htmlcode = "<div class=\"chat-content-group buddy\"> "+ 
                                        "<img src=\"img/user_portrait.png\" class=\"right portrait-icon\">" + "<br />" +
                                        "   <span class=\"right chat-text\">" +content + "</span></div>";
                                        }else{
                                        	 var htmlcode ="<div class=\"chat-content-group buddy\">" + 
                                                "<img src=\"img/simsimi.jpg\" class=\"left portrait-icon\">"
                                                + "<span class=\"left chat-text\">"+ content +"</span></div>"
                                             

                                        }
                                       
                                        $("#text-box").append(htmlcode);
                                       
                                }
                                

                        }
                         $( "div#message-text" ).scrollTop( $("div#message-text")[0].scrollHeight );   
                                        
                });
        }
*/

function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

