import React from 'react'
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className="border shadow" id="deneme">
        
        <div className="card mt-5 align-items-center" id="deneme2">
        <h3 className="card-title mt-5"><strong>Kullanıcı Tipi Seçin</strong></h3>
            <div className="card-body d-grid gap-2 ">
            <p className="card-text mt-5">Uygulamaya Ziyaretçi Olarak Devam Etmek İçin Tıklayın</p>
            <Link className="btn btn-primary btn-lg" to="/userPage">Ziyaretçi Giriş</Link>
            </div>

            <div className="card-body d-grid gap-2 ">
            <p className="card-text">Uygulamaya Laborant Olarak Devam Etmek İçin Tıklayın</p>
            <Link className="btn btn-danger btn-lg mb-5" type="button" to="/laborantPage">Laborant Giriş</Link>
            </div>

            
        </div>

    
    </div>
  )
}

export default Home;