package com.ruoyi.system.domain;

import com.ruoyi.common.core.domain.BaseEntity;

public class Post extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long postId;

    private String postName;

    private Long companyId;

    private String postSalary;

    private String workTime;

    private String attendTime;

    private String postMajor;

    private String postRequirement;

    private String delFlag;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getPostSalary() {
        return postSalary;
    }

    public void setPostSalary(String postSalary) {
        this.postSalary = postSalary;
    }

    public String getWorkTime() {
        return workTime;
    }

    public void setWorkTime(String workTime) {
        this.workTime = workTime;
    }

    public String getAttendTime() {
        return attendTime;
    }

    public void setAttendTime(String attendTime) {
        this.attendTime = attendTime;
    }

    public String getPostMajor() {
        return postMajor;
    }

    public void setPostMajor(String postMajor) {
        this.postMajor = postMajor;
    }

    public String getPostRequirement() {
        return postRequirement;
    }

    public void setPostRequirement(String postRequirement) {
        this.postRequirement = postRequirement;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postId=" + postId +
                ", postName='" + postName + '\'' +
                ", companyId=" + companyId +
                ", postSalary='" + postSalary + '\'' +
                ", workTime='" + workTime + '\'' +
                ", attendTime='" + attendTime + '\'' +
                ", postMajor='" + postMajor + '\'' +
                ", postRequirement='" + postRequirement + '\'' +
                ", delFlag='" + delFlag + '\'' +
                '}';
    }
}
