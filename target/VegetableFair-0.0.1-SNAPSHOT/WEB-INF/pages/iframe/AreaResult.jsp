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
<title>区域选择列表</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }js/map.js"></script>

<script src="${ctx }om/common/Class.js"></script>
<script src="${ctx }om/common/Util.js"></script>
<script src="${ctx }om/mapSearcher/MapSearcher.js"></script>
<script src="${ctx }om/mapSearcher/iframeJS/AreaResult.js"></script>
</head>
<body>
	<!-- map页面点击区域名展示下拉列表 -->
	<div class="area_lb">
			<!-- <span>全部</span> <span>下城区</span> <span>拱墅区</span> <span>江干区</span> <span>西湖区</span>
			<span>滨江区</span> <span>萧山区</span> <span>余杭区</span> -->
	</div>
</body>
</html>