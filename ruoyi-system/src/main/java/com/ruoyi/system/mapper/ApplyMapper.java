package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.Apply;

import java.util.List;

public interface ApplyMapper {

    public Apply selectApplyById(Long applyId);

    public List<Apply> selectApplyList(Apply apply);

    public int updateApply(Apply apply);

    public int insertApply(Apply apply);

    public int deleteApplyById(Long applyId);
}
