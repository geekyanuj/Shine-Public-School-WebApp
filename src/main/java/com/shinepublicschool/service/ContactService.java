package com.shinepublicschool.service;

import com.shinepublicschool.Constants.ShinePublicSchoolConstants;
import com.shinepublicschool.model.Contact;
import com.shinepublicschool.repository.ContactRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

//    private static Logger log= LoggerFactory.getLogger(ContactController.class);
//above statement can be replaced by @Slf4j annotation, it will provide the log object

    /*
    save contact details into DB
    @param contact
    @return boolean
     */

    public boolean saveMessageDetails(Contact contact) {
        boolean isSaved = false;
        contact.setStatus(ShinePublicSchoolConstants.OPEN);
//        contact.setCreatedBy(ShinePublicSchoolConstants.ANONYMOUS); //These are now maintained by Spring JPA AuditingAware
//        contact.setCreatedAt(LocalDateTime.now());
        Contact savedContact = contactRepository.save(contact); //spring data jpa
        if (savedContact != null && savedContact.getContactId() > 0) {
            isSaved = true;
        }
        return isSaved;
    }


    public List<Contact> findMsgsWithOpenStatus() {
        return contactRepository.findByStatus(ShinePublicSchoolConstants.OPEN);
    }

    public List<Contact> findMsgsWithClosedStatus() {
        return contactRepository.findByStatus(ShinePublicSchoolConstants.CLOSE);
    }

    public boolean updateMsgStatus(int contactId) {
        boolean isUpdated = false;
        Optional<Contact> contact = contactRepository.findById(contactId);
        contact.ifPresent(contact1 -> {
            contact1.setStatus(ShinePublicSchoolConstants.CLOSE);
//            contact1.setUpdatedBy(updatedBy);  //These are now maintained by Spring JPA AuditingAware
//            contact1.setUpdatedAt(LocalDateTime.now());
        });
        Contact updatedContact = contactRepository.save(contact.get());
        if (updatedContact != null && updatedContact.getUpdatedBy() != null) {
            isUpdated = true;
        }
        return isUpdated;
    }
    public boolean updateMsgStatusToReopen(int contactId) {
        boolean isUpdated = false;
        Optional<Contact> contact = contactRepository.findById(contactId);
        contact.ifPresent(contact1 -> {
            contact1.setStatus(ShinePublicSchoolConstants.OPEN);
//            contact1.setUpdatedBy(updatedBy);      //These are now maintained by Spring JPA AuditingAware
//            contact1.setUpdatedAt(LocalDateTime.now());
        });
        Contact updatedContact = contactRepository.save(contact.get());
        if (updatedContact != null && updatedContact.getUpdatedBy() != null) {
            isUpdated = true;
        }
        return isUpdated;
    }
}
