/**
 * 规划方案功能
 * 
 * @author cd
 * @createDate 2017-10-18
 */
//是否初次进行方案列表加载
var planningFlag = 1;
//分屏方案模型保存集合
var screenModelArr = [];
//同时加载方案模型数量
var planModelCount = 0;
//方案分屏1
var mv1;
//方案分屏2
var mv2;
//分屏联动状态
var mvState = false;
//当前操作方案
var thePlanModelNow = "";
//上次操作方案
var thePlanModelAfter = "";
/**
 * 刷新项目列表 
 */
function getAreaCodeList(){
	$.ajax({
		url			: '../plan/makePlanTree.do',
		type		: 'post',
		data		: {
			areacode	: serverAreacodeWrl,
			projectName : $('#input_plan').val()
		},
		success		: function(data){
 	    	refreshPlanningMenu(data);
		},error		: function(data){
			
		}
	});
}

/**
 * 刷新项目列表
 * 
 * @param data,获取的方案列表结果集
 */
function refreshPlanningMenu(data){
	var planningData = data.record;
	var planningMenu = "";
	for(var i = 0;i<planningData.length;i++){
		planningMenu += 
    	'<ul id="fasj_k1" class="fasj">' + 
            '<span class="gxk1"><img src="../img/zhengfu.png"></span>' + 
            '<div class="fasjqh">' + 
                '<span class="kakoulei_text_k">' + planningData[i].name + '</span>' + 
                '<span class="jtqh"></span>' + 
            '</div>' + 
        '</ul>' + 
        '<div class="cityMenu">';
		for(var j = 0;j<(planningData[i].resources).length;j++){
			var id = (planningData[i].resources)[j].id + "_" + (planningData[i].resources)[j].unit;
			planningMenu +=  
	        '<div class="fasj_next_menu">' + 
	        	'<ul id="' + id + '" class="fasj_next_menu_k" onclick="getProjectAjax(' + (planningData[i].resources)[j].id + ',\'' + (planningData[i].resources)[j].unit + '\',\'' + (planningData[i].resources)[j].projectName + '\');">' + 
	                '<span class="gxk2"></span>' + 
	            	'<div class="fasjqh_fa">';
			if((planningData[i].resources)[j].projectState == "在批"){
				planningMenu += '<span class="yj_pic"><img src="../img/shebpi.png"></span>';
			}else if((planningData[i].resources)[j].projectState == "审结"){
				planningMenu += '<span class="yj_pic"><img src="../img/jiesuan.png"></span>';
			}
			planningMenu += '<span class="kakoulei_text_m" style="width: 140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" title( title="' + (planningData[i].resources)[j].projectName + '")>' + (planningData[i].resources)[j].projectName + '</span>' + 
	                    '<span class="jtqh"></span>' + 
	                '</div>' + 
	                '<span class="dingwei" onclick="projectFlyPosition(' + (planningData[i].resources)[j].longitude + ',' + (planningData[i].resources)[j].latiudes + ','+ (planningData[i].resources)[j].elevation +');"></span>' + 
	            '</ul>' + 
	        '</div>'; 
		}
		planningMenu += '</div>';
	}
	
	$("#fasj_k").html(planningMenu);
	$('.cityMenu').hide();
	$('.fasjqh').unbind('click').click(function(){
		$(this).parent().next().toggle();
		$(this).children('.jtqh').toggleClass('jtqhclick');
	});
	$('.fasjqh_fa').unbind('click').click(function(){
		$(this).parent().next().toggle();
		$(this).children('.jtqh').toggleClass('jtqhclick');
	});
}

/**
 * 获取项目详细信息
 * 
 * @param id,节点ID
 * @param unit,数据来源
 * @param name,节点名称
 */
function getProjectAjax(id, unit, name){
	var modelLevel;
	if(unit == "杭州规划局"){
		modelLevel = 1;
	}else if(unit == "杭州规划院"){
		modelLevel = 2;
	}
	$.ajax({
		url			: '../plan/makePlanTreeByPID.do',
		type		: 'post',
		data		: {
			//参数
			id	: id,
			modelLevel : modelLevel
		},
		success		: function(data){
			var newId = id + "_" + unit;
	    	getProjectDetail(newId, data, name);
		},error		: function(data){
			
		}
	});
}

/**
 * 展示项目信息
 * 
 * @param id,节点ID
 * @param data,返回的方案列表结果集
 * @param name,节点名称
 */
