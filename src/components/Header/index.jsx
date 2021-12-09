import {HeaderStyle} from './style'
import Button from './../Button'
import enabler from '../../assets/enabler';

export default function Header() {
  return (
    <HeaderStyle>
      <nav>
        <ul>
          {enabler.listEnablers.map(x => 
            <li><Button name={x}/></li>
            )}
          <li><Button name={'Facilitadores'}/></li>
        </ul>
      </nav>
    </HeaderStyle>
  )
}
