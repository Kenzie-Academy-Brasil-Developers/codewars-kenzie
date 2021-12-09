import { UlStyle } from './style';

const DevCard = ({dev, position}) => {
  return (
    <UlStyle>
      <li>{position}</li>
      <li>{dev.realName.length > 15
      ? dev.realName.substring(0, 15) + '...'
      : dev.realName
      }</li>
      <li>{dev.honor}</li>
    </UlStyle>
  )
}

export default DevCard;