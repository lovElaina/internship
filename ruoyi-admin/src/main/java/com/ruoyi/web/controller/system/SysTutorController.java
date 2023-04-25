package com.ruoyi.web.controller.system;


import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.core.domain.entity.Tutor;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.service.ISysTutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 导师信息
 *
 * @author zyc
 */
@RestController
@RequestMapping("/system/tutor")
public class SysTutorController extends BaseController {

    @Autowired
    private ISysTutorService tutorService;

    /**
     * 获取导师列表
     */
    @GetMapping("/list")
    public TableDataInfo tutorList(Tutor tutor)
    {
        startPage();
        List<Tutor> list = tutorService.selectTutorList(tutor);
        return getDataTable(list);
    }

    /**
     * 根据导师ID获取详细信息
     */
    @GetMapping(value = "/{tutorId}")
    public AjaxResult getInfo(@PathVariable Long tutorId){
        AjaxResult ajax = AjaxResult.success();
        Tutor tutor = tutorService.selectTutorListByTutorId(tutorId);
        ajax.put(AjaxResult.DATA_TAG, tutor);
        return ajax;
    }

    /**
     * 新增导师
     */
    @PostMapping
    public AjaxResult add(@Validated @RequestBody Tutor tutor)
    {
        int res = tutorService.insertTutor(tutor);
        if(res == 100){
            return AjaxResult.error("新增导师'"  + "'失败，登录账号已存在");
        }
        if(res == 200){
            return AjaxResult.error("新增导师'"  + "'失败，手机号码已存在");
        }
        if(res == 300){
            return AjaxResult.error("新增导师'" + "'失败，邮箱账号已存在");
        }
        return toAjaxEx(res);
    }

    /**
     * 修改导师
     */
    @PutMapping
    public AjaxResult edit(@Validated @RequestBody Tutor tutor)
    {
        int res = tutorService.updateTutor(tutor);
        if(res == 100){
            return AjaxResult.error("修改导师'"  + "'失败，登录账号已存在");
        }
        if(res == 200){
            return AjaxResult.error("修改导师'"  + "'失败，手机号码已存在");
        }
        if(res == 300){
            return AjaxResult.error("修改导师'" + "'失败，邮箱账号已存在");
        }
        return toAjaxEx(res);
    }

    /**
     * 删除导师
     */
    @DeleteMapping("/{tutorId}")
    public AjaxResult remove(@PathVariable Long tutorId)
    {

        return toAjaxEx(tutorService.deleteTutorById(tutorId));
    }


}
