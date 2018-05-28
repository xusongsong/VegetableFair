package com.coorun.entity;

/**
 * 视频监控信息
 * @author shine
 *@date 2018-03-25
 */
public class VideoInfo {
	
	//通道Id
	private String cameraId;
	//索引编号
	private String indexCode;
	//控制点名称
	private String name;
	//控制中心Id
	private String parentIndexCode;
	//摄像机类型(0枪机,1半球,2快球3带云台枪机)
	private String cameraType;
	//摄像头像素
	private String pixel;
	//纬度(WGS84坐标系)
	private String latitude;
	//经度(WGS84坐标系)
	private String longitude;
	//描述
	private String description;
	//是否在线(1在线,0不在线)
	private String isOnline;
	//控制中心名称
	private String controlUnitName;
	//解码标签
	private String decodeTag;
	//创建时间
	private String createTime;
	//更新时间
	private String updateTime;
	
	public String getCameraId() {
		return cameraId;
	}
	public void setCameraId(String cameraId) {
		this.cameraId = cameraId;
	}
	public String getIndexCode() {
		return indexCode;
	}
	public void setIndexCode(String indexCode) {
		this.indexCode = indexCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentIndexCode() {
		return parentIndexCode;
	}
	public void setParentIndexCode(String parentIndexCode) {
		this.parentIndexCode = parentIndexCode;
	}
	public String getCameraType() {
		return cameraType;
	}
	public void setCameraType(String cameraType) {
		this.cameraType = cameraType;
	}
	public String getPixel() {
		return pixel;
	}
	public void setPixel(String pixel) {
		this.pixel = pixel;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getIsOnline() {
		return isOnline;
	}
	public void setIsOnline(String isOnline) {
		this.isOnline = isOnline;
	}
	public String getControlUnitName() {
		return controlUnitName;
	}
	public void setControlUnitName(String controlUnitName) {
		this.controlUnitName = controlUnitName;
	}
	public String getDecodeTag() {
		return decodeTag;
	}
	public void setDecodeTag(String decodeTag) {
		this.decodeTag = decodeTag;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	@Override
	public String toString() {
		return "VideoInfo [cameraId=" + cameraId + ", indexcode=" + indexCode + ", name=" + name + ", parentIndexCode="
				+ parentIndexCode + ", cameraType=" + cameraType + ", pixel=" + pixel + ", latitude=" + latitude
				+ ", longitude=" + longitude + ", description=" + description + ", isOnline=" + isOnline
				+ ", controlUnitName=" + controlUnitName + ", decodeTag=" + decodeTag + ", createTime=" + createTime
				+ ", updateTime=" + updateTime + "]";
	}
	
}