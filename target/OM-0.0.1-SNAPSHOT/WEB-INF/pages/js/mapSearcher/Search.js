/**
 * 点击map页面中的搜索按钮 与OM后端进行交互
 */
function searchSubmit(pageNo) {
	// 获取输入框的值
	var inputText = !($(".map_ss").val(inputText)) ? " " : $(".map_ss").val(
			inputText);
	// 获取默认城市名
	var cityName = defaultName;
	// 获取默认区域名
	var areaName = defaultAreaName;
	// alert(inputText + '; ' + cityName + '; ' + areaName + '; ' + pageNo);
	/*
	 * 向后端传值获取封装的数据结果
	 */
	$
			.ajax({
				type : 'POST',
				data : {
					keyWord : inputText,
					pageNo : pageNo
				},
				url : '../mapSearcher/serach',
				success : function(data) {
					/**
					 * 对返回的封装数据进行解析
					 */
					// 清空列表节点
					var cleanList = '';
					$(".map_ss_jg").html(cleanList);
					if (data.success == "1") {
						// 城市和区域名
						var cityAndArea = cityName + areaName;
						// 生成搜索列表
						searchResult(data, cityAndArea, pageNo);
					} else {
						var resultList = '';
						// 搜索结果的顶部
						resultList += '<ul class="map_ss_jg_top">';
						resultList += '<span style="margin-left: 10px;">共搜到</span>';
						resultList += '<span style="color: red;">' + '0'
								+ '</span>';
						resultList += '<span>个记录</span>';
						resultList += '<span style="width: 1px; height: 16px; margin-left: 10px; margin-top: 8px; margin-right: 10px; background: #dcdcdc;"></span>';
						resultList += '<span class="jhxs_gx"></span>';
						resultList += '<span style="margin-left: 4px; color: #999999;">聚合显示</span>';
						resultList += '<span class="map_ss_jg_gb"></span>';
						resultList += '</ul>';
					}
				},
				error : function(e) {
					// alert("Ajax请求错误,请检查网络连接");
				}
			})
}
/**
 * 搜索结果列表展示
 * 
 * @param data
 * @param name
 */
function searchResult(data, cityAndArea, pageNo) {
	// 结果集
	var records = data.record.records;
	// 结果集的长度
	var totalResult = records.length;

	// 列表节点
	var resultList = '';
	// 搜索结果的顶部
	resultList += '<ul class="map_ss_jg_top">';
	resultList += '<span style="margin-left: 10px;">共搜到</span>';
	resultList += '<span style="color: red;">' + totalResult + '</span>';
	resultList += '<span>个记录</span>';
	resultList += '<span style="width: 1px; height: 16px; margin-left: 10px; margin-top: 8px; margin-right: 10px; background: #dcdcdc;"></span>';
	resultList += '<span class="jhxs_gx"></span>';
	resultList += '<span style="margin-left: 4px; color: #999999;">聚合显示</span>';
	resultList += '<span class="map_ss_jg_gb"></span>';
	resultList += '</ul>';

	for (var i = 0; i < records.length; i++) {// 每一条结果集的数据
		var record = records[i];
		var address = record.address;// 地址
		var alias = record.alias;// 简称
		var id = record.id;// ID
		var memo = record.memo;// 备注
		var name = record.name;// 全称
		var type = record.type;// 类型
		var x = record.x;// x坐标
		var y = record.y;// y坐标
		var z = record.z;// 高程

		var listNum = i + 1;// 列表序号
		/*
		 * 搜索结果列表
		 */

		// 搜索结果名称
		resultList += '<ul class="map_ss_jg_lb">';

		resultList += '<li class="lb_dw">';
		resultList += '<span style="width: 16px; text-align: center;margin-left: 10px; display: block; margin-top: 11px;">'
				+ listNum + '</span>';
		resultList += '</li>';

		resultList += '<li class="map_ss_jg_lb_menu">';

		resultList += '<ul class="map_ss_jg_lb_menu_text">';
		resultList += '<span title="'
				+ name
				+ '" style="color: #2b75ff; margin-right: 20px; OVERFLOW: hidden;WIDTH: 110px; WHITE-SPACE: nowrap; TEXT-OVERFLOW: ellipsis">'
				+ name + '</span>';
		resultList += '<span>详情>></span>';
		resultList += '</ul>';

		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span style="color: #404040; margin-right: 20px;">'
				+ cityAndArea + '</span>';
		resultList += '</ul>';
		/*
		 * 搜索结果类型
		 */
		resultList += cityListType('倾斜摄影');
	}
	// 分页查询
	resultList += pager(pageNo);
	// 页面挂载列表节点
	$(".map_ss_jg").html(resultList);
	// 新生成的列表添加样式
	addNewCSS();
}

