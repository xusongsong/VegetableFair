<html>
<meta charset="utf-8" />

<head>
    <link rel="stylesheet" href="../预览/ocx.css" />
</head>
<style>
	.close{width: 12px;height: 12px;background: url(gb_btn.png);display: block;float: right;margin-top: 9px;margin-right: 10px;cursor: pointer;
	}
	</style>
<body>
    <div class="func-point" style="width:500px;height:30px;background-color:#3794e0" ><span class="close"></span></div>
    <div class="video-position" style="width:500px; height:500px">
        <p class="pop" style="display:block">加载失败</p>
        <input type="hidden" name="config" id="config" value="ReqType:PlayReal;wndcount:1" />
        <object classid="CLSID:7E393848-7238-4CE3-82EE-44AF444B240A" id="PlayViewOCX" wmode="opaque" width="0" height="0" name="PlayViewOCX">
        </object>
    </div>



    <div class="form">


        <label for="PalyType">PalyType:</label>
        <br />
        <input type="text" class="PalyType text" value="PlayReal" />
        <br />
        <label for="SvrIp">SvrIp:</label>
        <br />
        <input type="text" class="SvrIp text" value="open8200.hikvision.com" />
        <br />
        <label for="SvrPort">SvrPort:</label>
        <br />
        <input type="text" class="SvrPort text" value="443" />
        <br />
        <label for="appkey">appkey:</label>
        <br />
        <input type="text" class="appkey text" value="" />
        <br />
        <label for="appSecret">appSecret:</label>
        <p class="ppp">(这里填的不是直接提供的appSecret,而是调用接口后加密的appSecret)</p>
        <br />
        <input type="text" class="appSecret text" />
        <br />
        <label for="time">time:</label>
        <br />
        <input type="text" class="time text" />
        <br />
        <label for="timeSecret">timeSecret:</label>
        <br />
        <input type="text" class="timeSecret text" />
        <br />
        <label for="httpsflag">httpsflag:</label>
        <br />
        <input type="text" class="httpsflag text" value="1" />
        <br />
        <label for="CamList">CamList:</label>
        <br />
        <input type="text" class="CamList text" value="" />
        <br />
        <input type="submit" class="submit" value="视频预览播放" />
    </div>
    <div>
        <p>CamList去
            <a href="https://open8200.hikvision.com/artemis/portal/documentCenter/showDocumentCenter?docId=67#api11" target="_blank">api网关</a>'分页获取监控点信息接口'点击'在线测试'获取
        </p>
        <p>appSecret, time, timeSecret去
            <a href="https://open8200.hikvision.com/artemis/portal/documentCenter/showDocumentCenter?docId=170#api4" target="_blank">api网关</a>'根据appKey获取加密协议接口'点击'在线测试'获取
        </p>
    </div>

    
<div class="videoview">
    <button class="exe" value="exe窗口">exe窗口</button>
    <p>点击'exe窗口'按钮会弹出播放器</p>
    <!-- 这个弹出播放器的模式没有浏览器的要求 实际使用中在页面添加个'iframe'标签  -->
    <!-- 通过赋予这个'iframe'标签 'src'属性来弹出播放器 -->
        
    <iframe width=0 height=0 id="url"></iframe>
</div>

    <script type="text/javascript" src="..//预览/jquery-1.12.1.js"></script>
    <script type="text/javascript" src="..//预览/ocx.js"></script>



</body>

</html>