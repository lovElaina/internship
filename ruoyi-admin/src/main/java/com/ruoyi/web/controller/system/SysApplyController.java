package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.SysApply;


import com.ruoyi.system.service.ISysApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/internship/apply")
public class SysApplyController extends BaseController {

    @Autowired
    private ISysApplyService applyService;

    @GetMapping("/list")
    public TableDataInfo list(SysApply apply)
    {
        startPage();
        List<SysApply> list = applyService.selectApplyList(apply);
        return getDataTable(list);
    }

    @GetMapping(value = "/{applyId}")
    public AjaxResult getInfo(@PathVariable Long applyId)
    {
        return AjaxResult.success(applyService.selectApplyById(applyId));
    }

    @PutMapping
    public AjaxResult edit(@Validated @RequestBody SysApply apply)
    {
        apply.setUpdateBy(getUsername());
        return toAjax(applyService.updateApply(apply));
    }

    @DeleteMapping("/{applyIds}")
    public AjaxResult remove(@PathVariable Long[] applyIds)
    {
        return toAjax(applyService.deleteApplyByIds(applyIds));
    }
}

