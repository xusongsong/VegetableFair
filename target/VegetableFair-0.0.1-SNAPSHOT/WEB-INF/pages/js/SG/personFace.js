/**
 * @author shine
 * 
 * 人脸识别模块方法集
 * 
 * @date 2018-4-10
 */

//备注:观看此方法时，请先以方法为切入点，先看方法数目以及其作用，连成一条线形成业务路径，再去观看代码

//查询人脸设备时分页每页条数
var facePageSize = 7;

/**
 * 获取人脸识别设备列表
 * @param pageNo
 * @returns
 */
function getVideoFaceList(pageNo){
	var url = '../cameraoption/cameralist';
	var data = {
			pageSize:pageSize,
			pageNo:facePageSize,
			indexCode:'',
			deviceCode:''
	};
	//获取人脸设备列表结果集
	$.ajax({
		url:url,
		type:'get',
		data:data,
		success:function(data){
			var faceList = '';
			if(data.code == 0){//若有设备结果集则
				//获取后台总页数
				var total = data.data.total;
				var pageSize = data.data.pageSize;
				var totalPage = (total%pageSize) == 0?(total/pageSize):((total/pageSize)+1);
				//挂载设备列表
				faceList += createVideoFaceList(data);
			}else{//若无则挂载空的分页列表
				var totalPage = 0;
			}
			faceList += pageVideoFaceList(pageNo,totalPage);
			$('#faceList').html(faceList);
		},
		error:function(e){
		}
	});
}

/**
 * 创建人脸设备列表
 * @param data
 * @returns
 */
function createVideoFaceList(data){
	var faceList = '';
	if(data.data.list){//判断人脸设备结果集是否为空
		var faceArray = data.data.list;
		for(var i = 0; i < faceArray.length; i++ ){
			var level = faceArray[i];
			faceList += '<div class="rfgl_lb_menu_lb">';
			faceList += '<span class="rfgl_lb_menu_lb_dw">';
			faceList += '<p class="p1">' + i + '</p>';
			faceList += '</span>';
			faceList += '<span class="rfgl_lb_menu_lb_text">';
			faceList += '<span>' + level.cameraName + '</span>';
			faceList += '</span>';
			faceList += '<span class="rfgl_lb_menu_lb_text1">' + level.userName + '</span>';
			faceList += '</div>';
		}
	}
	return faceList;
}

/**
 * 分页拼接结果集
 * @param pageNo
 * @param totalPage
 * @returns
 */
function pageVideoFaceList(pageNo,totalPage){
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageList = '';
	//中间展示几页数目
	var middlePageSize = 3;
	//分页列表拼接
	pageList += '<div class = "fanye">';
	pageList += '<div class="fanye1">';
	// 第一页
	pageList += '<span style="width: 15px;" onclick="getVideoFaceList(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if(currPage == 1){
		pageList += '<span style="width: 53px;">&lt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick="getVideoFaceList(' + (currPage - 1) + ')">&lt;</span>';
	}
	//设定中间起始值(小于极小点)
	var startPage = currPage - 1 < 1 ? 1: currPage -1;
	//设定结束值(大于极大点)
	var endPage = (startPage + middlePageSize) > totalPage ? totalPage : (startPage + middlePageSize);
	//该判定是为了当不足几页显示几页的样式
	if(endPage <= middlePageSize){
		endPage = middlePageSize;
	}
	//循环生成中间列表层级
	for(var page = 1; page <= endPage; page++){
		if(page == currPage){
			pageList += '<span style="width: 25px;" class="shuzi"><b>' + currPage + '</b></span>';
		}else{
			pageList += '<span style="width: 25px;" class="shuzi" onclick="getVideoFaceList(' + page + ')"><b>' + page + '</b></span>';
		}
	}
	//下一页
	if(currPage == totalPage){
		pageList += '<span style="width: 53px;">&gt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick= "getVideoFaceList(' + (currPage + 1) + ') ">&gt;</span>';
	}
	//最后一页
	pageList += '<span style="width: 15px;" onclick="getVideoFaceList(' + totalPage + ')">&gt;&gt;</span> ';
	pageList += '</div>';
	pageList += '</div> ';
	return pageList;
}

/**
 * 添加列表事件(在列表重新进行挂载后，原先的事件会失效，需重新挂载)
 * @returns
 */
function addVideoFaceEvent(){
	$('.rfgl_lb_menu_lb').mouseenter(function(){
		$(this).children('.rfgl_lb_menu_lb_dw').toggleClass('rfgl_lb_menu_lb_dwclick');
	});
	$('.rfgl_lb_menu_lb').mouseleave(function(){
		$(this).children('.rfgl_lb_menu_lb_dw').toggleClass('rfgl_lb_menu_lb_dwclick');
	});
}

/**--------------------------------------------------------人脸信息实时推送模块------------------------------------------------------------**/
function showSnapshotMessage(autoMessage){
    //console.log(autoMessage);
    createRealList();
   // document.getElementById("DemoDiv").innerHTML += "<li>" + autoMessage + "</li>";
} 

function createRealList(){
	var realList = '';
	realList += '<div class="sb_pic">';
	realList += '<span class="zp"></span>';
	realList += '<span>男</span>';
	realList += '</div>';
	$('#realList').prepend(realList);
	var limitLength = $("#realList").children('div').length;
	//console.log(limitLength);
	if(limitLength > 9){
		$('#realList').html('');
	}
}