/**
 * 四宫格悬窗事件集
 * @author shine
 * @data 2017 3月7日
 */

$(document).ready(function(){
	//视频监控按钮事件
	$('.sp').click(function(){
		if(!parent.fristVideoFlag){
			parent.videoShowOrHideFirst(1);
			//$(this).toggleClass('spclick');
		}
	});
	
	//门禁事件
	$('.mj').click(function(){
		if(!parent.fristLockFlag){
			var firstLockLevel = parent.lockKeyLevel[1];
			for(var i = 0; i < firstLockLevel.length; i++){
				var id = firstLockLevel[i].id;
				parent.lockShowOrHideFir(id);
				//$(this).toggleClass('mjclick');
			}
		}
	});
	
	//防攀爬事件
	$('.fpp').click(function(){
		$(this).toggleClass('fppclick');
	});
	
	//wife指针事件
	$('.wf').click(function(){
		$(this).toggleClass('wfclick');
	});
});