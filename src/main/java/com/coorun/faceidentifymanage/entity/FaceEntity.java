package com.coorun.faceidentifymanage.entity;

/**
 * 人脸检测结果对象
 * @author jwei
 * @date 2018-4-12
 */
public class FaceEntity {

    private int faceId;
    private EyesPosition eyesPosition = new EyesPosition();
    private FaceMark faceMark = new FaceMark();
    private FaceRect faceRect = new FaceRect();
    private RecommendFaceRect recommendFaceRect = new RecommendFaceRect();
    private FacePose facePose = new FacePose();
    private Age age = new Age();
    private Gender gender = new Gender();
    private Glass glass = new Glass();
    private Smile smile = new Smile();
    private Ethnic ethnic = new Ethnic();
    private FaceIQA faceIQA = new FaceIQA();
    private String modelData;
    private Object[] identify;

    private class EyesPosition {
        /**左眼坐标*/
        private LeftEye leftEye = new LeftEye();
        /**右眼坐标*/
        private RightEye rightEye = new RightEye();

        class LeftEye {
            /**X 坐标 0 到 1 的归一化值 */
            private double x;
            /**Y 坐标 0 到 1 的归一化值 */
            private double y;

            public void setX(double x) {
                this.x = x;
            }

            public void setY(double y) {
                this.y = y;
            }
        }
        class RightEye {
            private double x;
            private double y;

            public void setX(double x) {
                this.x = x;
            }

            public void setY(double y) {
                this.y = y;
            }
        }
    }
    public double getLeftEyeX() {
        return eyesPosition.leftEye.x;
    }
    public double getLeftEyeY() {
        return eyesPosition.leftEye.y;
    }
    public double getRightEyeX() {
        return eyesPosition.rightEye.x;
    }
    public double getRightEyeY() {
        return eyesPosition.rightEye.y;
    }

    private class FaceMark {
        private LeftEye leftEye = new LeftEye();
        private RightEye rightEye = new RightEye();
        private LeftMouth leftMouth = new LeftMouth();
        private RightMouth rightMouth = new RightMouth();
        private NoseTip noseTip = new NoseTip();

        class LeftEye {
            private float x;
            private float y;

            public void setX(float x) {
                this.x = x;
            }

            public void setY(float y) {
                this.y = y;
            }
        }

        class RightEye {
            private float x;
            private float y;

            public void setX(float x) {
                this.x = x;
            }

            public void setY(float y) {
                this.y = y;
            }
        }

        class LeftMouth {
            private float x;
            private float y;

            public void setX(float x) {
                this.x = x;
            }

            public void setY(float y) {
                this.y = y;
            }
        }

        class RightMouth {
            private float x;
            private float y;

            public void setX(float x) {
                this.x = x;
            }

            public void setY(float y) {
                this.y = y;
            }
        }

        class NoseTip {
            private float x;
            private float y;

            public void setX(float x) {
                this.x = x;
            }

            public void setY(float y) {
                this.y = y;
            }
        }
    }
    public float getFaceMarkLeftEyeX() {
        return faceMark.leftEye.x;
    }
    public float getFaceMarkLeftEyeY() {
        return faceMark.leftEye.y;
    }
    public float getFaceMarkRightEyeX() {
        return faceMark.rightEye.x;
    }
    public float getFaceMarkRightEyeY() {
        return faceMark.rightEye.y;
    }
    public float getFaceMarkLeftMouthX() {
        return faceMark.leftMouth.x;
    }
    public float getLeftMouthY() {
        return faceMark.leftMouth.y;
    }
    public float getRightMouthX() {
        return faceMark.rightMouth.x;
    }
    public float getRightMouthY() {
        return faceMark.rightMouth.y;
    }
    public float getNoseTipX() {
        return faceMark.noseTip.x;
    }
    public float getNoseTipY() {
        return faceMark.noseTip.y;
    }

    /**
     * 眼睛位置检测结果
     */
    private class FaceRect {
        private float x;
        private float y;
        private float width;
        private float height;

        public void setX(float x) {
            this.x = x;
        }

        public void setY(float y) {
            this.y = y;
        }

        public void setWidth(float width) {
            this.width = width;
        }

        public void setHeight(float height) {
            this.height = height;
        }
    }
    public float getFaceRectX() {
        return faceRect.x;
    }
    public float getFaceRectY() {
        return faceRect.y;
    }
    public float getFaceRectWidth() {
        return faceRect.width;
    }
    public float getFaceRectHeight() {
        return faceRect.height;
    }

    /**
     * 人脸框检测结果
     */
    private class RecommendFaceRect {
        private float x;
        private float y;
        private float width;
        private float height;

        public void setX(float x) {
            this.x = x;
        }

        public void setY(float y) {
            this.y = y;
        }

        public void setWidth(float width) {
            this.width = width;
        }

        public void setHeight(float height) {
            this.height = height;
        }
    }
    public float getRecommendFaceRectX() {
        return recommendFaceRect.x;
    }
    public float getRecommendFaceRectY() {
        return recommendFaceRect.y;
    }
    public float getRecommendFaceRectWidth() {
        return recommendFaceRect.width;
    }
    public float getRecommendFaceRectHeight() {
        return recommendFaceRect.height;
    }

    /**
     * 人脸姿态检测结果
     */
    private class FacePose {
        private float pitch;
        private float roll;
        private float yaw;
        private float confidence;

        public float getPitch() {
            return pitch;
        }

        public void setPitch(float pitch) {
            this.pitch = pitch;
        }

        public float getRoll() {
            return roll;
        }

        public void setRoll(float roll) {
            this.roll = roll;
        }

        public float getYaw() {
            return yaw;
        }

        public void setYaw(float yaw) {
            this.yaw = yaw;
        }

