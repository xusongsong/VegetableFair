package com.coorun.entity;

/**
 * 配置文件
 * 
 * @author DL
 * @createDate 2017-09-21
 */
public class ConfigBean {
	/** 服务IP **/
	private String serverIP;
	/** 服务端口 **/
	private String serverPort;
	/** 服务授权的IP **/
	private String authorizeIP;
	/** 服务授权的Port **/
	private String authorizePort;
	/** OMIP **/
	private String projectIP;
	/** OMPort **/
	private String projectPort;
	/** CMSIP **/
	private String CMSIP;
	/** CMSPort **/
	private String CMSPort;
	/** 7.0默认加载数据类型 **/
	private String defaultLoadType;
	/** 7.0数据类型 **/
	private String dataType;
	/** 默认加载的DOM(影像)年份 **/
	private String defaultDOMDateValue;
	/** 默认加载的DOM(影像)月份 **/
	private String defaultDOMMonthValue;
	/** 默认加载的DEM(地形)年份 **/
	private String defaultDEMDateValue;
	/** 默认加载的DEM(地形)月份 **/
	private String defaultDEMMonthValue;
	/** arcgis服务是否开启 **/
	private String arcgis;
	/** arcgis服务地址 **/
	private String arcgisPath;
	/** 服务类型 **/
	private String serverType1;
	/** 区域编码 **/
	private String serverAreacode1;
	/**网关服务器ip端口**/
	private String artemisHost;
	/**秘钥appkey**/
	private String artemisAppKey;
	/**秘钥appSecret**/
	private String artemisAppSecret;
	/**视频播放类型**/
	private String playType;
	/**是否开启实时推送**/
	private String realPush;
	
	public String getRealPush(){
		return realPush;
	}

	public void setRealPush(String realPush) {
		this.realPush = realPush;
	}

	public String getProjectIP() {
		return projectIP;
	}

	public void setProjectIP(String projectIP) {
		this.projectIP = projectIP;
	}

	public String getProjectPort() {
		return projectPort;
	}

	public void setProjectPort(String projectPort) {
		this.projectPort = projectPort;
	}

	public String getCMSIP() {
		return CMSIP;
	}

	public void setCMSIP(String cMSIP) {
		CMSIP = cMSIP;
	}

	public String getCMSPort() {
		return CMSPort;
	}

	public void setCMSPort(String cMSPort) {
		CMSPort = cMSPort;
	}

	public String getServerIP() {
		return serverIP;
	}

	public void setServerIP(String serverIP) {
		this.serverIP = serverIP;
	}

	public String getServerPort() {
		return serverPort;
	}

	public void setServerPort(String serverPort) {
		this.serverPort = serverPort;
	}

	public String getAuthorizeIP() {
		return authorizeIP;
	}

	public void setAuthorizeIP(String authorizeIP) {
		this.authorizeIP = authorizeIP;
	}

	public String getAuthorizePort() {
		return authorizePort;
	}

	public void setAuthorizePort(String authorizePort) {
		this.authorizePort = authorizePort;
	}

	public String getDefaultLoadType() {
		return defaultLoadType;
	}

	public void setDefaultLoadType(String defaultLoadType) {
		this.defaultLoadType = defaultLoadType;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getDefaultDOMDateValue() {
		return defaultDOMDateValue;
	}

	public void setDefaultDOMDateValue(String defaultDOMDateValue) {
		this.defaultDOMDateValue = defaultDOMDateValue;
	}

	public String getDefaultDOMMonthValue() {
		return defaultDOMMonthValue;
	}

	public void setDefaultDOMMonthValue(String defaultDOMMonthValue) {
		this.defaultDOMMonthValue = defaultDOMMonthValue;
	}

	public String getDefaultDEMDateValue() {
		return defaultDEMDateValue;
	}

	public void setDefaultDEMDateValue(String defaultDEMDateValue) {
		this.defaultDEMDateValue = defaultDEMDateValue;
	}

	public String getDefaultDEMMonthValue() {
		return defaultDEMMonthValue;
	}

	public void setDefaultDEMMonthValue(String defaultDEMMonthValue) {
		this.defaultDEMMonthValue = defaultDEMMonthValue;
	}

	public String getArcgis() {
		return arcgis;
	}

	public void setArcgis(String arcgis) {
		this.arcgis = arcgis;
	}

	public String getArcgisPath() {
		return arcgisPath;
	}

	public void setArcgisPath(String arcgisPath) {
		this.arcgisPath = arcgisPath;
	}

	public String getServerType1() {
		return serverType1;
	}

	public void setServerType1(String serverType1) {
		this.serverType1 = serverType1;
	}

	public String getServerAreacode1() {
		return serverAreacode1;
	}

	public void setServerAreacode1(String serverAreacode1) {
		this.serverAreacode1 = serverAreacode1;
	}

	public String getArtemisHost() {
		return artemisHost;
	}

	public void setArtemisHost(String artemisHost) {
		this.artemisHost = artemisHost;
	}

	public String getArtemisAppKey() {
		return artemisAppKey;
	}

	public void setArtemisAppKey(String artemisAppKey) {
		this.artemisAppKey = artemisAppKey;
	}

	public String getArtemisAppSecret() {
		return artemisAppSecret;
	}

	public void setArtemisAppSecret(String artemisAppSecret) {
		this.artemisAppSecret = artemisAppSecret;
	}

	public String getPlayType() {
		return playType;
	}

	public void setPlayType(String playType) {
		this.playType = playType;
	}

}
