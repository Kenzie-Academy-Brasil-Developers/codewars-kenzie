import {HeaderStyle} from './style'
import Button from './../Button'
import enabler from '../../assets/enabler';

export default function Header() {
  return (
    <HeaderStyle>
      <nav>
        <ul>
          <li><Button pointerName={'Todos DEVs'}/></li>
          {enabler.listEnablers.map(x => 
            <li><Button pointerName={x}/></li>
            )}
          <li><Button pointerName={'Facilitadores'}/></li>
        </ul>
      </nav>
    </HeaderStyle>
  )
}