function getProjectDetail(id, data, name){
	var projectData = data.record.fileTree;
	var projectMenu = "";
	var domsArr = [];
	if($("#"+id).parent().attr("flag") != "true"){
		for(var i = 1;i <= data.record.maxLevel;i++){
			var domsIndexArr = [];
			for(var j = 0;j < projectData.length;j++){
				if(projectData[j].level == i){
					domsIndexArr.push(projectData[j]);					
				}
			}
			domsArr.push(domsIndexArr);
		}
		projectMenu += 
		'<div class="fasjqh_fa_menu">' + 
	        '<ul class="fasj_next_menu_k_m">' + 
	            '<span class="gxk6"><img src="../img/xiangmubeijing.png"></span>' + 
	            '<div class="fasjqh_xm">' + 
	                '<span class="fasj_menu_text">项目背景</span>' + 
	                '<span class="jtqh"></span>' + 
	            '</div>' + 
	        '</ul>' + 
	        '<div class="fasjqh_xm_menu" style="display:none;">' +
	            '<ul class="fasj_next_menu_k_m1">';
	            for(var i = 0;i<domsArr[1].length;i++){
	            	if(domsArr[1][i].name == "项目说明"){
	            		if(domsArr[1][i].isParent == "false"){
	            			projectMenu += '<span class="gxk4"><img src="../img/zllog1.png"/></span><span class="fasj_menu_text_z3">项目说明</span>';
	            		}else{
	            			for(var j=0;j<domsArr[2].length;j++){
		            			if(domsArr[2][j].pId == domsArr[1][i].id){
	            					projectMenu += '<span class="gxk4"><img src="../img/zllog.png"/></span><span class="fasj_menu_text_z3" onclick="projectDownload(\'' + domsArr[2][j].url + '\',\'' + domsArr[2][j].name + '\');">项目说明</span>';
		            			}
		            		}
	            		}
	            	}
	            }
				projectMenu +=
	            '</ul>' +
	            '<div></div>' +
	            '<ul class="fasj_next_menu_k_m1">';
	            for(var i = 0;i<domsArr[1].length;i++){
	            	if(domsArr[1][i].name == "项目范围线"){
	            		if(domsArr[1][i].isParent == "false"){
	            			projectMenu += '<span class="gxk4"><img src="../img/zllog1.png"/></span><span class="fasj_menu_text_z3">用地红线</span>';
	            		}else{
	            			for(var j = 0;j<domsArr[2].length;j++){
		            			if(domsArr[2][j].pId == domsArr[1][i].id){
	            					projectMenu += '<span class="gxk4"><input type="checkbox" name="" onclick="projectLine(this,\'' + domsArr[1][i].url + '\',\'' + name + '\');"/></span><span class="fasj_menu_text_z3">用地红线</span>';
		            			}
		            		}
	            		}
	            	}
	            }
	            projectMenu += 
	            '</ul>' +
	            '<div></div>' +
//	            '<ul class="fasj_next_menu_k_m1">';
//	            projectMenu += '<span class="gxk4"><input type="checkbox" name="" onclick="reduction(\'' + "现状切换" + '\');"/></span>';
//	            projectMenu +=
//	                '<span class="fasj_menu_text_z3">现状模型</span>' +
//	            '</ul>' +
	            '<div></div>' +
	        '</div>' +
	        '<ul class="fasj_next_menu_k_m">' +
	            '<span class="gxk3"><img  src="../img/zhuanyefangan.png"/></span>' +
	            '<div class="fasjqh_fanga">' +
	                '<span class="fasj_menu_text">方案</span>' +
	                '<span class="jtqh"></span>' +
	            '</div>' +
	        '</ul>' +
	        '<div class="fasjqh_fanga_menu" style="display:none;">';
	        	for(var i = 0;i<domsArr[0].length;i++){
	        		if(domsArr[0][i].name == "方案"){
	            		for(var j = 0;j<domsArr[1].length;j++){
	            			if(domsArr[1][j].pId == domsArr[0][i].id){
	            				projectMenu +=
            		            '<ul class="fasj_next_menu_k_m1">' +
            		                '<span class="gxk4"><img  src="../img/zhuanyefangan.png"/></span>' +
            		                '<div class="fasjqh_fanga_z" onclick="loadProjectClassMenu1(\'' + domsArr[1][j].id + '\',\'' + id + '\');">' +
            		                    '<span class="fasj_menu_text_z3">' + domsArr[1][j].name + '</span>' +
            		                    '<span class="jtqh"></span>' +
            		                '</div>' +
            		            '</ul>' + 
            		            '<div class="fasjqh_fanga_z_menu" style="display:none;" id="' + domsArr[1][j].id + '" >' +
            		            '</div>';
	            			}
	            		}
	            	}
	        	}
	        projectMenu +=
	        '</div>' + 
	    '</div>';
		$("#"+id).parent().append(projectMenu);
		$("#"+id).parent().attr("flag","true");
//		$('.fasjqh_xm_menu,.fasjqh_fanga_menu,.fasjqh_fanga_z_menu,.fasjqh_fanga_zl_menu').hide();
//		$('.fasjqh_fanga_z_menu').hide();
		$('.fasjqh_xm').unbind('click').click(function(){
			$(this).parent().next().toggle();
			$(this).children('.jtqh').toggleClass('jtqhclick');
		});
		$('.fasjqh_fanga').unbind('click').click(function(){
			$(this).parent().next().toggle();
			$(this).children('.jtqh').toggleClass('jtqhclick');
		});
		$('.fasjqh_fanga_z').unbind('click').click(function(){
			$(this).parent().next().toggle();
			$(this).children('.jtqh').toggleClass('jtqhclick');
		});
	}
}

/**
 * 项目飞行定位
 * 
 * @param lon,经度
 * @param lat,维度
 * @param height,高程
 */
function projectFlyPosition(lon, lat, height){
	if(mv1 != null){
		map.SetCurrentMapViewID(mv1.GetMapViewID());
		map3D.flyPosition(lon, lat, height, 0, -0.1*3.14, 500, 3);
	}
	if(mv2 != null){
		map.SetCurrentMapViewID(mv2.GetMapViewID());
		map3D.flyPosition(lon, lat, height, 0, -0.1*3.14, 500, 3);
	}
}

/**
 * 下载文件
 * 
 * @param url,访问路径
 * @param name,节点名称
 */
function projectDownload(url, name){
	var path = planServerURL + '/coo-server/plan/planFileDownload?callback="111"&data={"name":"' + name + '","projectFileUrl":"' + url + '"}';
	path = encodeURI(path, "UTF-8");
	window.open(path, '_self');
}

/**
 * 打开图片
 * 
 * @param url,访问路径
 * @param name,节点名称
 */
