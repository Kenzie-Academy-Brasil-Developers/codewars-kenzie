import { useEffect, useState } from "react";
import { NameEnablerInfo } from './../../providers/NameEnabler'
import api from './../../services/api';
import enabler from './../../assets/enabler';
import DevCard from './../../components/DevCard';
import { MainStyle } from "./style";

const Dashboard = () => {
  const { name } = NameEnablerInfo();
  const [ devs, setDevs ] = useState([]);

  const sortArray = (arr) => {
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
    let devsEnabler = [];
    const arrayDevs = [];
    let count = 0

    if (name === 'Facilitadores') {
      enabler.listEnablers.forEach(x => {
        devsEnabler.push({
          "name": x,
          "id_user": enabler[x].id_user
        })
      })
    } else {
      devsEnabler = enabler[name].devs;
    }


    devsEnabler.forEach(x => {
      api.get(`/${x.id_user}`)
        .then(res => {
          res.data['realName'] = x.name
          arrayDevs.push(res.data);
          console.log(res.data)
          count++;
          if(count === devsEnabler.length){
            const newArrayDevs = sortArray(arrayDevs);
            setDevs(newArrayDevs);
          }
        })
        .catch(err => console.log(err))
    })

    
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