package com.ibrahimaktansanhal.labReportApp.controller;

import com.ibrahimaktansanhal.labReportApp.model.Laborant;
import com.ibrahimaktansanhal.labReportApp.model.Report;
import com.ibrahimaktansanhal.labReportApp.repository.LaborantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/laborants")
public class LaborantController {
    @Autowired
    private LaborantRepository laborantRepository;

    /* @GetMapping("/laborants")
    public List<Laborant> getAllLaborants(){
        return laborantRepository.findAll();
    }

    @GetMapping("/laborant/{laborantId}")
    public Laborant getLaborantById(@PathVariable Long laborantId){
        return laborantRepository.findById(laborantId).orElse(null);
    } */


    @PostMapping
    public ResponseEntity<Laborant> createLaborant(@RequestBody Laborant laborant) {
        Laborant savedLaborant = laborantRepository.save(laborant);
        return ResponseEntity.created(URI.create("/laborants/" + savedLaborant.getId())).body(savedLaborant);
    }

    @GetMapping
    public List<Laborant> getAllLaborants() {
        return laborantRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Laborant> getLaborantById(@PathVariable Long id) {
        Optional<Laborant> optionalLaborant = laborantRepository.findById(id);
        return optionalLaborant.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Laborant> updateLaborant(@PathVariable Long id, @RequestBody Laborant laborant) {
        Optional<Laborant> optionalLaborant = laborantRepository.findById(id);
        if (optionalLaborant.isPresent()) {
            Laborant existingLaborant = optionalLaborant.get();
            existingLaborant.setLaborantName(laborant.getLaborantName());
            existingLaborant.setLaborantSurname(laborant.getLaborantSurname());
            existingLaborant.setHospitalNumber(laborant.getHospitalNumber());
            Laborant savedLaborant = laborantRepository.save(existingLaborant);
            return ResponseEntity.ok(savedLaborant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaborant(@PathVariable Long id) {
        Optional<Laborant> optionalLaborant = laborantRepository.findById(id);
        if (optionalLaborant.isPresent()) {
            laborantRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
