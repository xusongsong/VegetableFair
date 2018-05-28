<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setAttribute("ctx", basePath);
%>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=8" />
 <meta http-equiv="pragma" content="no-cache">
 <meta http-equiv="cache-control" content="no-cache">
 <meta http-equiv="expires" content="0">
 <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
 <meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="${ctx }/css/map.css">
<link rel="stylesheet" type="text/css" href="${ctx }/css/icgis/population.css">
<!-- <link rel="stylesheet" type="text/css" href="http://192.168.10.34:9789/arcgis_js_v317_api/arcgis_js_api/library/3.17/3.17/esri/css/esri.css" /> -->
<title>基础地图</title>
<!-- ArcGIS走离线 -->
<!-- <script type="text/javascript" src="http://192.168.10.34:9789/arcgis_js_v317_api/arcgis_js_api/library/3.17/3.17/init.js"></script> -->
<!-- <script src="../om/middleWare/arcgis2.js"></script> -->
<script src="${ctx }/js/jquery.js"></script>
<script type="text/javascript">
	/** common **/
 	// 项目IP
	var projectIP="${projectIP }";
	// 项目Port
	var projectPort="${projectPort }";
	// 服务IP
	var serverIP="${serverIP }";
	// 服务Port
	var serverPort="${serverPort }";
	// 授权IP
	var authorizeIP="${authorizeIP }";
	// 授权Port
	var authorizePort="${authorizePort }";
	// 搜索框
	var inputText = "${inputText }";
	// 城市名
	var cityName = "${cityName }";
	// 区域名
	var areaName = "${areaName }";
	//7.0模型服务-默认加载类型
	var defaultLoadType = "${defaultLoadType }";
	//7.0模型服务-数据类型
	var dataType = "${dataType }";
	
	// 默认加载的DOM(影像)年份
	var defaultDOMDateValue = "${defaultDOMDateValue }";
	// 默认加载的DOM(影像)月份
	var defaultDOMMonthValue = "${defaultDOMMonthValue }";
	// 默认加载的DEM(地形)年份
	var defaultDEMDateValue = "${defaultDEMDateValue }";
	// 默认加载的DEM(地形)月份
	var defaultDEMMonthValue = "${defaultDEMMonthValue }";
	/** particular **/
	// 访问类型
	var reqType = "${reqType }";
	// 方案文件下载路径
	var planServerURL = "${planServerURL }";
	// wrl服务区域编码
	var serverAreacodeWrl = "${serverAreacodeWrl }";
	//内网关服务器ip端口
	var artemisHost = "${artemisHost }";
	//内秘钥appkey#
	var artemisAppKey= "${artemisAppKey }";
	//内秘钥appSecret#
	var artemisAppSecret = "${artemisAppSecret }";
	//播放类型
	var playType = "${playType}";
	//是否开启推送
	var realPush = "${realPush}";
</script>
<script src="${ctx }/js/map.js"></script>
<script src="${ctx }/om/common/conf/Config.js"></script>
<script src="${ctx }/om/common/Class.js"></script>
<script src="${ctx }/om/common/Util.js"></script>
<script src="${ctx }/om/common/Map3D.js"></script>
<script src="${ctx }/om/common/videoView.js"></script>
<script src="${ctx }/om/common/Together.js"></script>
<script src="${ctx }/om/mapTools/switchToolFunction.js"></script>
<script src="${ctx }/om/mapTools/switchTools.js"></script>
<script src="${ctx }/om/mapSearcher/MapSearcher.js"></script>
<script src="${ctx }/om/mapSearcher/Sealing.js"></script>
<script src="${ctx }/om/mapSearcher/Attribute.js"></script>
<script src="${ctx }/om/mapSearcher/Search.js"></script>
<script src="${ctx }/om/mapSearcher/View.js"></script>
<script src="${ctx }/om/mapSearcher/Path.js"></script>
<%-- <script src="${ctx }/om/layerManage/model.js"></script> --%>
<script src="${ctx }/om/layerManage/modelNew.js"></script>
<script src="${ctx }/om/layerManage/osgb.js"></script>
<script src="${ctx }/om/layerManage/bim.js"></script>
<script src="${ctx }/om/layerManage/terrainImage.js"></script>
<script src="${ctx }/om/layerManage/controlPlan.js"></script>
<script src="${ctx }/om/layerManage/plan.js"></script>
<script src="${ctx }/om/layerManage/createAreaHiddingForHGJ.js"></script>
<script src="${ctx }/om/layerManage/regulatoryQuery.js"></script>
<%-- <script src="${ctx }/om/videoResource/videoMonitor.js"></script> --%>
<%-- <script src="${ctx }/om/videoResource/lockControl.js"></script> --%>
<script src="${ctx }om/videoResource/labelMonitor.js"></script>
<script src="${ctx }/om/SG/videoMonitor.js"></script> 
<script src="${ctx }/om/SG/videoPatrol.js"></script> 
<script src="${ctx }/om/SG/personFace.js"></script> 
<script src="${ctx }/om/SG/zdxg.js"></script> 
<script type='text/javascript' src='${ctx }dwr/engine.js'></script>
<script type='text/javascript' src='${ctx }dwr/util.js'></script>
	<!-- <script src="../om/middleWare/ArcGISLayerTab.js"></script> -->
</head>
<body onload="init();dwr.engine.setActiveReverseAjax(true);dwr.engine.setNotifyServerOnPageUnload(true);">
	<div class="OMmap_top">
		<div class="dingweizuobiao" style="position: absolute;top: 40px;left: 30px;z-index: 9999">
			<img src="../img/fwx2.png" class="zuobiao" id="zuobiao">
		</div>
		<ul class="OMmap_top_logo">
			<li class="OMmap_top_logo_c">
				<img src="../img/logo.png">
				<span><strong>山东寿光三维公安警用系统</strong></span>
			</li>
		</ul>
	</div>
	<div class="OMmap_btm">
		<ul class="OMmap_btm_left">
			<%-- <c:forEach items="${menuList}" var="menu" varStatus="status">
				<c:if test="${menu.id == 'XT010202'&& menu.id == 'XT010203'&& menu.id == 'XT010204' }">
				<li class="k1"></li>
				</c:if>
			</c:forEach> --%>
			<c:if test="${menuList != null}">
				<li class="k2">
					<div>
						<ul class="k8">
							<span class="k3_pic"><img src="../img/spjk1.png"></span>
							<span>视频资源</span>
						</ul>
						<ul class="k8_1">
							<span class="k3_pic"><img src="../img/spjk2.png"></span>
							<span>视频资源</span>
						</ul>
					</div>
					<div>
						<ul class="k10">
							<span class="k3_pic"><img src="../img/clgl1.png"></span>
							<span>视频投影</span>
						</ul>
						<ul class="k10_1">
							<span class="k3_pic"><img src="../img/clgl2.png"></span>
							<span>视频投影</span>
						</ul>
					</div>
					<div>
						<ul class="k9">
							<span class="k3_pic"><img src="../img/rkgl1.png"></span>
							<span>人脸识别</span>
						</ul>
						<ul class="k9_1">
							<span class="k3_pic"><img src="../img/rkgl2.png"></span>
							<span>人脸识别</span>
						</ul>
					</div>
					<!-- <div>
					<ul class="k3">
						<span class="k3_pic"><img src="../img/aftc1.png"></span>
						<span>鹰眼</span>
					</ul>
					<ul class="k3_1">
						<span class="k3_pic"><img src="../img/aftc2.png"></span>
						<span>鹰眼</span>
					</ul>
					</div> -->
					<div>
						<ul class="k7">
							<span class="k3_pic"><img src="../img/afgl1.png"></span>
							<span>视频巡更</span>
						</ul>
						<ul class="k7_1">
							<span class="k3_pic"><img src="../img/afgl2.png"></span>
							<span>视频巡更</span>
						</ul>
					</div>
					<c:forEach items="${menuList}" var="menu" varStatus="status">
						<!-- 地图图层 -->
						<%-- <c:if test="${'地图图层'.equals(menu.name)&&menu.checked==true}"> --%>
						<c:if test="${menu.id == 'XT010202'}">
							<div>
								<ul class="k4">
									<span class="k3_pic"><img src="../img/dttc1.png"></span>
									<span>地图图层</span>
								</ul>
								<ul class="k4_1">
									<span class="k3_pic"><img src="../img/dttc2.png"></span>
									<span>地图图层</span>
								</ul>
							</div>
						</c:if>
					</c:forEach>
					<c:forEach items="${menuList}" var="menu" varStatus="status">
						<c:if test="${menu.id == 'XT010203'}">
							<div>
								<ul class="k5">
									<span class="k3_pic"><img src="../img/dtgj2.png"></span>
									<span>地图工具</span>
								</ul>
								<ul class="k5_1">
									<span class="k3_pic"><img src="../img/dtgj1.png"></span>
									<span>地图工具</span>
								</ul>
							</div>
						</c:if>
					</c:forEach>
					<c:forEach items="${menuList}" var="menu" varStatus="status">
						<c:if test="${menu.id == 'XT010204'}">
							<div>
								<ul class="k6">
									<span class="k3_pic"><img src="../img/scsd1.png"></span>
									<span>视点收藏</span>
								</ul>
								<ul class="k6_1">
									<span class="k3_pic"><img src="../img/scsd2.png"></span>
									<span>视点收藏</span>
								</ul>
							</div>
						</c:if>
					</c:forEach> 
				</li>
			</c:if>
		</ul>
		<ul class="btm_left_menu">
			<!--安防图层-->
       			<li class="zh_k">
<!--
       			<div class="xjbt1" style="float: left;">
					<span><strong>鹰眼</strong></span>
				</div>
-->
				<div class="ghss">
					<span><input type="text" placeholder="输入查询关键字"></span>
					<span class="ghss_an"></span>
				</div>
<!--
				<div class="yulan_btn">
					<span>预览</span>
				</div>
-->
				<div class="rfgl_lb_menu_lb">
					<span class="rfgl_lb_menu_lb_dw">
						<p class="p2">10</p>
					</span>
					<span class="rfgl_lb_menu_lb_text">
						<span>鹰眼设备FSG5748784</span>
					</span>
					<span class="rfgl_lb_menu_lb_text1">杭州市西湖区益乐路6号</span>
				</div>
				<div class="rfgl_lb_menu_lb">
					<span class="rfgl_lb_menu_lb_dw">
						<p class="p2">10</p>
					</span>
					<span class="rfgl_lb_menu_lb_text">
						<span>鹰眼设备FSG5748784</span>
					</span>
					<span class="rfgl_lb_menu_lb_text1">杭州市西湖区益乐路6号</span>
				</div>
				<div class="rfgl_lb_menu_lb">
					<span class="rfgl_lb_menu_lb_dw">
						<p class="p2">10</p>
					</span>
					<span class="rfgl_lb_menu_lb_text">
						<span>鹰眼设备FSG5748784</span>
					</span>
					<span class="rfgl_lb_menu_lb_text1">杭州市西湖区益乐路6号</span>
				</div>
				<div class="rfgl_lb_menu_lb">
					<span class="rfgl_lb_menu_lb_dw">
						<p class="p2">10</p>
					</span>
					<span class="rfgl_lb_menu_lb_text">
						<span>鹰眼设备FSG5748784</span>
					</span>
					<span class="rfgl_lb_menu_lb_text1">杭州市西湖区益乐路6号</span>
				</div>
