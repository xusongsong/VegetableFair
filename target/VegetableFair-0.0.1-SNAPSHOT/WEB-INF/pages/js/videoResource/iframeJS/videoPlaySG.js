/**
 * @author shine
 * @date 2018-04-02
 * 视频播放方法汇总
 */

$(document).ready(function(){
	delayInit();//初始化加载
	//点击标注关闭传递参数到父页面
	$("#cancelVideo").unbind('click').click(function(){
		parent.cancelPreviewVideo();
	});
});

/**
 * 视频延迟初始化加载
 * @returns
 */
function delayInit(){
 setTimeout(function () {
        init();
    }, 500);
    setTimeout(function () {
        $('#PlayViewOCX').css({
            'width': '100%',
            'height': '100%'
        });
        $('.pop').hide();
    }, 4000);
}

/**
 * 视频初始化
 * @returns
 */
function init() {
    var OCXobj = document.getElementById("PlayViewOCX");
    var txtInit = $("#config").val();
    OCXobj.ContainOCX_Init(txtInit);
    //默认播放视频
    videoPlay();
}

/**
 * 视频播放方法
 * @returns
 */
function videoPlay() {
	//调用父层级方法获取参数集
   	var videoParam = parent.getVideoParam();
   	if(videoParam == null){
   		return;
   	}
   	//拼接参数信息
    var param = 'ReqType:' + videoParam.palyType + ';' + 'SvrIp:' + videoParam.SvrIp + ';'+'WndCount: 1'+';' + 'SvrPort:' + videoParam.SvrPort + ';' + 'Appkey:' + videoParam.artemisAppKey + ';' + 'AppSecret:' + videoParam.appSecret + ';' + 'time:' + videoParam.time + ';' + 'timesecret:' + videoParam.timeSecret + ';' + 'httpsflag:' + videoParam.httpsflag + ';' + 'CamList:' + videoParam.CamList + ';';
    //调用OCX视频处理函数
    play_ocx_do(param);
};

/**
 * 播放弹窗视频(以弹窗显示)
 * @returns
 */
function previewPopVideo(){
	//调用父层级方法播放视频
	parent.previewPopVideo();
}

/**
 * 关闭当前视频
 * @returns
 */
function closeVideo() {
    var param = 'hikvideoclient://VersionTag:artemis;Exit:1;';
    play_ocx_do(param);

};

/**
 * OCX视频处理函数
 * @param param
 * @returns
 */
function play_ocx_do(param) {
    if ("null" == param || "" == param || null == param || "undefined" == typeof param) {
        return;
    } else {
        var OCXobj = document.getElementById("PlayViewOCX");
        //调用底层OCX方法播放视频
        OCXobj.ContainOCX_Do(param);
    }
}
