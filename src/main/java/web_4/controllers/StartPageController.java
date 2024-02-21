package web_4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import web_4.MyUser;
import web_4.UserRepository;

@RestController
public class StartPageController {

    @Autowired
    private UserRepository repository;
    @GetMapping("/")
    public ModelAndView startPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("start-page");
        return modelAndView;
    }

    @PostMapping("/sign-up")
    public RedirectView signUp(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
        repository.save(new MyUser(username, password));
        return new RedirectView("/task");
    }

    @PostMapping("/sign-in")
    public RedirectView signIn(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
        MyUser user = repository.findByUsername(username);
        if (user.getPassword().equals(password))
            return new RedirectView("/task");
        return new RedirectView("/");
    }
}
