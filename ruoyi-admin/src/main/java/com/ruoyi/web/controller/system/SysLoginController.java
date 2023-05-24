package com.ruoyi.web.controller.system;

import java.util.List;
import java.util.Set;

import com.ruoyi.common.core.domain.entity.*;
import com.ruoyi.system.domain.Post;
import com.ruoyi.system.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.constant.Constants;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.model.LoginBody;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.framework.web.service.SysLoginService;
import com.ruoyi.framework.web.service.SysPermissionService;

/**
 * 登录验证
 * 
 * @author ruoyi
 */
@RestController
public class SysLoginController
{
    @Autowired
    private SysLoginService loginService;

    @Autowired
    private ISysMenuService menuService;

    @Autowired
    private SysPermissionService permissionService;

    @Autowired
    private ISysTutorService tutorService;

    @Autowired
    private ISysStudentService studentService;

    @Autowired
    private ISysCompanyService companyService;

    @Autowired
    private ISysPostService postService;

    /**
     * 登录方法
     * 
     * @param loginBody 登录信息
     * @return 结果
     */
    @PostMapping("/login")
    public AjaxResult login(@RequestBody LoginBody loginBody)
    {
        AjaxResult ajax = AjaxResult.success();
        // 生成令牌
        String token = loginService.login(loginBody.getUsername(), loginBody.getPassword(), loginBody.getCode(),
                loginBody.getUuid());
        ajax.put(Constants.TOKEN, token);
        return ajax;
    }

    /**
     * 获取用户信息
     * 
     * @return 用户信息
     */
    @GetMapping("getInfo")
    public AjaxResult getInfo()
    {
        User user = SecurityUtils.getLoginUser().getUser();
        AjaxResult ajax = AjaxResult.success();
        // 角色集合
        Set<String> roles = permissionService.getRolePermission(user);
        // 权限集合
        Set<String> permissions = permissionService.getMenuPermission(user);
        if(user.getRoleId()==3){
            Tutor tutor = tutorService.selectTutorByUserId(user.getUserId());
            ajax.put("resId", tutor.getTutorId());
            ajax.put("tutorInfo",tutor);
        }
        if(user.getRoleId()==4){
            Student student = studentService.selectStudentByUserId(user.getUserId());
            if(student.getPostId()==null){
                ajax.put("resId", student.getStuId());
                ajax.put("stuInfo",student);
                ajax.put("postInfo",null);
                ajax.put("companyInfo",null);
            }else {
                Post post = postService.selectPostById(student.getPostId());
                Company company = companyService.selectCompanyById(post.getCompanyId());
                ajax.put("resId", student.getStuId());
                ajax.put("stuInfo",student);
                ajax.put("postInfo",post);
                ajax.put("companyInfo",company);
            }

        }
        if(user.getRoleId()==5){
            Company company = companyService.selectCompanyByUserId(user.getUserId());
            List<Long> stuList = companyService.selectStudentListByCompanyId(company.getCompanyId());
            ajax.put("resId",company.getCompanyId());
            ajax.put("companyInfo",company);
            ajax.put("stuList",stuList);
        }

        ajax.put("user", user);
        ajax.put("roles", roles);
        ajax.put("permissions", permissions);
        return ajax;
    }

    /**
     * 获取路由信息
     * 
     * @return 路由信息
     */
    @GetMapping("getRouters")
    public AjaxResult getRouters()
    {
        Long userId = SecurityUtils.getUserId();
        List<SysMenu> menus = menuService.selectMenuTreeByUserId(userId);
        return AjaxResult.success(menuService.buildMenus(menus));
    }
}
