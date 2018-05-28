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
<title>门禁开关</title>
<link rel="stylesheet" type="text/css" href="${ctx }/css/map.css">
<script src="${ctx }/js/jquery.js"></script>
<script src="${ctx }/om/common/Class.js"></script>
<script src="${ctx }/om/common/Util.js"></script>
<script src="${ctx }/om/common/Map3D.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	//根据状态值初始化页面
	 setValue();
	//点击标注关闭传递参数到父页面
	$("#lockCancel").unbind('click').click(function(){
		var type = "0"; 
		return window.external.PushData(type);
	});
	//点击预览加载视频信息
	$("#tranState").unbind('click').click(function(){
		$(this).toggleClass('mjkgclick');
		var type = "1";
		//0关闭 1开启
		var closeDoor = 0;
		if($("#tranState").hasClass("mjkg mjkgclick")){//若按钮是开启的则
			closeDoor = 1;
		}
		var msg = type + "@#" + closeDoor ;
		return window.external.PushData(msg);
	});
});

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
	var lockName = null;
	var pickDoor = null;
	var lockId = null;
	for(var i = 0; i < urlParamArray.length; i++){
		if(urlParamArray[i].name == 'lockId'){
			lockId = urlParamArray[i].value;
		}else if(urlParamArray[i].name == 'name'){
			lockName = urlParamArray[i].value;
		}else if(urlParamArray[i].name == 'pickDoor'){
			var pickDoor = urlParamArray[i].value;
		}
	}
	(lockId == null || lockId == undefined) ? '': lockId;
	(lockName == null || lockName == undefined) ? '' : lockName;
	$("#lockNo").html("编号：" + lockId);
	$("#lockAddress").html("地址：" + lockName);
	if(pickDoor == '1'){//门关闭
		if(($("#tranState").hasClass("mjkg mjkgclick"))){//若按钮是开启的则
			$("#tranState").toggleClass('mjkgclick');
		}
	}else if(pickDoor == '0'){//门开启
		if(!($("#tranState").hasClass("mjkg mjkgclick"))){//若按钮是关闭的则
			$("#tranState").toggleClass('mjkgclick');
		}
	} 
}
</script>
</head>
<body  style = "top:0px;left:0px;" scroll="no">
<!--关门气泡-->
	<div class="gmqp" style="margin-top:0px;margin-left:0px;">
		<div class="gmqp_top">
			<span style="margin-left: 10px;"><strong>门禁状态</strong></span>
			<span class="gb" id = "lockCancel" ></span>
		</div>
		<div class="gmqp_text" id = "lockNo">
		</div>
		<div class="gmqp_text" id = "lockAddress">
		</div>
		<div class="gmqp_text">
			<span class="mjkg" id = "tranState"></span>
		</div>
	</div>
</body>
</html>