import { ButtonStyle } from './style';
import { NameEnablerInfo } from './../../providers/NameEnabler'

interface ButtonProviders {
  name: string
}

const Button = ({ name }: ButtonProviders) => {
  const { setName } = NameEnablerInfo();
  return (
    <ButtonStyle onClick={() => setName(name)}>
      {name}
    </ButtonStyle>
  )
}

export default Button;