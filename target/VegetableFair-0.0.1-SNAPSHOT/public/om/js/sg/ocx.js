$(function () {

    //延迟初始化
    $(document).ready(function () {
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
    });

    //初始化
    function init() {
        var OCXobj = document.getElementById("PlayViewOCX");
        var txtInit = $("#config").val();
        OCXobj.ContainOCX_Init(txtInit);
    }

    //提交按钮
    $('.submit').on('click', function () {
        var PalyType = $('.PalyType').val();
        var SvrIp = $('.SvrIp').val();
        var SvrPort = $('.SvrPort').val();
        var appkey = $('.appkey').val();
        var appSecret = $('.appSecret').val();
        var time = $('.time').val();
        var timeSecret = $('.timeSecret').val();
        var httpsflag = $('.httpsflag').val();
        var CamList = $('.CamList').val();

        var param = 'ReqType:' + PalyType + ';' + 'SvrIp:' + SvrIp + ';'+'WndCount: 1'+';' + 'SvrPort:' + SvrPort + ';' + 'Appkey:' + appkey + ';' + 'AppSecret:' + appSecret + ';' + 'time:' + time + ';' + 'timesecret:' + timeSecret + ';' + 'httpsflag:' + httpsflag + ';' + 'CamList:' + CamList + ';';
		alert(param);
        play_ocx_do(param);

    });

    //exe弹出
    $('.exe').on('click', function () {
        var PalyType = $('.PalyType').val();
        var SvrIp = $('.SvrIp').val();
        var SvrPort = $('.SvrPort').val();
        var appkey = $('.appkey').val();
        var appSecret = $('.appSecret').val();
        var time = $('.time').val();
        var timeSecret = $('.timeSecret').val();
        var httpsflag = $('.httpsflag').val();
        var CamList = $('.CamList').val();
        //主要是添加了'hikvideoclient://' 和 'VersionTag:artemis'2段字符串 
        var param = 'hikvideoclient://ReqType:' + PalyType + ';' + 'VersionTag:artemis' + ';' + 'SvrIp:' + SvrIp + ';' + 'SvrPort:' + SvrPort + ';' + 'Appkey:' + appkey + ';' + 'AppSecret:' + appSecret + ';' + 'time:' + time + ';' + 'timesecret:' + timeSecret + ';' + 'httpsflag:' + httpsflag + ';' + 'CamList:' + CamList + ';';

        document.getElementById("url").src = param;

    });



    ////OCX控件视频处理函数
    function play_ocx_do(param) {
        if ("null" == param || "" == param || null == param || "undefined" == typeof param) {
            return;
        } else {
            var OCXobj = document.getElementById("PlayViewOCX");
            OCXobj.ContainOCX_Do(param);
        }
    }
});