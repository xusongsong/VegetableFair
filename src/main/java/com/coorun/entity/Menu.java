package com.coorun.entity;

/**
 * 权限角色菜单
 * @author shine
 *
 */
public class Menu {
	
	//当前菜单权限是否被选中
	private Boolean checked;
	
	//当前菜单id
	private String id;
	
	//当前菜单名称
	private String name;
	
	//当前菜单节点是否为父节点
	private Boolean isParent;
	
	//当前节点的父节点id
	private String pId;
	
	public Boolean getChecked() {
		return checked;
	}
	public void setChecked(Boolean checked) {
		this.checked = checked;
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
	public Boolean getIsParent() {
		return isParent;
	}
	public void setIsParent(Boolean isParent) {
		this.isParent = isParent;
	}
	public String getpId() {
		return pId;
	}
	public void setpId(String pId) {
		this.pId = pId;
	}
}
