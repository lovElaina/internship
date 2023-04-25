package com.ruoyi.system.service.impl;

import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.core.domain.entity.Company;
import com.ruoyi.common.core.domain.entity.Tutor;
import com.ruoyi.common.core.domain.entity.User;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.mapper.CompanyMapper;
import com.ruoyi.system.mapper.UserMapper;
import com.ruoyi.system.service.ISysCompanyService;
import com.ruoyi.system.service.ISysUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

/**
 * 企业 业务层处理
 *
 * @author zyc
 */
@Service
public class SysCompanyServiceImpl implements ISysCompanyService {

    private static final Logger log = LoggerFactory.getLogger(SysTutorServiceImpl.class);

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ISysUserService userService;

    @Override
    @Transactional
    public List<Company> selectCompanyList(Company company) {

        List<Company> companies = companyMapper.selectCompanyList(company);
        for(Company c : companies){
            User user = userMapper.selectUserById(c.getUserId());
            HashMap<String, Object> map = new HashMap<>();
            map.put("dept",user.getDept());
            map.put("email",user.getEmail());
            map.put("deptid",user.getDeptId());
            map.put("phone",user.getPhone());
            map.put("roleid",user.getRoleId());
            map.put("roleids",user.getRoleIds());
            map.put("roles",user.getRoles());
            map.put("status",user.getStatus());
            map.put("username",user.getUserName());
            c.setExtra(map);
        }
        return companies;
    }

    @Override
    @Transactional
    public Company selectCompanyById(Long companyId) {
        Company company = companyMapper.selectCompanyById(companyId);
        User user = userMapper.selectUserById(company.getUserId());
        HashMap<String, Object> map = new HashMap<>();
        map.put("dept",user.getDept());
        map.put("email",user.getEmail());
        map.put("deptid",user.getDeptId());
        map.put("phone",user.getPhone());
        map.put("roleid",user.getRoleId());
        map.put("roleids",user.getRoleIds());
        map.put("roles",user.getRoles());
        map.put("status",user.getStatus());
        map.put("username",user.getUserName());
        company.setExtra(map);
        return company;
    }

    @Override
    public Company selectCompanyByUserId(Long userId) {
        return companyMapper.selectCompanyByUserId(userId);
    }

    @Override
    @Transactional
    public int insertCompany(Company company) {
        User user = new User();
        user.setRoleId(5L);
        user.setDeptId(10L);
        user.setUserName((String) company.getExtra().get("username"));
        user.setPassword(SecurityUtils.encryptPassword((String) company.getExtra().get("password")));
        user.setEmail((String) company.getExtra().get("email"));
        user.setPhone(company.getExtra().get("phone").toString());
        user.setStatus("0");
        user.setDelFlag("0");
        if (UserConstants.NOT_UNIQUE.equals(userService.checkUserNameUnique(user)))
        {
            return 100;
        }
        else if (StringUtils.isNotEmpty(user.getPhone())
                && UserConstants.NOT_UNIQUE.equals(userService.checkPhoneUnique(user)))
        {
            return 200;
        }
        else if (StringUtils.isNotEmpty(user.getEmail())
                && UserConstants.NOT_UNIQUE.equals(userService.checkEmailUnique(user)))
        {
            return 300;
        }
        int i = userMapper.insertUser(user);
        company.setUserId(user.getUserId());
        return i + companyMapper.insertCompany(company);
    }

    @Override
    @Transactional
    public int updateCompany(Company company) {

        User user = new User();
        user.setRoleId(5L);
        user.setDeptId(10L);
        user.setUserName((String) company.getExtra().get("username"));
        //user.setPassword(SecurityUtils.encryptPassword((String) company.getExtra().get("password")));
        user.setEmail((String) company.getExtra().get("email"));
        user.setPhone(company.getExtra().get("phone").toString());
        user.setStatus("0");
        user.setDelFlag("0");
        if (UserConstants.NOT_UNIQUE.equals(userService.checkUserNameUnique(user)))
        {
            return 100;
        }
        else if (StringUtils.isNotEmpty(user.getPhone())
                && UserConstants.NOT_UNIQUE.equals(userService.checkPhoneUnique(user)))
        {
            return 200;
        }
        else if (StringUtils.isNotEmpty(user.getEmail())
                && UserConstants.NOT_UNIQUE.equals(userService.checkEmailUnique(user)))
        {
            return 300;
        }
        return userMapper.updateUser(user) + companyMapper.updateCompany(company);
    }

    @Override
    @Transactional
    public int deleteCompanyById(Long companyId) {
        Company company = companyMapper.selectCompanyById(companyId);
        int i = userMapper.deleteUserById(company.getUserId());
        int j = companyMapper.deleteCompanyById(companyId);
        return i + j;
    }
}