function openProjectImg(url, name){
	var urls = url.split(":");
	var url = urls[1].substring(16, urls[1].length);
	//公司测试
	var path = planServerURL + urls[1];
	//HGJ
//	var path = planServerURL + url;
	var pathUrl = '../plan/redirectURL.do?url='+encodeURI(path, "UTF-8");
	window.showModelessDialog(pathUrl,window,"dialogHeight:768px;dialogWidth:800px;center:yes;status:no;scrollbars:yes;resizable:yes");
}

var lineLayerArr = [];
/**
 * 获取用地红线
 * 
 * @param obj,节点对象
 * @param url,访问路径
 * @param name,节点名称
 */
function projectLine(obj, url, name){
	if(obj.checked){
		var sdkPath = map3D.getSDKPath();
		var index = sdkPath.lastIndexOf("\\");
	    sdkPath = sdkPath.substring(0,index);
	    index = sdkPath.lastIndexOf("\\");
	    sdkPath = sdkPath.substring(0,index);
	    sdkPath += "\\data\\tmp\\方案矢量\\";
	    sdkPath = sdkPath + name + "\\" + name + ".shp";
	    var lineLayer = map3D.loadSphereShp({type:2, Color:"0.0,1.0,0.0,0", LiftUp:"10", url:sdkPath, TileSize:"1000"});
	    var obj = {};
	    obj.index = name;
	    obj.layer = lineLayer;
	    lineLayerArr.push(obj);
	}else{
		for(var i = 0;i<lineLayerArr.length;i++){
			if(lineLayerArr[i].index == name){
				map3D.removelayer(lineLayerArr[i].layer);
				for(var i=0; i<lineLayerArr.length; i++) {
					if(lineLayerArr[i].index == name) {
						lineLayerArr.splice(i, 1);
						break;
					}
				}
			}
		}
	}
}

/**
 * 恢复现状模型(暂定方法)
 * 
 * @param data 
 */
function reduction(url){
	if(this.name == "1"){
		alert();
		this.name = "";
	}else{
		alert(url);
		this.name = "1";
	}
}

/**
 * 加载子方案列表1层
 * 
 * @param id,元素ID 
 * @param domId,节点ID 
 */
function loadProjectClassMenu1(id, domId){
	var domIds = domId.split("_");
	var modelLevel;
	if(domIds[1] == "杭州规划局"){
		modelLevel = 1;
	}else if(domIds[1] == "杭州规划院"){
		modelLevel = 2;
	}
	$.ajax({
		url			: '../plan/makePlanTreeByPID.do',
		type		: 'post',
		data		: {
			//参数
			id	: domIds[0],
			modelLevel : modelLevel,
			fatherId : id
		},
		success		: function(data){
			var projectData = data.record.fileTree;
			var projectMenu = "";
			if($("#"+id).attr("flag") != "true"){
				for(var i = 0;i<projectData.length;i++){
					if(id == projectData[i].pId){
						if(projectData[i].name == "模型"){
							projectMenu +=
				            '<ul class="fasj_next_menu_k_m1">' +
				                '<span class="gxk5"><input type="checkbox" name="" id="' + projectData[i].id + 'Model" onclick="checkAllModel(\'' + projectData[i].id + '\', this, \'' + domId + '\',\'' + data.record.points + '\',\'' + data.record.meshCode + '\');"></span>' +
				                '<div class="fasjqh_fanga_zl" name="false">' +
				                    '<span class="fasj_menu_text_z4" style="width: 120px;" onclick="loadProjectClassMenu2(this,\'' + projectData[i].id + '\',\'' + domId + '\');">模型</span>' +
				                    '<span class="jtqh"></span>' +
				                '</div>' +
				            '</ul>' + 
				            '<div class="fasjqh_fanga_zl_menu" id="' + projectData[i].id + '" style="display:none;"></div>';
						}else if(projectData[i].name == "方案资料"){
							projectMenu +=
							'<ul class="fasj_next_menu_k_m1">' +
					            '<span class="gxk5"><img src="../img/ziliao.png"></span>' +
					            '<div class="fasjqh_fanga_zl" name="false">' +
					                '<span class="fasj_menu_text_z4" style="width: 120px;" onclick="loadProjectClassMenu2(this,\'' + projectData[i].id + '\',\'' + domId + '\');">方案资料</span>' +
					                '<span class="jtqh"></span>' +
					            '</div>' +
					        '</ul>' +
					        '<div class="fasjqh_fanga_zl_menu" id="' + projectData[i].id + '" style="display:none;"></div>';
						}
					}
				}
				$("#" + id).html(projectMenu);
				
				$('.fasjqh_fanga_zl').unbind('click').click(function(){
					$(this).parent().next().toggle();
					$(this).children('.jtqh').toggleClass('jtqhclick');
				});
				
	//			$('.wb_menu').hide();
	//			$('.lzwbk_m').unbind('click').click(function(){
	//				$(this).next().toggle();
	//				$(this).children('.jtqh').toggleClass('jtqhclick');
	//			});
				$("#"+id).attr("flag","true");
			}
		},error		: function(data){
			
		}
	});
}

/**
 * 加载子方案列表2层
 * 
 * @param obj,节点对象 
 * @param id,元素ID 
 * @param domId,节点ID 
 */
