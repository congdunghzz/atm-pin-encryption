package com.congdunghzz.atm.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class NotFoundExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handle (NotFoundException e){
        int status = HttpStatus.NOT_FOUND.value();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(status, e.getMessage()));
    }
}
