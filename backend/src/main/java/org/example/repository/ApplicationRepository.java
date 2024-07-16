package org.example.repository;

import org.example.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> searchAllByIsNewIsFalseOrderByFilingDateDesc();
    List<Application> searchAllByIsNewIsTrueOrderByFilingDateDesc();
    Application searchById(Long id);

}
