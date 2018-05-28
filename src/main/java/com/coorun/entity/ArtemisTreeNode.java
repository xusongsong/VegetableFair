package com.coorun.entity;

/**
 * 分页获取组织数信息返回实体类
 * @author lixiang
 *
 */
public class ArtemisTreeNode {
	//创建时间
	private String createTime;
	//组织编号
	private String indexCode;
	//名称
	private String name;
	//父组织编号
	private String parentIndexCode;
	//树类型
	private String parentTree;
	//层级
	private String unitLevel;
	//1是组织, 2是区域
	private String unitType;
	//更新时间
	private String updateTime;
	//分页
	private String page;
	//总数
	private String total;
	
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
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
	public String getParentTree() {
		return parentTree;
	}
	public void setParentTree(String parentTree) {
		this.parentTree = parentTree;
	}
	public String getUnitLevel() {
		return unitLevel;
	}
	public void setUnitLevel(String unitLevel) {
		this.unitLevel = unitLevel;
	}
	public String getUnitType() {
		return unitType;
	}
	public void setUnitType(String unitType) {
		this.unitType = unitType;
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
