import Image from "next/image";
import Link from "next/link";

export default function TopContent() {
    return (
        <>
            <div className="logo">
            
                <Link href="/">
                    <a>
                        <Image
                            src="/img/logo.svg"
                            alt="Bets Logo"
                            layout='fill'
                        />
                    </a>
                </Link>
            </div>
            <div className="heading-container">
            <h1>
                Bem-vindo à Melhor Plataforma de
                <br /> Apostas Esportivas do Brasil
            </h1>
            <p>+1.000 de assinaturas por dia</p>
            </div>
        </>
    )
}