<?php
/**
 * Created by PhpStorm.
 * User: asus
 * Date: 2017/9/11
 * Time: 1:00
 */
    //require_once "Template.html";
    ob_implicit_flush();
    $time=0;
    //ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行.
    set_time_limit(30); // 执行时间为无限制，php默认执行时间是30秒，可以让程序无限制的执行下去
    if($_POST["time"]==1)echo $time+"s";
    do{
        $time++;//+1s
        echo "+1s\n";
        sleep(1);// 按设置的时间等待一小时循环执行
    }while(true);
?>