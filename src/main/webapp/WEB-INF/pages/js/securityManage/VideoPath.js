/*******************************************************************巡更路径绘制保存操作(Start)**********************************************************************/
var isPlot = false;
var lineVideoPath;
/**巡更路径绘制**/
function plotVideoPath(){
    var videoPathName = $("#videoPath_name").val();
    if(videoPathName == ''){
        alert('请填写需保持的巡更路径名称！！！');
    }else{
        lineVideoPath = map3D.drawRoamPath();
        isPlot = true;
    }
    if(videoPathName.length>20){
        alert('巡更路径名称过长,请重新输入!');
        $("#videoPath_name").val('');
        return;
    }
}
/**巡更路径保存*/
function saveVideoPath(){

    // 获取videoPathParams
    var points = map3D.getViewPoint();
    var pointList = points.split(";");
    var videoPathParams = pointList[3].split(":")[1] +"," + pointList[4].split(":")[1] +","+pointList[5].split(":")[1];

    // 获取videoPathName
    var videoPathName = $("#videoPath_name").val();
    if(videoPathName == ''){
        alert('请填写需保持的巡更路径名称！！！');
        return;
    }
    // 获取videoPathPoints
    var videoPathPoints = '';
    if(isPlot){
        var opt = lineVideoPath.GetLayerResult();
        if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_draw2dobject"){
            videoPathPoints = opt.GetConfigValueByKey("Points");
            alert(videoPathPoints);
        }
    }else{
        alert('请点击【绘制】按钮进行巡更路径绘制');
        return;
    }
    if(videoPathPoints==''){
        alert('请点击【绘制】按钮进行巡更路径绘制');
        return;
    }
    $.ajax({
        url : '../mapTools/addVideoPath.do',
        type : "post",
        data : {
            userId      :   "",
            videoPathName 	:	videoPathName,
            videoPathPoints  	: 	videoPathPoints,
            videoPathParams	:	videoPathParams
        },
            success : function(data) {
                if (data.success == 1) {
                    //findVideoPath(1);//更新查询页面
                    alert("巡更路径添加成功");
                }else{
                    alert(data.msg);
                }
            },
            error : function(e) {
            }
        });
    //}
    $("#videoPath_name").val('');
    clearVideoPath();
}
/**巡更路径清除**/
function clearVideoPath(){
    isPlot = false;
    map3D.removelayer(lineVideoPath);
}
/*******************************************************************巡更路径绘制保存操作(End)**********************************************************************/


/*******************************************************************巡更路径播放管理(Start)**********************************************************************/
var dynamicVideoPathLayer;
var playVideoArray = {};
/**
 * 巡更图层
 *
 * @param videoPathPoints,巡更路径点集
 * @param videoPathParams,视角参数
 */
function addVideoPath(videoPathPoints,videoPathParams) {
    var str = '';
    var strArray = videoPathParams.split("|");
    for(var i =0;i<strArray.length;i++){
        if(i==0){
            str += strArray[i];
        }else{
            str += (","+strArray[i]);
        }
    }
    dynamicVideoPathLayer = map3D.addRoamPath(videoPathPoints,str,3);// API
}
//var playVideoState = 0;
//var pointVideoId ='';
var index = 0;
var videoPathPointsArray =["120.536919934,31.8588932438,2.99996939767;120.537312316,31.858790373,2.99996855017;120.537729488,31.8586247778,2.99997074902;120.537590518,31.85835957,2.99996365886;120.537264879,31.8584858994,2.9999718247;120.536885059,31.8585880974,2.99995909724;",
    "120.544320866,31.3155497522,8.96492107678;120.544443512,31.3144497739,3.08561442327;120.543505507,31.3143508794,3.00036829151;120.543742335,31.3135358356,3.0002494799;120.543924548,31.313033945,3.00036425795;",
    "120.544320866,31.3155497522,8.96492107678;120.544443512,31.3144497739,3.08561442327;120.543505507,31.3143508794,3.00036829151;120.543742335,31.3135358356,3.0002494799;120.543924548,31.313033945,3.00036425795;",
    "120.691008428,31.4344208956,7.69996972848;120.691274206,31.434411096,7.49997142423;120.691592997,31.434395941,10.5863312492;120.691563154,31.4341923745,9.96277662553;120.691155797,31.4342297696,7.69997107424;120.691001022,31.4342600939,12.6637325268;"];
