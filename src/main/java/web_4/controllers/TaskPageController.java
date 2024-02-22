package web_4.controllers;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import web_4.PointRepository;

@RestController
public class TaskPageController {
    @Autowired
    PointRepository repository;
    @GetMapping("/task")
    public ModelAndView taskPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("task-page");
        return modelAndView;
    }

    @GetMapping("/task/points")
    public String getPoint(){
        return new Gson().toJson(repository.findAll());
    }
}
