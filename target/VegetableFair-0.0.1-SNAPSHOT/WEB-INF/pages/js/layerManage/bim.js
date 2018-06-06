/**
 * BIM功能板块
 * 
 * @author DL
 * @version 7.0
 */

// 是否初次加载BIM列表
var fristBimListFlag = true;
// 提供给方案压平,保存格式为key(服务名):value(图层对象)
var BIMLayerList = [];
// 列表层级功能,每个层级对应的key和value
var keyLevel = {};
// 加载功能,BIM加载路径,保存格式为key(ID):path(加载路径)
var bimPath = [];
// 飞行定位功能,BIM属性信息,保存格式为key(ID):attribute(图层对象属性)
var bimAttribute = [];
// 显隐功能,BIM集合,保存格式为key(ID):value(图层对象)
var bimLayerArray = [];
// 中间数组,处理ID和服务名匹配,保存格式为key(ID):value(服务名)
var BIMServerNameByID = [];

/**
 * 获取BIM列表并生成页面
 */
function getBimList() {
	// 仅第一次加载发送服务请求
	if (fristBimListFlag) {
		// 获取登录用户对应服务的服务名列表
		var sname = getSnameArrayByType("bim");
		$.ajax({
			type : 'POST',
			data : {
				cityCode : "",
				stype : "bim",
				sname : sname
			},
			url : '../layerManager/getCoverageList',
			success : function(data) {
				if (data.success == "1") {
					var bimList = createBimList(data);
					$("#bimList").html(bimList);
					// 生成列表添加样式
					$('.z_menu1').parent().next(".tree_k1").hide();
					$('.z_menu1').parent().next(".tree_k1_1").hide();
					$('.z_menu1').click(function() {
						$(this).children('.tree_xl').toggleClass('tree_xlclick');
						$(this).parent().next(".tree_k1").toggle();
						$(this).parent().next(".tree_k1_1").toggle();
					});
				}
			},
			error : function(e) {
			}
		});
	}
	fristBimListFlag = false;
}

/**
 * 生成BIM列表,第一层级
 * 
 * @param data,结果集
 * @return bimList,列表节点
 */
function createBimList(data) {
	// 每个层级对应的key和value
	getLevelKey(data);
	var bimList = '<div id="bimListAuto" style="HEIGHT: 750px; OVERFLOW: auto; OVERFLOW-X: hidden">';
	// 第一层
	var firstLevel = keyLevel[1];
	for (var i = 0; i < firstLevel.length; i++) {
		var level = firstLevel[i];
		var parentKey = level.pId;
		var key = level.id;
		var name = level.name;
		var record = level.value;
		var id = record.id;
		var path = record.path;
		bimList += '<ul id="tree_g1" class="map_dttc_menu_tree_menu">';
		bimList += '<div id="' + key + '" value="0" id="tree_z1" style="cursor: pointer;" class="z_menu1">';
		bimList += '<span class="tree_xl"></span>';
		bimList += '<span class="tree_icon" style="background:url(../img/bim1.png);"></span>';
		bimList += '<span class="tree_text">' + name + '</span>';
		bimList += '</div>';
		bimList += '<span class="tree_xy" id="' + key + "_xy" + '" value="0" onclick="choosedAll(\'' + key + '\')"></span>';
		bimList += '</ul>';
		bimList += createBimSecList(key);
	}
	bimList += '</div>';
	return bimList;
}

/**
 * 生成BIM列表,第二层级
 * 
 * @param levelPID,父节点PID
 * @return bimList,列表节点
 */
function createBimSecList(levelPID) {
	var bimList = '<div class="tree_k1">';
	// 第二层
	var secondLevel = keyLevel[2];
	for (var i = 0; i < secondLevel.length; i++) {
		var level = secondLevel[i];
		var parentKey = level.pId;
		var key = level.id;
		var name = level.name;
		var record = level.value;
		var id = record.id;
		var path = record.path;
		var changedName = path.substring(path.lastIndexOf("/")+1,path.length);
		if (parentKey == levelPID) {
			bimList += '<ul id="tree_g2" class="map_dttc_menu_tree_menu">';
			bimList += '<div id="' + key + '" value="0" style="cursor: pointer;" class="z_menu1">';
			bimList += '<span style="margin-left: 20px;" class="tree_xl"></span>';
			bimList += '<span class="tree_icon" style="background:url(../img/bim2.png);filter:alpha(opacity=80);"></span>';
			bimList += '<span class="tree_text">' + changedName + '</span>';
			bimList += '</div>';
			bimList += '<input type="hidden" id="' + key + "_pId" + '" value="' + levelPID + '"/>';
			bimList += '<span class="tree_xy" name="' + levelPID + '_BIM" id="' + key + "_xy" + '" value="0" onclick="choosedByPID(\'' + key + '\')"></span>';
			bimList += '</ul>';
			bimList += createBimThirList(key);
		}
	}
	bimList += '</div>';
	return bimList;
}

/**
 * 生成BIM列表,第三层级
 * 
 * @param levelPID,父节点PID
 * @return bimList,列表节点
 */
