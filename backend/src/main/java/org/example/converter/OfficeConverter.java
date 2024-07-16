package org.example.converter;

import org.example.model.Office;
import org.example.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
public class OfficeConverter implements Converter<Long, Office> {

    @Autowired
    private MainService mainService;

    @Override
    public Office convert(Long id) {
        Office office = mainService.findOfficeById(id);
        return office;
    }
}
