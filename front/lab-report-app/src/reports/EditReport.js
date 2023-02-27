import axios from 'axios';
import React,{useEffect, useRef, useState} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'

function EditReport() {

    let navigate = useNavigate(); 
    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);
    const {id} = useParams()

    const [data,setData] = useState();
    console.log(data);

    const [report, setReport] = useState({
        fileNumber: "",
        patientNameSurname: "",
        patientIdentityNumber: "",
        diagnosisTitle: "",
        diagnosisDetail: "",
        reportDate: "",
        //reportImg: ""
    });
//,reportDate,reportImg
    const { fileNumber,patientNameSurname,patientSurname,patientIdentityNumber,diagnosisTitle,diagnosisDetail,reportDate} = report;

    const onInputChange = (e) =>{
        setReport({...report,[e.target.name]:e.target.value})
    }


   
    useEffect(() =>{
        loadReport();
    },[]);

    const onSubmit =async (e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8081/reports/${id}`, report);
        navigate("/"); 
    }

    const loadReport = async () => {
        const result = await axios.get(`http://localhost:8081/reports/${id}`)
        setReport(result.data)
    }

  return (
    <div className='container'>
    
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
                <h2 className="text-center m-4">Rapor Düzenle</h2>
                <hr></hr>
                <form onSubmit={(e)=> onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="fileNumber" className="form-label">
                        Dosya Numarası
                    </label>
                    <input type={"text"} className="form-control" placeholder='Dosya numarası gir' name="fileNumber" value={fileNumber} onChange={(e) => onInputChange(e)}></input>
                </div>
                <hr></hr>
                <div className="mb-3">
                    <label htmlFor="Username" className="form-label">
                        Hasta Ad/Soyad
                    </label>
                    <input type={"text"} className="form-control" placeholder='Hasta adı gir' name="patientNameSurname" value={patientNameSurname} onChange={(e) => onInputChange(e)} ></input>
                </div>
                <hr></hr>
               
                <hr></hr>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Hasta Kimlik Numarası
                    </label>
                    <input type={"text"} className="form-control" placeholder='Hasta kimlik numarası gir' name="patientIdentityNumber" value={patientIdentityNumber} onChange={(e) => onInputChange(e)} />
                </div>
                <hr></hr>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Koyulan Tanı Başlığı
                    </label>
                    <input type={"text"} className="form-control" placeholder='Tanı başlığı gir' name="diagnosisTitle" value={diagnosisTitle} onChange={(e) => onInputChange(e)}></input>
                </div>
                <hr></hr>
                
                    
                <div className="mb-3">
                    <label htmlFor="diagnosisDetail" className="form-label">
                        Tanı Detayları
                    </label>
                    <textarea type={"text"} className="form-control" placeholder="Tanı detayı gir" name="diagnosisDetail" value={diagnosisDetail} onChange={(e) => onInputChange(e)}></textarea>
                    
                </div>
                
                <hr></hr>

                <div className="mb-3">
                <input type="date" onChange={(e) => onInputChange(e)} value={reportDate} name="reportDate" ></input>
                <h4>{report.reportDate}</h4>
                 </div>
                <hr></hr>
                
                <button type="submit" className='btn btn-outline-primary'>Rapor Güncelle</button>
                <Link className='btn btn-outline-danger mx-2' to="/">Geri Dön</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditReport