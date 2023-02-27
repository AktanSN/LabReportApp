import axios from 'axios';
import React,{useRef, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Upload from './Upload';

function AddReport() {

    const [file, setFile] = useState(null);
  
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  }

    let navigate = useNavigate(); 
   

    const [data,setData] = useState();
    console.log(data);

    const [report, setReport] = useState({
        fileNumber: "",
        patientNameSurname: "",
        patientIdentityNumber: "",
        diagnosisTitle: "",
        diagnosisDetail: "",
        reportDate: "",
    });
//,reportImg
    const { fileNumber,patientNameSurname,patientIdentityNumber,diagnosisTitle,diagnosisDetail,reportDate} = report;

    const onInputChange = (e) =>{
        setReport({...report,[e.target.name]: e.target.value})
        
    }



    const onSubmit =async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8081/reports", report);

        const formData = new FormData();
        formData.append('file', file);
        await axios.post('http://localhost:8081/reports/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then(response => {
        console.log(response.data);
        }).catch(error => {
        console.log(error);
        });
        
        
        navigate("/"); 
    }

 


  

  return (
    <div className='container'>
    
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
                <h2 className="text-center m-4">Rapor Ekle</h2>
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
                        Hasta Adı/Soyadı
                    </label>
                    <input type={"text"} className="form-control" placeholder='Hasta adı gir' name="patientNameSurname" value={patientNameSurname} onChange={(e) => onInputChange(e)} ></input>
                </div>
                
                <hr></hr>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Hasta Kimlik Numarası
                    </label>
                    <input type={"text"} className="form-control" placeholder='Hasta kimlik numarası gir' name="patientIdentityNumber" value={patientIdentityNumber} onChange={(e) => onInputChange(e)} />
                </div>
                <hr></hr>
                <div className="mb-3">
                    <label htmlFor="diagnosisTitle" className="form-label">
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
                    <input type={"date"} onChange={(e) => onInputChange(e)} value={reportDate} name="reportDate"></input>
                    
                    </div>
                <hr></hr>
                <div className="mb-3">
                <input type="file" onChange={handleFileInputChange} />
        
                    </div>
                <hr></hr>
                
                
                <button type="submit" className='btn btn-outline-primary'>Rapor Ekle</button>
                <Link className='btn btn-outline-danger mx-2' to="/">Geri Dön</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddReport