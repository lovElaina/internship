package com.ruoyi.system.domain;

import com.ruoyi.common.core.domain.BaseEntity;

public class Apply extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long applyId;

    private Long stuId;

    private String applyType;

    private String applyDetail;

    private String applyRole;

    private String applyStatus;

    private String refuseDetail;

    private Long startTime;

    private Long endTime;

    private Long applyTime;

    private Long postId;

    private Long delFlag;

    public Long getApplyId() {
        return applyId;
    }

    public void setApplyId(Long applyId) {
        this.applyId = applyId;
    }

    public Long getStuId() {
        return stuId;
    }

    public void setStuId(Long stuId) {
        this.stuId = stuId;
    }

    public String getApplyType() {
        return applyType;
    }

    public void setApplyType(String applyType) {
        this.applyType = applyType;
    }

    public String getApplyDetail() {
        return applyDetail;
    }

    public void setApplyDetail(String applyDetail) {
        this.applyDetail = applyDetail;
    }

    public String getApplyRole() {
        return applyRole;
    }

    public void setApplyRole(String applyRole) {
        this.applyRole = applyRole;
    }

    public String getApplyStatus() {
        return applyStatus;
    }

    public void setApplyStatus(String applyStatus) {
        this.applyStatus = applyStatus;
    }

    public String getRefuseDetail() {
        return refuseDetail;
    }

    public void setRefuseDetail(String refuseDetail) {
        this.refuseDetail = refuseDetail;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public Long getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(Long applyTime) {
        this.applyTime = applyTime;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Long delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "Apply{" +
                "applyId=" + applyId +
                ", stuId=" + stuId +
                ", applyType='" + applyType + '\'' +
                ", applyDetail='" + applyDetail + '\'' +
                ", applyRole='" + applyRole + '\'' +
                ", applyStatus='" + applyStatus + '\'' +
                ", refuseDetail='" + refuseDetail + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", applyTime=" + applyTime +
                ", postId=" + postId +
                ", delFlag=" + delFlag +
                '}';
    }
}
