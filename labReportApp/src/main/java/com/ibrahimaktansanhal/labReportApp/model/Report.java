package com.ibrahimaktansanhal.labReportApp.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table
@Data
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileNumber;

    private String patientNameSurname;

    private String patientIdentityNumber;

    private String diagnosisTitle;

    private String diagnosisDetail;

   // @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date reportDate;


    @Lob
    @Column(name="report_img", columnDefinition="LONGBLOB")
    private byte[] reportImg;
    public byte[] getReportImg() {
        return reportImg;
    }

    public void setReportImg(byte[] reportImg) {
        this.reportImg = reportImg;
    }
    //@ManyToOne
    //@JoinColumn(name = "laborant_id")
    //private Laborant laborant;

   


}
