package com.coorun.entity;

/**
 * 标注对象封装
 * @author lixiang
 *
 */
public class LabelResult {
	private String id;// ID
	private String name;// 关键字
	private String longitude;// 经度
	private String latitude;// 纬度
	private String elevation;// 高程
	private String rotateAngle;// 旋转角
	private String overAngle;// 俯仰角
	private String range;// 可视范围
	private String memo;// 备注
	private String userId;// 用户ID 

	public LabelResult(String id, String name, String longitude, String latitude, String elevation, String rotateAngle,
			String overAngle, String range, String totalRecords) {
		super();
		this.id = id;
		this.name = name;
		this.longitude = longitude;
		this.latitude = latitude;
		this.elevation = elevation;
		this.rotateAngle = rotateAngle;
		this.overAngle = overAngle;
		this.range = range;
	}
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public LabelResult() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getElevation() {
		return elevation;
	}

	public void setElevation(String elevation) {
		this.elevation = elevation;
	}

	public String getRotateAngle() {
		return rotateAngle;
	}

	public void setRotateAngle(String rotateAngle) {
		this.rotateAngle = rotateAngle;
	}

	public String getOverAngle() {
		return overAngle;
	}

	public void setOverAngle(String overAngle) {
		this.overAngle = overAngle;
	}

	public String getRange() {
		return range;
	}

	public void setRange(String range) {
		this.range = range;
	}

	@Override
	public String toString() {
		return "LabelResult [id=" + id + ", name=" + name + ", longitude=" + longitude + ", latitude=" + latitude
				+ ", elevation=" + elevation + ", rotateAngle=" + rotateAngle + ", overAngle=" + overAngle + ", range="
				+ range + ",  memo=" + memo +",userId="+userId+"]";
	}

}
