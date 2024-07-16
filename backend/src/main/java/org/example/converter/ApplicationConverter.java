package org.example.converter;

import org.example.model.Application;
import org.example.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

public class ApplicationConverter implements Converter<Long, Application> {

    @Autowired
    ApplicationRepository applicationRepository;

    @Override
    public Application convert(Long id) {
        Application application = applicationRepository.searchById(id);
        return application;
    }
}
