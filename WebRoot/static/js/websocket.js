/* 2016.6.29 新增 websocket，替换原来的ajax，用于获取聊天消息。
 *
 *
 *
 *
*/
$(document).ready(function(){ //function不能省略
    var websocket =  initWebsocket('ws://10.108.250.85:8123/websocket');
        websocket.onopen = function(evt) {
                $('#text-box').innerHTML = '已连接到服务器......' + '<br/>';
　　　　        $("#send").disabled = false; //websocket未连接的时候不能发送
                var username = getCookie("username");
                websocket.send("AUTH:"+ username); //发送认证消息放到onopen里面，jason改
　　}
    /*var username = getCookie("username");
    　if ( websocket.readyState == WebSocket.OPEN ) {
             //注意作用域
    　　　websocket.send("AUTH:"+ username);
    　}*/


    　websocket.onmessage = function(evt) {//接收消息
                                    var receiveData = evt.data;//接收到的消息是evt的一个属性
                                    //解析消息
                                    console.log(receiveData);
                                    var msg = receiveData.slice(receiveData.indexOf('#')+1); //MSG +1，#自身占了一个位置 . 注意有indexOf 索引为 0的位置
                                    var username = receiveData.slice(receiveData.indexOf('RECEIVE:')+8,receiveData.lastIndexOf('#'));
                                    msg = username + ':' + msg;  //接收的用户

                                    var chatBox = document.getElementById("text-box");
                                    //audioElement.play();  

                    //渲染
                    if (chatBox.value=="") {//为空的时候的处理
                         var htmlcode ="<div class=\"chat-content-group buddy\">" + 
                        "<img src=\"img/simsimi.jpg\" class=\"left portrait-icon\">"
                        + "<span class=\"left chat-text\">"+ msg +"</span></div>"

                            
                    }else{
    　　　　                var htmlcode = "\n" + "<div class=\"chat-content-group buddy\">" + 
                        "<img src=\"img/simsimi.jpg\" class=\"left portrait-icon\">"
                        + "<span class=\"left chat-text\">"+ msg +"</span></div>" 
                    }
                    $("#text-box").append(htmlcode);
    　　}
    　　websocket.onclose = function(event) {
            console.log("Was clean? " + event.wasClean + "Code=" + event.code + "Reason=" + event.reason  )

    　　}
    　　websocket.onerror = function(evt) {  
            alert("Connection error.");
    　　}

        $("#send").click(function(){
                sendMessage();
                return false;
        });

        function sendMessage() {//发送消息
                var friendName = sessionStorage.getItem($("div#message-header").val());
                var loginNickName = getCookie("username");
                

        　　　　var message = document.getElementById('inputting').value;
                //显示自己的消息
                        //var myMessageNode = document.createTextNode(myMessage);
                var chatBox = document.getElementById('text-box');
                var content =  loginNickName + ':' + message ;
                var htmlcode = "<div class=\"chat-content-group buddy\"> "+ 
                                                "<img src=\"img/user_portrait.png\" class=\"right portrait-icon\">" + "<br />" +
                                                "   <span class=\"right chat-text\">" +content + "</span></div>";

                $("#text-box").append(htmlcode);
                //保持焦点在#page2
                $("textarea#inputting").focus();

                //chatBox.childNodes[0].appendData(loginName + ':' + message + '\n');//appendDate()的参数是文本，不是文本节点

                
                var messageToServer = 'SEND:' + friendName + '#' + message ;
        　　　　if ( websocket.readyState == WebSocket.OPEN ) {
                    //注意作用域
        　　　　　　websocket.send(messageToServer);
        　　　　}

                        document.getElementById('inputting').value = '';


    }


})
        

    



    
function initWebsocket(wsServer){
　　/* 注意浏览器js的执行顺序 */
　　//var wsServer = 'ws://10.108.247.10:8000/websocket'; //服务器地址
        //var wsServer = 'json/websocket.json';//可以用json测试？不可以
　　return new WebSocket(wsServer); //创建WebSocket对象
     
        //var audioElement = document.createElement('audio');//消息提示音
        //audioElement.setAttribute('src', 'qqmsg.mp3');
　　
}
    //注意作用域：websocket.onopen不能放在这 。websocket.js:29 Uncaught ReferenceError: websocket is not defined


    
    




    //共东跳滚到最底下
//$( "div#message-text" ).scrollTop( $("div#message-text")[0].scrollHeight );   


