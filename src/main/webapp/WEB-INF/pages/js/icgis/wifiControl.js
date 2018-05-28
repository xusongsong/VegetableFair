/**
 * Created by yangmumu on 2018/3/15.
 */
//是否初次加载门禁监控列表
var firstWifiFlag = true;
//门禁层级列表对象
var wifiKeyLevel = [];
//门禁设备模型要素组
var wifiArrayLayer = [];
//门禁设备模型图层
var wifiLayer = null;
//门禁设备模型图层组
var wifiLayers = [];
//wifi设备信息存储
var wifiInfo = [];
//wifi模型拾取
var wifiPickLayer = '';
//wifi模型高度
var wifiHeight = videoHeight;
//当前点击wifi设备编号
var wifiNum = null;
//门禁记录开始时间
var wifiStartTime = null;
//门禁记录结束截至时间
var wifiEndTime = null;
//设置每页数目数


$(".kgsj_top li").click(function(){
    var n = $(this).index();
    switch(n)
    {
        case 0 :
            //开启视频监控列表
            getVideoList();
            break;
        case 1 :
            //开启门禁列表
            getLockList();
            break;
        case 2 :
            getClimbList();
            break;
        case 3 :
            getWifiList();
            break;
        default :
            break;
    }
    $("#climbListFrame").css("display","none");
    $("#wifiListFrame").css("display","none");
    $("#lockListFrame").css("display","none");
    $(".afgl_menu .xxmenu").hide().eq(n).show();

});

//获取wifi监控列表
function getWifiList(){
    //清空搜索栏信息
    $("#wifiSearch").val('');
    //初次加载wifi列表一次
    if(firstWifiFlag){
        var url = "http://192.168.42.65:8080/jites-om/security/wifi/info";
        var data = {
            UUID : '660f3afb-0abb-4254-8cc7-f866e36293ad'
        };
        ajax({
            url:'security/wifi/info',
            data:data,
            type:"get",
            success:function(data){
                if(data.success == '1'){
                    //获取wifi列表信息
                    var data = data.record;
                    console.log(data);
                    var wifiList = createWifiTreeList(data);
                    //挂载视频监控列表
                    $("#wifiList").html(wifiList);
                    //重新绑定事件
                    addWifiEvent();
                }
            },
            error:function(e){

            }
        });
        //加载门禁状态列表
        wifiStateList(1);
        //初始化创建门禁模型图层
        createWifiModel();
        //初始化点击门禁设备信息
        firstWifiFlag = false;
    }
    //初始化拾取图层
    wifiPickLayer = "";
    //开启门禁拾取事件
//    lockPickUp();
}
/**
 * 重新生成列表后添加事件
 */
function addWifiEvent(){
    $('.zjdWifi').next().hide();
    $('.zjdWifi1').next().hide();
    $('.zjdWifi').find('div').click(function(){
        $(this).parent('div').next().toggle();
    });
    $('.zjdWifi1').find('div').click(function(){
        $(this).parent('div').next().toggle();
    });
    $('.zjdWifi').find('div').click(function(){
        $(this).children('.tree_xl_wifi').toggleClass('tree_xlclick_wifi');
    });
    $('.zjdWifi1').find('div').click(function(){
        $(this).children('.tree_xl_wifi').toggleClass('tree_xlclick_wifi');
    });
    $('.tree_xy_wifi').click(function(){
        $(this).toggleClass('tree_xyclick');
    });
    $('.zjdWifi2 div .gm_wifi').click(function(){
        $('.zjdWifi2 div .gm_wifi').removeClass('gmclick_wifi');
        $(this).addClass('gmclick_wifi');
    });
}

/**
 * 生成第一层级wifi列表
 * @param  data
 * @return wifiList
 */
function createWifiTreeList(data){
    //获取结果集列表
    getWifiLevel(data);
    var firstWifiLevel = wifiKeyLevel[1];
    var name = firstWifiLevel[0].name;
    var id =  firstWifiLevel[0].id;
    var wifiList = '';
    wifiList += '<div class="zjdWifi">';
    wifiList += '<div >';
    wifiList +=	'<span class="tree_xl_wifi"></span>';
    wifiList +=	'<span class="pic"><img src="../img/tree_jd1.png"></span>';
    wifiList +=	'<span>' + name + '</span>';
    wifiList += '</div>';
    wifiList += '<span class="tree_xy_wifi"  id = "xy_' + id + '" value = "1" onclick = "wifiShowOrHideFir(\'' + id + '\')"></span>';
    wifiList += '</div>';
    wifiList += createWifiSecList(id);
    return wifiList;
}

