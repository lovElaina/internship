package com.ruoyi.system.service.impl;

import com.ruoyi.common.core.domain.entity.Company;
import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.system.domain.Apply;
import com.ruoyi.system.domain.Attend;
import com.ruoyi.system.domain.Post;
import com.ruoyi.system.domain.Report;
import com.ruoyi.system.mapper.*;
import com.ruoyi.system.service.IApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.ldap.PagedResultsControl;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
public class ApplyServiceImpl implements IApplyService {

    @Autowired
    private ApplyMapper applyMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private ReportMapper reportMapper;

    @Autowired
    private AttendMapper attendMapper;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private CompanyMapper companyMapper;

    @Override
    public Apply selectApplyById(Long applyId) {

        return applyMapper.selectApplyById(applyId);
    }

    @Override
    public List<Apply> selectApplyList(Apply apply) {
        List<Apply> applies = applyMapper.selectApplyList(apply);
        for(Apply a : applies){
            Student student = studentMapper.selectStudentByStuId(a.getStuId());
            Post post = postMapper.selectPostById(a.getPostId());
            Company company = companyMapper.selectCompanyById(post.getCompanyId());
            HashMap<String,Object> map = new HashMap<>();
            map.put("stuname",student.getStuName());
            map.put("stunumber",student.getStuNumber());
            map.put("post",company.getCompanyName()+"-"+post.getPostName());
            a.setExtra(map);
        }
        return applies;
    }

    @Override
    @Transactional
    public int updateApply(Apply apply) {
        //开始实习
        if(Objects.equals(apply.getApplyType(), "0")){
            //开始实习-企业
            if(apply.getApplyRole()=="0"){
                //开始实习-企业-申请通过
                if(apply.getApplyStatus()=="2"){
                    apply.setApplyStatus("0");
                    apply.setApplyRole("1");
                }
                //开始实习-企业-申请拒绝
            }

            //开始实习-导师
            if(apply.getApplyRole()=="1"){
                //开始实习-导师-申请通过
                if(apply.getApplyStatus()=="2"){
                    apply.setApplyStatus("0");
                    apply.setApplyRole("2");
                }
                //开始实习-企业-申请拒绝
            }

            //开始实习-教务
            if(apply.getApplyRole()=="2"){
                if(apply.getApplyStatus()=="2"){
                    //改变学生实习信息
                    Student student = studentMapper.selectStudentByStuId(apply.getStuId());
                    student.setStartTime(apply.getStartTime());
                    student.setEndTime(apply.getEndTime());
                    student.setPostId(apply.getPostId());

                    /////////////////////////////////初始化实习报告////////////////////////////////////////////
                    Long startTime = apply.getStartTime();
                    Long endTime = apply.getEndTime();
                    ArrayList<Long> weekdayTimestampsBetweenDates = DateUtils.getWeekdayTimestampsBetweenDates(startTime, endTime);
                    for(Long days:weekdayTimestampsBetweenDates){
                        Report report = new Report();
                        report.setStuId(apply.getStuId());
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
                        report.setStuId(apply.getStuId());
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
                        report.setStuId(apply.getStuId());
                        report.setReportTitle(DateUtils.conversionTime(months)+"实习月报");
                        report.setPlanDate(months);
                        report.setTutorMark("0");
                        report.setCompanyMark("0");
                        report.setReportType("2");
                        reportMapper.insertReport(report);
                    }

                    /////////////////////////////////初始化出勤日志////////////////////////////////////////////
                    ArrayList<Long> weekdayTimestampsBetweenDates2 = DateUtils.getWeekdayTimestampsBetweenDates(startTime, endTime);
                    for(Long days:weekdayTimestampsBetweenDates2){
                        Attend attend = new Attend();
                        attend.setStuId(apply.getStuId());
                        attend.setAttendDate(days);
                        attend.setResult("5");
                        attendMapper.insertAttend(attend);
                    }
                }
            }
        }

        //请假
        if(Objects.equals(apply.getApplyType(), "3")) {
            //请假-企业
            if (apply.getApplyRole() == "0") {
                //请假-企业-申请通过
                if (apply.getApplyStatus() == "2") {
                    List<Attend> attends = attendMapper.selectAttendListByStuId(apply.getStuId());
                    boolean isNormal = false;
                    for(Attend a : attends){
                        if(a.getAttendDate()>=apply.getStartTime() && a.getAttendDate()<=apply.getEndTime()){
                            a.setResult("1");
                            attendMapper.updateAttend(a);
                            isNormal = true;
                        }
                    }
                    if(!isNormal){
                        //错误：请假日期不合法
                        return 100;
                    }
                }
                //请假-企业-申请拒绝
            }
        }


        return applyMapper.updateApply(apply);
    }

    @Override
    public int insertApply(Apply apply) {
        return applyMapper.insertApply(apply);
    }

    @Override
    public int deleteApplyById(Long applyId) {
        return applyMapper.deleteApplyById(applyId);
    }
}