<!--
       			<ul class="map_dttc_menu_tree_menu">
					<div class="z_menu">
						<span class="tree_icon1"><img src="img/tree_jd3.png"></span>
						<span class="tree_text1">1单元</span>
					</div>
					<span class="tree_xy"></span>
				</ul>
-->
			</li>
			<!--视频监控-->
       		<li class="zh_k">
				<div class="ghss">
					<span><input type="text" id="patrolInputText" onfocus="patrolFouces();"></span>
					<span class="ghss_an" onclick = "findPatroList(1);"></span>
				</div>
				<div class="lj_bcqc1">
					<span class="lj_bcqc_tj" onclick="recordPatrol();">绘制</span>
					<span class="lj_bcqc_bc" onclick="addPatrol();">保存</span>
					<span class="lj_bcqc_ss" onclick="cleanPatrol();">清除</span>
				</div>
				<div class="xjbt1">
					<span><strong>巡更列表</strong></span>
				</div>
				<div id="gl_menu_ljgl">
					<!-- <div class="xianshimenu3">
						<div class="jz_ssjg4">
							<span class="ss_index_menu_bh1">1</span>
							<span class="ljgh_bf">
								<span class="ddmc">巡逻路线1</span>
								<span class="sdsc_sc"></span>
								<span class="tz"></span>
								<span class="zt"></span>
								<span class="bf"></span>
							</span>
						</div>
					</div>
					<div class = "fanye">
						<div class="fanye1">
							<span style="width: 53px;">&lt;上一页</span> <span class="shuzi">111</span>
							<span class="shuzi">1</span> <span class="shuzi">1</span> <span
								style="width: 53px;">下一页&gt;</span>
						</div>
					</div>  -->
				</div>
				<!-- <div class="xianshimenu3">
					<div class="jz_ssjg4">
						<span class="ss_index_menu_bh1">2</span>
						<span class="ljgh_bf">
							<span class="ddmc">巡逻路线2</span>
							<span class="tz"></span>
							<span class="zt"></span>
							<span class="bf"></span>
						</span>
					</div>
				</div>
				<div class="xianshimenu3">
					<div class="jz_ssjg4">
						<span class="ss_index_menu_bh1">3</span>
						<span class="ljgh_bf">
							<span class="ddmc">巡逻路线3</span>
							<span class="tz"></span>
							<span class="zt"></span>
							<span class="bf"></span>
						</span>
					</div>
				</div> -->
			</li>
			<!--安防管理-->
       		<li class="zh_k">
				<!-- <div class="kgsj_top_menu">
					<ul class="kgsj_top">
						<li class="kgfa">视频监控</li>
						<li>门禁管理</li>
						<li>防攀爬管理</li>
						<li>Wifi管理</li>
					</ul>
				</div> -->
				<div class="afgl_menu">
				<!-- 	<ul class="xxmenu">
						<div class="ghss">
							<span><input type="text" placeholder="输入查询关键字" id = "videoSearch"></span>
							<span id="sj_btn" class="ghss_an" onclick = "videoSearch();"></span>
						</div>
						<div class="map_dttc_menu_tree" id = "videoList" style = "height:800px;">
						</div>
					</ul>
					<ul class="xxmenu">
						<div class="ghss">
							<span><input type="text" placeholder="输入查询关键字" id = "lockSearch"></span>
							<span id="sj_btn" class="ghss_an" onclick = "lockSearch();"></span>
						</div>
						<div class="mjkz">
							<span class="jk" onclick = "playLockVideo();"></span>
							<span class="g" onclick = "closeDoor();"></span>
							<span class="k" onclick = "openDoor();"></span>
						</div>
						<div class="map_dttc_menu_tree" id = "lockList">
						</div>
						<div>
							<table style="margin: auto;margin-top: 10px;" width="272"  cellspacing="1" cellpadding="0">
								<thead>
								<tr>
									<td style="background: #e9eaec;" valign="middle" colspan="4"><strong>&nbsp;&nbsp;&nbsp;&nbsp;门禁状态</strong></td>
								</tr>
								<tr>
									<td style="background: #f0f3f4;" valign="middle" align="center">设备编号</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">故障</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">定位</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">地址</td>
								</tr>
								</thead>
								<tbody id = "lockState">
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								</tbody>
							</table>
						</div>
						<div class="pagenumber" id = "lockStatePage">
							<li class="pagenumber_k">
								<div><</div>
								<span class="one">1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
								<div>></div>
							</li>
						</div>
						
					</ul> -->
					<ul>
						<div class="ghss">
							<span><input type="text" placeholder="输入查询关键字" id='videoSearch'></span>
							<span class="ghss_an" onclick = "videoSearchInfo();"></span>
						</div>
						<div class="map_dttc_menu_tree" id="videoList">
						</div>
<!--
						<div>
							<table style="margin: auto;margin-top: 10px;" width="272"  cellspacing="1" cellpadding="0">
								<tr>
									<td style="background: #e9eaec;" valign="middle" colspan="4"><strong>&nbsp;&nbsp;&nbsp;&nbsp;门禁警报</strong></td>
								</tr>
								<tr>
									<td style="background: #f0f3f4;" valign="middle" align="center">设备编号</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">故障</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">定位</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">操作</td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
							</table>
						</div>
-->
<!--
						<div class="pagenumber">
							<li class="pagenumber_k">
								<div><</div>
								<span class="one">1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
								<div>></div>
							</li>
						</div>
-->
					</ul>
					<ul>
						<div class="ghss">
							<span><input type="text" placeholder="输入查询关键字"></span>
							<span class="ghss_an"></span>
						</div>
						<div class="map_dttc_menu_tree">
							<div class="zjd">
								<div style="width: 224px;height: 16px;float: left;">
									<span class="tree_xl"></span>
									<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="../img/tree_jd1.png"></span>
									<span>沙工新村</span>
								</div>
								<span class="tree_xy"></span>
							</div>
							<div>
								<div class="zjd1" style="margin-left: 20px;width: 244px;">
									<div style="width: 184px;height: 16px;float: left;">
										<span class="tree_xl"></span>
										<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="../img/tree_jd2.png"></span>
										<span>43幢</span>
									</div>
									<span class="tree_xy"></span>
								</div>
								<div>
									<div class="zjd2" style="margin-left: 40px;width: 224px;">
										<div style="width: 204px;height: 16px;float: left;">
											<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="../img/tree_jd3.png"></span>
											<span>1单元</span>
										</div>
										<span class="tree_xy"></span>
									</div>
									<div class="zjd2" style="margin-left: 40px;width: 224px;">
										<div style="width: 204px;height: 16px;float: left;">
											<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="../img/tree_jd3.png"></span>
											<span>2单元</span>
										</div>
										<span class="tree_xy"></span>
									</div>
									<div class="zjd2" style="margin-left: 40px;width: 224px;">
										<div style="width: 204px;height: 16px;float: left;">
											<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="../img/tree_jd3.png"></span>
											<span>3单元</span>
										</div>
										<span class="tree_xy"></span>
									</div>
								</div>
							</div>
						</div>
						<div>
							<table style="margin: auto;margin-top: 10px;" width="272"  cellspacing="1" cellpadding="0">
								<tr>
									<td style="background: #e9eaec;" valign="middle" colspan="4"><strong>&nbsp;&nbsp;&nbsp;&nbsp;防攀爬管理</strong></td>
								</tr>
								<tr>
									<td style="background: #f0f3f4;" valign="middle" align="center">设备编号</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">故障</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">定位</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">操作</td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
							</table>
						</div>
					</ul>
					<ul>
						<div class="ghss">
							<span><input type="text" placeholder="输入查询关键字"></span>
							<span class="ghss_an"></span>
						</div>
						<div class="map_dttc_menu_tree">
							<div class="zjd">
								<div style="width: 224px;height: 16px;float: left;">
									<span class="tree_xl"></span>
									<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="../img/tree_jd1.png"></span>
									<span>沙工新村</span>
								</div>
								<span class="tree_xy"></span>
							</div>
							<div>
								<div class="zjd1" style="margin-left: 20px;width: 244px;">
									<div style="width: 184px;height: 16px;float: left;">
										<span class="tree_xl"></span>
										<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="../img/tree_jd2.png"></span>
										<span>43幢</span>
									</div>
									<span class="tree_xy"></span>
								</div>
								<div>
									<div class="zjd2" style="margin-left: 40px;width: 224px;">
										<div style="width: 204px;height: 16px;float: left;">
											<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="../img/wifi.png"></span>
											<span>1单元</span>
										</div>
										<span class="tree_xy"></span>
									</div>
									<div class="zjd2" style="margin-left: 40px;width: 224px;">
										<div style="width: 204px;height: 16px;float: left;">
											<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="../img/wifi.png"></span>
											<span>2单元</span>
										</div>
										<span class="tree_xy"></span>
									</div>
									<div class="zjd2" style="margin-left: 40px;width: 224px;">
										<div style="width: 204px;height: 16px;float: left;">
											<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="../img/wifi.png"></span>
											<span>3单元</span>
										</div>
										<span class="tree_xy"></span>
									</div>
								</div>
							</div>
						</div>
						<div>
							<table style="margin: auto;margin-top: 10px;" width="272"  cellspacing="1" cellpadding="0">
								<tr>
									<td style="background: #e9eaec;" valign="middle" colspan="4"><strong>&nbsp;&nbsp;&nbsp;&nbsp;Wifi管理</strong></td>
								</tr>
								<tr>
									<td style="background: #f0f3f4;" valign="middle" align="center">设备编号</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">故障</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">定位</td>
									<td style="background: #f0f3f4;" valign="middle" align="center">操作</td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw1.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
								<tr>
									<td valign="middle" align="center">A00001</td>
									<td style="color: red;" valign="middle" align="center">无信号</td>
									<td valign="middle" align="center"><img style="margin-top: 4px;" src="../img/af_dw2.png"></td>
									<td valign="middle" align="center"></td>
								</tr>
							</table>
						</div>
					</ul>
				</div>
			</li>
<!--      		人口管理-->
       		<li class="zh_k" style="height: 100%;">
				<div class="kgsj_top_menu" style="height: 100%;">
<!--
					<ul class="rkgl_top">
						<li class="kgfa">人房查询</li>
						<li>统计分析</li>
						<li>健康管理</li>
					</ul>