function createBimThirList(levelPID) {
	var bimList = '<div class="tree_k1_1">';
	// 第三层
	var thirdLevel = keyLevel[3];
	for (var i = 0; i < thirdLevel.length; i++) {
		var level = thirdLevel[i];
		var parentKey = level.pId;
		var key = level.id;
		var name = level.name;
		var record = level.value;
		var id = record.id;
		var path = record.path;
		var changedName = changeToChinese(path);
		var attribute = record.attribute;
		bimPath[id] = record.path;
		if (attribute) {
			bimAttribute[id] = attribute;
		}
		BIMServerNameByID[id] = changedName;
		if (parentKey == levelPID) {
			bimList += '<ul class="map_dttc_menu_tree_menu">';
			bimList += '<div id="' + id + '" value="0" style="cursor: pointer;" class="z_menu1" onclick="flyBimPostion(\'' + id + '\')">';
			bimList += '<span style="margin-left: 60px;background:url(../img/bim3.png);filter:alpha(opacity=60);" class="tree_icon1"></span>';
			bimList += '<span class="tree_text1">' + changedName + '</span>';
			bimList += '</div>';
			bimList += '<input type="hidden" id="' + id + "_pId" + '" value="' + levelPID + '"/>';
			bimList += '<span class="tree_xy" name="' + levelPID + '_BIM" id="' + id + "_xy" + '" value="0" onclick="judgementBim(\'' + id + '\')"></span>';
			bimList += '</ul>';
		}
	}
	bimList += '</div>';
	return bimList;
}

/**
 * 加载BIM
 * 
 * @param id,唯一标识
 * @return layer,图层对象
 */
function loadBim(id) {
	var layer;
	// 该id对应的加载路径
	var url = bimPath[id];
	var types = url.split('/');
	var type = types[types.length - 1].split(".");
	// 根据路径名判断数据类型
	if ($.inArray("wrl", type) != -1) {// wrl格式
		var wrlURL = url.substring(0, url.lastIndexOf('/'));
		var baseURL = url.substring(0, wrlURL.lastIndexOf('/') + 1);
		var serverName = url.substring(wrlURL.lastIndexOf('/') + 1,
				wrlURL.length);
		layer = map3D.loadGMS(baseURL, serverName);
	} else {// c3s格式
		layer = map3D.loadC3S(url);
	}
	layer.Locate();
	return layer;
}

/**
 * 将服务名改为文件夹名
 * 
 * @param url,数据请求路径
 * @returns changedName,文件夹名
 */
function changeToChinese(url){
	var result = url.substring(0, url.lastIndexOf('/'));
	var changedName = result.substring(result.lastIndexOf('/')+1,result.length);
	return changedName;
}

/**
 * 图层显隐控制
 * 
 * @param id,唯一标识
 * @param layerArray,保存图层的数组
 * @param flag,显示还是隐藏的控制状态
 */
function showOrHideBim(id, layerArray, flag) {
	var layer;
	for (var i = 0; i < layerArray.length; i++) {
		if (id == layerArray[i].id) {
			if (layerArray[i].layer) {
				layer = layerArray[i].layer;
			}
		}
	}
	// ture-已显示-执行隐藏
	// false-已隐藏-执行显示
	if (flag) {
		map3D.hidelayer(layer);
	} else {
		map3D.showlayer(layer);
	}
}

/**
 * 飞行定位
 * 
 * @param id,唯一标识
 */
function flyBimPostion(id) {
	// 获取对应属性值
	var attribute = bimAttribute[id];
	if (attribute) {
		var lon = eval(attribute.longitude);
		var lat = eval(attribute.latitude);
		var height = eval(attribute.elevation);
		var Azimuth = eval(attribute.azimuth);
		var Pitch = eval(attribute.pitch);
		var range = eval(attribute.range);
		var time = 3;
		// 飞行定位
		map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
	}
}

/**
 * 全选---第一层级显隐
 * 
 * @param key,唯一标识
 */
function choosedAll(key){
	// 获取子节点
	var level = keyLevel[2];
	// 勾选状态
	var isAll = $('#' + key + '_xy').val();
	for(var i=0;i<level.length;i++){
		var record = level[i];
		if(record.pId == key){
			// 子节点的key
			var childKey = record.id
			// 显隐按钮
			var value = $('#' + childKey + '_xy').val();
			if(isAll == "0"){// 全勾选
				$('#' + key + '_xy').css("background", "url(../img/tree_xy2.png)");
				$('#' + key + '_xy').val("1");
				if(value == "0"){// 若子节点未勾选则勾选
					choosedByPID(childKey);
				}
			}else{// 全取消
				$('#' + key + '_xy').css("background", "url(../img/tree_xy1.png)");
				$('#' + key + '_xy').val("0");
				if(value == "1"){// 若子节点未取消勾选则取消
					choosedByPID(childKey);
				}
			}
		}
	}
}

/**
 * 全选---第二层级显隐
 * 
 * @param key,唯一标识
 */
