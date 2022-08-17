import React, { useState } from "react";
import Head from 'next/head'
import WindrowForm from '../component/WindrowForm';
import TopContent from "/component/TopContent.js";
import Decor from "../component/Decor";
import Footer from '../component/Footer';

export default function Deposito() {
  return (
    
      <>
      <Head>
        <title>Bets</title>
      </Head>

        <div className={''}>
            <div className="container-inner">
              <Decor />
              <TopContent />
              <WindrowForm />
              <Footer />
            </div>

        </div>
      </>
    
  )
}