package com.shinepublicschool.rest;

import com.shinepublicschool.model.Holiday;
import com.shinepublicschool.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/holidays")
public class HolidayRestController {

    @Autowired
    private HolidayRepository holidayRepository;

    // GET /api/holidays?type=all|festival|nationalholiday
    @GetMapping
    public ResponseEntity<List<Holiday>> getHolidays(
            @RequestParam(required = false, defaultValue = "all") String type) {

        Iterable<Holiday> all = holidayRepository.findAll();
        List<Holiday> holidays = StreamSupport.stream(all.spliterator(), false)
                .collect(Collectors.toList());

        if ("festival".equalsIgnoreCase(type)) {
            holidays = holidays.stream()
                    .filter(h -> h.getType() == Holiday.Type.FESTIVAL)
                    .collect(Collectors.toList());
        } else if ("nationalholiday".equalsIgnoreCase(type)) {
            holidays = holidays.stream()
                    .filter(h -> h.getType() == Holiday.Type.NATIONALHOLIDAY)
                    .collect(Collectors.toList());
        }

        return ResponseEntity.ok(holidays);
    }
}
