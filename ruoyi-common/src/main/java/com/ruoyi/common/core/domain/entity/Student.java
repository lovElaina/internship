package com.ruoyi.common.core.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;

public class Student extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long stuId;

    private Long userId;

    private String stuName;

    private String stuGender;

    private Long stuNumber;

    private String stuMajor;

    private Long tutorId;

    private Long postId;

    private Long startTime;

    private Long endTime;

    private String internshipStatus;

    private String remark;

    private String delFlag;

    public Long getStuId() {
        return stuId;
    }

    public void setStuId(Long stuId) {
        this.stuId = stuId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public String getStuGender() {
        return stuGender;
    }

    public void setStuGender(String stuGender) {
        this.stuGender = stuGender;
    }

    public Long getStuNumber() {
        return stuNumber;
    }

    public void setStuNumber(Long stuNumber) {
        this.stuNumber = stuNumber;
    }

    public String getStuMajor() {
        return stuMajor;
    }

    public void setStuMajor(String stuMajor) {
        this.stuMajor = stuMajor;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
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

    public String getInternshipStatus() {
        return internshipStatus;
    }

    public void setInternshipStatus(String internshipStatus) {
        this.internshipStatus = internshipStatus;
    }

    @Override
    public String getRemark() {
        return remark;
    }

    @Override
    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "Student{" +
                "stuId=" + stuId +
                ", userId=" + userId +
                ", stuName='" + stuName + '\'' +
                ", stuGender='" + stuGender + '\'' +
                ", stuNumber=" + stuNumber +
                ", stuMajor='" + stuMajor + '\'' +
                ", tutorId=" + tutorId +
                ", postId=" + postId +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", internshipStatus='" + internshipStatus + '\'' +
                ", delFlag='" + delFlag + '\'' +
                '}';
    }
}
