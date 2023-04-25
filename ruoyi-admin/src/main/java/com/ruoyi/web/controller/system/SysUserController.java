package com.ruoyi.web.controller.system;

import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;

import com.ruoyi.common.core.domain.entity.*;
import com.ruoyi.system.service.*;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.common.utils.poi.ExcelUtil;

/**
 * 学生信息
 *
 * @author ruoyi
 */
@RestController
@RequestMapping("/system/user")
public class SysUserController extends BaseController
{
    @Autowired
    private ISysUserService userService;

    @Autowired
    private ISysRoleService roleService;


    @Autowired
    private ISysPostService postService;


    @Autowired
    private ISysDeptService deptService;

    @Autowired
    private ISysStudentService studentService;

//    /**
//     * 获取用户列表
//     */
//    @PreAuthorize("@ss.hasPermi('system:user:list')")
//    @GetMapping("/list")
//    public TableDataInfo list(User user)
//    {
//        startPage();
//        List<User> list = userService.selectUserList(user);
//        return getDataTable(list);
//    }


//    /**
//     * 获取学生列表
//     */
//    @PreAuthorize("@ss.hasPermi('system:user:list')")
//    @GetMapping("/studentlist")
//    public TableDataInfo studentlist(Student student)
//    {
//        startPage();
//        List<Student> list = studentService.selectStudentList(student);
//        return getDataTable(list);
//    }


//    /**
//     * 获取导师列表
//     */
//    @PreAuthorize("@ss.hasPermi('system:user:list')")
//    @GetMapping("/tutorlist")
//    public TableDataInfo tutorlist(SysUser user)
//    {
//        startPage();
//        List<SysUser> list = userService.selectTutorList(user);
//        return getDataTable(list);
//    }



    /**
     * 根据学生编号获取详细信息
     */
    @PreAuthorize("@ss.hasPermi('system:user:query')")
    @GetMapping(value = { "/", "/{userId}" })
    public AjaxResult getInfo(@PathVariable(value = "userId", required = false) Long userId)
    {
        userService.checkUserDataScope(userId);
        AjaxResult ajax = AjaxResult.success();
        List<SysRole> roles = roleService.selectRoleAll();
        ajax.put("roles", User.isAdmin(userId) ? roles : roles.stream().filter(r -> !r.isAdmin()).collect(Collectors.toList()));
        ajax.put("posts", postService.selectPostAll());
        if (StringUtils.isNotNull(userId))
        {
            User user = userService.selectUserById(userId);
            ajax.put(AjaxResult.DATA_TAG, user);
            //ajax.put("postIds", postService.selectPostListByUserId(userId));
            ajax.put("roleIds", user.getRoles().stream().map(SysRole::getRoleId).collect(Collectors.toList()));
        }
        return ajax;
    }