-->
					<div class="rkgl_menu" style="height: 100%;">
						<ul style="height: 100%;">
							<div class="rlsb_menu">
								<div class="rlsb_menu_qh">
									<span style="margin-left: 10px;" class="rlsb_menu_qh_kgfx">设备列表</span>
									<span>识别结果</span>
									<span>预警信息</span>
								</div>
							</div>
							<div class="rlsb">
<!--
								<div class="ghss">
									<span><input type="text" placeholder="输入查询关键字" style="width: 110px;"></span>
									<span class="ghss_an"></span>
								</div>
-->
							
								<div class="ghss">
									<span><input type="text" placeholder="输入查询关键字"></span>
									<span class="ghss_an"></span>
								</div>
								<div class="lj_bcqc1" style="width: 126px;margin-bottom: 10px;">
									<span class="lj_bcqc_bc"  onclick="faceListCheck();">预览</span>
									<span class="lj_bcqc_ss" id="checkAll" onclick="faceChooseAll();" value = "0">全选</span>
								</div>
								<!-- <div class="yulan_btn">
									<span style="margin-right:10px;" onclick="faceListCheck();">预览</span>
								</div> -->
								<div class="map_dttc_menu_tree" style="height: 100%;" >
									<div class="rfcx_menu" id="faceList">
										<div class="rfgl_lb_menu_lb">
											<span class="rfgl_lb_menu_lb_dw">
												<p class="p1">1</p>
											</span>
											<span class="rfgl_lb_menu_lb_text">
												<span>王晓美食</span>
											</span>
											<span class="rfgl_lb_menu_lb_text1">杭州市西湖区益乐路6号</span>
<!--											<span class="rfgl_lb_menu_lb_pic1"><img src="img/ry_pic.png"></span>-->
										</div>
										<div class="rfgl_lb_menu_lb">
											<span class="rfgl_lb_menu_lb_dw">
												<p class="p2">10</p>
											</span>
											<span class="rfgl_lb_menu_lb_text">
												<span>王晓美食</span>
											</span>
											<span class="rfgl_lb_menu_lb_text1">杭州市西湖区益乐路6号</span>
<!--											<span class="rfgl_lb_menu_lb_pic1"><img src="img/ry_pic.png"></span>-->
										</div>
									</div>
								</div>
							</div>
							<div class="rlsb">
								<div class="real_rlsb">
									<div class="sbjg" id="realList">
									</div>
								</div>
							</div>
							<div class="rlsb">
								<div class="real_rlsb">
									<div class="sbjg" id="alarmList">
									</div>
								</div>
							</div>
						</ul>
<!--
						<ul>
							<div class="map_dttc_menu_tree" style="height: 260px;margin-bottom: 10px;">
								<div class="zjd">
									<div style="width: 224px;height: 16px;float: left;">
										<span class="tree_xl"></span>
										<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="img/tree_jd1.png"></span>
										<span>沙工新村</span>
									</div>
									<span class="tree_xy"></span>
								</div>
								<div>
									<div class="zjd1" style="margin-left: 20px;width: 244px;">
										<div style="width: 184px;height: 16px;float: left;">
											<span class="tree_xl"></span>
											<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="img/tree_jd2.png"></span>
											<span>43幢</span>
										</div>
										<span class="tree_xy"></span>
									</div>
									<div>
										<div class="zjd2" style="margin-left: 40px;width: 224px;">
											<div style="width: 204px;height: 16px;float: left;">
												<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="img/tree_jd3.png"></span>
												<span>1单元</span>
											</div>
											<span class="tree_xy"></span>
										</div>
										<div class="zjd2" style="margin-left: 40px;width: 224px;">
											<div style="width: 204px;height: 16px;float: left;">
												<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="img/tree_jd3.png"></span>
												<span>2单元</span>
											</div>
											<span class="tree_xy"></span>
										</div>
										<div class="zjd2" style="margin-left: 40px;width: 224px;">
											<div style="width: 204px;height: 16px;float: left;">
												<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="img/tree_jd3.png"></span>
												<span>3单元</span>
											</div>
											<span class="tree_xy"></span>
										</div>
									</div>
								</div>
							</div>
							<div class="tjfx_menu">
								<span style="margin-left: 10px;">男女人口比例</span>
								<span class="tjfx_jt"></span>
							</div>
							<div class="tjfx_next_menu">
								<table style="margin: auto;" width="96%" cellspacing="1" cellpadding="0">
									<tr>
										<td style="background: #e9eaec;" colspan="4"><strong>&nbsp;&nbsp;&nbsp;&nbsp;男女人口人数</strong></td>
									</tr>
									<tr>
										<td align="center" style="background: #e9eaec;" width="25%">单元</td>
										<td align="center" style="background: #e9eaec;" width="25%">男</td>
										<td align="center" style="background: #e9eaec;" width="25%">女</td>
										<td align="center" style="background: #e9eaec;" width="25%">合计</td>
									</tr>
									<tr>
										<td align="center" style="background: #f0f3f4;">1单元</td>
										<td align="center">20</td>
										<td align="center">20</td>
										<td align="center">40</td>
									</tr>
									<tr>
										<td align="center" style="background: #f0f3f4;">2单元</td>
										<td align="center">20</td>
										<td  align="center">20</td>
										<td align="center">40</td>
									</tr>
									<tr>
										<td align="center" style="background: #f0f3f4;">2单元</td>
										<td align="center">20</td>
										<td align="center">20</td>
										<td align="center">40</td>
									</tr>
									<tr>
										<td align="center" style="background: #e9eaec;">累计</td>
										<td align="center" style="background: #e9eaec;">60</td>
										<td align="center" style="background: #e9eaec;">60</td>
										<td align="center" style="background: #e9eaec;">120</td>
									</tr>
								</table>
							</div>
							<div class="tjfx_menu">
								<span style="margin-left: 10px;">户籍类型比例</span>
								<span class="tjfx_jt"></span>
							</div>
							<div class="tjfx_next_menu">2</div>
							<div class="tjfx_menu">
								<span style="margin-left: 10px;">健康状况</span>
								<span class="tjfx_jt"></span>
							</div>
							<div class="tjfx_next_menu">3</div>
							<div class="tjfx_menu">
								<span style="margin-left: 10px;">婚姻状况</span>
								<span class="tjfx_jt"></span>
							</div>
							<div class="tjfx_next_menu">4</div>
							<div class="tjfx_menu">
								<span style="margin-left: 10px;">文化程度</span>
								<span class="tjfx_jt"></span>
							</div>
							<div class="tjfx_next_menu">5</div>
							<div class="tjfx_menu">
								<span style="margin-left: 10px;">政治面貌</span>
								<span class="tjfx_jt"></span>
							</div>
							<div class="tjfx_next_menu">6</div>
							<div class="tjfx_menu">
								<span style="margin-left: 10px;">年龄分布</span>
								<span class="tjfx_jt"></span>
							</div>
							<div class="tjfx_next_menu">7</div>
						</ul>
						<ul>
							<div class="ghss">
								<span><input type="text" placeholder="姓名或身份证号"></span>
								<span id="jkglss_btn" class="ghss_an"></span>
							</div>
							<div class="jkgl_menu">
								<div style="margin-top: 0px" class="kjfx_fg"><span><strong>健康统计</strong></span></div>
								<div class="jblx">
									<span>疾病类型：</span>
									<select>
										<option>高血压</option>
										<option>心脏病</option>
										<option>高血糖</option>
									</select>
								</div>
								<div style="margin-top: 0px" class="kjfx_fg"><span><strong>年龄分布</strong></span></div>
							</div>
							<div class="jkgl_menu">
								<div class="xqss_index_top">
									<span class="xqss_index_top_fh">&nbsp;<&nbsp;&nbsp;返回</span>
									<span class="ss_index_top_r">搜索结果</span>
								</div>
								<div class="map_dttc_menu_tree" style="height:700px;margin-top: 10px;">
									<div class="jkgl_ss_menu">
										<span class="jkgl_ss_menu_pic"></span>
										<span class="jkgl_ss_menu_text">姓名：</span>
										<span class="jkgl_ss_menu_text">性别：</span>
										<span class="jkgl_ss_menu_text">年龄：</span>
										<span class="jkgl_ss_menu_text">电话：</span>
									</div>
									<div class="jkgl_t">最新监测结果</div>
									<div class="jkgl_t1">
										<img src="img/xy.png"><span>血压</span>
									</div>
									<div class="jkmenu">
										<span>高压：</span>
										<span>低压：</span>
									</div>
									<div class="jkgl_t1">
										<img src="img/xl.png"><span>心率</span>
									</div>
									<div class="jkmenu">
										<span>心率：</span>
									</div>
									<div class="jkgl_t1">
										<img src="img/xt.png"><span>血糖</span>
									</div>
									<div class="jkmenu">
										<span>血糖：</span>
									</div>
								</div>
							</div>
						</ul>
-->
					</div>
				</div>
			</li>
<!--      		车辆管理-->
       		<li class="zh_k">
<!--
				<div class="xjbt1">
					<span><strong>视频列表</strong></span>
				</div>
-->
				<div class="ghss">
					<span><input type="text" placeholder="输入查询关键字"></span>
					<span class="ghss_an"></span>
				</div>
						<div class="map_dttc_menu_tree">
							<div class="zjd">
								<div>
									<span class="tree_xl"></span>
									<span class="pic"><img src="../img/tree_jd1.png"></span>
									<span>国际会展中心</span>
								</div>
								<span class="tree_xy" id="ty"></span>
							</div>
							<div>
								<div class="zjd2" style="margin-left: 35px;width: 224px;">
									<div>
										<span class="pic"><img src="../img/ss_ico.png"></span>
										<span class="gm" style="width: 170px;">洛兴街与尧河路-东后</span>
									</div>
									<span class="tree_xy"  id="ty1"  onclick="openty(1);"></span>
								</div>
								<div class="zjd2" style="margin-left: 35px;width: 224px;">
									<div>
										<span class="pic"><img src="../img/ss_ico.png"></span>
										<span class="gm" style="width: 170px;" >洛兴街与顺河路-东</span>
									</div>
									<span class="tree_xy" id="ty2" onclick="openty(2);"></span>
								</div>
								<div class="zjd2" style="margin-left: 35px;width: 224px;">
									<div>
										<span class="pic"><img src="../img/ss_ico.png"></span>
										<span class="gm" style="width: 170px;" >圣城街与顺河路-东后</span>
									</div>
									<span class="tree_xy" id="ty3" onclick="openty(3);"></span>
								</div>
								<div class="zjd2" style="margin-left: 35px;width: 224px;">
									<div>
										<span class="pic"><img src="../img/ss_ico.png"></span>
										<span class="gm" style="width: 170px;">圣城街与尧河路-东</span>
									</div>
									<span class="tree_xy"  id="ty4" onclick="openty(4);"></span>
								</div>
							</div>
						</div>
<!--
				<div class="rfgl_lb_menu_lb">
					<span class="rfgl_lb_menu_lb_dw">
						<p class="p1">1</p>
					</span>
					<span class="rfgl_lb_menu_lb_text">
						<span>王晓美食</span>
					</span>
					<span class="rfgl_lb_menu_lb_text1"></span>
				</div>
-->
<!--
				<div class="clgl_top">
					<span id="sbgl" class="kgfa">设备管理</span>
					<span class="gjgl">轨迹管理</span>
				</div>
-->
<!--
				<div id="sbgl1" class="clgl_menu">
					<div class="ghss">
						<span><input type="text" placeholder="输入查询关键字"></span>
						<span class="ghss_an"></span>
					</div>
					<div class="map_dttc_menu_tree">
						<div class="zjd">
							<div style="width: 224px;height: 16px;float: left;">
								<span class="tree_xl"></span>
								<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="img/tree_jd1.png"></span>
								<span>沙工新村</span>
							</div>
							<span class="tree_xy"></span>
						</div>
						<div>
							<div class="zjd1" style="margin-left: 20px;width: 244px;">
								<div style="width: 184px;height: 16px;float: left;">
									<span class="tree_xl"></span>
									<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="img/tree_jd2.png"></span>
									<span>43幢</span>
								</div>
								<span class="tree_xy"></span>
							</div>
							<div>
								<div class="zjd2" style="margin-left: 40px;width: 224px;">
									<div style="width: 204px;height: 16px;float: left;">
										<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="img/tree_jd3.png"></span>
										<span>1单元</span>
									</div>
									<span class="tree_xy"></span>
								</div>
								<div class="zjd2" style="margin-left: 40px;width: 224px;">
									<div style="width: 204px;height: 16px;float: left;">
										<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="img/tree_jd3.png"></span>
										<span>2单元</span>
									</div>
									<span class="tree_xy"></span>
								</div>
								<div class="zjd2" style="margin-left: 40px;width: 224px;">
									<div style="width: 204px;height: 16px;float: left;">
										<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="img/tree_jd3.png"></span>
										<span>3单元</span>
									</div>
									<span class="tree_xy"></span>
								</div>
							</div>
						</div>
					</div>
					<div class="qucll">
						<div class="qucll_top">
							<img src="img/clgl_ico1.png">
							<span><strong>社区车辆流</strong></span>
							<span class="clnumber">&nbsp;&nbsp;45&nbsp;&nbsp;辆</span>
						</div>
						<div class="qucll_btm">
							<div class="qucll_btm_menu">
								<img src="img/yzc.png">
								<span class="clxx"><strong>业主车辆</strong></span>
								<span class="clxx1">25辆</span>
							</div>
							<div class="qucll_btm_menu" style="border-left:1px solid #dcdcdc;">
								<img src="img/wlc.png">
								<span class="clxx"><strong>外来车辆</strong></span>
								<span class="clxx1">20辆</span>
							</div>
						</div>
					</div>
				</div>
				<div class="clgl_menu">1</div>
-->
			</li>
			<li id="dttc" class="zh_k">
				<div class="tcgl_menu">
					<div class="tcgl_menu_qh">
						<span class="tcgl_menu_qh_kgfx">三维模型</span> 
						<span onclick="getOSGBList();">倾斜摄影</span> 
						<!-- <span onclick="getBimList();">BIM</span> -->
					</div>
				</div>
				<ul class="map_dttc_menu">
					 <div class="map_dttc_menu_ss">
						<span>当前位置：</span> 
						<span> 
						<!-- <input type="text" value="苏州市" readonly="true" onfocus=this.blur()> -->
							<input type="text" id="currentCity"  disabled="disabled">
						</span>
						
							<!-- <select>
									<option>杭州市</option>
							</select> -->
						
					</div>  
					<div class="map_dttc_menu_tree"  id="modelList"
						style="overflow: auto; overflow-x: hidden;height:730px;width:100%" >
						<!-- <ul id="tree_g1" class="map_dttc_menu_tree_menu">
							<div id="tree_z1" class="z_menu">
								<span class="tree_xl"></span> <span class="tree_icon"></span> <span
									class="tree_text">西湖区1</span>
							</div>
							<span class="tree_xy"></span>
						</ul>
						<div class="tree_k1">
							<ul id="tree_g2" class="map_dttc_menu_tree_menu">
								<div id="tree_z2" class="z_menu">
									<span style="margin-left: 20px;" class="tree_xl"></span> <span
										class="tree_icon"></span> <span class="tree_text">地形</span>
								</div>
								<span class="tree_xy"></span>
							</ul>
							<div class="tree_k1_1">
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
							</div> -->


						<!--  <ul id="tree_g4" class="map_dttc_menu_tree_menu">
								<div id="tree_z4" class="z_menu">
									<span style="margin-left: 20px;" class="tree_xl"></span> <span
										class="tree_icon"></span> <span class="tree_text">模型</span>
								</div>
								<span class="tree_xy"></span>
							</ul>
							<div class="tree_k1_2">
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
							</div>


							<ul id="tree_g5" class="map_dttc_menu_tree_menu">
								<div id="tree_z5" class="z_menu">
									<span style="margin-left: 20px;" class="tree_xl"></span> <span
										class="tree_icon"></span> <span class="tree_text">矢量</span>
								</div>
								<span class="tree_xy"></span>
							</ul>
							<div class="tree_k1_3">
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
							</div>
						</div> -->
					</div>
				</ul>
				<ul class="map_dttc_menu" id="osgbList">
					<!-- <div class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div> -->
				</ul>
				<ul class="map_dttc_menu" id="bimList">
					<!-- <div class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_xy"></span>
					</div> -->
				</ul>
			</li>
			<li class="zh_k">
				<div
					style="width: 100%; height: 85%; overflow: auto; overflow-x: hidden;">
					<c:forEach items="${menuList}" var="menu" varStatus="status">
						<c:if test="${menu.id == 'XT01020301'}">
							<div style="margin-top: 13px;" class="kjfx_fg">
								<span><strong>漫游模式</strong></span>
							</div>
							<div class="dtgj_top" id="roamMode">
								<ul class="dtgj_top_xsgj" id="walk">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/bx_icon.png"></span>
									<span class="dtgj_top_kjfx_text">步行</span>
								</ul>
								<ul class="dtgj_top_xsgj" id="drive">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/cx_icon.png"></span>
									<span class="dtgj_top_kjfx_text">车行</span>
								</ul>
								<ul class="dtgj_top_xsgj" id="fly">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/fx_icon.png"></span>
									<span class="dtgj_top_kjfx_text">飞行</span>
								</ul>
							</div>
						</c:if>
					</c:forEach>
					<c:forEach items="${menuList}" var="menu" varStatus="status">
						<c:if test="${menu.id == 'XT01020302'}">
							<div class="kjfx_fg">
								<span><strong>测量工具</strong></span>
							</div>
							<div class="dtgj_top">
								<ul class="dtgj_top_xsgj" id="spcl">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/spcl_icon.png"></span>
									<span class="dtgj_top_kjfx_text">水平测量</span>
								</ul>
								<ul class="dtgj_top_xsgj" id="czcl">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/czcl_icon.png"></span>
									<span class="dtgj_top_kjfx_text">垂直测量</span>
								</ul>
								<ul class="dtgj_top_xsgj" id="mjcl">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/mjcl_icon.png"></span>
									<span class="dtgj_top_kjfx_text">面积测量</span>
								</ul>
								<ul class="dtgj_top_xsgj" id="kjcl">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/kjcl_icon.png"></span>
									<span class="dtgj_top_kjfx_text">空间测量</span>
								</ul>
							</div>
						</c:if>
					</c:forEach>
					<c:forEach items="${menuList}" var="menu" varStatus="status">
						<c:if test="${menu.id == 'XT01020303'}">
							<div class="kjfx_fg">
								<span><strong>场景管理</strong></span>
							</div>
							<div class="dtgj_top">
								<ul id="bjgl" class="dtgj_top_xsgj">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/bzgl_icon.png"></span>
									<span class="dtgj_top_kjfx_text">标注管理</span>
								</ul>
								<ul id="ljgl" class="dtgj_top_xsgj">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/ljgl_icon.png"></span>
									<span class="dtgj_top_kjfx_text">路径管理</span>
								</ul>
							</div>
						</c:if>
					</c:forEach>
					<c:forEach items="${menuList}" var="menu" varStatus="status">
						<c:if test="${menu.id == 'XT01020304'}">
							<div class="kjfx_fg">
								<span><strong>空间分析</strong></span>
							</div>
							<div class="dtgj_top">
								<ul id="kgfx" class="dtgj_top_xsgj">
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/kgfx_icon.png"></span>
									<span class="dtgj_top_kjfx_text">控高分析</span>
								</ul>
								<ul id="tsfx" class="dtgj_top_xsgj" >
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/tsfx_icon.png"></span>
									<span class="dtgj_top_kjfx_text">通视分析</span>
								</ul>
								<ul  id="syfx" class="dtgj_top_xsgj" >
									<span class="dtgj_top_kjfx_pic"><img
										src="../img/syfx_icon.png"></span>
									<span class="dtgj_top_kjfx_text">视域分析</span>
								</ul>
							</div>
						</c:if>
					</c:forEach>
				</div>
			</li>
			<li class="zh_k">
				<div class="sdsc_top">
					点击“<span style="color: #4fa1ff;">保存当前视点</span>”按钮，即可保存视点。
				</div>
				<div class="sdsc_btn"></div>
				<div class="sdgl_menu">
					<div style="background: #f4f4f4;" class="sdgl_menu_qh">
						<span style="margin-left: 10px;" class="sdgl_menu_qh_kgfx">视点收藏</span>
					</div>
				</div>
				<div class="bzxg_menu_sd">
					<ul class="bzxg_menu_mc">名称：<input type="text" id="viewInputText" value="西湖文化广场"></ul>
						<ul class="bzxg_menu_mc">类型：</ul>
						<ul class="tjbz_mc">
							<span>备注：</span>
							<span style="margin-left: 7px;">
								<textarea placeholder="我的备注" style="width: 210px;height: 54px;outline: none;max-width: 210px;max-height: 54px;" id="viewTextarea"></textarea>
							</span>
						</ul>
						<ul class="bzxg_menu_btn">
							<span id="modifySure">确定</span>
							<span id="modifyErase">取消</span>
					</ul>
				</div>
				<div class="sdsc_lb">
				
					<!-- <ul class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj" id="sdxg"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul> -->
				</div>
			</li>
			<li class="zh_k">
				<div class="map_ss_jg">
					<!--点击搜索内容-->
					 <ul class="map_ss_jg_top">
						<span style="margin-left: 10px;">共搜到</span>
						<span style="color: red;">25</span>
						<span>个记录</span>
						<span
							style="width: 1px; height: 16px; margin-left: 10px; margin-top: 8px; margin-right: 10px; background: #dcdcdc;"></span>
						<span class="jhxs_gx"></span>
						<span style="margin-left: 4px; color: #999999;">聚合显示</span>
						<span class="map_ss_jg_gb"></span>
					</ul>

					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">1</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖倾斜摄影</span>
								<span class="qxsy_tk_btn">详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">面</span>
							</ul>
						</li>
						<li class="map_ss_jg_lb_menu_icon"><span class="zst_cion"><img
								src="../img/bx1.png"><img class="icon1"
								src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1"
								src="../img/cx2.png"></span> <span class="zst_cion"><img
								src="../img/fx1.png"><img class="icon1"
								src="../img/fx2.png"></span> <span class="map_ss_jg_fg"></span> <span
							class="zst_cion"><img src="../img/hs1.png"><img
								class="icon1" src="../img/hs2.png"></span> <span
							class="map_ss_jg_fg"></span></li>
						<li class="map_ss_jg_lb_menu_icon"><span class="zst_cion"><img
								src="../img/zst_icon.png"><img class="icon1"
								src="../img/zst_icon1.png"></span> <span class="zst_cion"><img
								src="../img/fst_icon.png"><img class="icon1"
								src="../img/fst_icon1.png"></span> <span class="zst_cion"><img
								src="../img/ldj1.png"><img class="icon1"
								src="../img/ldj2.png"></span> <span class="zst_cion"><img
								src="../img/swdj1.png"><img class="icon1"
								src="../img/swdj2.png"></span> <span class="zst_cion"><img
								src="../img/jsdj1.png"><img class="icon1"
								src="../img/jsdj2.png"></span> <span class="map_ss_jg_fg"></span>
							<span class="zst_cion"><img src="../img/fwx1.png"><img
								class="icon1" src="../img/fwx2.png"></span> <span
							class="zst_cion"><img src="../img/ssjg_xy1.png"><img
								class="icon1" src="../img/ssjg_xy2.png"></span> <span
							style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span></li>
					</ul>

					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">2</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖博物馆</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">点</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/zst_icon.png"><img
								class="icon1" src="../img/zst_icon1.png"></span> <span
								class="zst_cion"><img src="../img/fst_icon.png"><img
								class="icon1" src="../img/fst_icon1.png"></span> <span
								class="zst_cion"><img src="../img/ldj1.png"><img
								class="icon1" src="../img/ldj2.png"></span> <span
								class="zst_cion"><img src="../img/swdj1.png"><img
								class="icon1" src="../img/swdj2.png"></span> <span
								class="zst_cion"><img src="../img/jsdj1.png"><img
								class="icon1" src="../img/jsdj2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/ssjg_xy1.png"><img class="icon1"
								src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>

					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">3</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖区</span>
								<span class="qy_tk_btn">详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">区</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/fwx1.png"><img class="icon1"
								src="../img/fwx2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>


					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">4</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖区景区</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">面</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span title="范围线" class="zst_cion"><img
								src="../img/fwx1.png"><img class="icon1"
								src="../img/fwx2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>

					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">5</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1"
								src="../img/cx2.png"></span> <span class="zst_cion"><img
								src="../img/fx1.png"><img class="icon1"
								src="../img/fx2.png"></span> <span class="map_ss_jg_fg"></span> <span
								class="zst_cion"><img src="../img/ssjg_xy1.png"><img
								class="icon1" src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>

					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">6</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1"
								src="../img/cx2.png"></span> <span class="zst_cion"><img
								src="../img/fx1.png"><img class="icon1"
								src="../img/fx2.png"></span> <span class="map_ss_jg_fg"></span> <span
								class="zst_cion"><img src="../img/ssjg_xy1.png"><img
								class="icon1" src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">7</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1"
								src="../img/cx2.png"></span> <span class="zst_cion"><img
								src="../img/fx1.png"><img class="icon1"
								src="../img/fx2.png"></span> <span class="map_ss_jg_fg"></span> <span
								class="zst_cion"><img src="../img/ssjg_xy1.png"><img
								class="icon1" src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">8</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1"
								src="../img/cx2.png"></span> <span class="zst_cion"><img
								src="../img/fx1.png"><img class="icon1"
								src="../img/fx2.png"></span> <span class="map_ss_jg_fg"></span> <span
								class="zst_cion"><img src="../img/ssjg_xy1.png"><img
								class="icon1" src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul> 

					 	<div
						style="width: 100%; height: 24px; background: #f0f3f4; position: absolute; bottom: 0px;">
						<div class="fanye1">
							<span style="width: 53px;">&lt;上一页</span> <span class="shuzi">111</span>
							<span class="shuzi">1</span> <span class="shuzi">1</span> <span
								style="width: 53px;">下一页&gt;</span>
						</div>
					</div> 

				</div>
			</li>
			<li class="zh_k">
				<!--历史影像-->
				<ul class="map_ss_jg_top">
					<span style="margin-left: 10px;" id="domNameforTI">历史影像</span>
					<!--<span style="color: red;">25</span>
					<span>个记录</span>
					<span style="width: 1px;height: 16px;margin-left: 10px;margin-top: 8px;margin-right: 10px;background: #dcdcdc;"></span>
					<span class="jhxs_gx"></span>
					<span style="margin-left: 4px;color:#999999;">聚合显示</span>-->
					<span class="map_ss_jg_gb"></span>
				</ul>
				<div class="lsyx_sj" id="terrainList" style="display: none;">
					<!-- <ul class="lsyx_sj_left">
						<span style="margin-top: 67px;" class="lsyx_sj_left_text1">2016</span>
						<span class="lsyx_sj_left_text2">10.00</span>
						<span class="lsyx_sj_left_text2">07.00</span>
						<span class="lsyx_sj_left_text1">2014</span>
						<span class="lsyx_sj_left_text1">2012</span>
					</ul>
					<ul class="lsyx_sj_center">
						<span><img src="../img/lsyx_sjz.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_dd.png"><img
							class="pic1" src="../img/lsyx_dd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_dd.png"><img
							class="pic1" src="../img/lsyx_dd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_dd.png"><img
							class="pic1" src="../img/lsyx_dd1.png"></span>
					</ul>
					<ul class="lsyx_sj_right">
						<li id="lsyx_k" class="lsyx_sj_right_menu">
							<ul class="lsyx_sj_right_menu_top"></ul>
							<ul class="lsyx_sj_right_menu_center">
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;"><strong>2017年西湖区影像</strong></span>
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;">生产单位：浙江科澜</span>
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;">面积：300平方米</span>
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;">精度：0.3</span>
							</ul>
						</li>
					</ul> -->
				</div>
				<div class="lsyx_sj" id="imageList" style="display: none;"></div>
			</li>
			<li class="zh_k">
				<!--控高分析-->
				<div class="kgfx_top">
					<span class="kgfx_fh"
						style="color: #4fa1ff; cursor: pointer; margin-left: 10px;"><
						返回全部</span>
				</div>
				<div>
					<table width="260" cellspacing="1" cellpadding="0">
						<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								>控高信息</span></td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;名称：</td>
							<td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;控高面</td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;海拔高度（m）：</td>
							<td class="bdk2" valign="middle" id="hbgd">&nbsp;&nbsp;&nbsp;0</td>
						</tr>
						<!--<tr>
                        	<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;X轴：</td>
                        	<td class="bdk2" valign="middle">
                            	<form runat="server">
                                	<input class="sz" id="TextBox3" runat="server" CssClass="mybutton" Text="0">
                                	<input class="jiah" type="button" ID="Button5" value="+" onMouseDown="md2(this)" onMouseOut="mo2(this)" onMouseUp="mo2(this)"   >
                                	<input class="jianh" type="button" ID="Button6" value="-" onMouseDown="md2(this)" onMouseOut="mo2(this)" onMouseUp="mo2(this)"   >
                            	</form>
                        	</td>
                    	</tr>-->
					</table>
					<table width="260" cellspacing="1" cellpadding="0">
						<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								>控高控制</span></td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;重置高度：</td>
							<td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;重置</td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;高度调整：</td>
							<td class="bdk2" valign="middle">
								<form runat="server" onsubmit="spaceCallBack();return false;">
									<input class="sz" id="TextBox3" runat="server"
										CssClass="mybutton" Text="0" value="请输入高度"> <input
										class="jiah" type="button" ID="Button5" value="+"
										onMouseDown="md2(this)" onMouseOut="mo2(this)"
										onMouseUp="mo2(this)"> <input class="jianh"
										type="button" ID="Button6" value="-" onMouseDown="md2(this)"
										onMouseOut="mo2(this)" onMouseUp="mo2(this)">
								</form>
							</td>
						</tr>
						<!-- <tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;查看：</td>
							<td class="bdk2" valign="middle">&nbsp; <select>
									<option>顶视</option>
									<option>左视</option>
							</select>
							</td>
						</tr> -->
					</table>
				</div>
				<div class="lb_sm">
					<span style="margin: 20px; display: block; float: left;"> <strong>控高高度（m）</strong>
						 <span id="height">调节控高面高度</span>
					</span>
				</div>
				<div class="kgfx_btn">
					<span style="margin-right: 5px;" id="kgfx1">开始分析</span> <span
						style="margin-right: 5px;" id="kgqx0">结束分析</span> <span id="kgjt">截图</span>
				</div>
				<div class="kgfx_tl1">
					<ul class="kgfx_menu_tl1_top">图例
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #e8ea18; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>控高线部分</span>
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #08dd0b; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>控高面遮挡部</span>
					</ul>
				</div>
			</li>
			<li class="zh_k">
				<!-- 通视分析 -->
				<div class="kgfx_top">
					<span class="kgfx_fh"
						style="color: #4fa1ff; cursor: pointer; margin-left: 10px;"><
						返回全部</span>
				</div>
				<div class="fx_k">
                    <table width="260"  cellspacing="1" cellpadding="0">
                    	<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								>观察点信息</span></td>
						</tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;名称：</td>
                            <td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;观察点</td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;X轴：</td>
                            <td class="bdk2" valign="middle" id="sight_x">
                                <form runat="server">
                                    <input class="sz" id="TextBox3" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Y轴：</td>
                            <td class="bdk2" valign="middle" id="sight_y">
                                <form runat="server">
                                    <input class="sz" id="TextBox4" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Z轴：</td>
                            <td class="bdk2" valign="middle" id="sight_z">
                                <form runat="server">
                                    <input class="sz" id="TextBox5" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                    </table>
                    <table width="260"  cellspacing="1" cellpadding="0">
                    	<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								>目标点信息</span></td>
						</tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;名称：</td>
                            <td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;目标点</td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;X轴：</td>
                            <td class="bdk2" valign="middle" id="aimsight_x">
                                <form runat="server">
                                    <input class="sz" id="TextBox6" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Y轴：</td>
                            <td class="bdk2" valign="middle" id="aimsight_y">
                                <form runat="server">
                                    <input class="sz" id="TextBox7" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Z轴：</td>
                            <td class="bdk2" valign="middle" id="aimsight_z">
                                <form runat="server">
                                    <input class="sz" id="TextBox8" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                    </table>
                    
                    <div class="kgfx_btn">
					<span style="margin-right: 5px;" id="tsfx1">开始分析</span> <span
						style="margin-right: 5px;" id="tsqx0">结束分析</span> <span id="tsjt">截图</span>
				   </div>
                </div>
                <div class="kgfx_tl1">
					<ul class="kgfx_menu_tl1_top">图例
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #e8ea18; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>通视遮挡可见</span>
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #ff3333; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>通视遮挡部</span>
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #40de5a; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>通视无遮挡可见</span>
					</ul>
				</div>
             </li>
             <li class="zh_k">
                <!-- 视域分析 -->
                <div class="kgfx_top">
					<span class="kgfx_fh"
						style="color: #4fa1ff; cursor: pointer; margin-left: 10px;"><
						返回全部</span>
				</div>
                <div class="fx_k">
                    <table width="260"  cellspacing="1" cellpadding="0">
                    	<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								>观察点信息</span></td>
						</tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;名称：</td>
                            <td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;观察点</td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;X轴：</td>
                            <td class="bdk2" valign="middle" id="view_x">
                                <form runat="server">
                                    <input class="sz" id="TextBox12" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Y轴：</td>
                            <td class="bdk2" valign="middle" id="view_y">
                                <form runat="server">
                                    <input class="sz" id="TextBox13" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Z轴：</td>
                            <td class="bdk2" valign="middle" id="view_z">
                                <form runat="server">
                                    <input class="sz" id="TextBox14" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                    </table>
                    <table width="260"  cellspacing="1" cellpadding="0">
                    	<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								>目标点信息</span></td>
						</tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;定位：</td>
                            <td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;目标点</td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;X轴：</td>
                            <td class="bdk2" valign="middle" id="aimview_x">
                                <form runat="server">
                                    <input class="sz" id="TextBox15" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Y轴：</td>
                            <td class="bdk2" valign="middle" id="aimview_y">
                                <form runat="server">
                                    <input class="sz" id="TextBox16" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;Z轴：</td>
                            <td class="bdk2" valign="middle" id="aimview_z">
                                <form runat="server">
                                    <input class="sz" id="TextBox17" runat="server" CssClass="mybutton" Text="0">
                                </form>
                            </td>
                        </tr>
                         </table>
                    	<table width="260"  cellspacing="1" cellpadding="0">
                    	<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								>视点控制信息</span></td>
						</tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;水平视角：</td>
                            <td class="bdk2" valign="middle">
                                <form runat="server">
                                    <input class="sz" id="horizontalView" runat="server" CssClass="mybutton" Text="0" value = "60">
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;垂直选择视角：</td>
                            <td class="bdk2" valign="middle">
                                <form runat="server">
                                    <input class="sz" id="verticalView" runat="server" CssClass="mybutton" Text="0" value="60">
                                </form>
                            </td>
                        </tr>
                       
                    </table>
                    <div class="kgfx_btn">
					<span style="margin-right: 5px;" id="syfx1">开始分析</span> <span
						style="margin-right: 5px;" id="syqx0">结束分析</span> <span id="syjt">截图</span>
				   </div>
                </div>
                <div class="kgfx_tl1">
					<ul class="kgfx_menu_tl1_top">图例
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #08dd0b; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>视域可见部</span>
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #ff3333; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>视域遮挡部</span>
					</ul>
				</div>
			</li>
			<li class="zh_k">
				<!--7标注管理-->
				<div class="kgfx_top">
					<span class="bjgl_fh"
						style="color: #4fa1ff; cursor: pointer; margin-left: 10px;"><
						返回全部</span> <!-- <span>—场景管理</span> -->
				</div>
				<div class="bjgl_menu">
					<div class="bjgl_menu_qh">
						<span style="margin-left: 10px;" class="bjgl_menu_qh_kgfx">标注管理</span>
						<span>路径管理</span>
					</div>
				</div>
				<div class="gl_menu">
					<!-- <div class="bj_menu">
						点击<span style="color: #4fa1ff;">添加标注按钮，</span>在场景选择需要标注地<br>
						方，即可标注。
					</div> -->
					<div class="tjbz_btn" ></div>
					<div style="margin-top: 13px; float: none;" class="kjfx_fg">
						<span><strong>标注列表</strong></span>
					</div>
					<div class="bj_menu_ss">
						<span><input type="text" id="LabeltName"></span> <span
							class="bj_menu_ss_btn">搜索 </span>
					</div>
					<div class="bzxg_menu">
						<ul class="bzxg_menu_mc">
							名称：
							<input id="bzxgname" type="text" value='西湖文化广场'/>
						</ul>
						<ul class="bzxg_menu_mc">类型：
						</ul>
						<ul class="tjbz_mc">
							<span>备注：</span>
							<span style="margin-left: 7px;"> <textarea
									placeholder="我的备注"
									id="labelRemark"
									style="width: 210px; height: 54px; outline: none; max-width: 210px; max-height: 54px; "></textarea>
							</span>
						</ul>
						<ul class="bzxg_menu_btn">
							<span id="bzqd">确定</span>
							<span id="bzsc">删除</span>
							<span class="cxqd">重新取点</span>
						</ul>
					</div> 
					<div id="labelResult" ></div>
					<!-- <ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span id="bzxg" class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span id="bzxg" class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span id="bzxg" class="sdsc_bj"></span>
					</ul> -->
				</div>
				<div class="gl_menu">
					<div class="bj_menu_ss">
						<span><input type="text" id="pathInputText" onkeyup="keyDownQuerySearch();"></span> <span
							class="bj_menu_ss_btn" onclick="findPowerPath(1)">搜索 </span>
					</div>
					<div class="gl_menu_ljgl">
						<ul class="map_dttc_qxsy" style="margin-top: 10px;">
							<span class="map_dttc_qxsy_xh"><span class="fh">1</span></span>
							<span>路径管理</span>
							<span class="sdsc_sc"></span>
	                        <span class="tz"></span>
	                        <span class="zt"></span>
	                        <span class="bf"></span>
						</ul>
					<div>
				</div>
		    </li>
			
			<!-- 规划数据 -->
			<li class="zh_k">
				<div class="ghsj">
					<div class="kgsj_top_menu">
						<div class="kgsj_top" id="searchPlanningType">
							<ul class="kgfa" id="regulatoryBtn" onclick="changeSearchTypePlanning('regulatory');">控规方案</ul>
							<ul id="planBtn" onclick="changeSearchTypePlanning('plan');">方案数据</ul>
						</div>
					</div>
					<div class="ghss">
						<span><input type="text" placeholder="输入查询关键字" id="input_plan" onkeydown="keyDownQueryPlanning();"></span>
						<span id="sj_btn" class="ghss_an" onclick="searchSubmitPlanning();"></span>
					</div>
					<!--<div class="ssts_k">
						<ul><span>控规盒子001</span></ul>
						<ul><span>控规盒子001</span></ul>
						<ul><span>控规盒子001</span></ul>
					</div>-->
					<div class="kgfa_k" id="kgsl_k">
	                    <label for="2">
		                    <ul class="kakou_next_menu_k1">
		                    	<span class="gxk"><input type="checkbox" id="kgsl" /></span>
		                    	<span class="BIM_text">控规矢量</span>
		                    </ul>
	                    </label>
	                    <label for="3">
		                    <ul class="kakou_next_menu_k1">
		                    	<span class="gxk"><input type="checkbox" id="kghz" /></span>
		                    	<span class="BIM_text">控规盒子</span>
		                    </ul>
	                    </label>
	                    <label for="4">
		                    <ul class="kakou_next_menu_k1">
		                        <span class="gxk"><input type="checkbox" id="jichangjingkong" /></span>
		                        <span class="BIM_text">机场净空</span>
		                    </ul>
	                    </label>
	                    <label for="5">
		                    <ul class="kakou_next_menu_k1">
		                        <span class="gxk"><input type="checkbox" id="jichangjingkonghezi" /></span>
		                        <span class="BIM_text">机场净空盒子</span>
		                    </ul>
	                    </label>
	                </div>
					<div id="fasj_k" class="kgfa_k">
						<!-- 
						<ul id="fasj_k1" class="fasj">
							<span class="gxk1"><input type="checkbox" name="all" onclick="check_all(this,'z')" /></span>
							<div class="fasjqh">
								<span class="kakoulei_text_k">西湖规划分局</span>
								<span class="jtqh"></span>
							</div>
						</ul>
						 -->
						 <!-- 
						<div class="fasj_next_menu">
							<ul id="fa_menu_k1" class="fasj_next_menu_k">
								<span class="gxk2"><input type="checkbox" name="z" value="" /></span>
								<div class="fasjqh_fa">
									<span class="yj_pic"><img style="margin-top: 4px;" src="../img/shebpi.png"></span>
									<span class="kakoulei_text_m">中华饭店</span>
								</div>
								<span class="dingwei"></span>
								<span class="jtqh"></span>
							</ul>
							<div class="fasjqh_fa_menu">
								<ul class="fasj_next_menu_k_m">
									<span class="gxk3"><input type="checkbox"/></span>
									<div class="fasjqh_xm">
										<span class="fasj_menu_text">项目背景</span>
										<span class="jtqh"></span>
									</div>
								</ul>
								<div class="fasjqh_xm_menu">
									<ul class="fasj_next_menu_k_m1">
										<span class="gxk4"><input type="checkbox" /></span>
										<span class="fasj_menu_text_z3">项目说明</span>
									</ul>
									<div></div>
									<ul class="fasj_next_menu_k_m1">
										<span class="gxk4"><input type="checkbox" /></span>
										<span class="fasj_menu_text_z3">用地红线</span>
									</ul>
									<div></div>
									<ul class="fasj_next_menu_k_m1">
										<span class="gxk4"><input type="checkbox" /></span>
										<span class="fasj_menu_text_z3">现状模型</span>
									</ul>
									<div></div>
								</div>
								<ul class="fasj_next_menu_k_m">
									<span class="gxk3"><input type="checkbox" /></span>
									<div class="fasjqh_fanga">
										<span class="fasj_menu_text">方案</span>
										<span class="jtqh"></span>
									</div>
								</ul>
								<div class="fasjqh_fanga_menu">
									<ul class="fasj_next_menu_k_m1">
										<span class="gxk4"><input type="checkbox" /></span>
										<div class="fasjqh_fanga_z">
											<span class="fasj_menu_text_z3">方案1</span>
											<span class="jtqh"></span>
										</div>
									</ul>
									<div class="fasjqh_fanga_z_menu">
										<ul class="fasj_next_menu_k_m1">
											<span class="gxk5"><input type="checkbox" /></span>
											<div class="fasjqh_fanga_zl">
												<span class="fasj_menu_text_z4">方案资料</span>
												<span class="jtqh"></span>
											</div>
										</ul>
										<div class="fasjqh_fanga_zl_menu">
											<ul class="lzwbk_m">
												<span class="fasj_menu_text_z5">规划资料</span>
												<span class="jtqh"></span>
											</ul>
											<div class="wb_menu">
												<ul class="fasj_next_menu_k_m1">
													<span class="fasj_menu_text_z6">资料文本1</span>
													<span class="xiazai_icon"></span>
												</ul>
											</div>
											<ul class="lzwbk_m">
												<span class="fasj_menu_text_z5">设计文本</span>
												<span class="jtqh"></span>
											</ul>
											<div class="wb_menu">
												<ul class="fasj_next_menu_k_m1">
													<span class="fasj_menu_text_z6">设计文本1</span>
													<span class="xiazai_icon"></span>
												</ul>
											</div>
											<ul class="lzwbk_m">
												<span class="fasj_menu_text_z5">成果文本</span>
												<span class="jtqh"></span>
											</ul>
											<div class="wb_menu">
												<ul class="fasj_next_menu_k_m1">
													<span class="fasj_menu_text_z6">成果文本1</span>
													<span class="xiazai_icon"></span>
												</ul>
											</div>
											<ul class="lzwbk_m">
												<span class="fasj_menu_text_z5">其他资料</span>
												<span class="jtqh"></span>
											</ul>
											<div class="wb_menu">
												<ul class="fasj_next_menu_k_m1">
													<span class="fasj_menu_text_z6">12312312</span>
													<span class="xiazai_icon"></span>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<ul class="fasj_next_menu_k_m">
									<span class="gxk3"><input type="checkbox" /></span>
									<div class="fasjqh_gj">
										<span class="fasj_menu_text">工具</span>
										<span class="jtqh"></span>
									</div>
								</ul>
								<div class="fasjqh_gj_menu">
									<ul class="fasj_next_menu_k_m1">
										<span class="gxk4"><input type="checkbox" /></span>
										<div class="fasjqh_fanga_z">
											<span class="fasj_menu_text_z3">视点</span>
											<span class="jtqh"></span>
										</div>
									</ul>
									<ul class="fasj_next_menu_k_m1">
										<span class="gxk4"><input type="checkbox" /></span>
										<div class="fasjqh_fanga_z">
											<span class="fasj_menu_text_z3">路径</span>
											<span class="jtqh"></span>
										</div>
									</ul>
								</div>
							</div>                    	
						</div>
						-->
					</div>
					<div id="kgss_k" class="kgfa_k"></div>
				</div>
			</li>
			<!-- 规划数据 -->
			
		</ul>
		<ul class="btm_right">
			<!-- <li class="btm_right_left_dz">
				<ul id="city" class="btm_right_left_hz">
					<span id="mapDefaultName">苏州市</span>
					<span style="margin-top: -2px;"><img
						src="../img/icon-arrow.png"></span>
					<span>></span>
				</ul>
				<ul id="area" class="btm_right_left_hz">
					<span id="mapDefaultAreaName" class="dz_qy">张家港区</span>
					<span style="margin-top: -2px;"><img
						src="../img/icon-arrow.png"></span>
					<span>></span>
					<div class="area_lb">
						<span>全部</span> <span>下城区</span> <span>拱墅区</span> <span>江干区</span>
						<span>西湖区</span> <span>滨江区</span> <span>萧山区</span> <span>余杭区</span>
					</div>
				</ul>
			</li> -->
			<!-- 	<div>
				<ul class="Associative">

					<li class="Associative_top"><span>城市列表</span> <span
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
					</li>
			</ul>
			</div> -->

			<!--20180405修改-->
			<li class="btm_right_top_left_xy">
			<span class="btm_right_top_left_xy_dx" onclick="getTerrainOrImageList('terrain');">地形</span>
				<div class="yx_xy">
					<span class="btm_right_top_left_xy_yx" onclick="getTerrainOrImageList('image');">影像</span>
				</div></li>
			<!--20180405修改-->	
			
			<li class="btm_right_top">
				<c:if test="${menuList != null}">
					<ul class="btm_right_top_right">
						<c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010109'}">
								<li class="btm_right_top_right_fpld"></li>
								<span class="btm_right_top_right_line_1"></span>
							</c:if>
						</c:forEach>
						<%-- <c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010101'}">
								<li class="btm_right_top_right_esld"></li>
							</c:if>
						</c:forEach> --%>
						<c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010102'}">
								<!-- <span class="btm_right_top_right_line"></span> -->
								<!-- <li class="btm_right_top_right_sxck"></li> -->
							</c:if>
						</c:forEach>
						<c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010103'}">
								<!-- <span class="btm_right_top_right_line"></span>
								<li class="btm_right_top_right_dxgc" id="dxgc"></li> -->
							</c:if>
						</c:forEach>
						<c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010104'}">
								<!-- <span class="btm_right_top_right_line"></span> -->
								<li class="btm_right_top_right_jt"></li>
							</c:if>
						</c:forEach>
						<c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010105'}">
								<span class="btm_right_top_right_line"></span>
								<li class="btm_right_top_right_qc"></li>
							</c:if>
						</c:forEach>
						<c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010106'}">
								 <span class="btm_right_top_right_line"></span>
								<li class="btm_right_top_right_qp"></li>
							</c:if>
						</c:forEach>
						<c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010107'}">
								<span class="btm_right_top_right_line"></span>
								<li class="btm_right_top_right_qf"></li>
							</c:if>
						</c:forEach>
						<%-- <c:forEach items="${menuList}" var="menu" varStatus="status">
							<c:if test="${menu.id == 'XT010108'}">
								<span class="btm_right_top_right_line"></span>
								<li class="btm_right_top_right_kjxz"></li>
							</c:if>
						</c:forEach> --%>
					</ul>
				</c:if>
			</li>
			 <!-- 二维地图 -->
	        <li id="map2D" style="float: left; width: 0%; height: 100%; background: #D5D5D5;">
	        	
	        </li>
	        <!-- 三维地图 -->
	        <li id="map3D" style="width: 100%; height: 100%; background: #D5D5D5;">
	        </li>
			<div class="map" style="width: 100%; height: 100%;">
				<!--二维地图-->
				<!-- <div id="map2D"
					style="float: left; width: 0%; height: 100%; background: #D5D5D5;"></div> -->
				<!--三维地图-->
				<!-- <div id="map3D"
					style="float: right; width: 100%; height: 100%; background: #D5D5D5;"></div> -->
				<!-- <div class="alltk" id="tjsd">
					添加视点
					<div class="sdsc_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>添加视点</strong></span>
							<span id="sdgb" class="sdsc_gb"></span>
						</ul>
						<ul class="sdsc_mc">
							<span>名称：</span>
							<span style="float: right;"><input placeholder="视点名称"
								type="text"></span>
						</ul>
						<ul style="height: 60px;" class="sdsc_mc">
							<span>备注：</span>
							<span style="margin-left: 7px;"> <textarea
									placeholder="我的备注"
									style="float: left; width: 267px; height: 54px; outline: none; max-width: 267px;"></textarea>
							</span>
						</ul>
						<ul id="sd_btn" class="sdsc_tk_btn">
							<span>取消</span>
							<span>保存</span>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div> -->
