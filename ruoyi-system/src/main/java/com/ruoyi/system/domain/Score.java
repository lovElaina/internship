package com.ruoyi.system.domain;

import com.ruoyi.common.core.domain.BaseEntity;

public class Score extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long scoreId;

    private Long stuId;

    private Float attendScore;

    private Float reportTutorScore;

    private Float reportCompanyScore;

    private Float actionCompanyScore;

    private Float totalScore;

    private String tutorComplete;

    private String companyComplete;

    private String delFlag;

    public Long getScoreId() {
        return scoreId;
    }

    public void setScoreId(Long scoreId) {
        this.scoreId = scoreId;
    }

    public Long getStuId() {
        return stuId;
    }

    public void setStuId(Long stuId) {
        this.stuId = stuId;
    }

    public Float getAttendScore() {
        return attendScore;
    }

    public void setAttendScore(Float attendScore) {
        this.attendScore = attendScore;
    }

    public Float getReportTutorScore() {
        return reportTutorScore;
    }

    public void setReportTutorScore(Float reportTutorScore) {
        this.reportTutorScore = reportTutorScore;
    }

    public Float getReportCompanyScore() {
        return reportCompanyScore;
    }

    public void setReportCompanyScore(Float reportCompanyScore) {
        this.reportCompanyScore = reportCompanyScore;
    }

    public Float getActionCompanyScore() {
        return actionCompanyScore;
    }

    public void setActionCompanyScore(Float actionCompanyScore) {
        this.actionCompanyScore = actionCompanyScore;
    }

    public Float getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Float totalScore) {
        this.totalScore = totalScore;
    }

    public String getTutorComplete() {
        return tutorComplete;
    }

    public void setTutorComplete(String tutorComplete) {
        this.tutorComplete = tutorComplete;
    }

    public String getCompanyComplete() {
        return companyComplete;
    }

    public void setCompanyComplete(String companyComplete) {
        this.companyComplete = companyComplete;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "Score{" +
                "scoreId=" + scoreId +
                ", stuId=" + stuId +
                ", attendScore=" + attendScore +
                ", reportTutorScore=" + reportTutorScore +
                ", reportCompanyScore=" + reportCompanyScore +
                ", totalScore=" + totalScore +
                ", delFlag='" + delFlag + '\'' +
                '}';
    }
}
