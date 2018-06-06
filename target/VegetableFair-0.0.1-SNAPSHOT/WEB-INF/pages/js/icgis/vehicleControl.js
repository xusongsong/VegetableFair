/**
 * Created by yangmumu on 2018/3/21.
 */
//是否初次加载门禁监控列表
var firstVehicleFlag = true;
//门禁层级列表对象
var vehicleKeyLevel = [];
//门禁设备模型要素组
var vehicleArrayLayer = [];
//门禁设备模型图层
var vehicleLayer = null;
//门禁设备模型图层组
var vehicleLayers = [];
//wifi设备信息存储
var vehicleInfo = [];
//门禁模型拾取
var vehiclePickLayer = '';;
//门禁模型高度
var vehicleHeight = videoHeight;
//当前点击wifi设备编号
var vehicleNum = null;
//门禁记录开始时间
var vehicleStartTime = null;
//门禁记录结束截至时间
var vehicleEndTime = null;


function trackSearch(){
    var value=$("#carTrack").val();
    var data={
        communityId:"660f3afb-0abb-4254-8cc7-f866e36293ad",
        carId:value
    };
    ajax({
        url:'vehicle/track/getPlates',
        data:data,
        type:"get",
        success:function(data){
            var msg=data.record;
            var list="";
            for(var i=0;i<msg.length;i++){
                list+='<tr class="carMsg" data-user="'+msg[i].userName+'" data-id="'+msg[i].carId+'" data-msg="'+msg[i].Id+'" ><td>'+msg[i].Id+'</td><td>'+msg[i].carId+'</td></tr>';
            }
            $("#carSearch").html(list);
            $(".carMsg").click(function(){
                var carId=$(this).attr("data-id");
                var Id=$(this).attr("data-msg");
                var userName=$(this).attr("data-user");
                $("#carNumber").html(Id);
                $("#carPlate").html(carId);
                $("#carOwner").html(userName);
                carDetail(carId,"","")
            })
        }
    })
}

function carDetail(carId,start,end){
    ajax({
        url:'vehicle/track/info',
        data:{
            uuid:"660f3afb-0abb-4254-8cc7-f866e36293ad",
            carId:carId,
            start:start,
            end:end
        },
        type:"get",
        success:function(data){

        }
    })
}
//获取vehicle监控列表
function getVehicleList(){
    //清空搜索栏信息
    $("#vehicleSearch").val('');
    //初次加载wifi列表一次
    if(firstVehicleFlag){
        var data = {
            communityIds : '660f3afb-0abb-4254-8cc7-f866e36293ad'
        };
        ajax({
            url:'vehicle/device/info',
            data:data,
            type:"get",
            success:function(data){
                if(data.success == '1'){
                    //获取wifi列表信息
                    var data = data.record;
                    var wifiList = createVehicleTreeList(data);
                    //挂载视频监控列表
                    $("#vehicleList").html(wifiList);
                    //重新绑定事件
                    addVehicleEvent();
                    carsStatic();
                }
            },
            error:function(e){

            }
        });
        //加载门禁状态列表
        vehicleStateList(1);
        //初始化创建门禁模型图层
        createVehicleModel();
        //初始化点击门禁设备信息
        firstVehicleFlag = false;
    }
    //初始化拾取图层
    vehiclePickLayer = "";
    //开启门禁拾取事件
//    lockPickUp();
}
/**
 * 重新生成列表后添加事件
 */
function addVehicleEvent(){
    $('.zjdVehicle').next().hide();
    $('.zjdVehicle1').next().hide();
    $('.zjdVehicle').find('div').click(function(){
        $(this).parent('div').next().toggle();
    });
    $('.zjdVehicle1').find('div').click(function(){
        $(this).parent('div').next().toggle();
    });
    $('.zjdVehicle').find('div').click(function(){
        $(this).children('.tree_xl_vehicle').toggleClass('tree_xlclick_vehicle');
    });
    $('.zjdVehicle1').find('div').click(function(){
        $(this).children('.tree_xl_vehicle').toggleClass('tree_xlclick_vehicle');
    });
    $('.tree_xy_vehicle').click(function(){
        $(this).toggleClass('tree_xyclick');
    });
    $('.zjdVehicle2 div .gm_vehicle').click(function(){
        $('.zjdVehicle2 div .gm_vehicle').removeClass('gmclick_vehicle');
        $(this).addClass('gmclick_vehicle');
    });
}