/**
 * 生成第二层级wifi列表
 * @param  parentId
 * @return wifiList
 */
function createWifiSecList(){
    var secondLockLevel = wifiKeyLevel[2];
    var wifiList = '';
    wifiList += '<div class = "treeSearch">';
    for(var i = 0; i < secondLockLevel.length; i++){
        var secondLockObj = secondLockLevel[i];
        var name = secondLockObj.name;
        var id = secondLockObj.id;

            wifiList += '<div class="zjdWifi1">';
            wifiList += '<div style="width: 184px;height: 16px;float: left;">';
            wifiList +=	'<span class="tree_xl_wifi"></span>';
            wifiList +=	'<span class="pic"><img src="../img/tree_jd1.png"></span>';
            wifiList +=	'<span>' + name + '</span>';
            wifiList += '</div>';
            wifiList += '<span class="tree_xy_wifi" name="' + secondLockObj.parentId + '_video" id = "xy_' + id + '" value = "1" onclick = "wifiShowOrHideSec(\'' + id + '\')"></span>';
            wifiList += '</div>';
            wifiList += createWifiThirList(id);

    }
    wifiList += '</div>';
    return wifiList;
}

/**
 * 生成第三层级wifi列表
 * @param  parentId
 * @return wifiList
 */
function createWifiThirList(){
    var thirdLockLevel = wifiKeyLevel[3];
    var wifiList = '';
    wifiList += '<div class = "treeSearch">';
    for(var i = 0; i < thirdLockLevel.length; i++){
        var thirdLockObj = thirdLockLevel[i];
        var name = thirdLockObj.name;
        var id = thirdLockObj.id;
        var lon = thirdLockObj.longitude;
        var lat = thirdLockObj.latitude;
        wifiInfo.push(thirdLockObj);
        // if(thirdLockObj.parentId == parentId){
            wifiList += '<div class="zjdWifi2">';
            wifiList += '<div onclick = "wifiLogPosition(' + lon + ',' + lat + ',\'' + id + '\');">';
            wifiList +=	'<span class="pic"><img src="../img/tree_jd3.png" style = "filter:alpha(opacity=90);"></span>';
            wifiList +=	'<span name="gm_wifi" value = "0" class = "gm_wifi" style = "width:174px;" id = "' + id + '">' + name + '</span>';
            wifiList += '</div>';
            wifiList += '<span class="tree_xy_wifi" name="' + thirdLockObj.parentId + '_video" id = "xy_' + id + '" value = "1" onclick = "singleLockFeature(\'' + id + '\')"></span>';
            wifiList += '</div>';
        // }
    }
    wifiList += '</div>';
    return wifiList;
}

/**
 * 处理wifi返回结果集合
 * @param data
 */
function getWifiLevel(data){
    //第一层级门禁列表(村名称)
    var firstWifiLevel = [];
    //第二层级门禁列表(自定义wifi设备层级)
    var secondWifiLevel = [];
    //第三层级门禁列表(单元)
    var thirdWifiLevel = [];
    for(var i = 0; i < data.length; i ++){
        var data = data[i];
        //处理第一层级结果集
        var firstLockObj = {};
        firstLockObj.id = data.id;
        firstLockObj.name = data.name;
        firstLockObj.children = data.children;
        firstWifiLevel.push(firstLockObj);
        //处理第二层级(自定义层级)
        for(var j = 0; j < firstLockObj.children.length; j++){
            var secondLockObj = {};
            var lockArray = firstLockObj.children[j];
            secondLockObj.id = lockArray.id;
            secondLockObj.name = lockArray.name;
            secondLockObj.longitude = lockArray.longitude;
            secondLockObj.latitude = lockArray.latitude;
            // secondLockObj.parentId = secondLockObj.id;
            secondWifiLevel.push(secondLockObj);
            var secondArray=lockArray.children;
            //处理第三层级(单元楼)
            for(var k=0;k<secondArray.length;k++){
                var thirdLockObj={};
                thirdLockObj.id = secondArray[k].id;
                thirdLockObj.name = secondArray[k].name;
                thirdLockObj.longitude = secondArray[k].longitude;
                thirdLockObj.latitude = secondArray[k].latitude;
                // thirdLockObj.parentId = secondArray.id;
                thirdWifiLevel.push(thirdLockObj);
            }
        }
    }
    wifiKeyLevel[1] = firstWifiLevel;
    wifiKeyLevel[2] = secondWifiLevel;
    wifiKeyLevel[3] = thirdWifiLevel;
}