function choosedByPID(key){
	// 获取子节点
	var level = keyLevel[3];
	// 勾选状态
	var isAll = $('#' + key + '_xy').val();
	for(var i=0;i<level.length;i++){
		var record = level[i];
		if(record.pId == key){
			// 子节点的id
			var id = record.value.id;
			// 是否加载过
			var isLoad = $('#' + id).val();
			// 显隐按钮
			var value = $('#' + id + '_xy').val();
			if(isAll == "0"){// 全加载
				$('#' + key + '_xy').css("background", "url(../img/tree_xy2.png)");
				$('#' + key + '_xy').val("1");
				if(isLoad == "0"){// 未加载过,则全加载
					judgementBim(id);
				}else{
					if(value == "0"){// 加载过,隐藏则显示;显示则不变
						judgementBim(id);
					}
				}
			}else{// 全隐藏
				$('#' + key + '_xy').css("background", "url(../img/tree_xy1.png)");
				$('#' + key + '_xy').val("0");
				if(isLoad == "1"){// 加载过
					if(value == "1"){// 加载过,显示则隐藏;隐藏则不变
						judgementBim(id);
					}
				}
			}
		}
	}
	// 改变第一层级选中状态
	getChoosedNum(key);
}

/**
 * 单个BIM---第三层级显隐
 * 
 * @param id,唯一标识
 */
function judgementBim(id) {
	// 显隐按钮
	var value = $('#' + id + '_xy').val();
	// 是否加载过
	var isLoad = $('#' + id).val();
	if (value == "0") {
		$('#' + id + '_xy').css("background", "url(../img/tree_xy2.png)");
		$('#' + id + '_xy').val("1");
		if (isLoad == '0') {
			// 加载BIM
			var BIMLayer = loadBim(id);
			// 生成结束
			var map = {};
			map.id = id;
			map.layer = BIMLayer;
			bimLayerArray.push(map);
			
			// 保存数组用于压平,key(服务名):value(图层)
			var serverName = BIMServerNameByID[id];
			var obj = {};
			obj.name = serverName;
			obj.layer = BIMLayer;
			BIMLayerList.push(obj);
			
			// 显隐,不重复加载
			$('#' + id).val("1");
		} else {
			// 显示倾斜摄影
			showOrHideBim(id, bimLayerArray, false);
		}
	} else {
		$('#' + id + '_xy').css("background", "url(../img/tree_xy1.png)");
		$('#' + id + '_xy').val("0");
		if (isLoad == '1') {
			// 隐藏倾斜摄影
			showOrHideBim(id, bimLayerArray, true);
		}
	}
	// 改变第二层级选中状态
	getChoosedNum(id);
	// 改变第一层级选中状态
	getChoosedNum($('#' + id + '_pId').val());
}

/**
 * 根据子节点选中状态改变父节点选中状态
 * 
 * @param id,唯一标识
 */
function getChoosedNum(id) {
	// 获取pId
	var pId = $('#' + id + '_pId').val();
	var name = pId + "_BIM";
	var singleBIM = $('[name="' + name + '"]');
	// 子节点总数
	var sum = singleBIM.length;
	// 勾选个数
	var num = 0;
	for (var i = 0; i < sum; i++) {
		var value = singleBIM[i].value;
		if (value == "1") {// 选中
			num++;
		}
	}
	// 全选与单选状态
	if (num == sum) {
		$('#' + pId + '_xy').css("background", "url(../img/tree_xy2.png)");
		$('#' + pId + '_xy').val("1");
	} else {
		$('#' + pId + '_xy').css("background", "url(../img/tree_xy1.png)");
		$('#' + pId + '_xy').val("0");
	}
}

/**
 * 获得每个层级对应的key和value
 * 
 * @param data,结果集
 * @return Array,每个层级对应的key(id)和value(record)
 */
function getLevelKey(data) {
	keyLevel = {};
	// 第一级
	var firstLevel = [];
	// 第二级
	var secondLevel = [];
	// 第三级
	var thirdLevel = [];
	var results = data.record;
	for (var i = 0; i < results.length; i++) {
		var key = results[i].key;
		var name = results[i].sname;
		var isService = results[i].isService;
		var parentKey = results[i].parentKey;
		if (isService == "0") {
			if (parentKey == "0") {
				var obj = {};
				obj.pId = parentKey;
				obj.name = name;
				obj.id = key;
				obj.value = results[i];
				firstLevel.push(obj);
				keyLevel[1] = firstLevel;
			} else {
				var obj = {};
				obj.pId = parentKey;
				obj.name = name;
				obj.id = key;
				obj.value = results[i];
				secondLevel.push(obj);
				keyLevel[2] = secondLevel;
			}
		} else {
			var obj = {};
			obj.pId = parentKey;
			obj.name = name;
			obj.id = key;
			obj.value = results[i];
			thirdLevel.push(obj);
			keyLevel[3] = thirdLevel;
		}
	}
}

/**
 * BIM列表高度自适应
 */
$(window).resize(function() {
	var windowHeight = document.body.clientHeight;
	$("#bimListAuto").css("height", (windowHeight - 151) + "px");
});
