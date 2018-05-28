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
		//点击弹窗关闭传递参数到父页面
		$("#faceCancel").unbind('click').click(function(){
			var type = "0"; 
			var msg = type + "@#" + id;
			return window.external.PushData(msg);
		});
		//点击预览加载视频信息
		/* $("#preview").unbind('click').click(function(){
			var type = "1";
			var msg = type + "@#" + faceIndexCode;
			return window.external.PushData(msg);
		}); */
	});
	
	var faceIndexCode = "";
	var id = '';
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
		var values = null;
		for(var i = 0; i < urlParamArray.length; i++){
			switch(urlParamArray[i].name){
			case 'values':
				values = urlParamArray[i].value;
				break;
			case 'id'://当前弹窗的唯一身份标识
				id = urlParamArray[i].value;
				break;
			default:
				break;
			}
		}
		//将JSON字符串转为JSON对象
		var data = eval('(' + values + ')');
		//若转换后的JSON对象为空值时
		if(data == null){
			return;
		}
		//创建被抓拍人员的对象信息
		var shotPerson = {"shotSex": data.sex === undefined?'':data.sex,
							 "shotAge": data.age === undefined?'':data.age ,
							 "shotFeature": data.glass === undefined?'':data.glass,
							 "shotTime": data.alarmTime === undefined?'':data.alarmTime,
							 "cameraName":data.cameraName === undefined?'':data.cameraName,
							 "shotPicture":data.facePicUrl === undefined?'':data.facePicUrl
		}
		//获取布控对象对象
		var controlHuman = data.humans[0];
		//抓拍人员与布控人员的人脸匹配度信息
		var similarity = controlHuman.similarity;
		//创建布控人员的对象信息
		var controlPerson = {"controlName": controlHuman.humanName === undefined?'':controlHuman.humanName,
				 "controlSex": controlHuman.sex === undefined?'':controlHuman.sex,
				 "controlNation": controlHuman.ethnic === undefined?'':controlHuman.ethnic,
				 "controlBirth": controlHuman.birthday === undefined?'':controlHuman.birthday,
				 "controlAddress":controlHuman.address === undefined?'':controlHuman.address,
				 "controlPicture":controlHuman.facePicUrl === undefined?'':controlHuman.facePicUrl
		}
		//抓拍人员对象信息
		$("#shotSex").html("性别：" + shotPerson.shotSex);//性别
		$("#shotAge").html("年龄：" + shotPerson.shotAge + "岁");//年龄
		$("#shotFeature").html("是否带眼镜：" + shotPerson.shotFeature);//特征
		$("#shotTime").html("抓拍时间：" + shotPerson.shotTime);//时间
		$("#cameraName").html("抓拍机名称：" + shotPerson.cameraName);//抓拍机名称
		$("#shotPicture").attr("src", shotPerson.shotPicture);//抓拍人员图片路径
		
		$("#similarity").html(similarity + "%");//抓拍相似度
		
		//布控对象信息
		$("#controlName").html("姓名：" + controlPerson.controlName);//姓名
		$("#controlSex").html("性别：" + controlPerson.controlSex);//性别
		$("#controlNation").html("民族：" + controlPerson.controlNation);//民族
		$("#controlBirth").html("出生年月：" + controlPerson.controlBirth);//出生年月日
		$("#controlAddress").html("地址：" + controlPerson.controlAddress);//地址
		$("#controlPicture").attr("src",controlPerson.controlPicture);//布控人员图片路径
	}
</script>
</head>
<body  style = "top:0px;left:0px;" scroll="no">
<!--人脸识别弹窗-->
<!-- div id="rlsb" class="gmqp">
	<div class="alltk" style="width: 600px;">
		<div class="map_ss_tk" style="width: 600px;">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px; font-size: 14px;"><strong>人脸识别详情</strong></span>
				<span class="qy_gb" id="faceCancel"></span>
			</ul>
			<ul class="q_xq"style="width: 600px;">
				<div style="width: 600px;height: 210px" >
				<li class="q_xq_lb" style="width: 220px;height: 190px;background: #fff;margin-left:20px;;margin-bottom: 10px;float:left">
				<img id="shotPicture" style="width: 220px;height: 190px;" src="img/spjk1.png">
				</li>
				<li style="float:left;height:100px;margin-top:90px;margin-left:18px;">
					<span id="similarity">相似度:90%</span>
				</li>
				<li class="q_xq_lb" style="width: 220px;height: 190px;background: #fff;margin-left:15px;;margin-bottom: 10px;float:left">
				<img  id="controlPicture" style="width: 220px;height: 190px;" src="img/spjk1.png">
				</li>
				</div>
				<div style="width:300px;float:left;margin-left:5px;">
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="shotSex">性别：男</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="shotAge">年龄：25岁</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="shotFeature">是否带眼镜：否</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="shotTime">抓拍时间：2017-11-26&nbsp;&nbsp;11:33:33</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="cameraName">抓拍机名称：礼宾路</span>
				</li>
				</div>
				
				<div style="margin-left:352px;">
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="controlName">姓名：否</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="controlSex">性别：男</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="controlNation">民族：汉族</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="controlBirth">出生年月：2017-11-26&nbsp;&nbsp;11:33:33</span>
				</li>
				<li class="q_xq_lb" style="width: 90%;margin: auto;">
					<span id="controlAddress">地址：礼宾路</span>
				</li>
				</div>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div>
