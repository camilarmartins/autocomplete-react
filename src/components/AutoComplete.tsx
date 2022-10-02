import React, {useCallback, useEffect, useState, useRef } from 'react';

import './AutoComplete.css';

interface IOptions {
  name: string;
  capital: string;
  common: string;
}

type Country = string;

const highlightedStyle = {
  backgroundColor: '#00b09b'
}

const AutoComplete: React.FC = () => {
  const [display, setDisplay] = useState<Boolean>(false);
  const [options, setOptions] = useState<[IOptions]>();
  const [search, setSearch] = useState("");
   const wrapperRef = useRef<HTMLInputElement>(null);

  const loadOptions = useCallback(async () => {
      // get the data from the API
      const response = await fetch('https://restcountries.com/v3.1/all');
      // convert the data to json
      const data = await response.json();

      const countryOptions = data.map(function(item: IOptions) { return item['name']});
      
      // set the state with thre result
      setOptions(countryOptions);
  }, [])

  useEffect(() => {
    // call the function
    loadOptions()
      .catch(console.error);
  }, [loadOptions]);


  const updateCountrySelected = (country: Country) => {
    setSearch(country);
    setDisplay(false)
  }

  return (     
  <div ref={wrapperRef} className='search'>
    <div className='searchInput'>
      <input
        id="auto"
        placeholder='Search...'
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={event => setSearch(event.target.value)}
       />
      </div>
       {
        display && (
          <div className='searchResult'>
          {
            options
            ?.filter(({ common }) => common.toLowerCase().includes(search.toLowerCase()))
            .map((value, i) => {
              let string = value.common.substring(
                0,
                value.common.toLowerCase().indexOf(search.toLowerCase())
              );
              
              let endString = value.common.substring(
                value.common.toLowerCase().indexOf(search.toLowerCase()) + search.length
              );

              let highlightedText = value.common.substring(
                value.common.toLowerCase().indexOf(search.toLowerCase()),
                search.length
              );

              return (
                <div
                  onClick={() => updateCountrySelected(value.common)}
                  className='searchItem'
                  key={i}
                >
                  {string}
                  <span style={highlightedStyle}>{highlightedText}</span>
                  {endString}
                </div>
              )
            })
          }
          </div>
        )
       }
    </div>
  );
}

export default AutoComplete;