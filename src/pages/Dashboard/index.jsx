import { useEffect, useState } from "react";
import { NameEnablerInfo } from './../../providers/NameEnabler'
import api from './../../services/api';
import enabler from './../../assets/enabler';
import DevCard from './../../components/DevCard';
import { MainStyle } from "./style";

const Dashboard = () => {
  const { name } = NameEnablerInfo();
  const [ devs, setDevs ] = useState([]);
  const [ allRes ] = useState({});
  const [ countUntil, setCountUntil ] = useState(10);

  const getHonorByEnabler = (arr) => arr.reduce((acc, ele) => acc + ele.honor, 0);
  

  const sortArrayByHonor = (arr) => {
    const again = (newArr) => {
      let change = false;
      for(let i = 1; i < newArr.length; i++){
        if(newArr[i].honor > newArr[i-1].honor){
          change = true;
          const save = newArr[i-1];
          newArr[i-1] = newArr[i];
          newArr[i] = save;
        }
      }
      if(!change){
        return newArr;
      }
      return again(newArr);
    }
    const newArry = again(arr);
    return newArry;
  }

  useEffect(() => {
    setCountUntil(10);
    let arrView = [];
    const storagedView = [];
    let count = 0;

    if (name === 'Facilitadores') {
      enabler.listEnablers.forEach(element => {
        arrView.push({
          "name": element,
          "id_user": enabler[element].id_user
        })
      })
    } else if (name === 'Todos DEVs') {
      setCountUntil(30)
      enabler.listEnablers.forEach(element => {
        arrView.push(...enabler[element].devs)
      })
    } else {
      arrView = enabler[name].devs;
    } 
  
    if(allRes[name]){
      setDevs(allRes[name])
    } else {
      arrView.forEach(x => {
        api.get(`/${x.id_user}`)
          .then((res) => {
            res.data['realName'] = x.name
            storagedView.push(res.data);
            count++;
            if(count === arrView.length){
              const newArrayDevs = sortArrayByHonor(storagedView);
              setDevs(newArrayDevs);
              allRes[name] = newArrayDevs;
            }
          })
          .catch(function (error) {
            count++;
            if(error.response){
              console.log('Error from url' + error.response.config.url)
            }
          });
      })
    }

  }, [name]);

  return (
    <MainStyle>
      <h2>Total de honor {getHonorByEnabler(devs)}</h2>
      {devs.map((currentDev, index) =>
        index < countUntil && <DevCard key={currentDev.username} dev={currentDev} position={index + 1}/>  
      )}
    </MainStyle>
  )
}

export default Dashboard;