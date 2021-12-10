import { UlStyle } from './style';

const DevCard = ({dev, position}) => {
  let color = "white";
  if(dev.ranks.languages.javascript) {
    color = dev.ranks.languages.javascript.color
  }
  return (
    <UlStyle color={color}>
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