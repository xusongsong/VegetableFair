<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>资源图片展示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script language="javascript">
		function bigimg(i){
			var zoom = parseInt(i.style.zoom,10)||100;
			zoom += event.wheelDelta / 12;
			if(zoom > 0 )
			i.style.zoom=zoom+'%';
			return false;
		}
		var ie=document.all;
		var nn6=document.getElementById&&!document.all;
		var isdrag=false;
		var y,x;
		var oDragObj;

		function moveMouse(e) {
			if (isdrag) {
				oDragObj.style.top  =  (nn6 ? nTY + e.clientY - y : nTY + event.clientY - y)+"px";
				oDragObj.style.left  =  (nn6 ? nTX + e.clientX - x : nTX + event.clientX - x)+"px";
				return false;
			}
		}

		function initDrag(e) {
			var oDragHandle = nn6 ? e.target : event.srcElement;
			var topElement = "HTML";
			while (oDragHandle.tagName != topElement && oDragHandle.className != "dragAble") {
				oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
			}
			if (oDragHandle.className=="dragAble") {
				isdrag = true;
				oDragObj = oDragHandle;
				nTY = parseInt(oDragObj.style.top+0);
				y = nn6 ? e.clientY : event.clientY;
				nTX = parseInt(oDragObj.style.left+0);
				x = nn6 ? e.clientX : event.clientX;
				document.onmousemove=moveMouse;
				return false;
			}
		}
		document.onmousedown=initDrag;
		document.onmouseup=new Function("isdrag=false");
	</script>
  </head>
  
  <body>
    <div class="dragAble" id="block1" onMouseOver="dragObj=block1; drag=1;" style="z-index:10;position:absolute;" onMouseOut="" drag="0">
		<img src="${url }" alt="" style="z-index:-100;position:absolute;left:0;top:0;cursor:url('../../img/xiaoshou.cur'),auto;" onmousewheel="return bigimg(this)">
	</div>
  </body>
</html>
