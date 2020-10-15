import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import {Link,Route} from "react-router-dom"
import {Spinner} from "react-bootstrap"
import {getcurrentprofile,clearCurrentProfile} from "../../js/action/profileactions"





const Dashboard = ({profile,getprofilee}) => {
 
  const user =useSelector((state)=>state.authReducer.user)
  const isloading =useSelector((state)=>state.profileReducer.isloading)
  const dispatch = useDispatch();
  const history=useHistory()
  const getProfile = () => dispatch(getcurrentprofile());
    
  useEffect(() =>{
        
    (getProfile())
     
  },[]);
 
  const deleteprofilee=()=>{
    dispatch(clearCurrentProfile(profile._id))
  }
     
    
     
  if (isloading) {
    return <div><Spinner animation="grow" /></div>
    }
 
  return (
    ( profile ===null )?(  
      <div>
           
           <div className="titleNAME">
      {user.firstName} {user.lastName} : {user.email}
      </div>
      <Link to="/profileform"><button className="btnp">create profile</button></Link>
               
                  </div>
      ):(
        
        <div className="profile bg-light">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvaRAZDRRnqtPneSqARlRNIhQDa_DTFj4GRg&usqp=CAU" alt="Fail to Load" className="round-img" />
        <div>
          <h2>PROFILENAME:{profile&&profile.profileName}</h2>
          <p>
         <span>CATEGORY: {profile&&profile.category}</span>
          </p>
          <p className="my-1">ADRESS:{ <span>{profile&&profile.adress}</span>}</p>
          <p className="my-1">DESCRIPTION:{ <span>{profile&&profile.description}</span>}</p>
          <p className="my-1">CODEPOSTAL:{ <span>{profile&&profile.codePostal}</span>}</p>
          <p className="my-1">PHONE-NUMBER:{ <span>{profile&&profile.phoneNumber}</span>}</p>
          <p className="my-1">DEPLOMA:{ <span>{profile&&profile.Diploma}</span>}</p>
          <Link to="/dashboard"><button type="submit" className="myButton" onClick={()=>deleteprofilee()}>Delete</button></Link >
          <Link to="/profileform"><button  className="myButton" onClick={()=> getprofilee(profile)}>Edit</button></Link>
        </div>

   
        </div> 
       
           
 
       
      )
 
  )
};
export default Dashboard;

   