import { Modal, Input, Form, Spin ,Button} from 'antd';
import React,{useState} from 'react'
import { CloseOutlined } from '@ant-design/icons';

const CpfNumber = (props) => {
    const textField = [{ value: 'CPF/CNPF',id:'cpf' }, { value: 'Email',id:'email'  }, { value: 'Celular',id:'phNo'  }]
    const { clickValue, setClickValue, payAmount, setCpfModal, cpfModal, loading, setLoading, invoice,errorText, setErrorText } = props || {}

    const handleCancel = () => {
        setCpfModal(false);
        setLoading(false)
    };

    const retrunErrorText = (value) =>{
        let val = value ? value : clickValue?.selectfield
        if(clickValue?.cpfNo == ''){
            if(val == 'Email'){
                setErrorText('Por favor, insira o número do Email')
            }else if(val == 'CPF/CNPF'){
                 setErrorText('Por favor, insira o número do CPF/CNPF')
            }else if(val == 'Celular'){
                  setErrorText('Por favor, insira o número do Celular')
            }
        }
    }
    
    return (
        <>
            <Modal maskClosable={false} className='custom-modal' closable={false} footer={null} visible={cpfModal} onCancel={handleCancel}>
                <div className='close-button' onClick={() => { setCpfModal(false); setClickValue({ ...clickValue, selectfield: 'CPF/CNPF',}) }}>
                    <CloseOutlined  />
                </div>
                <div className='pix-logo'>
                    <img src='/img/footer_logo.png' alt="bets-logo"
                        height='95px'
                    />
                </div>
                <p className='heading-method'>Digite Seu CPF</p>
                <p className='payment-invoice'>{`Descrição: Pagamento# ${clickValue?.username}-${invoice}`}<br />{`Valor: R$ ${clickValue?.btnVal || clickValue?.inputVal}`}</p>
                <Form className='form-class'>
                {/* <p className='amount-between'>Selecione sua chave Pix </p> */}
                {/* <div className='rs-button-div select-field'>
                {(textField || []).map((btn, key) => {
                    return (
                        <Button key={key}
                         onClick={(e) =>{
                            setErrorText('')
                            setClickValue({ ...clickValue, selectfield: btn?.value, showError: '',cpfNo:'' })}}
                            className={clickValue?.selectfield === btn?.value ? 'click-rs-button' : 'rs-button'}>
                            {btn?.value}
                        </Button>
                    )
                })}
                </div> */}
                    <p className='amount-between'>Qual é o seu CPF?</p>
                    <Form.Item
                        name="cpfNumber"
                        className='amount-between'
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: `${errorText}`
                        //     }
                        // ]}
                    >
                        <Input
                            type={'number'}
                            // inputMode={'numeric'}
                            onWheel={event => event.target.blur()}
                            onKeyPress={(e) => {
                                if (e.code === 'Minus') {
                                    e.preventDefault();
                                }
                            }}
                            disabled={loading}
                            // pattern={clickValue?.selectfield === 'Email' ? '' : "\d*"}
                            value={clickValue?.cpfNo || " "}
                            onChange={(e) => { setClickValue({ ...clickValue, cpfNo: e?.target?.value,showError:'' }) }}
                            className='input-amount'
                            prefix=' ' />
                    </Form.Item>
                    <p className='error-class'>{clickValue.showError || errorText }</p>
                    <div className="submit-button">
                        <button onClick={() => {
                            payAmount();
                            retrunErrorText();
                            }} >Pagar</button>
                    </div>
                </Form>
                {loading && <div className='spinner-class'><Spin /></div>}
            </Modal>

        </>
    )
}

export default CpfNumber;