/**
 * 分页查询
 * 
 * @param date
 */
function pager(pageNo) {
	// 分页查询
	// var pageNo = data.record.pageNo;// 当前页
	// var pageSize = data.record.pageSize;// 每页记录条数
	// var totalPage = data.record.totalPage;// 总页数
	// var totalRecords = data.record.totalRecords;// 总记录数

	var totalPage = 20;// 总页数

	var resultList = '';
	resultList += '<div style="width: 100%; height: 24px; background: #f0f3f4; position: absolute; bottom: 0px;">';
	resultList += '<div class="fanye1">';
	if (pageNo == 1) {
		resultList += '<span style="width: 53px;">&lt;上一页</span> ';
	} else {
		resultList += '<span style="width: 53px;" onclick="search('
				+ (pageNo - 1) + ')">&lt;上一页</span> ';
	}
	var startPage = (pageNo - 1) < 1 ? 1 : (pageNo - 1);
	var endPage = (startPage + 3) > totalPage ? totalPage : (startPage + 3);
	for (var page = startPage; page <= endPage; page++) {
		if (page == pageNo) {
			resultList += '<span class="shuzi">' + page + '</span>';
		} else {
			resultList += '<span class="shuzi" onclick="search(' + page + ')">'
					+ page + '</span>';
		}
	}
	if (pageNo == totalPage) {
		resultList += '<span style="width: 53px;">下一页&gt;</span>';
	} else {
		resultList += '<span style="width: 53px;" onclick="search('
				+ (pageNo + 1) + ')">下一页&gt;</span>';
	}
	resultList += '</div>';
	resultList += '</div>';
	return resultList;

}

/**
 * 不同类型不同的功能列表节点
 * 
 * @param type
 * @returns resultList
 */
