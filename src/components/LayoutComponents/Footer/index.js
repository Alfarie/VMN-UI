import React from 'react'
import { Button } from 'antd'
import './style.scss'

class AppFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        
        <div className="footer__top">
          <div className="row">
            <div className="col-sm-6">
              
            </div>
            <div className="col-sm-6">
              <div className="footer__copyright">
                <img
                  src="resources/images/mediatec.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="Mediatec Software"
                />
                <span>
                  © 2018{' '}
                  <a href="http://mediatec.org/" target="_blank" rel="noopener noreferrer">
                    Grobot Software Team
                  </a>
                  <br />
                  All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppFooter
