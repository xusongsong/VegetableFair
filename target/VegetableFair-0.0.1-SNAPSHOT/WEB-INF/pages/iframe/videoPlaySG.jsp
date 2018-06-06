<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("ctx", basePath);
%>
<!DOCTYPE html>
<html>
<head>
<title>视频监控播放</title>
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<link rel="stylesheet" type="text/css" href="${ctx }css/sg/ocx.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }om/videoResource/iframeJS/videoPlaySG.js"></script>
<script  type="text/javascript">
</script>
</head>
<body id="mbody" scroll="no" >
		<div class="func-point" style="width:500px;height:30px;background-color:#3794e0" >
			<span class="cancelVideo"></span>
		</div>
	    <div class="video-position" style="width:500px; height:500px">
	        <p class="pop" style="display:block">加载失败</p>
	        <input type="hidden" name="config" id="config" value="ReqType:PlayReal;wndcount:1" />
	        <!-- 添加预览控件（需要先在windows下注册） -->
	        <object classid="CLSID:7E393848-7238-4CE3-82EE-44AF444B240A" 
	        	id="PlayViewOCX" wmode="opaque" width="0" height="0" name="PlayViewOCX">
	        </object>
	    </div>
 </body>
</html>