/**
 * 模型列表加载功能
 * 
 * @author cd
 * @createDate 2017-09-23
 */
//模型图层集合,保存格式为key(图层ID):value(图层对象)
var layerArray = [];
//是否初次获取模型列表
var fristModelListFlag = true;
//#@true、#@false表示加载状态
//#@show、#@hide表示子级显影状态,控制全选

/**
 * 获取模型列表集合并生成页面
 */
function getModelList() {
	if(fristModelListFlag) {
		$.ajax({
			type : 'POST',
			data : {
				areacode : serverAreacodeWrl,
				type : "wrl"
			},
			url : '../layerManager/queryLayerTree',
			success : function(data) {
//				console.log(data);
				/**对封装的数据进行解析**/
				if (data.success == "1") {
					// 生成模型列表
					createModelList(data.record);
				} else {
					var resultList = '';
					// 搜索结果的顶部
				}
			},
			error : function(e) {
				alert("MODEL-Ajax请求错误,请检查网络连接");
			}
		});
	}
	fristModelListFlag = false;
}

/**
 * 生成模型列表页面html
 * 
 * @param data,结果集集合
 */
function createModelList(data) {
	//获取结果集
	var modelList = data;
	// 列表节点
	var modelResultList = '';
	// 模型列表
	for(var i=0;i<modelList.length;i++){
		modelResultList += '<ul id="tree_g1" class="map_dttc_menu_tree_menu">';
		modelResultList += '<div id="tree_z1" class="z_menu">';
		modelResultList += '<span class="tree_xl"></span> <span class="tree_icon"></span>';
		modelResultList += '<span class="tree_text">' + modelList[i].level1[0].layerName + '</span>';
		modelResultList += '</div>';
		modelResultList += '<span class="tree_xy" value="hide" onclick="layerToggle(\'' + modelList[i].level1[0].layerID + '\', 1, this)"></span>';
		modelResultList += '</ul>';
		modelResultList += '<div class="tree_k1">';
		for(var j=0;j<modelList[i].level2.length;j++){
			if(modelList[i].level2[j].layerType == "MODEL"){
				modelResultList += '<ul id="tree_g2" class="map_dttc_menu_tree_menu1">';
				modelResultList += '<div id="tree_z2" class="z_menu">';
				modelResultList += '<span style="margin-left: 20px;filter:alpha(opacity=40);" class="tree_xl"></span>'; 
				modelResultList += '<span class="tree_icon" style="background:url(../img/' + modelList[i].level2[j].layerType + '.png);background-repeat:no-repeat;"></span> <span class="tree_text">' + modelList[i].level2[j].layerName + '</span>';
				modelResultList += '</div>';
				modelResultList += '<span class="tree_xy" name="' + modelList[i].level2[j].layerID + "#@true" + '" style="background:url(../img/tree_xy2.png)" value="show" onclick="layerToggle(\'' + modelList[i].level2[j].layerID + '\', 2, this)"></span>';
				modelResultList += '</ul>';
				initLayerToggle(modelList[i].level2[j].layerID, 2);
			}else{
				modelResultList += '<ul id="tree_g2" class="map_dttc_menu_tree_menu1">';
				modelResultList += '<div id="tree_z2" class="z_menu">';
				modelResultList += '<span style="margin-left: 20px;filter:alpha(opacity=40);" class="tree_xl"></span>'; 
				modelResultList += '<span class="tree_icon" style="background:url(../img/' + modelList[i].level2[j].layerType + '.png);background-repeat:no-repeat;"></span> <span class="tree_text">' + modelList[i].level2[j].layerName + '</span>';
				modelResultList += '</div>';
				modelResultList += '<span class="tree_xy" value="hide" onclick="layerToggle(\'' + modelList[i].level2[j].layerID + '\', 2, this)"></span>';
				modelResultList += '</ul>';
			}
			/*加载第三层级*/
			modelResultList += '<div class="tree_k1">';
			for(var k=0;k<modelList[i].level3.length;k++){
				if(modelList[i].level2[j].layerID == modelList[i].level3[k].parentID){
					if(modelList[i].level3[k].parentID.split("_")[1] == "MODEL"){
						modelResultList += '<ul class="map_dttc_menu_tree_menu1">';
						modelResultList += '<div class="z_menu">';
						modelResultList += '<span style="margin-left: 60px;filter:alpha(opacity=40);" class="tree_icon1"></span>'; 
						modelResultList += '<span class="tree_text1">' + modelList[i].level3[k].layerName + '</span>';
						modelResultList += '</div>';
						modelResultList += '<span class="tree_xy" name="' + modelList[i].level3[k].layerID + "#@true" + '" style="background:url(../img/tree_xy2.png)" value="show"  onclick="layerToggle(\'' + modelList[i].level3[k].layerID + '\', 3, this)"></span>';
						modelResultList += '</ul>';
						initLayerToggle(modelList[i].level3[k].layerID, 3);
					}else{
						modelResultList += '<ul class="map_dttc_menu_tree_menu1">';
						modelResultList += '<div class="z_menu">';
						modelResultList += '<span style="margin-left: 60px;filter:alpha(opacity=40);" class="tree_icon1"></span>'; 
						modelResultList += '<span class="tree_text1">' + modelList[i].level3[k].layerName + '</span>';
						modelResultList += '</div>';
						modelResultList += '<span class="tree_xy" value="hide"  onclick="layerToggle(\'' + modelList[i].level3[k].layerID + '\', 3, this)"></span>';
						modelResultList += '</ul>';
					}
				}
			}
			modelResultList += '</div>';
		}
		modelResultList += '</div>';
	}
	// 模型列表
	$("#modelList").html(modelResultList);
	$('.tree_k1_1,.tree_k1_2,.tree_k1_3').hide();
	$('.tree_xy').click(function() {
		if($(this).val() == "hide"){
			$(this).css({"background-image":"url(../img/tree_xy2.png)"});
			$(this).val("show");
		}else{
			$(this).css({"background-image":"url(../img/tree_xy1.png)"});
			$(this).val("hide");
		}
	});
	$('.z_menu').click(function() {
		$(this).children('.tree_xl').toggleClass('tree_xlclick');
		$(this).parent().next(".tree_k1").toggle();
	});
}

/**
 * 初始化加载模型请求
 * 
 * @param layerID,图层ID
 * @param rank,Map集合层级
 */
function initLayerToggle(layerID, rank) {
	$.ajax({
		type : 'POST',
		data : {
			areacode : serverAreacodeWrl,
			type : "wrl",
			nodeID : layerID,
			rank : rank
		},
		url : '../layerManager/queryLayerByNodeID',
		success : function(data) {
			/**对封装的数据进行解析**/
			if (data.success == "1") {
				for(var i=0;i<data.record.length;i++){
					var arr = data.record[i].split("#@");
					//判断是否是父节点不产生图层对象
					if(arr[1] == "null" || arr[2] == "null") {
						var map = {};
						map.layerID = arr[0];
						map.modelLayer = "null";
						layerArray.push(map);
					}else{
						var url = planServerURL + "/files/" + arr[1];
						var name = arr[2];
						var modelLayer = map3D.loadGMS(url, name);
						var map = {};
						map.layerID = arr[0];
						map.modelLayer = modelLayer;
						layerArray.push(map);
					}
				}
			} else {
				var resultList = '';
				// 打印无法获取列表信息
			}
		},
		error : function(e) {
			alert("MODEL-Ajax请求错误,请检查网络连接");
		}
	});
}

/**
 * 模型图层显影控制
 * 
 * @param layerID,图层ID
 * @param rank,Map集合层级
 * @param obj,dom节点对象
 */
function layerToggle(layerID, rank, obj) {
	$.ajax({
		type : 'POST',
		data : {
			areacode : serverAreacodeWrl,
			type : "wrl",
			nodeID : layerID,
			rank : rank
		},
		url : '../layerManager/queryLayerByNodeID',
		success : function(data) {
			/**对封装的数据进行解析**/
			if (data.success == "1") {
				//id不存在表示为初次访问需要加载
				if(obj.name == "" ||  obj.name == undefined){
					//加载模型
					loadModel(data.record, obj);
				}else{
					//显影模型
					var flag = obj.name.split("#@")[1];
					layerToggleByFlag(data.record, flag, obj);
				}
			} else {
				var resultList = '';
				// 打印无法获取列表信息
			}
		},
		error : function(e) {
			alert("MODEL-Ajax请求错误,请检查网络连接");
		}
	});
}

/**
 * 模型加载方法
 * 
 * @param data,结果集集合
 * @param obj,dom节点对象
 */
