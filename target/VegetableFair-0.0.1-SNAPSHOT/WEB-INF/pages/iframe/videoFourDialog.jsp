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
<title>视频四宫格</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }om/videoResource/iframeJS/videoFourDialog.js"></script>
</head>
<body style="background:transparent;">
	<div class="afhl" style="margin: 0px;padding: 0px;">
		<span class="sp" id = "sp"></span>
		<span class="mj" id = "mj"></span>
		<span class="fpp" id="fpp"></span>
		<span class="wf" id="wf"></span>
	</div>
</body>
</html>