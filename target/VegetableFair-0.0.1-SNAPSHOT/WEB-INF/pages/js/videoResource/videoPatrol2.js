/**
 * 视频巡更
 *
 * @author shine
 * @creatDate 2018-03-29
 * 
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
				pathResultList += pathPager(pagenumber, totalPage);
			}
			$('#gl_menu_ljgl').html(pathResultList);
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
	var ljName = $("#pathInputText").val();
    if(ljName == ''){
        alert('请填写需保持的路径名称！！！');
    }else{
    	linePath = map3D.addGraphics(3,{});
        isLjlz = true;
    }
    if(ljName.length>20){
        alert('路径名称过长,请重新输入!');
        $("#pathInputText").val('');
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
	var ljName = $("#pathInputText").val();
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
    $("#pathInputText").val('');
    clearPath();
}
// 路径清除
function clearPath(){
    isLjlz = false;
    map.RemoveLayer(linePath);
}

/**
 * 场景管理(播放、暂停、停止)
 * 
 * @param thisId,数据id
 */
function sceneManager(thisId) {
	var ids = thisId.split("_");
	// 类型
	var type = ids[0];
	// 标记
	var id = ids[1];
	// 清除所有标记
	$('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass(
			'map_dttc_qxsy_xhclick');
	// 特定标记
	$('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');
	switch (type) {
	/** 路径管理* */
	// 播放
	case "playPath":
		// 播放路径
		var lnglats = ids[2];
		// 播放视角
		var viewModel = ids[3];
		if ($("#playPath_" + id).val() == '0') {
			// 停止按钮样式 - 关
			$("#stopPath_" + id).css("background", "url(../img/tz.png)");
			$("#stopPath_" + id).val(0);
			// 暂停按钮样式 - 关
			$("#pausePath_" + id).css("background", "url(../img/zt.png)");
			$("#pausePath_" + id).val(0);
			// 播放按钮样式 - 开
			$("#playPath_" + id).css("background", "url(../img/bf1.png)");
			$("#playPath_" + id).val(1);
			play(id, lnglats, viewModel);
		}
		break;
	// 暂停
	case "pausePath":
		if ($("#pausePath_" + id).val() == '0') {
			// 若已停止则不再暂停
			if ($("#stopPath_" + id).val() == '1') {
				return;
			}
			// 播放按钮样式 - 关
			$("#playPath_" + id).css("background", "url(../img/bf.png)");
			$("#playPath_" + id).val(0);
			// 暂停按钮样式 - 开
			$("#pausePath_" + id).css("background", "url(../img/zt1.png)");
			$("#pausePath_" + id).val(1);
			pause(id);
		} else {
			// 暂停按钮样式 - 关
			$("#pausePath_" + id).css("background", "url(../img/zt.png)");
			$("#pausePath_" + id).val(0);
			// 播放按钮样式 - 开
			$("#playPath_" + id).css("background", "url(../img/bf1.png)");
			$("#playPath_" + id).val(1);
			play(id, lnglats, viewModel);
		}
		break;
	// 停止
	case "stopPath":
		if ($("#stopPath_" + id).val() == '0') {
			// 播放按钮样式 - 关
			$("#playPath_" + id).css("background", "url(../img/bf.png)");
			$("#playPath_" + id).val(0);
			// 暂停按钮样式 - 关
			$("#pausePath_" + id).css("background", "url(../img/zt.png)");
			$("#pausePath_" + id).val(0);
			// 停止按钮样式 - 开
			$("#stopPath_" + id).css("background", "url(../img/tz1.png)");
			$("#stopPath_" + id).val(1);
			stop(id);
		}
		break;
	default:
		break;
	}
}
/*******************************************************************新增路径(End)**********************************************************************/