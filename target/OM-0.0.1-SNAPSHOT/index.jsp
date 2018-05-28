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
<link rel="stylesheet" type="text/css" href="css/index.css">
<script src="js/jquery.js"></script>
<script src="js/index.js"></script>
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<script src="om/common/Class.js"></script>
<script src="om/common/Util.js"></script>
<script src="om/mapSearcher/MapSearcher.js"></script>
<script src="om/mapSearcher/CityList.js"></script>
</head>

<body>
	<!-- <a href="mapSearcher/index"><input type="button" value="tiao zhuan"></a> -->
	<div class="top_nav">
		<ul class="top_nav_logo"></ul>
		<ul class="top_nav_right">
			<li class="top_nav_right_login"><span
				class="top_nav_right_login_img"></span> <span>登录</span></li>
			<li class="top_nav_right_line"></li>
			<li class="top_nav_right_help"><span
				class="top_nav_right_help_img"></span> <span>帮助</span></li>
		</ul>
	</div>
	<div class="center_menu">
		<form action="mapSearcher/map.do" method="post" id="searchBtn">
			<ul class="center_menu_k">
				<li class="center_menu_k_menu">
					<ul class="local">
						<span style="margin-left: 10px;" id="currentCity">杭州市</span>
						<span class="local_xl"></span>
					</ul>
					<ul>
						<input type="text"
							style="padding: 10px; fint-size: 14px; width: 200px;; outline: none; border: 0px; margin-top: 2px; width: 325px;"
							placeholder="输入关键字" id="inputText">
					</ul>
					<ul class="btn"></ul>
					<ul class="Associative">

					</ul>
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
					<span style="margin-left: 8px;"><strong>规划</strong></span>
				</ul>
			</li>
			<li class="center_flmk_fk_icon"><a href="map.html"
				target="_blank">
					<ul class="kgsjicon">
						<span class="icon_kgsj"></span>
						<span class="icon_text">控规数据</span>
					</ul>
			</a>
				<ul class="fasjicon">
					<span class="icon_fasj"></span>
					<span class="icon_text">方案数据</span>
				</ul></li>
		</ul>
		<ul
			style="float: left; width: 1px; height: 136px; border: 1px dashed #e5e5e5; margin-top: 80px; margin-left: 23px; margin-right: 23px;"></ul>
		<ul class="center_flmk_fk">
			<li class="center_flmk_fk_top">
				<ul class="ztmap">
					<span style="margin-left: 8px;"><strong>专题地图</strong></span>
				</ul>
				<ul class="lbmap">
					<span><strong style="margin-left: 8px;">安防</strong></span>
				</ul>
			</li>
			<li class="center_flmk_fk_icon">
				<ul class="spjkicon">
					<span class="icon_spjk"></span>
					<span class="icon_text">视频监控</span>
				</ul>
				<ul class="xsgjicon">
					<span class="icon_xsgj"></span>
					<span class="icon_text">方案数据</span>
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
			<span><input type="text" placeholder="admin"
				style="font-size: 16px; padding: 10px; border: 0px; outline: none; background: none;"></span>
		</ul>
		<ul class="login_password">
			<span class="password_ico"></span>
			<span><input type="password" maxlength="11"
				style="font-size: 16px; padding: 10px; border: 0px; outline: none; background: none;"></span>
		</ul>
		<ul
			style="width: 248px; height: 16px; margin: auto; margin-top: 10px; font-size: 12px;">
			<input value="0" style="float: left; margin: 1px; margin-right: 5px;"
				type="checkbox">记住密码
		</ul>
		<ul class="login_btn"></ul>
		<ul class="login_text">
			<span>管理员登录</span>
			<span class="wjmm">忘记密码？</span>
		</ul>
	</div>
</body>
</html>
