import React, { useState } from "react";
import Head from 'next/head'
import Payment from './payment'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={''}>
      <Head>
        <title>Bets</title>
      </Head>
      <Payment  setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  )
}
