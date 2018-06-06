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
<title>视频属性弹窗</title>
<link rel="stylesheet" type="text/css" href="${ctx }/css/map.css">
<script src="${ctx }/js/jquery.js"></script>
<script src="${ctx }/om/common/Class.js"></script>
<script src="${ctx }/om/common/Util.js"></script>
<script src="${ctx }/om/common/Map3D.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		//声明视频资源路径
		getParam();
		//点击标注关闭传递参数到父页面
		$("#videoCancle").unbind('click').click(function(){
			var type = "0"; 
			return window.external.PushData(type);
		});
		//点击预览加载视频信息
		$("#preview").unbind('click').click(function(){
			var type = "1";
			var msg = type + "@#" + videoUrl;
			return window.external.PushData(msg);
		});
	});
	
	//声明视频资源路径
	var videoUrl = null;
	//对页面端传递过来的参数进行解析
	function getParam(){
		var names = [];
		var values = [];
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
	            names.push(name);
	            values.push(value);
			}
		}
		setValue(names,values);
	}
	
	//设置属性弹窗相应参数变量
	function setValue(names,values){
		var id = null;
		var parentName = null;
		//获取id值
		for(var i = 0; i < names.length; i++){
			var name = names[i];
			if(name == "id"){
				id = values[i];
			}
			if(name == "parentName"){
				parentName = values[i];
			}
		}
		var url = "http://device.sshmt.com/api/threeD/getVideo";
		var data = {
				id:id
		};
		//根据设备id获取设备信息
		$.ajax({
			url:url,
			data:data,
			type:"get",
			success:function(data){
				$("#videoParent").text(parentName + "视频信息");
				$("#videoName").text("名称："+ data.name);
				$("#videoNo").text("编号："+ data.serial_no);
				if(data.video_type == '1'){
					var type = "视频设备";
					$("#videoType").text("类型："+ type);
				}
				//$("#videoLat").text("纬度："+ data.lat);
				videoUrl = data.url;
			},
			error:function(e){
				
			}
		});	
	}
	
	function Test(a){
		imageValue = a;
		alert("初始化数值");
	}
</script>
</head>
<body  scroll="no">
<div id="spzy" class="gmqp"  style = "top:0px;left:0px;">
	<div class="alltk" style="left:0px;margin-left:0px;">
		<div class="map_ss_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px; font-size: 14px;"><strong>嘉文大厦</strong></span>
				<span style="margin-left: 20px;color: #ffffff;">详情>></span>
				<span class="qy_gb"></span>
			</ul>
			<ul class="q_xq">
				<li class="q_xq_lb">
					<span style="width: 55%;">名称：高清DS-7216HS</span>
					<span style="width: 45%;">像素：20000px</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 55%;">经纬度：122.2588.569844</span>
					<span style="width: 45%;">时间：2016年6月</span>
				</li>
				<li class="q_xq_lb">
					<span class="yulan">预览</span>
				</li>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div>
</div>
</body>
</html>