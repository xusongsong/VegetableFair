package com.coorun.faceidentifymanage.entity;

/**
 * 抓拍机实体类
 *
 */
public class CameraEntity {
    /**抓拍机唯一ID*/
    private int caremaId;
    /**抓拍机唯一编号*/
    private String deviceCode;
    /**组织资源编号*/
    private String indexCode;
    /**抓拍机类型,  海康抓怕机：101，海康SmartIPC：102，海康6200系列：103，人证设备：110*/
    private String cameraType;
    /**抓拍机ip*/
    private String cameraIp;
    /**抓拍机端口*/
    private String cameraPort;
    /**抓拍机通道号，只支持两位数字*/
    private String channelNo;
    /**抓拍机经度*/
    private String longitude;
    /**抓拍机纬度*/
    private String latitude;
    /**抓拍机名称*/
    private String cameraName;
    /**组织id*/
    private int regionId;
    /**	关联监控点*/
    private String relationPoint;

    public int getCaremaId() {
        return caremaId;
    }

    public void setCaremaId(int caremaId) {
        this.caremaId = caremaId;
    }

    public String getDeviceCode() {
        return deviceCode;
    }

    public void setDeviceCode(String deviceCode) {
        this.deviceCode = deviceCode;
    }

    public String getIndexCode() {
        return indexCode;
    }

    public void setIndexCode(String indexCode) {
        this.indexCode = indexCode;
    }

    public String getCameraType() {
        return cameraType;
    }

    public void setCameraType(String cameraType) {
        this.cameraType = cameraType;
    }

    public String getCameraIp() {
        return cameraIp;
    }

    public void setCameraIp(String cameraIp) {
        this.cameraIp = cameraIp;
    }

    public String getCameraPort() {
        return cameraPort;
    }

    public void setCameraPort(String cameraPort) {
        this.cameraPort = cameraPort;
    }

    public String getChannelNo() {
        return channelNo;
    }

    public void setChannelNo(String channelNo) {
        this.channelNo = channelNo;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getCameraName() {
        return cameraName;
    }

    public void setCameraName(String cameraName) {
        this.cameraName = cameraName;
    }

    public int getRegionId() {
        return regionId;
    }

    public void setRegionId(int regionId) {
        this.regionId = regionId;
    }

    public String getRelationPoint() {
        return relationPoint;
    }

    public void setRelationPoint(String relationPoint) {
        this.relationPoint = relationPoint;
    }

    @Override
    public String toString() {
        return "CameraEntity{" +
                "caremaId=" + caremaId +
                ", deviceCode='" + deviceCode + '\'' +
                ", indexCode='" + indexCode + '\'' +
                ", cameraType='" + cameraType + '\'' +
                ", cameraIp='" + cameraIp + '\'' +
                ", cameraPort='" + cameraPort + '\'' +
                ", channelNo='" + channelNo + '\'' +
                ", longitude='" + longitude + '\'' +
                ", latitude='" + latitude + '\'' +
                ", cameraName='" + cameraName + '\'' +
                ", regionId=" + regionId +
                ", relationPoint='" + relationPoint + '\'' +
                '}';
    }
}
