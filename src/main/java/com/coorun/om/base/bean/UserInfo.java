package com.coorun.om.base.bean;

import java.io.Serializable;
import java.util.Date;

import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Component;

/*************************
 *
 * Author		:	Billy
 * Create Date	:	2017年10月21日 下午12:26:13
 * Desc			:	用户信息类
 *
**************************/
@Alias("userInfo")
public class UserInfo implements Serializable{
	private static final long serialVersionUID = -1945780955632846563L;
	//用户ID
	private String uid;
	//登录名
	private String loginname;
	//密码
	private String passwd;
	//用户名
	private String username;
	//姓名
	private String name;
	//联系电话
	private String tel;
	//E-Mail
	private String email;
	//部门ID
	private String deptid;
	//角色ID
	private String roleid;
	//是否有效 2-无效 0-有效
	private String isvalid;
	//创建者
	private String cuserid;
	//创建时间
	private Date cdate;
	//登录时间
	private Date logindate;
	//备注
	private String memo;
	//部门
	private String department;
	//角色
	private String role;
	//角色名称
	private String roleName;
	//sessionId
	private String sessionId;
	
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getLoginname() {
		return loginname;
	}
	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDeptid() {
		return deptid;
	}
	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getIsvalid() {
		return isvalid;
	}
	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid;
	}
	public String getCuserid() {
		return cuserid;
	}
	public void setCuserid(String cuserid) {
		this.cuserid = cuserid;
	}
	public Date getCdate() {
		return cdate;
	}
	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	
	public Date getLogindate() {
		return logindate;
	}
	public void setLogindate(Date logindate) {
		this.logindate = logindate;
	}
	@Override
	public String toString() {
		return "UserInfo [uid=" + uid + ", loginname=" + loginname + ", passwd=" + passwd + ", username=" + username
				+ ", name=" + name + ", tel=" + tel + ", email=" + email + ", deptid=" + deptid + ", roleid=" + roleid
				+ ", isvalid=" + isvalid + ", cuserid=" + cuserid + ", cdate=" + cdate + ", memo=" + memo
				+ ", department=" + department + ", role=" + role + ", roleName=" + roleName + ", sessionId="
				+ sessionId + "]";
	}
}
