package com.coorun.faceidentifymanage.entity;

import java.util.List;

/**
 * 预警推送信息实体类
 * 描述: 根据海康推送出的信息属性字段进行创建
 *
 * @author jwei
 * @date 2018-4-12
 */
public class AlarmPushCallbackEntity {

    /**告警ID*/
    private String alarmId;
    /**抓拍机indexCode*/
    private String indexCode;
    /**抓拍机名称*/
    private String cameraName;
    /**抓拍图上的年龄段 */
    private int age;
    /**抓拍图上的性别 */
    private int sex;
    /**抓拍图上的是否戴眼镜 */
    private int glass;
    /**是否微笑 */
    private int smile;
    /**民族 */
    private int ethnic;
    /**抓拍原图 URL */
    private String bkgPicUrl;
    /**抓拍人脸图片 URL */
    private String facePicUrl;
    /**相似度 */
    private double similarity;
    /**告警信息状态 */
    private int status;
    /**告警信息处理结果 */
    private String msg;
    /**告警时间 */
    private String alarmTime;
    /**布控 Id */
    private String controlId;
    /**告警名单库人员信息 */
    private List<AlarmHumanBo> humans;

    public String getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(String alarmId) {
        this.alarmId = alarmId;
    }

    public String getIndexCode() {
        return indexCode;
    }

    public void setIndexCode(String indexCode) {
        this.indexCode = indexCode;
    }

    public String getCameraName() {
        return cameraName;
    }

    public void setCameraName(String cameraName) {
        this.cameraName = cameraName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public int getGlass() {
        return glass;
    }

    public void setGlass(int glass) {
        this.glass = glass;
    }

    public int getSmile() {
        return smile;
    }

    public void setSmile(int smile) {
        this.smile = smile;
    }

    public int getEthnic() {
        return ethnic;
    }

    public void setEthnic(int ethnic) {
        this.ethnic = ethnic;
    }

    public String getBkgPicUrl() {
        return bkgPicUrl;
    }

    public void setBkgPicUrl(String bkgPicUrl) {
        this.bkgPicUrl = bkgPicUrl;
    }

    public String getFacePicUrl() {
        return facePicUrl;
    }

    public void setFacePicUrl(String facePicUrl) {
        this.facePicUrl = facePicUrl;
    }

    public double getSimilarity() {
        return similarity;
    }

    public void setSimilarity(double similarity) {
        this.similarity = similarity;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getAlarmTime() {
        return alarmTime;
    }

    public void setAlarmTime(String alarmTime) {
        this.alarmTime = alarmTime;
    }

    public String getControlId() {
        return controlId;
    }

    public void setControlId(String controlId) {
        this.controlId = controlId;
    }

    public List<AlarmHumanBo> getHumans() {
        return humans;
    }

    public void setHumans(List<AlarmHumanBo> humans) {
        this.humans = humans;
    }

    @Override
    public String toString() {
        return "AlarmPushCallbackEntity{" +
                "alarmId='" + alarmId + '\'' +
                ", indexCode='" + indexCode + '\'' +
                ", cameraName='" + cameraName + '\'' +
                ", age=" + age +
                ", sex=" + sex +
                ", glass=" + glass +
                ", smile=" + smile +
                ", ethnic=" + ethnic +
                ", bkgPicUrl='" + bkgPicUrl + '\'' +
                ", facePicUrl='" + facePicUrl + '\'' +
                ", similarity=" + similarity +
                ", status=" + status +
                ", msg='" + msg + '\'' +
                ", alarmTime='" + alarmTime + '\'' +
                ", controlId='" + controlId + '\'' +
                ", humans=" + humans +
                '}';
    }
}
