package com.ruoyi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 启动程序
 * 
 * @author ruoyi
 */
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class RuoYiApplication
{
    public static void main(String[] args)
    {
        // System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(RuoYiApplication.class, args);
        System.out.println("==================================\n" +
                "||   高校实习信息管理系统 v0.1      ||\n" +
                "||   作者：张一琛   北京大学        ||\n" +
                "||   项目coding中，可能存在bug      ||\n" +
                "||   开发框架 前端：umi 后端：若依   ||\n" +
                "||   我的GitHub账号：lovElaina     ||\n" +
                "||   祝您开心，欢迎互相star         ||\n" +
                "==================================");
    }
}
