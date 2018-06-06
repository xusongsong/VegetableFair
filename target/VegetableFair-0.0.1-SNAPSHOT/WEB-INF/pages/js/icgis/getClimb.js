/**
 * Created by yangmumu on 2018/3/20.
 */
$(document).ready(function(){
    // getWifiLogFir();
    //点击查询时查询当前列表信息
    $("#climbSearch").unbind('click').click(function(){
        //调用父页面模糊查询方法
        var data = parent.searchWifiListByDate();
        searchClimbList(data);
    });
    //点击伸缩当前iframe
    $("#climbFlex").unbind('click').click(function(){
        $(this).toggleClass('xzclick');
        $(this).parents('.mj_jl').find('.mj_jl_btm').toggle();
        //若已展开则关闭
        if($("#climbFlex").hasClass("xz xzclick")){
            parent.closeClimbLogMenu();
        }else{//若已关闭则展开
            parent.openClimbLogMenu();
        }
    });
});


/**
 * 初始化的时候获取wifi列表记录
 */
function getClimbLogFir(){
    var data  = parent.getClimbLogData();
    searchClimbList(data);
}

/**
 *查询wifi记录列表
 */
function searchClimbList(data){
    if(data.success == '1'){
        var wifiList = createWifiList(data);
        $("#climbListSearch").html(wifiList);
    }
}
/**
 * 创建wifi记录列表
 * @param data
 * @returns {String}
 */
function createWifiList(data){
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
            wifiList += '<td valign="middle" align="center">'+ wifiLog.Id +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.deviceId +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.time +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.deviceName +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.duration +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.linkDevice +'</td>';
            wifiList += '</tr>';
        }
    }
    return wifiList;
}