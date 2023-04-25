package com.ruoyi.system.mapper;

import com.ruoyi.common.core.domain.entity.Student;

import java.util.List;

public interface StudentMapper {

    /**
     * 根据条件分页查询学生列表
     *
     * @param student 学生信息
     * @return 学生信息集合信息
     */
    public List<Student> selectStudentList(Student student);

    /**
     * 查询所有已开始实习的学生列表
     *
     * @param student 学生
     * @return 已开始实习的学生信息集合信息
     */
    public List<Student> selectInternshipStudent(Student student);

    /**
     * 根据学生ID查询学生信息
     *
     * @param stuId 学生ID
     * @return 学生信息
     */
    public Student selectStudentByStuId(Long stuId);

    /**
     * 根据用户ID查询学生信息
     *
     * @param userId 用户ID
     * @return 学生信息
     */
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

    /**
     * 通过岗位ID查询岗位使用数量
     *
     * @param postId 岗位ID
     * @return 结果
     */
    public int countStudentPostById(Long postId);
}
