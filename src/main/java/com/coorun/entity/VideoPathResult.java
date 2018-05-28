package com.coorun.entity;

public class VideoPathResult {
    // ID
    private String id;
    // 名称
    private String videoPathName;
    // 路径点集
    private String videoPathPoints;
    // 路径视角
    private String videoPathParams;
    //用户id
    private String userID;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVideoPathName() {
        return videoPathName;
    }

    public void setVideoPathName(String videoPathName) {
        this.videoPathName = videoPathName;
    }

    public String getVideoPathPoints() {
        return videoPathPoints;
    }

    public void setVideoPathPoints(String videoPathPoints) {
        this.videoPathPoints = videoPathPoints;
    }

    public String getVideoPathParams() {
        return videoPathParams;
    }

    public void setVideoPathParams(String videoPathParams) {
        this.videoPathParams = videoPathParams;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
}
