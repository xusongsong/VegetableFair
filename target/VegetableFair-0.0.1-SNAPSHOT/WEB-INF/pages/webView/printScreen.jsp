
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("ctx", basePath);
%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>截图弹窗</title>
<link rel="stylesheet" type="text/css" href="${ctx }/css/map.css">
<script src="${ctx }/js/jquery.js"></script>
<script src="${ctx }/om/common/Class.js"></script>
<script src="${ctx }/om/common/Util.js"></script>
<script src="${ctx }/om/mapTools/Screenshot.js"></script>
<script src="${ctx }/om/mapTools/print.js"></script>
</head>
<body  style = "top:0px;left:0px;">
<div class="jttk" style="margin-left:0px;left:0px;top:0px;margin-top:0px;"><!--截图弹窗-->
	<div class="jt_tk" >
		<!-- <ul class="sdsc_tk_top">
			<span style="margin-left: 10px;"><strong>截图</strong></span>
			<span id="jt_gb" class="sdsc_gb"></span>
		</ul> -->
		<ul style="margin-top: 40px;" class="jt_mc">
			<span>文件名：</span>
			<span><input style="width: 350px;border: 1px solid #cccccc;" type="text" id = "name"></span>
		</ul>
		<ul class="jt_mc">
			<span>储存到：</span>
			<span><input style="width: 267px; border: 1px solid #cccccc;" type="text" id = "path"></span>
			<span class="jt_tk_ll">浏览</span>
		</ul>
		<ul class="jt_tk_btn">
			<span id = "cancel">取消</span>
			<span id = "ensure">确定</span>
		</ul>
	</div>
	</div>
</body>
</html>