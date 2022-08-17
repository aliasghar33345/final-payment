import FloatingPer from "../component/FloatingPer";
import {
    WhitePolygon,
    GreenPolygon,
    GreyPolygon,
  } from "../styles/icons";
export default function Decor() {
    return (
        <>
            <FloatingPer
            polygonClass="polygonClass1"
            value="1.346"
            Icon={<WhitePolygon />}
            />
            <FloatingPer
            polygonClass="polygonClass2"
            value="2.346"
            Icon={<GreyPolygon />}
            />
            <FloatingPer
            polygonClass="polygonClass3"
            value="0.846"
            Icon={<GreenPolygon />}
            />
            <FloatingPer
            polygonClass="polygonClass4"
            value="0.456"
            Icon={<WhitePolygon />}
            />

            <FloatingPer
            polygonClass="polygonClass5"
            value="1.879"
            Icon={<WhitePolygon />}
            />
            <FloatingPer
            polygonClass="polygonClass6"
            value="3.346"
            Icon={<GreenPolygon />}
            />
            <FloatingPer
            polygonClass="polygonClass7"
            value="0.898"
            Icon={<WhitePolygon />}
            />
            <FloatingPer
            polygonClass="polygonClass8"
            value="1.346"
            Icon={<GreyPolygon />}
            />
        </>
    )
}