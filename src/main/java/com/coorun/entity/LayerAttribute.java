package com.coorun.entity;

/**
 * 图层(OSGB,BIM,DEM,DOM)属性对象
 * 
 * @author DL
 * @createDate 2017/12/08
 */
public class LayerAttribute {
	/** DOM/DEM **/
	// 年份
	private String year;
	// 数据名
	private String name;
	// 数据别名
	private String ename;
	// 数据路径
	private String url;
	// 生产商
	private String production;
	// 面积
	private String area;
	// 精度
	private String precision;
	// 月份
	private String month;
	/** OSGB/BIM **/
	// 参考坐标系
	private String srs;
	// 偏移值
	private String originPoint;
	// 经度
	private String longitude;
	// 纬度
	private String latitude;
	// 高程
	private String elevation;
	// 旋转角
	private String azimuth;
	// 俯仰角
	private String pitch;
	// 视距范围
	private String range;
	// 数据的范围X向最大值
	private String MaxX;
	// 数据的范围X向最小值
	private String MinX;
	// 数据的范围Y向最大值
	private String MaxY;
	// 数据的范围Y向最小值
	private String MinY;
	// 数据显示的最小层级
	private String MinLevel;
	// 数据显示的最大层级
	private String MaxLevel;

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getProduction() {
		return production;
	}

	public void setProduction(String production) {
		this.production = production;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getPrecision() {
		return precision;
	}

	public void setPrecision(String precision) {
		this.precision = precision;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getSrs() {
		return srs;
	}

	public void setSrs(String srs) {
		this.srs = srs;
	}

	public String getOriginPoint() {
		return originPoint;
	}

	public void setOriginPoint(String originPoint) {
		this.originPoint = originPoint;
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

	public String getAzimuth() {
		return azimuth;
	}

	public void setAzimuth(String azimuth) {
		this.azimuth = azimuth;
	}

	public String getPitch() {
		return pitch;
	}

	public void setPitch(String pitch) {
		this.pitch = pitch;
	}

	public String getRange() {
		return range;
	}

	public void setRange(String range) {
		this.range = range;
	}

	public String getMaxX() {
		return MaxX;
	}

	public void setMaxX(String maxX) {
		MaxX = maxX;
	}

	public String getMinX() {
		return MinX;
	}

	public void setMinX(String minX) {
		MinX = minX;
	}

	public String getMaxY() {
		return MaxY;
	}

	public void setMaxY(String maxY) {
		MaxY = maxY;
	}

	public String getMinY() {
		return MinY;
	}

	public void setMinY(String minY) {
		MinY = minY;
	}

	public String getMinLevel() {
		return MinLevel;
	}

	public void setMinLevel(String minLevel) {
		MinLevel = minLevel;
	}

	public String getMaxLevel() {
		return MaxLevel;
	}

	public void setMaxLevel(String maxLevel) {
		MaxLevel = maxLevel;
	}

}
