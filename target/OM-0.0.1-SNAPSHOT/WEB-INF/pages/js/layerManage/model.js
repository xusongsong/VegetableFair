function getModelList() {
	$.ajax({
		type : 'POST',
		data : {
			areacode : "330100",
			type : "wrl"
		},
		url : '../layerManager/getModelList',
		success : function(data) {
			/**
			 * 对封装的数据进行解析
			 */
			console.log(data);
			if (data.success == "1") {
				// 生成模型列表
				createModelList(data.recode);
			} else {
				var resultList = '';
				// 搜索结果的顶部
			}
		},
		error : function(e) {
			alert("Ajax请求错误,请检查网络连接");
		}
	});
}

function createModelList(data) {
//	// 结果总数
//	var totalRecoeds = data.record.totalRecords;
//	// 结果集
//	var records = data.record.records;
//
//	// 列表节点
//	var resultList = '';
//	// 模型列表
//	resultList += '<ul class="map_ss_jg_top">';
//	resultList += '<span style="margin-left: 10px;">共搜到</span>';
//	resultList += '<span style="color: red;">' + totalRecoeds + '</span>';
//	resultList += '<span>个记录</span>';
//	resultList += '<span style="width: 1px; height: 16px; margin-left: 10px; margin-top: 8px; margin-right: 10px; background: #dcdcdc;"></span>';
//	resultList += '<span class="jhxs_gx"></span>';
//	resultList += '<span style="margin-left: 4px; color: #999999;">聚合显示</span>';
//	resultList += '<span class="map_ss_jg_gb"></span>';
//	resultList += '</ul>';
//	// 搜索列表
//	$(".map_ss_jg").html(resultList);
}