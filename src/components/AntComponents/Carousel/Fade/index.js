import React from 'react'
import './style.css'
import { Carousel } from 'antd'

export default function(ReactDOM, mountNode) {
  ReactDOM.render(
    <Carousel effect="fade">
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
    </Carousel>,
    mountNode,
  )
}