package com.shinepublicschool.controller;

import com.shinepublicschool.model.Address;
import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Profile;
import com.shinepublicschool.repository.PersonRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller("profileControllerBean")  //we changed this default name since the same name bean is created by HAL explored.
public class ProfileController {

    @Autowired
    PersonRepository personRepository;

    @RequestMapping("/displayProfile")
    public ModelAndView displayProfile(Model model, HttpSession httpSession){
        Person person = (Person) httpSession.getAttribute("loggedInPerson");
        Profile profile = new Profile();
        profile.setName(person.getName());
        profile.setMobileNum(person.getMobileNum());
        profile.setEmail(person.getEmail());
        System.out.println(person.getAddress().getAddress1());
        if (person.getAddress()!=null && person.getAddress().getAddressId()>0){
            profile.setAddress1(person.getAddress().getAddress1());
            profile.setAddress2(person.getAddress().getAddress2());
            profile.setCity(person.getAddress().getCity());
            profile.setState(person.getAddress().getState());
            profile.setZipcode(person.getAddress().getZipcode());

        }
        ModelAndView modelAndView=new ModelAndView("profile");
        modelAndView.addObject("profile",profile);
        return modelAndView;
    }

    @PostMapping(value = "/updateProfile")
    public String updateProfile(@Valid @ModelAttribute("profile") Profile profile, Errors errors, HttpSession session){
        if (errors.hasErrors()){
            return "profile";
        }
        Person person = (Person) session.getAttribute("loggedInPerson");
        person.setName(profile.getName());
        person.setMobileNum(profile.getMobileNum());
        person.setEmail(profile.getEmail());
        if (person.getAddress()==null || !(person.getAddress().getAddressId()>0)){
            person.setAddress(new Address());
        }
        person.getAddress().setAddress1(profile.getAddress1());
        person.getAddress().setAddress2(profile.getAddress2());
        person.getAddress().setCity(profile.getCity());
        person.getAddress().setState(profile.getState());
        person.getAddress().setZipcode(profile.getZipcode());
        personRepository.save(person);
        session.setAttribute("loggedInPerson", person);
        return "redirect:/displayProfile";
    }
}