function loadProjectClassMenu2(obj, id, domId){
	var domIds = domId.split("_");
	var modelLevel;
	if(domIds[1] == "杭州规划局"){
		modelLevel = 1;
	}else if(domIds[1] == "杭州规划院"){
		modelLevel = 2;
	}
	$.ajax({
		url			: '../plan/makePlanTreeByPID.do',
		type		: 'post',
		data		: {
			//参数
			id	: domIds[0],
			modelLevel : modelLevel,
			fatherId : id
		},
		success		: function(data){
			var projectData = data.record.fileTree;
			var projectMenu = "";
			var dataArr = [];
			for(var i = 0;i<projectData.length;i++){
				if(id == projectData[i].pId){
					dataArr.push(projectData[i]);
				}
			}
			if(obj.parentNode.name == "false"){
				for(var i = 0;i<projectData.length;i++){
					if(projectData[i].id == id){
						if(projectData[i].name == "模型"){
							for(var j = 0;j<dataArr.length;j++){
								projectMenu +=
								'<ul class="lzwbk_m1">' + 
				                	'<span class="gx_k2"><input type="checkbox" value="' + dataArr[j].id + ',' + dataArr[j].pId + ',' + dataArr[j].url + '" name="' + dataArr[j].pId + 'Child" onclick="loadProjectModel(\'' + dataArr[j].id + '\',\'' + dataArr[j].pId + '\',\'' + dataArr[j].url + '\', this, \'' + domId + '\',\'' + data.record.points + '\',\'' + data.record.meshCode + '\');"></span>'+
				                    '<span class="fasj_menu_text_z7">' + dataArr[j].name + '</span>' + 
				                '</ul>'; 
							}
						}else if(projectData[i].name == "方案资料"){
							for(var j = 0;j<dataArr.length;j++){
								projectMenu +=
								'<ul class="lzwbk_m">' + 
					                '<span class="fasj_menu_text_z5"  style="width: 120px;" onclick="loadProjectClassMenu3(\'' + dataArr[j].id + '\',\'' + domId + '\');">' + dataArr[j].name + '</span>' + 
					                '<span class="jtqh"></span>' + 
					            '</ul>' +
					            '<div class="wb_menu" style="display:none;" id="' + dataArr[j].id + '"></div>';
							}
						}
					}
				}
				$("#" + id).html(projectMenu);
//				$('.fasjqh_fanga_zl').unbind('click').click(function(){
//					$(this).parent().next().toggle();
////					$(this).children('.jtqh').toggleClass('jtqhclick');
//				});
				$('.lzwbk_m').unbind('click').click(function(){
					$(this).next().toggle();
					$(this).children('.jtqh').toggleClass('jtqhclick');
				});
				obj.parentNode.name = "true";
			}
		},error		: function(data){
			
		}
	});
}

/**
 * 加载子方案列表3层
 * 
 * @param id,元素ID 
 * @param domId,节点ID 
 */
function loadProjectClassMenu3(id, domId){
	var domIds = domId.split("_");
	var modelLevel;
	if(domIds[1] == "杭州规划局"){
		modelLevel = 1;
	}else if(domIds[1] == "杭州规划院"){
		modelLevel = 2;
	}
	$.ajax({
		url			: '../plan/makePlanTreeByPID.do',
		type		: 'post',
		data		: {
			//参数
			id	: domIds[0],
			modelLevel : modelLevel,
			fatherId : id
		},
		success		: function(data){
			var projectData = data.record.fileTree;
			var projectMenu = "";
			var dataArr = [];
			for(var i = 0;i<projectData.length;i++){
				if(id == projectData[i].pId){
					dataArr.push(projectData[i]);
				}
			}
			for(var i = 0;i<dataArr.length;i++){
				var names = dataArr[i].name.split(".");
				projectMenu += 
                '<ul class="fasj_next_menu_k_m1">'; 
				var paths = dataArr[i].url;
				if(paths.split(".")[1] == "jpg" || paths.split(".")[1] == "png" || paths.split(".")[1] == "bmp" || paths.split(".")[1] == "tiff"){//判断是否存放图片文件夹
					projectMenu += 
					'<span class="fasj_menu_text_z6" style="width: 105px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" onclick="openProjectImg(\'' + dataArr[i].url + '\',\'' + dataArr[i].name + '\');">' + names[0] + '</span>';
				}else{
					projectMenu += 
					'<span class="fasj_menu_text_z6" style="width: 105px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + names[0] + '</span>' + 
					'<span class="xiazai_icon" onclick="projectDownload1();"></span>';
					// '<span class="xiazai_icon" onclick="projectDownload(\'' + dataArr[i].url + '\',\'' + dataArr[i].name + '\');"></span>';
				}   
                projectMenu += 
                '</ul>';
			}
			$("#" + id).html(projectMenu);
			
//			$('.wb_menu').hide();
//			document.getElementById(id).style.display = "block";
//			$('.lzwbk_m').unbind('click').click(function(){
//				$(this).next().toggle();
//				$(this).children('.jtqh').toggleClass('jtqhclick');
//			});
		},error		: function(data){
			
		}
	});
}

var modelArr = [];
/**
 * 加载方案模型
 * 
 * @param id,元素ID 
 * @param pId,元素PID 
 * @param url,访问路径 
 * @param obj,节点对象 
 * @param domId,节点ID 
 * @param points,压平点集 
 * @param meshCode,压平图幅号集合 
 */
