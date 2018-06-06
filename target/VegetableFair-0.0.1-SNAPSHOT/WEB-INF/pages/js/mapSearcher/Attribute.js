/**
 * 属性查询功能
 * 
 * @author DL
 * @creatDate 2017-09-23
 */
// 属性查询默认状态
var sxcxState = 1;
// 属性查询气泡图层
var slayer;
var editLayer;
// 经度
var conx;
// 纬度
var cony;
// 高程
var conz;
$(document).ready(function() {
	// 属性查询
	$('.btm_right_top_right_sxck').unbind('click').click(function() {
		if (sxcxState) {
			$(".btm_right_top_right_sxck").css("background","url(../img/sxck2.png)");
			var resp = map.CreateResponserOptions("123");
			resp.AddConfig("PickLayerIdList", "-1");
			resp.AddConfig("IsChangeColor", "true");
			res = map.CreateResponser("PickModelResponser",resp);
			res.AddObserver();
			map.AddResponser(res);
			content3d.attachEvent("FireOnLButtonUp",attributeQuery);
			sxcxState = 0;
		} else {
			$(".btm_right_top_right_sxck").css("background","url(../img/sxck1.png)");
			var resp = map.CreateResponserOptions("123");
			resp.AddConfig("PickLayerIdList", "-1");
			resp.AddConfig("IsChangeColor", "false");
			res = map.CreateResponser("PickModelResponser",resp);
			content3d.detachEvent("FireOnLButtonUp",attributeQuery);
			sxcxState = 1;
		}
	});
});

/**
 * 从后端获取属性查询的结果集,并生成列表节点
 * 
 * @param x,经度
 * @param y,纬度
 */
function attributeQuery(x, y) {
	/** 地图上只显示一个属性查询结果**/
	if (slayer) {
		deleteAttributeTip(slayer);
	}
	/** 坐标转换**/
	var convert = translate.ScreenPosToWorldPos(x, y);
	conx = convert.GetX();
	cony = convert.GetY();
	conz = convert.GetZ();
	// 设置气泡高度
	if (conz >= 0) {
		conz += 10;
	} else {
		conz += 20;
	}
	/** 创建气泡图层**/
	var shps = creatAttributeTip(slayer, editLayer);
	slayer = shps.slayer;
	editLayer = shps.editLayer;
	// 封装图层提供给清除模块功能
	mapShps.push(slayer);
	$.ajax({
		type : 'POST',
		data : {
			x : conx,
			y : cony,
			type : 1,
			shptype : 1
		},
		url : '../mapSearcher/attribute.do',
		success : function(data) {
			var attributeList = '';
			if (data.success == "1") {
				var records = data.record.records;
				// 该版本属性查询只取第一条数据结果集
				if(records && records.length > 0){
					attributeList  = '建筑名称 : ' + records[0].name?records[0].name:' /n';
					attributeList += '建筑编码 : ' + records[0].code?records[0].code:' /n';
					attributeList += '详细地址 : ' + records[0].addr?records[0].addr:' /n';
					attributeList += '基地面积 : ' + records[0].ldArea?records[0].ldArea:' /n';
					attributeList += '结构类型 : ' + records[0].stru?records[0].stru:' /n';
					attributeList += '建筑高度 : ' + records[0].height?records[0].height:' ';
				}else {
					attributeList = "很抱歉，此处查找不到对应的建筑物信息！";
				} 
			}
			// 添加气泡和内容
			addAttributeTip(editLayer, conx, cony, conz, attributeList);
		},
		error : function(e) {
		}
	})

}
