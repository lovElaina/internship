package com.ruoyi.system.service;

import com.ruoyi.system.domain.Score;

import java.util.List;

public interface ISysScoreService {

    public List<Score> selectScoreList(Score score);

    public Score selectScoreByStuId(Long stuId);

    public int insertScore(Score score);

    public int updateScore(Score score);

    public int deleteScoreById(Long scoreId);
}
