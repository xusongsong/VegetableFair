package com.coorun.faceidentifymanage.mq.alarmessage;

import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.entity.AlarmMQEntity;
import com.coorun.faceidentifymanage.entity.TopicEntity;
import com.coorun.faceidentifymanage.services.RealTimeDataService;
import org.apache.log4j.Logger;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
public class AlarmMessageAcceptor {

    @Resource
    private HikDatasource hikDatasource;
    @Resource
    private RealTimeDataService liveDataService;

    private MqttClient client;
    private MqttConnectOptions options;
    private ScheduledExecutorService scheduler;
    private Logger LOG = Logger.getLogger(AlarmMessageAcceptor.class);

    @PostConstruct
    public void startAlarmMonitor() {
        try {
            initAlarmMonitor();
        } catch (Exception e) {
            LOG.error("启动预警监控器失败, 即将进行重新连接", e);

            startReconnect();
        }
    }

    @PreDestroy
    public void destroyConnect() {
        disconnect();
    }

    /**
     * 构建抓拍机监控器
     *
     * @return
     */
    private void initAlarmMonitor() throws Exception {
        if (null == client || null == options) {
            Map<String, String> paramMap = new HashMap<>();
            paramMap.put("appKey", hikDatasource.getAppKey());
            AlarmMQEntity alarmMQEntity = liveDataService.getAlarmTopic(paramMap);
            LOG.debug("预警监控参数:" + alarmMQEntity);

            if (null == alarmMQEntity) {
                throw new IllegalArgumentException("预警参数获取获取为空");
            }

            TopicEntity topicEntity = alarmMQEntity.getTopic();

            // host为主机名，test为clientid即连接MQTT的客户端ID，一般以客户端唯一标识符表示，MemoryPersistence设置clientid的保存形式，默认为以内存保存
            client = new MqttClient("tcp://" + alarmMQEntity.getIp(),topicEntity.getClientId(), new MemoryPersistence());
            // MQTT的连接设置
            options = new MqttConnectOptions();
            // 设置是否清空session,这里如果设置为false表示服务器会保留客户端的连接记录，这里设置为true表示每次连接到服务器都以新的身份连接
            //true-连接不保持，false-连接保持
            options.setCleanSession(false);
            // 设置连接的用户名
            options.setUserName(topicEntity.getUserName());
            // 设置连接的密码
            options.setPassword(topicEntity.getPassword().toCharArray());
            // 设置超时时间 单位为秒
            options.setConnectionTimeout(10);
            // 设置会话心跳时间 单位为秒 服务器会每隔1.5*20秒的时间向客户端发送个消息判断客户端是否在线，但这个方法并没有重连的机制
            options.setKeepAliveInterval(5);
            // 设置回调
            client.setCallback(new AlarmPushCallback());
            MqttTopic topic = client.getTopic("client down");
            //setWill方法，如果项目中需要知道客户端是否掉线可以调用该方法。设置最终端口的通知消息
            options.setWill(topic, "close".getBytes(), 0, true);
            client.connect(options);
            //订阅消息
            int[] Qos  = {1};
            String[] topic1 = {topicEntity.getTopicName()};
            client.subscribe(topic1, Qos);

//            测试数据
//            new Thread(new Runnable() {
//                @Override
//                public void run() {
//                    new AlarmPushCallback().messageArrived("alarm", null);
//                }
//            }).start();
        }

        LOG.debug("预警系统已连接" + client);
    }

    /**
     * 重新链接
     */
    private void startReconnect() {
        scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(new Runnable() {
            public void run() {
                if (!client.isConnected()) {
                    try {
                        client.connect(options);
                    } catch (MqttException e) {
                        LOG.error(e);
                    }
                }
            }
        }, 0, 10 * 1000, TimeUnit.MILLISECONDS);
    }

    /**
     * 关闭消息队列连接
     */
    private void disconnect() {
        try {
            if (null != client) {
                client.disconnect();
                LOG.debug("正常关闭预警接收器");
            }

            if (null != scheduler) {
                scheduler.shutdown();
                LOG.debug("正常关闭预警接收器线程池");
            }
        } catch (MqttException e) {
            LOG.error("关闭预警连接异常", e);
        }
    }
}
