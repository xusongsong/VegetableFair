var peopleSearchType = 0; // 人房查询类型 0:人员，1:建筑;
var peopleSearchText = ''; // 人房查询输入框内容
var flag = true; // 防止连续点击，true可点击，false不可点击 
var firstClick=false;//统计分析首次点击
//人口统计点击
$(".rkgl_top li").click(function(){
	if($(this).index()==1){
		initTree();
	}else{
		initSickData();
	}
})
	



//人口管理树结构获取
function initTree(){
	if(firstClick)return
	ajax({
        url: "population/inquire/info/tree",
        data: {
            
        },
        successx: function (data) {
            console.log(data)
            firstClick=true;
            if (data.success == '1') {
                if(data.record&&data.record.length>0){
                	createTree(data.record);
                	initChart(0);
                	initChart(2);
                	initChart(4);
                	initChart(6);
                	initChart(8);
                	initChart(10);
                	initChart(12);
                	initChart(14);
                }else{
                	alert('暂无数据')
                }
            } else {
                alert(data.msg)
            }
        },
    })
    
}
//人口管理树结构创建
function createTree(data){
	var temp='';
	$.each(data, function (i, d) {
		temp+='<div class="zjd1" style="margin-left: 20px;width: 244px;">'+
			'<div style="width: 184px;height: 16px;float: left;" data-id="'+d.id+'" class="chooseItem">'+
			'<span class="tree_xl"></span>'+
			'<span style="width: 16px;height: 16px;margin-right: 5px;"><img src="../img/tree_jd2.png"></span>'+
		'<span>'+d.name+'</span>'+
	'</div>'+
//	'<span class="tree_xy"></span>'+
'</div>'+
'<div style="display:none">'
if(d.communityTreeInfoResponses&&d.communityTreeInfoResponses.length>0){
	$.each(d.communityTreeInfoResponses, function (j, f) {
		temp+='<div class="zjd2" style="margin-left: 40px;width: 224px;">'+
				'<div style="width: 204px;height: 16px;float: left;">'+
				'<span style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;"><img src="../img/tree_jd3.png"></span>'+
					'<span>'+f.name+'</span>'+
				'</div>'+
//				'<span class="tree_xy"></span>'+
			'</div>'
	})
}
temp+='</div>'
})
$("#populationTree").html(temp);
	$('.tree_xl').click(function(event){
		$(this).toggleClass('tree_xlclick');
		$(this).parent().parent().next().toggle();
		event.stopPropagation();
	});
	$('.chooseItem').click(function(){
		console.log($(this).attr("data-id"));
		initChart(0,$(this).attr("data-id"));
    	initChart(2,$(this).attr("data-id"));
    	initChart(4,$(this).attr("data-id"));
    	initChart(6,$(this).attr("data-id"));
    	initChart(8,$(this).attr("data-id"));
    	initChart(10,$(this).attr("data-id"));
    	initChart(12,$(this).attr("data-id"));
    	initChart(14,$(this).attr("data-id"));
	})
	
}
$('.k9').click(function(){
	$('.k3,.k4,.k5,.k6,.k7,.k8,.k9_1,.k10').show();
	$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9,.k10_1').hide();
	$(".btm_left_menu .zh_k").hide().eq(3).show();
});

// 查询类型切换
$("#qh span").click(function () {
    peopleSearchType = $(this).index();
    if (peopleSearchType == 0) {
    	$(".rkgl_menu .ghss span input").attr('placeholder','请输入姓名或身份证');
    }else{
    	$(".rkgl_menu .ghss span input").attr('placeholder','请输入楼号');
    }
});
// 人房查询搜索
$("#rfcxBtn").click(function () {
    peopleSearchText = $("#rfcxInput").val();
    if (peopleSearchText == '') {
        alert("请输入搜索内容");
        return
    }
    if (!flag) return;
    flag = false;   
    if (peopleSearchType == 0) {
        ajax({
            url: "population/inquire/info/person",
            data: {
                condition: peopleSearchText
            },
            successx: function (data) {
                console.log(data);
                flag = true;
                if (data.success == '1') {
                    if (data.record&&data.record.length > 0) {
                        createPeopleList(data.record)
                    } else {
                        alert('未搜索到相关数据')
                    }
                } else {
                    alert(data.msg);
                }
            },
        })

        function createPeopleList(data) {
            // 查询人口
            var temp = '';
            $.each(data, function (i, d) {
                var imgurl = '../img/img_index/admin.png';
                if (d.personImageInfo) {
                    imgurl = d.personImageInfo[0].imgurl
                }
                temp += '<div class="rfgl_lb_menu_lb rkDiv" lon="'+d.peopleHourseInfo.lon+'" lat="'+d.peopleHourseInfo.lat+'">' +
                    '<span class="rfgl_lb_menu_lb_dw">' +
                    '<p class="p1">' + (i + 1) + '</p>' +
                    '</span>' +
                    '<span class="rfgl_lb_menu_lb_text">' +
                    '<span>' + d.peopleHourseInfo.name + '</span><span></span>' +
                    '</span>' +
                    '<span class="rfgl_lb_menu_lb_text1">' + d.peopleHourseInfo.addressDetail + '</span>' +
                    '<span class="rfgl_lb_menu_lb_pic1"><img src="' + imgurl + '"></span>' +
                    ' </div>'
            })
            $("#rw").empty().html(temp);
            $("#rw .rkDiv").click(function () {
                var height = 100; // 高程
                var Azimuth = 0; // 旋转角
                var Pitch = -0.5; // 俯仰角
                var range = 500; // 可视距离
                var time = 3; // 延迟时间
                var lon = $(this).attr('lon'); // 经度
                var lat = $(this).attr('lat');; // 纬度
                // 飞行定位
                map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
                setTimeout(function(){
                	 var content = "名称：XX大楼/n高度：20m";
                	 var layer = map3D.createTipLayer();
                	 setTimeout(function(){
                		 console.log(layer)
                		 map3D.tip(layer,lon,lat,height,content); 
                	 },1000)     
                },3000)
            });
        }
    } else {    	
        // 查询建筑
    	ajax({
            url: "population/inquire/info/building",
            data: {
                condition: $("#rfcxInput").val(),
            },
            successx: function (data) {
                console.log(data);
                flag = true;
                if (data.success == '1') {
                    if (data.record&&data.record.length > 0) {
                        createBuildingList(data.record)
                    } else {
                        alert('未搜索到相关数据')
                    }
                } else {
                    alert(data.msg);
                }
            },
        });
    	function createBuildingList(data){
    		var temp = '';
            $.each(data, function (i, d) {
            	var imgurl = '../img/img_index/admin.png';
                if (d.personImageInfo) {
                    imgurl = d.personImageInfo[0].imgurl
                }
                temp += '<div class="rfgl_lb_menu_lb jzDiv" lon="'+d.snameHourseInfo.lon+'" lat="'+d.snameHourseInfo.lat+'">' +
                    '<span class="rfgl_lb_menu_lb_dw">' +
                    '<p class="p1">' + (i+1) + '</p>' +
                    '</span>' +
                    '<span class="rfgl_lb_menu_lb_text">' +
                    '<span>' + d.snameHourseInfo.name + '</span>' +
                    '</span>' +
                    '<span class="rfgl_lb_menu_lb_text1">' + d.snameHourseInfo.addressDetail + '</span>' +
                    '<span class="rfgl_lb_menu_lb_pic1" style="width:58px;"><img src="' + imgurl + '"></span>' +
                    ' </div>'
            })
            $("#jz").empty().html(temp);
            $("#jz .jzDiv").click(function () {
                var height = 100; // 高程
                var Azimuth = 0; // 旋转角
                var Pitch = -0.5; // 俯仰角
                var range = 500; // 可视距离
                var time = 3; // 延迟时间
                var lon = $(this).attr('lon'); // 经度
                var lat = $(this).attr('lat'); // 纬度
                // 飞行定位
                map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
                setTimeout(function(){
                	 var content = "名称：XX大楼/n高度：20m";
                	 var layer = map3D.createTipLayer();
                	 setTimeout(function(){
                		 console.log(layer)
                		 map3D.tip(layer,lon,lat,height,content); 
                	 },1000)     
                },3000)
            });
    	}
        

    }
});

