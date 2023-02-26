import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

function LaborantHome() {

    const [reports, setReports] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadReports();
    },[])

    const loadReports = async () =>{
        const result = await axios.get("http://localhost:8081/reports")
        setReports(result.data)
        console.log(result.data)
    }

    const deleteReport = async (id) =>{
        await axios.delete(`http://localhost:8081/reports/${id}`)
        loadReports();
    }

    

  return (
    <div className='container'>
        <div className='py-4'>
                <h1>Raporlar</h1>
                <br></br>
                <Link className='btn btn-dark btn-lg' to="/addreport">Rapor Ekle</Link>
                <hr></hr>
                <table className="table border shadow">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Hasta Adı/Soyadı</th>
                    <th scope="col">Hasta Kimlik Numarası</th>
                    <th scope="col">Rapor Verilme Tarihi</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                        reports.map((report,i) => (
                            <tr>
                                <th scope="row" key={i}>{i+1}</th>
                                <td>{report.patientNameSurname}</td>
                                <td>{report.patientIdentityNumber}</td>
                                <td>{report.reportDate}</td>
                                
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewReport/${report.id}`}>Detaylar</Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/editReport/${report.id}`}>Düzenle</Link>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteReport(report.id)}>Sil</button>
                                </td>
                            </tr>
                            ))
                    }
                
                
                </tbody>
                <Link className='btn btn-danger mx-2' to="/">Geri Dön</Link>
            </table>
        </div>
    </div>
  )
}

export default LaborantHome  