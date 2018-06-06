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
        <title>wifi管理</title>
        <link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
        <script src="${ctx }js/DatePicker/jquery-1.8.3.min.js"></script>
        <script src="${ctx }om/icgis/getClimb.js"></script>
        <script src="${ctx }js/DatePicker/WdatePicker.js"></script>
        <script src="${ctx }om/videoResource/dateTool.js"></script>
        <style>
        .mj_jl{
        width:80%;
        }
        </style>
        </head>
        <body style="width: 100%;height: 100%;margin: 0px;padding: 0px;">
        <div id="climbgl" class="mj_jl" style="z-index: 9;">
        <div class="mj_jl_top">
        <ul style="margin-left: 10px;"><strong>历史记录</strong></ul>
        <!--<ul class="gb"></ul>-->
        <ul class="xz" id ="climbFlex"></ul>
        <ul class="fh"></ul>
        <ul class="mj_jl_top_menu">
        <span>起止时间：</span>
        <span><input id="climbStartTime" class="Wdate typetext" name="param.createTimeStart"  onfocus="WdatePicker()"></span>
        <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        <span><input id="climbEndTime" class="Wdate typetext" name="param.createTimeEnd" onfocus="WdatePicker()"></span>
        <span class="cx" id = "climbSearch">查询</span>
        </ul>
        </div>
        <div class="mj_jl_btm">
        <table style="margin: auto;margin-top: 1px;" width="100%"  cellspacing="1" cellpadding="0">
        <thead>
        <tr>
        <td style="background: #eeeeee;" valign="middle" align="center"><strong>编号</strong></td>
        <td style="background: #eeeeee;" valign="middle" align="center"><strong>探头编号</strong></td>
        <td style="background: #eeeeee;" valign="middle" align="center"><strong>警报时间</strong></td>
        <td style="background: #eeeeee;" valign="middle" align="center"><strong>详情</strong></td>
        <td style="background: #eeeeee;" valign="middle" align="center"><strong>报警时长</strong></td>
        <td style="background: #eeeeee;" valign="middle" align="center"><strong>联动设备</strong></td>
        </tr>
        </thead>
        <tbody id = "climbListSearch">
        </tbody>
        </table>
        </div>
        </div>
        </body>
        </html>