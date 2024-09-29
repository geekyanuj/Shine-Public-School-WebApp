package com.shinepublicschool.validations;

import com.shinepublicschool.annotations.FieldsValueMatch;
import com.shinepublicschool.annotations.PasswordValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;

import java.lang.annotation.Annotation;

public class FieldsValueMatchValidator implements ConstraintValidator<FieldsValueMatch, Object> {

    private String field;
    private String fieldMatch;

    @Override
    public void initialize(FieldsValueMatch fieldsValueMatch) {
        this.field = fieldsValueMatch.field();
        this.fieldMatch = fieldsValueMatch.fieldMatch();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {
        Object fieldValue = new BeanWrapperImpl(value).getPropertyValue(field);
        Object fieldMatchValue = new BeanWrapperImpl(value).getPropertyValue(fieldMatch);
//        if(fieldValue !=null){
//            if (fieldValue.toString().startsWith("$2a")){
//                return true;
//            }else {
//                return fieldValue.equals(fieldMatchValue);
//            }
//        }else {
//            return fieldMatchValue == null;
//        }
        if(fieldValue != null){
            return fieldValue.equals(fieldMatchValue);
        }else {
           return fieldMatchValue ==null;
        }
    }

}
