<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>register.html</title>
	
    <meta name="keywords" content="keyword1,keyword2,keyword3">
    <meta name="description" content="this is my page">
    <meta name="content-type" content="text/html; charset=UTF-8">
    
    <!--<link rel="stylesheet" type="text/css" href="./styles.css">-->

  </head>
  
  <body>
    <form method="post" action="register.do" method="post">  
     用户名<input type="text" name="username"/><br/>  
    password<input type="password" name="password"/><br/>  
    nickname<input type="text" name="nickname"/><br/>
    age   <input type="text" name="age"/><br/>
    phone <input type="text" name="phone"/><br/>
    email <input type="text" name="email"/><br/>
    <!-- file <input type="file" name="favicon"/><br/> -->
    <input type="submit"/>  
<form>
  </body>
</html>