function cityListType(type) {
	var resultList = '';

	if (type == '点') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">' + '点' + '</span>';
		resultList += '</ul>';

		resultList += '</li>';
		// 点类型
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += '<span class="zst_cion"><img src="../img/zst_icon.png"><img class="icon1" src="../img/zst_icon1.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/fst_icon.png"><img class="icon1" src="../img/fst_icon1.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/ldj1.png"><img class="icon1" src="../img/ldj2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/swdj1.png"><img class="icon1" src="../img/swdj2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/jsdj1.png"><img class="icon1" src="../img/jsdj2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += '<span class="zst_cion"><img src="../img/ssjg_xy1.png"><img class="icon1" src="../img/ssjg_xy2.png"></span>';
		resultList += '<span style="float: right; margin-right: 10px;" class="zst_cion"><img src="../img/ssjg_sc1.png">';
		resultList += '<img class="icon1" src="../img/ssjg_sc2.png"></span>';
		resultList += '</div>';

		resultList += '</ul>';
	} else if (type == '路') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">路</span>';
		resultList += '</ul>';

		resultList += '</li>';
		// 路类型
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += '<span class="zst_cion"><img src="../img/bx1.png"><img class="icon1" src="../img/bx2.png"></span> ';
		resultList += '<span class="zst_cion"><img src="../img/cx1.png"><img class="icon1" src="../img/cx2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/fx1.png"><img class="icon1" src="../img/fx2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += '<span class="zst_cion"><img src="../img/ssjg_xy1.png"><img class="icon1" src="../img/ssjg_xy2.png"></span>';
		resultList += '<span style="float: right; margin-right: 10px;" class="zst_cion"><img src="../img/ssjg_sc1.png">';
		resultList += '<img class="icon1" src="../img/ssjg_sc2.png"></span>';
		resultList += '</div>';

		resultList += '</ul>';

	} else if (type == '面') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">面</span>';
		resultList += '</ul>';

		resultList += '</li>';
		// 面类型
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += '<span class="zst_cion"><img src="../img/fx1.png"><img class="icon1" src="../img/fx2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span> ';
		resultList += '<span title="范围线" class="zst_cion"><img src="../img/fwx1.png"><img class="icon1" src="../img/fwx2.png"></span>';
		resultList += '<span style="float: right; margin-right: 10px;" class="zst_cion"><img src="../img/ssjg_sc1.png">';
		resultList += '<img class="icon1" src="../img/ssjg_sc2.png"></span>';
		resultList += '</div>';

		resultList += '</ul>';
	} else if (type == '区') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">区</span>';
		resultList += '</ul>';

		resultList += '</li>';
		// 区类型
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += '<span class="zst_cion"><img src="../img/fx1.png"><img class="icon1" src="../img/fx2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span> ';
		resultList += '<span class="zst_cion"><img src="../img/fwx1.png"><img class="icon1" src="../img/fwx2.png"></span>';
		resultList += '<span style="float: right; margin-right: 10px;" class="zst_cion"><img src="../img/ssjg_sc1.png">';
		resultList += '<img class="icon1" src="../img/ssjg_sc2.png"></span>';
		resultList += '</div>';

		resultList += '</ul>';
	} else if (type == '倾斜摄影') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">' + '面' + '</span>';
		resultList += '</ul>';

		resultList += '</li>';
		// 倾斜摄影类型
		resultList += '<li class="map_ss_jg_lb_menu_icon">';
		resultList += '<span class="zst_cion"><img src="../img/bx1.png"><img class="icon1" src="../img/bx2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/cx1.png"><img class="icon1" src="../img/cx2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/fx1.png"><img class="icon1" src="../img/fx2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span> ';
		resultList += '<span class="zst_cion"><img src="../img/hs1.png"><img class="icon1" src="../img/hs2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += '</li>';

		resultList += '<li class="map_ss_jg_lb_menu_icon">';
		resultList += '<span class="zst_cion">';
		resultList += '<img src="../img/zst_icon.png">';
		resultList += '<img class="icon1" src="../img/zst_icon1.png">';
		resultList += '</span>';

		resultList += '<span class="zst_cion">';
		resultList += '<img src="../img/fst_icon.png">';
		resultList += '<img class="icon1" src="../img/fst_icon1.png">';
		resultList += '</span>';

		resultList += '<span class="zst_cion"><img src="../img/ldj1.png"><img class="icon1" src="../img/ldj2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/swdj1.png"><img class="icon1" src="../img/swdj2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/jsdj1.png"><img class="icon1" src="../img/jsdj2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += '<span class="zst_cion"><img src="../img/fwx1.png"><img class="icon1" src="../img/fwx2.png"></span>';
		resultList += '<span class="zst_cion"><img src="../img/ssjg_xy1.png"><img class="icon1" src="../img/ssjg_xy2.png"></span>';
		resultList += '<span style="float: right; margin-right: 10px;" class="zst_cion">';
		resultList += '<img	src="../img/ssjg_sc1.png"><img class="icon1" src="../img/ssjg_sc2.png"></span>';

		resultList += '</li>';

		resultList += '</ul>';
	}
	return resultList;
}
/**
 * 新生成的列表添加列表样式
 */
function addNewCSS() {
	$('.icon1').hide();
	$('.zst_cion').mouseenter(function() {
		$(this).children('img').hide().eq(1).show();
	});
	$('.zst_cion').mouseleave(function() {
		$(this).children('img').hide().eq(0).show();
	});
	$('.map_ss_jg_gb').click(function() {
		$('.btm_right').animate({
			left : '71px'
		}, 100);
		$('.btm_left_menu .zh_k').hide();
	});
	$('.map_ss_jg_lb').mouseenter(function() {
		$(this).children('.lb_dw').toggleClass('lb_dwclick');
	});
	$('.map_ss_jg_lb').mouseleave(function() {
		$(this).children('.lb_dw').toggleClass('lb_dwclick');
	});

	$('.map_ss_jg_lb_menu_icon').hide();
	$('.map_ss_jg_lb').mouseenter(function() {
		$(this).children('.map_ss_jg_lb_menu_icon').show();
	});
	$('.map_ss_jg_lb').mouseleave(function() {
		$(this).children('.map_ss_jg_lb_menu_icon').hide();
	});
}