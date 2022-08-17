
import {
    Telegram,
    YouTube,
    Instagram,
    Twitter,
    FaceBook,
} from "../styles/icons";
import Image from "next/image";
import Link from "next/link";


export default function Footer() {



    return (
        <div className="mobile-view">
            <Link href="mailto:suporte@bets.com.br">
                <a className="footer__mail">
                    suporte@bets.com.br
                </a>
            </Link>

                <div className="social-icon">
                <FaceBook />
                <Twitter />
                <Instagram />
                <YouTube />
                <Telegram />
                </div>
                <div className="relative-logo">
                <div className="footer__logo">
                    <Image
                            src="/img/logo1.png"
                            alt="Bets Logo "
                            layout='fill'
                        />
                </div>
            </div>
        </div>
    )
}
