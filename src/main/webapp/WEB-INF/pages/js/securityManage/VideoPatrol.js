/*******************************************************************巡更路径实时绘制(Start)*********************************************************/
var layermap = [];
var videoPlaygraphic;
var graphics1_layers =[];
//视频经纬度数组
var videoPlayPosition =[];
/**绘制路径 */
function addGraphics(){
    var videoPlaygraphic = map3D.addGraphics(3,{});//0 是矩形  1是圆   2是多边形   3是线
    graphics1_layers.push(videoPlaygraphic);
    layermap[videoPlaygraphic.GetLayerID()] = videoPlaygraphic;
    //SDKevent.attachEvent("FireOnLayerNotify", graphicEvent1);
    graphicEventForVideoPlay(true);
    graphics = videoPlaygraphic;
}

var videoPathPoints;
//var pointsArray = [];
/**绘制路径的sdk回调事件*/
function graphicEventForVideoPlay(flag){
    if(flag){
        function VPSDKCtrl::FireOnLayerNotify(layerid,type){
            var layer = layermap[layerid];
            var opt = layer.GetLayerResult();
            if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_draw2dobject"){
                videoPathPoints = opt.GetConfigValueByKey("Points");
                //alert(videoPathPoints);
                //pointsArray.push(videoPathPoints);
            }
            //SDKevent.detachEvent("FireOnLayerNotify", graphicEvent1);//删除绘制路径的sdk回调事件
            graphicEventForVideoPlay(false);
            //map.removelayer(layer);
        }
    }

}
// function graphicEvent1(layerid,type){
//     var layer = layermap[layerid];
//     var opt = layer.GetLayerResult();
//     if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_draw2dobject"){
//         videoPathPoints = opt.GetConfigValueByKey("Points");
//         alert(videoPathPoints);
//         //pointsArray.push(videoPathPoints);
//     }
//     //SDKevent.detachEvent("", graphicEvent1);//删除绘制路径的sdk回调事件
//     map.removelayer(layer);
// }

