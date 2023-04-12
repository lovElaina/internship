package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.SysAttend;
import com.ruoyi.system.service.ISysAttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/system/attend")
public class SysAttendController extends BaseController {
    @Autowired
    private ISysAttendService attendService;


    @GetMapping("/list")
    public TableDataInfo list(SysAttend attend)
    {
        startPage();
        List<SysAttend> list = attendService.selectAttendList(attend);
        return getDataTable(list);
    }
}
