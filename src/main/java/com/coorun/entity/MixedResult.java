package com.coorun.entity;

/**
 * 混合查询
 * 
 * @author DL
 * @createDate 2017-10-12
 *
 */
public class MixedResult {
	/** 主键ID **/
	private String id;
	/** 名称 **/
	private String name;
	/** 地址 **/
	private String address;
	/** 类型 **/
	private String dataType;
	/** 经度 **/
	private String x;
	/** 纬度 **/
	private String y;
	/** 高程 **/
	private String z;
	/** 线轨迹坐标(串) **/
	private String lineShp;
	/** 线轨迹坐标(串) **/
	private String areaShp;

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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getZ() {
		return z;
	}

	public void setZ(String z) {
		this.z = z;
	}

	public String getLineShp() {
		return lineShp;
	}

	public void setLineShp(String lineShp) {
		this.lineShp = lineShp;
	}

	public String getAreaShp() {
		return areaShp;
	}

	public void setAreaShp(String areaShp) {
		this.areaShp = areaShp;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((dataType == null) ? 0 : dataType.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		MixedResult other = (MixedResult) obj;
		if (dataType == null) {
			if (other.dataType != null) {
				return false;
			}
		} else if (!dataType.equals(other.dataType)) {
			return false;
		}
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		return true;
	}

}
