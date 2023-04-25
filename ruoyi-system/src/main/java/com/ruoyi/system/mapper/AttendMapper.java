package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.Attend;

import java.util.List;

public interface AttendMapper {

    public List<Attend> selectAttendListByStuId(Long stuId);

    public int insertAttend(Attend attend);

    //返回某学生的出勤天数
    public int countAttendByStuId(Long stuId);

    //返回某学生的请假天数
    public int countLeaveByStuId(Long stuId);

    //返回某学生的迟到天数
    public int countLateByStuId(Long stuId);

    //返回某学生的缺勤天数
    public int countAbsentByStuId(Long stuId);

    public int updateAttend(Attend attend);
}
