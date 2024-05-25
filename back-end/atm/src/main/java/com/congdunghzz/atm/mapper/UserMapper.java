package com.congdunghzz.atm.mapper;

import com.congdunghzz.atm.dto.UserResponse;
import com.congdunghzz.atm.model.User;
import org.springframework.stereotype.Service;


public class UserMapper {
    public static UserResponse ConvertToUserResponse(User user){
        return UserResponse
                .builder()
                .id(user.getId())
                .name(user.getName())
                .accountNumber(user.getAccountNumber())
                .build();
    }
}
