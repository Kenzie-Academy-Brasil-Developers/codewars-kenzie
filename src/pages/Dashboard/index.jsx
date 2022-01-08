import { useEffect, useState } from "react";
import { NameEnablerInfo } from './../../providers/NameEnabler'
import DevCard from './../../components/DevCard';
import { MainStyle } from "./style";

const Dashboard = () => {
  const { name, resultRequest } = NameEnablerInfo();
  const [ devs, setDevs ] = useState([]);
  const [ allRes ] = useState({});
  const [ countUntil, setCountUntil ] = useState(10);

  // const getHonorByEnabler = (arr) => arr.reduce((acc, ele) => acc + ele.honor, 0);
  
  useEffect(() => {
    if (name === 'Facilitadores'){
      
    }else if (name === 'Todos DEVs') {
      
    } else {
      setDevs(resultRequest[name].devs);
    }
  }, [name])

  return (
    <>
    <MainStyle>
      {/* <h2>Total de honor {getHonorByEnabler(devs)}</h2> */}
      {!!devs.length && devs.map((currentDev, index) =>
        index < countUntil && <DevCard key={currentDev.username} dev={currentDev} position={index + 1}/>  
        )}
    </MainStyle>
        </>
  )
}

export default Dashboard;