package com.ruoyi.web.controller.system;


import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.core.domain.entity.SysDept;
import com.ruoyi.common.core.domain.entity.User;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.Attend;
import com.ruoyi.system.domain.Report;
import com.ruoyi.system.service.*;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

/**
 * 学生信息
 *
 * @author zyc
 */
@RestController
@RequestMapping("/system/student")
public class SysStudentController extends BaseController {

    @Autowired
    private ISysStudentService studentService;

//    @Autowired
//    private ISysUserService userService;
//
//    @Autowired
//    private ISysDeptService deptService;

    @Autowired
    private ISysAttendService attendService;

    @Autowired
    private ISysReportService reportService;

//    /**
//     * 获取学生列表
//     */
//    @GetMapping("/list")
//    public TableDataInfo studentList(Student student)
//    {
//        startPage();
//        List<Student> list = studentService.selectStudentList(student);
//        return getDataTable(list);
//    }

    /**
     * 获取学生列表(DeptId筛选)
     */
    @GetMapping("/list")
    public TableDataInfo studentList(User user)
    {
        startPage();
        List<Student> studentList = studentService.selectStudentListByDeptId(user);
        return getDataTable(studentList);
    }

    /**
     * 根据学生ID获取详细信息
     */
    @GetMapping(value = "/{stuId}")
    public AjaxResult getInfo(@PathVariable Long stuId){
        AjaxResult ajax = AjaxResult.success();
        Student student = studentService.selectStudentByStuId(stuId);
        ajax.put(AjaxResult.DATA_TAG, student);
        return ajax;
    }

    /**
     * 根据学生ID获取待办事项
     */
    @GetMapping(value = "/activities/{stuId}")
    public AjaxResult getActivities(@PathVariable Long stuId) {
        JSONArray list = new JSONArray();
        JSONObject item = new JSONObject();
        AjaxResult ajax = AjaxResult.success();
        List<Attend> attends = attendService.selectAttendListByStuId(stuId);
        List<Report> reports = reportService.selectReportListById(stuId);

        for (Attend a : attends) {
            if (Objects.equals(a.getAttendDate(), DateUtils.initDateByDay()) && a.getWorkTime() == null && Objects.equals(a.getResult(), "5")) {
                item.put("id", "1");
                item.put("text","今日还未完成上班打卡，请及时处理。");
                list.add(item);
            }
            if (Objects.equals(a.getAttendDate(), DateUtils.initDateByDay()) && a.getWorkTime() != null && a.getRestTime() == null) {
                item.put("id", "2");
                item.put("text","今日还未完成下班打卡，请17:00之后进行下班打卡。");
                list.add(item);
            }
        }

        for (Report r : reports) {
            if (Objects.equals(r.getReportDate(), DateUtils.initDateByDay()) && Objects.equals(r.getReportStatus(), "2") && Objects.equals(r.getReportType(), "0")) {
                item.put("id", "3");
                item.put("text","今日还未提交实习日报，请及时提交。");
                list.add(item);
            }

            if (Objects.equals(r.getReportDate(), DateUtils.initDateByDay()) && Objects.equals(r.getReportStatus(), "2") && Objects.equals(r.getReportType(), "1")) {
                item.put("id", "4");
                item.put("text","今日还未提交实习周报，请及时提交。");
                list.add(item);
            }

            if (Objects.equals(r.getReportDate(), DateUtils.initDateByDay()) && Objects.equals(r.getReportStatus(), "2") && Objects.equals(r.getReportType(), "2")) {
                item.put("id", "5");
                item.put("text","今日还未提交实习月报，请及时提交。");
                list.add(item);
            }
        }

        if(list.size()==0){
            item.put("id","0");
            item.put("text","恭喜，今日待办事项已全部完成！");
            list.add(item);
        }

        ajax.put("data",list);
        return ajax;
    }

    /**
     * 新增学生
     */
    @PostMapping
    public AjaxResult add(@Validated @RequestBody Student student)
    {
        int res = studentService.insertStudent(student);
        if(res == 100){
            return AjaxResult.error("新增学生'"  + "'失败，登录账号已存在");
        }
        if(res == 200){
            return AjaxResult.error("新增学生'"  + "'失败，手机号码已存在");
        }
        if(res == 300){
            return AjaxResult.error("新增学生'" + "'失败，邮箱账号已存在");
        }
        return toAjaxEx(res);
    }

    /**
     * 修改学生
     */
    @PutMapping
    public AjaxResult edit(@Validated @RequestBody Student student)
    {
        int res = studentService.updateStudent(student);
        if(res == 100){
            return AjaxResult.error("修改学生'"  + "'失败，登录账号已存在");
        }
        if(res == 200){
            return AjaxResult.error("修改学生'"  + "'失败，手机号码已存在");
        }
        if(res == 300){
            return AjaxResult.error("修改学生'" + "'失败，邮箱账号已存在");
        }
        return toAjaxEx(res);
    }

    /**
     * 删除学生
     */
    @DeleteMapping("/{stuId}")
    public AjaxResult remove(@PathVariable Long stuId)
    {
//        if (ArrayUtils.contains(userIds, getUserId()))
//        {
//            return error("当前学生不能删除");
//        }
        return toAjaxEx(studentService.deleteStudentById(stuId));
    }

//    /**
//     * 获取部门树列表
//     */
//    @GetMapping("/deptTree")
//    public AjaxResult deptTree(SysDept dept)
//    {
//        return AjaxResult.success(deptService.selectDeptTreeList(dept));
//    }
}
