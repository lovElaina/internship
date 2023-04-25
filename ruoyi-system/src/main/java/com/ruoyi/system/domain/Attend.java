package com.ruoyi.system.domain;

public class Attend {

    private static final long serialVersionUID = 1L;

    private Long attendId;

    private Long stuId;

    private Long attendDate;

    private Long workTime;

    private Long restTime;

    private String result;

    public Attend(){

    }

    public Attend(Long attendId) {
        this.attendId = attendId;
    }

    public Long getAttendId() {
        return attendId;
    }

    public void setAttendId(Long attendId) {
        this.attendId = attendId;
    }

    public Long getStuId() {
        return stuId;
    }

    public void setStuId(Long stuId) {
        this.stuId = stuId;
    }

    public Long getAttendDate() {
        return attendDate;
    }

    public void setAttendDate(Long attendDate) {
        this.attendDate = attendDate;
    }

    public Long getWorkTime() {
        return workTime;
    }

    public void setWorkTime(Long workTime) {
        this.workTime = workTime;
    }

    public Long getRestTime() {
        return restTime;
    }

    public void setRestTime(Long restTime) {
        this.restTime = restTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "Attend{" +
                "attendId=" + attendId +
                ", stuId=" + stuId +
                ", attendDate=" + attendDate +
                ", workTime=" + workTime +
                ", restTime=" + restTime +
                ", result=" + result +
                '}';
    }
}
