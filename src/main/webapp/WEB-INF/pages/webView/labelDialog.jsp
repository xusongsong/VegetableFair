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
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<title>新增视点弹框</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }js/map.js"></script>
<script src="${ctx }om/common/Class.js"></script>
<script src="${ctx }om/common/Util.js"></script>
<script src="${ctx }om/common/Map3D.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$("#bzgb").unbind('click').click(function(){
			var type = "0"; 
			return window.external.PushData(type);
		});
		
		$("#labelSubmit").unbind('click').click(function(){
			var type = "1";
			var labelName = $("#labelName").val();
			if(!labelName){
				alert('标注名称不能为空');
				return;
			}
			var labelMemo = $("#LabelMemo").val();
			var msg = type + "@#" + labelName + "@#" + labelMemo;
			return window.external.PushData(msg);
		});
		
		$("#labelCanel").unbind('click').click(function(){
			var type = "2";
			return window.external.PushData(type);
		});
	});
</script>
</head>
<body  style = "top:0px;left:0px;">
<div class="alltk" id="tjsd" style="margin-left:0px;left:0px;top:0px;margin-top:0px;">
		<!--添加视点-->
		<div class="sdsc_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px;"><strong>添加标注</strong></span>
				<span id="bzgb" class="sdsc_gb"></span>
			</ul>
			<ul class="sdsc_mc">
				<span>名称：</span>
				<span style="float: right;"><input placeholder="标注名称"
					type="text" id="labelName" ></span>
			</ul>
			<ul style="height: 60px;" class="sdsc_mc">
				<span>备注：</span>
				<span style="margin-left: 7px;"> <textarea placeholder="我的备注"
						style=" width: 267px; height: 54px; outline: none; max-width: 267px;"
						id="LabelMemo"></textarea>
				</span>
			</ul>
			<ul id="sd_btn" class="sdsc_tk_btn">
				<span id="labelCanel">取消</span>
				<span id="labelSubmit">保存</span>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div>
</body>
</html>