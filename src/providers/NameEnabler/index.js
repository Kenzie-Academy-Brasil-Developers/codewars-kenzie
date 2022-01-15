import { createContext, useContext, useState, useEffect } from "react";
import enabler from './../../assets/enabler';
import api from './../../services/api';
import api_kenzie from "../../services/api_kenzie";

const NameEnablerContext = createContext();

export const NameEnabler = ({ children }) => {
  const [ name, setName ] = useState([]);
  const [ currentName, setCurrentName ] = useState("Facilitadores");
  const [ resultRequest, setResultRequest ] = useState({});
  const [ resultRequestKenzie, setResultRequestKenzie ] = useState({});
  const [ isLoaded, setIsLoad ] = useState(false);

  useEffect(async () => {
    // responseApiCodewars();
    const result = await responseApiKenzieCodewars();
    setResultRequestKenzie(result)
    setIsLoad(true);
    console.log('1')
  }, []);


  const responseApiKenzieCodewars = async () => {
    let resultObj = {}
    let allEnablersNames = [];

    try {
      const response = await api_kenzie.get("/enablers")

      response.data.forEach(async currentEnabler => {
        let resultDevs = [];
        const idEnabler = currentEnabler["username"];
        allEnablersNames.push(currentEnabler["name"])

        await currentEnabler.users.forEach(user => {
          api_kenzie.get(`/users/${user}`)
            .then(response => {
              resultDevs.push(response.data);
            })
            .catch(err => {
              console.log(err)
            })
          }
        )

        resultObj[currentEnabler["name"]] = {"devs": resultDevs, "username": idEnabler, ...currentEnabler};
      })
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }

    setName(allEnablersNames)
    return resultObj;
  }

  return (
    <NameEnablerContext.Provider
      value={{ name, setName, resultRequest, resultRequestKenzie, currentName, setCurrentName}}
    >
      {children}
    </NameEnablerContext.Provider>
  )
}

export const NameEnablerInfo = () => useContext(NameEnablerContext);
