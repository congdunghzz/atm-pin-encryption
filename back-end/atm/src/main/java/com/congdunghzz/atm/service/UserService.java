package com.congdunghzz.atm.service;

import com.congdunghzz.atm.dto.LoginRequest;
import com.congdunghzz.atm.dto.UserResponse;
import com.congdunghzz.atm.exception.NotFoundException;
import com.congdunghzz.atm.mapper.UserMapper;
import com.congdunghzz.atm.model.User;
import com.congdunghzz.atm.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public String getEncodedPinById(int id){
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) throw new NotFoundException("User with id: " + id + " is not found");
        return user.get().getEncodedPin();
    }

    public String setEncodedPinById(int id, String encodedPin){
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) throw new NotFoundException("User with id: " + id + " is not found");
        user.get().setEncodedPin(encodedPin);
        User updatedUser = userRepository.save(user.get());
        return updatedUser.getEncodedPin();
    }

    public UserResponse login(LoginRequest request){
        Optional<User> user = userRepository.findByAccountNumber(request.accountNumber());
        if (user.isEmpty()) throw new NotFoundException("User with username: " + request.accountNumber() + " is not found");
        if (user.get().getPassword().equals(passwordEncoder.encode(request.password()))){
            return UserMapper.ConvertToUserResponse(user.get());
        }
        return null;
    }

    public UserResponse register(User user){
        User createdUser = User
                .builder()
                .name(user.getName())
                .accountNumber(user.getAccountNumber())
                .password(passwordEncoder.encode(user.getPassword()))
                .build();
        return UserMapper.ConvertToUserResponse(userRepository.save(createdUser));
    }

    public UserResponse getById(int id){
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) throw new NotFoundException("User cant not be found");
        return UserMapper.ConvertToUserResponse(user.get());
    }

}
