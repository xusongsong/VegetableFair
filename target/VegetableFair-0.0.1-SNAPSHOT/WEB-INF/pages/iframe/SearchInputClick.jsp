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
<title>map地图城市列表</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }js/map.js"></script>

<script src="${ctx }om/common/Class.js"></script>
<script src="${ctx }om/common/Util.js"></script>
<script src="${ctx }om/common/Map3D.js"></script>
<script src="${ctx }om/mapSearcher/MapSearcher.js"></script>
<script src="${ctx }om/mapSearcher/Sealing.js"></script>
<script src="${ctx }om/mapSearcher/iframeJS/SearchInputClick.js"></script>
</head>

<body>
	<!-- map页面移入搜索框展示下拉列表 -->
	<div class="lx_ss_k">
		<ul class="Associative_top">
			<!-- <span>城市列表</span> -->
			<span>热门搜索</span>
		</ul>
		<ul class="all_city"
			style="border: 0px; height: 40px; color: #404040;">
			<!-- <span style="margin-right: 10px;">杭州市</span>
			<span style="margin-right: 10px;">南京市</span>
			<span style="margin-right: 10px;">绍兴市</span>
			<span style="margin-right: 10px;">富阳市</span>
			<span style="margin-right: 10px;">嘉兴市</span>
			<span style="margin-right: 10px;">舟山市</span>
			<span style="margin-right: 10px;">曲靖市</span>
			<span style="margin-right: 10px;">测试市</span> -->
			<!-- <span style="margin-right: 10px;" id="address0"
				onclick="hotPointFlyPostion(this.id)">海康威视</span> -->
			<span style="margin-right: 10px;" id="address1"
				onclick="hotPointFlyPostion(this.id)">市民中心</span>
			<span style="margin-right: 10px;" id="address2"
				onclick="hotPointFlyPostion(this.id)">钱江新城</span>
			<span style="margin-right: 10px;" id="address3"
				onclick="hotPointFlyPostion(this.id)">西湖文化广场</span>
			<span style="margin-right: 10px;" id="address4"
				onclick="hotPointFlyPostion(this.id)">西湖景区</span>
			<span style="margin-right: 10px;" id="address5"
				onclick="hotPointFlyPostion(this.id)">火车东站</span>
		</ul>
		<!-- <ul class="Associative_top">
			<span>最近搜索</span>
		</ul>
		<div style="width: 100%; max-height: 150px; overflow: auto; overflow-x: hidden;">
			<ul class="lx_ss_k_lb">
				<span class="ss_ddw"></span>
				<span>西湖区</span>
			</ul>
			<ul class="lx_ss_k_lb">
				<span class="ss_ddw"></span>
				<span>江干区</span>
			</ul>
			<ul class="lx_ss_k_lb">
				<span class="ss_ddw"></span>
				<span>滨江区</span>
			</ul>
			<ul class="lx_ss_k_lb">
				<span class="ss_ddw"></span>
				<span>余杭区</span>
			</ul>
			<ul class="lx_ss_k_lb">
				<span class="ss_ddw"></span>
				<span>临平区</span>
			</ul>
		</div>
		<ul class="Associative_top"
			style="border: 0px; height: 40px; line-height: 40px; border-top: 1px solid #dadada; width: 100%; cursor: pointer;">
			<span class="map_qcjl"
				style="float: right; margin-right: 10px; color: #b2b2b2;">清除历史记录</span>
		</ul> -->
	</div>
</body>
</html>