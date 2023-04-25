package com.ruoyi.system.service;

import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.common.core.domain.entity.User;

import java.util.List;

public interface ISysStudentService {

    /**
     * 根据条件分页查询学生列表
     *
     * @param student 学生信息
     * @return 学生信息集合信息
     */
    public List<Student> selectStudentList(Student student);

    /**
     * 根据条件分页查询学生列表
     *
     * @param user 学生信息
     * @return 学生信息集合信息
     */
    public List<Student> selectStudentListByDeptId(User user);

    /**
     * 根据学生ID查询学生信息
     *
     * @param stuId 学生ID
     * @return 学生信息
     */
    public Student selectStudentByStuId(Long stuId);

    public Student selectStudentByUserId(Long userId);

    /**
     * 新增学生信息
     *
     * @param student 学生信息
     * @return 结果
     */
    public int insertStudent(Student student);

    /**
     * 修改学生信息
     *
     * @param student 学生信息
     * @return 结果
     */
    public int updateStudent(Student student);

    /**
     * 通过学生ID删除学生
     *
     * @param stuId 学生ID
     * @return 结果
     */
    public int deleteStudentById(Long stuId);
}