/**
 * 防攀爬监控第一层级
 * @param key
 */
function wifiShowOrHideFir(key){
    //获取当前节点显隐状态
    var isAll = $("#xy_"+key).val();
    var secondLockLevel = wifiKeyLevel[2];
    for(var i = 0; i < secondLockLevel.length; i++){
        var level = secondLockLevel[i];
        var id = level.id;
        var value = $("#xy_"+id).val();
        if(level.parentId = key){
            if(isAll == '0'){//若已经显示则隐藏
                $("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
                $("#xy_" + key).val("1");
                if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
                    wifiShowOrHideSec(id);
                }
            }else {
                $("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
                $("#xy_" + key).val("0");
                if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
                    wifiShowOrHideSec(id);
                }
            }
        }
    }
    //子页面iframe样式变化
    $("#videoFourDialog").contents().find("#wf").toggleClass("mjclick");
}

/**
 * 门禁监控第二层级(门禁设备)
 * @param key
 */
function wifiShowOrHideSec(key){
    //获取当前节点显隐状态
    var isAll = $("#xy_"+key).val();
    var thirdLockLevel = wifiKeyLevel[3];
    for(var i = 0; i < thirdLockLevel.length; i++){
        var level = thirdLockLevel[i];
        var id = level.id;
        var value = $("#xy_"+id).val();
        if(level.parentId = key){
            if(isAll == '0'){//若已经显示则隐藏
                $("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
                $("#xy_" + key).val("1");
                if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
                    singleLockFeature(id);
                }
            }else {
                $("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
                $("#xy_" + key).val("0");
                if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
                    singleLockFeature(id);
                }
            }
        }
    }
}

/**
 * 模糊查询门禁信息
 */
function wifiSearch(){
    //查询之前恢复原先状态
    $(".gm_wifi").css("color","#666666");
    //获取模糊查询对象
    var thirdLockLevel = wifiKeyLevel[3];
    //模糊查询匹配数组
    var wifiSearchArray = [];
    //获取搜索关键字
    var keyWord = $.trim($("#wifiSearch").val());
    //若搜索关键字不为空
    if(keyWord != '' && keyWord != null){
        //获取正则对象
        var reg = new RegExp(keyWord);
        for(var i = 0; i < thirdLockLevel.length; i++){
            var name = thirdLockLevel[i].name;
            var id = thirdLockLevel[i].id;
            if(name.match(reg)){
                wifiSearchArray.push(id);
            }
        }
    }
    //循环数组改变颜色样式
    for(var j = 0; j < wifiSearchArray.length; j++){
        var id = wifiSearchArray[j];
        $("#"+id).css("color","#DD313A");
        //获取所查询设备上几级.zjd1元素标签集合
        var zjdLabels = $("#"+id).parents('.treeSearch').prev();
        //遍历所有zjd1进行展开
        for(var t =0; t < zjdLabels.length; t++ ){
            var zjdLabel = zjdLabels.eq(t).find('div');
            //若已经展开则不再展开
            if(!(zjdLabel.children('.tree_xl_wifi').hasClass('tree_xlclick_wifi'))){
                zjdLabel.click();
            }
        }
    }
    //清空视频监控和数组
    wifiSearchArray = [];
    //若未打开第一层级则执行点击事件
    if(!($('.zjdLock').find('div').children('.tree_xl_wifi').hasClass('tree_xlclick_wifi'))){
        $('.zjdLock').find('div').click();
    }
}

/**
 * wifi设备飞行定位
 * @param lon
 * @param lat
 */
function flyWifiPosition(lon,lat){
    //获取飞行定位坐标
    var height = 15;
    var Azimuth = 0.27271596188962;
    var Pitch = -0.5019505534844149;
    var range = 10.6002366997493;
    var time = 3;
    // 飞行定位
    map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
}

/**
 * 飞行定位wifi并生成记录列表
 * @param lon
 * @param lat
 * @param id
 * @returns
 */
function wifiLogPosition(lon,lat,id){
    flyWifiPosition(lon,lat);
    wifiNum = id;
    //获取前一天时间
    //startTime = showTime(-1);
    wifiStartTime = "2017-12-06";
    //获取当前时间
    //endTime = showTime(0);
    wifiEndTime = "2017-12-07";
    //iframe实现动态页面更新
    //$("#lockListFrame").attr("src","../mapTools/lockList.do");
    //调用子页面获取门禁列表接口
    wifiListFrame.window.getWifiLogFir();
    //赋予日期框初始值
    $("#wifiListFrame").contents().find("#wifiStartTime").val(wifiStartTime);
    $("#wifiListFrame").contents().find("#wifiEndTime").val(wifiEndTime);
    $("#wifiListFrame").css("display","block");
}

