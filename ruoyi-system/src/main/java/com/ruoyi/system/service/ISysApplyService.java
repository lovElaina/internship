package com.ruoyi.system.service;

import com.ruoyi.system.domain.SysApply;

import java.util.List;

public interface ISysApplyService {

    /**
     * 查询申请信息
     *
     * @param applyId 申请ID
     * @return 申请信息
     */
    public SysApply selectApplyById(Long applyId);

    /**
     * 查询申请列表
     *
     * @param apply 申请信息
     * @return 申请集合
     */
    public List<SysApply> selectApplyList(SysApply apply);

    /**
     * 修改申请
     *
     * @param apply 申请信息
     * @return 结果
     */
    public int updateApply(SysApply apply);

    /**
     * 删除申请信息
     *
     * @param applyId 申请ID
     * @return 结果
     */
    public int deleteApplyById(Long applyId);

    /**
     * 批量删除申请信息
     *
     * @param applyIds 需要删除的申请ID
     * @return 结果
     */
    public int deleteApplyByIds(Long[] applyIds);
}