function loadProjectModel(id, pId, url, obj, domId, points, meshCode){
	var index = url.lastIndexOf('/');
	var path = url.substring(0, index + 1);
	var pathName = url.substring(index + 1, url.length);
	var nameId = pId + "Child";
	var allId = pId + "Model";
	
	if(obj.checked){
		//createAreaHidding(points, meshCode);
		var ObjClass = {};
		ObjClass.index = pId;
		var obj = {};
		obj.index = id;
		obj.model = map3D.loadGMS1(path, pathName);
		ObjClass.modelObj = obj;
		modelArr.push(ObjClass);
		
		var boxList = document.getElementsByName(nameId);
		for(var i=0;i<boxList.length;i++){
			if(!boxList[i].checked){
				return;
			}
		}
		document.getElementById(allId).checked = true;
	}else{
		for(var i=0;i<planStateArr.length;i++){
			if(planStateArr[i].planChildID.split("#@")[0] == pId){
				if(planStateArr[i].planChildID.split("#@")[2] == "1"){
					map.SetCurrentMapViewID(mv1.GetMapViewID());
				}else if(planStateArr[i].planChildID.split("#@")[2] == "2"){
					map.SetCurrentMapViewID(mv2.GetMapViewID());
				}
			}
		}
		for(var i = 0;i<screenModelArr.length;i++){
			if(screenModelArr[i].index == pId){
				if(screenModelArr[i].modelObj.index == id){
					map3D.removelayer(screenModelArr[i].modelObj.model);
				}
			}
		}
		removeByValue(screenModelArr, id);
		document.getElementById(allId).checked = false;	
		var boxList = document.getElementsByName(nameId);
		for(var i=0;i<boxList.length;i++){
			if(boxList[i].checked){
				return;
			}
		}
		for(var i=0;i<planStateArr.length;i++){
			if(planStateArr[i].planChildID.split("#@")[0] == id){
				if(planStateArr[i].planChildID.split("#@")[2] == "1"){
					map3D.removelayer(areaHidding);
					areaHidding = null;
				}
			}
		}
	}
	
}

/**
 * 控制变量数组
 * 
 * @param arr,变量数组 
 * @param val,元素index值 
 */
function removeByValue(arr, val){
	for(var i=0; i<arr.length; i++) {
		if(arr[i].modelObj.index == val) {
			arr.splice(i, 1);
			break;
		}
	}
	return arr;
}

/**
 * 模型全选触发
 * 
 * @param id,元素ID 
 * @param obj,节点对象
 * @param domId,节点ID
 * @param points,压平点集
 * @param meshCode,压平图幅号集合
 */
