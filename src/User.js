import axios from "axios";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Api } from "./component/Api";
import Authenticator from "./component/Authenticator";
import Header from "./component/Header";
import Home from "./component/Home";
import HomeToTopic from "./component/HomeToTopic";
import Introduce from "./component/Introduce";
import CreateNew from "./component/journalist/CreateNew";
import New from "./component/New";
import Taskbar from "./component/Taskbar";
import { getListAccount } from "./Redux/action/admin";
import { getListNew } from "./Redux/action/articles";
import { getCategories } from "./Redux/action/categories";

function User() {

  let dispatch = useDispatch();

    const stateHome = useSelector(state => state.opencloseCPN.isChangStateHome)
    const stateHomeToTopic = useSelector(state => state.opencloseCPN.isChangStateHomeToTopic)
  const stateNew = useSelector(state => state.opencloseCPN.isChangStateNew)
  const stateAuth = useSelector(state => state.opencloseCPN.isChangeStateAuth)
  const stateCreatNew = useSelector(state => state.opencloseCPN.isChangeStateCreatNew)
  const stateIntroduce = useSelector(state => state.opencloseCPN.isChangStateIntroduce)

  const fetchListNew = async () => {
    const response = await axios.get(Api().articles)
    dispatch(getListNew(response.data))
}

const fetchListUsers = async () => {
  const response = await axios.get(Api().user)
  dispatch(getListAccount(response.data))
}



const fetchCategories = async () => {
  const response = await axios.get(Api().categories)
  console.log(response.data)
  dispatch(getCategories(response.data))
}


useEffect(()=>{
  fetchListNew()
  fetchCategories()
  fetchListUsers()

},[])

  const showFormHome = ()=>{
    if(stateHome){
      return <Home/>
    }
  }
  const showFormNew = ()=>{
    if(stateNew){
      return <New/>
    }
  }
  const showFormAuth = ()=>{
    if(stateAuth){
      return <Authenticator/>
    }
  }
  const showFormHomeToTopic = ()=>{
    if(stateHomeToTopic){
      return <HomeToTopic/>
    }
  }

  const showFormCreatNew = ()=>{
    if(stateCreatNew){
      return <CreateNew/>
    }
  }
  const showFormIntroduce = ()=>{
    if(stateIntroduce){
      return <Introduce/>
    }
  }

    return (
        <>
        <Header/>
        <Taskbar/>
        {showFormCreatNew()}
       {showFormHome()}
        {showFormNew()}
        {showFormAuth()}
        {showFormHomeToTopic()}
        {showFormIntroduce()}
       
        </>
      
    );
}

export default User