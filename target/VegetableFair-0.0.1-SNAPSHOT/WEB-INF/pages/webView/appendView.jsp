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
<title>新增视点弹框</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }js/map.js"></script>
<script src="${ctx }om/common/Class.js"></script>
<script src="${ctx }om/common/Util.js"></script>
<script src="${ctx }om/common/Map3D.js"></script>

<script type="text/javascript">
	$(document).ready(function() {
		/* // 取消或关闭
		$('#cancelView,#sdgb').unbind('click').click(function() {
			var type = "0";
			return window.external.PushData(type);
		});
		// 保存
		$('#saveView').unbind('click').click(function() {
			var type = "1";
			var viewName = $("#viewName").val();
			var viewNotes = $("#viewNotes").val();
			return window.external.PushData(type + "@#" + viewName + "@#" + viewNotes);
		}); */
		
		// 取消或关闭
		$('#cancelView,#sdgb').unbind('click').click(function() {
			var type = "0";
			return window.external.PushData(type);
		});
		// 保存
		$('#saveView').unbind('click').click(function() {
			var type = "1";
			var viewName = $("#viewName").val();
			var viewNotes = $("#viewNotes").val();
			return window.external.PushData(type + "@#" + viewName + "@#" + viewNotes);
		});
		
	});
</script>
</head>
<body>
	<div class="alltk" id="tjsd" style="margin-left:0px;left:0px;top:0px;margin-top:0px;">
		<!--添加视点-->
		<div class="sdsc_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px;"><strong>添加视点</strong></span>
				<span id="sdgb" class="sdsc_gb"></span>
			</ul>
			<ul class="sdsc_mc">
				<span>名称：</span>
				<span style="float: right;"><input placeholder="视点名称"
					type="text" id="viewName"></span>
			</ul>
			<ul style="height: 60px;" class="sdsc_mc">
				<span>备注：</span>
				<span style="margin-left: 7px;"> <textarea placeholder="我的备注"
						style="float: left; width: 267px; height: 54px; outline: none; max-width: 267px;"
						id="viewNotes"></textarea>
				</span>
			</ul>
			<ul id="sd_btn" class="sdsc_tk_btn">
				<span id="cancelView">取消</span>
				<span id="saveView">保存</span>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div>
</body>
</html>