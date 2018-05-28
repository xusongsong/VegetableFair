package com.coorun.faceidentifymanage.entity;

import java.util.List;

/**
 * 接收海康返回的数据
 */
public class HikListResponseEntity extends HIKResponseEntity {

    private Data data = new Data();

    static class Data {
        private List list;
        private int pageNo;
        private int pageSize;
        private int total;

        public void setList(List list) {
            this.list = list;
        }

        public void setPageNo(int pageNo) {
            this.pageNo = pageNo;
        }

        public void setPageSize(int pageSize) {
            this.pageSize = pageSize;
        }

        public void setTotal(int total) {
            this.total = total;
        }
    }

    @Override
    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public List getList() {
        return data.list;
    }

    public int getPageNo() {
        return data.pageNo;
    }

    public int getPageSize() {
        return data.pageSize;
    }

    public int getTotal() {
        return data.total;
    }
}
