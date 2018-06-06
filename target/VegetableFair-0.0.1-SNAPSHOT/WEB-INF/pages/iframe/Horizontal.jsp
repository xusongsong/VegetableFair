<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("ctx", basePath);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<title>截图完成弹窗</title>
<%-- <link rel="stylesheet" type="text/css" href="${ctx }css/map.css"> --%>
<script src="${ctx }js/jquery.js"></script>
<%-- <script src="${ctx }js/map.js"></script> --%>
</head>
<body style="width: 100%;height: 100%;margin: 0px;padding: 0px;">
	<span style="background: #ffffff;border: 1px solid #ff4513;padding:5px 10px 5px 10px;font-size: 12px;">高度：<span>192m²</span></span>
</body>
</html>