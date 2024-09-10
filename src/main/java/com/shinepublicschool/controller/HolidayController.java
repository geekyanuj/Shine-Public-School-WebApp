package com.shinepublicschool.controller;

import com.shinepublicschool.model.Holiday;
import com.shinepublicschool.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class HolidayController {
    private final HolidayRepository holidayRepository;

    @Autowired
    public HolidayController(HolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }



/*
     //Handing with RequestParam
        @GetMapping(value = "/holidays")
        public String displayHolidays(@RequestParam(required = false) boolean festival, @RequestParam(required = false) boolean nationalholiday, Model model) {
            model.addAttribute("festival",festival);
            model.addAttribute("nationalholiday",nationalholiday);
            List<Holiday> holidays = Arrays.asList(new Holiday("01 Jan ", "New Year", Holiday.Type.FESTIVAL), new Holiday("26 Jan ", "Republic Day", Holiday.Type.NATIONALHOLIDAY), new Holiday("14 Mar ", "Holi", Holiday.Type.FESTIVAL), new Holiday("14 Apr ", "Ambedkar Jayanti", Holiday.Type.FESTIVAL), new Holiday("15 Aug ", "Independence Day", Holiday.Type.NATIONALHOLIDAY), new Holiday("30 Sep ", "Durga Puja", Holiday.Type.FESTIVAL), new Holiday("02 Oct ", "Gandhi Jayanti", Holiday.Type.NATIONALHOLIDAY), new Holiday("21 Oct ", "Diwali", Holiday.Type.FESTIVAL), new Holiday("05 Nov ", "Guru Nanak Gurupurab", Holiday.Type.FESTIVAL), new Holiday("25 Dec ", "Christmas Day", Holiday.Type.FESTIVAL));
            Holiday.Type[] types = Holiday.Type.values();
            for (Holiday.Type type : types) {
                model.addAttribute(type.toString(), (holidays.stream().filter(holiday -> holiday.getType().equals(type)).collect(Collectors.toList())));
            }
            return "holidays";
        }
*/

    @GetMapping(value = "/holidays/{display}")
    public String displayHolidays(@PathVariable String display, Model model) {
//        if (null != display && display.tol.equals("all")) {
//            model.addAttribute("festival", true);
//            model.addAttribute("nationalholiday", true);
//        } else if (display != null && display.equals("festival")) {
//            model.addAttribute("festival", true);
//        } else if (display != null && display.equals("nationalholiday")) {
//            model.addAttribute("nationalholiday", true);
//        }
        if (display != null) {
            String value = display.toLowerCase();
            switch (value) {
                case "all":
                    model.addAttribute("festival", true);
                    model.addAttribute("nationalholiday", true);
                    break;
                case "festival":
                    model.addAttribute("festival", true);
                    break;
                case "nationalholiday":
                    model.addAttribute("nationalholiday", true);
                    break;
            }
        }

//        List<Holiday> holidays = Arrays.asList();
        Iterable<Holiday> holidays = holidayRepository.findAll();
        List<Holiday> holidayList= StreamSupport.stream(holidays.spliterator(),false).collect(Collectors.toList());
        Holiday.Type[] types = Holiday.Type.values();
        for (Holiday.Type type : types) {
            model.addAttribute(type.toString(), (holidayList.stream().filter(holiday -> holiday.getType().equals(type)).collect(Collectors.toList())));
        }
        return "holidays";
    }
}