var stateForMV = false;
var planStateArr = [];//[{planID:planChildID + "#@" + "flag"}],planChildID存在代表该方案子项已被操作过,flag代表此时是否处于勾选状态
var afterBoxList;
var afterBox = [];
var fffMV = 0;
function checkAllModel(id, obj, domId, points, meshCode){
	var nameId = id + "Child";
	var boxList = document.getElementsByName(nameId);

	if(obj.checked){
		if(boxList.length){
			if(!stateForMV){//分屏未开启,说明当前未开启分屏或分屏已被关闭
				if(planStateArr.length){//分屏方案数组存在,说明已有过方案状态有变
					for(var i=0;i<planStateArr.length;i++){
						if(planStateArr[i].planChildID.split("#@")[1] == "true"){//数组中有项目状态为true,说明当前已有方案勾选
							if(planStateArr[i].planChildID.split("#@")[2] == "1" && planStateArr[i].planID != id.split("_")[0]){//说明当前勾选和已存在勾选项目为不同项目,无需去除
								setTraversal(boxList, true);
								if(!containsPlanID(planStateArr, id, "planChildID")){
									var obj = {};
									obj.planID = id.split("_")[0];
									obj.planChildID = id + "#@true#@1";
									planStateArr.push(obj);
								}else{
									planStateArr[i].planChildID = planStateArr[i].planChildID.split("#@")[0] + "#@true#@1";
								}
							}else if(planStateArr[i].planChildID.split("#@")[2] == "1" && planStateArr[i].planID == id.split("_")[0] && planStateArr[i].planChildID.split("#@")[0] != id){//当前勾选和已存在勾选为同一项目不同子项,则进行分屏添加
								if(fffMV == 0){
									addScreen(0);
									fffMV = 1;
								}else{
									addScreen(1);
								}
								stateForMV = true;
								setTraversal(boxList, true);
								if(!containsPlanID(planStateArr, id, "planChildID")){
									var obj = {};
									obj.planID = id.split("_")[0];
									obj.planChildID = id + "#@true#@2";
									planStateArr.push(obj);
								}else{
									setFlagByID(planStateArr, id, "true");
								}
							}
						}else if(planStateArr[i].planChildID.split("#@")[1] == "false" && planStateArr[i].planChildID.split("#@")[0] == id){//对于已经隐藏的方案进行显影
							if(containsPlanFlag(planStateArr, id)){
//								setTraversal(boxList, true);
								planStateArr[i].planChildID = planStateArr[i].planChildID.split("#@")[0] + "#@true#@2";
							}else{
								setTraversal(boxList, true);
								planStateArr[i].planChildID = planStateArr[i].planChildID.split("#@")[0] + "#@true#@1";
							}
						}else if(planStateArr[i].planChildID.split("#@")[1] == "false" && !containsPlanID(planStateArr, id, "planID")){
							setTraversal(boxList, true);
							var obj = {};
							obj.planID = id.split("_")[0];
							obj.planChildID = id + "#@true#@1";
							planStateArr.push(obj);
						}
					}
				}else{
					setTraversal(boxList, true);
					var obj = {};
					obj.planID = id.split("_")[0];
					obj.planChildID = id + "#@true#@1";
					planStateArr.push(obj);
				}
			}else{
				if(planStateArr.length){//分屏方案数组存在,说明已有过方案状态有变
					for(var i=0;i<planStateArr.length;i++){
						if(planStateArr[i].planChildID.split("#@")[1] == "true"){//数组中有项目状态为true,说明当前已有方案勾选
							if(planStateArr[i].planChildID.split("#@")[2] == "2" && planStateArr[i].planID == id.split("_")[0] && planStateArr[i].planChildID.split("#@")[0] != id){//当前勾选和已存在勾选为同一项目不同子项,则进行分屏方案更新
								map.SetCurrentMapViewID(mv2.GetMapViewID());
								afterBoxList = document.getElementsByName(planStateArr[i].planChildID.split("#@")[0] + "Child");
								afterBox = document.getElementById(planStateArr[i].planChildID.split("#@")[0] + "Model");
								setTraversal(afterBoxList, false);
								afterBox.checked = false;
								planStateArr[i].planChildID = planStateArr[i].planChildID.split("#@")[0] + "#@false#@2";
								setTraversal(boxList, true);
//								planStateArr[i].planChildID = id + "#@true";
								if(!containsPlanID(planStateArr, id, "planChildID")){
									var obj = {};
									obj.planID = id.split("_")[0];
									obj.planChildID = id + "#@true#@2";
									planStateArr.push(obj);
								}else{
									setFlagByID(planStateArr, id, "true");
								}
							}else if(planStateArr[i].planChildID.split("#@")[2] == "2" && planStateArr[i].planID != id.split("_")[0]){//当前勾选和已存在勾选为不同方案,且该方案未加载过,则删除分屏
								map.SetCurrentMapViewID(mv2.GetMapViewID());
								afterBoxList = document.getElementsByName(planStateArr[i].planChildID.split("#@")[0] + "Child");
								afterBox = document.getElementById(planStateArr[i].planChildID.split("#@")[0] + "Model");
								setTraversal(afterBoxList, false);
								afterBox.checked = false;
								planStateArr[i].planChildID = planStateArr[i].planChildID.split("#@")[0] + "#@false#@2";
								if(containsPlanID(planStateArr, id, "planID")){
									if(containsPlanID(planStateArr, id, "planChildID")){
										setTraversal(boxList, true);
										setFlagByID(planStateArr, id, "true");
									}else{
										setTraversal(boxList, true);
										var obj = {};
										obj.planID = id.split("_")[0];
										obj.planChildID = id + "#@true#@2";
										planStateArr.push(obj);
									}
								}else{
									delScreen();
									stateForMV = false;
									setTraversal(boxList, true);
									var obj = {};
									obj.planID = id.split("_")[0];
									obj.planChildID = id + "#@true#@1";
									planStateArr.push(obj);
								}
							}
						}
					}
				}
			}
		}else{
			var domIds = domId.split("_");
			var modelLevel;
			if(domIds[1] == "杭州规划局"){
				modelLevel = 1;
			}else if(domIds[1] == "杭州规划院"){
				modelLevel = 2;
			}
			$.ajax({
				url			: '../plan/makePlanTreeByPID.do',
				type		: 'post',
				data		: {
					id	: domIds[0],
					modelLevel : modelLevel,
					fatherId : id
				},
				success		: function(data){
					var projectData = data.record.fileTree;
					var projectMenu = "";
					var dataArr = [];
					for(var i = 0;i<projectData.length;i++){
						if(id == projectData[i].pId){
							dataArr.push(projectData[i]);
						}
					}
					if(obj.parentNode.nextSibling.name == "false"){
						for(var i = 0;i<projectData.length;i++){
							if(projectData[i].id == id){
								if(projectData[i].name == "模型"){
									for(var j = 0;j<dataArr.length;j++){
										projectMenu +=
										'<ul class="lzwbk_m1">' + 
						                	'<span class="gx_k2"><input type="checkbox" value="' + dataArr[j].id + ',' + dataArr[j].pId + ',' + dataArr[j].url + '" name="' + dataArr[j].pId + 'Child" onclick="loadProjectModel(\'' + dataArr[j].id + '\',\'' + dataArr[j].pId + '\',\'' + dataArr[j].url + '\', this, \'' + domId + '\',\'' + data.record.points + '\',\'' + data.record.meshCode + '\');"></span>'+
						                    '<span class="fasj_menu_text_z7">' + dataArr[j].name + '</span>' + 
						                '</ul>'; 
									}
								}else if(projectData[i].name == "方案资料"){
									for(var j = 0;j<dataArr.length;j++){
										projectMenu +=
										'<ul class="lzwbk_m">' + 
							                '<span class="fasj_menu_text_z5" onclick="loadProjectClassMenu3(\'' + dataArr[j].id + '\',\'' + domId + '\');">' + dataArr[j].name + '</span>' + 
							                '<span class="jtqh"></span>' + 
							            '</ul>' +
							            '<div class="wb_menu" style="display:none;" id="' + dataArr[j].id + '"></div>';
									}
								}
							}
						}
						$("#" + id).html(projectMenu);
						obj.parentNode.nextSibling.name = "true";
					}
					checkAllModel(id, obj, domId, points, meshCode);
				},error		: function(data){
					
				}
			});
		}
	}else{
		if(stateForMV){
			map.SetCurrentMapViewID(mv2.GetMapViewID());
			var mv2StateIndex = 0;
			for(var i=0;i<planStateArr.length;i++){
				if(planStateArr[i].planChildID.split("#@")[1] == "true" && planStateArr[i].planChildID.split("#@")[2] == "2"){
					mv2StateIndex++;
				}
			}
			for(var i=0;i<planStateArr.length;i++){
				if(planStateArr[i].planChildID.split("#@")[0] == id && planStateArr[i].planChildID.split("#@")[2] == "1"){
					map.SetCurrentMapViewID(mv1.GetMapViewID());
					afterBoxList = document.getElementsByName(id + "Child");
					afterBox = document.getElementById(id + "Model");
					setTraversal(afterBoxList, false);
					afterBox.checked = false;
					planStateArr[i].planChildID = planStateArr[i].planChildID.split("#@")[0] + "#@false#@1";
					for(var j=0;j<planStateArr.length;j++){
						if(planStateArr[j].planChildID.split("#@")[1] == "true" && planStateArr[j].planChildID.split("#@")[2] == "2"){
							map.SetCurrentMapViewID(mv2.GetMapViewID());
							afterBoxList = document.getElementsByName(planStateArr[j].planChildID.split("#@")[0] + "Child");
							afterBox = document.getElementById(planStateArr[j].planChildID.split("#@")[0] + "Model");
							setTraversal(afterBoxList, false);
							afterBox.checked = false;
							setFlagByID(planStateArr, planStateArr[j].planChildID.split("#@")[0], "false");
							delScreen();
							stateForMV = false;
						}
					}
				}else if(planStateArr[i].planChildID.split("#@")[0] == id && planStateArr[i].planChildID.split("#@")[2] == "2"){
					afterBoxList = document.getElementsByName(id + "Child");
					afterBox = document.getElementById(id + "Model");
					setTraversal(afterBoxList, false);
					afterBox.checked = false;
					setFlagByID(planStateArr, id, "false");
					if(mv2StateIndex == 1){
						delScreen();
						stateForMV = false;
					}
				}
			}
		}else{
			for(var i=0;i<planStateArr.length;i++){
				if(planStateArr[i].planChildID.split("#@")[1] == "true" && planStateArr[i].planChildID.split("#@")[0] == id){
					map.SetCurrentMapViewID(mv1.GetMapViewID());
					afterBoxList = document.getElementsByName(planStateArr[i].planChildID.split("#@")[0] + "Child");
					afterBox = document.getElementById(planStateArr[i].planChildID.split("#@")[0] + "Model");
					setTraversal(afterBoxList, false);
					afterBox.checked = false;
					planStateArr[i].planChildID = planStateArr[i].planChildID.split("#@")[0] + "#@false#@1";
				}
			}
		}
		if(areaHidding != null){
			map3D.removelayer(areaHidding);
			areaHidding = null;
		}
	}
}

