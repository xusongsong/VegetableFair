package com.coorun.entity;

/**
 * 根据组织编号获取监控点信息
 * @author lixiang
 *
 */
public class ArtemisByNode {
	
	//通道ID
	private String cameraId;
	//摄像机类型(0枪机,1半球,2快球3带云台枪机)
	private String cameraType;
	//创建时间
	private String createTime;
	//解码标签
	private String decodetag;
	//描述
	private String description;
	//组相机编号
	private String indexCode;
	//是否在线(1在线 0不在线)
	private String isOnline;
	//经度(WGS84坐标系)
	private String latitude;
	//纬度(WGS84坐标系)
	private String longitude;
	//名称
	private String name;
	//父层级编号
	private String parentIndexCode;
	//摄像头像素
	private String pixel;
	//更新时间
	private String updateTime;
	//分页
	private String page;
	//总数
	private String total;
	
	public String getCameraId() {
		return cameraId;
	}
	public void setCameraId(String cameraId) {
		this.cameraId = cameraId;
	}
	public String getCameraType() {
		return cameraType;
	}
	public void setCameraType(String cameraType) {
		this.cameraType = cameraType;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getDecodetag() {
		return decodetag;
	}
	public void setDecodetag(String decodetag) {
		this.decodetag = decodetag;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getIndexCode() {
		return indexCode;
	}
	public void setIndexCode(String indexCode) {
		this.indexCode = indexCode;
	}
	public String getIsOnline() {
		return isOnline;
	}
	public void setIsOnline(String isOnline) {
		this.isOnline = isOnline;
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
	public String getPixel() {
		return pixel;
	}
	public void setPixel(String pixel) {
		this.pixel = pixel;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	
}