    /**
     * 新增学生
     */
    @PreAuthorize("@ss.hasPermi('system:user:add')")
    @Log(title = "学生管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@Validated @RequestBody User user)
    {
        if (UserConstants.NOT_UNIQUE.equals(userService.checkUserNameUnique(user)))
        {
            return AjaxResult.error("新增学生'" + user.getUserName() + "'失败，登录账号已存在");
        }
        else if (StringUtils.isNotEmpty(user.getPhone())
                && UserConstants.NOT_UNIQUE.equals(userService.checkPhoneUnique(user)))
        {
            return AjaxResult.error("新增学生'" + user.getUserName() + "'失败，手机号码已存在");
        }
        else if (StringUtils.isNotEmpty(user.getEmail())
                && UserConstants.NOT_UNIQUE.equals(userService.checkEmailUnique(user)))
        {
            return AjaxResult.error("新增学生'" + user.getUserName() + "'失败，邮箱账号已存在");
        }
        user.setCreateBy(getUsername());
        user.setPassword(SecurityUtils.encryptPassword(user.getPassword()));
        return toAjax(userService.insertUser(user));
    }

    /**
     * 修改学生
     */
    @PreAuthorize("@ss.hasPermi('system:user:edit')")
    @Log(title = "学生管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@Validated @RequestBody User user)
    {
        userService.checkUserAllowed(user);
        userService.checkUserDataScope(user.getUserId());
        if (UserConstants.NOT_UNIQUE.equals(userService.checkUserNameUnique(user)))
        {
            return AjaxResult.error("修改学生'" + user.getUserName() + "'失败，登录账号已存在");
        }
        else if (StringUtils.isNotEmpty(user.getPhone())
                && UserConstants.NOT_UNIQUE.equals(userService.checkPhoneUnique(user)))
        {
            return AjaxResult.error("修改学生'" + user.getUserName() + "'失败，手机号码已存在");
        }
        else if (StringUtils.isNotEmpty(user.getEmail())
                && UserConstants.NOT_UNIQUE.equals(userService.checkEmailUnique(user)))
        {
            return AjaxResult.error("修改学生'" + user.getUserName() + "'失败，邮箱账号已存在");
        }
        user.setUpdateBy(getUsername());
        return toAjax(userService.updateUser(user));
    }

    /**
     * 删除学生
     */
    @PreAuthorize("@ss.hasPermi('system:user:remove')")
    @Log(title = "学生管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{userIds}")
    public AjaxResult remove(@PathVariable Long[] userIds)
    {
        if (ArrayUtils.contains(userIds, getUserId()))
        {
            return error("当前学生不能删除");
        }
        return toAjax(userService.deleteUserByIds(userIds));
    }

    /**
     * 重置密码
     */
    @PreAuthorize("@ss.hasPermi('system:user:resetPwd')")
    @Log(title = "学生管理", businessType = BusinessType.UPDATE)
    @PutMapping("/resetPwd")
    public AjaxResult resetPwd(@RequestBody User user)
    {
        userService.checkUserAllowed(user);
        userService.checkUserDataScope(user.getUserId());
        user.setPassword(SecurityUtils.encryptPassword(user.getPassword()));
        user.setUpdateBy(getUsername());
        return toAjax(userService.resetPwd(user));
    }

    /**
     * 状态修改
     */
    @PreAuthorize("@ss.hasPermi('system:user:edit')")
    @Log(title = "学生管理", businessType = BusinessType.UPDATE)
    @PutMapping("/changeStatus")
    public AjaxResult changeStatus(@RequestBody User user)
    {
        userService.checkUserAllowed(user);
        userService.checkUserDataScope(user.getUserId());
        user.setUpdateBy(getUsername());
        return toAjax(userService.updateUserStatus(user));
    }

//    /**
//     * 根据学生编号获取授权角色
//     */
//    @PreAuthorize("@ss.hasPermi('system:user:query')")
//    @GetMapping("/authRole/{userId}")
//    public AjaxResult authRole(@PathVariable("userId") Long userId)
//    {
//        AjaxResult ajax = AjaxResult.success();
//        User user = userService.selectUserById(userId);
//        List<SysRole> roles = roleService.selectRolesByUserId(userId);
//        ajax.put("user", user);
//        ajax.put("roles", SysUser.isAdmin(userId) ? roles : roles.stream().filter(r -> !r.isAdmin()).collect(Collectors.toList()));
//        return ajax;
//    }
//
//    /**
//     * 学生授权角色
//     */
//    @PreAuthorize("@ss.hasPermi('system:user:edit')")
//    @Log(title = "学生管理", businessType = BusinessType.GRANT)
//    @PutMapping("/authRole")
//    public AjaxResult insertAuthRole(Long userId, Long[] roleIds)
//    {
//        userService.checkUserDataScope(userId);
//        userService.insertUserAuth(userId, roleIds);
//        return success();
//    }

    /**
     * 获取部门树列表
     */
    @PreAuthorize("@ss.hasPermi('system:user:list')")
    @GetMapping("/deptTree")
    public AjaxResult deptTree(SysDept dept)
    {
        return AjaxResult.success(deptService.selectDeptTreeList(dept));
    }
}
