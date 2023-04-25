package com.ruoyi.system.mapper;

import com.ruoyi.common.core.domain.entity.Company;

import java.util.List;

public interface CompanyMapper {

    /**
     * 根据条件分页查询企业列表
     *
     * @param company 企业信息
     * @return 企业信息集合信息
     */
    public List<Company> selectCompanyList(Company company);


    /**
     * 根据企业ID查询该企业的详细信息
     *
     * @param companyId 企业信息
     * @return 企业信息集合信息
     */
    public Company selectCompanyById(Long companyId);

    /**
     * 根据用户ID查询该企业的详细信息
     *
     * @param userId 企业信息
     * @return 企业信息集合信息
     */
    public Company selectCompanyByUserId(Long userId);

    /**
     * 新增企业信息
     *
     * @param company 企业信息
     * @return 结果
     */
    public int insertCompany(Company company);

    /**
     * 修改企业信息
     *
     * @param company 企业信息
     * @return 结果
     */
    public int updateCompany(Company company);

    /**
     * 通过企业ID删除企业
     *
     * @param companyId 企业ID
     * @return 结果
     */
    public int deleteCompanyById(Long companyId);
}
