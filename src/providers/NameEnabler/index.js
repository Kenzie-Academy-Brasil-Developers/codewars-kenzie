import { createContext, useContext, useState, useEffect } from "react";
import enabler from './../../assets/enabler';
import api from './../../services/api';

const NameEnablerContext = createContext();

export const NameEnabler = ({ children }) => {
  const [ name, setName ] = useState('Todos DEVs');
  const [ resultRequest, setResultRequest ] = useState({});

  useEffect(() => {
    teste();
  }, []);

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

  const teste = () => {
    let obj = {}

    enabler.listEnablers.forEach((currentEnabler) => {
      let currentDevs = [];
      let count = 0;
      const currentListDevs = enabler[currentEnabler].devs;

      // ToDo: aplicar função com generator
      currentListDevs.forEach(async (currentDev) => {

        await api.get(`/${currentDev.id_user}`)
          .then((response) => {
            const data = response.data;
            data['realName'] = currentDev.name;
            currentDevs.push(data);
            count++;
            if(count === currentListDevs.length){
              const resultDevs = sortArrayByHonor(currentDevs);
              const idEnabler = enabler[currentEnabler].id_user
              obj[currentEnabler] = {devs: [...resultDevs], id_user: idEnabler};
            }
          })
          .catch(err => {
            count++;
            if(err.response){
              console.log('Error from url' + err.response.config.url)
            }   
          })
      })
    })

    setResultRequest(obj);
  }
  return (
    <NameEnablerContext.Provider
      value={{ name, setName, resultRequest }}
    >
      {children}
    </NameEnablerContext.Provider>
  )
}

export const NameEnablerInfo = () => useContext(NameEnablerContext);
