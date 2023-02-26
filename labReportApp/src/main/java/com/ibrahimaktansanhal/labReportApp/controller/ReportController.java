package com.ibrahimaktansanhal.labReportApp.controller;


import com.ibrahimaktansanhal.labReportApp.model.Laborant;
import com.ibrahimaktansanhal.labReportApp.model.Report;
import com.ibrahimaktansanhal.labReportApp.repository.LaborantRepository;
import com.ibrahimaktansanhal.labReportApp.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private LaborantRepository laborantRepository;
    public ReportController(ReportRepository reportRepository, LaborantRepository laborantRepository) {
        this.reportRepository = reportRepository;
        this.laborantRepository = laborantRepository;

        // Default laborant tanımlama
        if (laborantRepository.count() == 0) {
            Laborant defaultLaborant = new Laborant();
            defaultLaborant.setLaborantName("Default");
            defaultLaborant.setLaborantSurname("Laborant");
            defaultLaborant.setHospitalNumber("1234567");
            laborantRepository.save(defaultLaborant);
        }
    }

   /* @GetMapping("/reports")
    public List<Report> getAllReports(){
        return reportRepository.findAll();
    }

    @GetMapping("/report/{reportId}")
    public Report getReportById(@PathVariable Long reportId){
        return reportRepository.findById(reportId).orElse(null);
    }

    @PostMapping("/report")
    public Report createNewReport(@RequestBody Report report){
        return reportRepository.save(report);
    }

    @PutMapping("/report/{reportId}")
    public Report updateReport(@RequestBody Report report, @PathVariable Long reportId){
        return reportRepository.findById(reportId)
                .map( r -> {
                    r.setFileNumber(report.getFileNumber());
                    r.setPatientName(report.getPatientName());
                    r.setPatientSurname(report.getPatientSurname());
                    r.setPatientIdentityNumber(report.getPatientIdentityNumber());
                    r.setDiagnosisTitle(report.getDiagnosisTitle());
                    r.setDiagnosisDetail(report.getDiagnosisDetail());
                    r.setReportDate(report.getReportDate());

                    return reportRepository.save(report);
        }).orElse(null);
    }

    @DeleteMapping("/report/{reportId}")
    public void deleteReport(@PathVariable Long reportId){
        reportRepository.deleteById(reportId);
    } */

    private Laborant getDefaultLaborant() {
        return laborantRepository.findById(1L).orElse(null);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getReportImg(@PathVariable Long id) {
        Report report = reportRepository.findById(id).orElse(null);
        byte[] imageBytes = report.getReportImg();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(imageBytes.length);
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        Report savedReport = reportRepository.save(report);
        return ResponseEntity.created(URI.create("/reports/" + savedReport.getId())).body(savedReport);
    }



    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            Report report = getAllReportsSortedByReportDate().get(getAllReports().size()-1);
            report.setReportImg(file.getBytes());
            reportRepository.save(report);
            return "File uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed!";
        }
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        Optional<Report> optionalReport = reportRepository.findById(id);
        return optionalReport.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable Long id, @RequestBody Report report) {
        Optional<Report> optionalReport = reportRepository.findById(id);
        if (optionalReport.isPresent()) {
            Report existingReport = optionalReport.get();
            existingReport.setFileNumber(report.getFileNumber());
            existingReport.setPatientNameSurname(report.getPatientNameSurname());
            existingReport.setPatientIdentityNumber(report.getPatientIdentityNumber());
            existingReport.setDiagnosisTitle(report.getDiagnosisTitle());
            existingReport.setDiagnosisDetail(report.getDiagnosisDetail());
            existingReport.setReportDate(report.getReportDate());
            existingReport.setReportImg(report.getReportImg());
            existingReport.setLaborant(report.getLaborant());
            Report savedReport = reportRepository.save(existingReport);
            return ResponseEntity.ok(savedReport);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        Optional<Report> optionalRapor = reportRepository.findById(id);
        if (optionalRapor.isPresent()) {
            reportRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(params = "patientNameSurname")
    public List<Report> searchRaporByPatientNameAndSurname(@RequestParam String patientNameAndSurname) {
        return reportRepository.findByPatientNameSurnameContainingIgnoreCase(patientNameAndSurname);
    }

    @GetMapping(params = "patientIdentityNumber")
    public List<Report> searchRaporByHastaTc(@RequestParam String patientIdentityNumber) {
        return reportRepository.findByPatientIdentityNumber(patientIdentityNumber);
    }

    @GetMapping(params = "laborantId")
    public List<Report> searchReportByLaborantId(@RequestParam Long laborantId) {
        Optional<Laborant> optionalLaborant = laborantRepository.findById(laborantId);
        if (optionalLaborant.isPresent()) {
            Laborant laborant = optionalLaborant.get();
            return reportRepository.findByLaborant(laborant);
        } else {
            return Collections.emptyList();
        }
    }

    @GetMapping(params = "sortByVerilisTarihi")
    public List<Report> getAllReportsSortedByReportDate() {
        return reportRepository.findByOrderByReportDateDesc();
    }


}
