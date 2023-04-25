package com.ruoyi.system.service;

import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.system.domain.Report;
import com.ruoyi.system.domain.ReportOverview;

import java.util.List;

public interface ISysReportService {

    public List<Report> selectReportListById(Long stuId);

    public List<ReportOverview> selectReportOverview(Student student);

    public int initReportByStuId(Long stuId);

    public int updateReport(Report report);
}
