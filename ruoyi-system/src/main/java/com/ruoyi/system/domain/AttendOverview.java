package com.ruoyi.system.domain;

public class AttendOverview {

    private Long stuId;

    private String stuName;

    private Long stuNumber;

    private Long startTime;

    private Long endTime;

//    //已过天数 等于所有天数相加
//    private int alreadyDay;

    private int attendDay;

    private int leaveDay;

    private int lateDay;

    private int absentDay;

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

//    public int getAlreadyDay() {
//        return alreadyDay;
//    }
//
//    public void setAlreadyDay(int alreadyDay) {
//        this.alreadyDay = alreadyDay;
//    }

    public int getAttendDay() {
        return attendDay;
    }

    public void setAttendDay(int attendDay) {
        this.attendDay = attendDay;
    }

    public int getLeaveDay() {
        return leaveDay;
    }

    public void setLeaveDay(int leaveDay) {
        this.leaveDay = leaveDay;
    }

    public int getLateDay() {
        return lateDay;
    }

    public void setLateDay(int lateDay) {
        this.lateDay = lateDay;
    }

    public int getAbsentDay() {
        return absentDay;
    }

    public void setAbsentDay(int absentDay) {
        this.absentDay = absentDay;
    }

    @Override
    public String toString() {
        return "AttendOverview{" +
                "stuId=" + stuId +
                ", stuName='" + stuName + '\'' +
                ", stuNumber=" + stuNumber +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", attendDay=" + attendDay +
                ", leaveDay=" + leaveDay +
                ", lateDay=" + lateDay +
                ", absentDay=" + absentDay +
                '}';
    }
}
