import React from 'react'
import { Modal } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
import { GreenTick } from '../styles/icons';

const SuccessToast = (props) => {
  const { clickValue,setClickValue,setToast, toast ,successPay} = props || {}
  
  const handleCancel = () => {
    setToast(false);
  };

  return (
    <Modal maskClosable={false} width='390px' className='custom-modal' closable={false} footer={null} visible={toast} onCancel={handleCancel}>
      <div className='close-button' onClick={() => { 
        setToast(false);
        setToast(false);
        setClickValue({...clickValue, btnVal: '', inputVal: '', showError: '', cpfNo: '', username: '' })}}>
        <CloseOutlined />
      </div>
        <div className='pix-logo'>
            <img
                src='/img/footer_logo.png'
                alt="bets-logo"
            />
        </div>
        <p className='success-msg'>Seu depósito foi bem <br /> sucedido..</p>
            <div className='pix-logo-green'>
            <GreenTick />
            </div>
           
            <p className='thanks-msg'>Obrigado</p>
           <div className="user_main">
            <div className="user_child1">
            <p>UserName  </p>
            <p>Invoice  </p>
            <p>Amount  </p>
            <p>Date  </p>
            </div>
            <div className="user_child2">
            <p>: &nbsp; {clickValue?.username}</p>
            <p>: &nbsp; {successPay?.correlationID}</p>
            <p>: &nbsp; {successPay?.value}</p>
            <p>: &nbsp; {successPay?.createdAt.split('T')[0]}</p>
            </div>
            </div>
    </Modal>
  )
}

export default SuccessToast