//
$(".tjfx_menu").click(function () {
    // 统计分析图标展开
    var index = $(this).index();
})
// 人口统计图标
function initChart(index,id) {
    var myChart = echarts.init($('.population_chart')[index / 2]);
    if (index == 0) {
        // 总人口图表
      	 ajax({
               url: "population/statistics/communityGenraalInfo",
               data:{},
               successx: function (data) {
                   console.log(data);
                   if (data.success == '1') {
                  	 if(data.record&&data.record.length>0){
                  		createGenraalInfo(data.record,index)
                  	 }else{
                  		 alert('暂无数据')
                  	 }
                   } else {
                       alert(data.msg);
                   }
               },
           })
 function createGenraalInfo(data){
    	var nameList=[];
    	var valueList=[];
    	$.each(data, function (i, d) {
    		nameList.push(d.sname2);
    		valueList.push(d.count)
    	})
    	nameList.reverse();
    	valueList.reverse();
        var option = {
            title: {
                text: '总人口统计',
                textStyle: {
                    color: '#000'
                },
                top: 10,
                show: false
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: 0,
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                show: false
            },
            yAxis: {
                axisLine: {
                    lineStyle: {
                        color: 'black'
                    }
                },
                type: 'category',
                data: nameList
            },
            series: [{
                name: '',
                type: 'bar',
                data: valueList,
                itemStyle: {
                    normal: {

                    }
                }
            }]
        };
        myChart.setOption(option);
  	 }
    } else if(index==2){
    	// 男女比例
    	 ajax({
             url: "population/statistics/sex",
             data:{},
             successx: function (data) {
                 console.log(data);
                 if (data.success == '1') {
                	 if(data.record&&data.record.statisticsSexVOs.length>0){
                		 createSex(data.record)
                	 }else{
                		 alert('暂无数据')
                	 }
                 } else {
                     alert(data.msg);
                 }
             },
         })
         function createSex(data){
    		 var temp='';
    		 temp+='<tr>'+
					'<td align="center" style="background: #e9eaec;" width="25%">单元</td>'+
					'<td align="center" style="background: #e9eaec;" width="25%">男</td>'+
					'<td align="center" style="background: #e9eaec;" width="25%">女</td>'+
					'<td align="center" style="background: #e9eaec;" width="25%">合计</td>'+
				'</tr>'
    		 $.each(data.statisticsSexVOs, function (i, d) {
    			 temp+='<tr>'+
						'<td align="center" style="background: #f0f3f4;">'+d.buildingName+'</td>'+
						'<td align="center">'+d.men+'</td>'+
						'<td align="center">'+d.women+'</td>'+
						'<td align="center">'+d.peopleCount+'</td>'+
					'</tr>'
    		 })
    		 temp+='<tr>'+
				'<td align="center" style="background: #f0f3f4;">累计</td>'+
				'<td align="center">'+data.sexSum.menSum+'</td>'+
				'<td align="center">'+data.sexSum.womenSum+'</td>'+
				'<td align="center">'+data.sexSum.allSum+'</td>'+
			'</tr>';
    		 $(".tjfx_next_menu").eq(index/2).find('table').html(temp);
    		 createPie(index)
    		
    	 }
    }else if(index==4){
    	// 户籍比例
    	 ajax({
             url: "population/statistics/census",
             data:{},
             successx: function (data) {
                 console.log(data);
                 if (data.success == '1') {
                	 if(data.record&&data.record.statisticsCensusVOs.length>0){
                		 createCensus(data.record)
                	 }else{
                		 alert('暂无数据')
                	 }
                 } else {
                     alert(data.msg);
                 }
             },
         })
         function createCensus(data){
    		 var temp='';
    		 temp+='<tr>'+
					'<td align="center" style="background: #e9eaec;" width="25%">单元</td>'+
				    '<td align="center" style="background: #e9eaec;" width="25%">本地</td>'+
				    '<td align="center" style="background: #e9eaec;" width="25%">流动</td>'+
				    '<td align="center" style="background: #e9eaec;" width="25%">合计</td>'+
				   '</tr>'
    		 $.each(data.statisticsCensusVOs, function (i, d) {
    			 temp+='<tr>'+
						'<td align="center" style="background: #f0f3f4;">'+d.buildingName+'</td>'+
						'<td align="center">'+d.nativePeople+'</td>'+
						'<td align="center">'+d.outlandPeople+'</td>'+
						'<td align="center">'+d.peopleCount+'</td>'+
					'</tr>'
    		 })
    		 temp+='<tr>'+
				'<td align="center" style="background: #f0f3f4;">累计</td>'+
				'<td align="center">'+data.censusSum.nativeSum+'</td>'+
				'<td align="center">'+data.censusSum.outLanderSum+'</td>'+
				'<td align="center">'+data.censusSum.censusAllSum+'</td>'+
			'</tr>';
    		 $(".tjfx_next_menu").eq(index/2).find('table').html(temp);
    		 createPie(index)
    		
    	 }
    }else if(index==6){
    	// 健康状况比例
    	 ajax({
             url: "population/statistics/health",
             data:{},
             successx: function (data) {
                 console.log(data);
                 if (data.success == '1') {
                	 if(data.record&&data.record.statisticsHealthVOs.length>0){
                		 createHealth(data.record)
                	 }else{
                		 alert('暂无数据')
                	 }
                 } else {
                     alert(data.msg);
                 }
             },
         })
         function createHealth(data){
    		 var temp='';
    		  temp+='<tr>'+
				'<td align="center" style="background: #e9eaec;">单元</td>'
    		 
    		 $.each(data.healthItems, function (i, d) {
    			 temp+='<td align="center" style="background: #e9eaec;">'+d+'</td>'
    		 })
    		 temp+='<td align="center" style="background: #e9eaec;">合计</td></tr>'
    		 $.each(data.statisticsHealthVOs, function (i, d) {
    			 temp+='<tr>'+
						'<td align="center" style="background: #f0f3f4;">'+d.buildingName+'</td>'+
						'<td align="center">'+d.health+'</td>'+
						'<td align="center">'+d.slowHealth+'</td>'+
						'<td align="center">'+d.weigthHealth+'</td>'+
						'<td align="center">'+d.badHealth+'</td>'+
						'<td align="center">'+d.othersHealth+'</td>'+
						'<td align="center">'+d.allHealth+'</td>'+
					'</tr>'
    		 })
    		 temp+='<tr>'+
				'<td align="center" style="background: #f0f3f4;">累计</td>'+
				'<td align="center">'+data.healthLinkedSum.healthSum+'</td>'+
				'<td align="center">'+data.healthLinkedSum.slowHealthSum+'</td>'+
				'<td align="center">'+data.healthLinkedSum.weightHealthSum+'</td>'+
				'<td align="center">'+data.healthLinkedSum.badHealthSum+'</td>'+
				'<td align="center">'+data.healthLinkedSum.othersHealthSum+'</td>'+
				'<td align="center">'+data.healthLinkedSum.allSum+'</td>'+
			'</tr>';
    		 $(".tjfx_next_menu").eq(index/2).find('table').html(temp);
    		 createPie(index)
    		
    	 }
    }else if(index==8){
    	// 健康状况比例
   	 ajax({
            url: "population/statistics/marital",
            data:{},
            successx: function (data) {
                console.log(data);
                if (data.success == '1') {
               	 if(data.record&&data.record.statisticsMaritalVOs.length>0){
               		 createMarital(data.record)
               	 }else{
               		 alert('暂无数据')
               	 }
                } else {
                    alert(data.msg);
                }
            },
        })
        function createMarital(data){
   		 var temp='';
   		  temp+='<tr>'+
				'<td align="center" style="background: #e9eaec;">单元</td>'
   		 
   		 $.each(data.maritalItems, function (i, d) {
   			 temp+='<td align="center" style="background: #e9eaec;">'+d+'</td>'
   		 })
   		 temp+='<td align="center" style="background: #e9eaec;">合计</td></tr>'
   		 $.each(data.statisticsMaritalVOs, function (i, d) {
   			 temp+='<tr>'+
						'<td align="center" style="background: #f0f3f4;">'+d.buildingName+'</td>'+
						'<td align="center">'+d.widowed+'</td>'+
						'<td align="center">'+d.divorced+'</td>'+
						'<td align="center">'+d.wedding+'</td>'+
						'<td align="center">'+d.firstMarriage+'</td>'+
						'<td align="center">'+d.unMarried+'</td>'+
						'<td align="center">'+d.allMarital+'</td>'+
					'</tr>'
   		 })
   		 temp+='<tr>'+
				'<td align="center" style="background: #f0f3f4;">累计</td>'+
				'<td align="center">'+data.maritalSum.widowedSum+'</td>'+
				'<td align="center">'+data.maritalSum.divorcedSum+'</td>'+
				'<td align="center">'+data.maritalSum.weddingSum+'</td>'+
				'<td align="center">'+data.maritalSum.firstMarriageSum+'</td>'+
				'<td align="center">'+data.maritalSum.unMarriedSum+'</td>'+
				'<td align="center">'+data.maritalSum.allSum+'</td>'+
			'</tr>';
   		 $(".tjfx_next_menu").eq(index/2).find('table').html(temp);
   		 createPie(index)
   		
   	 }
    }else if(index==10){
    	//教育程度比例
    	ajax({
            url: "population/statistics/education",
            data:{},
            successx: function (data) {
                console.log(data);
                if (data.success == '1') {
               	 if(data.record&&data.record.statisticsEducationVOs.length>0){
               		 createEducation(data.record)
               	 }else{
               		 alert('暂无数据')
               	 }
                } else {
                    alert(data.msg);
                }
            },
        })
        function createEducation(data){
   		 var temp='';
   		  temp+='<tr>'+
				'<td align="center" style="background: #e9eaec;">单元</td>'
   		 
   		 $.each(data.educationItems, function (i, d) {
   			 temp+='<td align="center" style="background: #e9eaec;">'+d+'</td>'
   		 })
   		 temp+='<td align="center" style="background: #e9eaec;">合计</td></tr>'
   		 $.each(data.statisticsEducationVOs, function (i, d) {
   			 temp+='<tr>'+
						'<td align="center" style="background: #f0f3f4;">'+d.buildingName+'</td>'+
						'<td align="center">'+d.postgraduate+'</td>'+
						'<td align="center">'+d.undergraduate +'</td>'+
						'<td align="center">'+d.junior+'</td>'+
						'<td align="center">'+d.secondary+'</td>'+
						'<td align="center">'+d.highSchool+'</td>'+
						'<td align="center">'+d.middleSchool+'</td>'+
						'<td align="center">'+d.primarySchool+'</td>'+
						'<td align="center">'+d.kindergarten+'</td>'+
						'<td align="center">'+d.illiteracy+'</td>'+
						'<td align="center">'+d.allEducation+'</td>'+
					'</tr>'
   		 })
   		 temp+='<tr>'+
				'<td align="center" style="background: #f0f3f4;">累计</td>'+
				'<td align="center">'+data.educationSum.postgraduateSum+'</td>'+
				'<td align="center">'+data.educationSum.undergraduateSum+'</td>'+
				'<td align="center">'+data.educationSum.juniorSum+'</td>'+
				'<td align="center">'+data.educationSum.secondarySum+'</td>'+
				'<td align="center">'+data.educationSum.highSchoolSum+'</td>'+
				'<td align="center">'+data.educationSum.middleSchoolSum+'</td>'+
				'<td align="center">'+data.educationSum.primarySchoolSum+'</td>'+
				'<td align="center">'+data.educationSum.kindergartenSum+'</td>'+
				'<td align="center">'+data.educationSum.illiteracySum+'</td>'+
				'<td align="center">'+data.educationSum.allSum+'</td>'+
			'</tr>';
   		 $(".tjfx_next_menu").eq(index/2).find('table').html(temp);
   		 createPie(index)
   		
   	 }
    }else if(index==12){
    	//政治面貌比例
    	ajax({
            url: "population/statistics/political",
            data:{},
            successx: function (data) {
                console.log(data);
                if (data.success == '1') {
               	 if(data.record&&data.record.statisticsPoliticalVOs.length>0){
               		 createPolitical(data.record)
               	 }else{
               		 alert('暂无数据')
               	 }
                } else {
                    alert(data.msg);
                }
            },
        })
        function createPolitical(data){
   		 var temp='';
   		  temp+='<tr>'+
				'<td align="center" style="background: #e9eaec;">单元</td>'
   		 
   		 $.each(data.politicalItems, function (i, d) {
   			 temp+='<td align="center" style="background: #e9eaec;">'+d+'</td>'
   		 })
   		 temp+='<td align="center" style="background: #e9eaec;">合计</td></tr>'
   		 $.each(data.statisticsPoliticalVOs, function (i, d) {
   			 temp+='<tr>'+
						'<td align="center" style="background: #f0f3f4;">'+d.buildingName+'</td>'+
						'<td align="center">'+d.crowd+'</td>'+
						'<td align="center">'+d.partyMember+'</td>'+
						'<td align="center">'+d.groupMember+'</td>'+
						'<td align="center">'+d.others+'</td>'+
						'<td align="center">'+d.allPolitical+'</td>'+
					'</tr>'
   		 })
   		 temp+='<tr>'+
				'<td align="center" style="background: #f0f3f4;">累计</td>'+
				'<td align="center">'+data.politicalSum.crowdSum+'</td>'+
				'<td align="center">'+data.politicalSum.partyMemberSum+'</td>'+
				'<td align="center">'+data.politicalSum.groupMemberSum+'</td>'+
				'<td align="center">'+data.politicalSum.othersSum+'</td>'+
				'<td align="center">'+data.politicalSum.allSum+'</td>'+
			'</tr>';
   		 $(".tjfx_next_menu").eq(index/2).find('table').html(temp);
   		 createPie(index)
   		
   	 }
    }else if(index==14){
    	//年龄分布比例
    	ajax({
            url: "population/statistics/age",
            data:{},
            successx: function (data) {
                console.log(data);
                if (data.success == '1') {
               	 if(data.record&&data.record.statisticsAgeVOs.length>0){
               		 createAge(data.record)
               	 }else{
               		 alert('暂无数据')
               	 }
                } else {
                    alert(data.msg);
                }
            },
        })
        function createAge(data){
   		 var temp='';
   		  temp+='<tr>'+
				'<td align="center" style="background: #e9eaec;">单元</td>'
   		 
   		 $.each(data.ageItems, function (i, d) {
   			 temp+='<td align="center" style="background: #e9eaec;">'+d+'</td>'
   		 })
   		 temp+='<td align="center" style="background: #e9eaec;">合计</td></tr>'
   		 $.each(data.statisticsAgeVOs, function (i, d) {
   			 temp+='<tr>'+
						'<td align="center" style="background: #f0f3f4;">'+d.buildingName+'</td>'+
						'<td align="center">'+d.ten+'</td>'+
						'<td align="center">'+d.twenty+'</td>'+
						'<td align="center">'+d.thirty+'</td>'+
						'<td align="center">'+d.forty+'</td>'+
						'<td align="center">'+d.fifty+'</td>'+
						'<td align="center">'+d.moreFifty+'</td>'+
						'<td align="center">'+d.ageCount+'</td>'+
					'</tr>'
   		 })
   		 temp+='<tr>'+
				'<td align="center" style="background: #f0f3f4;">累计</td>'+
				'<td align="center">'+data.ageSum.tenSum+'</td>'+
				'<td align="center">'+data.ageSum.twentySum+'</td>'+
				'<td align="center">'+data.ageSum.thirtySum+'</td>'+
				'<td align="center">'+data.ageSum.fortySum+'</td>'+
				'<td align="center">'+data.ageSum.fiftySum+'</td>'+
				'<td align="center">'+data.ageSum.moreFiftySum+'</td>'+
				'<td align="center">'+data.ageSum.allSum+'</td>'+
			'</tr>';
   		 $(".tjfx_next_menu").eq(index/2).find('table').html(temp);
   		 createPie(index)
    	}	
    }
//    else{
//    	createPie(index)
//    }
    // 生成饼图
    function createPie(index){
    	var ItemNameArr=[];
	    	var ItemArr = [];
	    	var ItemNameArrLength=$(".tjfx_next_menu").eq(index / 2).find('tr').eq(0).find('td').length;
	    	$.each($(".tjfx_next_menu").eq(index / 2).find('tr').eq(0).find('td'), function (i, d) {
	    		if(ItemNameArrLength-1>i&&i>0)ItemNameArr.push($(d).text());
	    	})
			$.each($(".tjfx_next_menu").eq(index / 2).find('tr').last().find('td'), function (i, d) {
	    		if(ItemNameArrLength-1>i&&i>0)ItemArr.push({value:$(d).text(),name:ItemNameArr[i-1]})
	    	})
	    	
	        // 人口饼表
	        var option = {
	            title: {
	                show: false
	            },
	            tooltip: {
	                trigger: 'item',
	                formatter: "{a} <br/>{b}: {c} ({d}%)"
	            },
	            legend: {
	                orient: 'vertical',
	                x: 'right',
	                data:ItemNameArr,
	                top:'3%',
	                right:'3%',
	            },
	            grid: {
	                top: 0,
	                left: '3%',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true
	            },
	            series: [{
	                name: '人口统计',
	                type: 'pie',
	                center:['35%','60%'],
	                radius: ['40%', '60%'],
	                avoidLabelOverlap: false,
	                label: {
	                    normal: {
	                        show: false,
	                        position: 'center'
	                    },
	                    emphasis: {
	                        show: true,
	                        textStyle: {
	                            fontSize: '30',
	                            fontWeight: 'bold'
	                        }
	                    }
	                },
	                labelLine: {
	                    normal: {
	                        show: false
	                    }
	                },
	                data: ItemArr
	            }]
	        };
	    	 myChart.setOption(option);
    }  	 	
   
}

