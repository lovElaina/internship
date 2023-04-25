package com.ruoyi.common.core.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;

public class Tutor extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long tutorId;

    private Long userId;

    private String tutorName;

    private Long tutorNumber;

    private String tutorGender;

    private String tutorType;

    private String tutorMajor;

    private String delFlag;

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTutorName() {
        return tutorName;
    }

    public void setTutorName(String tutorName) {
        this.tutorName = tutorName;
    }

    public Long getTutorNumber() {
        return tutorNumber;
    }

    public void setTutorNumber(Long tutorNumber) {
        this.tutorNumber = tutorNumber;
    }

    public String getTutorGender() {
        return tutorGender;
    }

    public void setTutorGender(String tutorGender) {
        this.tutorGender = tutorGender;
    }

    public String getTutorType() {
        return tutorType;
    }

    public void setTutorType(String tutorType) {
        this.tutorType = tutorType;
    }

    public String getTutorMajor() {
        return tutorMajor;
    }

    public void setTutorMajor(String tutorMajor) {
        this.tutorMajor = tutorMajor;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "Tutor{" +
                "tutorId=" + tutorId +
                ", userId=" + userId +
                ", tutorName='" + tutorName + '\'' +
                ", tutorNumber=" + tutorNumber +
                ", tutorGender='" + tutorGender + '\'' +
                ", tutorType='" + tutorType + '\'' +
                ", tutorMajor='" + tutorMajor + '\'' +
                ", delFlag='" + delFlag + '\'' +
                '}';
    }
}
