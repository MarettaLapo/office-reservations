package org.example.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.example.model.Office;

import java.util.List;

@Repository
public interface OfficeRepository extends JpaRepository<Office, Long> {

    List<Office> getAllByUserId(Long userId);
    List<Office> searchAllByIsFreeFalse();

    @Query("select o from Office o where " +
            "o.isFree = true and o.officeDetail.isInternet = true and o.officeDetail.isSun = true " +
            "and o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQueryWithFreeInternetSun(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);

    @Query("select o from Office o where " +
            "o.isFree = true and o.officeDetail.isSun = true " +
            "and o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQueryWithFreeSun(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);

    @Query("select o from Office o where " +
            "o.isFree = true and o.officeDetail.isInternet = true " +
            "and o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQueryWithFreeInternet(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);

    @Query("select o from Office o where " +
            "o.isFree = true " +
            "and o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQueryWithFree(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);

    @Query("select o from Office o where " +
            "o.officeDetail.isInternet = true and o.officeDetail.isSun = true " +
            "and o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQueryWithSunInternet(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);

    @Query("select o from Office o where " +
            "o.officeDetail.isInternet = true " +
            "and o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQueryWithInternet(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);

    @Query("select o from Office o where " +
            "o.officeDetail.isSun = true " +
            "and o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQueryWithSun(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);

    @Query("select o from Office o where " +
            "o.area > ?1 and o.officeDetail.windowsCount > ?2 and o.officeDetail.sockets > ?3")
    List<Office> getQuery(
            Integer minArea, Integer minWindows, Integer minSockets, Sort sort);
}
