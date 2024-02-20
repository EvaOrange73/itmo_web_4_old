package web_4.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class StartPageController {
    @GetMapping("/")
    public ModelAndView startPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("start-page");
        return modelAndView;
    }
}