　$(".jkgl_menu").find('select').change(function(){
		initSickData()
　}) 
var sickType='1';//疾病类型 1:高血压 ,2:糖尿病
//获取疾病图标 
function initSickData(){
	   sickType=$(".jkgl_menu").find('select').val();
	   ajax({
        url: "population/health/statistics",
        data:{queryFlag:sickType},
        successx: function (data) {
            console.log(data);
            if (data.success == '1') {
	           	 if(data.record.nameValuedSingleInfos&&data.record.nameValuedSingleInfos.length>0){
	           		initSickBar(data.record.nameValuedSingleInfos);  
	           		initSickLine(data.record.lineChatResponse)
	           	 }
           	else{
           		 alert('暂无数据')	
           	 }
            } else {
                alert(data.msg);
            }
        },
    })	   
	   
} 

//疾病数据柱状图

function initSickBar(data){
	var myChart = echarts.init(document.getElementById('sickBarChart'));
  	var nameList=[];
	var valueList=[];
	$.each(data, function (i, d) {
		nameList.push(d.name);
		valueList.push(d.value)
	})
	nameList.reverse();
	valueList.reverse();
    var option = {
        title: {
            text: '总人口统计',
            textStyle: {
                color: '#000'
            },
            top: 10,
            show: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 0,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            show: false
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: 'black'
                }
            },
            type: 'category',
            data: nameList
        },
        series: [{
            name: '',
            type: 'bar',
            data: valueList           
        }]
    };
    myChart.setOption(option);
	
}

