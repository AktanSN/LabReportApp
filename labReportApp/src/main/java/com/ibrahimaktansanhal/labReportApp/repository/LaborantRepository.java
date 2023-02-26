package com.ibrahimaktansanhal.labReportApp.repository;

import com.ibrahimaktansanhal.labReportApp.model.Laborant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaborantRepository  extends JpaRepository<Laborant,Long> {
    Laborant findByUserName(String username);

    List<Laborant> findByLaborantNameContainingIgnoreCase(String laborantName);

    List<Laborant> findByLaborantSurnameContainingIgnoreCase(String laborantSurname);

    Laborant findByHospitalNumber(String hospitalNumber);

}
