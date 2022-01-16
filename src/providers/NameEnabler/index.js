import { createContext, useContext, useState, useEffect } from "react";
import api_kenzie from "../../services/api_kenzie";

const NameEnablerContext = createContext();

export const NameEnabler = ({ children }) => {
  const [ name, setName ] = useState([]);
  const [ currentName, setCurrentName ] = useState("Facilitadores");
  const [ resultRequestKenzie, setResultRequestKenzie ] = useState({});
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ count, setCount ] = useState(0)

  useEffect(() => {
    // const result = responseApiKenzieCodewars();
    // setResultRequestKenzie(result)
    testeReponse();
  }, []);


  const testeReponse = async () => {
    let responseEnabler = [];
    let obj = {}
    let namesEnablers = [];

    await api_kenzie.get("/enablers",{
      onDownloadProgress: progressEvent => {
        const total = progressEvent.loaded
        const current = progressEvent.currentTarget.response.length
    
        let percentCompleted = Math.floor(current / total * 100)
        console.log('completed: ', percentCompleted)
      }
    })
      .then(response => {
        responseEnabler = response.data;
      })

    responseEnabler.forEach(enable => {
      const devsIds = enable["users"];
      const newDevsIds = devsIds.map(id => `https://codecodewars.herokuapp.com/api/users/${id}`);
      obj[enable["name"]] = enable;
      // obj["enable"] = enable;
      obj[enable["name"]]["req"] = newDevsIds;

    })

    for (let enable in obj){
      let arrApi = [];
      obj[enable]["req"].forEach(link => {
        arrApi.push(api_kenzie.get(link));
      })
      const results = await Promise.all(arrApi.map(p => p.catch(e => undefined)))
      
      let resultData = [];
      results.forEach(ele => ele && resultData.push(ele["data"]))
      namesEnablers.push(enable)
      obj[enable]["devs"] = resultData;
      setName(namesEnablers)   
      setResultRequestKenzie(obj);
    }
    setIsLoaded(true);
  }


  const responseApiKenzieCodewars = () => {
    let resultObj = {}
    let allEnablersNames = [];

    api_kenzie.get("/enablers")
      .then((response) => {
        let namesEnablers = [];
        response.data.forEach(currentEnabler => {
          namesEnablers.push(currentEnabler["name"])
        })
        setName(namesEnablers)        
        return response;
      })
      .then(response => {
        response.data.forEach(currentEnabler => {
          let resultDevs = [];
          const idEnabler = currentEnabler["username"];
          allEnablersNames.push(currentEnabler["name"])
  
          currentEnabler.users.forEach(user => {
            api_kenzie.get(`/users/${user}`)
              .then(response => {
                resultDevs.push(response.data);
              })
              .catch(error => {
                if (error.response) {
                  // console.log(error.response.data);
                }
              })
            }
          )
  
          resultObj[currentEnabler["name"]] = {"devs": resultDevs, "username": idEnabler, ...currentEnabler};
        })
        return response;
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      })

    // setName(allEnablersNames)
    return resultObj;
  }

  return (
    <NameEnablerContext.Provider
      value={{ name, setName, resultRequestKenzie, currentName, setCurrentName, isLoaded, count }}
    >
      {children}
    </NameEnablerContext.Provider>
  )
}

export const NameEnablerInfo = () => useContext(NameEnablerContext);
