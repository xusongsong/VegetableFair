package com.coorun.faceidentifymanage.entity;

public class DefenceEntity {

    /**布控名称*/
    private String name;
    /**布控名单库ID，多个以英文逗号隔开*/
    private String libIds;
    /**布控抓拍机编号，多个以英文逗号隔开*/
    private String deviceCodes;
    /**自定义开始时间，validPeriod为6时为必填*/
    private String startTime;
    /**自定义结束时间，validPeriod为6时为必填*/
    private String endTime;
    /**布控有效期限，1-一天，2-一周，3-一月，4-半年，5-永久，6-自定义*/
    private String validPeriod;
    /**分时段报警阈值设置,让预警更精确，最多可设置5个时间段*/
    private PeriodTime details;

    private class PeriodTime {
        /**报警阈值设置*/
        private int thresholdMin;
        /**报警时段开始时刻点，如00:00*/
        private String startPeriod;
        /**报警时段结束时刻点，如23:59*/
        private String endPeriod;

        public int getThresholdMin() {
            return thresholdMin;
        }

        public void setThresholdMin(int thresholdMin) {
            this.thresholdMin = thresholdMin;
        }

        public String getStartPeriod() {
            return startPeriod;
        }

        public void setStartPeriod(String startPeriod) {
            this.startPeriod = startPeriod;
        }

        public String getEndPeriod() {
            return endPeriod;
        }

        public void setEndPeriod(String endPeriod) {
            this.endPeriod = endPeriod;
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLibIds() {
        return libIds;
    }

    public void setLibIds(String libIds) {
        this.libIds = libIds;
    }

    public String getDeviceCodes() {
        return deviceCodes;
    }

    public void setDeviceCodes(String deviceCodes) {
        this.deviceCodes = deviceCodes;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getValidPeriod() {
        return validPeriod;
    }

    public void setValidPeriod(String validPeriod) {
        this.validPeriod = validPeriod;
    }

    public PeriodTime getDetails() {
        return details;
    }

    public void setDetails(PeriodTime details) {
        this.details = details;
    }
}
