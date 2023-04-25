package com.ruoyi.common.core.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;

public class Company extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long companyId;

    private Long userId;

    private String companyName;

    private String departmentName;

    private String delFlag;

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "Company{" +
                "companyId=" + companyId +
                ", userId=" + userId +
                ", companyName='" + companyName + '\'' +
                ", departmentName='" + departmentName + '\'' +
                ", delFlag='" + delFlag + '\'' +
                '}';
    }
}