<!--				人脸识别弹窗-->
				<div id="rlsb" class="gmqp">
					<div class="alltk" style="width: 294px;">
						<div class="map_ss_tk" style="width: 294px;">
							<ul class="sdsc_tk_top">
								<span style="margin-left: 10px; font-size: 14px;"><strong>人脸识别详情</strong></span>
								<span class="qy_gb"></span>
							</ul>
							<ul class="q_xq"style="width: 294px;">
								<li class="q_xq_lb" style="width: 220px;height: 190px;background: #fff;margin:auto;margin-bottom: 10px;">
								</li>
								<li class="q_xq_lb" style="width: 90%;margin: auto;">
									<span>性别：男</span>
								</li>
								<li class="q_xq_lb" style="width: 90%;margin: auto;">
									<span>年龄：25岁</span>
								</li>
								<li class="q_xq_lb" style="width: 90%;margin: auto;">
									<span>是否带眼镜：否</span>
								</li>
								<li class="q_xq_lb" style="width: 90%;margin: auto;">
									<span>抓拍时间：2017-11-26&nbsp;&nbsp;11:33:33</span>
								</li>
								<li class="q_xq_lb" style="width: 90%;margin: auto;">
									<span>抓拍地点：礼宾路</span>
								</li>
<!--
								<li class="q_xq_lb">
									<span class="yulan">预览</span>
								</li>
