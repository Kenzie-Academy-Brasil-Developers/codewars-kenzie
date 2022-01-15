import { useEffect, useState } from "react";
import { NameEnablerInfo } from './../../providers/NameEnabler'
import DevCard from './../../components/DevCard';
import { MainStyle } from "./style";




const Dashboard = () => {
  const { resultRequestKenzie, currentName } = NameEnablerInfo();
  const [ devs, setDevs ] = useState([]);
  const [ countUntil, setCountUntil ] = useState(10);
  const [ totalHonor, setTotalHonor ] = useState(0);


  const getHonorByEnabler = (arr) => arr.reduce((acc, ele) => acc + ele.current_honor, 0);
  
  useEffect(() => {
    showPerson(currentName);
  }, [currentName])

  const showPerson = (currentName) => {

    if (currentName === 'Facilitadores'){
      let allEnablers = [];
      for (let enabler in resultRequestKenzie){
        let newEnabler = resultRequestKenzie[enabler]
        allEnablers.push(newEnabler)
      }
      setDevs(sortArrayByHonor(allEnablers))
      setTotalHonor(getHonorByEnabler(allEnablers))

    }else if (currentName === 'Todos DEVs') {
      let allDevs = [];
      for (let enable in resultRequestKenzie){
        const devs = resultRequestKenzie[enable]["devs"]
        allDevs.push(...devs)
      }
      const allDevsSort = sortArrayByHonor(allDevs)
      setTotalHonor(getHonorByEnabler(allDevs))
      setDevs(allDevsSort);
      setCountUntil(30)
    } else if(resultRequestKenzie[currentName]) {
      let currentDevs = sortArrayByHonor(resultRequestKenzie[currentName]["devs"])
      setDevs(currentDevs);
      setTotalHonor(getHonorByEnabler(resultRequestKenzie[currentName]["devs"]))
    setCountUntil(10)
      
    } else {

    }
  }

  const sortArrayByHonor = (arr) => {

    const again = (newArr) => {
      let change = false;

      for(let i = 1; i < newArr.length; i++){
        if(newArr[i]["current_honor"] > newArr[i-1]["current_honor"]){
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

  return (
    <>


    <MainStyle>
      <h2>Total de honor {totalHonor}</h2>
      {/* <Profile /> */}

      {!!devs.length && devs.map((currentDev, index) =>
        index < countUntil && <DevCard key={currentDev.username} dev={currentDev} position={index + 1}/>  
        )}
      <div>
      </div>
    </MainStyle>
        </>
  )
}

export default Dashboard;