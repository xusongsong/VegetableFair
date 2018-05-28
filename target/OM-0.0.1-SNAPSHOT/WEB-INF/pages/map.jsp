<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<title>基础地图</title>
<link rel="stylesheet" type="text/css" href="../css/map.css">
<script src="../js/jquery.js"></script>
<script src="../js/map.js"></script>

<script src="../om/common/Class.js"></script>
<script src="../om/common/Util.js"></script>
<script src="../om/mapSearcher/MapSearcher.js"></script>
<script src="../om/mapSearcher/MapList.js"></script>
<script src="../om/mapSearcher/Search.js"></script>
<script src="../om/layerManage/model.js"></script>
</head>

<body>
	<div class="OMmap_top">
		<ul class="OMmap_top_logo"></ul>
		<ul class="OMmap_top_ssk">
			<div class="ss_xy">
				<span style="width: 428px; height: 40px;"><input
					class="map_ss" type="text" placeholder="输入搜索关键字"></span> <span
					class="map_ss_btn"></span>
				<div class="lx_ss_k">
					<ul class="Associative_top">
						<span>城市列表</span>
					</ul>
					<ul class="all_city"
						style="border: 0px; height: 40px; color: #404040;">
						<!-- <span style="margin-right: 10px;">杭州市</span>
						<span style="margin-right: 10px;">南京市</span>
						<span style="margin-right: 10px;">绍兴市</span>
						<span style="margin-right: 10px;">富阳市</span>
						<span style="margin-right: 10px;">嘉兴市</span>
						<span style="margin-right: 10px;">舟山市</span>
						<span style="margin-right: 10px;">曲靖市</span> -->
					</ul>
					<ul class="Associative_top">
						<span>最近搜索</span>
					</ul>
					<!-- <div
						style="width: 100%; max-height: 150px; overflow: auto; overflow-x: hidden;">
						<ul class="lx_ss_k_lb">
							<span class="ss_ddw"></span>
							<span>西湖区</span>
						</ul>
						<ul class="lx_ss_k_lb">
							<span class="ss_ddw"></span>
							<span>江干区</span>
						</ul>
						<ul class="lx_ss_k_lb">
							<span class="ss_ddw"></span>
							<span>滨江区</span>
						</ul>
						<ul class="lx_ss_k_lb">
							<span class="ss_ddw"></span>
							<span>余杭区</span>
						</ul>
						<ul class="lx_ss_k_lb">
							<span class="ss_ddw"></span>
							<span>临平区</span>
						</ul>
					</div> -->
					<ul class="Associative_top"
						style="border: 0px; height: 40px; line-height: 40px; border-top: 1px solid #dadada; width: 100%; cursor: pointer;">
						<span class="map_qcjl"
							style="float: right; margin-right: 10px; color: #b2b2b2;">清除历史记录</span>
					</ul>
				</div>
				<div>
		</ul>
	</div>
	<div class="OMmap_btm">
		<ul class="OMmap_btm_left">
			<li class="k1"></li>
			<li class="k2">
				<ul class="k4">
					<span class="k3_pic"><img src="../img/dttc1.png"></span>
					<span>地图图层</span>
				</ul>
				<ul class="k4_1">
					<span class="k3_pic"><img src="../img/dttc2.png"></span>
					<span>地图图层</span>
				</ul>
				<ul class="k5">
					<span class="k3_pic"><img src="../img/dtgj1.png"></span>
					<span>地图工具</span>
				</ul>
				<ul class="k5_1">
					<span class="k3_pic"><img src="../img/dtgj2.png"></span>
					<span>地图工具</span>
				</ul>
				<ul class="k6">
					<span class="k3_pic"><img src="../img/scsd1.png"></span>
					<span>视点收藏</span>
				</ul>
				<ul class="k6_1">
					<span class="k3_pic"><img src="../img/scsd2.png"></span>
					<span>视点收藏</span>
				</ul>
			</li>
		</ul>
		<ul class="btm_left_menu">
			<li id="dttc" class="zh_k">
				<div class="tcgl_menu">
					<div class="tcgl_menu_qh">
						<span class="tcgl_menu_qh_kgfx">三维模型</span> <span>倾斜摄影</span> <span>BIM</span>
					</div>
				</div>
				<ul class="map_dttc_menu">
					<div class="map_dttc_menu_ss">
						<span>当前位置：</span> <span> <select>
								<option>杭州市</option>
						</select>
						</span>
					</div>
					<div class="map_dttc_menu_tree">
						<ul id="tree_g1" class="map_dttc_menu_tree_menu">
							<div id="tree_z1" class="z_menu">
								<span class="tree_xl"></span> <span class="tree_icon"></span> <span
									class="tree_text">西湖区1</span>
							</div>
							<span class="tree_xy"></span>
						</ul>
						<div class="tree_k1">
							<ul id="tree_g2" class="map_dttc_menu_tree_menu">
								<div id="tree_z2" class="z_menu">
									<span style="margin-left: 20px;" class="tree_xl"></span> <span
										class="tree_icon"></span> <span class="tree_text">地形</span>
								</div>
								<span class="tree_xy"></span>
							</ul>
							<div class="tree_k1_1">
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
							</div>


							<!--  <ul id="tree_g4" class="map_dttc_menu_tree_menu">
								<div id="tree_z4" class="z_menu">
									<span style="margin-left: 20px;" class="tree_xl"></span> <span
										class="tree_icon"></span> <span class="tree_text">模型</span>
								</div>
								<span class="tree_xy"></span>
							</ul>
							<div class="tree_k1_2">
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
							</div>


							<ul id="tree_g5" class="map_dttc_menu_tree_menu">
								<div id="tree_z5" class="z_menu">
									<span style="margin-left: 20px;" class="tree_xl"></span> <span
										class="tree_icon"></span> <span class="tree_text">矢量</span>
								</div>
								<span class="tree_xy"></span>
							</ul>
							<div class="tree_k1_3">
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
								<ul class="map_dttc_menu_tree_menu">
									<div class="z_menu">
										<span style="margin-left: 60px;" class="tree_icon1"></span> <span
											class="tree_text1">西湖区2</span>
									</div>
									<span class="tree_xy"></span>
								</ul>
							</div> -->
						</div>
					</div>
				</ul>
				<ul class="map_dttc_menu">
					<div class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_fwx"></span> <span
							class="qxsy_xy"></span>
					</div>
				</ul>
				<ul class="map_dttc_menu">
					<div class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_xy"></span>
					</div>
					<div class="map_dttc_qxsy">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span> <span>钱江新城</span> <span class="qxsy_xy"></span>
					</div>
				</ul>
			</li>
			<li class="zh_k">
				<div style="margin-top: 13px;" class="kjfx_fg">
					<span><strong>漫游模式</strong></span>
				</div>
				<div class="dtgj_top">
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/bx_icon.png"></span>
						<span class="dtgj_top_kjfx_text">步行</span>
					</ul>
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/cx_icon.png"></span>
						<span class="dtgj_top_kjfx_text">车行</span>
					</ul>
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/fx_icon.png"></span>
						<span class="dtgj_top_kjfx_text">飞行</span>
					</ul>
				</div>
				<div class="kjfx_fg">
					<span><strong>测量工具</strong></span>
				</div>
				<div class="dtgj_top">
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/spcl_icon.png"></span>
						<span class="dtgj_top_kjfx_text">水平测量</span>
					</ul>
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/czcl_icon.png"></span>
						<span class="dtgj_top_kjfx_text">垂直测量</span>
					</ul>
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/mjcl_icon.png"></span>
						<span class="dtgj_top_kjfx_text">面积测量</span>
					</ul>
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/kjcl_icon.png"></span>
						<span class="dtgj_top_kjfx_text">空间测量</span>
					</ul>
				</div>
				<div class="kjfx_fg">
					<span><strong>场景管理</strong></span>
				</div>
				<div class="dtgj_top">
					<ul id="bjgl" class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/bzgl_icon.png"></span>
						<span class="dtgj_top_kjfx_text">标注管理</span>
					</ul>
					<ul id="ljgl" class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/ljgl_icon.png"></span>
						<span class="dtgj_top_kjfx_text">路径管理</span>
					</ul>
				</div>
				<div class="kjfx_fg">
					<span><strong>空间分析</strong></span>
				</div>
				<div class="dtgj_top">
					<ul id="kgfx" class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/kgfx_icon.png"></span>
						<span class="dtgj_top_kjfx_text">控高分析</span>
					</ul>
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/tsfx_icon.png"></span>
						<span class="dtgj_top_kjfx_text">通视分析</span>
					</ul>
					<ul class="dtgj_top_xsgj">
						<span class="dtgj_top_kjfx_pic"><img
							src="../img/syfx_icon.png"></span>
						<span class="dtgj_top_kjfx_text">视域分析</span>
					</ul>
				</div>
			</li>
			<li class="zh_k">
				<div class="sdsc_top">
					点击“<span style="color: #4fa1ff;">保存当前视点</span>”按钮，即可保存视点。
				</div>
				<div class="sdsc_btn"></div>
				<div class="sdgl_menu">
					<div style="background: #f4f4f4;" class="sdgl_menu_qh">
						<span style="margin-left: 10px;" class="sdgl_menu_qh_kgfx">视点收藏</span>
					</div>
				</div>
				<div class="sdsc_lb">
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 30px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
				</div>
			</li>
			<li class="zh_k">
				<div class="map_ss_jg">
					<!--点击搜索内容-->
					<!-- <ul class="map_ss_jg_top">
						<span style="margin-left: 10px;">共搜到</span>
						<span style="color: red;">25</span>
						<span>个记录</span>
						<span
							style="width: 1px; height: 16px; margin-left: 10px; margin-top: 8px; margin-right: 10px; background: #dcdcdc;"></span>
						<span class="jhxs_gx"></span>
						<span style="margin-left: 4px; color: #999999;">聚合显示</span>
						<span class="map_ss_jg_gb"></span>
					</ul>
					
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">1</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖倾斜摄影</span>
								<span class="qxsy_tk_btn">详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">面</span>
							</ul>
						</li>
						<li class="map_ss_jg_lb_menu_icon"><span class="zst_cion"><img
								src="../img/bx1.png"><img class="icon1" src="../img/bx2.png"></span>
							<span class="zst_cion"><img src="../img/cx1.png"><img
								class="icon1" src="../img/cx2.png"></span> <span class="zst_cion"><img
								src="../img/fx1.png"><img class="icon1" src="../img/fx2.png"></span>
							<span class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/hs1.png"><img class="icon1" src="../img/hs2.png"></span>
							<span class="map_ss_jg_fg"></span></li>
						<li class="map_ss_jg_lb_menu_icon"><span class="zst_cion"><img
								src="../img/zst_icon.png"><img class="icon1"
								src="../img/zst_icon1.png"></span> <span class="zst_cion"><img
								src="../img/fst_icon.png"><img class="icon1"
								src="../img/fst_icon1.png"></span> <span class="zst_cion"><img
								src="../img/ldj1.png"><img class="icon1" src="../img/ldj2.png"></span>
							<span class="zst_cion"><img src="../img/swdj1.png"><img
								class="icon1" src="../img/swdj2.png"></span> <span class="zst_cion"><img
								src="../img/jsdj1.png"><img class="icon1" src="../img/jsdj2.png"></span>
							<span class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/fwx1.png"><img class="icon1" src="../img/fwx2.png"></span>
							<span class="zst_cion"><img src="../img/ssjg_xy1.png"><img
								class="icon1" src="../img/ssjg_xy2.png"></span> <span
							style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span></li>
					</ul>
					
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">2</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖博物馆</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">点</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/zst_icon.png"><img
								class="icon1" src="../img/zst_icon1.png"></span> <span
								class="zst_cion"><img src="../img/fst_icon.png"><img
								class="icon1" src="../img/fst_icon1.png"></span> <span
								class="zst_cion"><img src="../img/ldj1.png"><img
								class="icon1" src="../img/ldj2.png"></span> <span class="zst_cion"><img
								src="../img/swdj1.png"><img class="icon1" src="../img/swdj2.png"></span>
							<span class="zst_cion"><img src="../img/jsdj1.png"><img
								class="icon1" src="../img/jsdj2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/ssjg_xy1.png"><img class="icon1"
								src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">3</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖区</span>
								<span class="qy_tk_btn">详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">区</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/fwx1.png"><img class="icon1" src="../img/fwx2.png"></span>
							<span style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					
					
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">4</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西湖区景区</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">面</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span title="范围线" class="zst_cion"><img
								src="../img/fwx1.png"><img class="icon1" src="../img/fwx2.png"></span>
							<span style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">5</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1" src="../img/cx2.png"></span>
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/ssjg_xy1.png"><img class="icon1"
								src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">6</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1" src="../img/cx2.png"></span>
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/ssjg_xy1.png"><img class="icon1"
								src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">7</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1" src="../img/cx2.png"></span>
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/ssjg_xy1.png"><img class="icon1"
								src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul>
					<ul class="map_ss_jg_lb">
						<li class="lb_dw"><span
							style="width: 16px; text-align: center; margin-left: 10px; display: block; margin-top: 11px;">8</span></li>
						<li class="map_ss_jg_lb_menu">
							<ul class="map_ss_jg_lb_menu_text">
								<span style="color: #2b75ff; margin-right: 20px;">西溪路</span>
								<span>详情>></span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span style="color: #404040; margin-right: 20px;">浙江省杭州市西湖区</span>
							</ul>
							<ul class="map_ss_jg_lb_menu_text1">
								<span>类型：</span>
								<span class="leixing">路</span>
							</ul>
						</li>
						<div class="map_ss_jg_lb_menu_icon">
							<span class="zst_cion"><img src="../img/bx1.png"><img
								class="icon1" src="../img/bx2.png"></span> <span class="zst_cion"><img
								src="../img/cx1.png"><img class="icon1" src="../img/cx2.png"></span>
							<span class="zst_cion"><img src="../img/fx1.png"><img
								class="icon1" src="../img/fx2.png"></span> <span
								class="map_ss_jg_fg"></span> <span class="zst_cion"><img
								src="../img/ssjg_xy1.png"><img class="icon1"
								src="../img/ssjg_xy2.png"></span> <span
								style="float: right; margin-right: 10px;" class="zst_cion"><img
								src="../img/ssjg_sc1.png"><img class="icon1"
								src="../img/ssjg_sc2.png"></span>
						</div>
					</ul> -->

					<!-- 	<div
						style="width: 100%; height: 24px; background: #f0f3f4; position: absolute; bottom: 0px;">
						<div class="fanye1">
							<span style="width: 53px;">&lt;上一页</span> <span class="shuzi">111</span>
							<span class="shuzi">1</span> <span class="shuzi">1</span> <span
								style="width: 53px;">下一页&gt;</span>
						</div>
					</div> -->

				</div>
			</li>
			<li class="zh_k">
				<!--历史影像-->
				<ul class="map_ss_jg_top">
					<span style="margin-left: 10px;">历史影像</span>
					<!--<span style="color: red;">25</span>
					<span>个记录</span>
					<span style="width: 1px;height: 16px;margin-left: 10px;margin-top: 8px;margin-right: 10px;background: #dcdcdc;"></span>
					<span class="jhxs_gx"></span>
					<span style="margin-left: 4px;color:#999999;">聚合显示</span>-->
					<span class="map_ss_jg_gb"></span>
				</ul>
				<div class="lsyx_sj">
					<ul class="lsyx_sj_left">
						<span style="margin-top: 67px;" class="lsyx_sj_left_text1">2017</span>
						<span class="lsyx_sj_left_text2">12.12</span>
						<span class="lsyx_sj_left_text2">09.08</span>
						<span class="lsyx_sj_left_text2">07.12</span>
						<span class="lsyx_sj_left_text1">2017</span>
						<span class="lsyx_sj_left_text2">12.12</span>
						<span class="lsyx_sj_left_text2">09.08</span>
						<span class="lsyx_sj_left_text2">07.12</span>
					</ul>
					<ul class="lsyx_sj_center">
						<span><img src="../img/lsyx_sjz.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_dd.png"><img
							class="pic1" src="../img/lsyx_dd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_dd.png"><img
							class="pic1" src="../img/lsyx_dd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
						<span class="sjz_dd"><img src="../img/lsyx_xd.png"><img
							class="pic1" src="../img/lsyx_xd1.png"></span>
					</ul>
					<ul class="lsyx_sj_right">
						<li id="lsyx_k" class="lsyx_sj_right_menu">
							<ul class="lsyx_sj_right_menu_top"></ul>
							<ul class="lsyx_sj_right_menu_center">
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;"><strong>2017年西湖区影像</strong></span>
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;">生产单位：浙江科澜</span>
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;">面积：300平方米</span>
								<span
									style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;">精度：0.3</span>
							</ul>
						</li>
					</ul>
				</div>
			</li>
			<li class="zh_k">
				<!--6控高分析-->
				<div class="kgfx_top">
					<span class="kgfx_fh"
						style="color: #4fa1ff; cursor: pointer; margin-left: 10px;"><
						返回全部</span> <span>—控高分析</span>
				</div>
				<div>
					<table width="260" cellspacing="1" cellpadding="0">
						<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								style="color: #262626;">控高信息</span></td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;名称：</td>
							<td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;控高面</td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;海拔高度（m）：</td>
							<td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;11111111111111111</td>
						</tr>
						<!--<tr>
                        	<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;X轴：</td>
                        	<td class="bdk2" valign="middle">
                            	<form runat="server">
                                	<input class="sz" id="TextBox3" runat="server" CssClass="mybutton" Text="0">
                                	<input class="jiah" type="button" ID="Button5" value="+" onMouseDown="md2(this)" onMouseOut="mo2(this)" onMouseUp="mo2(this)"   >
                                	<input class="jianh" type="button" ID="Button6" value="-" onMouseDown="md2(this)" onMouseOut="mo2(this)" onMouseUp="mo2(this)"   >
                            	</form>
                        	</td>
                    	</tr>-->
					</table>
					<table width="260" cellspacing="1" cellpadding="0">
						<tr>
							<td class="bdk1" valign="middle" colspan="2">&nbsp;&nbsp;&nbsp;<span
								style="color: #262626;">控高控制</span></td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;重置高度：</td>
							<td class="bdk2" valign="middle">&nbsp;&nbsp;&nbsp;重置</td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;高度调整：</td>
							<td class="bdk2" valign="middle">
								<form runat="server">
									<input class="sz" id="TextBox3" runat="server"
										CssClass="mybutton" Text="0"> <input class="jiah"
										type="button" ID="Button5" value="+" onMouseDown="md2(this)"
										onMouseOut="mo2(this)" onMouseUp="mo2(this)"> <input
										class="jianh" type="button" ID="Button6" value="-"
										onMouseDown="md2(this)" onMouseOut="mo2(this)"
										onMouseUp="mo2(this)">
								</form>
							</td>
						</tr>
						<tr>
							<td class="bdk1" valign="middle">&nbsp;&nbsp;&nbsp;查看：</td>
							<td class="bdk2" valign="middle">&nbsp; <select>
									<option>顶视</option>
									<option>左视</option>
							</select>
							</td>
						</tr>
					</table>
				</div>
				<div class="lb_sm">
					<span style="margin: 20px; display: block; float: left;"> <strong>控高高度（m）</strong><br>
						<br> 调节控高面高度
					</span>
				</div>
				<div class="kgfx_btn">
					<span style="margin-right: 5px;">开始分析</span> <span
						style="margin-right: 5px;">结束分析</span> <span>截图</span>
				</div>
				<div class="kgfx_tl1">
					<ul class="kgfx_menu_tl1_top">图例
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #e8ea18; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>控高线部分</span>
					</ul>
					<ul>
						<span
							style="width: 30px; height: 10px; background: #08dd0b; border: 1px solid #313131; margin-left: 10px; margin-right: 10px; margin-top: 12px;"></span>
						<span>控高面遮挡部</span>
					</ul>
				</div>
			</li>
			<li class="zh_k">
				<!--7标注管理-->
				<div class="kgfx_top">
					<span class="bjgl_fh"
						style="color: #4fa1ff; cursor: pointer; margin-left: 10px;"><
						返回全部</span> <span>—场景管理</span>
				</div>
				<div class="bjgl_menu">
					<div style="background: #f4f4f4;" class="bjgl_menu_qh">
						<span style="margin-left: 10px;" class="bjgl_menu_qh_kgfx">标注管理</span>
						<span>路径管理</span>
					</div>
				</div>
				<div class="gl_menu">
					<div class="bj_menu">
						点击<span style="color: #4fa1ff;">添加标注按钮，</span>在场景选择需要标注地<br>
						方，即可标注。
					</div>
					<div class="tjbz_btn"></div>
					<div style="margin-top: 13px; float: none;" class="kjfx_fg">
						<span><strong>标注列表</strong></span>
					</div>
					<div class="bj_menu_ss">
						<span><input type="text"></span> <span
							class="bj_menu_ss_btn">搜索 </span>
					</div>
					<div class="bzxg_menu">
						<ul class="bzxg_menu_mc">
							名称：
							<u>西湖文化广场</u>
						</ul>
						<ul class="bzxg_menu_mc">类型：
						</ul>
						<ul class="tjbz_mc">
							<span>备注：</span>
							<span style="margin-left: 7px;"> <textarea
									placeholder="我的备注"
									style="width: 210px; height: 54px; outline: none; max-width: 210px; max-height: 54px;"></textarea>
							</span>
						</ul>
						<ul class="bzxg_menu_btn">
							<span>确定</span>
							<span>删除</span>
							<span class="cxqd">重新取点</span>
						</ul>
					</div>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span id="bzxg" class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span id="bzxg" class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span id="bzxg" class="sdsc_bj"></span>
					</ul>
				</div>
				<div class="gl_menu">
					<div class="bj_menu_ss">
						<span><input type="text"></span> <span
							class="bj_menu_ss_btn">搜索 </span>
					</div>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
					<ul class="map_dttc_qxsy" style="margin-top: 10px;">
						<span class="map_dttc_qxsy_xh"> <span class="fh">1</span>
						</span>
						<span>钱江新城</span>
						<span class="sdsc_sc"></span>
						<span class="sdsc_bj"></span>
					</ul>
				</div>
			</li>
		</ul>
		<ul class="btm_right">
			<li class="btm_right_left_dz">
				<ul id="city" class="btm_right_left_hz">
					<span id="mapDefaultName">杭州市</span>
					<span style="margin-top: -2px;"><img
						src="../img/icon-arrow.png"></span>
					<span>></span>
				</ul>
				<ul class="btm_right_left_hz">
					<span class="dz_qy">西湖区</span>
					<span style="margin-top: -2px;"><img
						src="../img/icon-arrow.png"></span>
					<span>></span>
					<div class="area_lb">
						<!-- <span>全部</span> <span>下城区</span> <span>拱墅区</span> <span>江干区</span>
						<span>西湖区</span> <span>滨江区</span> <span>萧山区</span> <span>余杭区</span> -->
					</div>
				</ul>
			</li>
			<div>
				<ul class="Associative">

					<!-- <li class="Associative_top"><span>城市列表</span> <span
						class="Associative_top_gb"></span></li>
					<li class="City_settings"><span>当前城市：杭州市</span> <span
						class="Default_City"><u>设置为默认城市</u></span></li>
					<li class="all_city"><span>不限</span> <span>杭州市</span> <span>南京市</span>
						<span>绍兴市</span> <span>富阳市</span> <span>嘉兴市</span> <span>舟山市</span>
						<span>曲靖市</span><br> <span>F</span> <span>H</span> <span>N</span>
						<span>Q</span> <span>S</span> <span>Z</span> <span>其他</span></li>
					<li class="Alphabet_City">
						<ul class="fy">
							<li style="width: 70px; height: 25px;"><span
								style="font-size: 24px; line-height: 25px; color: #cccccc;"><strong>F</strong></span>
								<span style="margin-left: 5px;"><strong>富阳：</strong></span></li>
							<li class="city_dm"
								style="width: 320px; height: 50px; margin-top: 5px; margin-left: 5px;">
								<span>富春街道</span> <span>东洲街道</span> <span>春江街道</span> <span>鹿山街道</span>
								<span>银湖街道</span> <span>春建乡</span> <span>永昌镇</span> <span>万市镇</span>
								<span>常绿镇</span> <span>龙门镇</span> <span>渔山乡</span>
							</li>
						</ul>
						<ul class="fy">
							<li style="width: 70px; height: 25px;"><span
								style="font-size: 24px; line-height: 25px; color: #cccccc;"><strong>H</strong></span>
								<span style="margin-left: 5px;"><strong>杭州：</strong></span></li>
							<li class="city_dm"
								style="width: 320px; height: 50px; margin-top: 5px; margin-left: 5px;">
								<span>富春街道</span> <span>东洲街道</span> <span>春江街道</span> <span>鹿山街道</span>
								<span>银湖街道</span> <span>春建乡</span> <span>永昌镇</span> <span>万市镇</span>
								<span>常绿镇</span> <span>龙门镇</span> <span>渔山乡</span>
							</li>
						</ul>
					</li> -->

				</ul>
			</div>

			<li class="btm_right_top_left_xy"><span
				class="btm_right_top_left_xy_dx">地形</span>
				<div class="yx_xy">
					<span class="btm_right_top_left_xy_yx">影像</span>
					<ul class="yx_lb">
						<li><img src="../img/ss_dw.png">2016年</li>
						<li><img src="../img/ss_dw.png">2014年8月</li>
						<li><img src="../img/ss_dw.png">2013年4月</li>
						<li><img src="../img/ss_dw.png">2012年</li>
					</ul>
				</div></li>
			<li class="btm_right_top">
				<ul class="btm_right_top_right">
					<li class="btm_right_top_right_esld"></li>
					<span class="btm_right_top_right_line"></span>
					<li class="btm_right_top_right_sxck"></li>
					<span class="btm_right_top_right_line"></span>
					<li class="btm_right_top_right_dxgc"></li>
					<span class="btm_right_top_right_line"></span>
					<li class="btm_right_top_right_jt"></li>
					<span class="btm_right_top_right_line"></span>
					<li class="btm_right_top_right_qc"></li>
					<span class="btm_right_top_right_line"></span>
					<li class="btm_right_top_right_qp"></li>
					<span class="btm_right_top_right_line"></span>
					<li class="btm_right_top_right_qf"></li>
					<span class="btm_right_top_right_line"></span>
					<li class="btm_right_top_right_kjxz"></li>
				</ul>
			</li>
			<div class="map"
				style="width: 100%; height: 100%; background: #D5D5D5;">
				<div class="alltk" id="tjsd">
					<!--添加视点-->
					<div class="sdsc_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>添加视点</strong></span>
							<span id="sdgb" class="sdsc_gb"></span>
						</ul>
						<ul class="sdsc_mc">
							<span>名称：</span>
							<span style="float: right;"><input placeholder="视点名称"
								type="text"></span>
						</ul>
						<ul style="height: 60px;" class="sdsc_mc">
							<span>备注：</span>
							<span style="margin-left: 7px;"> <textarea
									placeholder="我的备注"
									style="float: left; width: 267px; height: 54px; outline: none; max-width: 267px;"></textarea>
							</span>
						</ul>
						<ul id="sd_btn" class="sdsc_tk_btn">
							<span>取消</span>
							<span>保存</span>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div>
				<div id="tjbz" class="alltk">
					<!--添加标注-->
					<div class="sdsc_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>添加视点</strong></span>
							<span id="bzgb" class="sdsc_gb"></span>
						</ul>
						<ul class="sdsc_mc">
							<span>名称：</span>
							<span style="float: right;"><input placeholder="视点名称"
								type="text"></span>
						</ul>
						<ul style="height: 60px;" class="sdsc_mc">
							<span>备注：</span>
							<span style="margin-left: 7px;"> <textarea
									placeholder="我的备注"
									style="float: left; width: 267px; height: 54px; outline: none; max-width: 267px;"></textarea>
							</span>
						</ul>
						<ul id="bz_btn" class="sdsc_tk_btn">
							<span>取消</span>
							<span>保存</span>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div>
				<div id="q_tk" class="alltk">
					<!--区弹窗-->
					<div class="map_ss_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px; font-size: 14px;"><strong>西湖区</strong></span>
							<!--<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>-->
							<span class="qy_gb"></span>
							<span class="ss_tk_sc"></span>
						</ul>
						<ul class="q_xq">
							<li class="q_xq_lb"><span style="width: 55%;">名称：西湖区</span>
								<span style="width: 45%;">人口：50万</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">类型：杭州西</span>
								<span style="width: 45%;">地址：浙江省杭州市</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">面积：2000平方米</span>
							</li>
							<li class="q_xq_lb"><span style="width: 55%;">设施：教育、政府、景点等</span>
							</li>
						</ul>
						<ul class="q_fg_line"></ul>
						<ul class="q_xq_fwss">
							<li class="zbfw"><span class="zbfw_icon"></span> <span
								class="zbfw_text">周边查找</span> <span
								style="width: 1px; height: 10px; background: #dcdcdc; margin-top: 4px; margin-left: 5px; margin-right: 5px;"></span>
								<span class="zbfw_text1">0.5km</span> <span class="zbfw_text1">1km</span>
								<span class="zbfw_text1">2km</span></li>
							<li class="fwss"><span>周边的</span> <span
								style="margin-left: 10px;"><input
									style="padding: 5px; width: 190px; outline: none; border: 1px solid #dcdcdc;"
									type="text"></span> <span class="fwss_btn">搜索</span></li>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div>
				<div id="qxsy_tk" class="alltk">
					<!--倾斜摄影弹窗-->
					<div class="map_ss_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px; font-size: 14px;"><strong>西湖区倾斜摄影</strong></span>
							<!--<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>-->
							<span id="qxsy_gb" class="qy_gb"></span>
							<span class="ss_tk_sc"></span>
						</ul>
						<ul class="q_xq">
							<li class="q_xq_lb"><span style="width: 55%;">名称：杭州西湖影像</span>
								<span style="width: 45%;">单位：浙江科澜</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">面积：300平方米</span>
								<span style="width: 45%;">时间：2016年6月</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
						</ul>
						<ul class="q_fg_line"></ul>
						<ul class="qxsy_menu_diss">
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div>
				<div id="sxcx_tk" class="alltk">
					<!--属性查询弹窗-->
					<div class="map_ss_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px; font-size: 14px;"><strong>嘉文大厦</strong></span>
							<!--<span style="margin-left: 20px;color: #b7b7b7;">详情>></span>-->
							<span id="sxcx_gb" class="qy_gb"></span>
						</ul>
						<ul class="q_xq">
							<li class="q_xq_lb"><span style="width: 55%;">名称：杭州西湖影像</span>
								<span style="width: 45%;">单位：浙江科澜</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">面积：300平方米</span>
								<span style="width: 45%;">时间：2016年6月</span></li>
							<li class="q_xq_lb"><span style="width: 55%;">精细度：高仿真</span>
								<span style="width: 45%;">地址：杭州市西湖区</span></li>
						</ul>
					</div>
					<div class="tk_zsjt"></div>
				</div>
				<div class="jttk">
					<!--截图弹窗-->
					<div class="jt_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>截图</strong></span>
							<span id="jt_gb" class="sdsc_gb"></span>
						</ul>
						<ul style="margin-top: 40px;" class="jt_mc">
							<span>文件名：</span>
							<span><input
								style="width: 350px; border: 1px solid #cccccc;" type="text"></span>
						</ul>
						<ul class="jt_mc">
							<span>储存到：</span>
							<span><input
								style="width: 267px; border: 1px solid #cccccc;" type="text"></span>
							<span class="jt_tk_ll">浏览</span>
						</ul>
						<ul class="jt_tk_btn">
							<span>取消</span>
							<span>确定</span>
						</ul>
					</div>
				</div>
				<div class="kjtk">
					<!--截图弹窗-->
					<div class="kj_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>截图</strong></span>
							<span id="kjxz_gb" class="sdsc_gb"></span>
						</ul>
						<ul
							style="margin: auto; width: 210px; line-height: 20px; font-size: 12px; text-align: center; margin-top: 20px;">
							最新版本3.0 当前版本2.0
							<br> 请更新下载
						</ul>
						<ul class="kj_tk_btn">
							<span>确定</span>
							<span style="float: right;">取消</span>
						</ul>
					</div>
				</div>
				<div style="margin-top: 50px;" class="kjtk">
					<!--截图弹窗-->
					<div class="kj_tk">
						<ul class="sdsc_tk_top">
							<span style="margin-left: 10px;"><strong>截图</strong></span>
							<span class="sdsc_gb"></span>
						</ul>
						<ul
							style="margin: auto; width: 210px; line-height: 20px; font-size: 12px; text-align: center; margin-top: 20px;">
							<span style="color: red;">下载失败</span>
							<br> 请联系管理员 电话：0571-54125895
						</ul>
						<ul class="kj_tk_btn">
							<span>确定</span>
							<span style="float: right;">取消</span>
						</ul>
					</div>
				</div>
			</div>
		</ul>
	</div>
</body>
<script>
	var flag1 = 0;
	var flag2 = 0;

	function NumberInc(tt) {
		if (flag1 == 1 && flag2 == 1) {
			alert("Error!");
		} else {
			if (flag1 == 1) {
				document.getElementById(tt).value++;
				setTimeout("NumberInc('" + tt + "')", 100);
			}
			if (flag2 == 1) {
				document.getElementById(tt).value--;
				setTimeout("NumberInc('" + tt + "')", 100);
			}
		}

	}

	function md2(obj) {
		if (obj.id == "Button5")
			flag1 = 1;
		if (obj.id == "Button6")
			flag2 = 1;
		NumberInc("TextBox3");
	}

	function mo2(obj) {
		if (obj.id == "Button5")
			flag1 = 0;
		if (obj.id == "Button6")
			flag2 = 0;
	}
</script>
</html>












