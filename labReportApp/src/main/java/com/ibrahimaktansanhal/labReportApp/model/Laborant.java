package com.ibrahimaktansanhal.labReportApp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Data
public class Laborant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String laborantName;

    private String laborantSurname;

    private String hospitalNumber;

    private String userName;
    private String password;

    @OneToMany(mappedBy = "laborant")
    private List<Report> reports = new ArrayList<>();


}
