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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>人脸抓拍机属性弹窗</title>
<link rel="stylesheet" type="text/css" href="${ctx }/css/map.css">
<script src="${ctx }/js/jquery.js"></script>
<script src="${ctx }/om/common/Class.js"></script>
<script src="${ctx }/om/common/Util.js"></script>
<script src="${ctx }/om/common/Map3D.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		//声明视频资源路径
		setValue();
		//点击标注关闭传递参数到父页面
		$("#faceCancel").unbind('click').click(function(){
			var type = "0"; 
			return window.external.PushData(type);
		});
		//点击预览加载视频信息
		$("#preview").unbind('click').click(function(){
			var type = "1";
			var msg = type + "@#" + faceIndexCode;
			return window.external.PushData(msg);
		});
	});
	
	var faceIndexCode = "";
	//对页面端传递过来的参数进行解析
	function getParam(){
		var urlParamArray = [];
		//location对象 含有当前URL的信息. 属性 href 整个URL字符串
		var str = location.href;
		var num = str.indexOf("?");
		str = str.substr(num + 1);
		var arr = str.split("&");
		for(var i = 0; i < arr.length; i++ ){
			num = arr[i].indexOf("=");
			if(num > 0){
				name=arr[i].substring(0,num);
	            value=arr[i].substr(num + 1);
	            var urlParam = {};
	            urlParam.name = name;
	            urlParam.value = value;
	            urlParamArray.push(urlParam);
			}
		}
		return urlParamArray;
	}
	/**
	 * 设置参数变量
	 */
	function setValue(){
		var urlParamArray = getParam();
		if(urlParamArray == null || urlParamArray == undefined){
			return;
		}
		var name = null;
		var indexCode = null;
		var pixel = null;
		var longitude = null;
		var latitude = null;
		var createTime = null;
		for(var i = 0; i < urlParamArray.length; i++){
			switch(urlParamArray[i].name){
			case 'name':
				name = urlParamArray[i].value;
				break;
			case 'indexCode':
				indexCode = urlParamArray[i].value;
				break;
			case 'pixel' :
				pixel = urlParamArray[i].value;
				break;
			case 'longitude':
				longitude = urlParamArray[i].value;
				break;
			case 'latitude':
				latitude = urlParamArray[i].value;
				break;
			case 'createTime':
				createTime = urlParamArray[i].value;
				break;
			default:
				break;
			}
		}
		$("#faceName").html("名称：" + (name === undefined?'':name));
		$("#facePixel").html("像素：" + (pixel === undefined?'':pixel) + "px");
		$("#facePoint").html("经纬度：" + (longitude === undefined?'':longitude)+";"+(latitude === undefined?'':latitude));
		$("#faceDate").html("时间：" + (createTime === undefined?'':createTime));
		faceIndexCode = indexCode;
	}
	
	function Test(a){
		imageValue = a;
		alert("初始化数值");
	}
</script>
</head>
<body  style = "top:0px;left:0px;" scroll="no">
	<div id="spzy" class="gmqp">
		<div class="alltk">
			<div class="map_ss_tk">
				<ul class="sdsc_tk_top">
					<span style="margin-left: 10px; font-size: 14px;"><strong>人脸相机</strong></span>
					<span style="margin-left: 20px;color: #ffffff;">详情>></span>
					<span class="qy_gb" id="faceCancel"></span>
				</ul>
				<ul class="q_xq">
					<li class="q_xq_lb">
						<span style="width: 80%;" id="faceName">名称：高清DS-7216HS</span>
						 <span style="width: 45%;" id="facePixel">像素：20000px</span>
					</li>
					<li class="q_xq_lb">
						<span style="width:80%;" id="facePoint">经纬度：122.2588.569844</span>
						<span style="width: 70%;" id="faceDate">时间：2016年6月</span>
					</li>
					<li class="q_xq_lb">
						<span class="yulan" id="preview">预览</span>
					</li>
				</ul>
			</div>
			<div class="tk_zsjt"></div>
		</div>
	</div>
</body>
</html>