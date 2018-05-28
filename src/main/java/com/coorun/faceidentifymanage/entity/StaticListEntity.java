package com.coorun.faceidentifymanage.entity;

public class StaticListEntity {
    private String humanId;
    private String humanName;
    private int credentialsType;
    private String credentialsNum;
    private String humanAddress;
    private String facePicUrl;
    private int listLibId;
    private int sex;

    public String getHumanId() {
        return humanId;
    }

    public void setHumanId(String humanId) {
        this.humanId = humanId;
    }

    public String getHumanName() {
        return humanName;
    }

    public void setHumanName(String humanName) {
        this.humanName = humanName;
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

    public String getHumanAddress() {
        return humanAddress;
    }

    public void setHumanAddress(String humanAddress) {
        this.humanAddress = humanAddress;
    }

    public String getFacePicUrl() {
        return facePicUrl;
    }

    public void setFacePicUrl(String facePicUrl) {
        this.facePicUrl = facePicUrl;
    }

    public int getListLibId() {
        return listLibId;
    }

    public void setListLibId(int listLibId) {
        this.listLibId = listLibId;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "StaticListEntity{" +
                "humanId='" + humanId + '\'' +
                ", humanName='" + humanName + '\'' +
                ", credentialsType=" + credentialsType +
                ", credentialsNum='" + credentialsNum + '\'' +
                ", humanAddress='" + humanAddress + '\'' +
                ", facePicUrl='" + facePicUrl + '\'' +
                ", listLibId=" + listLibId +
                ", sex=" + sex +
                '}';
    }
}
