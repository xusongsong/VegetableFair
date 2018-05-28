/**
 * 当前门禁列表查询
 * @author shine
 * @date 2017年3月8日
 */

$(document).ready(function(){
	//getLockLogFir();
	//点击查询时查询当前列表信息
	$("#lockSearch").unbind('click').click(function(){
		//调用父页面模糊查询方法
		var data = parent.searchLockListByDate();
		searchLockList(data);
	});
	//点击伸缩当前iframe
	$("#flex").unbind('click').click(function(){
		$(this).toggleClass('xzclick');
		$(this).parents('.mj_jl').find('.mj_jl_btm').toggle();
		//若已展开则关闭
		if($("#flex").hasClass("xz xzclick")){
			parent.closeLockLogMenu();
		}else{//若已关闭则展开
			parent.openLockLogMenu();
		}
	});
});

/**
 * 初始化的时候获取门禁列表记录
 */
function getLockLogFir(){
	var data  = parent.getVillageLog();
	searchLockList(data);
}
/**
 *查询门禁记录列表
 */
function searchLockList(data){
	if(data.code == '0'){
		var lockList = createLockList(data);
		$("#lockListSearch").html(lockList);
	}
} 

/**
 * 创建门禁记录列表
 * @param data
 * @returns {String}
 */
function createLockList(data){
	var lockList = '';
	var lockLogs = data.data;
	if(lockLogs.length == 0){//若查询的结果集为空
		for(var j = 0; j < 6;j++){
			lockList += '<tr>';
			lockList += '<td valign="middle" align="center"></td>';
			lockList += '<td valign="middle" align="center"></td>';
			lockList += '<td valign="middle" align="center"></td>';
			lockList += '<td valign="middle" align="center"></td>';
			lockList += '<td valign="middle" align="center"></td>';
			lockList += '<td valign="middle" align="center"></td>';
			lockList += '</tr>';
		}
	}else{//若查询的结果集有值
		for(var i = 0 ; i < lockLogs.length; i++){
			var lockLog = lockLogs[i];
			(lockLog.controlNum == null || lockLog.controlNum == undefined)?'':lockLog.controlNum;
			(lockLog.time == null || lockLog.time == undefined)?'':lockLog.time;
			(lockLog.name == null || lockLog.name == undefined)?'':lockLog.name;
			(lockLog.address == null || lockLog.address == undefined)?'':lockLog.address;
			(lockLog.openType == null || lockLog.openType == undefined)?'':lockLog.openType;
			//(lockLog.state == null || lockLog.state == undefined)?'':lockLog.state;
			lockList += '<tr>';
			lockList += '<td valign="middle" align="center">'+ lockLog.controlNum +'</td>';
			lockList += '<td valign="middle" align="center">'+ lockLog.time +'</td>';
			lockList += '<td valign="middle" align="center">'+ lockLog.name +'</td>';
			lockList += '<td valign="middle" align="center">'+ lockLog.address +'</td>';
			lockList += '<td valign="middle" align="center">'+ lockLog.openType +'</td>';
			//lockList += '<td valign="middle" align="center">'+ lockLog.state +'</td>';
			lockList += '<td valign="middle" align="center">正常</td>';
			lockList += '</tr>';
		}
	}
	return lockList;
}