-->
							</ul>
						</div>
						<div class="tk_zsjt"></div>
					</div>
				</div>
				<div id="tjbz" class="alltk">
					<!--添加标注-->
					<div class="sdsc_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>添加视点</strong></span>
							<span id="bzgb" class="sdsc_gb"></span>
						</ul>
						<ul class="sdsc_mc">
							<span>名称：</span>
							<span style="float: right;"><input placeholder="视点名称"
								type="text"></span>
						</ul>
						<ul style="height: 60px;" class="sdsc_mc">
							<span>备注：</span>
							<span style="margin-left: 7px;"> <textarea
									placeholder="我的备注"
									style="float: left; width: 267px; height: 54px; outline: none; max-width: 267px;"></textarea>
							</span>
						</ul>
						<ul id="bz_btn" class="sdsc_tk_btn">
							<span>取消</span>
							<span>保存</span>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div>

				<!-- <div id="q_tk" class="alltk">
					区弹窗
					<div class="map_ss_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px; font-size: 14px;"><strong>西湖区</strong></span>
							<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>
							<span class="qy_gb"></span>
							<span class="ss_tk_sc"></span>
						</ul>
						<ul class="q_xq">
							<li class="q_xq_lb"><span style="width: 55%;">名称：西湖区</span>
								<span style="width: 45%;">人口：50万</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">类型：杭州西</span>
								<span style="width: 45%;">地址：浙江省杭州市</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">面积：2000平方米</span>
							</li>
							<li class="q_xq_lb"><span style="width: 55%;">设施：教育、政府、景点等</span>
							</li>
						</ul>
						<ul class="q_fg_line"></ul>
						<ul class="q_xq_fwss">
							<li class="zbfw"><span class="zbfw_icon"></span> <span
								class="zbfw_text">周边查找</span> <span
								style="width: 1px; height: 10px; background: #dcdcdc; margin-top: 4px; margin-left: 5px; margin-right: 5px;"></span>
								<span class="zbfw_text1">0.5km</span> <span class="zbfw_text1">1km</span>
								<span class="zbfw_text1">2km</span></li>
							<li class="fwss"><span>周边的</span> <span
								style="margin-left: 10px;"><input
									style="padding: 5px; width: 190px; outline: none; border: 1px solid #dcdcdc;"
									type="text"></span> <span class="fwss_btn">搜索</span></li>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div> -->

				<div id="qxsy_tk" class="alltk">
					<!--倾斜摄影弹窗-->
					<div class="map_ss_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px; font-size: 14px;"><strong>西湖区倾斜摄影</strong></span>
							<!--<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>-->
							<span id="qxsy_gb" class="qy_gb"></span>
							<span class="ss_tk_sc"></span>
						</ul>
						<ul class="q_xq">
							<li class="q_xq_lb"><span style="width: 55%;">名称：杭州西湖影像</span>
								<span style="width: 45%;">单位：浙江科澜</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">面积：300平方米</span>
								<span style="width: 45%;">时间：2016年6月</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
						</ul>
						<ul class="q_fg_line"></ul>
						<ul class="qxsy_menu_diss">
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div>

				<!-- 	<div id="sxcx_tk" class="alltk">
					属性查询弹窗
					<div class="map_ss_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px; font-size: 14px;"><strong>嘉文大厦</strong></span>
							<span style="margin-left: 20px; color: #b7b7b7;">详情>></span>
							<span id="sxcx_gb" class="qy_gb"></span>
						</ul>
						<ul class="q_xq">
							<li class="q_xq_lb"><span style="width: 55%;">名称：杭州西湖影像</span>
								<span style="width: 45%;">单位：浙江科澜</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">面积：300平方米</span>
								<span style="width: 45%;">时间：2016年6月</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
						</ul>
					</div>

					<div class="tk_zsjt"></div>
				</div> -->

				<!-- <div class="jttk">
					截图弹窗
					<div class="jt_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>截图</strong></span>
							<span id="jt_gb" class="sdsc_gb"></span>
						</ul>
						<ul style="margin-top: 40px;" class="jt_mc">
							<span>文件名：</span>
							<span><input
								style="width: 350px; border: 1px solid #cccccc;" type="text"></span>
						</ul>
						<ul class="jt_mc">
							<span>储存到：</span>
							<span><input
								style="width: 267px; border: 1px solid #cccccc;" type="text"></span>
							<span class="jt_tk_ll">浏览</span>
						</ul>
						<ul class="jt_tk_btn">
							<span>取消</span>
							<span>确定</span>
						</ul>
					</div>
				</div> -->
			<!-- 	<div class="kjtk">
					截图弹窗
					<div class="kj_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>截图</strong></span>
							<span id="kjxz_gb" class="sdsc_gb"></span>
						</ul>
						<ul
							style="margin: auto; width: 210px; line-height: 20px; font-size: 12px; text-align: center; margin-top: 20px;">
							最新版本3.0 当前版本2.0
							<br> 请更新下载
						</ul>
						<ul class="kj_tk_btn">
							<span>确定</span>
							<span style="float: right;">取消</span>
						</ul>
					</div>
				</div>
				<div style="margin-top: 50px;" class="kjtk">
					截图弹窗
					<div class="kj_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>截图</strong></span>
							<span class="sdsc_gb"></span>
						</ul>
						<ul
							style="margin: auto; width: 210px; line-height: 20px; font-size: 12px; text-align: center; margin-top: 20px;">
							<span style="color: red;">下载失败</span>
							<br> 请联系管理员 电话：0571-54125895
						</ul>
						<ul class="kj_tk_btn">
							<span>确定</span>
							<span style="float: right;">取消</span>
						</ul>
					</div>
				</div> -->
			</div>
		</ul>
	</div>
	<!-- map搜索框 -->
	<iframe frameborder="0"
		style="position: absolute; top: 69px; left: 173px; z-index: 100; display: none;"
		scrolling="no" id="searchFrame" src="searchFrame.do" height="78px"
		width="428px;"></iframe>
	<!-- 城市下拉框 -->
	<iframe frameborder="0"
		style="position: absolute; top: 130px; left: 352px; z-index: 100; display: none;"
		scrolling="no" id="maptoolCityFrame" src="maptoolCityFrame.do"
		height="253px" width="424px;"></iframe>
	<!-- 地区下拉框 -->
	<iframe frameborder="0"
		style="position: absolute; top: 130px; left: 430px; z-index: 100; display: none;"
		scrolling="no" id="maptoolAreaFrame" src="maptoolAreaFrame.do"
		height="300px" width="75px;"></iframe>
	<!-- 截图提示 -->
	<iframe frameborder="0"
		style="position: absolute; top: 400px; left: 800px; z-index: 100; display: none;"
		scrolling="no" id="printScreenFrame"
		src="../mapTools/printScreenFrame.do" height="85px" width="289px;"></iframe>
	<!-- 视频四宫格提示 -->
	<iframe name ="videoFourDialog" frameborder="0" 
		style="position: absolute;  top: 123px; left: 360px; z-index: 100; display: none;"
		scrolling="no" id="videoFourDialog"
		src="../mapTools/videoFourDialog.do" height="88px" width="88px;"></iframe>
	<!-- 门禁管理 -->
	<iframe name ="lockListFrame" frameborder="0" 
		style="position: absolute;  bottom: 0px; left: 348px; z-index: 100; display: none;"
		scrolling="no" id="lockListFrame"
		src="../mapTools/lockList.do" height="228px" width="1565px;"></iframe>
	<!-- 防攀爬管理 -->
	<iframe name ="climbListFrame" frameborder="0"
	style="position: absolute;  bottom: 0px; left: 348px; z-index: 100; display: none;"
	scrolling="no" id="climbListFrame"
	src="../security/climb/climbList.do" height="228px" width="1565px;"></iframe>
	<!-- wifi管理 -->
	<iframe name ="wifiListFrame" frameborder="0"
	style="position: absolute;  bottom: 0px; left: 348px; z-index: 100; display: none;"
	scrolling="no" id="wifiListFrame"
	src="../security/wifi/wifiList.do" height="228px" width="1565px;"></iframe>
	<!-- 车辆管理 -->
	<iframe name ="vehicleListFrame" frameborder="0"
	style="position: absolute;  bottom: 0px; left: 348px; z-index: 100; display: none;"
	scrolling="no" id="vehicleListFrame"
	src="../vehicle/device/vehicle.do" height="228px" width="1565px;"></iframe>
	<!-- 视频嵌入播放-->
	<iframe name ="lockPlayFrame" frameborder="0" 
		style="position: absolute; top: 120px; right: 0px; z-index: 101; display: none;"
		scrolling="no" id="lockPlayFrame"
		src="" height="500px;" width="600px;"></iframe>
	<!-- 视频弹出播放-->
	<iframe width=0 height=0 id="previewPopVideo"></iframe>
    <!--属性查询弹窗-->
	<!-- <div id="sxcx_tk" class="alltk">
		<div class="map_ss_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px; font-size: 14px;"><strong>嘉文大厦</strong></span>
				<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>
				<span id="sxcx_gb" class="qy_gb"></span>
			</ul>
			<ul class="q_xq">
				<li class="q_xq_lb">
					<span style="width: 55%;">名称：杭州西湖影像</span>
					<span style="width: 45%;">单位：浙江科澜</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 55%;">面积：300平方米</span>
					<span style="width: 45%;">时间：2016年6月</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 55%;">精细度：高仿真</span>
					<span style="width: 45%;">地址：杭州市西湖区</span>
				</li>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div> -->
	<!--人物查询弹窗-->
	<!-- <div id="rwtc" class="alltk">
		<div class="map_ss_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px; font-size: 14px;"><strong>基本信息</strong></span>
				<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>
				<span class="qy_gb"></span>
			</ul>
			<ul class="q_xq">
				<li class="q_xq_lb">
					<span style="width: 25%;">姓名：王晓</span>
					<span style="width: 45%;">出生:1999年9月9日</span>
				</li>
				<li class="xxpic"></li>
				<li class="q_xq_lb">
					<span style="width: 65%;">身份证：333333333333333333</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 60%;">楼层：2幢3单元7层</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 60%;">派出所：立新派出所</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 60%;">地址：杭州市西湖区益乐路5号</span>
				</li>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div> -->
	<!--建筑查询弹窗-->
	<!-- <div id="jztc" class="alltk">
		<div class="map_ss_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px; font-size: 14px;"><strong>基本信息</strong></span>
				<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>
				<span class="qy_gb"></span>
			</ul>
			<ul class="q_xq">
				<li class="q_xq_lb">
					<span style="width: 65%;">名称：城市花园</span>
				</li>
				<li class="xxpic"></li>
				<li class="q_xq_lb">
					<span style="width: 65%;">楼层：16层</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 60%;">建筑年代：2001年竣工</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 60%;">用途：商用</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 60%;">派出所：新立派出所</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 60%;">地址：杭州市西湖区益乐路5号</span>
				</li>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div> -->
	<!--视频监控-->
	<!-- <div id="spjk" class="alltk">
		<div class="map_ss_tk">
			<ul class="sdsc_tk_top">
				<span style="margin-left: 10px; font-size: 14px;"><strong>2单元视频信息</strong></span>
				<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>
				<span class="qy_gb"></span>
			</ul>
			<ul class="q_xq">
				<li class="q_xq_lb">
					<span style="width: 55%;">名称：杭州西湖影像</span>
					<span style="width: 45%;">像素：20000px</span>
				</li>
				<li class="q_xq_lb">
					<span style="width: 55%;">经纬度：300平方米</span>
					<span style="width: 45%;"></span>
				</li>
				<li class="yl_btn"><span>预览</span></li>
			</ul>
		</div>
		<div class="tk_zsjt"></div>
	</div> -->
	<div class="afhl">
		<span class="sp"></span>
		<span class="mj"></span>
		<span class="fpp"></span>
		<span class="wf"></span>
	</div>
	<div class="jltc">
	<!--车辆管理记录-->				
	</div>
