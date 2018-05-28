<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
<title>查询详情页面</title>
<link rel="stylesheet" type="text/css" href="${ctx }/css/map.css">
<script src="${ctx }/js/jquery.js"></script>
<script src="${ctx }/om/common/Class.js"></script>
<script src="${ctx }/om/common/Util.js"></script>
<script src="${ctx }/om/common/Map3D.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		//对页面端传递过来的参数进行解析
		getParam();
		// 取消或关闭
		$('#sxcx_gb').unbind('click').click(function() {
			var type = "0";
			return window.external.PushData(type);
		});
	});
	//对页面端传递过来的参数进行解析
	function getParam() {
		//str : name=10号楼 & x=120.537320681 & y=31.8585748845
		var names = [];
		var values = [];
		//location对象 含有当前URL的信息. 属性 href 整个URL字符串
		var str = location.href;
		var num = str.indexOf("?");
		str = str.substr(num + 1);
		var arr = str.split("&");
		for (var i = 0; i < arr.length; i++) {
			num = arr[i].indexOf("=");
			if (num > 0) {
				var name = arr[i].substring(0, num);
				var value = arr[i].substr(num + 1);
				names.push(name);
				values.push(value);
			}
		}
		setValue(names, values);
	}
	//设置属性弹窗相应参数变量
	function setValue(names, values) {
		var name = null;
		var address = null;
		var x = null;
		var y = null;
		//获取id值
		for (var i = 0; i < names.length; i++) {
			var key = names[i];
			if(key == "name"){
				var encodename = values[i];
				name = decodeURIComponent(encodename);
			}else if(key == "address"){
				var encodeAddress = values[i];
				address = decodeURIComponent(encodeAddress);
			}else if (key == "x") {
				x = values[i];
			}else if (key == "y") {
				y = values[i];
			}
		}
		//attributeAjax(x,y);
		//$('#name').text(name?name:'详情');
		$('#address').text(address?'地址 : '+address : '名称: '+name);
	 	//$('#address').text('地址 : ' + (address?address:'无'));
		$('#jd').text('经度 : ' + (x?x:'无'));
		$('#wd').text('纬度 : ' + (y?y:'无')); 
	}
</script>
</head>
<body style="top: 0px; left: 0px;">
	<div id="sxcx_tk" class="alltk">
		<div class="map_ss_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px; font-size: 14px;" id="mainName" ><strong></strong></span>
				 <span id = "name" style="margin-left: 20px; color: #b7b7b7;">标注详情>></span>
				 <span id="sxcx_gb" class="qy_gb"></span>
			</ul>
			<ul class="q_xq">
				<li class="q_xq_lb">
					<span style="width: 55%;" id="address">名称</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 55%;" id="jd">经度</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 55%;" id="wd">纬度</span> 
				</li>
			</ul>
		</div>

		<!-- <div class="tk_zsjt"></div> -->
	</div>
</body>
</html>