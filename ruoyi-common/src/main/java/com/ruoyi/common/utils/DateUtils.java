package com.ruoyi.common.utils;

import java.lang.management.ManagementFactory;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import org.apache.commons.lang3.time.DateFormatUtils;

/**
 * 时间工具类
 *
 * @author ruoyi
 */
public class DateUtils extends org.apache.commons.lang3.time.DateUtils
{
    public static String YYYY = "yyyy";

    public static String YYYY_MM = "yyyy-MM";

    public static String YYYY_MM_DD = "yyyy-MM-dd";

    public static String YYYYMMDDHHMMSS = "yyyyMMddHHmmss";

    public static String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";

    private static String[] parsePatterns = {
            "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy-MM",
            "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm", "yyyy/MM",
            "yyyy.MM.dd", "yyyy.MM.dd HH:mm:ss", "yyyy.MM.dd HH:mm", "yyyy.MM"};

    /**
     * 获取当前Date型日期
     *
     * @return Date() 当前日期
     */
    public static Date getNowDate()
    {
        return new Date();
    }

    /**
     * 获取当前日期, 默认格式为yyyy-MM-dd
     *
     * @return String
     */
    public static String getDate()
    {
        return dateTimeNow(YYYY_MM_DD);
    }

    public static final String getTime()
    {
        return dateTimeNow(YYYY_MM_DD_HH_MM_SS);
    }

    public static final String dateTimeNow()
    {
        return dateTimeNow(YYYYMMDDHHMMSS);
    }

    public static final String dateTimeNow(final String format)
    {
        return parseDateToStr(format, new Date());
    }

    public static final String dateTime(final Date date)
    {
        return parseDateToStr(YYYY_MM_DD, date);
    }

    public static final String parseDateToStr(final String format, final Date date)
    {
        return new SimpleDateFormat(format).format(date);
    }

    public static final Date dateTime(final String format, final String ts)
    {
        try
        {
            return new SimpleDateFormat(format).parse(ts);
        }
        catch (ParseException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * 日期路径 即年/月/日 如2018/08/08
     */
    public static final String datePath()
    {
        Date now = new Date();
        return DateFormatUtils.format(now, "yyyy/MM/dd");
    }

    /**
     * 日期路径 即年/月/日 如20180808
     */
    public static final String dateTime()
    {
        Date now = new Date();
        return DateFormatUtils.format(now, "yyyyMMdd");
    }

    /**
     * 日期型字符串转化为日期 格式
     */
    public static Date parseDate(Object str)
    {
        if (str == null)
        {
            return null;
        }
        try
        {
            return parseDate(str.toString(), parsePatterns);
        }
        catch (ParseException e)
        {
            return null;
        }
    }

    /**
     * 获取服务器启动时间
     */
    public static Date getServerStartDate()
    {
        long time = ManagementFactory.getRuntimeMXBean().getStartTime();
        return new Date(time);
    }

    /**
     * 计算相差天数
     */
    public static int differentDaysByMillisecond(Date date1, Date date2)
    {
        return Math.abs((int) ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)));
    }

    /**
     * 计算两个时间差
     */
    public static String getDatePoor(Date endDate, Date nowDate)
    {
        long nd = 1000 * 24 * 60 * 60;
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;
        // long ns = 1000;
        // 获得两个时间的毫秒时间差异
        long diff = endDate.getTime() - nowDate.getTime();
        // 计算差多少天
        long day = diff / nd;
        // 计算差多少小时
        long hour = diff % nd / nh;
        // 计算差多少分钟
        long min = diff % nd % nh / nm;
        // 计算差多少秒//输出结果
        // long sec = diff % nd % nh % nm / ns;
        return day + "天" + hour + "小时" + min + "分钟";
    }

    /**
     * 增加 LocalDateTime ==> Date
     */
    public static Date toDate(LocalDateTime temporalAccessor)
    {
        ZonedDateTime zdt = temporalAccessor.atZone(ZoneId.systemDefault());
        return Date.from(zdt.toInstant());
    }

    /**
     * 增加 LocalDate ==> Date
     */
    public static Date toDate(LocalDate temporalAccessor)
    {
        LocalDateTime localDateTime = LocalDateTime.of(temporalAccessor, LocalTime.of(0, 0, 0));
        ZonedDateTime zdt = localDateTime.atZone(ZoneId.systemDefault());
        return Date.from(zdt.toInstant());
    }

    /**
     * 计算两个日期之间的工作日天数
     *
     * @param startDate 开始日期
     * @param endDate   结束日期
     * @return 工作日天数
     */
    public static int countWorkingDays(Date startDate, Date endDate) {
        Calendar startCal = Calendar.getInstance();
        startCal.setTime(startDate);

        Calendar endCal = Calendar.getInstance();
        endCal.setTime(endDate);

        int workingDays = 0;
        while (startCal.before(endCal)) {
            // 判断是否为工作日
            int dayOfWeek = startCal.get(Calendar.DAY_OF_WEEK);
            System.out.println(dayOfWeek);
            if (dayOfWeek != Calendar.SATURDAY && dayOfWeek != Calendar.SUNDAY) {
                workingDays++;
            }
            // 日期加1
            startCal.add(Calendar.DATE, 1);
        }
        return workingDays;
    }

    //获取两时间戳之间的工作日天数
    public static ArrayList<Long> getWeekdayTimestampsBetweenDates(long startDate, long endDate) {
        ArrayList<Long> timestamps = new ArrayList<Long>();
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(startDate);
        while (calendar.getTimeInMillis() <= endDate) {
            if (calendar.get(Calendar.DAY_OF_WEEK) >= Calendar.MONDAY && calendar.get(Calendar.DAY_OF_WEEK) <= Calendar.FRIDAY) {
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                timestamps.add(calendar.getTimeInMillis());
            }
            calendar.add(Calendar.DATE, 1);
        }
        return timestamps;
    }

    //周报
    public static ArrayList<Long> getFridayTimestampsBetweenDates(long startDate, long endDate) {
        ArrayList<Long> timestamps = new ArrayList<Long>();
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(startDate);
        while (calendar.getTimeInMillis() <= endDate) {
            if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY) {
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                timestamps.add(calendar.getTimeInMillis());
            }
            calendar.add(Calendar.DATE, 1);
        }

        return timestamps;
    }

    //月报
    public static ArrayList<Long> getLastDayOfMonthTimestampsBetweenDates(long startDate, long endDate) {
        ArrayList<Long> timestamps = new ArrayList<Long>();
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(startDate);
        while (calendar.getTimeInMillis() <= endDate) {
            if (calendar.get(Calendar.DAY_OF_MONTH) == calendar.getActualMaximum(Calendar.DAY_OF_MONTH)) {
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                timestamps.add(calendar.getTimeInMillis());
            }
            calendar.add(Calendar.DATE, 1);
        }
        return timestamps;
    }

    //时间戳转为 M月d日
    public static String conversionTime(Long timeStamp) {
        //yyyy-MM-dd HH:mm:ss 转换的时间格式  可以自定义
        SimpleDateFormat sdf = new SimpleDateFormat("M月d日");
        //转换
        return sdf.format(new Date(timeStamp));
    }

    //获得当天零时零分零秒
    public static Long initDateByDay(){
        LocalDate now = LocalDate.now();
        // 获取当天零点
        ZonedDateTime midnight = now.atStartOfDay(ZoneId.systemDefault());
        // 转换为时间戳
        return midnight.toInstant().toEpochMilli();
    }
}
