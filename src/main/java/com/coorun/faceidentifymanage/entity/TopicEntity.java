package com.coorun.faceidentifymanage.entity;

public class TopicEntity {

    /***/
    private String appKey;
    /***/
    private String appType;
    /***/
    private String clientId;
    /**
     * 密码
     */
    private String password;
    /***/
    private String topicName;
    /**
     * 用户名
     */
    private String userName;

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public String getAppType() {
        return appType;
    }

    public void setAppType(String appType) {
        this.appType = appType;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "appKey='" + appKey + '\'' +
                ", appType='" + appType + '\'' +
                ", clientId='" + clientId + '\'' +
                ", password='" + password + '\'' +
                ", topicName='" + topicName + '\'' +
                ", userName='" + userName + '\'' +
                '}';
    }
}