var videoPathParams = "0,-0.314,10";
var graphic_Layers = [];
/**
 * 视频巡更播放
 *
 * @param id,数据id
 * @param videoPathPoints,巡更路径点集
 * @param videoPathParams,视角参数
 */

function playVideoPath(id){
    index =0;
    if(playVideoArray[id]==undefined){
        addVideoPath(videoPathPointsArray[id],videoPathParams);
        playVideoArray[id] = dynamicVideoPathLayer;
    }
    var graphic_layer = map3D.addGraphics(3,{
        pointSet: videoPathPointsArray[id]
        //drawLineColor	: "0.24,0.53,1,1",
    });//0 是矩形  1是圆   2是多边形   3是线
    graphic_Layers.push(graphic_layer);
    map3D.playRoamPath(playVideoArray[id]);// API
//    map3D.playRoamPathOld(playArray[id],10);
//    automaticVideoPathLayer[playVideoArray[id].GetLayerID()] = playVideoArray[id];
    var PositionArray = [];//存储路径播放机关键点坐标
    var KeyPositionArray = [];//关键点坐标转换成场景大坐标
    PositionArray = videoPathPointsArray[id].split(';');


    /**  关键点转换为大场景坐标 */
    for(var i = 0 ; i < PositionArray.length - 1 ; ++i){
        var keyPoint = PositionArray[i].split(',');
        var ss = map3D.coordTransformation(1,{Lon:keyPoint[0],Lat:keyPoint[1],Height:keyPoint[2]});//坐标转换
        KeyPositionArray.push(ss);
    }

    /** SDK事件 路径巡更过程获取关键点*/
    getVideoPlayPointEvent2(true);
    function getVideoPlayPointEvent2(flag) {
        if (flag){function VPSDKCtrl::FireOnLayerNotify(layerid, type){
            var layer = playVideoArray[id];
            var opt = layer.GetLayerResult();//获取图层结果集
            //content3d.attachEvent("FireOnToolsNotify", linkVideoPathPlayDialog);
            if((opt.GetConfigValueByKey("DataSourceTypeName") == "dynamicpath") &&(type == 2)){
                var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
                /**
                 =================================
                 业务逻辑处理 start
                 =================================
                 */
                if(map3D.CalcBuffer(val,KeyPositionArray[index]) &&index < PositionArray.length){
                    index ++ ;
                    if(index >= PositionArray.length - 1){//获取的是最后一个点的坐标值

                    }else{//获取的是除最后一个点的坐标

                        if(index==1){
                            videoPlayChannel="1000021$1$0$11";
                            previewVideoPlay({width:"480px", height:"370px", top:"600px", right:"0px"});
                        }
                        if(index==2){
                            cancelPreviewVideoPlay();
                            videoPlayChannel="1000021$1$0$12";
                            previewVideoPlay({width:"480px", height:"370px", top:"600px", right:"0px"});
                        }
                        if(index==3){
                            cancelPreviewVideoPlay();
                            videoPlayChannel="1000021$1$0$13";
                            previewVideoPlay({width:"480px", height:"370px", top:"600px", right:"0px"});
                        }
                        if(index==4){
                            cancelPreviewVideoPlay();
                            videoPlayChannel="1000021$1$0$14";
                            previewVideoPlay({width:"480px", height:"370px", top:"600px", right:"0px"});
                        }
                        if(index==5){
                            cancelPreviewVideoPlay();
                            videoPlayChannel="1000021$1$0$15";
                            previewVideoPlay({width:"480px", height:"370px", top:"600px", right:"0px"});
                        }
                        if(index==6){
                            cancelPreviewVideoPlay();
                            videoPlayChannel="1000021$1$0$6";
                            previewVideoPlay({width:"480px", height:"370px", top:"600px", right:"0px"});
                        }
                    }

                }

                /**
                 =================================
                 业务逻辑处理 end
                 =================================
                 */
            }
        }
        }
    }
    // SDKevent.attachEvent("FireOnLayerNotify",function(layerid,type){
    //     var layer = playVideoArray[id];
    //     var opt = layer.GetLayerResult();//获取图层结果集
    //     content3d.attachEvent("FireOnToolsNotify", linkVideoPathPlayDialog);
    //     if((opt.GetConfigValueByKey("DataSourceTypeName") == "dynamicpath") &&(type == 2)){
    //         var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
    //         /**
    //          =================================
    //          业务逻辑处理 start
    //          =================================
    //          */
    //         if(map3D.CalcBuffer(val,KeyPositionArray[index]) &&index < PositionArray.length){
    //             index ++ ;
    //             if(index >= PositionArray.length - 1){//获取的是最后一个点的坐标值
    //
    //             }else{//获取的是除最后一个点的坐标
    //
    //                 if(index==1){
    //                     alert(1);
    //                     previewVideo({width:"480px", height:"370px", top:"980px", right:"620px"});
    //                 }
    //                 if(index==2){
    //                     previewVideo({width:"480px", height:"370px", top:"940px", right:"590px"});
    //                 }
    //                 if(index==3){
    //                     previewVideo({width:"480px", height:"370px", top:"900px", right:"560px"});
    //                 }
    //                 if(index==4){
    //                     previewVideo({width:"480px", height:"370px", top:"860px", right:"530px"});
    //                 }
    //                 if(index==5){
    //                     previewVideo({width:"480px", height:"370px", top:"820px", right:"500px"});
    //                 }
    //                 if(index==6){
    //                     previewVideo({width:"480px", height:"370px", top:"780px", right:"470px"});
    //                 }
    //                 // if(index==1){
    //                 //     showVideoPathWebDialog(videoPathPlayUrl,"980","620","600","400");
    //                 // }
    //                 // if(index==2){
    //                 //     cancelVideoPathWebDialog();
    //                 //     showVideoPathWebDialog(videoPathPlayUrl,"940","590","600","400");
    //                 // }
    //                 // if(index==3){
    //                 //     cancelVideoPathWebDialog();
    //                 //     showVideoPathWebDialog(videoPathPlayUrl,"900","560","600","400");
    //                 // }
    //                 // if(index==4){
    //                 //     cancelVideoPathWebDialog();
    //                 //     showVideoPathWebDialog(videoPathPlayUrl,"860","530","600","400");
    //                 // }
    //                 // if(index==5){
    //                 //     cancelVideoPathWebDialog();
    //                 //     showVideoPathWebDialog(videoPathPlayUrl,"820","500","600","400");
    //                 // }
    //                 // if(index==6){
    //                 //     cancelVideoPathWebDialog();
    //                 //     showVideoPathWebDialog(videoPathPlayUrl,"780","470","600","400");
    //                 // }
    //             }
    //
    //         }
    //
    //         /**
    //          =================================
    //          业务逻辑处理 end
    //          =================================
    //          */
    //     }
    // });
}

