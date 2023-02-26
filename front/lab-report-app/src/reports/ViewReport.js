import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router-dom";


function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }

function ViewReport() {
    const [imageSrc, setImageSrc] = useState('');
    const [reportData, setReportData] = useState(null);

    const [report, setReport] = useState({
        fileNumber: "",
        patientNameSurname: "",
        patientIdentityNumber: "",
        diagnosisTitle: "",
        diagnosisDetail: "",
        reportDate: "",
        reportImg: ""
        //reportImg: ""
    });

    const {id} = useParams();

    useEffect(() =>{
        loadReport();
         
        
    },[])

    const loadReport = async () =>{
        const result = await axios.get(`http://localhost:8081/reports/${id}`)
        setReport(result.data);

        const response = await fetch(`http://localhost:8081/reports/${id}/image`);
        const data = await response.arrayBuffer();
        const base64 = toBase64(new Uint8Array(data));
        setReportData(base64);
        
    }

  return (
    
    <div className='container'>
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
                <h2 className="text-center m-4">Rapor Detayları</h2>

                <div className="card">
                    <div className="card-header">

                        <ul className= "list-group list-group-flush">
                       
                    
                    <li className='list-group-item'>
                        <b>Dosya Numarası: {report.fileNumber}</b>
                    </li>

                    <li className='list-group-item'>
                        <b>Hasta Adı: {report.patientNameSurname}</b>
                    </li>

                   

                    <li className='list-group-item'>
                        <b>Hasta Kimlik Numarası: {report.patientIdentityNumber}</b>
                    </li>

                    <li className='list-group-item'>
                        <b>Koyulan Tanı Başlığı: {report.diagnosisTitle}</b>
                    </li>

                    <li className='list-group-item'>
                        <b>Tanı Detayları: {report.diagnosisDetail}</b>
                    </li>

                    <li className='list-group-item'>
                        <b>Rapor Verilme Tarihi: {report.reportDate}</b>
                    </li>
                    <li className='list-group-item'>
                        <b>Rapor Resmi: </b>
                        <br></br>
                        <img src={`data:image/jpeg;base64,${reportData}`} width={550} height={350} alt="Report Image" />
                    </li>
                        </ul>
                        
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/"}>Geri Dön</Link>
            </div>
        </div>
    </div>
  )
}

export default ViewReport