var isPlay = true;
var PathLayer;
var index = 0;
var automaticPathLayer = [];
/** 路径播放事件 */
function Play(){
    // var coordStr = "120.212542727,30.2117012782,10.54809311964;" +
    //  "120.212910348,30.2119035456,10.54699259158;" +
    //  "120.21329551,30.2121120624,10.54613156803;" +
    //  "120.213804198,30.2123892273,10.54545562901;" +
    //  "120.214606768,30.2128247803,10.54545178451;" +
    //  "120.215171254,30.2131377047,10.5462471135;" +
    //  "120.215448818,30.2132895307,10.54687209241;"; //路径关键点经纬度坐标
    if(videoPathPoints==null){
        return;
    }
    var  coordStr = videoPathPoints;
    /** 添加巡更路径 */
    if(isPlay){
        PathLayer = map3D.addRoamPath(coordStr,"0,-0.314,10",3);// 距离、路径巡更速度
        automaticPathLayer[PathLayer.GetLayerID()] = PathLayer;
        isPlay = false;
    }
    map3D.playRoamPath(PathLayer);//路径播放
    var PositionArray = [];//存储路径播放机关键点坐标
    var KeyPositionArray = [];//关键点坐标转换成场景大坐标
    PositionArray = coordStr.split(';');


    /**  关键点转换为大场景坐标 */
    for(var i = 0 ; i < PositionArray.length - 1 ; ++i){
        var keyPoint = PositionArray[i].split(',');
        var ss = map3D.coordTransformation(1,{Lon:keyPoint[0],Lat:keyPoint[1],Height:keyPoint[2]});//坐标转换
        KeyPositionArray.push(ss);
    }
    /**解析获取视频经纬度、通道id等信息json字符串**/
    /** SDK事件 路径巡更过程获取关键点*/
    getVideoPlayPointEvent1(true);
    function getVideoPlayPointEvent1(flag){
        if (flag){function VPSDKCtrl::FireOnLayerNotify(layerid, type){
                var layer = automaticPathLayer[layerid];
                var opt = layer.GetLayerResult();//获取图层结果集
                if((opt.GetConfigValueByKey("DataSourceTypeName") == "dynamicpath") &&(type == 2)){
                    var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
                    /**
                     =================================
                     业务逻辑处理 start
                     =================================
                     */
                    //关键点位置和实时位置比对
                    if(map3D.CalcBuffer(val,KeyPositionArray[index]) &&index < PositionArray.length){
                        //关键位置和视频接入点位置比对
                        //if(map3D.checkApproximation(val,videoPlayPosition[index])&&index < videoPlayPosition.length){
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
                        //}

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
    //     var layer = automaticPathLayer[layerid];
    //     var opt = layer.GetLayerResult();//获取图层结果集
    //     if((opt.GetConfigValueByKey("DataSourceTypeName") == "dynamicpath") &&(type == 2)){
    //         var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
    //         index = 0;
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
    //                 if(index==1){
    //                     showVideoPathWebDialog(videoPathPlayUrl,"980","620","600","400");
    //                 }
    //                 if(index==2){
    //                     cancelVideoPathWebDialog();
    //                     showVideoPathWebDialog(videoPathPlayUrl,"940","590","600","400");
    //                 }
    //                 if(index==3){
    //                     cancelVideoPathWebDialog();
    //                     showVideoPathWebDialog(videoPathPlayUrl,"900","560","600","400");
    //                 }
    //                 if(index==4){
    //                     cancelVideoPathWebDialog();
    //                     showVideoPathWebDialog(videoPathPlayUrl,"860","530","600","400");
    //                 }
    //                 if(index==5){
    //                     cancelVideoPathWebDialog();
    //                     showVideoPathWebDialog(videoPathPlayUrl,"820","500","600","400");
    //                 }
    //                 if(index==6){
    //                     cancelVideoPathWebDialog();
    //                     showVideoPathWebDialog(videoPathPlayUrl,"780","470","600","400");
    //                 }
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

/** 路径暂停事件 */
function Pause(){
    map3D.pauseRoamPath(PathLayer);
}

/** 路径停止事件 */
function  Stop(){
    index = 0 ;
    map3D.stopRoamPath(PathLayer);
    if(graphics1_layers.length>0){
        for (var i=0;i<graphics1_layers.length;i++){
            map3D.removelayer(graphics1_layers[i]);
        }
    }
}
var videoPlayJsonData;
var fristVideoPlayFlag =true;
/**
 *获取视频监控列表
 */
function getVideoPlayList(){
        var url = "http://device.sshmt.com/api/threeD/getVideoDevice";
        var data = {
            UUID: '660f3afb-0abb-4254-8cc7-f866e36293ad',
            v: '2'
        };
        $.ajax({
            url: url,
            data: data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: "get",
            success: function (data) {
                //获取视频监控列表
                videoPlayJsonData = data.data;
                //var videoList = createVideoList(data);
                console.log(videoPlayJsonData);
                for(var i=0;i <videoPlayJsonData.door.length;i++ ){
                    for(var j=0;j <videoPlayJsonData.door[i].children.length;j++ ){
                        //将json经纬度放入数组中
                        videoPlayPosition.push(videoPlayJsonData.door[i].children[j].children.longitude+","+videoPlayJsonData.door[i].children[j].children.latitude+",0")
                    }
                }
                for(var i=0;i <videoPlayPosition.length;i++ ){
                    console.log(videoPlayPosition[i]);
                }
                //console.log("longitude:"+videoPlayJsonData.door[0].children[0].children.longitude+";latitude"+videoPlayJsonData.door[0].children[0].latitude);
            },
            error: function (e) {
                alert("巡更视频获取失败!");
            }
        });
}

/*******************************************************************巡更路径管理End**************************************************************/