//健康数据折线图
function initSickLine(data){
	var myChart = echarts.init(document.getElementById('sickLineChart'));
	var series=[];
	var seriesItem={};
	var nameList=[];
	$.each(data.dataArrays, function (i, d) {
		seriesItem={name:d.name,type:'line',data:d.datas};
		series.push(seriesItem);
		nameList.push(d.name)
	})
	option = {
		tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data:nameList
	    },
		grid:{
			left:'3%',
	        right:'0%',
	        bottom:'0%',
	        width:'90%',
			containLabel:true
		},
		xAxis: {
	        type: 'category',
	        boundaryGap:false,
	        data:data.years, 
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series:series
	}
	 myChart.setOption(option);
}

$("#jkglss_btn").click(function(){
	
	if($("#jkglInput").val()==''){
		alert('请输入搜索内容');
		return;
	}
	if (!flag) return;
    flag = false;
    //健康管理查询
    ajax({
        url: "population/health/person",
        data: {
            condition:$("#jkglInput").val()
        },
        successx: function (data) {
            console.log(data);
            flag = true;
            if (data.success == '1') {
                if (data.record) {
                    $("#rhp").text("高压:"+data.record.rhp);
                    $("#rlp").text("低压:"+data.record.rlp);
                    $("#rhr").text("心率:"+data.record.rhr);
                    $("#rbs").text("血糖:"+data.record.rhp);
                    var imgurl = '../img/img_index/admin.png';
                    if (data.record.imgurl) {
                        imgurl = data.record.imgurl
                    }
                    $(".jkgl_ss_menu_pic img").attr('src',imgurl);
                    $("#jkgl_ss_menu_name").text("姓名:"+data.record.name);
                    $("#jkgl_ss_menu_sex").text("性别:"+data.record.sex);
                    $("#jkgl_ss_menu_age").text("年龄:"+data.record.age);
                    $("#jkgl_ss_menu_tel").text("电话:"+data.record.tel);
                } else {
                    alert('未搜索到相关数据')
                }

            } else {
                alert(data.msg);
            }
        },
    })
})
