package org.example.service;

import org.example.model.Application;
import org.example.model.Floor;
import org.example.model.Office;
import org.example.model.User;
import org.example.repository.ApplicationRepository;
import org.example.repository.FloorRepository;
import org.example.repository.OfficeRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MainService {
    @Autowired
    OfficeRepository officeRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FloorRepository floorRepository;

    public Office findOfficeById(Long id) {
        Optional<Office> officeOptional = officeRepository.findById(id);
        if (officeOptional.isEmpty()) {
            throw new RuntimeException("No office");
        }
        return officeOptional.get();
    }

    @Scheduled(cron = "0 0 1 * * *")
    public void checkingOffices(){
        List<Office> offices = officeRepository.searchAllByIsFreeFalse();
        LocalDate today = LocalDate.now();
        for(var office: offices){
            if(today.isAfter(office.getEndDate())){
                System.out.println(office.getId());
                office.setIsFree(true);
                office.setStartDate(null);
                office.setEndDate(null);
                office.setUser(null);
                officeRepository.save(office);
            }
        }
    }
    public List<Office> getAllOfficesForUser(Long userId){
        return officeRepository.getAllByUserId(userId);
    }

    public List<Office> getAllOffices() {
        return officeRepository.findAll();
    }

    public List<User> getAllUsers() {
        return userRepository.searchAll();
    }

    public List<Office> getAllOfficesWithSort(Sort sort) {
        return officeRepository.findAll(sort);
    }

    public List<Floor> getAllFloors() {
        return floorRepository.findAll();
    }

    public List<Application> getAllApplicationsAreNotNew() {
        return applicationRepository.searchAllByIsNewIsFalseOrderByFilingDateDesc();
    }

    public List<Application> getAllApplicationsAreNew() {
        return applicationRepository.searchAllByIsNewIsTrueOrderByFilingDateDesc();
    }

    public void saveApplication(Application application) {
        applicationRepository.save(application);
    }

    public void saveOffice(Office office) {
        officeRepository.save(office);
    }

    public Application findApplicationById(Long id) {
        Optional<Application> applicationOptional = applicationRepository.findById(id);
        if (applicationOptional.isEmpty()) {
            throw new RuntimeException("No application");
        }
        return applicationOptional.get();
    }

    public User findUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("No user");
        }
        return userOptional.get();
    }

    public List<Office> getQueryWithFreeInternetSun(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQueryWithFreeInternetSun(minArea, minWindows, minSockets, sort);
    }

    public List<Office> getQueryWithFreeSun(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQueryWithFreeSun(minArea, minWindows, minSockets, sort);
    }

    public List<Office> getQueryWithFreeInternet(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQueryWithFreeInternet(minArea, minWindows, minSockets, sort);
    }

    public List<Office> getQueryWithFree(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQueryWithFree(minArea, minWindows, minSockets, sort);
    }

    public List<Office> getQueryWithSunInternet(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQueryWithSunInternet(minArea, minWindows, minSockets, sort);
    }

    public List<Office> getQueryWithInternet(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQueryWithInternet(minArea, minWindows, minSockets, sort);
    }

    public List<Office> getQueryWithSun(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQueryWithSun(minArea, minWindows, minSockets, sort);
    }

    public List<Office> getQuery(Integer minArea, Integer minWindows, Integer minSockets, Sort sort) {
        return officeRepository.getQuery(minArea, minWindows, minSockets, sort);
    }
}
