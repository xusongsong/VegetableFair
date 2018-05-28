// JavaScript Document
var areaListState = false;// 城市列表展开状态
$(document).ready(
		function() {

			$(".k4").click(function() {
				$(".k1").animate({
					top : '0px'
				}, 'fast');
				$(".k1").show();
//				getModelList();
				
			});
			$(".k5").click(function() {
				$(".k1").animate({
					top : '80px'
				}, 'fast');
				$(".k1").show();
			});
			$(".k6").click(function() {
				$(".k1").animate({
					top : '160px'
				}, 'fast');
				$(".k1").show();
			});

			$('.k4,.k5,.k6').click(function() {
				$('.btm_right').animate({
					left : '352px'
				}, 100);
			});
			$('.k4_1,.k5_1,.k6_1,.k1').hide();
			$('.k4').click(function() {
				$('.k4_1,.k5,.k6').show();
				$('.k4,.k5_1,.k6_1').hide();
				$(".btm_left_menu .zh_k").hide().eq(0).show();
			});
			$('.k4_1').click(function() {
				$('.k4').show();
				$('.k4_1,.k1').hide();
				$('.btm_right').animate({
					left : '71px'
				}, 100);
			});
			$('.k5').click(function() {
				$('.k4,.k5_1,.k6').show();
				$('.k4_1,.k5,.k6_1').hide();
				$(".btm_left_menu .zh_k").hide().eq(1).show();
			});
			$('.k5_1').click(function() {
				$('.k5').show();
				$('.k5_1,.k1').hide();
				$('.btm_right').animate({
					left : '71px'
				}, 100);
			});
			$('.k6').click(function() {
				$('.k4,.k5,.k6_1').show();
				$('.k4_1,.k5_1,.k6').hide();
				$(".btm_left_menu .zh_k").hide().eq(2).show();
			});
			$('.k6_1').click(function() {
				$('.k6').show();
				$('.k6_1,.k1').hide();
				$('.btm_right').animate({
					left : '71px'
				}, 100);
			});
			$(".btm_right_top_left_xy span").click(
					function() {
						$(".btm_right_top_left_xy span").removeClass(
								"btm_right_top_left_xy_dx");
						$(this).addClass("btm_right_top_left_xy_dx");
					});

			$('.Associative').hide();
			$('#city').click(function() {
				$('.Associative').toggle();
				// 城市列表
				getMapList();
				$('.area_lb').hide();
				areaListState = false;
				var mapAreaList = '';
				$(".area_lb").html(mapAreaList);
			});
			$('#city').click(function() {
				$('.Associative_top').toggleClass('.Associative_topclick');
			});
			$('.Associative_top_gb').click(function() {
				$('.Associative').hide();
			});

			$('.lx_ss_k').hide();
			$('.map_ss').click(function() {
				$('.lx_ss_k').show();
			});
			$('.ss_xy').mouseleave(function() {
				$('.lx_ss_k').hide();
			});

			$('.area_lb').hide();
			$('.dz_qy').click(function() {
				$('.Associative').hide();
				if (!areaListState) {
					$('.area_lb').show();
					// 区域列表
					getMapAreaList();
					areaListState = true;
				} else {
					$('.area_lb').hide();
					areaListState = false;
					var mapAreaList = '';
					$(".area_lb").html(mapAreaList);
				}
			});
			// $('.area_lb span').click(function() {
			// $('.area_lb').hide();
			//			});

			$('.yx_lb').hide();
			$('.yx_xy').mouseenter(function() {
				$('.yx_lb').show();
			});
			$('.yx_xy').mouseleave(function() {
				$('.yx_lb').hide();
			});

			$('.btm_left_menu .zh_k').hide().eq(3).show();
			$('.zh_k .map_ss_jg').hide().eq(0).show();
			$('.map_ss_btn').click(function() {
				// map页面点击搜索
				searchSubmit();
				$('.btm_right').animate({
					left : '352px'
				}, 100);
				$('.btm_left_menu .zh_k').hide().eq(3).show();
				$('.zh_k .map_ss_jg').hide().eq(0).show();
				$('.k4,.k5,.k6').show();
				$('.k4_1,.k5_1,.k6_1,.k1').hide();
			});
			$('.jhxs_gx').click(function() {
				$(this).toggleClass('jhxs_gxclick');
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

			$('.icon1').hide();
			$('.zst_cion').mouseenter(function() {
				$(this).children('img').hide().eq(1).show();
			});
			$('.zst_cion').mouseleave(function() {
				$(this).children('img').hide().eq(0).show();
			});

			$('.map_ss_jg_lb_menu_icon').hide();
			$('.map_ss_jg_lb').mouseenter(function() {
				$(this).children('.map_ss_jg_lb_menu_icon').show();
			});
			$('.map_ss_jg_lb').mouseleave(function() {
				$(this).children('.map_ss_jg_lb_menu_icon').hide();
			});

			$('.btm_right_top_left_xy_yx').click(function() {
				$('.btm_right').animate({
					left : '352px'
				}, 100);
				$('.btm_left_menu .zh_k').hide().eq(4).show();
				$('.k4,.k5,.k6').show();
				$('.k4_1,.k5_1,.k6_1,.k1').hide();
			});

			$('.pic1').hide();
			$('.sjz_dd').mouseenter(function() {
				$(this).children('img').hide().eq(1).show();
			});
			$('.sjz_dd').mouseleave(function() {
				$(this).children('img').hide().eq(0).show();
			});

			$("#lsyx_k").hide();
			$('.lsyx_sj_center span').eq(1).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '200px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(1).mouseleave(function() {
				$("#lsyx_k").hide();
			});
			$('.lsyx_sj_center span').eq(2).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '245px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(2).mouseleave(function() {
				$("#lsyx_k").hide();
			});
			$('.lsyx_sj_center span').eq(3).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '290px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(3).mouseleave(function() {
				$("#lsyx_k").hide();
			});
			$('.lsyx_sj_center span').eq(4).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '335px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(4).mouseleave(function() {
				$("#lsyx_k").hide();
			});
			$('.lsyx_sj_center span').eq(5).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '385px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(5).mouseleave(function() {
				$("#lsyx_k").hide();
			});
			$('.lsyx_sj_center span').eq(6).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '435px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(6).mouseleave(function() {
				$("#lsyx_k").hide();
			});
			$('.lsyx_sj_center span').eq(7).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '480px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(7).mouseleave(function() {
				$("#lsyx_k").hide();
			});
			$('.lsyx_sj_center span').eq(8).mouseenter(function() {
				$("#lsyx_k").animate({
					top : '525px'
				}, 'fast');
				$("#lsyx_k").show();
			});
			$('.lsyx_sj_center span').eq(8).mouseleave(function() {
				$("#lsyx_k").hide();
			});

			$('.tcgl_menu_qh span').click(function() {
				$('.tcgl_menu_qh span').removeClass('tcgl_menu_qh_kgfx');
				$(this).addClass('tcgl_menu_qh_kgfx');
			});

			/*
			 * $('.tcgl_menu_qh span').eq(0).click(function(){
			 * $('.shoucang1,.zzhi,.zuzhi_index').show();
			 * $('.shoucang,.zzhi1,.shoucang_index').hide(); });
			 * $('.tcgl_menu_qh span').eq(1).click(function(){
			 * $('.shoucang,.zzhi1,.shoucang_index').show();
			 * $('.shoucang1,.zzhi,.zuzhi_index').hide(); });
			 */
			$(".tcgl_menu_qh span").click(function() {
				var n = $(this).index();
				$("#dttc .map_dttc_menu").hide().eq(n).show();
			});

			$('.tree_k1,.tree_k1_1,.tree_k1_2,.tree_k1_3').hide();
			$('#tree_z1').click(function() {
				$('#tree_g1').next().toggle();
			});
			$('#tree_z2').click(function() {
				$('#tree_g2').next().toggle();
			});
			$('#tree_z4').click(function() {
				$('#tree_g4').next().toggle();
			});
			$('#tree_z5').click(function() {
				$('#tree_g5').next().toggle();
			});
			$('#tree_z6').click(function() {
				$('#tree_g6').next().toggle();
			});

			$('.z_menu').click(function() {
				$(this).children('.tree_xl').toggleClass('tree_xlclick');
			});
			$('.tree_xy').click(function() {
				$(this).toggleClass('tree_xyclick');
			});

			$('.map_dttc_qxsy').mouseenter(
					function() {
						$(this).children('.map_dttc_qxsy_xh').toggleClass(
								'map_dttc_qxsy_xhclick');
					});
			$('.map_dttc_qxsy').mouseleave(
					function() {
						$(this).children('.map_dttc_qxsy_xh').toggleClass(
								'map_dttc_qxsy_xhclick');
					});

			$('#tjsd').hide();
			$('#sdgb,#sd_btn span').click(function() {
				$('#tjsd').hide();
			});

			$('.sdsc_btn').click(function() {
				$('#tjsd').show();
			});

			$('#kgfx').click(function() {
				$('.btm_left_menu .zh_k').hide().eq(5).show();
			});

			$('.kgfx_fh').click(function() {
				$('.btm_left_menu .zh_k').hide().eq(1).show();
			});

			$('#bjgl').click(function() {
				$('.btm_left_menu .zh_k').hide().eq(6).show();
			});

			$('.bjgl_fh').click(function() {
				$('.btm_left_menu .zh_k').hide().eq(1).show();
			});

			$('.bjgl_menu_qh span').click(function() {
				$('.bjgl_menu_qh span').removeClass();
				$(this).addClass('bjgl_menu_qh_kgfx');
			});

			$('.gl_menu').hide().eq(0).show();
			$(".bjgl_menu_qh span").click(function() {
				var n = $(this).index();
				$(".gl_menu").hide().eq(n).show();
			});

			$('#tjbz').hide();
			$('#bzgb,#bz_btn').click(function() {
				$('#tjbz').hide();
			});

			$('.tjbz_btn').click(function() {
				$('#tjbz').show();
			});

			$('.bzxg_menu').hide();
			$('.bzxg_menu_btn span').click(function() {
				$('.bzxg_menu').hide();
			});

			$('#bzxg').click(function() {
				$('.bzxg_menu').show();
			});

			$('#ljgl').click(function() {
				$('.gl_menu').hide().eq(1).show();
				$('.btm_left_menu .zh_k').hide().eq(6).show();
				$('.bjgl_menu_qh span').removeClass();
				$('.bjgl_menu_qh span').eq(1).addClass('bjgl_menu_qh_kgfx');
			});
			$('#bjgl').click(function() {
				$('.gl_menu').hide().eq(0).show();
				$('.btm_left_menu .zh_k').hide().eq(6).show();
				$('.bjgl_menu_qh span').removeClass();
				$('.bjgl_menu_qh span').eq(0).addClass('bjgl_menu_qh_kgfx');
			});

			$('#q_tk').hide();
			$('.qy_tk_btn').click(function() {
				$('#q_tk').show();
			});
			$('.qy_gb').click(function() {
				$('#q_tk').hide();
			});

			$('#qxsy_tk').hide();
			$('.qxsy_tk_btn').click(function() {
				$('#qxsy_tk').show();
			});
			$('#qxsy_gb').click(function() {
				$('#qxsy_tk').hide();
			});

			$('#sxcx_tk').hide();
			$('.btm_right_top_right_sxck').click(function() {
				$('#sxcx_tk').show();
			});
			$('#sxcx_gb').click(function() {
				$('#sxcx_tk').hide();
			});

			$('.jttk').hide();
			$('.btm_right_top_right_jt').click(function() {
				$('.jttk').show();
			});
			$('.jt_tk_btn span,#jt_gb').click(function() {
				$('.jttk').hide();
			});
			$('.kjtk').hide();
			$('.btm_right_top_right_kjxz').click(function() {
				$('.kjtk').show();
			});
			$('.kj_tk_btn span,#kjxz_gb').click(function() {
				$('.kjtk').hide();
			});

		});
