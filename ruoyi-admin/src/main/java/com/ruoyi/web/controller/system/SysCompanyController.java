package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.entity.Company;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.service.ISysCompanyService;
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
@RequestMapping("/system/company")
public class SysCompanyController extends BaseController {

    @Autowired
    private ISysCompanyService companyService;


    /**
     * 获取企业列表
     */
    @GetMapping("/list")
    public TableDataInfo companyList(Company company)
    {
        startPage();
        List<Company> list = companyService.selectCompanyList(company);
        return getDataTable(list);
    }

    /**
     * 根据企业ID获取企业信息
     */
    @GetMapping(value = "/{companyId}")
    public AjaxResult getInfo(@PathVariable Long companyId){
        AjaxResult ajax = AjaxResult.success();
        Company company = companyService.selectCompanyById(companyId);
        ajax.put(AjaxResult.DATA_TAG, company);
        return ajax;
    }

    /**
     * 根据UserID获取企业信息
     */
    @GetMapping(value = "/current/{userId}")
    public AjaxResult getInfoByUserId(@PathVariable Long userId){
        AjaxResult ajax = AjaxResult.success();
        Company company = companyService.selectCompanyByUserId(userId);
        ajax.put(AjaxResult.DATA_TAG, company);
        return ajax;
    }

    /**
     * 新增企业
     */
    @PostMapping
    public AjaxResult add(@Validated @RequestBody Company company)
    {
        int res = companyService.insertCompany(company);
        if(res == 100){
            return AjaxResult.error("新增企业'"  + "'失败，登录账号已存在");
        }
        if(res == 200){
            return AjaxResult.error("新增企业'"  + "'失败，手机号码已存在");
        }
        if(res == 300){
            return AjaxResult.error("新增企业'" + "'失败，邮箱账号已存在");
        }
        return toAjaxEx(res);
    }

    /**
     * 修改企业
     */
    @PutMapping
    public AjaxResult edit(@Validated @RequestBody Company company)
    {
        int res = companyService.updateCompany(company);
        if(res == 100){
            return AjaxResult.error("修改企业'"  + "'失败，登录账号已存在");
        }
        if(res == 200){
            return AjaxResult.error("修改企业'"  + "'失败，手机号码已存在");
        }
        if(res == 300){
            return AjaxResult.error("修改企业'" + "'失败，邮箱账号已存在");
        }
        return toAjaxEx(res);
    }

    /**
     * 删除企业
     */
    @DeleteMapping("/{companyId}")
    public AjaxResult remove(@PathVariable Long companyId)
    {
        return toAjaxEx(companyService.deleteCompanyById(companyId));
    }
}
