package com.coorun.faceidentifymanage.mq.realtimemessage;

import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.util.StringUtils;
import com.hikvision.fas.caller.DefaultCaller;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Component
public class SnapshotMessageAcceptor {

    @Resource
    private HikDatasource hikDatasource;
//    @Resource
//    private RealTimeDataService liveDataService;
    private DefaultCaller defaultCaller;
    private Logger LOG = Logger.getLogger(SnapshotMessageAcceptor.class);


    @PostConstruct
    public void startSnapshotAcceptor() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    initSnapshotAcceptor();
                } catch (Exception e) {
                    LOG.error("启动实时抓拍接收器失败", e);
                }
            }
        }).start();
    }

    /**
     * 构建抓拍机监控器
     *
     * @return
     */
    private void initSnapshotAcceptor() {
            Map<String, String> map = new HashMap<>();
            map.put("group.id", "SNAPSHOT_MESSAGE_0712");
            map.put("artemis.getKafka", "/artemis/api/fms/v2/system/getKafkaAddress");
            map.put("artemis.address", hikDatasource.getHost());
            map.put("artemis.appKey", hikDatasource.getAppKey());
            map.put("artemis.appSecret", hikDatasource.getAppSecret());
            LOG.debug("连接kafka参数: " + map);

            this.defaultCaller = new DefaultCaller(map, new SnapshotPushCallback());
    }
}
