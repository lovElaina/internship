package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.Report;
import com.ruoyi.system.domain.ReportOverview;
import com.ruoyi.system.service.ISysReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/report")
public class SysReportController extends BaseController {

    @Autowired
    private ISysReportService reportService;

    @GetMapping("/list")
    public TableDataInfo list(Student student){
        startPage();
        List<ReportOverview> reportOverviews = reportService.selectReportOverview(student);
        return getDataTable(reportOverviews);
    }

    @GetMapping(value = "/{stuId}")
    public TableDataInfo reportDetailList(@PathVariable Long stuId){
        startPage();
        List<Report> reports = reportService.selectReportListById(stuId);
        return getDataTable(reports);
    }

    @PostMapping
    public AjaxResult initReport(@RequestBody ReportOverview reportOverview){
        return toAjax(reportService.initReportByStuId(reportOverview.getStuId()));
    }

    @PutMapping
    public AjaxResult edit(@RequestBody Report report){
        return toAjaxEx(reportService.updateReport(report));
    }
}
