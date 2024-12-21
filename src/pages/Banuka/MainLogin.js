import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import '../MainLogin.css';  // Import the new CSS file

export default function MainLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(showLoading());
    console.log("Received values of form", values);

    try {
      const response = await axios.post('/api/user/Main_login', values);
      console.log("log------------------",response)

      if (response.data.success) {

        localStorage.setItem("token", response.data.data);
        localStorage.setItem('userEmail',response.data.email);
        localStorage.setItem('UserName',response.data.name);
        toast.success(response.data.message);
        toast("Redirecting...");

        console.log("email---------",response.data.email)

        
        if(response.data.email == 'Fdo@gmail.com'){
          //Bhanuka

          navigate("/centralized-discount");
        }else if(response.data.email == 'Geshika@gmail.com'){
          //Geshika
          navigate("/Geshika/Stores");
        }else if(response.data.email == 'Dushan@gmail.com'){
          //Dushan
          navigate("/Dushan/StoreProfile");
        }else if(response.data.store){
          navigate("/Dushan/StoreProfile");
        }
        
        else{
        navigate("/Banuka/Home");
        }
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      dispatch(hideLoading());
    }
  };

  const logInNavigate = async(val) =>{

    navigate('/Register');
  }

  return (
    <div className='main'>
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src='logos.png' className='logo' alt='Logo' />
        </div>
        <div className="login-form-container">
          <Form layout='vertical' onFinish={onFinish} className="login-form">
            <Form.Item label='Username' name='username_log'>
              <Input placeholder='Enter your username' />
            </Form.Item>

            <Form.Item label='Password' name='password_log'>
              <Input.Password placeholder='Enter your password' />
            </Form.Item>

            <Button type="primary" htmlType='submit' className="login-button">
              LOG IN
            </Button>
            <Button className='login-button' onClick={()=>logInNavigate()}>Register</Button>
          </Form>
        </div>
      </div>
    </div>
    </div>
  );
}
