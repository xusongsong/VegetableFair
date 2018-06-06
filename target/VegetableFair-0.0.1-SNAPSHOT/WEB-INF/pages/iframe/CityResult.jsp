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
<title>城市选择列表</title>
<link rel="stylesheet" type="text/css" href="${ctx }css/map.css">
<script src="${ctx }js/jquery.js"></script>
<script src="${ctx }js/map.js"></script>

<script src="${ctx }om/common/Class.js"></script>
<script src="${ctx }om/common/Util.js"></script>
<script src="${ctx }om/mapSearcher/MapSearcher.js"></script>
<script src="${ctx }om/mapSearcher/iframeJS/CityResult.js"></script>
</head>
<body>
	<!-- map页面点击城市名展示下拉列表 -->
	<div>
		<ul class="Associative">
			<!-- <li class="Associative_top"><span>城市列表</span> <span
				class="Associative_top_gb"></span></li>
			<li class="City_settings"><span>当前城市：杭州市</span> <span
				class="Default_City"><u>设置为默认城市</u></span></li>
			<li class="all_city"><span>不限</span> <span>杭州市</span> <span>南京市</span>
				<span>绍兴市</span> <span>富阳市</span> <span>嘉兴市</span> <span>舟山市</span>
				<span>曲靖市</span><br> <span>F</span> <span>H</span> <span>N</span>
				<span>Q</span> <span>S</span> <span>Z</span> <span>其他</span></li>
			<li class="Alphabet_City">
				<ul class="fy">
					<li style="width: 70px; height: 25px;"><span
						style="font-size: 24px; line-height: 25px; color: #cccccc;"><strong>F</strong></span>
						<span style="margin-left: 5px;"><strong>富阳：</strong></span></li>
					<li class="city_dm"
						style="width: 320px; height: 50px; margin-top: 5px; margin-left: 5px;">
						<span>富春街道</span> <span>东洲街道</span> <span>春江街道</span> <span>鹿山街道</span>
						<span>银湖街道</span> <span>春建乡</span> <span>永昌镇</span> <span>万市镇</span>
						<span>常绿镇</span> <span>龙门镇</span> <span>渔山乡</span>
					</li>
				</ul>
				
				<ul class="fy">
					<li style="width: 70px; height: 25px;"><span
						style="font-size: 24px; line-height: 25px; color: #cccccc;"><strong>H</strong></span>
						<span style="margin-left: 5px;"><strong>杭州：</strong></span></li>
					<li class="city_dm"
						style="width: 320px; height: 50px; margin-top: 5px; margin-left: 5px;">
						<span>富春街道</span> <span>东洲街道</span> <span>春江街道</span> <span>鹿山街道</span>
						<span>银湖街道</span> <span>春建乡</span> <span>永昌镇</span> <span>万市镇</span>
						<span>常绿镇</span> <span>龙门镇</span> <span>渔山乡</span>
					</li>
				</ul>
			</li> -->
		</ul>
	</div>
</body>
</html>