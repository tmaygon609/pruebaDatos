import { Link, Outlet } from "react-router-dom";

function RutasAnidadas() {
    return ( 
        <div>
            <ul style={{display: "flex"}}>
                <li><Link to={"alicia"}>Alicia</Link></li>
                <li><Link to={"adrian"}>Adrián</Link></li>
                <li><Link to={"carmen"}>Carmen</Link></li>
                <li><Link to={"joseantonio"}>José Antonio</Link></li>
                <li><Link to={"pablo"}>Pablo</Link></li>
                <li><Link to={"tibu"}>Tibu</Link></li>
            </ul>
            <Outlet/>
        </div>
     );
}

export default RutasAnidadas;