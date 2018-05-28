package com.coorun.entity;

/**
 * 场景管理-视点
 * 
 * @author DL
 * @createDate 2017-10-11
 */
public class ViewResult {
	// ID
	private String id;
	// 关键字
	private String name;
	// 经度
	private String longitude;
	// 纬度
	private String latitude;
	// 高程
	private String elevation;
	// 旋转角
	private String rotateAngle;
	// 俯仰角
	private String overAngle;
	// 可视范围
	private String range;
	// 备注
	private String descr;

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

	public String getDescr() {
		return descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

}
