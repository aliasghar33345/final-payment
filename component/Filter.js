
import Link from "next/link";
import TopContent from "/component/TopContent.js";

export default function Filetr() {



  return (
    <>
      <section className="container">

        <TopContent />

        <div className="conatiner">
            <div className="heading-container">
                <h2> O que você gostaria de fazer? </h2>
            </div>

            <div className="row buttons__row ">
                <div className="col-12 col-md-6 col-buttons">
                    <Link href="/deposito">
                        <a className="btn btn-secondary">
                            Deposito
                        </a>
                    </Link>
                </div>
                <div className="col-12 col-md-6 col-buttons">
                    <Link href="/saque">
                        <a className="btn btn-primary">
                            Saque
                        </a>
                    </Link>
                </div>
            </div>
        </div>
        
      </section>
    </>
  );
};