/**
 * 生成第一层级climb列表
 * @param  data
 * @return wifiList
 */
function createVehicleTreeList(data){
    //获取结果集列表
    getVehicleLevel(data);
    var firstWifiLevel = vehicleKeyLevel[1];
    var name = firstWifiLevel[0].name;
    var id =  firstWifiLevel[0].id;
    var wifiList = '';
    wifiList += '<div class="zjdVehicle">';
    wifiList += '<div >';
    wifiList +=	'<span class="tree_xl_vehicle"></span>';
    wifiList +=	'<span class="pic"><img src="../img/tree_jd1.png"></span>';
    wifiList +=	'<span>' + name + '</span>';
    wifiList += '</div>';
    wifiList += '<span class="tree_xy_vehicle"  id = "xy_' + id + '" value = "1" onclick = "vehicleShowOrHideFir(\'' + id + '\')"></span>';
    wifiList += '</div>';
    wifiList += createVehicleThirdList(id);
    return wifiList;
}
//
// /**
//  * 生成第二层级climb列表
//  * @param  parentId
//  * @return wifiList
//  */
// function createVehicleSecList(){
//     var secondLockLevel = vehicleKeyLevel[2];
//     var wifiList = '';
//     wifiList += '<div class = "treeSearch">';
//     for(var i = 0; i < secondLockLevel.length; i++){
//         var secondLockObj = secondLockLevel[i];
//         var name = secondLockObj.name;
//         var id = secondLockObj.id;
//         wifiList += '<div class="zjdVehicle1">';
//         wifiList += '<div style="width: 184px;height: 16px;float: left;">';
//         wifiList +=	'<span class="tree_xl_vehicle"></span>';
//         wifiList +=	'<span class="pic"><img src="../img/tree_jd1.png"></span>';
//         wifiList +=	'<span>' + name + '</span>';
//         wifiList += '</div>';
//         wifiList += '<span class="tree_xy_vehicle" name="' + secondLockObj.parentId + '_video" id = "xy_' + id + '" value = "1" onclick = "vehicleShowOrHideSec(\'' + id + '\')"></span>';
//         wifiList += '</div>';
//         wifiList += createVehicleThirdList(id);
//
//     }
//     wifiList += '</div>';
//     return wifiList;
// }

/**
 * 生成第三层级climb列表
 * @param  parentId
 * @return wifiList
 */
function createVehicleThirdList(){
    var thirdLockLevel = vehicleKeyLevel[2];
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
        wifiList += '<div class="zjdVehicle2">';
        wifiList += '<div onclick = "vehicleLogPosition(' + lon + ',' + lat + ',\'' + id + '\');">';
        wifiList +=	'<span class="pic"><img src="../img/tree_jd3.png" style = "filter:alpha(opacity=90);"></span>';
        wifiList +=	'<span name="gm_vehicle" value = "0" class = "gm_vehicle" style = "width:174px;" id = "' + id + '">' + name + '</span>';
        wifiList += '</div>';
        wifiList += '<span class="tree_xy_vehicle" name="' + thirdLockObj.parentId + '_video" id = "xy_' + id + '" value = "1" onclick = "singleLockFeature(\'' + id + '\')"></span>';
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
function getVehicleLevel(data){
    //第一层级门禁列表(村名称)
    var firstWifiLevel = [];
    //第二层级门禁列表(自定义wifi设备层级)
    var secondWifiLevel = [];
    // //第三层级门禁列表(单元)
    // var thirdWifiLevel = [];
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
            secondLockObj.parentId=firstLockObj.id;
            // secondLockObj.parentId = secondLockObj.id;
            secondWifiLevel.push(secondLockObj);
            // var secondArray=lockArray.children;
            // //处理第三层级(单元楼)
            // for(var k=0;k<secondArray.length;k++){
            //     var thirdLockObj={};
            //     thirdLockObj.id = secondArray[k].id;
            //     thirdLockObj.name = secondArray[k].name;
            //     thirdLockObj.longitude = secondArray[k].longitude;
            //     thirdLockObj.latitude = secondArray[k].latitude;
            //     thirdWifiLevel.push(thirdLockObj);
            // }
        }
    }
    vehicleKeyLevel[1] = firstWifiLevel;
    vehicleKeyLevel[2] = secondWifiLevel;
    // vehicleKeyLevel[3] = thirdWifiLevel;
}

