package com.ruoyi.system.service.impl;

import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.system.domain.Report;
import com.ruoyi.system.domain.ReportOverview;
import com.ruoyi.system.domain.Score;
import com.ruoyi.system.mapper.ReportMapper;
import com.ruoyi.system.mapper.ScoreMapper;
import com.ruoyi.system.mapper.StudentMapper;
import com.ruoyi.system.service.ISysReportService;
import com.ruoyi.system.service.ISysScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

import com.ruoyi.common.utils.DateUtils;

@Service
public class SysReportServiceImpl implements ISysReportService {

    @Autowired
    private ReportMapper reportMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private ScoreMapper scoreMapper;

    @Override
    public List<Report> selectReportListById(Long stuId){
        return reportMapper.selectReportListByStuId(stuId);
    }

    @Override
    @Transactional
    public List<ReportOverview> selectReportOverview(Student student){
        List<Student> reportStudent = studentMapper.selectInternshipStudent(student);
        List<ReportOverview> reportOverviews = new LinkedList<>();
        for(Student stu : reportStudent){
            ReportOverview rov = new ReportOverview();
            rov.setStuId(stu.getStuId());
            rov.setStuName(stu.getStuName());
            rov.setStuNumber(stu.getStuNumber());
            rov.setStartTime(stu.getStartTime());
            rov.setEndTime(stu.getEndTime());
            rov.setPlanDay(DateUtils.getWeekdayTimestampsBetweenDates(stu.getStartTime(),stu.getEndTime()).size());
            rov.setPlanWeek(DateUtils.getFridayTimestampsBetweenDates(stu.getStartTime(),stu.getEndTime()).size());
            rov.setPlanMonth(DateUtils.getLastDayOfMonthTimestampsBetweenDates(stu.getStartTime(),stu.getEndTime()).size());
            rov.setActualDay(reportMapper.countDayReportByStuId(stu.getStuId()));
            rov.setActualWeek(reportMapper.countWeekReportByStuId(stu.getStuId()));
            rov.setActualMonth(reportMapper.countMonthReportByStuId(stu.getStuId()));
            reportOverviews.add(rov);
        }
        return reportOverviews;
    }

    @Override
    @Transactional
    public int initReportByStuId(Long stuId){
        Student student = studentMapper.selectStudentByStuId(stuId);
        Long startTime = student.getStartTime();
        Long endTime = student.getEndTime();
        ArrayList<Long> weekdayTimestampsBetweenDates = DateUtils.getWeekdayTimestampsBetweenDates(startTime, endTime);
        for(Long days:weekdayTimestampsBetweenDates){
            Report report = new Report();
            report.setStuId(stuId);
            report.setReportTitle(DateUtils.conversionTime(days)+"实习日报");
            report.setPlanDate(days);
            report.setTutorMark("0");
            report.setCompanyMark("0");
            report.setReportType("0");
            reportMapper.insertReport(report);
        }

        ArrayList<Long> fridayTimestampsBetweenDates = DateUtils.getFridayTimestampsBetweenDates(startTime, endTime);
        for(Long weeks:fridayTimestampsBetweenDates){
            Report report = new Report();
            report.setStuId(stuId);
            report.setReportTitle(DateUtils.conversionTime(weeks)+"实习周报");
            report.setPlanDate(weeks);
            report.setTutorMark("0");
            report.setCompanyMark("0");
            report.setReportType("1");
            reportMapper.insertReport(report);
        }

        ArrayList<Long> lastDayOfMonthTimestampsBetweenDates = DateUtils.getLastDayOfMonthTimestampsBetweenDates(startTime, endTime);
        for(Long months:lastDayOfMonthTimestampsBetweenDates){
            Report report = new Report();
            report.setStuId(stuId);
            report.setReportTitle(DateUtils.conversionTime(months)+"实习月报");
            report.setPlanDate(months);
            report.setTutorMark("0");
            report.setCompanyMark("0");
            report.setReportType("2");
            reportMapper.insertReport(report);
        }

        return 1;
    }



    @Override
    @Transactional
    public int updateReport(Report report){
        int i = reportMapper.updateReport(report);
        Report rep = reportMapper.selectReportById(report.getReportId());
        Long stuId = rep.getStuId();
        //获取全部报告列表
        List<Report> reportList = reportMapper.selectAllByStuId(stuId);

        Score score = scoreMapper.selectScoreByStuId(stuId);


        int size = reportList.size();
        if(Objects.equals(report.getTutorMark(), "1")){
            Long total = 0L;
            int num = 0;
            for(Report r : reportList){
                if(r.getTutorGrade()!=null){
                    total = total + r.getTutorGrade();
                    num = num + 1;
                }
            }
            score.setReportTutorScore((float) (total/num));
            if(num == size){
                score.setTutorComplete("1");
            }

        }

        if(Objects.equals(report.getCompanyMark(), "1")){
            Long total = 0L;
            int num = 0;
            for(Report r : reportList){
                if(r.getCompanyGrade()!=null){
                    total = total + r.getCompanyGrade();
                    num = num + 1;
                }
            }
            score.setReportCompanyScore((float) (total/num));
            if(num == size){
                score.setCompanyComplete("1");
            }
        }
        score.setTotalScore((score.getActionCompanyScore()!=null?score.getActionCompanyScore()*0.3f:0)+(score.getAttendScore()!=null?score.getAttendScore()*0.3f:0)+(score.getReportCompanyScore()!=null?score.getReportCompanyScore()*0.2f:0)+(score.getReportTutorScore()!=null?score.getReportTutorScore()*0.2f:0));
        int j = scoreMapper.updateScore(score);
        return i + j;
    }

}
