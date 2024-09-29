package com.shinepublicschool.controller;

import com.shinepublicschool.model.EClass;
import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Subject;
import com.shinepublicschool.repository.EClassRepository;
import com.shinepublicschool.repository.PersonRepository;
import com.shinepublicschool.repository.SubjectRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("admin")
public class AdminController {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    EClassRepository eClassRepository;

    @Autowired
    SubjectRepository subjectRepository;

    @RequestMapping("/displayClasses")
    public ModelAndView displayClasses(Model model){
        List<EClass> eClasses = eClassRepository.findAll();
        ModelAndView modelAndView = new ModelAndView("classes");
        modelAndView.addObject("eClasses",eClasses);
        modelAndView.addObject("eClass", new EClass());
        return modelAndView;
    }

    @PostMapping("/addNewClass")
    public ModelAndView addNewClass(Model model, @ModelAttribute("eClass") EClass eClass){
        eClassRepository.save(eClass);
        ModelAndView modelAndView = new ModelAndView("redirect:/admin/displayClasses");
        return modelAndView;
    }

    @RequestMapping("/deleteClass")
    public ModelAndView deleteClass(Model model, @RequestParam int classId){
        Optional<EClass> eClass = eClassRepository.findById(classId);
        for (Person person : eClass.get().getPersons()){
            person.setEClass(null);
            personRepository.save(person);
        }
        eClassRepository.deleteById(classId);
        ModelAndView modelAndView = new ModelAndView("redirect:/admin/displayClasses");
        return modelAndView;
    }

    @GetMapping("/displayStudents")
    public ModelAndView displayStudents(Model model, @RequestParam int classId, HttpSession session, @RequestParam(value = "error", required = false) String error){
        String errorMsg;
        ModelAndView modelAndView = new ModelAndView("students");
        Optional<EClass> eClass = eClassRepository.findById(classId);
        modelAndView.addObject("eClass", eClass.get());
        modelAndView.addObject("person", new Person());
        session.setAttribute("eClass", eClass.get());
        if (error != null ){
            if (session.getAttribute("errorMsg")!=null){
                errorMsg = (String) session.getAttribute("errorMsg");
            }else{
                errorMsg = "Invalid Email Entered";
            }
            modelAndView.addObject("errorMsg", errorMsg);
        }
        return modelAndView;
    }

    @PostMapping("/addStudent")
    public ModelAndView addStudent(Model model, @ModelAttribute("person") Person person, HttpSession session){
        ModelAndView modelAndView = new ModelAndView();
        EClass eClass = (EClass) session.getAttribute("eClass");
        Person personEntity = personRepository.readByEmail(person.getEmail());
        if (personEntity == null || !(personEntity.getPersonId()>0)){
            modelAndView.setViewName("redirect:/admin/displayStudents?classId="+eClass.getClassId()+"&error=true");
            return modelAndView;
        } else if (personEntity.getEClass()!=null) {
            //If Student is already present
            if (personEntity.getEClass().getClassId()==eClass.getClassId()){
                String errorMsg = "Student is already present in class!";
                session.setAttribute("errorMsg", errorMsg);
            }else {
                session.setAttribute("errorMsg", personEntity.getEmail()+" is already part of "+personEntity.getEClass().getName());
            }
            modelAndView.setViewName("redirect:/admin/displayStudents?classId="+eClass.getClassId()+"&error=true");
            return modelAndView;
        }
        personEntity.setEClass(eClass);
        personRepository.save(personEntity);
        eClass.getPersons().add(personEntity);
        eClassRepository.save(eClass);
        modelAndView.setViewName("redirect:/admin/displayStudents?classId="+eClass.getClassId());
        return modelAndView;
    }


    @RequestMapping("/deleteStudent")
    public ModelAndView deleteStudent(Model model, @RequestParam int personId,HttpSession session){
        EClass eClass = (EClass) session.getAttribute("eClass");
        Optional<Person> person = personRepository.findById(personId);
        person.get().setEClass(null);
        eClass.getPersons().remove(person.get());
        EClass eClassSaved = eClassRepository.save(eClass);
        session.setAttribute("eClass", eClassSaved);
        ModelAndView modelAndView = new ModelAndView("redirect:/admin/displayStudents?classId="+eClass.getClassId());
        return modelAndView;
    }

    @GetMapping("/displaySubjects")
    public ModelAndView displaySubjects(Model model, HttpSession session, @RequestParam(value = "error", required = false) String error){
        String errorMsg;
        List<Subject> subjects = subjectRepository.findAll();
        ModelAndView modelAndView = new ModelAndView("subjects");
        modelAndView.addObject("subjects", subjects);
        model.addAttribute("subject", new Subject());
        if (error != null ){
            if (session.getAttribute("errorMsg")!=null){
                errorMsg = (String) session.getAttribute("errorMsg");
            }else{
                errorMsg = "Invalid Subject Entered";
            }
            modelAndView.addObject("errorMsg", errorMsg);
        }
        return modelAndView;
    }

    @PostMapping("/addSubject")
    public ModelAndView addSubject(Model model, @ModelAttribute("subject") Subject subject){
        subjectRepository.save(subject);
        ModelAndView modelAndView = new ModelAndView("redirect:/admin/displaySubjects");
        return modelAndView;
    }


}
