import React, { useState, useEffect, Fragment } from 'react'
import Loading from '../loading/Loading'
import currencyUnits from '../../data/currencyUnits'
import './Table.css'

const Table = () => {
  const [currency, setCurrency] = useState([])

  const getData = async (currencyUnit) => {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/edc9a4c6da14652792e007ee/pair/BYN/${currencyUnit}`);

    if (!res.ok) {    
      throw new Error(`Could not fetch ${currencyUnit}` +
        `, received ${res.status}`)
    }
    return await res.json()
  }

  useEffect(() => {
    async function getAllRates(currencyUnits) {
      return await Promise.all(currencyUnits.map(async item => {
        let currencyUnit = await getData(item);
        const data = []
        data.push(currencyUnit.target_code)
        data.push(currencyUnit.conversion_rate)
        return data
      }));
    }
  
    getAllRates(currencyUnits).then(res => {
      setCurrency(res)
    })
  }, [setCurrency])
  console.log(currency);
  return (
    <Fragment>
      {
        currency.length ? 
          <table className="currency-table">
            <thead>
              <tr>
                <th>Наименование иностранной валюты</th>
                <th>Официальный курс</th>
              </tr>
            </thead>
            <tbody>
              {currency.map((item, index) => {
                return (
                  <tr key={Date.now() + index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table> : 
          <Loading />
      }
    </Fragment>

  )
}

export default Table
