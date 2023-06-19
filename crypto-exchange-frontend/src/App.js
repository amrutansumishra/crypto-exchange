import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [search,setSearch] = useState();
  const [showData,setShowData] = useState([]);
  const [page,setPage] = useState(1)
  useEffect(()=>{
fetchAPI()
  },[])

  const handlePage = (selectedPage) =>{
    if (selectedPage >= 1 && selectedPage <= showData.length / 2 && selectedPage !== page) {
    setPage(selectedPage)
    }
  }

  const handleSearch = (e) =>{
    if(e.target.value.trim()){
        const resultdata = search.filter((value,index)=>value.name.includes(e.target.value))
        setShowData(resultdata);
        setPage(1)
    }else{
        setShowData(search);
    } 
    
  }
  const fetchAPI = async ()=>{
    try{
      const response = await fetch('http://localhost:5000/api/exchanges')
      const data = await response.json()
      if(data.success===false){
        console.log("There is some error in backend configuration or API")
        return false
      }
      setShowData(data)
      setSearch(data)
    }catch(err){     
        console.log("There is some error in backend configuration or API")
        return false
    }
    
    
  }

  const fetchData = async ()=>{
      const result =await fetch('https://rest.coinapi.io/v1/exchanges?apikey=FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9');
      const icon =await fetch('https://rest.coinapi.io/v1/exchanges/icons/32?apikey=FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9');
      const icon_data = await icon.json()
      const data = await result.json()
      icon_data.map((val,index)=>
        storeIcon(val)
      )
      data.map((val,index)=>
        storeData(val)
      )
      
  }
  const storeIcon=async(val)=>{
    let result1 = await fetch('http://localhost:5000/api/add-exchange-icon',{
      method:"POST",
      body:JSON.stringify(val),
      headers:{
        "content-type":"application/json"
      }
  })
 result1 = await result1.json();
  }
  const storeData=async(val)=>{
    let result1 = await fetch('http://localhost:5000/api/add-exchanges',{
      method:"POST",
      body:JSON.stringify(val),
      headers:{
        "content-type":"application/json"
      }
  })
 result1 = await result1.json();

  }

  return (
    <div className="App">
        <button className='fetch-data-btn' onClick={()=>fetchData()}>Fetch Data</button>
        <div className="header">
          <h2>Top cypto exchanges</h2>
          <p>Compare all 190 crypto exchanges. The list is ranked by trading volume</p>
        </div>
        <div className="exchange-header">
            Exchanges
        </div>
        <div className="body-content">
            <div className="search-bar">
                  <div className='form-group'>
                    <input type="text" placeholder='Find an exchange' onChange={(e)=>{handleSearch(e)}} />
                    <div className='search-icon'><img src="https://www.freepnglogos.com/uploads/search-png/search-icon-transparent-images-vector-16.png" alt="search-icon" width="20" /></div>
                </div>
            </div>
            <div className='crypto-exchange-table'>
              <div className='table-row-header'>
                <div className='table-col'>EXCHANGES</div>
                <div className='table-col'>24H TRADE VALUE</div>
              </div>
              {showData?.slice(page*10-10,page*10).map((value,index)=>
                <div className='table-row' key={value.exchange_id}>
                  <div className='table-row-content'>
                    <div className='table-col'>{(page*10-10)+index+1} {value.icons[0] && <img src={value.icons[0]?.url} alt="exchange-icon"/>}{value.name}</div>
                    <div className='table-col'>$ {(value.volume_1day_usd/1000000000).toFixed(2)} billion</div>
                  </div>                  
                </div>
              )}
                           
            </div>
            { showData.length>0 &&
            (<div className='pagination'>
            <div className={page > 1 ? "previous" : "previous pagination__disable"} onClick={()=>handlePage(page-1)}>Previous</div>
            <div className={page > 1 ? "number" : "pagination__disable"} onClick={()=>handlePage(page-1)}>{page-1}</div>
            <div className="number acc" onClick={()=>handlePage(page)}>{page}</div>
            <div className={page<showData.length / 10 ? "number" : "number pagination__disable"} onClick={()=>handlePage(page+1)}>{page+1}</div>
            
            <div className={page<showData.length / 10 ? "next" : "next pagination__disable"} onClick={()=>handlePage(page+1)}>Next</div>
          </div>)
          }
            
        </div>
    </div>
  );
}

export default App;
