package org.example.controller;

import org.example.model.*;
import org.example.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {

    @Autowired
    MainService mainService;

    //Информация об офисах на главной странице
    @GetMapping("/officeShort/{officeId}")
    public ResponseEntity<OfficeResponse> getShortInformation(@PathVariable Long officeId) {
        Office office = mainService.findOfficeById(officeId);
        OfficeResponse officeResponse = new OfficeResponse(
                office.getId(),
                office.getNumber(),
                office.getIsFree(),
                office.getArea());
        return ResponseEntity.ok(officeResponse);
    }

    //Детальная информация о конкретном офисе
    @GetMapping("/officeFullInfo/{officeId}")
    public ResponseEntity<OfficeWithFileResponse> getOffice(@PathVariable Long officeId) throws IOException {
        Office office = mainService.findOfficeById(officeId);

        String fileName = office.getFileName();
        String filePath = new File("uploads\\" + fileName).getAbsolutePath();
        System.out.println(filePath);

        File file = new File(filePath);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        // кодируем файл в формат base64
        byte[] fileContent = Files.readAllBytes(Path.of(filePath));
        String base64File = Base64.getEncoder().encodeToString(fileContent);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);

        OfficeWithFileResponse officeWithFileResponse = new OfficeWithFileResponse(office, base64File);
        return ResponseEntity.ok(officeWithFileResponse);
    }

    //Полная информация о всех офисах для администратора
    @GetMapping("/adminInfo")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<List<Office>>> getAllOffices() {
        List<Office> offices = mainService.getAllOffices();

        List<List<Office>> twoOffice = new ArrayList<>();
        twoOffice.add(offices.subList(0, offices.size() / 2));
        twoOffice.add(offices.subList(offices.size() / 2, offices.size()));

        return ResponseEntity.ok(twoOffice);
    }

    //Получение непросмотренных заявлений
    @GetMapping("/newApplications")
    public ResponseEntity<?> getAllApplicationsAreNew() {
        List<Application> applications = mainService.getAllApplicationsAreNew();
        return ResponseEntity.ok(applications);
    }

    //Получение всех заявлений, отсортированных по дате по убыванию
    @GetMapping("/notNewApplications")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllApplicationsAreNotNew() {
        List<Application> applications = mainService.getAllApplicationsAreNotNew();
        return ResponseEntity.ok(applications);
    }

    //Отметка посмотра заявлений
    @PostMapping("/noticeNewApplications")
    public ResponseEntity<?> noticeNotNew(@RequestBody CheckNewApplicationRequest checkNewApplicationRequest) {
        List<Long> viewedId = checkNewApplicationRequest.getIdApplication();
        for (var applicationId : viewedId) {
            Application application = mainService.findApplicationById(applicationId);
            application.setIsNew(false);
            mainService.saveApplication(application);
        }
        return ResponseEntity.ok("Good");
    }

    //Создание нового заявления
    @PostMapping("/createApplication")
    public ResponseEntity<?> createApplication(@Valid @RequestBody ApplicationValidationRequest applicationValidationRequest) {
        Application application = new Application();
        application.setIsNew(true);
        application.setFIO(applicationValidationRequest.getFio());
        application.setTelephoneNumber(applicationValidationRequest.getTelephoneNumber());
        application.setFilingDate(LocalDate.now());
        application.setOfficeNumber(applicationValidationRequest.getNumberOffice());
        mainService.saveApplication(application);
        return ResponseEntity.ok("Заявление успешно отправлено");
    }

    //Добавление арендатора офису
    @PostMapping("/addUserToOffice")
    public ResponseEntity<?> addUser(@RequestBody UserAddingRequest userAddingRequest) {
        Office office = mainService.findOfficeById(userAddingRequest.getOfficeId());
        User user = mainService.findUserById(userAddingRequest.getUserId());
        office.setUser(user);
        office.setIsFree(false);
        office.setEndDate(userAddingRequest.getEndDate());
        office.setStartDate(LocalDate.now());
        mainService.saveOffice(office);
        return ResponseEntity.ok("Success");
    }

    //Получение списка всех пользователей
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = mainService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //Получение списка этажей
    @GetMapping("/floors")
    public ResponseEntity<?> getFloors() {
        List<Floor> floors = mainService.getAllFloors();
        return ResponseEntity.ok(floors);
    }

    @GetMapping("/allOffices")
    public ResponseEntity<?> getOffices() {
        List<Office> offices = mainService.getAllOffices();
        return ResponseEntity.ok(offices);
    }

    @PostMapping("/officeSort")
    public ResponseEntity<?> sortQueryOffices(@RequestBody OfficesQueryRequest officesQueryRequest) {
        Sort sort;
        List<Office> offices = null;
        //Сортировка
        if (!officesQueryRequest.getSort().isEmpty()) {
            if (!officesQueryRequest.getDir().isEmpty()) {
                if (officesQueryRequest.getDir().equals("desc")) {
                    sort = Sort.by(officesQueryRequest.getSort()).descending();
                } else {
                    sort = Sort.by(officesQueryRequest.getSort()).ascending();
                }
            } else {
                sort = Sort.by(officesQueryRequest.getSort()).ascending();
            }
        } else {
            sort = Sort.unsorted();
        }

        //Выборка
        if (officesQueryRequest.getIsFree()) {
            if (officesQueryRequest.getIsSun()) {
                if (officesQueryRequest.getIsInternet()) {
                    offices = mainService.getQueryWithFreeInternetSun(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()),
                            sort);
                } else {
                    offices = mainService.getQueryWithFreeSun(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()), sort);
                }
            } else {
                if (officesQueryRequest.getIsInternet()) {
                    offices = mainService.getQueryWithFreeInternet(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()), sort);
                } else {
                    offices = mainService.getQueryWithFree(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()), sort);
                }
            }
        } else {
            if (officesQueryRequest.getIsInternet()) {
                if (officesQueryRequest.getIsSun()) {
                    offices = mainService.getQueryWithSunInternet(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()), sort);
                } else {
                    offices = mainService.getQueryWithInternet(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()), sort);
                }
            } else {
                if (officesQueryRequest.getIsSun()) {
                    offices = mainService.getQueryWithSun(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()), sort);
                } else {
                    offices = mainService.getQuery(
                            convertInput(officesQueryRequest.getMinArea()),
                            convertInput(officesQueryRequest.getMinWindows()),
                            convertInput(officesQueryRequest.getMinSockets()), sort);
                }
            }


        }
        return ResponseEntity.ok(offices);
    }

    @GetMapping("/userOffices/{userId}")
    public ResponseEntity<List<Office>> getAllOfficesForUser(@PathVariable Long userId){
        List<Office> offices = mainService.getAllOfficesForUser(userId);
        return ResponseEntity.ok(offices);
    }

    private Integer convertInput (Integer input){
        return input == null ? 0 : input;
    }
}
