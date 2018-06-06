    /**
     * 此js对API进行封装提供给搜索功能模块使用
     *
     * @author DL
     * @creatDate 2017-09-25
     */

    /**
     * 场景管理(播放、暂停、停止)
     *
     * @param thisId,数据id
     */
    function sceneManager(thisId){
        var ids = thisId.split("_");
        // 类型
        var type = ids[0];
        // 标记
        var id = ids[1];
        // 清除所有标记
        $('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass('map_dttc_qxsy_xhclick');
        // 特定标记
        $('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');
        switch (type) {
            /** 路径管理**/
            //播放
            case "playPath":
                // 播放路径
                var lnglats = ids[2];
                // 播放视角
                var viewModel = ids[3];
                if($("#playPath_"+id).val()=='0'){
                    // 停止按钮样式 - 关
                    $("#stopPath_"+id).css("background","url(../img/tz.png)");
                    $("#stopPath_"+id).val(0);
                    // 暂停按钮样式 - 关
                    $("#pausePath_"+id).css("background","url(../img/zt.png)");
                    $("#pausePath_"+id).val(0);
                    // 播放按钮样式 - 开
                    $("#playPath_"+id).css("background","url(../img/bf1.png)");
                    $("#playPath_"+id).val(1);
                    play(id,lnglats,viewModel);
                }
                break;
            //暂停
            case "pausePath":
                if($("#pausePath_"+id).val()=='0'){
                    // 若已停止则不再暂停
                    if($("#stopPath_"+id).val()=='1'){
                        return;
                    }
                    // 播放按钮样式 - 关
                    $("#playPath_"+id).css("background","url(../img/bf.png)");
                    $("#playPath_"+id).val(0);
                    // 暂停按钮样式 - 开
                    $("#pausePath_"+id).css("background","url(../img/zt1.png)");
                    $("#pausePath_"+id).val(1);
                    pause(id);
                }else{
                    // 暂停按钮样式 - 关
                    $("#pausePath_"+id).css("background","url(../img/zt.png)");
                    $("#pausePath_"+id).val(0);
                    // 播放按钮样式 - 开
                    $("#playPath_"+id).css("background","url(../img/bf1.png)");
                    $("#playPath_"+id).val(1);
                    play(id,lnglats,viewModel);
                }
                break;
            //停止
            case "stopPath":
                if($("#stopPath_"+id).val()=='0'){
                    // 播放按钮样式 - 关
                    $("#playPath_"+id).css("background","url(../img/bf.png)");
                    $("#playPath_"+id).val(0);
                    // 暂停按钮样式 - 关
                    $("#pausePath_"+id).css("background","url(../img/zt.png)");
                    $("#pausePath_"+id).val(0);
                    // 停止按钮样式 - 开
                    $("#stopPath_"+id).css("background","url(../img/tz1.png)");
                    $("#stopPath_"+id).val(1);
                    stop(id);
                }
                break;
            default:
                break;
        }
    }
    /**
     * 查询结果---功能列表(视角、漫游等)
     *
     * @param thisId,数据id
     */
    function socionics(thisId) {
        var ids = thisId.split("_");
        // 类型
        var type = ids[0];
        // 标记
        var id = ids[1];
        var idVal = $("#" + id).val();
        // 判断是否选中
        if (idVal == 1) {
            /** 视角功能**/
            // 旋转状态
            var rotateStates;
            // 倾斜角
            var pitchAngles;
            // 旋转角
            var rotateAngles;
            // 旋转时间
            var rotateTimes;
            switch (type) {
                // 左视图
                case "leftView":
                    rotateStates = false;
                    pitchAngles = 0;
                    rotateAngles = 90;
                    rotateTimes = 1500;
                    map3D.rotateMode({
                        rotateState : rotateStates,
                        pitchAngle : pitchAngles,
                        rotateAngle : rotateAngles,
                        rotateTime : rotateTimes
                    });
                    break;
                // 俯视图
                case "topView":
                    rotateStates = false;
                    pitchAngles = 0;
                    rotateAngles = 180;
                    rotateTimes = 1500;
                    map3D.rotateMode({
                        rotateState : rotateStates,
                        pitchAngle : pitchAngles,
                        rotateAngle : rotateAngles,
                        rotateTime : rotateTimes
                    });
                    break;
                // 0视角
                case "zeroView":
                    rotateStates = false;
                    pitchAngles = -11;
                    rotateAngles = 0;
                    rotateTimes = 1500;
                    map3D.rotateMode({
                        rotateState : rotateStates,
                        pitchAngle : pitchAngles,
                        rotateAngle : rotateAngles,
                        rotateTime : rotateTimes
                    });
                    break;
                // 45视角
                case "fotyFiveView":
                    rotateStates = false;
                    pitchAngles = -45;
                    rotateAngles = 0;
                    rotateTimes = 1500;
                    map3D.rotateMode({
                        rotateState : rotateStates,
                        pitchAngle : pitchAngles,
                        rotateAngle : rotateAngles,
                        rotateTime : rotateTimes
                    });
                    break;
                // 90视角
                case "ninetyView":
                    rotateStates = false;
                    pitchAngles = -89;
                    rotateAngles = 0;
                    rotateTimes = 1500;
                    map3D.rotateMode({
                        rotateState : rotateStates,
                        pitchAngle : pitchAngles,
                        rotateAngle : rotateAngles,
                        rotateTime : rotateTimes
                    });
                    break;
                /** 漫游模式**/
                // 步行
                case "walk":
                    roamMode("onWalk");
                    roamModeState = 0;
                    break;
                // 车行
                case "drive":
                    roamMode("onDrive");
                    roamModeState = 0;
                    break;
                // 飞行
                case "fly":
                    roamMode("onFly");
                    roamModeState = 0;
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 查询结果---详情定位
     *
     * @param x,经度
     * @param y,纬度
     * @param id,数据id
     */
    function flyParticularsPostion(x, y, id) {
        // 清除所有标记
        $(".map_ss_jg_lb").val(0);
        $(".map_ss_jg_lb").children('.lb_dw').removeClass('lb_dwclick');
        $(".map_ss_jg_lb").children('.map_ss_jg_lb_menu_icon').hide();
        /** 飞行定位**/
        var height = 100;// 高程
        var Azimuth = 0;// 旋转角
        var Pitch = -0.5;// 俯仰角
        var range = 500;// 可视距离
        var time = 3;// 延迟时间
        var lon = x;// 经度
        var lat = y;// 纬度
        if ((lon != "null") && (lat != "null")) {
            map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
        }
        // 特定标记
        $("#" + id).val(1);
        $('#' + id).children('.lb_dw').addClass('lb_dwclick');
        $('#' + id).children('.map_ss_jg_lb_menu_icon').show();
    }

    /**
     * 视点定位
     *
     * @param lon,经度
     * @param lat,纬度
     * @param height,高程
     * @param Azimuth,方位角
     * @param Pitch,倾斜角
     * @param range,范围
     * @param id,数据id
     */
    function flyViewPoint(lon, lat, height, Azimuth, Pitch, range, id) {
        // 清除所有标记
        $('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass(
                'map_dttc_qxsy_xhclick');
        /** 飞行定位**/
        var time = 3;// 延迟时间
        if ((lon != "null") && (lat != "null")) {
            map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
        }
        // 特定标记
        $('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');
    }

    /**
     * 热点飞行定位
     *
     * @param id,数据id
     */
    function hotPointFlyPostion(id) {
        switch (id) {
        // 海康威视
        case "address0":
            parent.map3D.flyPosition(120.2161886949898,30.21208647541144,
                    63.70232508983463,4.351113551310101,-0.6722756375833641,
                    528.9511815746299,3);
            break;
        // 市民中心
        case "address1":
            parent.map3D.flyPosition(120.205391388888, 30.2490975, 0.0, 0,
                    -0.25 * 3.14, 1000, 3);
            break;
        // 钱江新城
        case "address2":
            parent.map3D.flyPosition(120.205391388888, 30.2490975, 0.0, 0,
                    -0.25 * 3.14, 2000, 3);
            break;
        // 西湖文化广场
        case "address3":
            parent.map3D.flyPosition(120.1584425, 30.2788355555555, 0.0, 0,
                    -0.25 * 3.14, 1000, 3);
            break;
        // 西湖景区
        case "address4":
            parent.map3D.flyPosition(120.1465092, 30.2605376, 0.0, 0, -0.25 * 3.14,
                    1000, 3);
            break;
        // 火车东站
        case "address5":
            parent.map3D.flyPosition(120.208625833333, 30.2939169444444, 0.0, 0,
                    -0.25 * 3.14, 1000, 3);
            break;
        default:
            break;
        }
    }

    /*******************************************************************属性查询(Start)**********************************************************************/
    /**
     * 气泡框(新版)
     */
    // function creatTip(layer) {// 创建气泡图层
    // layer = map3D.createTipLayer();
    // return layer;
    // }
    // function addTip(layer, x, y, z, name) {// 添加气泡和属性值
    // map3D.tip(layer, x, y, z, name);
    // }
    // function deleteTip(layer, x, y, z) {// 删除气泡
    // map3D.clearTip(layer, x, y, z);
    // };

    /** 气泡框(旧版)**/
    /**
     * 创建气泡图层
     *
     * @param slayer,图层
     * @param editLayer,图层
     * @return shps,,图层集合
     */
    function creatAttributeTip(slayer, editLayer) {
        var shps = map3D.loadTip(slayer, editLayer);
        return shps;
    }
    /**
     * 添加气泡和属性值
     *
     * @param editLayer,图层
     * @param x,经度
     * @param y,纬度
     * @param z,高程
     * @param name,列表节点
     */
    function addAttributeTip(editLayer, x, y, z, name) {
        map3D.addTip(editLayer, x, y, z, name);
    }
    /**
     * 删除气泡
     *
     * @param layer,图层
     */
    function deleteAttributeTip(layer) {
        map3D.removelayer(layer);
    };
    /*******************************************************************属性查询(End)**********************************************************************/

    /*******************************************************************行政区域面(Start)**********************************************************************/
    /** 行政区域面展示**/
    var SDKevent;
    var layermap = [];
    var graphics = null;
    var graphicsState = true;
    var graphicsArray = [];
    /**
     * 自动绘制图像
     *
     * @param id,数据id
     * @param areaShp,数据点集
     */
    function administrativeDisplay(id,areaShp) {
        var tempArray = [];
        SDKevent = map3D.sdkEvent();//注册事件
        var pointSet = "120.198465466,30.2023873212,-723.24397258;120.215375477,30.2101883054,4.54664269928;120.212646424,30.2069003064,-709.308494224;120.215713876,30.21375919,4.54879854806;120.212259171,30.2118685816,4.54912788142;120.198502208,30.202424563,-723.184973368;";
    //	var pointSet =  areaShp;
        delEvent();
        var graphic = map3D.addGraphics(2,{
            pointSet 		: pointSet,
            liftUp   		: "10",
            drawLineColor	: "0.24,0.53,1,1",
            drawFaceColor	: "0.24,0.44,0.59,0.6"
        });//0 是矩形  1是圆   2是多边形   3是线
        layermap[graphic.GetLayerID()] = graphic;
        // 用于控制显隐
        var graphicsObj = {};
        graphicsObj.id = id;
        graphicsObj.graphic = graphic;
        graphicsArray.push(graphicsObj);
        SDKevent.attachEvent("FireOnLayerNotify", graphicEvent);
        graphics = graphic;
    }
    /**
     * 图形清除
     */
    function delEvent() {
        var points;
        SDKevent.detachEvent("FireOnLayerNotify", graphicEvent);
        if(graphics != null && graphics != undefined){
            var opt = graphics.GetLayerResult();
            points = opt.GetConfigValueByKey("Points");
            if(points == "" || points == undefined){
                map3D.updateGraphics(graphics);
            }
        }
    }
    /**
     * 响应器
     *
     * @param layerid,数据id
     * @param type,,数据类型
     */
    function graphicEvent(layerid , type){
        var points;
        var layer = layermap[layerid];
        var opt = layer.GetLayerResult();
        if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_draw2dobject"){
            points = opt.GetConfigValueByKey("Points");
        }
        SDKevent.detachEvent("FireOnLayerNotify", graphicEvent);
    }
    /*******************************************************************行政区域面(End)**********************************************************************/

    /*******************************************************************路径管理(Start)**********************************************************************/
    var dynamicPathLayer;
    var playArray = {};
    /**
     * 录制
     *
     * @param lnglats,路径点集
     * @param viewModel,视角参数
     */
    function addPath(lnglats,viewModel) {
        var str = '';
        var strArray = viewModel.split("|");
        for(var i =0;i<strArray.length;i++){
            if(i==0){
                str += strArray[i];
            }else{
                str += (","+strArray[i]);
            }
        }
        dynamicPathLayer = map3D.addRoamPath(lnglats,str,10);// API
    //    dynamicPathLayer = map3D.addRoamPathOld(lnglats,str,true);
    }
    var playState = 0;
    var pointId ='';
    /**
     * 播放
     *
     * @param id,数据id
     * @param lnglats,路径点集
     * @param viewModel,视角参数
     */
    function play(id,lnglats,viewModel){
        if(playArray[id]==undefined){
            addPath(lnglats,viewModel);
            playArray[id] = dynamicPathLayer;
        }
        map3D.playRoamPath(playArray[id]);// API
    //    map3D.playRoamPathOld(playArray[id],10);
    }
    /**
     * 暂停
     *
     * @param id,数据id
     */
    function pause(id){
        if(playArray[id]!=undefined){
            map3D.pauseRoamPath(playArray[id]);// API
    //        map3D.pauseRoamPathOld(playArray[id]);
        }
    }
    /**
     * 停止
     *
     * @param id,数据id
     */
    function stop(id){
        if(playArray[id]!=undefined){
            map3D.stopRoamPath(playArray[id]);// API
    //        map3D.stopRoamPathOld(playArray[id]);
        }
        if(playArray[id]!=null){
            playArray[id].SetVisible(false);
        }
    }
    /*******************************************************************路径管理(End)**********************************************************************/
