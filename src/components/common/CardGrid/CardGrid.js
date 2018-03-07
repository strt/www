import React from 'react'
import Card from '../Card'
import style from './cardGrid.module.scss'

const CardGrid = ({ items }) => (
  <div className="grid -pad" style={{ marginTop: '-96px' }}>
    <div className="grid__column">
      <div className="grid__reset">
        <div className="grid">
          {items.map(i => (
            <div key={i.id} className="grid__column -desktop-6">
              <Card {...i} />
            </div>
          ))}
          {/* <div className="grid__column -desktop-6">
            <Card
              title="Enad röst tack vare kommunikativ plattform."
              subtitle="Garageportexperten"
              backgroundImage="/images/gara-case.jpg"
            />
          </div>
          <div className="grid__column -desktop-6">
            <Card
              title="3 webbplatser – en smart lösning"
              subtitle="Svebio"
              backgroundImage="/images/svebio-case.jpg"
            />
          </div>
          <div className="grid__column -desktop-6">
            <Card
              title="WER ger mer än kunderna visste"
              subtitle="Wer"
              backgroundImage="/images/wer-case.jpg"
            />
          </div> */}
        </div>
      </div>
    </div>
  </div>
)

export default CardGrid
