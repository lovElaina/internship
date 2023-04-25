package com.ruoyi.system.domain;

import com.ruoyi.common.core.domain.BaseEntity;

public class Report extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long reportId;

    private Long stuId;

    private Long planDate;

    private Long reportDate;

    private String reportType;

    private String reportTitle;

    private String reportText;

    private String tutorMark;

    private String companyMark;

    private Long companyGrade;

    private Long tutorGrade;

    private String tutorComment;

    private String companyComment;

    private String reportStatus;

    private String delFlag;

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Long getStuId() {
        return stuId;
    }

    public void setStuId(Long stuId) {
        this.stuId = stuId;
    }

    public Long getPlanDate() {
        return planDate;
    }

    public void setPlanDate(Long planDate) {
        this.planDate = planDate;
    }

    public Long getReportDate() {
        return reportDate;
    }

    public void setReportDate(Long reportDate) {
        this.reportDate = reportDate;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public String getReportTitle() {
        return reportTitle;
    }

    public void setReportTitle(String reportTitle) {
        this.reportTitle = reportTitle;
    }

    public String getReportText() {
        return reportText;
    }

    public void setReportText(String reportText) {
        this.reportText = reportText;
    }

    public String getTutorMark() {
        return tutorMark;
    }

    public void setTutorMark(String tutorMark) {
        this.tutorMark = tutorMark;
    }

    public String getCompanyMark() {
        return companyMark;
    }

    public void setCompanyMark(String companyMark) {
        this.companyMark = companyMark;
    }

    public Long getCompanyGrade() {
        return companyGrade;
    }

    public void setCompanyGrade(Long companyGrade) {
        this.companyGrade = companyGrade;
    }

    public Long getTutorGrade() {
        return tutorGrade;
    }

    public void setTutorGrade(Long tutorGrade) {
        this.tutorGrade = tutorGrade;
    }

    public String getTutorComment() {
        return tutorComment;
    }

    public void setTutorComment(String tutorComment) {
        this.tutorComment = tutorComment;
    }

    public String getCompanyComment() {
        return companyComment;
    }

    public void setCompanyComment(String companyComment) {
        this.companyComment = companyComment;
    }

    public String getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(String reportStatus) {
        this.reportStatus = reportStatus;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "Report{" +
                "reportId=" + reportId +
                ", stuId=" + stuId +
                ", planDate=" + planDate +
                ", reportDate=" + reportDate +
                ", reportType='" + reportType + '\'' +
                ", reportTitle='" + reportTitle + '\'' +
                ", reportText='" + reportText + '\'' +
                ", tutorMark='" + tutorMark + '\'' +
                ", companyMark='" + companyMark + '\'' +
                ", companyGrade=" + companyGrade +
                ", tutorGrade=" + tutorGrade +
                ", tutorComment='" + tutorComment + '\'' +
                ", companyComment='" + companyComment + '\'' +
                ", lateFlag='" + reportStatus + '\'' +
                ", delFlag='" + delFlag + '\'' +
                '}';
    }
}