/**
 * 当文本框中键入enter时，触发查询
 */
function keyDownQueryPlanning(){
	var event = document.all ? window.event : e;
	if(event.keyCode==13){
		searchSubmitPlanning();
	}
}

/**
 * 方案界面,修改查询类型
 * 
 * @param type,搜索框类型
 */
function changeSearchTypePlanning(type){
	if(type == 'plan'){
		getAreaCodeList();
	}else if(type == 'regulatory'){
		
	}
	$('#searchPlanningType').val(type);
}

/**
 * 方案界面，触发查询
 */
function searchSubmitPlanning(){
	var searchType = $('#searchPlanningType').val();
	if(searchType == 'regulatory'){
//		$('.k4').click();
//		$('#kg_btn').click();
//		queryKGFA(1);
		getRegulatoryList("1");
	}else if(searchType == 'plan'){
		getAreaCodeList();
	}
}

function projectDownload1(){
	alert("很抱歉!请联系管理员开放文件下载功能!");
}

/**
 * 规划数据按钮触发事件
 */
function simpleClick(){
	if(planningFlag){
		changeSearchTypePlanning('plan');
		planningFlag = 0;
	}
}

/**
 * 开启分屏
 */
function addScreen(index){
	if(index == 0){
		var mapviewDefOpt = map.CreateMapViewOptions();
		mapviewDefOpt.AddConfig("ViewPort", "0,0,0.5,1");
		mv1.UpdateMapViewOptions(mapviewDefOpt);
		var mapviewOpt = map.CreateMapViewOptions();
		mapviewOpt.AddConfig("CameraName", "split1");
		mapviewOpt.AddConfig("RenderOrder", "2");
		mapviewOpt.AddConfig("IsOrtho", "false");
		mapviewOpt.AddConfig("Aspect", "2");
		mapviewOpt.AddConfig("Fovy", "35");
		mapviewOpt.AddConfig("ZNear", "10");
		mapviewOpt.AddConfig("ZFar", "100000000");
		//mapviewOpt.AddConfig("ClearFlagFilePath", "F:\\MainLibrary\\CooGis SDK 6.0\\Code\\branches\\SDK_6.0\\bin\\data\\Skybox\\");
		mapviewOpt.AddConfig("ClearFlagColor", "1,0,0,1");
		mapviewOpt.AddConfig("ViewPort", "0.5,0,0.5,1");
		mapviewOpt.AddConfig("Eye", "0,0,15");
		mapviewOpt.AddConfig("Center", "0,0,0");
		mapviewOpt.AddConfig("Up", "0,1,0");
		var refObj = map.GetRefrenceSystem();
		var points = map3D.getViewPoint().split(";");
		mv2 = map.CreateMapView(refObj, mapviewOpt);
		var op = mv2.GetMapViewOptions();
		map.SetCurrentMapViewID(mv2.GetMapViewID());
		map3D.flyPosition(points[0].split(":")[1], points[1].split(":")[1], points[2].split(":")[1], points[3].split(":")[1], points[4].split(":")[1], points[5].split(":")[1], 0);
		$(".btm_right_top_right_fpld").css("display", "block"); 
		$(".btm_right_top_right_line_1").css("display", "block"); 
		alert("分屏开启");
	}else{
		map.SetCurrentMapViewID(mv2.GetMapViewID());
		var points = map3D.getViewPoint().split(";");
		map3D.flyPosition(points[0].split(":")[1], points[1].split(":")[1], points[2].split(":")[1], points[3].split(":")[1], points[4].split(":")[1], points[5].split(":")[1], 0);
		$(".btm_right_top_right_fpld").css("display", "block"); 
		$(".btm_right_top_right_line_1").css("display", "block"); 
		alert("分屏再次开启");
	}
}

/**
 * 关闭分屏
 */
