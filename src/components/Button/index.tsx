import { NameEnablerInfo } from './../../providers/NameEnabler'
import { ButtonStyle } from './style'

interface ButtonProviders {
  pointerName: string
}

const Button = ({ pointerName }: ButtonProviders) => {
  const { setName, name } = NameEnablerInfo();
  let target = false;
  
  if(pointerName === name){
    target = true
  }
  
  return (
    <ButtonStyle target={target} onClick={() => setName(pointerName)} >
      {pointerName}
    </ButtonStyle>
  )
}

export default Button;