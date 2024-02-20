package web_4.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class TaskPageController {
    @GetMapping("/task")
    public ModelAndView taskPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("task-page");
        return modelAndView;
    }
}
