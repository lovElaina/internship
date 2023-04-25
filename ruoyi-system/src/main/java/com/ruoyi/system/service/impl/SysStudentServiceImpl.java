package com.ruoyi.system.service.impl;

import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.core.domain.entity.User;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.mapper.StudentMapper;
import com.ruoyi.system.mapper.UserMapper;
import com.ruoyi.system.service.ISysStudentService;
import com.ruoyi.system.service.ISysUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

/**
 * 学生 业务层处理
 *
 * @author zyc
 */
@Service
public class SysStudentServiceImpl implements ISysStudentService {

    private static final Logger log = LoggerFactory.getLogger(SysStudentServiceImpl.class);

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ISysUserService userService;

    @Override
    @Transactional
    public List<Student> selectStudentList(Student student) {

        List<Student> students = studentMapper.selectStudentList(student);
        for(Student stu : students){
            User user = userMapper.selectUserById(stu.getUserId());
            HashMap<String, Object> map = new HashMap<String,Object>();
            map.put("dept",user.getDept());
            map.put("email",user.getEmail());
            map.put("deptid",user.getDeptId());
            map.put("phone",user.getPhone());
            map.put("roleid",user.getRoleId());
            map.put("roleids",user.getRoleIds());
            map.put("roles",user.getRoles());
            map.put("status",user.getStatus());
            map.put("username",user.getUserName());
            stu.setExtra(map);
        }
        return students;
    }

    @Override
    @Transactional
    public List<Student> selectStudentListByDeptId(User user) {
        List<User> userLists = userMapper.selectStudentList(user);
        List<Student> studentLists = new LinkedList<>();
        for(User user1 : userLists){
            Student student = studentMapper.selectStudentByUserId(user1.getUserId());
            HashMap<String, Object> map = new HashMap<String,Object>();
            map.put("dept",user1.getDept());
            map.put("email",user1.getEmail());
            map.put("deptid",user1.getDeptId());
            map.put("phone",user1.getPhone());
            map.put("roleid",user1.getRoleId());
            map.put("roleids",user1.getRoleIds());
            map.put("roles",user1.getRoles());
            map.put("status",user1.getStatus());
            map.put("username",user1.getUserName());
            student.setExtra(map);
            studentLists.add(student);
        }
        return studentLists;
    }

    @Override
    @Transactional
    public Student selectStudentByStuId(Long stuId) {
        Student student = studentMapper.selectStudentByStuId(stuId);
        User user = userMapper.selectUserById(student.getUserId());
        HashMap<String, Object> map = new HashMap<String,Object>();
        map.put("dept",user.getDept());
        map.put("email",user.getEmail());
        map.put("deptid",user.getDeptId());
        map.put("phone",user.getPhone());
        map.put("roleid",user.getRoleId());
        map.put("roleids",user.getRoleIds());
        map.put("roles",user.getRoles());
        map.put("status",user.getStatus());
        map.put("username",user.getUserName());
        student.setExtra(map);
        return student;
    }

    @Override
    public Student selectStudentByUserId(Long userId) {
        return studentMapper.selectStudentByUserId(userId);
    }

    @Override
    @Transactional
    public int insertStudent(Student student) {
        User user = new User();
        user.setRoleId(4L);
        user.setDeptId(((Integer) student.getExtra().get("deptid")).longValue());
        user.setUserName((String) student.getExtra().get("username"));
        user.setPassword(SecurityUtils.encryptPassword((String) student.getExtra().get("password")));
        user.setEmail((String) student.getExtra().get("email"));
        user.setPhone((String) student.getExtra().get("phone"));
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
        student.setUserId(user.getUserId());
        return i + studentMapper.insertStudent(student);
    }

    @Override
    @Transactional
    public int updateStudent(Student student) {
        User user = new User();
        user.setUserId(student.getUserId());
        user.setRoleId(4L);
        user.setDeptId(((Integer) student.getExtra().get("deptid")).longValue());
        user.setUserName((String) student.getExtra().get("username"));
        //user.setPassword(SecurityUtils.encryptPassword((String) student.getExtra().get("password")));
        user.setEmail((String) student.getExtra().get("email"));
        user.setPhone((String) student.getExtra().get("phone"));
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
        //userMapper.insertUser(user);
        return userMapper.updateUser(user) + studentMapper.updateStudent(student);
    }

    @Override
    @Transactional
    public int deleteStudentById(Long stuId) {
        Student student = studentMapper.selectStudentByStuId(stuId);
        int i = userMapper.deleteUserById(student.getUserId());
        int j = studentMapper.deleteStudentById(stuId);
        return i + j;
    }
}
