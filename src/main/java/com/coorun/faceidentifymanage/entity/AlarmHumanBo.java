package com.coorun.faceidentifymanage.entity;

/**
 * 告警人员信息
 *
 * @author jwei
 * @date 2018-4-13
 */
public class AlarmHumanBo {
    /**告警人员ID*/
    private String humanId;
    /**所在名单库ID*/
    private int listLibId;
    /**所在名单库名称*/
    private String listLibName;
    /**告警人员姓名*/
    private String humanName;
    /**性别 1-男 2-女 0-未知*/
    private int sex;
    /**出生日期，格式如：2011-06-01 */
    private String birthday;
    /**省份 ID */
    private String provinceId;
    /**省份名称 */
    private String provinceName;
    /**城市 ID */
    private String cityId;
    /**城市名称 */
    private String cityName;
    /**地址 */
    private String address;
    /**证件类型。-1-无限制，0-未知，1-身份证， 2-警官证 */
    private int credentialsType;
    /**证件号 */
    private String credentialsNum;
    /**人脸图 url */
    private String facePicUrl;
    /**相似度 */
    private String similarity;
    /**是否微笑。1-不微笑，2-微笑，0-未知 */
    private int smile;
    /**民族。遵照名族数据字典 */
    private int ethnic;

    public String getHumanId() {
        return humanId;
    }

    public void setHumanId(String humanId) {
        this.humanId = humanId;
    }

    public int getListLibId() {
        return listLibId;
    }

    public void setListLibId(int listLibId) {
        this.listLibId = listLibId;
    }

    public String getListLibName() {
        return listLibName;
    }

    public void setListLibName(String listLibName) {
        this.listLibName = listLibName;
    }

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

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getFacePicUrl() {
        return facePicUrl;
    }

    public void setFacePicUrl(String facePicUrl) {
        this.facePicUrl = facePicUrl;
    }

    public String getSimilarity() {
        return similarity;
    }

    public void setSimilarity(String similarity) {
        this.similarity = similarity;
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
}
