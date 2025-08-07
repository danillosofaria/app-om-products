import "./NavBar.css"

function NavBar () {
    return(
    <div className="navbar">
        <div className="content-navbar container">
            <img src="src\assets\logo_OM_branco.svg" alt="logo_om" style={{'width':'98px', 'margin':'26px 0px'}}/>
            <ul className="navbar-text">
                <li>Cadastro produto</li>
                <li>login</li>
            </ul>
        </div>
    </div>
    );
}

export default NavBar