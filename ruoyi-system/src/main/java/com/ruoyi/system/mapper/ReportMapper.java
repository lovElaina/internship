package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.Report;

import java.util.List;

public interface ReportMapper {


    /**
     * 根据学生ID返回实交日报数
     *
     * @param stuId 学生信息
     * @return 实交日报数量
     */
    public int countDayReportByStuId(Long stuId);

    /**
     * 根据学生ID返回实交周报数
     *
     * @param stuId 学生信息
     * @return 实交周报数量
     */
    public int countWeekReportByStuId(Long stuId);

    /**
     * 根据学生ID返回实交月报数
     *
     * @param stuId 学生信息
     * @return 实交月报数量
     */
    public int countMonthReportByStuId(Long stuId);


    /**
     * 根据学生ID返回实习报告列表
     *
     * @param stuId 学生信息
     * @return 实习报告列表
     */
    public List<Report> selectReportListByStuId(Long stuId);

    public List<Report> selectAllByStuId(Long stuId);

    public Report selectReportById(Long reportId);


    public int insertReport(Report report);

    public int updateReport(Report report);
}
