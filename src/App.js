import React, { useEffect, useState } from 'react';
import './App.css';
import { LoaderPage } from './LoaderPage';
import Swal from 'sweetalert2';
import NutritionTable from './NutritionTable';


function App() {
  const [mySearch, setMySearch] = useState('');
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState(null);
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = 'e40bc61f';
  const APP_KEY = 'ea7c4895181ced0e8dc897a2ba0ba564';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details';

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingr: ingr })
    });

    if (response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      Swal.fire({
        icon: 'warning',
        title: 'looks like some ingridients are entered icorrectly.',
        text: 'Try using: 1 avocado, 8oz tuna steak, 1kg spinach etc.,',
        confirmButtonColor: '#006501'
      });
    }
  }

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted]);

  return (
    <div className='App'>



      {stateLoader && <LoaderPage />}
      
      <div className='container'>
      <h1>Nutrition Analysis</h1>
      </div>

      <div className='container'>
      <form onSubmit={finalSearch}>
        <input className='search'  placeholder="Search..." onChange={myRecipeSearch} />
        <button type="submit"> Search </button>
      </form>
      </div>
      <div className='container'>
      {myNutrition && <NutritionTable nutrients={Object.values(myNutrition.totalNutrients)} />}
      </div>
    </div>
  );
}

export default App;