//车辆统计
function carsStatic(){
    var data={
        communityId:"660f3afb-0abb-4254-8cc7-f866e36293ad"
    };
    ajax({
        url:'vehicle/device/flow',
        data:data,
        type:"get",
        success:function(data){
            $("#communityCars").html(data.record.ownerCount);
            $("#hostCars").html(data.record.inCount);
            $("#outCars").html(data.record.outCount);
        }
    })
}
/**
 * 车辆监控第一层级
 * @param key
 */
function vehicleShowOrHideFir(key){
    //获取当前节点显隐状态
    var isAll = $("#xy_"+key).val();
    var secondLockLevel = vehicleKeyLevel[2];
    for(var i = 0; i < secondLockLevel.length; i++){
        var level = secondLockLevel[i];
        var id = level.id;
        var value = $("#xy_"+id).val();
        if(level.parentId = key){
            if(isAll == '0'){//若已经显示则隐藏
                $("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
                $("#xy_" + key).val("1");

            }else {
                $("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
                $("#xy_" + key).val("0");
            }
        }
    }
    // //子页面iframe样式变化
    // $("#videoFourDialog").contents().find("#fpp").toggleClass("mjclick");
}

/**
 * 模糊查询门禁信息
 */
function vehicleSearch(){
    //查询之前恢复原先状态
    $(".gm_vehicle").css("color","#666666");
    //获取模糊查询对象
    var thirdLockLevel = vehicleKeyLevel[2];
    //模糊查询匹配数组
    var vehicleSearchArray = [];
    //获取搜索关键字
    var keyWord = $.trim($("#vehicleSearch").val());
    //若搜索关键字不为空
    if(keyWord != '' && keyWord != null){
        //获取正则对象
        var reg = new RegExp(keyWord);
        for(var i = 0; i < thirdLockLevel.length; i++){
            var name = thirdLockLevel[i].name;
            var id = thirdLockLevel[i].id;
            if(name.match(reg)){
                vehicleSearchArray.push(id);
            }
        }
    }
    //循环数组改变颜色样式
    for(var j = 0; j < vehicleSearchArray.length; j++){
        var id = vehicleSearchArray[j];
        $("#"+id).css("color","#DD313A");
        //获取所查询设备上几级.zjd1元素标签集合
        var zjdLabels = $("#"+id).parents('.treeSearch').prev();
        //遍历所有zjd1进行展开
        for(var t =0; t < zjdLabels.length; t++ ){
            var zjdLabel = zjdLabels.eq(t).find('div');
            //若已经展开则不再展开
            if(!(zjdLabel.children('.tree_xl_vehicle').hasClass('tree_xlclick_vehicle'))){
                zjdLabel.click();
            }
        }
    }
    //清空视频监控和数组
    vehicleSearchArray = [];
    //若未打开第一层级则执行点击事件
    if(!($('.zjdVehicle').find('div').children('.tree_xl_vehicle').hasClass('tree_xlclick_vehicle'))){
        $('.zjdVehicle').find('div').click();
    }
}

/**
 * wifi设备飞行定位
 * @param lon
 * @param lat
 */
function flyVehiclePosition(lon,lat){
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
function vehicleLogPosition(lon,lat,id){
    flyVehiclePosition(lon,lat);
    vehicleNum = id;
    //获取前一天时间
    //startTime = showTime(-1);
    vehicleStartTime = "2018-01-18";
    //获取当前时间
    //endTime = showTime(0);
    vehicleEndTime = "2018-01-20";
    //iframe实现动态页面更新
    //$("#lockListFrame").attr("src","../mapTools/lockList.do");
    //调用子页面获取门禁列表接口
    vehicleListFrame.window.getVehicleLogFir();
    //赋予日期框初始值
    $("#vehicleListFrame").contents().find("#vehicleStartTime").val(vehicleStartTime);
    $("#vehicleListFrame").contents().find("#vehicleEndTime").val(vehicleEndTime);
    $("#vehicleListFrame").css("display","block");
}

/**
 * 创建门禁模型
 */
function createVehicleModel(){
    //动态获取SDK路径信息
    var SDKpath = content3d.GetSDKPath().replace("\\bin","");
    //获取门禁模型路径
    //var lockPath =  SDKpath + "data\\tmp\\model\\men.wrl";
    var lockPath =  SDKpath + "data\\tmp\\model\\SGXCJZM0016.wrl.001.wrl";
    //创建门禁模型
    climbLayer = map3D.createModelLabelLayer("D:\\t1.shp",lockPath);
    climbLayers.push(climbLayer);
}

/**
 * 添加门禁模型要素
 * @param  level
 * @return wifiModelFeature
 */
function addVehicleModelFeature(level,pitch){
    //获取模型主键
    var modelId = level.id + "," + level.name;
    //添加模型图层信息
    var vehicleModelFeature = map3D.addModelLabel(vehicleLayer,{
        lon:level.longitude,
        lat:level.latitude,
        height:climbHeight,
        modelName:modelId,
        xScale:"1.0",
        yScale:"1.0",
        zScale:"1.0",
        pitch:pitch
    });
    return vehicleModelFeature;
}

/**
 * 移除wifi设备模型
 * @param deleteLayer
 *
 */
function deleteVehicleModelFeature(deleteLayer){
    map3D.deleteModelById({
        feature:deleteLayer.vehicleModelFeature,
        layer:vehicleLayer
    }); // 删除一个模型要素
}

/**
 * 根据wifi编号与时间获取当前车辆记录信息
 * @returns wifiLogData(车辆记录对象)
 */
function getVehicleLogData(){
    var wifiLogData = null;
    // var url = "http://janus.sshmt.com/api/community/lock/openlog";
    // var url="http://192.168.42.65:8080/jites-om/vehicle/device/record";
    var data = {
        communityId:"660f3afb-0abb-4254-8cc7-f866e36293ad",
        startTime:vehicleStartTime,
        endTime:vehicleEndTime,
        // deviceId:vehicleNum
    };
    ajax({
        url:'vehicle/device/record',
        // url:url,
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
function searchVehicleListByDate(){
    //获取子页面点击日期
    vehicleStartTime = vehicleListFrame.window.document.getElementById("vehicleStartTime").value.split(" ")[0];
    vehicleEndTime = vehicleListFrame.window.document.getElementById("vehicleEndTime").value.split(" ")[0];
    var data = getVehicleLogData();
    return data;
}

/**
 * 关闭当前车辆记录列表
 * @returns
 */
function closeVehicleLogMenu(){
    $("#vehicleListFrame").css("height","38px");
}

/**
 * 展开当前车辆记录列表
 * @returns
 */
function openVehicleLogMenu(){
    $("#vehicleListFrame").css("height","228px");
}

/**
 * 展开左侧列表
 * @returns
 */
function lendonWithVeicle(){
    var width = document.body.clientWidth;
    $("#vehicleListFrame").css("width",width - 72 - 272  + "px").css("left",72 + 272 + 6  + "px");
}

/**
 * 关闭左侧列表
 * @returns
 */
function lendonWithoutVehicle(){
    var width = document.body.clientWidth;
    $("#vehicleListFrame").css("width",width - 72 + "px").css("left", 72 + "px")
}

/**
 * 车辆状态列表查询
 * @returns
 */
function vehicleStateList(pageNo){
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
                $("#vehicleState").html(wifiStateList);
                $("#vehicleStatePage").html(resultList);
            }
        },
        error:function(e){
        }
    });
}


