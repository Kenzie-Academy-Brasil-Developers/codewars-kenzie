import { createContext, useContext, useState, useEffect } from "react";
import api_kenzie from "../../services/api_kenzie";

const NameEnablerContext = createContext();

export const NameEnabler = ({ children }) => {
  const [ name, setName ] = useState([]);
  const [ currentName, setCurrentName ] = useState("Facilitadores");
  const [ resultRequestKenzie, setResultRequestKenzie ] = useState({});
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ count, setCount ] = useState(1)

  useEffect(() => {
    setCount(10)
    testeReponse();
  }, []);


  const testeReponse = async () => {
    let responseEnabler = [];
    let obj = {}
    let namesEnablers = [];
    let soManyRequest = 0;

    await api_kenzie.get("/enablers")
      .then(response => {
        responseEnabler = response.data;
        response.data.forEach(element => {
          soManyRequest += element["users"].length;
        })
      })

    

    responseEnabler.forEach(enable => {
      const devsIds = enable["users"];
      const newDevsIds = devsIds.map(id => `https://codecodewars.herokuapp.com/api/users/${id}`);
      obj[enable["name"]] = enable;
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


  return (
    <NameEnablerContext.Provider
      value={{ name, setName, resultRequestKenzie, currentName, setCurrentName, isLoaded, count }}
    >
      {children}
    </NameEnablerContext.Provider>
  )
}

export const NameEnablerInfo = () => useContext(NameEnablerContext);
