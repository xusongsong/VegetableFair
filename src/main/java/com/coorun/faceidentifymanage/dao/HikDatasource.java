package com.coorun.faceidentifymanage.dao;

import com.alibaba.druid.util.StringUtils;
import com.coorun.factory.ArtemisFactory;
import com.hikvision.artemis.sdk.ArtemisHttpUtil;
import com.hikvision.artemis.sdk.config.ArtemisConfig;
import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;

public class HikDatasource {

    private String host;
    private String appKey;
    private String appSecret;
    private Logger LOG = Logger.getLogger(HikDatasource.class);

    /**
     * Get请求
     *
     * @param path 数据请求地址
     * @param paramMap 参数集合
     * @return 请求到的数据
     */
    public String doGet(String path, Map<String,String> paramMap) {
        Map<String, String> requestPath = getRequestPath(path);
        return ArtemisFactory.getResultFromCache(requestPath, paramMap);
    }

    /**
     * Post请求
     *
     * @param path 数据请求地址
     * @param paramMap 参数集合
     * @return 请求到的数据
     */
    public String doPost(String path, String body, Map<String,String> paramMap) {
        Map<String, String> reqpath = getRequestPath(path);
        return ArtemisHttpUtil.doPostStringArtemis(reqpath, body, paramMap, null, "application/json;charset=utf-8");
    }

    /**
     * 获取请求地址
     * @param url 接口请求地址
     * @return 地址参数
     */
    private Map<String, String> getRequestPath(final String url) {
        LOG.debug("请求地址: " + url);
        Map<String, String> path = new HashMap<String, String>(2){
            {
                put("https://", url);
            }
        };
        return path;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        LOG.debug("设置访问地址: " + host);
        if (StringUtils.equals(this.host, host)) {
            return;
        }

        if (host != null) {
            host = host.trim();
        }

        ArtemisConfig.host = host;
        this.host = host;
    }

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        LOG.debug("设置秘钥 appkey : " + appKey);
        if (StringUtils.equals(this.appKey, appKey)) {
            return;
        }

        if (appKey != null) {
            appKey = appKey.trim();
        }

        ArtemisConfig.appKey = appKey;
        this.appKey = appKey;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        LOG.debug("秘钥 appSecret  : " + appSecret);
        if (StringUtils.equals(this.appSecret, appSecret)) {
            return;
        }

        if (appSecret != null) {
            appSecret = appSecret.trim();
        }

        ArtemisConfig.appSecret = appSecret;
        this.appSecret = appSecret;
    }

    public static void main(String[] args) {
        HikDatasource hik = new HikDatasource();
//        hik.setHost("37.88.50.41:9999");
//        hik.setAppKey("26208115");
//        hik.setAppSecret("Q9GM11oUW74AkOcc0Gq9");

        hik.setHost("open8200.hikvision.com");
        hik.setAppKey("25682378");
        hik.setAppSecret("oukBFBgSbQVX3j0fELmI");

        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("appKey", "25682378");
        System.out.println(hik.doGet("/artemis" +  "/api/mss/v2/fms/getAlarmTopic", paramMap));
    }
}
