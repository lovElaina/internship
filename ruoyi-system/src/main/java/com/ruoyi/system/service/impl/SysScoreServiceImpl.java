package com.ruoyi.system.service.impl;

import com.ruoyi.common.core.domain.entity.Student;
import com.ruoyi.system.domain.Score;
import com.ruoyi.system.mapper.ScoreMapper;
import com.ruoyi.system.mapper.StudentMapper;
import com.ruoyi.system.service.ISysScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
public class SysScoreServiceImpl implements ISysScoreService {

    @Autowired
    private ScoreMapper scoreMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public List<Score> selectScoreList(Score score) {
        List<Score> scores = scoreMapper.selectScoreList(score);
        for(Score s : scores){
            Student student = studentMapper.selectStudentByStuId(s.getStuId());
            HashMap<String, Object> map = new HashMap<>();
            map.put("stuname",student.getStuName());
            s.setExtra(map);
        }
        //return scoreMapper.selectScoreList(score);
        return scores;
    }

    @Override
    public Score selectScoreByStuId(Long stuId) {
        return scoreMapper.selectScoreByStuId(stuId);
    }

    @Override
    public int insertScore(Score score) {
        return scoreMapper.insertScore(score);
    }

    @Override
    @Transactional
    public int updateScore(Score score) {
        Score scoreByStuId = scoreMapper.selectScoreByStuId(score.getStuId());
        scoreByStuId.setActionCompanyScore(score.getActionCompanyScore());
        scoreByStuId.setAttendScore(score.getAttendScore());

        scoreByStuId.setTotalScore((scoreByStuId.getReportCompanyScore()!=null? scoreByStuId.getReportCompanyScore()*0.2f : 0) + (scoreByStuId.getReportTutorScore()!=null? scoreByStuId.getReportTutorScore()*0.2f : 0) + (score.getActionCompanyScore()!=null?score.getActionCompanyScore()*0.3f:0) + (score.getAttendScore()!=null?score.getAttendScore()*0.3f:0));
        return scoreMapper.updateScore(scoreByStuId);
    }

    @Override
    public int deleteScoreById(Long scoreId) {
        return scoreMapper.deleteScoreById(scoreId);
    }
}
