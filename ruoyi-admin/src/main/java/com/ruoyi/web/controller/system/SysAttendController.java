package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.Attend;
import com.ruoyi.system.domain.AttendOverview;
import com.ruoyi.system.domain.SysAttend;
import com.ruoyi.system.service.ISysAttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/attend")
public class SysAttendController extends BaseController {

    @Autowired
    private ISysAttendService attendService;


    @GetMapping("/list")
    public TableDataInfo list(Student student)
    {
        startPage();
        List<AttendOverview> attendOverviews = attendService.selectAttendOverview(student);
        return getDataTable(attendOverviews);
    }

    @GetMapping(value = "/{stuId}")
    public TableDataInfo logList(@PathVariable Long stuId){
        startPage();
        List<Attend> attends = attendService.selectAttendListByStuId(stuId);
        return getDataTable(attends);
    }

    @PostMapping
    public AjaxResult initAttend(@RequestBody AttendOverview attendOverview){
        return toAjax(attendService.initAttendByStuId(attendOverview.getStuId()));
    }

    @PutMapping
    public AjaxResult updateAttend(@RequestBody Attend attend){
        return toAjax(attendService.updateAttend(attend));
    }
}
