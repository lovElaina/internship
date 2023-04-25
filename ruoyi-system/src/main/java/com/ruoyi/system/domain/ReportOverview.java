package com.ruoyi.system.domain;

public class ReportOverview {

    private Long stuId;

    private String stuName;

    private Long stuNumber;

    private Long startTime;

    private Long endTime;

    private int planDay;

    private int actualDay;

    private int planWeek;

    private int actualWeek;

    private int planMonth;

    private int actualMonth;

    public Long getStuId() {
        return stuId;
    }

    public void setStuId(Long stuId) {
        this.stuId = stuId;
    }

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public Long getStuNumber() {
        return stuNumber;
    }

    public void setStuNumber(Long stuNumber) {
        this.stuNumber = stuNumber;
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

    public int getPlanDay() {
        return planDay;
    }

    public void setPlanDay(int planDay) {
        this.planDay = planDay;
    }

    public int getActualDay() {
        return actualDay;
    }

    public void setActualDay(int actualDay) {
        this.actualDay = actualDay;
    }

    public int getPlanWeek() {
        return planWeek;
    }

    public void setPlanWeek(int planWeek) {
        this.planWeek = planWeek;
    }

    public int getActualWeek() {
        return actualWeek;
    }

    public void setActualWeek(int actualWeek) {
        this.actualWeek = actualWeek;
    }

    public int getPlanMonth() {
        return planMonth;
    }

    public void setPlanMonth(int planMonth) {
        this.planMonth = planMonth;
    }

    public int getActualMonth() {
        return actualMonth;
    }

    public void setActualMonth(int actualMonth) {
        this.actualMonth = actualMonth;
    }

    @Override
    public String toString() {
        return "ReportOverview{" +
                "stuId=" + stuId +
                ", stuName='" + stuName + '\'' +
                ", stuNumber=" + stuNumber +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", planDay=" + planDay +
                ", actualDay=" + actualDay +
                ", planWeek=" + planWeek +
                ", actualWeek=" + actualWeek +
                ", planMonth=" + planMonth +
                ", actualMonth=" + actualMonth +
                '}';
    }
}
