import React, { useState } from "react";
import Head from 'next/head';
import Payment from './payment';
import Decor from "../component/Decor";
import Footer from '../component/Footer';

export default function Deposito() {
  const [isOpen, setIsOpen] = useState(false);
  return (


      <>
      <Head>
        <title>Bets</title>
      </Head>

          <div className={''}>
            <div className="container-inner">
              <Decor />
              <Payment  setIsOpen={setIsOpen} isOpen={isOpen} />
              <Footer />
            </div>
          </div>
      </>
    
  )
}