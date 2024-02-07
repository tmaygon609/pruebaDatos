import { Outlet, NavLink } from "react-router-dom";

function RutasAnidadas() {
    return ( 
        <div className="text-center my-5">

            <div className="d-flex flex-wrap justify-content-center">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"alicia"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Alicia</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"adrian"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Adrián</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"carmen"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Carmen</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"joseantonio"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">José Antonio</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"pablo"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Pablo</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"tibu"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Tibu</NavLink>
                </div>
            </div>

            <div className="mt-5">
                <Outlet/>
            </div>
        </div>
     );
}

export default RutasAnidadas;
