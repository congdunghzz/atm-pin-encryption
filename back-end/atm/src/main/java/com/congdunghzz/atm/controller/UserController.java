package com.congdunghzz.atm.controller;

import com.congdunghzz.atm.dto.LoginRequest;
import com.congdunghzz.atm.dto.UserResponse;
import com.congdunghzz.atm.model.User;
import com.congdunghzz.atm.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable(value = "id") Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getById(id));
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login (@RequestBody LoginRequest request){
        System.out.println(request);
        return ResponseEntity.status(HttpStatus.OK).body(userService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody User user){
        return ResponseEntity.status(HttpStatus.OK).body(userService.register(user));
    }

    @PutMapping("/{id}/pin")
    public ResponseEntity<String> updateEncodedPin(@PathVariable(value = "id") Integer id,
                                                   @RequestBody String encodedPin){
        return ResponseEntity.status(HttpStatus.OK).body(userService.setEncodedPinById(id, encodedPin));
    }


    @GetMapping("/{id}/pin")
    ResponseEntity<String> getEncodedPin(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getEncodedPinById(id));
    }

}
