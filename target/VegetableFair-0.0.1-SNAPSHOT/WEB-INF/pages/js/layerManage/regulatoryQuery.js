/**
 * 控规搜索功能
 * 
 * @author cd
 * @createDate 2017-10-24
 */

/**
 * 获取控规搜索列表集合并生成页面
 * 
 * @author pageNo,当前页
 */
function getRegulatoryList(pageNo){
	$.ajax({
		url			: '../plan/makeRegulatoryTree.do',
		type		: 'post',
		data		: {
			code	: $('#input_plan').val(),
			pageNo  : pageNo,
			pageSize  : '10'
		},
		success		: function(data){
			$("#kgsl_k").hide();
			$("#kgss_k").show();
 	    	var regulatoryData = data.record.results;
 	    	var regulatoryMenu = "";
 	    	regulatoryMenu += '<div class="kgss_top">';
 	    	regulatoryMenu += '<span class="kgfx_fh" style="color: #4fa1ff; cursor: pointer; margin-left: 10px;" onclick="backToSuperiorMenu();"><返回</span>';
 	    	regulatoryMenu += '<span> —控规方案</span>';
 	    	regulatoryMenu += '</div>';
 	    	for(var i=0;i<regulatoryData.getKGByCode.length;i++){
// 	    		regulatoryMenu += '<ul class="map_ss_jg_lb" onclick="regulatoryToFly(' + regulatoryData.getKGByCode[i].POINT_X + ',' + regulatoryData.getKGByCode[i].POINT_Y + ');">';
 	    		regulatoryMenu += "<ul class='map_ss_jg_lb' onclick='regulatoryToFly(" + JSON.stringify(regulatoryData.getKGByCode[i]) + ");'>";
 	    		regulatoryMenu += '<li class="lb_dw"><span style="width: 16px;text-align: center; margin-left: 5px;display: block;margin-top: 8px;">' + (i + 1) + '</span></li>';
 	    		regulatoryMenu += '<li class="map_ss_jg_lb_menu">';
 	    		regulatoryMenu += '<ul class="map_ss_jg_lb_menu_text">';
 	    		regulatoryMenu += '<span style="color: #2b75ff;margin-right: 20px;">名称：' + regulatoryData.getKGByCode[i].DKBH.substring(0,20) + '</span>';
 	    		regulatoryMenu += '</ul>';
 	    		regulatoryMenu += '<ul class="map_ss_jg_lb_menu_text1">';
 	    		regulatoryMenu += '<span style="color: #404040;margin-right: 20px;">类型：' + regulatoryData.getKGByCode[i].YDXZ + '</span>';
 	    		regulatoryMenu += '</ul>';
 	    		regulatoryMenu += '</li>';
 	    		regulatoryMenu += '</ul>';
 	    	}
 	    	/** 分页查询**/
 	    	regulatoryMenu += pagerForRegulatory(pageNo, regulatoryData.total);
 	    	$("#kgss_k").html(regulatoryMenu);
		},error		: function(data){
			
		}
	});
}

/**
 * 分页查询
 * 
 * @author pageNo,当前页
 * @author totalPage,总页数
 */
function pagerForRegulatory(pageNo, totalPage) {
	// 若超出限制则只显示前25*9---200条记录
	if (totalPage > 25) {
		totalPage = 25;
	}
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageNode = "";
	pageNode += '<div style="width: 100%; height: 24px; background: #f0f3f4;position: absolute; bottom: 0px;">';
	pageNode += '<div class="fanye1">';
	// 第一页
	pageNode += '<span style="width: 25px;" onclick="getRegulatoryList(' + 1 + ')">&lt;&lt;</span> ';
	// 上一页
	if (currPage == 1) {
		pageNode += '<span style="width: 20px;">&lt;</span> ';
	} else {
		pageNode += '<span style="width: 20px;" onclick="getRegulatoryList(' + (pageNo - 1) + ')">&lt;</span> ';
	}
	// 当前页
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	var endPage = (startPage + 3) > totalPage ? totalPage : (startPage + 3);
	for (var page = startPage; page <= endPage; page++) {
		if (page == currPage) {
			pageNode += '<span style="width: 25px;" class="shuzi"><b>' + page + '</b></span>';
		} else {
			pageNode += '<span style="width: 25px;" class="shuzi" onclick="getRegulatoryList(' + page + ')">' + page + '</span>';
		}
	}
	// 下一页
	if (currPage == totalPage) {
		pageNode += '<span style="width: 20px;">&gt;</span>';
	} else {
		pageNode += '<span style="width: 20px;" onclick="getRegulatoryList(' + (pageNo + 1) + ')">&gt;</span>';
	}
	// 最后一页
	pageNode += '<span style="width: 25px;" onclick="getRegulatoryList(' + totalPage + ')">&gt;&gt;</span>';
	pageNode += '</div>';
	pageNode += '</div>';
	return pageNode;
}

/**
 * 返回上级
 */
function backToSuperiorMenu(){
	$("#kgsl_k").show();
	$("#kgss_k").hide();
}

/**
 * 控规查询飞行定位
 * 
 * @param lon,经度
 * @param lat,维度
 */
function regulatoryToFly(json){
	map3D.flyPosition(json.POINT_X, json.POINT_Y, 500, 0, -0.47*3.14, 500, 1);
	attributeForRegulatory(json);
}

/**
 * 返回上级
 */
function attributeForRegulatory(json){
	if(slayer){
		deleteAttributeTip(slayer);
	}
	/** 创建气泡图层**/
	var shps = creatAttributeTip(slayer, editLayer);
	slayer = shps.slayer;
	editLayer = shps.editLayer;
	// 封装图层提供给清除模块功能
	mapShps.push(slayer);
	var attributeList = '';
	attributeList  = ' 计划书编号 : ' + ((json.JHSBH == undefined)?"":json.JHSBH) + '/n';
	attributeList += ' 地块编号 : ' + ((json.DKBH == undefined)?"":json.DKBH) + '/n';
	attributeList += ' 用地性质 : ' + ((json.YDXZ == undefined)?"":json.YDXZ) + '/n';
	attributeList += ' 面  积 : ' + ((json.MJ == undefined)?"":json.MJ) + '/n';
	attributeList += ' 容积率 : ' + ((json.RJL == undefined)?"":json.RJL) + '/n';
	attributeList += ' 绿地率 : ' + ((json.LDL == undefined)?"":json.LDL) + '/n';
	attributeList += ' 建筑密度 : ' + ((json.JZMD == undefined)?"":json.JZMD) + '/n';
	attributeList += ' 建筑限高 : ' + ((json.JZXG == undefined)?"":json.JZXG) + '/n';
	attributeList += ' 机动车位 : ' + ((json.JDCW == undefined)?"":json.JDCW) + '/n';
	attributeList += ' 非机动车位 : ' + ((json.FJDCW == undefined)?"":json.FJDCW) + '/n';
	attributeList += ' 检测面积 : ' + ((json.JCMJ == undefined)?"":json.JCMJ) + '/n';
	attributeList += ' 备 注 : ' + ((json.BZ == undefined)?"":json.BZ) + '/n';
	// 添加气泡和内容
	addAttributeTip(editLayer, json.POINT_X, json.POINT_Y, 50, attributeList);
}