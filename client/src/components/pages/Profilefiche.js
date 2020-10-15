import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getprofilebyid} from "../../js/action/profileactions"
import {getrate,addrate} from "../../js/action/rateAction"
import StarRatingComponent from 'react-star-rating-component';

import {Spinner} from "react-bootstrap"
const Profilefiche = (props) => {
  
  const rates=useSelector(state=>state.rateReducer.rates)
  const user=useSelector(state=>state.authReducer.user)
  const rate=rates.filter(e=>e.profile==props.match.params.id)

  const dispatch=useDispatch()
  
  const [rating,setRating]=useState("")

  let counter=0;
  for (let i = 0; i < rate.length; i++) {
    if (user && user._id == rate[i].user){
    counter = counter+1
    } 
  }
  const addratee = (e) => {
    e.preventDefault();
    // dispatch actions
    if (counter == 0){
    dispatch(
      addrate(props.match.params.id, {
     
        rating: rating
       
      })
    
    );
  }else {alert("you have already do a rating")}
    setRating("")
  };
  
  useEffect(()=>{
    dispatch(getrate())
},[])


    const getprofilefiche=()=>{
        dispatch(getprofilebyid (props.match.params.id))       
    }

  useEffect(() => {
    getprofilefiche()}, []);

    const profile= useSelector(state => state.profileReducer.profile)
    const isloading= useSelector(state => state.profileReducer.isloading)

    let count =0 ;
    let sum =0;
    let moy=0;
      for (let i = 0; i < rate.length; i++) {
        count=count+1
        sum=sum+rate[i].rating
      }
    
     moy=sum/count
    
  // if the component still loading
  if (isloading) {
    return (
      <div><Spinner animation="grow" /></div>
    );
   
    //if there is no profile in the response
  } else if (!profile) {
    return <h1>Oups !!!! 404 Not Fount :( </h1>;
  }
  // if evrything is OK show the component
  else
    return (
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
        


        <span> <StarRatingComponent name ="t" value={moy}  
        /> </span>

 <select className ="select-css"
                name="rating"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">   select rating  </option>
                <option value="1">1- Poor</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very Good</option>
                <option value="5">5- Excelent</option>
                </select>
                
                <button className="btn btn-secondary" onClick={addratee}>add</button>
         </div>
 
      </div>
      );
      };
   

export default Profilefiche;
