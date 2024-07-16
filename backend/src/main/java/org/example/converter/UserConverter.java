package org.example.converter;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.example.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

public class UserConverter implements Converter<Long, User> {

    @Autowired
    private MainService mainService;


    @Override
    public User convert(Long id) {
        User user = mainService.findUserById(id);
        return user;
    }
}
