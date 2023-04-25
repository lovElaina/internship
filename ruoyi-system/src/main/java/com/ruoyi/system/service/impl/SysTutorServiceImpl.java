package com.ruoyi.system.service.impl;

import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.core.domain.entity.Tutor;
import com.ruoyi.common.core.domain.entity.User;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.mapper.TutorMapper;
import com.ruoyi.system.mapper.UserMapper;
import com.ruoyi.system.service.ISysTutorService;
import com.ruoyi.system.service.ISysUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

/**
 * 导师 业务层处理
 *
 * @author zyc
 */
@Service
public class SysTutorServiceImpl implements ISysTutorService {

    private static final Logger log = LoggerFactory.getLogger(SysTutorServiceImpl.class);

    @Autowired
    private TutorMapper tutorMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ISysUserService userService;

    @Override
    @Transactional
    public List<Tutor> selectTutorList(Tutor tutor) {

        List<Tutor> tutors = tutorMapper.selectTutorList(tutor);
        for(Tutor t : tutors){
            User user = userMapper.selectUserById(t.getUserId());
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
            t.setExtra(map);
        }
        return tutors;
    }

    @Override
    @Transactional
    public Tutor selectTutorListByTutorId(Long tutorId){
        Tutor tutor = tutorMapper.selectTutorListByTutorId(tutorId);
        User user = userMapper.selectUserById(tutor.getUserId());
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
        tutor.setExtra(map);
        return tutor;
    }

    @Override
    public Tutor selectTutorByUserId(Long userId) {
        return tutorMapper.selectTutorByUserId(userId);
    }

    @Override
    @Transactional
    public int insertTutor(Tutor tutor) {
        //System.out.println(SecurityUtils.encryptPassword((String) tutor.getExtra().get("password"))+"qqqqqqqqqqq");
        User user = new User();
        user.setRoleId(3L);
        user.setDeptId(((Integer) tutor.getExtra().get("deptid")).longValue());
        user.setUserName((String) tutor.getExtra().get("username"));
        user.setPassword(SecurityUtils.encryptPassword((String) tutor.getExtra().get("password")));
        user.setEmail((String) tutor.getExtra().get("email"));
        user.setPhone((String) tutor.getExtra().get("phone"));
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
        //System.out.println((long) userMapper.countUser()+"and"+user.getUserId()+"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        tutor.setUserId(user.getUserId());
        return i + tutorMapper.insertTutor(tutor);

    }

    @Override
    @Transactional
    public int updateTutor(Tutor tutor) {
        User user = new User();
        user.setUserId(tutor.getUserId());
        user.setRoleId(3L);
        user.setDeptId(((Integer) tutor.getExtra().get("deptid")).longValue());
        user.setUserName((String) tutor.getExtra().get("username"));
        //user.setPassword(SecurityUtils.encryptPassword((String) student.getExtra().get("password")));
        user.setEmail((String) tutor.getExtra().get("email"));
        user.setPhone((String) tutor.getExtra().get("phone"));
        user.setStatus("0");
        user.setDelFlag("0");

        //System.out.println(user+"/////////////////////////////////////////////////");

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
        return userMapper.updateUser(user) + tutorMapper.updateTutor(tutor);
    }

    @Override
    @Transactional
    public int deleteTutorById(Long tutorId) {
        Tutor tutor = tutorMapper.selectTutorListByTutorId(tutorId);
        int i = userMapper.deleteUserById(tutor.getUserId());
        int j = tutorMapper.deleteTutorById(tutorId);
        return i + j;
    }
}
