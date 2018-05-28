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
<title>OM系统</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/index.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }js/index.js"></script>
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
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
	/*登录后台CMS系统*/
	function administratorLogin(){

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
						var userName = $("#user").val();
						//显示用户登录成功
						$(".top_nav_right").css("width","290px");
						$(".loginUserName").text("您好！" + userName);
						$(".user").show();
						//用户登录界面隐藏
						$(".top_nav_right_login").hide();
						$('.login_k').hide();
						$(".login_k ul input").val('');
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
	<div class="top_nav">
		<ul class="top_nav_logo"></ul>
        <span class="top_nav_text">
            <strong>三维实景社区网格化管理平台</strong>
        </span>
		<ul class="top_nav_right">
			 <li class="user" >
				<span class="yh"><span class="loginUserName"></span></span>
				<span class="fg"></span>
				<span class="tc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;退出</span>
				<a href="${ctx }login/CMS" target="_blank"><span>&nbsp;&nbsp;登陆CMS</span></a>
			</li>
			<li class="top_nav_right_login" >
				<span class="top_nav_right_login_img"></span>
				<span>登录</span>
			</li>
			<li class="top_nav_right_line"></li>
			<li class="top_nav_right_help">
				<span class="top_nav_right_help_img"></span>
				<span>帮助</span>
			</li>
		</ul>
	</div>
	<div class="center_menu">
		<form action="${ctx }mapSearcher/map.do" method="post" id="searchBtn">
			<ul class="center_menu_k">
				<li class="center_menu_k_menu">
					<ul class="local">
						<span style="margin-left: 10px;" id="currentCity">苏州市</span>
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
	</div>
	<div class="center_flmk">
		<ul class="center_flmk_fk">
			<li class="center_flmk_fk_top">
				<ul class="ztmap">
					<span style="margin-left: 8px;"><strong>专题地图</strong></span>
				</ul>
				<ul class="lbmap">
					<span style="margin-left: 8px;"><strong>安防</strong></span>
				</ul>
			</li>
			<li class="center_flmk_fk_icon">
			<%--<form action="${ctx }mapSearcher/map.do" method="post" id="regulatoryPlanBtn">--%>
			<%--<!-- <a href="map.html" target="_blank"> -->--%>
			 	<%--<input type="hidden" name="regulatoryPlan" id="regulatoryPlan" />--%>
			 	<%--<input type="hidden" name="inputTextForPlan" id="inputTextForPlan">--%>
			 	<%--<input type="hidden" name="cityNameForPlan" id="cityNameForPlan">--%>
				<%--<input type="hidden" name="areaNameForPlan" id="areaNameForPlan">--%>
				<%--<ul class="kgsjicon">--%>
					<%--<span class="icon_kgsj"></span>--%>
					<%--<span class="icon_text">安防图层</span>--%>
				<%--</ul>--%>
			<%--<!-- </a> -->--%>
				<%--<ul class="fasjicon">--%>
					<%--<span class="icon_fasj"></span>--%>
					<%--<span class="icon_text">安防管理</span>--%>
				<%--</ul>--%>
			<%--</form>--%>
                <ul class="kgsjicon" onclick="mapClick(1)">
                <span class="icon_kgsj"></span>
                <span class="icon_text">安防图层</span>
                </ul>
                <!-- </a> -->
                <ul class="fasjicon" onclick="mapClick(2)">
                <span class="icon_fasj"></span>
                <span class="icon_text">安防管理</span>
                </ul>
			</li>
		</ul>
		<ul
			style="float: left; width: 1px; height: 136px; border: 1px dashed #e5e5e5; margin-top: 80px; margin-left: 23px; margin-right: 23px;"></ul>
		<ul class="center_flmk_fk">
			<li class="center_flmk_fk_top">
				<ul class="ztmap">
					<span style="margin-left: 8px;"><strong>专题地图</strong></span>
				</ul>
				<ul class="lbmap">
					<span><strong style="margin-left: 8px;">视频</strong></span>
				</ul>
			</li>
			<li class="center_flmk_fk_icon">
				<ul class="spjkicon" onclick="mapClick(3)">
					<span class="icon_spjk"></span>
					<span class="icon_text">视频监控</span>
				</ul>
				<ul class="xsgjicon" onclick="mapClick(4)">
					<span class="icon_xsgj"></span>
					<span class="icon_text">地图图层</span>
				</ul>
			</li>
		</ul>
	</div>
	<div class="btm_menu">
		<ul style="margin-top: 20px;">
			电话：0571-569630000 传真：0571-56833866 E-mail:zjkelan@163.com
			<br>
			<br> 浙江科澜信息技术有限公司技术提供 copyright 2006-2016
		</ul>
	</div>
	<div class="login_k">
		<ul class="login_name">
			<span class="name_ico"></span>
			<span><input type="text" id="user"
				style="font-size: 16px; padding: 10px; border: 0px; outline: none; background: none;"></span>
		</ul>
		<ul class="login_password">
			<span class="password_ico"></span>
			<span><input type="password" maxlength="11" id="passwd" onkeydown="keyDownLogin()"
				style="font-size: 16px; padding: 10px; border: 0px; outline: none; background: none;"></span>
		</ul>
		<ul
			style="width: 248px; height: 16px; margin: auto; margin-top: 10px; font-size: 12px;">
			<input value="1" style="float: left; margin: 1px; margin-right: 5px;"
				type="checkbox" id="remberMe">记住密码<font color="red"><span id="msg"></span></font>
		</ul>
		<ul class="login_btn" onclick = "login()"></ul>
		<ul class="login_text">
			<span onclick="administratorLogin()">管理员登录</span>
			<span class="wjmm">忘记密码？</span>
		</ul>
	</div>
</body>
</html>