function delScreen(){
//	map.DestroyMapView(mv2);
//	var opt = map.CreateMapViewOptions();
//	opt.AddConfig("ViewPort", "0,0,1,1");
//	mv1.UpdateMapViewOptions(opt);
	alert("关闭分屏");
	map.SetCurrentMapViewID(mv1.GetMapViewID());
	$(".btm_right_top_right_fpld").css("display", "none"); 
	$(".btm_right_top_right_line_1").css("display", "none"); 
}

/**
 * 开启分屏
 */
function mvTable(){
	if(mvState){
		content3d.detachEvent("FireOnLButtonUp", buttonEventForMV);
		content3d.detachEvent("FireOnRButtonUp", buttonEventForMV);
		content3d.detachEvent("FireOnMouseWheel", mouseWheelEventForMV);
		$(".btm_right_top_right_fpld").css("background-image", "url(../img/fpld1.png)"); 
		mvState = false;
	}else{
		content3d.attachEvent("FireOnLButtonUp", buttonEventForMV);
		content3d.attachEvent("FireOnRButtonUp", buttonEventForMV);
		content3d.attachEvent("FireOnMouseWheel", mouseWheelEventForMV);
		$(".btm_right_top_right_fpld").css("background-image", "url(../img/fpld2.png)");
		mvState = true;
	}
}

/**
 * 单击联动
 */
function buttonEventForMV(x, y){
	var map3DWidth = $("#map3D").width();
	if(x > map3DWidth/2){
		setPointForMV("2TO1");
	}else{
		setPointForMV("1TO2");
	}
}

/**
 * 滚轮联动
 */
function mouseWheelEventForMV(x, y){
	var theWidth = document.body.clientWidth;
	var map3DWidth = $("#map3D").width();
	if(planState == 0 || cityListState == 0 || dttcState == 0 || dtgjState == 0 || sdscState ==0){
		if(x > 350 && x < (map3DWidth/2 + 350)){
			setPointForMV("1TO2");
		}else if(x > (map3DWidth/2 + 350) && x < theWidth){
			setPointForMV("2TO1");
		}
	}else{
		if(x > 70 && x < (map3DWidth/2 + 70)){
			setPointForMV("1TO2");
		}else if(x > (map3DWidth/2 + 70) && x < theWidth){
			setPointForMV("2TO1");
		}
	}
}

function setPointForMV(type){
	if(type == "1TO2"){
		map.SetCurrentMapViewID(mv1.GetMapViewID());
		var points = map3D.getViewPoint().split(";");
		map.SetCurrentMapViewID(mv2.GetMapViewID());
		map3D.flyPosition(points[0].split(":")[1], points[1].split(":")[1], points[2].split(":")[1], points[3].split(":")[1], points[4].split(":")[1], points[5].split(":")[1], 0);
	}else if(type == "2TO1"){
		map.SetCurrentMapViewID(mv2.GetMapViewID());
		var points = map3D.getViewPoint().split(";");
		map.SetCurrentMapViewID(mv1.GetMapViewID());
		map3D.flyPosition(points[0].split(":")[1], points[1].split(":")[1], points[2].split(":")[1], points[3].split(":")[1], points[4].split(":")[1], points[5].split(":")[1], 0);
	}
}

function containsPlanID(arr, id, type) {
	if(type == "planID"){
		var ids = arr.length;  
	    for(var i=0;i<ids;i++){
	    	if (arr[i].planID === id.split("_")[0]) {  
	            return true;  
	        } 
	    }
	    return false; 
	}else if(type == "planChildID"){
		var ids = arr.length;  
	    for(var i=0;i<ids;i++){
	    	if (arr[i].planChildID.split("#@")[0] === id) {  
	            return true;  
	        } 
	    }
	    return false; 
	}
     
}  

function setTraversal(boxList, flag){
	if(flag){
		for(var j=0;j<boxList.length;j++){
			var str = boxList[j].value;
			var strArr = str.split(",");
			var index = strArr[2].lastIndexOf('/');
			var path = strArr[2].substring(0, index + 1);
			var pathName = strArr[2].substring(index + 1, strArr[2].length);
			if(!boxList[j].checked){
				var ObjClassMV = {};
				ObjClassMV.index = strArr[1];
				var objMV = {};
				objMV.index = strArr[0];
				objMV.model = map3D.loadGMS1(path, pathName);
				ObjClassMV.modelObj = objMV;
				screenModelArr.push(ObjClassMV);
				boxList[j].checked = true;
			}
		}
	}else{
		for(var j=0;j<boxList.length;j++){
			var str = boxList[j].value;
			var strArr = str.split(",");
			for(var k = 0;k<screenModelArr.length;k++){
				if(screenModelArr[k].index == strArr[1]){
					if(screenModelArr[k].modelObj.index == strArr[0]){
						map3D.removelayer(screenModelArr[k].modelObj.model);
						removeByValue(screenModelArr, strArr[0]);
						boxList[j].checked = false;
					}
				}
			}
		}
	}
}

function setFlagByID(arr, id, flag){
	for(var i=0;i<arr.length;i++){
		if(arr[i].planChildID.split("#@")[0] == id){
			if(flag == "true"){
				arr[i].planChildID = arr[i].planChildID.split("#@")[0] + "#@true#@2";
			}else if(flag == "false"){
				arr[i].planChildID = arr[i].planChildID.split("#@")[0] + "#@false#@2";
			}
		}
	}
}

function containsPlanFlag(arr, id){
	for(var i=0;i<arr.length;i++){
		if(arr[i].planID === id.split("_")[0]){
			if(arr[i].planChildID.split("#@")[1] == "true" && arr[i].planChildID.split("#@")[2] == "1"){
				return true;
			}
		}
	}
	return false;
}