function previewVideoPlay(iframeObj){
    //iframe初始加载视频页面
    if(loadVideoPlayFlag){
        $("#lockPlayFrame").attr("src","../mapTools/videoPlay.do");
        //loadVideoPlayFlag = false;
    }else{
        //调用子页面初始化方法
        lockPlayFrame.window.init();
    }
    //iframe位置初始自定义调整
    $("#lockPlayFrame").css({"width":iframeObj.width,"height":iframeObj.height,"top":iframeObj.top,"right":iframeObj.right});
    $("#lockPlayFrame").css("display","block");
}
function cancelPreviewVideoPlay(){
    //关闭门禁时退出登录
    lockPlayFrame.window.ButtonLogout_onclick();
    //$("#lockPlayFrame").css({"width":'',"height":'',"top":'',"right":''});
    $("#lockPlayFrame").css("display","none");
}

/**
 * 视频巡更暂停
 *
 * @param id,数据id
 */
function pauseVideoPath(id){
    if(playVideoArray[id]!=undefined){
        map3D.pauseRoamPath(playVideoArray[id]);// API
    }
}

/**
 * 视频巡更停止
 *
 * @param id,数据id
 */
function stopVideoPath(id){
    if(playVideoArray[id]!=undefined){
        map3D.stopRoamPath(playVideoArray[id]);// API
    }
    if(playVideoArray[id]!=null){
        playVideoArray[id].SetVisible(false);
    }
    if(graphic_Layers.length>0){
        for(var i =0;i<graphic_Layers.length;i++){
            map3D.removelayer(graphic_Layers[i]);
        }

    }
}
/*******************************************************************巡更路径播放管理(End)**********************************************************************/


 /*******************************************************************网页弹窗播放管理(Start)**********************************************************************/
