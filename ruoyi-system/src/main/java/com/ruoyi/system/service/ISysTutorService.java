package com.ruoyi.system.service;

import com.ruoyi.common.core.domain.entity.Tutor;

import java.util.List;

public interface ISysTutorService {
    /**
     * 根据条件分页查询导师列表
     *
     * @param tutor 导师信息
     * @return 导师信息集合信息
     */
    public List<Tutor> selectTutorList(Tutor tutor);

    public Tutor selectTutorListByTutorId(Long tutorId);

    public Tutor selectTutorByUserId(Long userId);
    /**
     * 新增导师信息
     *
     * @param tutor 导师信息
     * @return 结果
     */
    public int insertTutor(Tutor tutor);

    /**
     * 修改导师信息
     *
     * @param tutor 导师信息
     * @return 结果
     */
    public int updateTutor(Tutor tutor);

    /**
     * 通过导师ID删除导师
     *
     * @param tutorId 导师ID
     * @return 结果
     */
    public int deleteTutorById(Long tutorId);
}
