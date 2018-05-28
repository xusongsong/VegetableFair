// JavaScript Document
var listState = false;// 城市列表展开状态
$(document).ready(function() {
	// 修改表单回车提交功能
	document.onkeydown = function(ev) {
		ev = ev || window.event;
		if (ev.keyCode == 13) {
			search();// index页面搜索功能
		}
	}
	$('.login_k').hide();
	$('.top_nav_right_login').click(function() {
		$('.login_k').show();
	});
	$('.login_btn').click(function() {
		$('.login_k').hide();
	});
	$('.Associative').hide();
	$('.local').click(function() {
		// $('.Associative').show();
		// getCityList();
		if (!listState) {
			$('.Associative').show();
			getCityList();// 城市列表
			listState = true;
		} else {
			$('.Associative').hide();
			listState = false;
		}

	});
	$('.btn').click(function() {
		search();// index页面搜索功能
	});
});