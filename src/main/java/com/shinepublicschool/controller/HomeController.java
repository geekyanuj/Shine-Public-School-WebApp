package com.shinepublicschool.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping(value = {"", "/", "home"})
//    @RequestMapping(value = {"home"})  //removed the / since we are using /path for HAL Explorer, again added since rest base path configured
    public String displayHomePage(Model model) {
        return "home";
    }
}