// var webResp = null;
// var videoPathPlayUrl =  "http://" + projectIP + ":" + projectPort + "/ICGis/mapTools/videoPlay.do";
// // var windowLeft ="980";
// // var windowTop ="620";
// // var windowWidth ="600";
// // var windowheight ="400";
// //静态框参数
// /**
//  * 打开网页静态框
//  */
// function showVideoPathWebDialog(videoPathPlayUrl,windowLeft,windowTop,windowWidth,windowheight){
//     var opt = tools.CreateToolsOptions("web"); // /< 创建配置项
//     opt.AddConfig("Url", videoPathPlayUrl); // /< 网页链接地址
//     opt.AddConfig("Left", windowLeft); // /< 屏幕位置x
//     opt.AddConfig("Top", windowTop); // /< 屏幕位置y
//     opt.AddConfig("Widget", windowWidth); // /< 页面宽度
//     opt.AddConfig("Height", windowheight); // /< 页面高度
//     webobject = tools.CreateToolsObject("WebInfoTool", opt); // /< 创建工具类型
//     webobject.AddObserver();
//     webobject.Active(); // /< 激活工具类
//     // 开启响应事件
//     //content3d.attachEvent("FireOnToolsNotify", linkVideoPathPlayDialog);
//     linkVideoPathPlayDialog(true);
// }
//
// /**
//  * 关闭网页静态框
//  */
// function cancelVideoPathWebDialog() {
//     //移除网页弹窗界面
//     webobject.Deactive();
//     //关闭响应器
//     webobject = null;
//     // 关闭响应事件
//     //content3d.detachEvent("FireOnToolsNotify", linkVideoPathPlayDialog);
//     linkVideoPathPlayDialog(false);
// }
//
// /**
//  * 视频播放页面交互
//  */
// function linkVideoPathPlayDialog(flag){
//     if(flage){
//         function VPSDKCtrl::FireOnToolsNotify(str,id)
//         {
//             var msg = webobject.GetToolsResult().GetConfigValueByKey("Param");
//             var msgs = msg.split('@#');
//             //获取触发事件的状态值，若触发事件是预览事件，则执行预览方法
//             if(msgs[0] == "1"){
//
//             }else{
//                 cancelVideoWebDialog();
//             }
//         }
//     }
// }

/*******************************************************************网页弹窗播放管理(End)**********************************************************************/

/*******************************************************************视频巡更查询、添加、删除管理(Start)**********************************************************************/

/**
 * 巡更路径管理
 * @creatDate 2018-02-27
 */
// 视点默认状态
var videoPathState = 1;
// map页面弹出框
var webResp = null;
//播放视频的路径
var videoPlayUrl =  "http://" + projectIP + ":" + projectPort
    + "/ICGis/mapTools/videoPlay.do";
//巡更路径路径点集合
var videoPathPoints;
//巡更路径参数（角度距离）
var videoPathParams;
// 巡更路径名称
var VideoPathName;
// 巡更路径标志
var VideoPathToken;
// 模糊查询-名称结果集
var nameVideoParhArray = [];

