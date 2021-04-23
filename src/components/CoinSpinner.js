import React from 'react'

export default function ({ type }) {
  if(type === 'table') {
    return(<tbody className="coin-spinner text-light text-center"></tbody>)
  } else {
    return(<div className="coin-spinner text-light text-center"></div>)
  }
} 
