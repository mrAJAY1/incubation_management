import React from 'react'
import Style from './loading.module.css'
function loading({ innerText }) {
  return (
    <div className={`d-flex justify-content-center align-items-center ${Style.containerDiv}`}  style={{ position: 'relative' }}>
      <div className={Style.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
    </div>

  )
}

export default loading
