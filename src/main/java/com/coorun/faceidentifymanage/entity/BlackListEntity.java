package com.coorun.faceidentifymanage.entity;

public class BlackListEntity {
    /**姓名*/
    private String humanName;
    /**性别（-1-无限制，0-未知，1-男，2-女）*/
    private int sex;
    /**证件类型（-1-无限制，0-未知，1-身份证，2-警官证）*/
    private int credentialsType;
    /**证件号码*/
    private String credentialsNum;
    /**名单id（-1表示所有，多条记录用“，”分割）*/
    private int listLibIds;
    /**结果的页码数，从1开始*/
    private int pageNo;
    /**结果的每页数*/
    private int pageSize;

    public String getHumanName() {
        return humanName;
    }

    public void setHumanName(String humanName) {
        this.humanName = humanName;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public int getCredentialsType() {
        return credentialsType;
    }

    public void setCredentialsType(int credentialsType) {
        this.credentialsType = credentialsType;
    }

    public String getCredentialsNum() {
        return credentialsNum;
    }

    public void setCredentialsNum(String credentialsNum) {
        this.credentialsNum = credentialsNum;
    }

    public int getListLibIds() {
        return listLibIds;
    }

    public void setListLibIds(int listLibIds) {
        this.listLibIds = listLibIds;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    @Override
    public String toString() {
        return "BlackListEntity{" +
                "humanName='" + humanName + '\'' +
                ", sex=" + sex +
                ", credentialsType=" + credentialsType +
                ", credentialsNum='" + credentialsNum + '\'' +
                ", listLibIds=" + listLibIds +
                ", pageNo=" + pageNo +
                ", pageSize=" + pageSize +
                '}';
    }
}
