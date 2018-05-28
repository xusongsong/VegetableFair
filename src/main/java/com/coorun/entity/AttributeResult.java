package com.coorun.entity;

/**
 * 属性查询
 * 
 * @author DL
 * @createDate 2017-09-23
 *
 */
public class AttributeResult {
	/** 建筑名称 **/
	private String name;
	/** 建筑编码 **/
	private String code;
	/** 详细地址 **/
	private String addr;
	/** 基地面积 **/
	private String ldArea;
	/** 结构类型 **/
	private String stru;
	/** 建筑高度 **/
	private String height;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getLdArea() {
		return ldArea;
	}

	public void setLdArea(String ldArea) {
		this.ldArea = ldArea;
	}

	public String getStru() {
		return stru;
	}

	public void setStru(String stru) {
		this.stru = stru;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

}
