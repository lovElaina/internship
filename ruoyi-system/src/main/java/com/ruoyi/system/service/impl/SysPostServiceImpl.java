package com.ruoyi.system.service.impl;

import java.util.HashMap;
import java.util.List;

import com.ruoyi.system.mapper.CompanyMapper;
import com.ruoyi.system.mapper.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.exception.ServiceException;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.Post;
import com.ruoyi.common.core.domain.entity.Company;
import com.ruoyi.system.mapper.PostMapper;
import com.ruoyi.system.service.ISysPostService;
import org.springframework.transaction.annotation.Transactional;

/**
 * 岗位信息 服务层处理
 * 
 * @author zyc
 */
@Service
public class SysPostServiceImpl implements ISysPostService
{
    @Autowired
    private PostMapper postMapper;


    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private CompanyMapper companyMapper;

    /**
     * 查询岗位信息集合
     * 
     * @param post 岗位信息
     * @return 岗位信息集合
     */
    @Override
    @Transactional
    public List<Post> selectPostList(Post post)
    {
        List<Post> posts = postMapper.selectPostList(post);

        for(Post p : posts){
            Company company = companyMapper.selectCompanyById(p.getCompanyId());
            HashMap<String,Object> map = new HashMap<>();
            map.put("companyid",company.getCompanyId());
            map.put("userid",company.getUserId());
            map.put("companyname",company.getCompanyName());
            map.put("departmentname",company.getDepartmentName());
            p.setExtra(map);
        }

        return posts;
    }

    /**
     * 查询所有岗位
     * 
     * @return 岗位列表
     */
    @Override
    public List<Post> selectPostAll()
    {
        return postMapper.selectPostAll();
    }

    /**
     * 通过岗位ID查询岗位信息
     * 
     * @param postId 岗位ID
     * @return 角色对象信息
     */
    @Override
    public Post selectPostById(Long postId)
    {
        return postMapper.selectPostById(postId);
    }

//    /**
//     * 根据用户ID获取岗位选择框列表
//     *
//     * @param userId 用户ID
//     * @return 选中岗位ID列表
//     */
//    @Override
//    public List<Long> selectPostListByUserId(Long userId)
//    {
//        return postMapper.selectPostListByUserId(userId);
//    }

    /**
     * 校验岗位名称是否唯一
     * 
     * @param post 岗位信息
     * @return 结果
     */
    @Override
    public String checkPostNameUnique(Post post)
    {
        Long postId = StringUtils.isNull(post.getPostId()) ? -1L : post.getPostId();
        Post info = postMapper.checkPostNameUnique(post.getPostName());
        if (StringUtils.isNotNull(info) && info.getPostId().longValue() != postId.longValue())
        {
            return UserConstants.NOT_UNIQUE;
        }
        return UserConstants.UNIQUE;
    }

//    @Override
//    public String checkPostCodeUnique(SysPost post) {
//        return null;
//    }

//    /**
//     * 校验岗位编码是否唯一
//     *
//     * @param post 岗位信息
//     * @return 结果
//     */
//    @Override
//    public String checkPostCodeUnique(SysPost post)
//    {
//        Long postId = StringUtils.isNull(post.getPostId()) ? -1L : post.getPostId();
//        SysPost info = postMapper.checkPostCodeUnique(post.getPostCode());
//        if (StringUtils.isNotNull(info) && info.getPostId().longValue() != postId.longValue())
//        {
//            return UserConstants.NOT_UNIQUE;
//        }
//        return UserConstants.UNIQUE;
//    }

//    /**
//     * 通过岗位ID查询岗位使用数量
//     *
//     * @param postId 岗位ID
//     * @return 结果
//     */
//    @Override
//    public int countUserPostById(Long postId)
//    {
//        return userPostMapper.countUserPostById(postId);
//    }

    /**
     * 通过岗位ID查询岗位使用数量
     *
     * @param postId 岗位ID
     * @return 结果
     */
    @Override
    public int countStudentPostById(Long postId)
    {
        return studentMapper.countStudentPostById(postId);
    }

    /**
     * 删除岗位信息
     * 
     * @param postId 岗位ID
     * @return 结果
     */
    @Override
    public int deletePostById(Long postId)
    {
        return postMapper.deletePostById(postId);
    }

    /**
     * 批量删除岗位信息
     * 
     * @param postIds 需要删除的岗位ID
     * @return 结果
     */
    @Override
    public int deletePostByIds(Long[] postIds)
    {
        for (Long postId : postIds)
        {
            Post post = selectPostById(postId);
            if (countStudentPostById(postId) > 0)
            {
                throw new ServiceException(String.format("%1$s已分配,不能删除", post.getPostName()));
            }
        }
        return postMapper.deletePostByIds(postIds);
    }

    /**
     * 新增保存岗位信息
     * 
     * @param post 岗位信息
     * @return 结果
     */
    @Override
    public int insertPost(Post post)
    {
        return postMapper.insertPost(post);
    }

    /**
     * 修改保存岗位信息
     * 
     * @param post 岗位信息
     * @return 结果
     */
    @Override
    public int updatePost(Post post)
    {
        return postMapper.updatePost(post);
    }
}
