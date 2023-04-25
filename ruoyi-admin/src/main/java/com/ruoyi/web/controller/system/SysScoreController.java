package com.ruoyi.web.controller.system;


import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.Score;
import com.ruoyi.system.service.ISysScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/score")
public class SysScoreController extends BaseController {

    @Autowired
    private ISysScoreService scoreService;

    @GetMapping("/list")
    public TableDataInfo scoreList(Score score){
        startPage();
        List<Score> scoreList = scoreService.selectScoreList(score);
        return getDataTable(scoreList);
    }

    @GetMapping(value = "/{stuId}")
    public AjaxResult getInfo(@PathVariable Long stuId){
        AjaxResult ajax = AjaxResult.success();
        Score score = scoreService.selectScoreByStuId(stuId);
        ajax.put(AjaxResult.DATA_TAG, score);
        return ajax;
    }

    @PutMapping
    public AjaxResult updateScore(@RequestBody Score score){
        return toAjax(scoreService.updateScore(score));
    }
}
