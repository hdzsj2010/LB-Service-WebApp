//获取登录，注册页面的cookie，并请求主页（会话列表）页面数据
$(document).ready(function(){
    var username=getCookie("username");
    $.ajax({
                type:"GET",
                url:"index_info.do?username="+username,//jason改
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
                                var message_num = item[i].length;
                                var username = item[i].username;
                                var nickname = item[i].nickname;
                                var last_message = item[i].last_message;
                                var url = item[i].url;

                                if(message_num==0 || message_num==undefined){

                                    var converHtml =  //jquery mobile 的渲染
                                    
                                        "<li data-icon=\"false\" id=\"conversation"+ i +"\" >"
                                            + "<a class=\"ui-btn\" href=\"#page2\" name=\"" + username + "\"><img src=\""+ item[i].url + "\" />" 
                                            + "<h2>"+ nickname + "</h2>"
                                            + "<p>"+ last_message+ "</p>"
                                           
                                            + "</a>"
                                      + "</li>"   

                                }else{
                                    var converHtml =  //jquery mobile 的渲染
                                    
                                        "<li data-icon=\"false\" id=\"conversation"+ i +"\" >"
                                            + "<a class=\"ui-btn\" name=\"" + username + "\"><img src=\""+ item[i].url + "\" />" 
                                            + "<h2>"+ nickname + "</h2>"
                                            + "<p>"+ last_message+ "</p>"
                                            + "<span class=\"ui-li-count\">" + message_num + "</span>"
                                            + "</a>"
                                      + "</li>"   
                                }

                                $("ul#conversations").append(converHtml);
                                
                                sessionStorage.setItem("username_"+[i],username);
                                
                                sessionStorage.setItem(username,url);
                                sessionStorage.setItem(nickname,username);
                                                 
                            }
                            //放在循环内的话$("ul#conversations").childre("li");会重复选中所有的ul > li
                            $("ul#conversations").children("li").addClass("ui-li-has-count ui-li-has-thumb ui-first-child ui-last-child");;//这个返回的是$("ul#conversations") jQuery对象
                            //console.log($li);
                            //if(!item[i].message_num){

                        }
                   })

            
                }
    });
    //alert("getSessionList Ready")

    //var username=document.cookie.split(";")[0].split("=")[1];      
})


function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

