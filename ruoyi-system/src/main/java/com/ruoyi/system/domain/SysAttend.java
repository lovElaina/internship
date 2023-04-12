package com.ruoyi.system.domain;

import com.ruoyi.common.core.domain.entity.SysUser;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class SysAttend extends SysUser {

    private static final long serialVersionUID = 1L;

    private Long attendId;

    private Long userId;

    private Long totalDay;

    private Long attendDay;

    private Long leaveDay;

    private Long absentDay;

    private Long lateDay;

    private SysUser user;

    //private Long delFlag;

    /** 公告状态（0正常 1关闭） */
    private String status;


    public SysAttend(){

    }

    public SysAttend(Long attendId) {
        this.attendId = attendId;
    }

    public Long getAttendId() {
        return attendId;
    }

    public void setAttendId(Long attendId) {
        this.attendId = attendId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTotalDay() {
        return totalDay;
    }

    public void setTotalDay(Long totalDay) {
        this.totalDay = totalDay;
    }

    public Long getAttendDay() {
        return attendDay;
    }

    public void setAttendDay(Long attendDay) {
        this.attendDay = attendDay;
    }

    public Long getLeaveDay() {
        return leaveDay;
    }

    public void setLeaveDay(Long leaveDay) {
        this.leaveDay = leaveDay;
    }

    public Long getAbsentDay() {
        return absentDay;
    }

    public void setAbsentDay(Long absentDay) {
        this.absentDay = absentDay;
    }

    public Long getLateDay() {
        return lateDay;
    }

    public void setLateDay(Long lateDay) {
        this.lateDay = lateDay;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public SysUser getUser() {
        return user;
    }

    public void setUser(SysUser user) {
        this.user = user;
    }

//    public String getDelFlag() {
//        return delFlag;
//    }
//
//    public void setDelFlag(Long delFlag) {
//        this.delFlag = delFlag;
//    }

    @Override
    public String toString() {

        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("attendId", getAttendId())
                .append("userId", getUserId())
                .append("totalDay", getTotalDay())
                .append("attendDay", getAttendDay())
                .append("leaveDay", getLeaveDay())
                .append("absentDay", getAbsentDay())
                .append("status", getStatus())
                .append("remark", getRemark())
                .toString();
    }

}
