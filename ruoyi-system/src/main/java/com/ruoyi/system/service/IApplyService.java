package com.ruoyi.system.service;

import com.ruoyi.system.domain.Apply;

import java.util.List;

public interface IApplyService {

    /**
     * 查询申请信息
     *
     * @param applyId 申请ID
     * @return 申请信息
     */
    public Apply selectApplyById(Long applyId);

    /**
     * 查询申请列表
     *
     * @param apply 申请信息
     * @return 申请集合
     */
    public List<Apply> selectApplyList(Apply apply);

    /**
     * 修改申请
     *
     * @param apply 申请信息
     * @return 结果
     */
    public int updateApply(Apply apply);

    /**
     * 新增申请
     *
     * @param apply 申请信息
     * @return 结果
     */
    public int insertApply(Apply apply);

    /**
     * 删除申请信息
     *
     * @param applyId 申请ID
     * @return 结果
     */
    public int deleteApplyById(Long applyId);


}