</div> -->
<!--人脸识别弹窗-->
	<div id="rlsb" class="gmqp" style="margin-left:0px;margin-top:0px;">
		<div class="alltk" style="width: 968px;">
			<div class="map_ss_tk" style="width: 968px;">
				<ul class="sdsc_tk_top">
					<span style="margin-left: 10px; font-size: 14px;"><strong>人脸预警详情</strong></span>
					<span class="qy_gb" id="faceCancel"></span>
				</ul>
				<div class="q_xq" style="width: 968px;padding: 1px 0 1px 0;height: 178px;">
					<div style="float: left;width: 258px;">
						<li class="q_xq_lb" style="width: 90%;margin-left: 30px; float: left;margin-top: 20px;">
							<span style="font-size: 16px;"><img style="margin-top: -3px;margin-right: 5px; float: left;" src="../img/zp.png"><strong style="float: left;">现场抓拍</strong></span>
						</li>
						<li class="q_xq_lb" style="width: 90%;margin-left: 30px; float: left;margin-top: 20px;">
							<span id="shotSex">性别：男</span>
						</li>
						<li class="q_xq_lb" style="width: 90%;margin: 5px 0 0 30px; float: left;">
							<span id="shotAge">年龄：25岁</span>
						</li>
						<li class="q_xq_lb" style="width: 90%;margin: 5px 0 0 30px; float: left;">
							<span id="shotFeature">是否带眼镜：否</span>
						</li>
						<li class="q_xq_lb" style="width: 90%;margin: 5px 0 0 30px; float: left;">
							<span id="shotTime">抓拍时间：2017-11-26&nbsp;&nbsp;11:33:33</span>
						</li>
						<li class="q_xq_lb" style="width: 90%;margin: 5px 0 0 30px; float: left;">
							<span id="cameraName">抓拍机名称：礼宾路</span>
						</li>
					</div>
					<li class="q_xq_lb" style="width: 154px;height: 176px;background: #fff;float: left;border: 1px solid #2f2f2f;margin: 0px;">
						<img id="shotPicture" style="width: 154px;height: 176px;" src="">
					</li>
					<li class="vs">
						<div style="background: #ff861a;color: #fff;line-height: 120px;"><strong>相似度</strong></div>
						<div style="background: #ff861a;color: #fff; line-height: 40px;" id="similarity"><strong>50%</strong></div>
					</li>
					 <li class="q_xq_lb" style="width: 154px;height: 176px;background: #fff;float: left;border: 1px solid #2f2f2f;margin: 0px;">
						<img  id="controlPicture" style="width: 154px;height: 176px;" src="">
					</li> 
				
					 
					<div style="float: left;width: 258px;height: 178px;"> 
						 <li class="q_xq_lb" style="width: 230px;;margin-left: 30px; float: left;margin-top: 20px;">
							<span style="font-size: 16px;"><img style="margin-top: -3px;margin-right: 5px; float: left;" src="../img/zp.png"><strong style="float: left;">嫌疑人</strong></span>
						</li>
						<li class="q_xq_lb" style="width: 230px;margin-left: 30px; float: left;margin-top: 20px;">
							<span id="controlName">姓名：否</span>
						</li>
						<li class="q_xq_lb" style="width: 230px;margin: 5px 0 0 30px; float: left;">
							<span id="controlSex">性别：男</span>
						</li>
						<li class="q_xq_lb" style="width: 230px;margin: 5px 0 0 30px; float: left;">
							<span id="controlNation">民族：汉族</span>
						</li>
						<li class="q_xq_lb" style="width: 230px;margin: 5px 0 0 30px; float: left;">
							<span id="controlBirth">出生年月：2017-11-26&nbsp;&nbsp;11:33:33</span>
						</li>
						<li class="q_xq_lb" style="width: 230px;margin: 5px 0 0 30px; float: left;">
							<span id="controlAddress">地址：礼宾路</span>
						</li> 
					</div>
					
				
				</div>
			</div>
			<!-- <div class="tk_zsjt"></div> -->
		</div>
	</div>
</body>
</html>