</body>
<script>
	var flag1 = 0;
	var flag2 = 0;

	function NumberInc(tt) {
		if (flag1 == 1 && flag2 == 1) {
			alert("Error!");
		} else {
			var numVal = document.getElementById(tt).value;
			if (numVal == '请输入高度' || numVal < 0) {
				document.getElementById(tt).value = 0;
			}
			if (flag1 == 1) {
				document.getElementById(tt).value++;
				setTimeout("NumberInc('" + tt + "')", 100);
			}
			if (flag2 == 1) {
				document.getElementById(tt).value--;
				setTimeout("NumberInc('" + tt + "')", 100);
			}
		}

	}

	function md2(obj) {
		if (obj.id == "Button5")
			flag1 = 1;
		if (obj.id == "Button6")
			flag2 = 1;
		NumberInc("TextBox3");
	}

	function mo2(obj) {
		if (obj.id == "Button5")
			flag1 = 0;
		if (obj.id == "Button6")
			flag2 = 0;
	}
	//后台服务前缀
	var web_url_prefix = <%="'"+request.getAttribute("ctx")+"'"%>
</script>
<%-- <script src="${ctx }/om/icgis/jquery.placeholder.min.js"></script>
<script src="${ctx }/om/icgis/echarts.common.min.js"></script>
<script src="${ctx }/om/icgis/common.js"></script>
<script src="${ctx }/om/icgis/population.js"></script>
<script src="${ctx }/om/icgis/wifiControl.js"></script>
<script src="${ctx }/om/icgis/climbControl.js"></script>
<script src="${ctx }/om/icgis/vehicleControl.js"></script> --%>
</html>












