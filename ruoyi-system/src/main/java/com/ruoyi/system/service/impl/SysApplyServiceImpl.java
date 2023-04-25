package com.ruoyi.system.service.impl;


import com.ruoyi.system.domain.SysApply;
import com.ruoyi.system.mapper.SysApplyMapper;
import com.ruoyi.system.mapper.UserMapper;
import com.ruoyi.system.service.ISysApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SysApplyServiceImpl implements ISysApplyService {

    @Autowired
    private SysApplyMapper applyMapper;


    @Autowired
    private UserMapper userMapper;

    @Override
    public SysApply selectApplyById(Long applyId) {
        return applyMapper.selectApplyById(applyId);
    }

    @Override
    public List<SysApply> selectApplyList(SysApply apply) {
        return applyMapper.selectApplyList(apply);
    }

    @Override
    @Transactional
    public int updateApply(SysApply apply) {
//        if(apply.getStatus()==1L){
//            SysUser user = userMapper.selectUserById(apply.getUserId());
//            user.setInternshipStatus("1");
//            user.setStartTime(apply.getStartTime().toString());
//            user.setEndTime(apply.getEndTime().toString());
//            userMapper.updateUser(user);
//
//            attendMapper.deleteAttendByUserId(apply.getUserId());
//            insertAttendItem(apply);
//        }
        return applyMapper.updateApply(apply);
    }


    @Override
    public int deleteApplyById(Long applyId) {
        return applyMapper.deleteApplyById(applyId);
    }

    @Override
    public int deleteApplyByIds(Long[] applyIds) {
        return applyMapper.deleteApplyByIds(applyIds);
    }
}
