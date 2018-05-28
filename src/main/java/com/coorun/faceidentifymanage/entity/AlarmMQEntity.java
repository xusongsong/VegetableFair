package com.coorun.faceidentifymanage.entity;

public class AlarmMQEntity {

    /**MQ的信息,格式为IP:port*/
    private String ip;
    private TopicEntity topic;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public TopicEntity getTopic() {
        return topic;
    }

    public void setTopic(TopicEntity topic) {
        this.topic = topic;
    }

    @Override
    public String toString() {
        return "AlarmMQEntity{" +
                "ip='" + ip + '\'' +
                ", topic=" + topic +
                '}';
    }
}