/**
 * 根据name查询巡更路径结果
 *
 * @param VideoPathName,视点名称
 */
function findVideoPathByName(VideoPathName) {
    nameVideoParhArray = [];
    // 将异步方法改为同步方法
    $.ajaxSettings.async = false;
    $.ajax({
        url : '../mapTools/findVideoPath.do',
        type : "post",
        data : {
            name : VideoPathName,
            pageNo : "1"
        },
        success : function(data) {
            // 每一条结果集
            var records = data.record.records;
            for (var i = 0; i < records.length; i++) {
                nameViewArray.push(records[i].name);
            }
        },
        error : function(e) {
        }
    });
    return nameViewArray;
}

/**
 * 新增视点
 *
 * @param viewPointName,名称
 * @param viewPointDescr,备注
 */
function addView(viewPointName, viewPointDescr) {
    // 新增视点避免名称重复
    var nameArr=findViewPointByName(viewPointName);
    for(var i=0;i<nameArr.length;i++){
        if(nameArr[i] == viewPointName){
            alert("视点名称已存在!");
            return;
        }
    }
    // 备注
    if (!viewPointDescr) {
        viewPointDescr = "";
    }
    // 获取当前视点
    var points = map3D.getViewPoint();
    var pointList = points.split(";");

    $.ajax({
        url : '../mapTools/addView.do',
        type : "post",
        data : {
            userId : "",
            name : viewPointName,
            descr : viewPointDescr,
            x : pointList[0].split(":")[1],
            y : pointList[1].split(":")[1],
            z : pointList[2].split(":")[1],
            rotateAngle : pointList[3].split(":")[1],
            overAngle : pointList[4].split(":")[1],
            range : pointList[5].split(":")[1]
        },
        success : function(data) {
            if (data.success == 1) {
                findViewPoint(1);
                alert("视点添加成功");
            }else{
                alert(data.msg);
            }
        },
        error : function(e) {
        }
    });
}

/**
 * 删除视点
 *
 * @param id,数据id
 */
function deleteView(id) {
    if(confirm("确定删除此视点?")){
        $.ajax({
            url : '../mapTools/deleteView.do',
            type : "post",
            data : {
                id : id
            },
            success : function(data) {
                if (data.success == 1) {
                    findViewPoint(1);
                }else{
                    alert(data.msg);
                }
            },
            error : function(e) {
            }
        });
    }
}

/**
 * 更新视点
 *
 * @param thisId,数据id
 */
// 打开修改框
function openModify(thisId,descr) {
    /** 修改功能框中赋值* */
        // 名称-name
    var viewInputText = $("#" + thisId).val().split("_")[1];
    // 备注-descr
    var viewTextarea = $("#" + thisId).val().split("_")[2];
    viewTextarea = viewTextarea == "null" ? "" : viewTextarea;
    $("#viewInputText").val(viewInputText);
    $("#viewTextarea").val(viewTextarea);
    // 修改框显隐
    $('.bzxg_menu_sd').show();
    /** 视点修改框---确定* */
    $('#modifySure').unbind('click').click(function() {
        var id = $("#" + thisId).val().split("_")[0];
        modifyView(id,descr);
        $('.bzxg_menu_sd').hide();
    });
    /** 视点修改框---删除* */
    $('#modifyErase').unbind('click').click(function() {
        $('.bzxg_menu_sd').hide();
    });
}
// 更新视点
function modifyView(id,descr) {
    // 获取当前视点
    var points = map3D.getViewPoint();
    var pointList = points.split(";");
    // 获取修改框信息
    var viewInputText = $("#viewInputText").val();
    var viewTextarea = $("#viewTextarea").val();
    // 修改视点避免名称重复
    var nameArr=findViewPointByName(viewInputText);
    for(var i=0;i<nameArr.length;i++){
        // 若名称已存在且备注不变
        if((nameArr[i] == viewInputText)&&(descr==viewTextarea)){
            alert("视点已存在,修改失败!");
            return;
        }
    }
    $.ajax({
        url : '../mapTools/modifyView.do',
        type : "post",
        data : {
            id : id,
            name : viewInputText,
            descr : viewTextarea,
            x : pointList[0].split(":")[1],
            y : pointList[1].split(":")[1],
            z : pointList[2].split(":")[1],
            rotateAngle : pointList[3].split(":")[1],
            overAngle : pointList[4].split(":")[1],
            range : pointList[5].split(":")[1]
        },
        success : function(data) {
            if (data.success == 1) {
                findViewPoint(1);
            }
        },
        error : function(e) {
        }
    });
}

