/**
 * 路径管理
 *
 * @author DL
 * @creatDate 2017-10-18
 */
/**
 * 查询路径
 *
 * @param pagenumber,页码
 */
function findPowerPath(pagenumber) {
	// 搜索值为空则查询所有结果
	var pathName = $("#pathInputText").val();
	$.ajax({
		url : '../mapTools/findPath.do',
		type : "post",
		data : {
			pathName : pathName,
			pageNo : pagenumber
		},
		success : function(data) {
			var pathResultList = '';
			if (data.success == 1) {
				// 每一条结果集
				var records = data.record.records;
				// 结果集总数
				var totalRecords = data.record.totalRecords;
				// 总页数
				var totalPage = data.record.totalPage;
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var id = record.id;
					var lnglats = record.lnglats;
					var viewModel = record.viewModel;
					pathResultList += '<ul id="' + id + '" class="map_dttc_qxsy" style="margin-top: 10px;">';
					pathResultList += '<span class="map_dttc_qxsy_xh"><span class="fh">' + (i + 1) + '</span></span>';
					pathResultList += '<span>' + record.pathName + '</span>';
					pathResultList += '<span class="sdsc_sc" id="deletePath" onclick="deletePowerPath(\''+id+'\')" ></span>';
					pathResultList += '<span class="tz" id="stopPath_'+id+'" onclick="sceneManager(\'stopPath_'+id+'\')" value="0" ></span>';
					pathResultList += '<span class="zt" id="pausePath_'+id+'" onclick="sceneManager(\'pausePath_'+id+'\')" value="0" ></span>';
					pathResultList += '<span class="bf" id="playPath_'+id+'" onclick="sceneManager(\'playPath_'+id+'_'+lnglats+'_'+viewModel+'\')" value="0" ></span>';
					pathResultList += '</ul>';
				}
				/** 分页查询* */
				pathResultList += createPathList(pagenumber, totalPage);
			}else{
				//若查询的结果为空则
				var totalPage = 0;
				var pathResultList = '';
				pathResultList += createPageList(pageNumber,0);
			}
			$('.gl_menu_ljgl').html(pathResultList);
		},
		error : function(e) {
		}
	});
}
/**
 * 删除路径
 *
 * @param id,数据id
 */
function deletePowerPath(id) {
	if(confirm("确定删除此路径?")){
		$.ajax({
			url : '../mapTools/deletePath.do',
			type : "post",
			data : {
				id : id
			},
			success : function(data) {
				if (data.success == 1) {
					findPowerPath(1);
				}
			},
			error : function(e) {
			}
		});
	}
}


/**
 * 分页路径列表创建
 * @param pageNo (分页数)
 * @param totalPage (总页数)
 * @returns pageList (分页结果集列表)
 */
function createPathList(pageNo,totalPage){
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageList = '';
	//中间展示几页数目
	var middlePageSize = 3;
	//分页列表拼接
	pageList += '<div class = "fanye">';
	pageList += '<div class="fanye1">';
	// 第一页
	pageList += '<span style="width: 15px;" onclick="findPowerPath(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if(currPage == 1){
		pageList += '<span style="width: 53px;">&lt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick="findPowerPath(' + (currPage - 1) + ')">&lt;</span>';
	}
	//设定中间起始值
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	//设定中间结束值
	var endPage = (startPage + middlePageSize ) > totalPage ? totalPage :(startPage + middlePageSize); 
	//该判定是为了当不足几页显示几页的样式
	if(endPage <= middlePageSize){
		endPage = middlePageSize;
	}
	//循环生成中间列表层级
	for(var page = 1; page <= endPage; page++){
		if(page == currPage){
			pageList += '<span style="width: 25px;" class="shuzi"><b>' + currPage + '</b></span>';
		}else{
			pageList += '<span style="width: 25px;" class="shuzi" onclick="findPowerPath(' + page + ')"><b>' + page + '</b></span>';
		}
	}
	//下一页
	if(currPage == totalPage){
		pageList += '<span style="width: 53px;">&gt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick= "findPowerPath(' + (currPage + 1) + ') ">&gt;</span>';
	}
	//最后一页
	pageList += '<span style="width: 15px;" onclick="findPowerPath(' + totalPage + ')">&gt;&gt;</span> ';
	pageList += '</div>';
	pageList += '</div> ';
	return pageList;
}




/**
 * 分页查询
 *
 * @param pageNo,页码
 * @param totalPage,总页数
 * @returns {String},列表节点
 */
function pathPager(pageNo, totalPage) {
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
	pageNode += '<span style="width: 25px;" onclick="findPowerPath(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if (currPage == 1) {
		pageNode += '<span style="width: 20px;">&lt;</span> ';
	} else {
		pageNode += '<span style="width: 20px;" onclick="findPowerPath('
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
			pageNode += '<span style="width: 25px;" class="shuzi" onclick="findPowerPath('
					+ page + ')">' + page + '</span>';
		}
	}
	// 下一页
	if (currPage == totalPage) {
		pageNode += '<span style="width: 20px;">&gt;</span>';
	} else {
		pageNode += '<span style="width: 20px;" onclick="findPowerPath('
				+ (pageNo + 1) + ')">&gt;</span>';
	}
	// 最后一页
	pageNode += '<span style="width: 25px;" onclick="findPowerPath('
			+ totalPage + ')">&gt;&gt;</span>';
	pageNode += '</div>';
	pageNode += '</div>';
	return pageNode;
}

/**
 * 输入框监听回车事件
 */
function keyDownQuerySearchPath() {
	var event = document.all ? window.event : e;
	if (event.keyCode == 13) {
		findPowerPath(1);
	}
}
/*******************************************************************新增路径(Start)**********************************************************************/
var isLjlz = false;
var linePath;
// 路径录制
function recordePath(){
	var ljName = $("#testBtn").val();
    if(ljName == ''){
        alert('请填写需保持的路径名称！！！');
    }else{
    	linePath = map3D.drawRoamPath();
        isLjlz = true;
    }
    if(ljName.length>20){
        alert('路径名称过长,请重新输入!');
        $("#testBtn").val('');
        return;
    }
}
// 路径保存
function savePath(){
	// 获取viewModel
	var points = map3D.getViewPoint();
    var pointList = points.split(";");
    var viewModel = pointList[3].split(":")[1] +"," + pointList[4].split(":")[1] +","+pointList[5].split(":")[1];
    // 获取pathName
	var ljName = $("#testBtn").val();
    if(ljName == ''){
        alert('请填写需保持的路径名称！！！');
        return;
    }
    // 获取lnglats
	var lnglats = '';
    if(isLjlz){
        var opt = linePath.GetLayerResult();
        if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_draw2dobject"){
            lnglats = opt.GetConfigValueByKey("Points");
        }
    }else{
        alert('请点击【录制】按钮进行路径录制');
        return;
    }
    if(lnglats==''){
        alert('请点击【录制】按钮进行路径录制');
        return;
    }
    if(confirm("确定删除此路径?")){
	    $.ajax({
			url : '../mapTools/addPath.do',
			type : "post",
			data : {
				userId      :   "",
				pathName 	:	ljName,
				lnglats  	: 	lnglats,
				viewModel	:	viewModel
			},
			success : function(data) {
				if (data.success == 1) {
					findPowerPath(1);
					alert("路径添加成功");
				}else{
					alert(data.msg);
				}
			},
			error : function(e) {
			}
		});
    }
    $("#testBtn").val('');
    clearPath();
}
// 路径清除
function clearPath(){
    isLjlz = false;
    map.RemoveLayer(linePath);
}
/*******************************************************************新增路径(End)**********************************************************************/