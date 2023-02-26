import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

const UserHome = () => {
  const [reports, setReports] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [sortByDate, setSortByDate] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      try {
        const res = await axios.get("http://localhost:8081/reports");
        setReports(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReports();
  }, []);

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
  };

  const handleSortByDate = (e) => {
    setSortByDate(e.target.checked);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.patientNameSurname.toLowerCase().includes(searchName.toLowerCase()) && 
      report.patientIdentityNumber.toLowerCase().includes(searchId)
  );

  const sortedReports = filteredReports.sort((a, b) =>
    sortByDate
      ? new Date(b.reportDate) - new Date(a.reportDate)
      : new Date(a.reportDate) - new Date(b.reportDate)
  );

  return (
    
    <div className='container'>
                <div className='py-4'>
                <h1>Raporlar</h1>
                <hr></hr>
                <div>
                    <label htmlFor="name"><strong>Hasta Adı Soyadı: </strong></label> <span> </span>
                    <input type="text" id="name" value={searchName} onChange={handleSearchName} />
                     <span> </span>
                    <label htmlFor="id"><strong>Hasta Kimlik Numarası: </strong></label>  <span> </span>
                    <input type="text" id="id" value={searchId} onChange={handleSearchId} />
                    <span> </span>
                    <label htmlFor="sort"><strong>Tarihe Göre Sırala: </strong></label> <span> </span>
                    <input type="checkbox" id="sort" checked={sortByDate} onChange={handleSortByDate} />

                </div>
                
                <hr></hr>
                
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
                 {sortedReports.map((report,i) => (
                    
                    <tr>
                    <th scope="row" key={i}>{i+1}</th>
                      <td>{report.patientNameSurname}</td>
                      <td>{report.patientIdentityNumber}</td>
                      <td>{report.reportDate}</td>

                      <td>
                            <Link className='btn btn-primary mx-2' to={`/viewReport/${report.id}`}>Detaylar</Link>
                      </td>
                      
                    </tr>
                  ))}
                    
                </tbody>
                <Link className='btn btn-danger mx-2' to="/">Geri Dön</Link>
            </table>
        </div>
    </div>
  );
};

export default UserHome;
