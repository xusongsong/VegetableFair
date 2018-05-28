/**
 * 模型列表加载功能
 * 
 * @author cd
 * @createDate 2017-12-05
 */
//模型图层集合,保存格式为key(图层ID):value(图层对象)
var layerArray = [];
//是否初次获取模型列表
var fristModelListFlag = true;
//模型服务名
var modelSName = "";
//初始化加载类型数组
var initTypeArr = [];
//#@true、#@false表示加载状态
//#@show、#@hide表示子级显影状态,控制全选
//声明地图图层第一层级数组对象(存储第一层级节点对象)
var modelLevelInfo = [];
//声明地图图层第二层级数组对象(存储第二层级接口对象level2)
var modelLevelInfoSec = [];
//声明第二层级名称数组(寿光项目需求使用-仅适用当前服务)
var modelSecInfo = [{name:"1号馆",parentID:"370700_370783"},{name:"2号馆",parentID:"370700_370783"},{name:"3-4号馆",parentID:"370700_370783"},{name:"5号馆",parentID:"370700_370783"},{name:"6号馆",parentID:"370700_370783"},{name:"7号馆",parentID:"370700_370783"},{name:"8号馆",parentID:"370700_370783"},{name:"9号馆",parentID:"370700_370783"},{name:"10号馆",parentID:"370700_370783"},{name:"11号馆",parentID:"370700_370783"},{name:"12号馆",parentID:"370700_370783"}];

/**
 * 获取模型列表集合并生成页面
 */
function getModelList() {
	if(fristModelListFlag) {
		$.ajax({
			type : 'POST',
			data : {
				sname : modelSName,
				type : "gms",
				dataType : dataType
			},
			url : '../layerManager/queryLayerTreeNew',
			success : function(data) {
				/**对封装的数据进行解析**/
				if (data.success == "1") {
					// 生成模型列表
					createModelList(data.record);
				} else {
					var resultList = '';
					// 搜索结果的顶部
				}
				fristModelListFlag = false;
			},
			error : function(e) {
				alert("MODEL-Ajax请求错误,请检查网络连接");
			}
		});
	}
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
		//设置当前城市
		var currentCityName = modelList[i].level0[0].layerName;
		//var currentCityName = "寿光市";
		document.getElementById("currentCity").value = currentCityName;
		for(var j=0;j<modelList[i].level1.length;j++){
            if(modelList[i].level1[j].layerName=="市辖区"){
                modelList[i].level1[j].layerName="金澄花园";
            }else if(modelList[i].level1[j].layerName=="虎丘区"){
                modelList[i].level1[j].layerName="农联家园";
            }else if(modelList[i].level1[j].layerName=="吴中区"){
                modelList[i].level1[j].layerName="沙工新村";
            }else if(modelList[i].level1[j].layerName=="相城区"){
                modelList[i].level1[j].layerName="姚桥新苑";
            }
            //存储第一层级节点数组对象
            modelLevelInfo.push(modelList[i].level1[j]);
			modelResultList += '<ul id="tree_g1" class="map_dttc_menu_tree_menu">';
			modelResultList += '<div id="tree_z1" class="z_menu"  onclick="flyModelPostion(\'' + modelList[i].level1[j].layerName +'\')">';
			modelResultList += '<span class="tree_xl"></span> <span class="tree_icon" style="background:url(../img/city.png);"></span>';
			//modelResultList += '<span class="tree_text">' + modelList[i].level1[j].layerName + '</span>';
            modelResultList += '<span class="tree_text">' + modelList[i].level1[j].layerName + '</span>';
			modelResultList += '</div>';
			modelResultList += '<span class="tree_xy" name="null" id="' + modelList[i].level1[j].layerID + "#@false" +'" value="hide" onclick="nodeCssSwitch(this);layerToggle(\'' + modelList[i].level1[j].layerID + '\', 1, this);"></span>';
			modelResultList += '</ul>';
			modelResultList += '<div class="tree_k1">';
			if(modelSecInfo[0].parentID == modelList[i].level1[j].layerID){//判定如果是当前发布的寿光服务则
				for(var k = 0; k < modelSecInfo.length; k++){
					var name = modelSecInfo[k].name;
					modelSecInfo[k].id = k+"_sg";
					var reg = new RegExp(name);
					modelResultList += '<ul id="tree_g2" class="map_dttc_menu_tree_menu1">';
					modelResultList += '<div id="tree_z2" class="z_menu" >';
					//二层时采用箭头样式
//					modelResultList += '<span style="margin-left: 20px;filter:alpha(opacity=0);" class="tree_xl"></span>';
					//三层时采用箭头样式
					modelResultList += '<span style="margin-left: 20px;filter:alpha(opacity=100);" class="tree_xl"></span>'; 
					//备注:发布数据的时候发布层级为1起始导致数据库读取建筑图标未读取到，因项目需求先行注释，后面可自行解除
					//modelResultList += '<span class="tree_icon" style="background:url(../img/' + modelList[i].level2[k].layerType.substring(0,3) + '.png);background-repeat:no-repeat;"></span> <span class="tree_text">' + modelList[i].level2[k].layerName + '</span>';
					modelResultList += '<span class="tree_icon" style="background:url(../img/T05.png);background-repeat:no-repeat;"></span> <span class="tree_text">' + name + '</span>';
					modelResultList += '</div>';
					modelResultList += '<span class="tree_xy" name="' + modelSecInfo[k].parentID + '" id="' + modelSecInfo[k].id + '#@false"  value="hide" onclick="modelShowOrHideSec(this);"></span>';
					modelResultList += '</ul>';
					/*加载第三层级*/
					modelResultList += '<div class="tree_k1">';
					for(var l=0;l<modelList[i].level2.length;l++){
						if(modelList[i].level2[l].layerName.match(reg)){
							if(name == "2号馆" && modelList[i].level2[l].layerName.match(new RegExp("12号馆"))){
								continue;
							}else if(name == "1号馆" && modelList[i].level2[l].layerName.match(new RegExp("11号馆"))){
								continue;
							}
							//存储第二层级数组对象level2
							modelLevelInfoSec.push(modelList[i].level2[l]);
							modelResultList += '<ul class="map_dttc_menu_tree_menu1">';
							modelResultList += '<div class="z_menu">';
							modelResultList += '<span style="margin-left: 60px;filter:alpha(opacity=70);" class="tree_icon1"></span>'; 
							modelResultList += '<span class="tree_text1">' + modelList[i].level2[l].layerName + '</span>';
							modelResultList += '</div>';
							modelResultList += '<span class="tree_xy" name="' + modelSecInfo[k].id  + '" id="' + modelList[i].level2[l].layerID + "#@false" + '" value="hide"  onclick="nodeCssSwitch(this);layerToggle(\'' + modelList[i].level2[l].layerID + '\', 3, this)"></span>';
							modelResultList += '</ul>';
						}
					}
					modelResultList += '</div>';
				}
			}else{//否则按正常流程创建列表
				for(var k=0;k<modelList[i].level2.length;k++){
					if(modelList[i].level1[j].layerID == modelList[i].level2[k].parentID){
						if(modelList[i].level2[k].layerType.substring(0,3) == defaultLoadType){
							initTypeArr.push(modelList[i].level2[k].layerID);
						}
						modelResultList += '<ul id="tree_g2" class="map_dttc_menu_tree_menu1">';
						modelResultList += '<div id="tree_z2" class="z_menu" >';
						//二层时采用箭头样式
//						modelResultList += '<span style="margin-left: 20px;filter:alpha(opacity=0);" class="tree_xl"></span>';
						//三层时采用箭头样式
						modelResultList += '<span style="margin-left: 20px;filter:alpha(opacity=100);" class="tree_xl"></span>'; 
						//备注:发布数据的时候发布层级为1起始导致数据库读取建筑图标未读取到，因项目需求先行注释，后面可自行解除
						//modelResultList += '<span class="tree_icon" style="background:url(../img/' + modelList[i].level2[k].layerType.substring(0,3) + '.png);background-repeat:no-repeat;"></span> <span class="tree_text">' + modelList[i].level2[k].layerName + '</span>';
						modelResultList += '<span class="tree_icon" style="background:url(../img/T05.png);background-repeat:no-repeat;"></span> <span class="tree_text">' + modelList[i].level2[k].layerName + '</span>';
						modelResultList += '</div>';
						modelResultList += '<span class="tree_xy" name="' + modelList[i].level2[k].parentID + '" id="' + modelList[i].level2[k].layerID + "#@false" + '" value="hide" onclick="nodeCssSwitch(this);layerToggle(\'' + modelList[i].level2[k].layerID + '\', 2, this)"></span>';
						modelResultList += '</ul>';
						/*加载第三层级*/
						modelResultList += '<div class="tree_k1">';
						for(var l=0;l<modelList[i].level3.length;l++){
						if(modelList[i].level2[k].layerID == modelList[i].level3[l].parentID){
								modelResultList += '<ul class="map_dttc_menu_tree_menu1">';
								modelResultList += '<div class="z_menu">';
								modelResultList += '<span style="margin-left: 60px;filter:alpha(opacity=40);" class="tree_icon1"></span>'; 
								modelResultList += '<span class="tree_text1">' + modelList[i].level3[l].layerName + '</span>';
								modelResultList += '</div>';
								modelResultList += '<span class="tree_xy" name="' + modelList[i].level3[l].parentID  + '" id="' + modelList[i].level3[l].layerID + "#@false" + '" value="hide"  onclick="nodeCssSwitch(this);(\'' + modelList[i].level3[l].layerID + '\', 3, this)"></span>';
								modelResultList += '</ul>';
							}
						}
						modelResultList += '</div>';
					}
				}
			}
			modelResultList += '</div>';
		}
	}
	// 模型列表
	$("#modelList").html(modelResultList);
	$('.tree_k1_1,.tree_k1_2,.tree_k1_3').hide();
	$('.z_menu').click(function() {
		$(this).children('.tree_xl').toggleClass('tree_xlclick');
		$(this).parent().next(".tree_k1").toggle();
	});
	for(var i=0;i<initTypeArr.length;i++){
		var domID = initTypeArr[i] + "#@false";
		document.getElementById(domID).click();
	}
}

/**
 * 第二层级列表控制子层级显影(针对项目需求增加,可改进)
 * @returns
 */
function modelShowOrHideSec2(name){
	var reg = new RegExp(name);
	//获取全部的模型子节点信息
	var doms = $('[name="' + modelLevelInfoSec[0].parentID +'"]');
	for(var i =0; i < modelLevelInfoSec.length; i++){
		var layerName = modelLevelInfoSec[i].layerName;
		//判断当前节点是否为当前选中父节点的子节点
		if(layerName.match(reg)){
			if(name == "2号馆" && layerName.match(new RegExp("12号馆"))){
				continue;
			}else if(name == "1号馆" && layerName.match(new RegExp("11号馆"))){
				continue;
			}
			//对当前匹配的节点进行筛选，筛选相应节点的id
			for(var j = 0; j < doms.length; j++){
				var id = doms.eq(j).attr("id");
				if(id.split("#@")[0] == modelLevelInfoSec[i].layerID){
					doms[j].click();
					break;
				}
			}
		}
	}
}

/**
 * 第二层级列表控制子层级显影(针对项目需求增加,可改进)
 * 级联递归操作本身控制子层级时影响到了父层级，因此父层级不需做样式调整
 * @returns
 */
function modelShowOrHideSec(obj){
	var allVal = obj.value;
	//获取全部的模型子节点信息
	var doms = $('[name="' + obj.id.split("#@")[0] +'"]');
	//对当前匹配的节点进行筛选，筛选相应节点的id
	for(var i = 0; i < doms.length; i++){
		if(allVal == 'hide'){
			if(doms[i].value == 'hide'){
				doms[i].click();
			}
		//obj.style.backgroundImage = "url(../img/tree_xy2.png)";
		//obj.value = "show";
		}else if(allVal == 'show'){
			if(doms[i].value == 'show'){
				doms[i].click();
			}
		//obj.style.backgroundImage = "url(../img/tree_xy1.png)";
		//obj.value = "hide";
		}
	}
}

/**
 * 飞行定位
 *
 * @param id,唯一标识
 */
function flyModelPostion(str) {
    // if(str == "吴中区"){
    //     map3D.flyPosition(120.53713614,31.85813108,44.70232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    // }else if(str == "相城区"){
    //     map3D.flyPosition(120.54404410,31.31396881,52.60232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    // }else if(str == "虎丘区"){
    //     map3D.flyPosition(120.58210657,31.88048756,53.10232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    // }else if(str == "市辖区"){
    //     map3D.flyPosition(120.69127410,31.43399906,53.40232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    // }
    if(str == "沙工新村"){
        map3D.flyPosition(120.53713614,31.85813108,44.70232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    }else if(str == "姚桥新苑"){
        map3D.flyPosition(120.54404410,31.31396881,52.60232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    }else if(str == "农联家园"){
        map3D.flyPosition(120.58210657,31.88048756,53.10232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    }else if(str == "金澄花园"){
        map3D.flyPosition(120.69127410,31.43399906,53.40232508983463,4.351113551310101,-0.6722756375833641,528.9511815746299,3);
    }else if(str == "寿光市"){
        map3D.flyPosition(118.812572398,36.8581820276,33.7384158624,4.407352956829239,-0.6981538861852934,663.7954617300508,3);
    }
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
			sname : modelSName,
			type : "gms",
			dataType : dataType,
			nodeID : layerID,
			rank : rank
		},
		url : '../layerManager/queryLayerByNodeIDNew',
		success : function(data){
			/**对封装的数据进行解析**/
			if(data.success == "1"){
				//控制模型加载与显影
				var flag = obj.id.split("#@")[1];
				layerToggleByFlag(data.record, flag, obj);
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
function controlModelLayer(data, flag) {
	var arr = data.split("#@");
	if(flag){
		var layerName = inArray(layerArray, arr[0]);
		if(layerName == false){
			/**判断是否是父节点不产生图层对象**/
			if(arr[1] == "null" || arr[2] == "null") {
				var url = arr[1];
				var name = arr[2];
				var map = {};
				map.layerID = arr[0];
				map.modelLayer = "null";
				layerArray.push(map);
			}else{
				var url = arr[1];
				var name = arr[2];
				var urlNew = url.substring(0, url.lastIndexOf(name));
				if(dataType == "wrl"){
					var modelLayer = map3D.loadGMS(urlNew, name);
				}else if(dataType == "c3s"){
					var modelLayer = map3D.loadC3S(url);
				}
				var map = {};
				map.layerID = arr[0];
				map.modelLayer = modelLayer;
				layerArray.push(map);
			}
		}else{
			for(var j=0;j<layerArray.length;j++){
				if(layerArray[j].layerID == arr[0]){
					if(layerArray[j].modelLayer != "null"){
						map3D.showlayer(layerArray[j].modelLayer);
					}
				}
			}
		}
	}else{
		var layerName = inArray(layerArray, arr[0]);
		if(layerName != false){
			for(var j=0;j<layerArray.length;j++){
				if(layerArray[j].layerID == arr[0]){
					if(layerArray[j].modelLayer != "null"){
						map3D.hidelayer(layerArray[j].modelLayer);
					}
				}
			}
		}
	}
}

/**
 * 模型显影方法
 * 
 * @param data,结果集集合
 * @param flag,数据加载状态
 * @param obj,dom节点对象
 */
function layerToggleByFlag(data, flag, obj) {
	var checkstatus = obj.value;
    var checkCName = obj.id.split("#@")[0];
    var checkName = obj.name;
	layerToggleCheckOne(obj, flag);
	var checkgroups_down = getElementsByName("span", checkCName);
	if(checkgroups_down.length < 1){
		if(obj.value == "show"){
			for(var s=0;s<data.length;s++){
				if(data[s].split("#@")[1] != "null"){
					controlModelLayer(data[s], true);
				}
			}
		}else{
			for(var s=0;s<data.length;s++){
				if(data[s].split("#@")[1] != "null"){
					controlModelLayer(data[s], false);
				}
			}
		}
	}
	for(var i=0;i<checkgroups_down.length;i++){
		if(checkstatus == "show"){
			checkgroups_down[i].style.backgroundImage="url(../img/tree_xy2.png)";
			checkgroups_down[i].value = "show";
			var childid = checkgroups_down[i].id;
			if(getElementsByName("span", childid.split("#@")[0]).length < 1){
				for(var s=0;s<data.length;s++){
					if(data[s].split("#@")[0].indexOf(checkgroups_down[i].id.split("#@")[0]) >= 0){
						controlModelLayer(data[s], true);
					}
				}
			}
		}else{
			checkgroups_down[i].style.backgroundImage="url(../img/tree_xy1.png)";
			checkgroups_down[i].value = "hide";
			var childid = checkgroups_down[i].id;
			if(getElementsByName("span", childid.split("#@")[0]).length < 1){
				for(var s=0;s<data.length;s++){
					if(data[s].split("#@")[0].indexOf(checkgroups_down[i].id.split("#@")[0]) >= 0){
						controlModelLayer(data[s], false);
					}
				}
			}
		}
		var childid = checkgroups_down[i].id;
		//如果下面有name和自己的id一致，就认为这是分组全选，下面还有子项
		if(getElementsByName("span", childid.split("#@")[0]).length > 0){
			layerToggleByFlag(data, flag, document.getElementById(childid));
		}
	}
}

/**
 * 递归操作父级
 * 
 * @param obj,图层对象
 * @param flag,数据加载状态
 */
function layerToggleCheckOne(obj, flag) {  
	var checkstatus = obj.value;
	var checkPID = obj.name + "#@" + flag;
	var checkName = obj.name;//父节点名称
	var checkID = obj.id;
	/*if(checkstatus=="hide" && document.getElementById(checkPID)){
		document.getElementById(checkPID).style.backgroundImage = "url(../img/tree_xy1.png)";
		document.getElementById(checkPID).value = "hide";
	}else if(document.getElementById(checkPID)){
		var samelevelgroup = getElementsByName("span", checkName);
        var allchecked = true;
        for (var i=0;i<samelevelgroup.length;i++){
            if(samelevelgroup[i].value == "hide"){
                allchecked = false;
            }
        }
        if(allchecked == true){
        	document.getElementById(checkPID).style.backgroundImage = "url(../img/tree_xy2.png)";
            document.getElementById(checkPID).value = "show";
        }
	}*/
	if(document.getElementById(checkPID)){
		var Doms = $('[name = "' + checkName + '"]');// 获取共有父节点的子节点数组
		if(Doms == null || Doms == undefined){
			return;
		}
		var sum = Doms.length;//获取子节点数组长度
		var selectNum = 0;//显示累加器
		for(var i = 0; i < Doms.length; i++){
			var value = Doms.eq(i).val();
			if(value == "show"){//若子节点显示则
				selectNum++;
			}
		}
		if(selectNum !=0){//若子节点有选中
			document.getElementById(checkPID).style.backgroundImage = "url(../img/tree_xy2.png)";
	        document.getElementById(checkPID).value = "show";
		}else {//若子节点全部未选中
			document.getElementById(checkPID).style.backgroundImage = "url(../img/tree_xy1.png)";
			document.getElementById(checkPID).value = "hide";
		}
		layerToggleCheckOne(document.getElementById(checkPID), flag);
	}
} 

/**
 * 点击时处理当前节点状态
 * 
 * @param obj,图层对象
 */
function nodeCssSwitch(obj){
	if(obj.value == "hide"){
		obj.style.backgroundImage = "url(../img/tree_xy2.png)";
		obj.value = "show";
	}else if(obj.value == "show"){
		obj.style.backgroundImage = "url(../img/tree_xy1.png)";
		obj.value = "hide";
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

/**
 * 获取指定name值的节点
 * 
 * @param tag,节点类型
 * @param name,name属性值
 */
function getElementsByName(tag, name){  
    var returns = document.getElementsByName(name);  
    if(returns.length > 0) return returns;  
    returns = new Array();
    var tag = "span";
    var e = document.getElementsByTagName(tag);  
    for(var i = 0; i < e.length; i++){  
        if(e[i].getAttribute("name") == name){
            returns[returns.length] = e[i];
        }  
    }  
    return returns;  
} 

/**
 * 用户登录获取模型服务
 */
function getModelSName(){
	$.ajax({
		type : 'POST',
		data : {
			stype : "gms"
		},
		url : '../layerManager/getSnameByUserID',
		success : function(data) {
			if(data.success == "1"){
				modelSName = data.record[0];
				getModelList();
			}
		},
		error : function(e) {
			alert("获取服务名失败!");
		}
	});
}