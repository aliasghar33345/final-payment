import React, { useEffect, useState } from 'react'
import { Button, Input, notification, Form, Spin } from 'antd';
import PayScanner from './PayScanner';
import CpfNumber from './CpfNumber';
import { Telegram, YouTube, Instagram, Twitter, FaceBook, WhitePolygon, GreenPolygon, GreyPolygon } from '../styles/icons';
import FloatingPer from './FloatingPer';
import { getQrCodeScanner, invoiceGenerator } from '../Api/CommonApi';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const PixPayment = (props) => {

  const { query: { payment, motive } = {} } = useRouter()

  useEffect(() => {
    if (payment == "success") {
      toast.success("Payment Transferred Successfully");
    }

    else if (motive) {
      toast.error(motive);
    }

    if (motive || payment)
      setTimeout(() => {
        window.location.replace(window.location.origin);
      }, 3000);
  }, [motive, payment]);

  const { isOpen, setIsOpen } = props || {}
  const user = {}

  const [clickValue, setClickValue] = useState({ btnVal: '', inputVal: '', showError: '', cpfNo: '', username: '', selectfield: 'CPF/CNPF' })
  const [QrCode, setQrCode] = useState({})
  const [invoice, setInvoice] = useState('')
  const [cpfModal, setCpfModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgLoading, setImgLoading] = useState(true)
  const [errorText, setErrorText] = useState('')

  const amtData = [{ value: 50 }, { value: 250 }, { value: 500 }]

  //PAy4fun Integration

  const Pay4fun = async () => {
    if (!clickValue.inputVal) {
      return toast.error("Please select the amount")
    }
    const { data } = await axios.post('/api/pay4fun', {
      "amount": clickValue.inputVal,
    })
    const { url } = data;
    url && window.open(url)
  }

  const pay4funGo = async () => {
    try {
      if (!parseInt(clickValue.inputVal) || parseInt(clickValue.inputVal) < 10) {
        return toast.error("Selecione ou insira o valor igual ou superior a 10")
      }
      const { data } = await axios.post('/api/pay4funGo', {
        "amount": clickValue.inputVal,
      })
      const { url } = data;
      url && window.open(url)
    } catch (e) {
      console.log(e?.data?.message)
    }
  }

  const handleClick = async () => {
    if (clickValue?.username === '') {
      return false
    } else if (clickValue.btnVal === '' && clickValue.inputVal === '') {
      setClickValue({ ...clickValue, showError: 'Por favor, insira o valor' })
    } else {
      // setLoading(true)
      // const res = await invoiceGenerator('get', '')
      // if (res) {
        // setLoading(false)
        // setInvoice(res?.data?.invoiceNumber)
      // }
      setInvoice(1)
      setCpfModal(true)
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const getQRCde = async () => {
    if (clickValue?.selectfield == 'Email') {
      if (validateEmail(clickValue?.cpfNo) == null) {
        setClickValue({ ...clickValue, showError: 'Please enter valid email' })
        return
      }
    }
    const imvoiceCode = clickValue?.username + invoice
    let dataToSend = {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      invoice: imvoiceCode,
      amount: clickValue?.inputVal,
      description: `Payment Invoice #${imvoiceCode}`,
      customer_name: "mark robert ross neal",
      document: clickValue?.cpfNo,
      phone: "5541999792071",
      email: "suporte@bets.com.br"
    }
    let data = {
       value : clickValue?.inputVal
    }
    // if (clickValue?.selectfield == 'CPF/CNPF') {

    //     dataToSend.phone= "5541999792071"
    //     dataToSend.email= "suporte@bets.com.br"
    // } else if(clickValue?.selectfield == 'Email'){
    //     dataToSend.email = clickValue?.cpfNo
    //     dataToSend.document = '01025091906'
    //     dataToSend.phone= "5541999792071"
    // }else{
    //     dataToSend.phone = clickValue?.cpfNo
    //     dataToSend.email = 'suporte@bets.com.br'
    //     dataToSend.document = '01025091906'
    // }

    setLoading(true)
    console.log(dataToSend)
    const res = await getQrCodeScanner(data)
    console.log(res)
    setQrCode(res.data)
    if (res.status === 200) {
      setCpfModal(false)
      // document.getElementById("myForm").reset();
      // invoiceGenerator('post', '')
      setLoading(false)
      setIsOpen(true)
      // setImgLoading(true)
    } else {
      setLoading(false)
      setCpfModal(false)
    }
  }

  const openAlert = () => {
    if (QrCode?.data?.Status === '500') {
      document.getElementById("myForm").reset()
      setLoading(false)
      setQrCode({})
      return notification.error({
        message: "Error",
        description: QrCode?.data?.Message
      });
    }
  }

  const onSubmitClick = () => {
    if (clickValue.cpfNo === '' || clickValue.cpfNo.length < 11) {
      setErrorText('CPF should be 11 numbers long')
      return
    }
    else {
      setErrorText('')
      getQRCde()
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <section className='container'>
        <FloatingPer polygonClass='polygonClass1' value='1.346' Icon={<WhitePolygon />} />
        <FloatingPer polygonClass='polygonClass2' value='2.346' Icon={<GreyPolygon />} />
        <FloatingPer polygonClass='polygonClass3' value='0.846' Icon={<GreenPolygon />} />
        <FloatingPer polygonClass='polygonClass4' value='0.456' Icon={<WhitePolygon />} />

        <FloatingPer polygonClass='polygonClass5' value='1.879' Icon={<WhitePolygon />} />
        <FloatingPer polygonClass='polygonClass6' value='3.346' Icon={<GreenPolygon />} />
        <FloatingPer polygonClass='polygonClass7' value='0.898' Icon={<WhitePolygon />} />
        <FloatingPer polygonClass='polygonClass8' value='1.346' Icon={<GreyPolygon />} />
        <div className='pix-logo'>
          <img
            src='/img/logo.svg'
            alt="bets-logo"
          />
        </div>
        <div className='heading-container'>
          <h1 >Bem-vindo à Melhor Plataforma de<br /> Apostas Esportivas do Brasil</h1>
          <p>+1.000 de assinaturas por dia</p>
        </div>
        <div className='custom-modal'>
          <Form id="myForm"  >
            <div className='form-class'>
              <p className='heading-method'>Depositar dinheiro em <br />sua conta</p>
              <div className={`user-input ${!user ? 'payer' : 'payer-login'}`}>
                <div className='unlogin-user'>
                  <p>Digite seu nome de usuário aqui:</p>
                  <Form.Item
                    name="username"
                    className='amount-between'
                    rules={[
                      {
                        required: true,
                        message: "Por favor, digite o nome de usuário"
                      }
                    ]}
                  >
                    <Input disabled={loading} value={clickValue?.username} type='text' onChange={(e) => setClickValue({ ...clickValue, username: e?.target?.value, showError: '' })} className='input-amount' />
                  </Form.Item>
                </div>
              </div>

              <div className="val-deposit" >
                <p className='amount-between'>Valor do Depósito (R$50 - R$9.900):</p>
                <div className='rs-button-div'>
                  {(amtData || []).map((amt, key) => {
                    return (
                      <Button key={key} onClick={(e) => setClickValue({ ...clickValue, btnVal: amt?.value, inputVal: amt?.value, showError: '' })} className={clickValue?.btnVal === amt?.value ? 'click-rs-button' : 'rs-button'}>
                        R${amt?.value}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <p className='error-class'>{clickValue.showError}</p>
              <p className='heading-to'>ou</p>
              <Form.Item name="inputVal">
                <Input disabled={loading} value={clickValue.inputVal}
                  type='number'
                  min={1}
                  onWheel={event => event.target.blur()}
                  onKeyPress={(e) => {
                    if (e.code === 'Minus') {
                      e.preventDefault();
                    }
                  }}
                  pattern="\d*"
                  onChange={(e) => {
                    setClickValue({ ...clickValue, btnVal: '', inputVal: e?.target?.value, showError: '' })
                  }}
                  className='input-amount'
                  prefix='R$' />
                <p className='error-class'>{clickValue.showError}</p>
              </Form.Item>
            </div>
            <div className='input-amount-button'>
              <Button htmlType="submit"
                onClick={() => handleClick()}
                // onClick={() =>
                //   window.open('https://openpix.com.br/pay/f809b52e-1085-40eb-ab8a-e65945e23cb6', '_blank')}
                size='large'><img src='/img/logo-pix.png' alt="pix-logo" /></Button>
              <Button htmlType="submit" onClick={() =>
                window.open('https://commerce.coinbase.com/checkout/b19b1646-9e50-479f-ac67-2a0a170efb10', '_blank')} size='large'><img src='/img/coinbase-litecoin.png' alt="coinbase-logo" /></Button>



            </div>
            <div className='input-amount-button'>

              {/* Pay4fun */}
              <Button htmlType="submit" onClick={() => Pay4fun()} size='large'>
                <img src='/img/pay4fun.png' alt="pix-logo" id='pay4funImg' />
              </Button>
              {/* Go Pay4fun */}
              <Button htmlType="submit" onClick={() => pay4funGo()} size='large'><img src='/img/pay4funGo.png' alt="pix-logo" id='pay4funImg' /></Button>
            </div>
          </Form>
        </div>
        <div className='mobile-view'>
          <p>suporte@bets.com.br</p>
          <div className='social-icon'>
            <FaceBook />
            <Twitter />
            <Instagram />
            <YouTube />
            <Telegram />
          </div>
          <div className='relative-logo'>
            <div>
              <img
                src='/img/logo1.png'
                alt=''
              />
            </div>
          </div>
        </div>
        {openAlert()}
        {QrCode && QrCode.brCode && isOpen &&
          <PayScanner
            invoice={invoice}
            imgLoading={false}
            setImgLoading={setImgLoading}
            setClickValue={setClickValue}
            isOpen={isOpen} setIsOpen={setIsOpen} user={user} QrCode={QrCode} clickValue={clickValue} />}
        {cpfModal &&
          <CpfNumber
            errorText={errorText}
            setErrorText={setErrorText}
            payAmount={() => onSubmitClick()}
            clickValue={clickValue}
            setClickValue={setClickValue}
            setCpfModal={setCpfModal}
            cpfModal={cpfModal}
            loading={loading}
            setLoading={setLoading}
            invoice={invoice}
          />
        }
        {loading && (
          <div className="spinner-class">
            <Spin />
          </div>
        )}
      </section>
    </>
  )
}
export default PixPayment;