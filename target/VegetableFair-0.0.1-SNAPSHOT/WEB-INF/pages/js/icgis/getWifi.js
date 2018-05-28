/**
 * Created by yangmumu on 2018/3/15.
 */
/**
 * 当前wifi列表查询
 */

$(document).ready(function(){
    // getWifiLogFir();
    //点击查询时查询当前列表信息
    $("#wifiSearch").unbind('click').click(function(){
        //调用父页面模糊查询方法
        var data = parent.searchWifiListByDate();
        searchWifiList(data);
    });
    //点击伸缩当前iframe
    $("#wifiFlex").unbind('click').click(function(){
        $(this).toggleClass('xzclick');
        $(this).parents('.mj_jl').find('.mj_jl_btm').toggle();
        //若已展开则关闭
        if($("#wifiFlex").hasClass("xz xzclick")){
            parent.closeWifiLogMenu();
        }else{//若已关闭则展开
            parent.openWifiLogMenu();
        }
    });
});


/**
 * 初始化的时候获取wifi列表记录
 */
function getWifiLogFir(){
    var data  = parent.getWifiLogData();
    searchWifiList(data);
}

/**
 *查询wifi记录列表
 */
function searchWifiList(data){
    if(data.success == '1'){
        var wifiList = createWifiList(data);
        $("#wifiListSearch").html(wifiList);
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
            wifiList += '</tr>';
        }
    }else{//若查询的结果集有值
        for(var i = 0 ; i < wifiLogs.length; i++){
            var wifiLog = wifiLogs[i];
            wifiList += '<tr>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.num +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.MACAddress +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.signalStrength +'</td>';
            wifiList += '<td valign="middle" align="center">'+ wifiLog.time +'</td>';
            wifiList += '</tr>';
        }
    }
    return wifiList;
}