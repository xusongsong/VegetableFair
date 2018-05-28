<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    request.setAttribute("ctx", basePath);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <title>社区系统</title>
    <link rel="stylesheet" type="text/css" href="${ctx }css/style.css">
    <script src="${ctx }js/jquery.js"></script>
    <script src="${ctx }js/index.js"></script>
    <script src="${ctx }om/common/Class.js"></script>
    <script src="${ctx }om/common/Util.js"></script>
    <script src="${ctx }om/mapSearcher/MapSearcher.js"></script>
    <script src="${ctx }om/mapSearcher/CityList.js"></script>
    <script type="text/javascript">
        function checkLogin(){
            var user = $("#user").val();
            var passwd = $("#passwd").val();
            if(''==user){
                $("#msg").text("用户名不允许为空!");
                return;
            }else if(''==passwd){
                $("#msg").text("密码不允许为空!");
                return;
            }
        }
        function keyDownLogin(){
            var event = document.all ? window.event : e;
            if(event.keyCode == 13){
                login();
            }else{
                return;
            }
        }
        function login(){
            checkLogin();
            $.ajax({
                url		: '${ctx }login/login',
                type	: 'POST',
                async: false,
                data	: {
                    'userName'	: $("#user").val(),
                    'passwd'	: $("#passwd").val(),
                    'remberMe'	: $("#remberMe").val()
                },success		: function(data){
                    if("1"==data.success){
                        // 页面跳转
                        $("#searchBtn").submit();
                    }else{
                        $("#msg").text(data.msg);
                    }
                }
            });

        }
    </script>
</head>
<body>
<!-- <a href="mapSearcher/index"><input type="button" value="tiao zhuan"></a> -->
<div class="login_center">
    <div class="top"><span><img src="${ctx }img/img_index/logo.png" /></span><strong>山东寿光三维公安警用系统</strong></div>
    <ul class="login_k" >
        <li class="login_k_menu">
            <span><img src="${ctx }img/img_index/admin.png"></span>
            <input type="text"  placeholder="admin" id="user">
        </li>
        <li class="login_k_menu">
            <span><img src="${ctx }img/img_index/password.png"></span>
            <input type="password" placeholder="密码" maxlength="11" id="passwd" onkeydown="keyDownLogin()">
        </li>
        <li class="remember_password">
            <span><input type="checkbox" id="remberMe"></span>
            <span id="msg">记住密码</span>
        </li>
        <li ><input type="button"  name="" class="btn" value="登录" onclick ="login()"/></li>
        <form action="${ctx }mapSearcher/map.do" method="post" id="searchBtn" style="display: none">
            <ul class="center_menu_k">
                <li class="center_menu_k_menu">
                    <ul class="local">
                        <span style="margin-left: 10px;" id="currentCity">张家港市</span>
                        <span class="local_xl"></span>
                    </ul>
                    <ul>
                        <input type="text"
                               style="padding: 10px; fint-size: 14px; width: 200px;; outline: none; border: 0px; margin-top: 2px; width: 325px;"
                               placeholder="输入关键字" id="inputText" name="inputText">
                        <input type="hidden" name="cityName" id="cityName">
                        <input type="hidden" name="areaName" id="areaName">
                    </ul>
                    <ul class="btn"></ul>
                    <!--<ul class="Associative">
                    </ul>-->
                </li>
            </ul>
        </form>
    </ul>
</div>
</body>
</html>