/**
 * 查询视点
 *
 * @param pagenumber,页码
 */
function findViewPoint(pagenumber) {
    // 搜索值为空则查询所有结果
    var viewPointName = '';
    $.ajax({
        url : '../mapTools/findView.do',
        type : "post",
        data : {
            name : viewPointName,
            pageNo : pagenumber
        },
        success : function(data) {
            // 视点结果列表
            var viewResultList = '';
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
                    var name = record.name;
                    //对备注进行判空运算
                    var descr = record.descr;
                    descr = descr == null ?'' : descr;
                    viewResultList += '<ul id="' + id + '" class="map_dttc_qxsy" value="' + id + "_" + name + "_" + descr + '">';
                    viewResultList += '<span class="map_dttc_qxsy_xh"> <span class="fh">' + (i + 1) + '</span>';
                    viewResultList += '</span>';
                    viewResultList += '<span onclick="flyViewPoint(' + record.longitude + ',' + record.latitude + ',' + record.elevation + ','
                        + record.rotateAngle + ',' + record.overAngle + ',' + record.range + ',' + id + ');">' + record.name + '</span>';
                    viewResultList += '<span class="sdsc_sc" id="deleteView" onclick="deleteView(\'' + id + '\')"></span>';
                    viewResultList += '<span class="sdsc_bj" id="updateView" onclick="openModify(\'' + id + '\',\'' + descr +'\')"></span>';
                    viewResultList += '</ul>';
                }
                /** 分页查询* */
                viewResultList += viewPager(pagenumber, totalPage);
            }
            $('.sdsc_lb').html(viewResultList);
            $('.sdsc_bj').unbind('click').click(function() {
                $('.bzxg_menu_sd').show();
            });
        },
        error : function(e) {
        }
    });
}

/**
 * 分页查询
 *
 * @param pageNo,页码
 * @param totalPage,总页数
 * @returns {String},列表节点
 */
function viewPager(pageNo, totalPage) {
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
    pageNode += '<span style="width: 25px;" onclick="findViewPoint(' + 1 + ')">&lt;&lt;</span> ';
    // 上一页
    if (currPage == 1) {
        pageNode += '<span style="width: 20px;">&lt;</span> ';
    } else {
        pageNode += '<span style="width: 20px;" onclick="findViewPoint(' + (pageNo - 1) + ')">&lt;</span> ';
    }
    // 当前页
    var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
    var endPage = (startPage + 3) > totalPage ? totalPage : (startPage + 3);
    for (var page = startPage; page <= endPage; page++) {
        if (page == currPage) {
            pageNode += '<span style="width: 25px;" class="shuzi"><b>' + page + '</b></span>';
        } else {
            pageNode += '<span style="width: 25px;" class="shuzi" onclick="findViewPoint(' + page + ')">' + page + '</span>';
        }
    }
    // 下一页
    if (currPage == totalPage) {
        pageNode += '<span style="width: 20px;">&gt;</span>';
    } else {
        pageNode += '<span style="width: 20px;" onclick="findViewPoint(' + (pageNo + 1) + ')">&gt;</span>';
    }
    // 最后一页
    pageNode += '<span style="width: 25px;" onclick="findViewPoint(' + totalPage + ')">&gt;&gt;</span>';
    pageNode += '</div>';
    pageNode += '</div>';
    return pageNode;
}
/*******************************************************************视频巡更查询、添加、删除管理(End)**********************************************************************/