        public float getConfidence() {
            return confidence;
        }

        public void setConfidence(float confidence) {
            this.confidence = confidence;
        }
    }
    public float getFacePosePith() {
        return facePose.pitch;
    }
    public float getFacePoseRoll() {
        return facePose.roll;
    }
    public float getFacePoseYaw() {
        return facePose.yaw;
    }
    public float getFacePoseConfidence() {
        return facePose.confidence;
    }

    /**
     *
     */
    private class Age {
        private int range;
        private int value;
        private int ageGroup;

        public void setRange(int range) {
            this.range = range;
        }

        public void setValue(int value) {
            this.value = value;
        }

        public void setAgeGroup(int ageGroup) {
            this.ageGroup = ageGroup;
        }
    }
    public int getAgeValue() {
        return age.value;
    }
    public int getAgeRange() {
        return age.range;
    }
    public int getAgeGroup() {
        return age.ageGroup;
    }

    private class Gender {
        private float confidence;
        private int value;

        public void setConfidence(float confidence) {
            this.confidence = confidence;
        }

        public void setValue(int value) {
            this.value = value;
        }
    }
    public int getGenderVale() {
        return gender.value;
    }
    public float getGenderConfidence() {
        return gender.confidence;
    }

    private class Glass {
        private float confidence;
        private int value;

        public double getConfidence() {
            return confidence;
        }

        public void setConfidence(float confidence) {
            this.confidence = confidence;
        }

        public int getValue() {
            return value;
        }

        public void setValue(int value) {
            this.value = value;
        }
    }
    public int getGlassValue() {
        return glass.value;
    }
    public float getGlassConfidence() {
        return glass.confidence;
    }

    private class Smile {
        private float confidence;
        private int value;

        public void setConfidence(float confidence) {
            this.confidence = confidence;
        }

        public void setValue(int value) {
            this.value = value;
        }
    }
    public int getSmileValue() {
        return smile.value;
    }
    public float getSmileConfidence() {
        return smile.confidence;
    }

    private class Ethnic {
        private float confidence;
        private int value;

        public void setConfidence(float confidence) {
            this.confidence = confidence;
        }

        public void setValue(int value) {
            this.value = value;
        }
    }
    public int getEthnicValue() {
        return ethnic.value;
    }
    public float getEthnicConfidence() {
        return ethnic.confidence;
    }

    private class FaceIQA {
        private int detectQuality;
        private float pointsQuality;
        private float eyeDistance;
        private int colorful;
        private int grayScale;
        private int grayMean;
        private float grayVar;
        private int clearity;
        private float posePitch;
        private float poseRoll;
        private float poseYaw;
        private float poseConf;
        private float frontal;
        private float uncovered;
        private float totalQuality;

        public void setDetectQuality(int detectQuality) {
            this.detectQuality = detectQuality;
        }

        public void setPointsQuality(float pointsQuality) {
            this.pointsQuality = pointsQuality;
        }

        public void setEyeDistance(float eyeDistance) {
            this.eyeDistance = eyeDistance;
        }

        public void setColorful(int colorful) {
            this.colorful = colorful;
        }

        public void setGrayScale(int grayScale) {
            this.grayScale = grayScale;
        }

        public void setGrayMean(int grayMean) {
            this.grayMean = grayMean;
        }

        public void setGrayVar(float grayVar) {
            this.grayVar = grayVar;
        }

        public void setClearity(int clearity) {
            this.clearity = clearity;
        }

        public void setPosePitch(float posePitch) {
            this.posePitch = posePitch;
        }

        public void setPoseRoll(float poseRoll) {
            this.poseRoll = poseRoll;
        }

        public void setPoseYaw(float poseYaw) {
            this.poseYaw = poseYaw;
        }

        public void setPoseConf(float poseConf) {
            this.poseConf = poseConf;
        }

        public void setFrontal(float frontal) {
            this.frontal = frontal;
        }

        public void setUncovered(float uncovered) {
            this.uncovered = uncovered;
        }

        public void setTotalQuality(float totalQuality) {
            this.totalQuality = totalQuality;
        }
    }
    public int getFaceIQADetectQuality() {
        return faceIQA.detectQuality;
    }
    public float getFaceIQAPointsQuality() {
        return faceIQA.pointsQuality;
    }
    public float getFaceIQAEyeDistance() {
        return faceIQA.eyeDistance;
    }
    public int getFaceIQAColorful() {
        return faceIQA.colorful;
    }
    public int getFaceIQAGrayScale() {
        return faceIQA.grayScale;
    }
    public int getFaceIQAGrayMean() {
        return faceIQA.grayMean;
    }
    public float getFaceIQAGrayVar() {
        return faceIQA.grayVar;
    }
    public float getFaceIQAClearity() {
        return faceIQA.clearity;
    }
    public float getFaceIQAPosePitch() {
        return faceIQA.posePitch;
    }
    public float getFaceIQAPoseRoll() {
        return faceIQA.poseRoll;
    }
    public float getFaceIQAPoseYaw() {
        return faceIQA.poseYaw;
    }
    public float getFaceIQAPoseConf() {
        return faceIQA.poseConf;
    }
    public float getFaceIQAFrontal() {
        return faceIQA.frontal;
    }
    public float getFaceIQAUncovered() {
        return faceIQA.uncovered;
    }
    public float getFaceIQATotalQuality() {
        return faceIQA.totalQuality;
    }

    public int getFaceId() {
        return faceId;
    }
    public void setFaceId(int faceId) {
        this.faceId = faceId;
    }
    public String getModelData() {
        return modelData;
    }
    public void setModelData(String modelData) {
        this.modelData = modelData;
    }
    public Object[] getIdentify() {
        return identify;
    }
    public void setIdentify(Object[] identify) {
        this.identify = identify;
    }
}
