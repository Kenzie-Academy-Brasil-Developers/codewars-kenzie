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
    let arrView = [];
    const storagedView = [];
    let count = 0;

    if (name === 'Facilitadores') {
      enabler.listEnablers.forEach(x => {
        arrView.push({
          "name": x,
          "id_user": enabler[x].id_user
        })
      })
    } else {
      arrView = enabler[name].devs;
    }
  
    if(allRes[name]){
      setDevs(allRes[name])
    } else {
      arrView.forEach(x => {
        api.get(`/${x.id_user}`)
          .then(res => {
            res.data['realName'] = x.name
            storagedView.push(res.data);
            count++;
            if(count === arrView.length){
              const newArrayDevs = sortArrayByHonor(storagedView);
              setDevs(newArrayDevs);
              allRes[name] = newArrayDevs;
            }
          })
          .catch(err => console.log(err))
      })
    }
    

  }, [name]);
  return (
    <MainStyle>
      {devs.map((x, index) =>
        <DevCard key={x.username} dev={x} position={index + 1}/>  
      )}
    </MainStyle>
  )
}

export default Dashboard;