/**
 * 调用大华ocx插件方法播放视频
 * @author shine
 * @data 2017-3-14
 */

var gWndId = 0;
var bLogin = 0;

$(document).ready(function(){
	//点击标注关闭传递参数到父页面
	$("#videoCancle").unbind('click').click(function(){
		parent.cancelVideo();
	});
});

/**
 * 加载视频资源
 */
function init(){
	//获取DPSDK控件对象
	var channel_id = parent.videoPlayChannel;
	var obj = document.getElementById("DPSDK_OCX");
    gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);
	ButtonCreateWnd_onclick();
	obj.DPSDK_Login(parent.videoPlayIP, parent.videoPlayPort, parent.videoPlayUserName, parent.videoPlayPass);
	bLogin = 1;
	obj.DPSDK_AsyncLoadDGroupInfo();
	var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
	obj.DPSDK_DirectRealplayByWndNo(gWndId, nWndNo, channel_id, 1, 1, 1);
}

/**
 * 创建视频显示弹窗
 */
function ButtonCreateWnd_onclick() 
{
	var obj = document.getElementById("DPSDK_OCX");//创建DPSDK对象
    var nWndCount = 1;//获取窗口数
    obj.DPSDK_SetWndCount(gWndId, nWndCount); //设置窗口数量
	obj.DPSDK_SetSelWnd(gWndId, 0); 
}

/**
 * 登出时注销用户
 */
function ButtonLogout_onclick() 
{
    var obj = document.getElementById("DPSDK_OCX");
    if( bLogin == 1)
	{
        obj.DPSDK_Logout();
	    bLogin = 0;
	}
}

/**
 * 根据通道ID连接DMS
 */
function ButtonConnectDmsByChnlId_onclick()
{
	//获取obj地图对象
	var obj = document.getElementById("DPSDK_OCX");
	var szCameraId = parent.videoPlayChannel;
	var nRet = obj.DPSDK_ConnectDmsByChnlId(szCameraId);
	//ShowCallRetInfo(nRet, "根据通道ID连接DMS");
}

/**
 * 云台控制球机转动方向
 * @param nDirects(上:1,下:2,左:3,右:4,左上:5,左下:6,右上:7,右下:8)
 */
function ButtonPtzDirection_onclick(nDirects)
{
	var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = parent.videoPlayChannel;
    nDirect = nDirects;
    var nStep = parent.pdvrSteap;
    //球机方向控制
    obj.DPSDK_PtzDirection(szCameraId, nDirect, nStep, 0);
}
/**
 * 停止球机转动
 * @param bStop(停止:1)
 */
function ButtonPtzDirection_onclickStop(bStop)//停止:bStop=1
{
	var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = parent.videoPlayChannel;
    var nStep = parent.pdvrSteap;
    obj.DPSDK_PtzDirection(szCameraId, nDirect, nStep, bStop);
}