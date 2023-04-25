package com.ruoyi.system.service.impl;

import com.ruoyi.common.annotation.DataScope;
import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.system.domain.Attend;
import com.ruoyi.system.domain.AttendOverview;
import com.ruoyi.system.mapper.AttendMapper;
import com.ruoyi.system.mapper.StudentMapper;
import com.ruoyi.system.service.ISysAttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


@Service
public class SysAttendServiceImpl implements ISysAttendService {

    @Autowired
    private AttendMapper attendMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public List<Attend> selectAttendListByStuId(Long stuId) {
        return attendMapper.selectAttendListByStuId(stuId);
    }

    @Override
    public List<Student> selectInternshipStudent(Student student) {
        return studentMapper.selectInternshipStudent(student);
    }

    //获取所有 实习学生 的 出勤概况
    @Override
    @Transactional
    public List<AttendOverview> selectAttendOverview(Student student) {
        //实习状态为 实习中 的所有学生
        List<Student> attendStudent = studentMapper.selectInternshipStudent(student);
        List<AttendOverview> attendOverviews = new LinkedList<>();
        for(Student stu : attendStudent){
            AttendOverview aov = new AttendOverview();
            aov.setStuId(stu.getStuId());
            aov.setStuName(stu.getStuName());
            aov.setStuNumber(stu.getStuNumber());
            aov.setStartTime(stu.getStartTime());
            aov.setEndTime(stu.getEndTime());
            aov.setAttendDay(attendMapper.countAttendByStuId(stu.getStuId()));
            aov.setAbsentDay(attendMapper.countAbsentByStuId(stu.getStuId()));
            aov.setLateDay(attendMapper.countLateByStuId(stu.getStuId()));
            aov.setLeaveDay(attendMapper.countLeaveByStuId(stu.getStuId()));
            attendOverviews.add(aov);
        }
        return attendOverviews;
    }


    @Override
    public int countAttendByStuId(Long stuId) {
        return attendMapper.countAttendByStuId(stuId);
    }

    @Override
    public int countLeaveByStuId(Long stuId) {
        return attendMapper.countLeaveByStuId(stuId);
    }

    @Override
    public int countLateByStuId(Long stuId) {
        return attendMapper.countLateByStuId(stuId);
    }

    @Override
    public int countAbsentByStuId(Long stuId) {
        return attendMapper.countAbsentByStuId(stuId);
    }

    @Override
    @Transactional
    public int initAttendByStuId(Long stuId){
        Student student = studentMapper.selectStudentByStuId(stuId);
        Long startTime = student.getStartTime();
        Long endTime = student.getEndTime();
        ArrayList<Long> weekdayTimestampsBetweenDates = DateUtils.getWeekdayTimestampsBetweenDates(startTime, endTime);
        for(Long days:weekdayTimestampsBetweenDates){
            Attend attend = new Attend();
            attend.setStuId(stuId);
            attend.setAttendDate(days);
            attend.setResult("5");
            attendMapper.insertAttend(attend);
        }
        return 1;
    }

    @Override
    public int updateAttend(Attend attend) {
        return attendMapper.updateAttend(attend);
    }
}
