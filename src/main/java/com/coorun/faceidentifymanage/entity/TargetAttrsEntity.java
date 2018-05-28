package com.coorun.faceidentifymanage.entity;

/**
 * 人脸实时监控信息中的透传字段
 * 描述被抓拍者关联信息，如抓拍设备的设备信息
 * 抓拍
 *
 */
public class TargetAttrsEntity {

    /**设备 id(唯一标识) */
    private String deviceId;
    /**设备名称*/
    private String deviceName;
    /**设备所在经度*/
    private String deviceLongitude;
    /**设备所在纬度*/
    private String deviceLatitude;
    /**设备管道号*/
    private String deviceChannel;
    /**设备的抓拍时间，格式 2016-09-15 00:00:00.000*/
    private String faceTime;
    /**人脸大图矩形框 */
    private Object rect;
    /**人脸大图 url-人证情况下为证件图片 */
    private String bkgUrl;
    /**人员性别字典*/
    private String humanMale;
    /**人员性别值-格式 男*/
    private String humanMaleValue;
    /**人员名族字典*/
    private int humanNation;
    /**人员名族值-格式 汉族*/
    private String humanNationValue;
    /**出生日期-格式 2016-01-30*/
    private String humanBirthDate;
    /**人员地址*/
    private String humanAddress;
    /**证件号码（人员唯一标识）*/
    private String humanCrednum;
    /**人员证件图片*/
    private String humanPicUrl;
    /**匹配结果- 0 表示人证匹配， 1 表示 人证不匹配*/
    private int matchResult;
    /**布控状态- true 布控人员，false 非 布控人员 */
    private boolean alarmStatus;
    /**备注*/
    private String commentField;
    /**开始时间-格式 2016-01-30 23:00:00*/
    private String startDate;
    /**结束时间-格式 2016-01-30 23:00:00*/
    private String endDate;

    private FaceEntity faceEntity;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceLongitude() {
        return deviceLongitude;
    }

    public void setDeviceLongitude(String deviceLongitude) {
        this.deviceLongitude = deviceLongitude;
    }

    public String getDeviceLatitude() {
        return deviceLatitude;
    }

    public void setDeviceLatitude(String deviceLatitude) {
        this.deviceLatitude = deviceLatitude;
    }

    public String getDeviceChannel() {
        return deviceChannel;
    }

    public void setDeviceChannel(String deviceChannel) {
        this.deviceChannel = deviceChannel;
    }

    public String getFaceTime() {
        return faceTime;
    }

    public void setFaceTime(String faceTime) {
        this.faceTime = faceTime;
    }

    public Object getRect() {
        return rect;
    }

    public void setRect(Object rect) {
        this.rect = rect;
    }

    public String getBkgUrl() {
        return bkgUrl;
    }

    public void setBkgUrl(String bkgUrl) {
        this.bkgUrl = bkgUrl;
    }

    public String getHumanMale() {
        return humanMale;
    }

    public void setHumanMale(String humanMale) {
        this.humanMale = humanMale;
    }

    public String getHumanMaleValue() {
        return humanMaleValue;
    }

    public void setHumanMaleValue(String humanMaleValue) {
        this.humanMaleValue = humanMaleValue;
    }

    public int getHumanNation() {
        return humanNation;
    }

    public void setHumanNation(int humanNation) {
        this.humanNation = humanNation;
    }

    public String getHumanNationValue() {
        return humanNationValue;
    }

    public void setHumanNationValue(String humanNationValue) {
        this.humanNationValue = humanNationValue;
    }

    public String getHumanBirthDate() {
        return humanBirthDate;
    }

    public void setHumanBirthDate(String humanBirthDate) {
        this.humanBirthDate = humanBirthDate;
    }

    public String getHumanAddress() {
        return humanAddress;
    }

    public void setHumanAddress(String humanAddress) {
        this.humanAddress = humanAddress;
    }

    public String getHumanCrednum() {
        return humanCrednum;
    }

    public void setHumanCrednum(String humanCrednum) {
        this.humanCrednum = humanCrednum;
    }

    public String getHumanPicUrl() {
        return humanPicUrl;
    }

    public void setHumanPicUrl(String humanPicUrl) {
        this.humanPicUrl = humanPicUrl;
    }

    public int getMatchResult() {
        return matchResult;
    }

    public void setMatchResult(int matchResult) {
        this.matchResult = matchResult;
    }

    public boolean isAlarmStatus() {
        return alarmStatus;
    }

    public void setAlarmStatus(boolean alarmStatus) {
        this.alarmStatus = alarmStatus;
    }

    public String getCommentField() {
        return commentField;
    }

    public void setCommentField(String commentField) {
        this.commentField = commentField;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public FaceEntity getFaceEntity() {
        return faceEntity;
    }

    public void setFaceEntity(FaceEntity faceEntity) {
        this.faceEntity = faceEntity;
    }

    @Override
    public String toString() {
        return "TargetAttrsEntity{" +
                "deviceId='" + deviceId + '\'' +
                ", deviceName='" + deviceName + '\'' +
                ", deviceLongitude='" + deviceLongitude + '\'' +
                ", deviceLatitude='" + deviceLatitude + '\'' +
                ", deviceChannel='" + deviceChannel + '\'' +
                ", faceTime='" + faceTime + '\'' +
                ", rect=" + rect +
                ", bkgUrl='" + bkgUrl + '\'' +
                ", humanMale='" + humanMale + '\'' +
                ", humanMaleValue='" + humanMaleValue + '\'' +
                ", humanNation=" + humanNation +
                ", humanNationValue='" + humanNationValue + '\'' +
                ", humanBirthDate='" + humanBirthDate + '\'' +
                ", humanAddress='" + humanAddress + '\'' +
                ", humanCrednum='" + humanCrednum + '\'' +
                ", humanPicUrl='" + humanPicUrl + '\'' +
                ", matchResult=" + matchResult +
                ", alarmStatus=" + alarmStatus +
                ", commentField='" + commentField + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", faceEntity=" + faceEntity +
                '}';
    }
}
