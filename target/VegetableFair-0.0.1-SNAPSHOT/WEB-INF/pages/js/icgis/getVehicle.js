/**
 * Created by yangmumu on 2018/3/21.
 */
/**
 * 当前vehicle列表查询
 */

$(document).ready(function(){
    //点击查询时查询当前列表信息
    $("#vehicleSearch").unbind('click').click(function(){
        //调用父页面模糊查询方法
        var data = parent.searchVehicleListByDate();
        searchVehicleList(data);
    });
    //点击伸缩当前iframe
    $("#vehicleFlex").unbind('click').click(function(){
        $(this).toggleClass('xzclick');
        $(this).parents('.mj_jl').find('.mj_jl_btm').toggle();
        //若已展开则关闭
        if($("#vehicleFlex").hasClass("xz xzclick")){
            parent.closeVehicleLogMenu();
        }else{//若已关闭则展开
            parent.openVehicleLogMenu();
        }
    });
});


/**
 * 初始化的时候获取vehicle列表记录
 */
function getVehicleLogFir(){
    var data  = parent.getVehicleLogData();
    searchVehicleList(data);
}

/**
 *查询vehicle记录列表
 */
function searchVehicleList(data){
    if(data.success == '1'){
        var wifiList = createVehicleList(data);
        $("#vehicleListSearch").html(wifiList);
    }
}
/**
 * 创建vehicle记录列表
 * @param data
 * @returns {String}
 */
function createVehicleList(data){
    var wifiList = '';
    var wifiLogs = data.record;
    if(wifiLogs.length == 0){//若查询的结果集为空
        for(var j = 0; j < 6;j++){
            wifiList += '<tr>';
            wifiList += '<td valign="middle" align="center"></td>';
            wifiList += '<td valign="middle" align="center"></td>';
            wifiList += '<td valign="middle" align="center"></td>';
            wifiList += '<td valign="middle" align="center"></td>';
            wifiList += '<td valign="middle" align="center"></td>';
            wifiList += '<td valign="middle" align="center"></td>';
            wifiList += '</tr>';
        }
    }else{//若查询的结果集有值
        for(var i = 0 ; i < wifiLogs.length; i++){
            var wifiLog = wifiLogs[i];
            wifiList += '<tr>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.id +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.carId +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.deviceName +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.date +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.userName +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.carType +'</td>';
            wifiList += '</tr>';
        }
    }
    return wifiList;
}