function loadModel(data, obj) {
	obj.name = data[0].split("#@")[0] + "#@true";
	$(obj).parent().next("div").find(".tree_xy").each(function(i){
		this.name = data[0].split("#@")[0] + "#@true";
		this.style.backgroundImage="url(../img/tree_xy2.png)";
		this.value = "show";
	});
	var childs = $(obj).parent().parent().children(".map_dttc_menu_tree_menu1").find(".tree_xy");
	var checkedNum = 0;
	$(obj).parent().parent().children(".map_dttc_menu_tree_menu1").find(".tree_xy").each(function(i){
		if(this.value == "show"){
			checkedNum++;
		}
	});
	if(checkedNum == childs.length-1){
		$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").css({"background-image":"url(../img/tree_xy2.png)"});
		var newName = data[0].split("#@")[0] + "#@true";;
		$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").attr("name", newName);
		$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").val("show");
	}
	for(var i=0;i<data.length;i++){
		var arr = data[i].split("#@");
		var layerName = inArray(layerArray, arr[0]);
		if(layerName != false){
			
		}else{
			/**判断是否是父节点不产生图层对象**/
			if(arr[1] == "null" || arr[2] == "null") {
				var map = {};
				map.layerID = arr[0];
				map.modelLayer = "null";
				layerArray.push(map);
			}else{
				var url = planServerURL + "/files/" + arr[1];
				var name = arr[2];
				var modelLayer = map3D.loadGMS(url, name);
				var map = {};
				map.layerID = arr[0];
				map.modelLayer = modelLayer;
				layerArray.push(map);
			}
		}
	}
}

/**
 * 模型显影方法
 * 
 * @param data,结果集集合
 * @param flag,显影状态
 * @param obj,dom节点对象
 */
function layerToggleByFlag(data, flag, obj) {
	if(flag == "true") {
		obj.name = data[0].split("#@")[0] + "#@false";
		$(obj).parent().next("div").find(".tree_xy").each(function(i){
			this.name = data[0].split("#@")[0] + "#@false";
			this.style.backgroundImage="url(../img/tree_xy1.png)";
			this.value = "hide";
		});
		if($(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").val() == "show"){
			$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").css({"background-image":"url(../img/tree_xy1.png)"});
			var newName = data[0].split("#@")[0] + "#@false";;
			$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").attr("name", newName);
			$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").val("hide");
		}
		for(var i=0;i<data.length;i++){
			var arr = data[i].split("#@");
			for(var j=0;j<layerArray.length;j++){
				if(layerArray[j].layerID == arr[0]){
					if(layerArray[j].modelLayer != "null"){
						map3D.hidelayer(layerArray[j].modelLayer);
					}
				}
			}
		}
	}else{
		obj.name = data[0].split("#@")[0] + "#@true";
		$(obj).parent().next("div").find(".tree_xy").each(function(i){
			this.name = data[0].split("#@")[0] + "#@true";
			this.style.backgroundImage="url(../img/tree_xy2.png)";
			this.value = "show";
		});
		var childs = $(obj).parent().parent().children(".map_dttc_menu_tree_menu1").find(".tree_xy");
		var checkedNum = 0;
		$(obj).parent().parent().children(".map_dttc_menu_tree_menu1").find(".tree_xy").each(function(i){
			if(this.value == "show"){
				checkedNum++;
			}
		});
		if(checkedNum == childs.length-1){
			$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").css({"background-image":"url(../img/tree_xy2.png)"});
			var newName = data[0].split("#@")[0] + "#@true";
			$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").attr("name", newName);
			$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").val("show");
			obj.name = data[0].split("#@")[0] + "#@true";
		}else{
			if($(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").val() == "show"){
				$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").css({"background-image":"url(../img/tree_xy1.png)"});
				var newName= data[0].split("#@")[0] + "#@false";;
				$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").attr("name", newName);
				$(obj).parent(".map_dttc_menu_tree_menu1").parent().prev().find(".tree_xy").val("hide");
				obj.name = data[0].split("#@")[0] + "#@false";
			}
		}
		for(var i=0;i<data.length;i++){
			var arr = data[i].split("#@");
			for(var j=0;j<layerArray.length;j++){
				if(layerArray[j].layerID == arr[0]){
					if(layerArray[j].modelLayer != "null"){
						map3D.showlayer(layerArray[j].modelLayer);
					}
				}
			}
		}
	}
}

/**
 * 判断当前图层是否存在在图层集合中
 * 
 * @param arr,图层对象集合
 * @param obj,图层对象
 */
function inArray(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i].layerID === obj) {  
            return obj;  
        }  
    }  
    return false;  
}  
