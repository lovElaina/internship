package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.SysApply;

import java.util.List;

public interface SysApplyMapper {

    public SysApply selectApplyById(Long applyId);

    public List<SysApply> selectApplyList(SysApply apply);

    public int updateApply(SysApply apply);

    public int deleteApplyById(Long applyId);

    public int deleteApplyByIds(Long[] applyIds);
}
