/**
 * 该js用于保存项目中的公用方法
 */

/**
 * 分页查询
 * 
 * @param pageNo,页码
 * @param totalPage,总页数
 * @param method,循环的方法名
 * @returns {String},列表节点
 */
function pagerMethod(pageNo, totalPage, method) {
	// 若超出限制则只显示前25*9---200条记录
	if (totalPage > 25) {
		totalPage = 25;
	}
	var currPage = pageNo;
	var pageNode = '';
	pageNode += '<div style="width: 100%; height: 24px; background: #f0f3f4;position: absolute; bottom: 0px;">';
	pageNode += '<div class="fanye1">';
	// 第一页
	pageNode += '<span style="width: 25px;" onclick="' + method + '(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if (currPage == 1) {
		pageNode += '<span style="width: 20px;">&lt;</span> ';
	} else {
		pageNode += '<span style="width: 20px;" onclick="' + method + '('
				+ (pageNo - 1) + ')">&lt;</span> ';
	}
	// 当前页
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	var endPage = (startPage + 3) > totalPage ? totalPage : (startPage + 3);
	for (var page = startPage; page <= endPage; page++) {
		if (page == currPage) {
			pageNode += '<span style="width: 25px;" class="shuzi"><b>' + page
					+ '</b></span>';
		} else {
			pageNode += '<span style="width: 25px;" class="shuzi" onclick="'
					+ method + '(' + page + ')">' + page + '</span>';
		}
	}
	// 下一页
	if (currPage == totalPage) {
		pageNode += '<span style="width: 20px;">&gt;</span>';
	} else {
		pageNode += '<span style="width: 20px;" onclick="' + method + '('
				+ (pageNo + 1) + ')">&gt;</span>';
	}
	// 最后一页
	pageNode += '<span style="width: 25px;" onclick="' + method + '('
			+ totalPage + ')">&gt;&gt;</span>';
	pageNode += '</div>';
	pageNode += '</div>';
	return pageNode;
}

/**
 * 去除数据集合中重复的值
 * 
 * @param array,待处理集合
 * @returns {Array},处理后的集合
 */
function removeDuplicates(array) {
	var r = [];
	for (var i = 0, l = array.length; i < l; i++) {
		for (var j = i + 1; j < l; j++)
			if (array[i] === array[j])
				j = ++i;
		r.push(array[i]);
	}
	return r;
}

/**
 * 获取登录用户对应服务的服务名列表
 * 
 * @param type,服务类型
 * @returns {String},服务名以","拼接成的字符串
 */
function getSnameArrayByType(type) {
	var serverNameList = [];
	// 将异步方法改为同步方法
	$.ajaxSettings.async = false;
	$.ajax({
		type : 'POST',
		data : {
			stype : type
		},
		url : '../layerManager/getSnameByUserID',
		success : function(data) {
			if ((data.success == "1") && (data.record.length > 0)) {
				for (var i = 0; i < data.record.length; i++) {
					serverNameList.push(data.record[i]);
				}
			}
		},
		error : function(e) {
		}
	});
	if (serverNameList.length == 0) {
		return;
	}
	// 多个服务名以","拼接成字符串,第三方服务直接解析多个服务名
	var snameArray = '';
	for (var i = 0; i < serverNameList.length - 1; i++) {
		snameArray += serverNameList[i] + ","
	}
	snameArray += serverNameList[serverNameList.length - 1];
	return snameArray;
}
