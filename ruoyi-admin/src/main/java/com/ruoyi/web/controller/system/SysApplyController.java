package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.Apply;


import com.ruoyi.system.service.IApplyService;
import com.ruoyi.system.service.ISysStudentService;
import com.ruoyi.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/internship/apply")
public class SysApplyController extends BaseController {

//    @Autowired
//    private ISysApplyService applyService;
    @Autowired
    private IApplyService applyService;

    @Autowired
    private ISysUserService userService;

    @Autowired
    private ISysStudentService studentService;

    @GetMapping("/list")
    public TableDataInfo list(Apply apply)
    {
        startPage();
        List<Apply> list = applyService.selectApplyList(apply);
        List<Apply> newList = new ArrayList<>();

        Long roleId = userService.selectUserById(getUserId()).getRoleId();



        //教务
        if(roleId == 1){
            for(Apply a : list){
                if(Objects.equals(a.getApplyRole(), "2")){
                    newList.add(a);
                }
            }
        }
        //导师
        if(roleId == 3){
            for(Apply a : list){
                if(Objects.equals(a.getApplyRole(), "1")){
                    newList.add(a);
                }
            }
        }
        //企业
        if(roleId == 5){
            for(Apply a : list){
                if(Objects.equals(a.getApplyRole(), "0")){
                    newList.add(a);
                }
            }
        }
        //学生
        //过滤，仅保留自己的申请信息
        if(roleId ==4){
            Long stuId = studentService.selectStudentByUserId(getUserId()).getStuId();
            for(Apply a : list){
                if(Objects.equals(a.getStuId(), stuId)){
                    newList.add(a);
                }
            }
        }
        return getDataTable(newList);
    }

    @GetMapping(value = "/{applyId}")
    public AjaxResult getInfo(@PathVariable Long applyId)
    {
        return AjaxResult.success(applyService.selectApplyById(applyId));
    }

    @PutMapping
    public AjaxResult edit(@Validated @RequestBody Apply apply)
    {
        //apply.setUpdateBy(getUsername());
        return toAjax(applyService.updateApply(apply));
    }

    @PostMapping
    public AjaxResult add(@Validated @RequestBody Apply apply){
        return toAjax(applyService.insertApply(apply));
    }

    @DeleteMapping("/{applyId}")
    public AjaxResult remove(@PathVariable Long applyId)
    {
        return toAjax(applyService.deleteApplyById(applyId));
    }
}

