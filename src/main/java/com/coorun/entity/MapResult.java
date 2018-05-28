package com.coorun.entity;

/**
 * 关键字查询
 * 
 * @author DL
 * @createDate 2017-09-20
 */
public class MapResult {
	/** ID **/
	private String id;
	/** 全称 **/
	private String name;
	/** 简称 **/
	private String alias;
	/** 地址 **/
	private String address;
	/** 类型 **/
	private String type;
	/** x坐标 **/
	private String x;
	/** y坐标 **/
	private String y;
	/** 高程 **/
	private String z;
	/** 备注 **/
	private String memo;

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

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

}
