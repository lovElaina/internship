package com.ruoyi.system.service;


import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.system.domain.Attend;
import com.ruoyi.system.domain.AttendOverview;

import java.util.List;

public interface ISysAttendService {

    /**
     * 根据学生ID查询出勤信息
     *
     * @param stuId 学生ID
     * @return 出勤信息集合信息
     */
    public List<Attend> selectAttendListByStuId(Long stuId);

    /**
     * 查询所有已开始学生的学生信息
     *
     * @param student 学生
     * @return 学生信息集合信息
     */
    public List<Student> selectInternshipStudent(Student student);

    public List<AttendOverview> selectAttendOverview(Student student);

    //返回某学生的出勤天数
    public int countAttendByStuId(Long stuId);

    //返回某学生的请假天数
    public int countLeaveByStuId(Long stuId);

    //返回某学生的迟到天数
    public int countLateByStuId(Long stuId);

    //返回某学生的缺勤天数
    public int countAbsentByStuId(Long stuId);

    //初始化学生考勤数据
    public int initAttendByStuId(Long stuId);

    public int updateAttend(Attend attend);
}
