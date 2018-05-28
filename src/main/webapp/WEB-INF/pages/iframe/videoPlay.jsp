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
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<link rel="stylesheet" type="text/css" href="${ctx }css/zjg/index.css">
<script src="${ctx }/js/jquery.js"></script>
<%-- <script src="${ctx }js/zjg/index.js"></script> --%>
<script src="${ctx }om/videoResource/iframeJS/videoPlay.js"></script>
<script  type="text/javascript">
</script>
</head>
<body id="mbody" onload = "init();"  scroll="no">
    <div class="player">
        <ul class="player_top">
            <li class="player_top_left">
                <span><img src="${ctx }img/img_ZJG/logo.png"></span>
                <span><strong>平台播放器</strong></span>
            </li>
            <li class="bffs">
                <span class="ssbf">实时播放</span>
                <%--<span>历史回放</span>--%>
            </li>
            <li class="player_top_right">
                <%--<span class="sx" ></span>--%>
                <%--<span class="fd" ></span>--%>
                <span class="gb" id= "videoCancle" ></span>
            </li>
        </ul>
        <ul class="player_center">
            <li class="player_center_left">
                <div id="obj">
                    <object id="DPSDK_OCX" classid="CLSID:D3E383B6-765D-448D-9476-DFD8B499926D" style="width:480px; height:340px" codebase="DpsdkOcx.cab#version=1.0.0.0"></object>
                </div>
            </li>
           <%--  <li class="player_center_right">
                <ul class="player_center_right_top">
                    <span class="jtpd">截图片段</span>
                    <span>监控播放</span>
                </ul>
                <ul class="player_center_right_top_menu">
                </ul>
                <!-- <ul class="player_center_right_top_menu">
                    <li><span>Camera text01</span></li>
                    <li><span>Camera text01</span></li>
                    <li><span>Camera text01</span></li>
                    <li><span>Camera text01</span></li>
                    <li><span>Camera text01</span></li>
                    <li><span>Camera text01</span></li>
                </ul> -->
            </li> --%>
        </ul>
        <ul class="player_btm">

        </ul>
    </div>

 </body>
</html>