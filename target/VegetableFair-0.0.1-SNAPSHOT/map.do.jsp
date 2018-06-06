<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>ALAM  DEMO</title>
    <meta content="">
      <meta http-equiv="X-UA-Compatible" content="IE=8" />
      <meta http-equiv="pragma" content="no-cache">
      <meta http-equiv="cache-control" content="no-cache">
      <meta http-equiv="expires" content="0">
      <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
      <meta http-equiv="description" content="This is my page">
  </head>
  <script type='text/javascript' src='dwr/engine.js'></script>
  <script type='text/javascript' src='dwr/util.js'></script>

  <script type="text/javascript">
        function showAlarmMessage(autoMessage){
             document.getElementById("DemoDiv").innerHTML += "<li>" + autoMessage + "</li>";
		}

        function showSnapshotMessage(autoMessage){
            document.getElementById("DemoDiv").innerHTML += "<li>" + autoMessage + "</li>";
        }
  </script>

  <body onload="dwr.engine.setActiveReverseAjax(true);dwr.engine.setNotifyServerOnPageUnload(true);">
    This is my DWR DEOM page. <hr>
    <br>
    <ul id="DemoDiv">demo</ul>
  </body>
</html>
