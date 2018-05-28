package com.coorun.faceidentifymanage.entity;

/**
 * 实时抓拍信息
 *
 * @author jwei
 * @date 2018-4-12
 */
public class SnapshotPushCallbackEntity {
    private int errorCode;
    private String image;
    private String traceUuid;
    private String traceIdx;
    private String targetAttrs;
    private TargetAttrsEntity targetAttrsEntity;
    private FaceEntity[] faces;

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTraceUuid() {
        return traceUuid;
    }

    public void setTraceUuid(String traceUuid) {
        this.traceUuid = traceUuid;
    }

    public String getTraceIdx() {
        return traceIdx;
    }

    public void setTraceIdx(String traceIdx) {
        this.traceIdx = traceIdx;
    }

    public String getTargetAttrs() {
        return targetAttrs;
    }

    public void setTargetAttrs(String targetAttrs) {
        this.targetAttrs = targetAttrs;
    }

    public TargetAttrsEntity getTargetAttrsEntity() {
        return targetAttrsEntity;
    }

    public void setTargetAttrsEntity(TargetAttrsEntity targetAttrsEntity) {
        this.targetAttrsEntity = targetAttrsEntity;
    }

    public FaceEntity[] getFaces() {
        return faces;
    }

    public void setFaces(FaceEntity[] faces) {
        this.faces = faces;
    }

    @Override
    public String toString() {
        return "SnapshotPushCallbackEntity{" +
                "errorCode=" + errorCode +
                ", image='" + image + '\'' +
                ", traceUuid='" + traceUuid + '\'' +
                ", traceIdx='" + traceIdx + '\'' +
                ", deviceName='" + targetAttrsEntity.getDeviceName()+ '\'' +
                ", faceTime='" + targetAttrsEntity.getFaceTime() + '\'' +
                '}';
    }
}
