import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Tooltip, Spin } from "antd";
import { CopyOutlined, CloseOutlined } from "@ant-design/icons";
import ShowTimer from "./ShowTimer";
import SuccessToast from "./SuccessToast";
import { paymentStatus, payPaymentApi, updateStatusInDB } from "../Api/CommonApi";
import QRCode from 'qrcode.react';

const PayScanner = (props) => {
  const {
    isOpen,
    setIsOpen,
    QrCode,
    user,
    clickValue,
    invoice,
    imgLoading,
    setImgLoading,
    setClickValue,
  } = props || {};
  const { data } = QrCode || {};
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);
  const [successPay, setSuccessPay] = useState({});
  const [counter, setCounter] = React.useState(600);


  const counterImg = useRef(0);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const imageLoaded = () => {
    counterImg.current += 1;
    if (counterImg.current >= 1) {
      setImgLoading(false);
    }
  };

  const copyCode = () => {
    var text = document.getElementById("text").innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const checkPaymentStatus = async () => {
    let headers = {
      Authorization: process.env.NEXT_PUBLIC_APP_ID,
    };
    console.log(data, QrCode)
    const res = await paymentStatus(headers, QrCode.charge.correlationID)
    console.log(res)
    if (res.data.charge.status !== "ACTIVE") {
      setSuccessPay(res.data.charge);
      // const response = await payPaymentApi(res?.data);
      // if (response) {
      // setIsOpen(false);
      // }
      updateStatusInDB(res.data.charge.correlationID, res.data.charge.status)
      setToast(true);
      setIsOpen(false);
    }
  };
  useEffect(() => {
    let timer;
    console.log(123123)
    if (successPay.status === "EXPIRED" || successPay.status === "COMPLETED") {
      return;
      // return () => clearInterval(timer)
    } else {
      timer = setInterval(() => checkPaymentStatus(), 5000);
    }
    return () => {

      clearInterval(timer)
    };
  }, [successPay]);



  return (
    <>
      <Modal
        maskClosable={false}
        width="390px"
        className="custom-modal"
        closable={false}
        footer={null}
        visible={isOpen}
        onCancel={handleCancel}
      >
        <div
          className="close-button"
          onClick={() => {
            setIsOpen(false);
            setCounter(0);
            setClickValue({
              ...clickValue,
              btnVal: "",
              inputVal: "",
              showError: "",
              cpfNo: "",
              username: "",
            });
          }}
        >
          <CloseOutlined />
        </div>
        <div className="footer-logo">
          <img src="/img/footer_logo.png" alt="footer_log" />
        </div>
        <p className="heading-method">Faça seu Pagamento</p>
        <p className="pay-description">
          Descrição:Pagamento#{" "}
          {`${user?.name || clickValue?.username}(${invoice})`} <br /> Valor: R$
          {QrCode.charge.value}
          {/* {console.log(QrCode.charge.value)} */}
        </p>
        <p className="common-text" style={{ textAlign: 'center' }}>
          Olá {user?.name || clickValue?.username}!
        </p>
        <p className="com-page">Pague com PIX</p>
        <div className="pix-scan-logo">
          <img src="/img/logo-pix.png" alt="pix-logo" />
        </div>
        {/* <div className="footer-logo">
          <img src={data?.QRCODE} alt="scanner" onLoad={imageLoaded} />
        </div> */}
        <div className="footer-logo">
          <QRCode
            size={200}
            renderAs={'svg'}
            value={QrCode?.brCode}
            includeMargin={true}
          />
        </div>
        <div className="qr-text">
          <p className="common-text pix-page face-leitura">
            Faça leitura do QRCODE acima com app de seu banco, ou copie e cole o
            código abaixo para efetuar o pagamento.
          </p>
          <p className="common-text ATENCAO">
            ATENÇÃO! NÃO USE A OPÇÃO TRANSFERÊNCIA PARA EFETUAR O PAGAMENTO, A
            CONTA DE PAGAMENTO DEVE SER DE SUA TITULARIDADE
          </p>
          <Button
            className="custom-coupan-button"
            size="large"
            onClick={() => {
              copyCode();
            }}
          >
            <p id="text" className="button-code">
              {QrCode?.brCode}
            </p>
            <Tooltip placement="topRight" title={copied ? "Copiado" : "Copy"}>
              <CopyOutlined className="icon-copy" />
            </Tooltip>
          </Button>
          {
            console.log(counter)
          }
          <ShowTimer setIsOpen={setIsOpen} counter={counter} setCounter={setCounter} />
        </div>
        {imgLoading && (
          <div className="spinner-class">
            <Spin />
          </div>
        )}
      </Modal>
      {toast && (
        <SuccessToast
          successPay={successPay}
          setToast={setToast}
          toast={toast}
          setClickValue={setClickValue}
          clickValue={clickValue}
        />
      )}
    </>
  );
};

export default PayScanner;
