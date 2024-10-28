package com.shinepublicschool.rest;

import com.shinepublicschool.Constants.ShinePublicSchoolConstants;
import com.shinepublicschool.model.Contact;
import com.shinepublicschool.model.Response;
import com.shinepublicschool.repository.ContactRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
//@Controller  //used in case of mvc and responseBody style
@RestController
//@RequestMapping(path = "/api/contact", produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})  //used to generate XML as response
@RequestMapping(path = "/api/contact")
@CrossOrigin(origins = "*") // used to accept CORS from anywhere
public class ContactRestController {

    @Autowired
    ContactRepository contactRepository;

    @GetMapping("/getMessagesByStatus")
//    @ResponseBody  //used in case of mvc and responseBody style
    public List<Contact> getMessagesByStatus(@RequestParam(name = "status") String status){
        return contactRepository.findByStatus(status);
    }


    @GetMapping("/getAllMsgsByStatus")
//    @ResponseBody //used in case of mvc and responseBody style
    public List<Contact> getAllMsgsByStatus(@RequestBody Contact contact){
        if (contact != null && contact.getStatus() != null){
            return contactRepository.findByStatus(contact.getStatus());
        }else {
            return List.of(); //empty list
        }
    }


    //saving a message
    @PostMapping(path = "/saveMsg")
    public ResponseEntity<Response> saveMsg(@RequestHeader("invocationFrom") String invocationFrom, @Valid @RequestBody Contact contact){
        log.info(String.format("Header invocationFrom = %s",invocationFrom));
        contactRepository.save(contact);
        Response response = new Response();
        response.setStatusCode("200");
        response.setStatusMsg("Message saved successfully");
        return ResponseEntity.status(HttpStatus.CREATED).header("isMsgSaved","true").body(response);
    }


    //deleting a message
    @DeleteMapping(path = "/deleteMsg")
    public ResponseEntity<Response> deleteMsg(RequestEntity<Contact> contactRequestEntity){
        HttpHeaders headers = contactRequestEntity.getHeaders();
        headers.forEach((key,value)->{
            log.info(String.format("Header '%s' =  %s",key,value.stream().collect(Collectors.joining("|"))));
        });
        Contact contact = contactRequestEntity.getBody();
        contactRepository.deleteById(contact.getContactId());
        Response response = new Response();
        response.setStatusCode("200");
        response.setStatusMsg("Message deleted successfully");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //updating the status of message
    @PatchMapping("/closeMsg")
    public ResponseEntity<Response> closeMsg(@RequestBody Contact contact){
        Response response = new Response();
        Optional<Contact> contactDB = contactRepository.findById(contact.getContactId());
        if (contactDB.isPresent()){
            contactDB.get().setStatus(ShinePublicSchoolConstants.CLOSE);
            contactRepository.save(contactDB.get());
        }else{
            response.setStatusCode("400");
            response.setStatusMsg("Invalid Contact Id");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.setStatusCode("200");
        response.setStatusMsg("Message Closed Successfully");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
