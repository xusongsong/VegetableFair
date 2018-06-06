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
<title>门禁管理</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
<script src="${ctx }js/DatePicker/jquery-1.8.3.min.js"></script>
<script src="${ctx }om/videoResource/iframeJS/lockList.js"></script>
<script src="${ctx }js/DatePicker/WdatePicker.js"></script>
<script src="${ctx }om/videoResource/dateTool.js"></script>
</head>
<body style="width: 100%;height: 100%;margin: 0px;padding: 0px;">
	<div id="mjgl" class="mj_jl" style="z-index: 9;right: 0px;">
		<div class="mj_jl_top">
			<ul style="margin-left: 10px;"><strong>小区门禁出入记录</strong></ul>
			<!--<ul class="gb"></ul>-->
			<ul class="xz" id = "flex"></ul>
			<ul class="fh"></ul>
			<ul class="mj_jl_top_menu">
				<span>起止时间：</span>
				<span><input id="StartTime" class="Wdate typetext" name="param.createTimeStart" ></span>
				<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
				<span><input id="EndTime" class="Wdate typetext" name="param.createTimeEnd"></span>
				<span class="cx" id = "lockSearch">查询</span>
				<span class="zdrq">重点人群</span>
			</ul>
		</div>
		<div class="mj_jl_btm">
			<table style="margin: auto;margin-top: 1px;" width="95%"  cellspacing="1" cellpadding="0">
				<thead>
				<tr>
					<td style="background: #eeeeee;" valign="middle" align="center"><strong>门禁编号</strong></td>
					<td style="background: #eeeeee;" valign="middle" align="center"><strong>出入时间</strong></td>
					<td style="background: #eeeeee;" valign="middle" align="center"><strong>姓名</strong></td>
					<td style="background: #eeeeee;" valign="middle" align="center"><strong>具体位置</strong></td>
					<td style="background: #eeeeee;" valign="middle" align="center"><strong>开门方式</strong></td>
					<td style="background: #eeeeee;" valign="middle" align="center"><strong>状态</strong></td>
				</tr>
				</thead>
				<tbody id = "lockListSearch">
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>