/**
 * 创建门禁模型
 */
function createWifiModel(){
    //动态获取SDK路径信息
    var SDKpath = content3d.GetSDKPath().replace("\\bin","");
    //获取门禁模型路径
    //var lockPath =  SDKpath + "data\\tmp\\model\\men.wrl";
    var lockPath =  SDKpath + "data\\tmp\\model\\SGXCJZM0016.wrl.001.wrl";
    //创建门禁模型
    wifiLayer = map3D.createModelLabelLayer("D:\\t1.shp",lockPath);
    wifiLayers.push(wifiLayer);
}

// /**
//  * 添加门禁模型要素
//  * @param  level
//  * @return wifiModelFeature
//  */
// function addLockModelFeature(level,pitch){
//     //获取模型主键
//     var modelId = level.id + "," + level.name;
//     //添加模型图层信息
//     var wifiModelFeature = map3D.addModelLabel(wifiLayer,{
//         lon:level.longitude,
//         lat:level.latitude,
//         height:wifiHeight,
//         modelName:modelId,
//         xScale:"1.0",
//         yScale:"1.0",
//         zScale:"1.0",
//         pitch:pitch
//     });
//     return wifiModelFeature;
// }

/**
 * 移除wifi设备模型
 * @param deleteLayer
 *
 */
function deleteWifiModelFeature(deleteLayer){
    map3D.deleteModelById({
        feature:deleteLayer.wifiModelFeature,
        layer:wifiLayer
    }); // 删除一个模型要素
}

/**
 * 根据wifi编号与时间获取当前wifi记录信息
 * @returns wifiLogData(wifi记录对象)
 */
function getWifiLogData(){
    var wifiLogData = null;
    // var url = "http://janus.sshmt.com/api/community/lock/openlog";
    var url="http://192.168.42.65:8080/jites-om/security/wifi/record";
    var data = {
        // controlNum:wifiNum,
        id:1,
        startTime:wifiStartTime,
        endTime:wifiEndTime
    };
    ajax({
        url:'security/wifi/record',
        data:data,
        type:"get",
        success:function(data){
            wifiLogData = data;
        },
        error:function(e){
        }
    });
    return wifiLogData;
}

/**
 * 根据日期模糊查询wifi记录
 */
function searchWifiListByDate(){
    //获取子页面点击日期
    wifiStartTime = wifiListFrame.window.document.getElementById("wifiStartTime").value.split(" ")[0];
    wifiEndTime = wifiListFrame.window.document.getElementById("wifiEndTime").value.split(" ")[0];
    var data = getWifiLogData();
    return data;
}

/**
 * 关闭当前门禁记录列表
 * @returns
 */
function closeWifiLogMenu(){
    $("#wifiListFrame").css("height","38px");
}

/**
 * 展开当前门禁记录列表
 * @returns
 */
function openWifiLogMenu(){
    $("#wifiListFrame").css("height","228px");
}

/**
 * 展开左侧列表
 * @returns
 */
function lendonWithWifi(){
    var width = document.body.clientWidth;
    $("#wifiListFrame").css("width",width - 72 - 272  + "px");
    $("#wifiListFrame").css("left",72 + 272 + 6  + "px");
}

/**
 * 关闭左侧列表
 * @returns
 */
function lendonWithoutWifi(){
    var width = document.body.clientWidth;
    $("#wifiListFrame").css("width",width - 72 + "px");
    $("#wifiListFrame").css("left", 72 + "px")
}

/**
 * 门禁状态列表查询
 * @returns
 */
function wifiStateList(pageNo){
    var url = "http://janus.sshmt.com/api/community/brokenlock";
    var data = {
        UUID:"660f3afb-0abb-4254-8cc7-f866e36293ad"
    };
    $.ajax({
        url:url,
        data:data,
        type:"get",
        success:function(data){
            if(data.code == '0'){
                var totalPage = Math.ceil(data.data.length/pageSize);//总页数
                var wifiPageArray =  pageLockStateData(data.data);//获取分页结果集
                var wifiStateList = createStateList(wifiPageArray[pageNo]);//获取门禁状态列表
                var resultList = lockPager(pageNo,totalPage);//获取门禁分页
                $("#wifiState").html(wifiStateList);
                $("#wifiStatePage").html(resultList);
            }
        },
        error:function(e){
        }
    });
}
