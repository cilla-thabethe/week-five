import axios from 'axios';
import React, { useState } from 'react'
import MiniModalLeft from './components/MiniModalLeft';
import MiniModalRight from './components/MiniModalRight';
import { useNavigate } from 'react-router-dom';
import Okay from '../src/assets/okay.svg';
import NotOkay from '../src/assets/notOkay.svg';

const Register = () => {

    const navigate = useNavigate();

    //user data
    const [inputs, setInputs] = useState({
        first: '',
        last: '',
        email: '',
        username: '',
        contact: '',
        password: '',
        passwordCon: '',
    });

    //error handling messages
    const[firstNameError, setFirstNameError] = useState();
    const[lastError, setLastError] = useState();
    const[emailError, setEmailError] = useState();
    const[usernameError, setUsernameError] = useState();
    const[contactError, setContactError] = useState();
    const[passwordError, setPasswordError] = useState();
    const[passwordConError, setPasswordConError] = useState();

    //check availability of email address and username
    const[emailAvail, setEmailAvail] = useState();
    const[userAvail, setUserAvail] = useState();

    //email and username icons determined by email & username availability
    const[emailIcon, setEmailIcon] = useState();
    const[userIcon, setUserIcon] = useState();
    
    //event: first name error message 
    const firstVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, first: value});
        if(inputs.first !== '') {
            setFirstNameError();
        }
    }

    //event: last name error message
    const lastVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, last: value});
        if(inputs.last !== '') {
            setLastError();
        }
    } 

    //email validation (checks the validity of the email address)
    const emailVal = (e) => {
        const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const value = e.target.value;
        setInputs({...inputs, email: value});
        if(inputs.email !== '') {
            setEmailError();
        }
        if(!value.match(mailRegex)){
            setEmailError(<MiniModalLeft message="Email is not in a valid format"/>)
        }
    } 

    //email authentication
    const emailAuth = () => {
        axios.post('http://localhost:8888/weekFiveAPI/authenticateEmail.php', inputs)
        .then((res) => {
            console.log(res);
            if(res.data === "Available"){
                setEmailIcon(Okay);
                setEmailAvail();
            } else if (res.data === "Not Available"){
                setEmailIcon(NotOkay);
                setEmailAvail(<MiniModalRight message="Email is not available"/>);
            } else if (res.data === ''){
                setEmailIcon();
                setEmailAvail();
                setEmailError();
            }
        });
    }

    //validates username
    //trim takes string and removes white spaces before and after entered value
    const usernameVal = (e) => {
        const value = e.target.value.trim();
        setInputs({...inputs, username: value});
        if(inputs.username !== '') {
            setUsernameError();
        }
    } 

    //authenticates user
    const usernameAuth = () => {
        axios.post('http://localhost:8888/weekFiveAPI/authenticateUser.php', inputs)
        .then((res) => {
            console.log(res);
            if(res.data === "Available"){
                setUserIcon(Okay);
                setUserAvail();
            } else if (res.data === "Not Available"){
                setUserIcon(NotOkay);
                setUserAvail(<MiniModalRight message="Username is not available"/>);
            } else if (res.data === ''){
                setUserIcon();
                setUserAvail();
                setUsernameError();
            }
        });
    }

    //event: contact validation
    const contactVal = (e) => {
        const contactRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        const value = e.target.value;
        setInputs({...inputs, contact: value});
        if(inputs.contact !== '') {
            setContactError();
        }
        if(!value.match(contactRegex)){
            setContactError(<MiniModalRight message="The phone number you have entered is invalid"/>);
        }
    }

    //event: password validation
    const passwordVal = (e) => {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
        const value = e.target.value;
        setInputs({...inputs, password: value});
        if(inputs.password !== '') {
            setPasswordError();
        }
        if(!value.match(passRegex)){
            setPasswordError(<MiniModalLeft message="Password is invalid."/>);
        }
    } 

    //event: matching password validation (on change)
    const passwordConVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, passwordCon: value});
        if (inputs.password === value) {
            setPasswordConError();
        } else {
            setPasswordConError(<MiniModalLeft message="Password does not match."/>);
        }
    } 

    //event: form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);

        if(inputs.first === ''){
            setFirstNameError(<MiniModalLeft message="what's your name?"/>)
        } else {
            setFirstNameError();
        }

        if(inputs.last === ''){
            setLastError(<MiniModalRight message="what's your last name?"/>)
        } else {
            setLastError();
        }

        if(inputs.email === ''){
            setEmailError(<MiniModalLeft message="you need to provide an email address, bro"/>)
        } else {
            setEmailError();
        }

        if(inputs.username === ''){
            setUsernameError(<MiniModalRight message="you need to provide a username, bro"/>)
        } else {
            setUsernameError();
        }

        if(inputs.contact === ''){
            setContactError(<MiniModalLeft message="you need to provide a contact number, bro"/>)
        } else {
            setContactError();
        }

        if(inputs.password === ''){
            setPasswordError(<MiniModalLeft message="you need to provide a password, bro"/>)
        } else {
            setPasswordError();
        }

        if(inputs.passwordCon === ''){
            setPasswordConError(<MiniModalLeft message="you need to confirm your password, bro"/>)
        } else {
            setPasswordConError();
        }

        //check for empty key value pairs
        let result = Object.values(inputs).some(O => O === '');

        if (result) {
            console.log("there is an error")
        } else {
            axios.post('https://localhost:8888/weekFiveAPI/addUser.php', inputs)
            .then(function(res) {
                console.log(res);

                if (res.status === 200){
                    navigate("/login");
                }
            })
        }
    }

    return (
        <div>


            <form>
                <h1>Sign Up to FakeBook</h1>
                <p>Give us all that sweet sweet data!</p>

                <div className='names'>
                    {firstNameError}
                    <input name="first" className='left' type="text" placeholder='First Name' onChange={firstVal} />
                    {lastError}
                    <input name='last' type="text" placeholder='Last Name' onChange={lastVal}/>
                </div>      

                <div className='statusIcon'>
                    <img src={emailIcon}/>
                </div>

                {emailError}
                {emailAvail}
                <input name="email" type="email" placeholder='Your Email' onBlur={emailAuth} onChange={emailVal}/>
                
                <div className='userCon'>
                    {usernameError}
                    {userAvail}
                    <div className='statusIconUser'>
                        <img src={userIcon}/>
                    </div>
                    <input name="username" className='left' type="username" placeholder='Select A Username' onBlur={usernameAuth} onChange={usernameVal}/>
                    {contactError}
                    <input name="contact" type="contact" placeholder='Contact Number' onChange={contactVal}/>
                </div>


                <div className='passCon'>
                    {passwordError}
                    <input name="password" type="password" placeholder='Choose A Password' onChange={passwordVal}/>
                    {passwordConError}
                    <input name="conPass" type="password" placeholder='Confirm Password' onChange={passwordConVal}/>
                </div>

                <button type="submit" onClick={handleSubmit}>Take My Data Lizard Man!</button>
            </form>
                
        </div>
  )
}

export default Register
