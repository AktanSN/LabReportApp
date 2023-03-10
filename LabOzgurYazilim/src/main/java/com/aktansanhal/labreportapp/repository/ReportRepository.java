package com.aktansanhal.labreportapp.repository;


import com.aktansanhal.labreportapp.model.Laborant;
import com.aktansanhal.labreportapp.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {

    
    List<Report> findByPatientNameSurnameContainingIgnoreCase(String patientNameSurname);

    List<Report> findByPatientIdentityNumber(String patientIdentityNumber);

    List<Report> findByLaborant(Laborant laborant);

    List<Report> findByOrderByReportDateDesc();


}
