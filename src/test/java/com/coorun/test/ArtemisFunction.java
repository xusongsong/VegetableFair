package com.coorun.test;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import com.hikvision.artemis.sdk.ArtemisHttpUtil;
import com.hikvision.artemis.sdk.config.ArtemisConfig;

public class ArtemisFunction {
private static String ARTEMIS_PATH;
static {
ARTEMIS_PATH = "/artemis";
}
public static void main(String[] args) {
	
if (ARTEMIS_PATH.equals("/artemis")) {


String   result  = new ArtemisFunction().getInfo("0","10","desc","desc");

System.out.println(result);

}
}
public  String getInfo(String indexCode, String deviceCode, String pageNo , String pageSize){
	

	ArtemisConfig.host ="open8200.hikvision.com";
	/*网关服务器ip端口*/
	ArtemisConfig.appKey ="25682378";
	/*秘钥appkey*/
	ArtemisConfig.appSecret ="oukBFBgSbQVX3j0fELmI";
	/*秘钥appSecret */

	
	final String url = ARTEMIS_PATH + "/api/common/v1/remoteCameraInfoRestService/findCameraInfoPage";
	Map<String, String> path = new HashMap<String, String>(2){
		{
			put("https://", url);
		}
	};
		
	Map<String,String> paramMap = new HashMap<String,String>();
	//post 请求 Form 表单参数
//	paramMap.put("appKey", "26208115");
	paramMap.put("pageNo", "1");
	paramMap.put("pageSize", "10");
	String   result   =   ArtemisHttpUtil.doGetArtemis(path, paramMap, null, null);
	return result;
}
}
