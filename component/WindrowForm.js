import React, { useState } from "react";
import { useRouter } from "next/router";

export default function WindrowRequest() {
  const [value, setValue] = useState("BRL");
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [pix, setPix] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const handleSubmit = (e) => { 
    e.preventDefault()
    console.log('Sending')
  let data = {
      name,
      email,
      amount,
      value,
      pix
    }

  fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received',  res)
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setAmount('')
        setValue('')
        setPix('')
      }
    })
  }

  return (
    <>
      <section className="form">
        
      <div className="form__container">
            <p className="heading-method">
                 Pedido de saque
            </p>
          <form className="main" >
              <div className="inputGroup" >
                < label htmlFor='name'>Username</label>
                < input type='text' name='name' className="inputField" onChange={(e)=>{setName(e.target.value)}} />  
              </div>

            <div className="row form__row">
              
              <div className="inputGroup col-md-8" >
                < label htmlFor='amount'>Quantia</label>
                < input type='number' name='amount' className="inputField" onChange={(e)=>{setAmount(e.target.value)}}  />  
              </div>

              <div className="inputGroup col-md-4" >
              <select value={value} onChange={(e) => { setValue(e.target.value); }}>
                <option value="BRL">BRL R$</option>
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
              </select> 

            </div>
            </div>
            
           
              <div className="inputGroup" >
                < label htmlFor='email'>Email</label>
                < input type='email' name='email' className="inputField"  onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="inputGroup" >
                < label htmlFor='pix'>PIX</label>
                < input type='number' name='pix' className="inputField" onChange={(e)=>{setPix(e.target.value)}} />  
              </div>
            
            
            
            < input type='submit' value="Solicitar" className="btn btn-primary btn--small" onClick={(e)=>{handleSubmit(e)}}/>
          </form >
        </div>
      </section>
    </>
  );
};
