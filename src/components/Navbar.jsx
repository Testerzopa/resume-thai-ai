import "./components-style/Navbar.css"

function Navbar(){
    return(
        <>
        <nav>
            <div className="navbar-container">
                
                    <div className="navbar-logo">
                        <h1 className="navbar-logo-header">ResumeAI</h1>
                    </div>
                    <div className="navbar-form">
                        <button className="btn-signin">SignIn</button>
                        <button className="btn-login">Login</button>
                    </div>
                
            </div>
        </nav>
        </>
    )
}

export default Navbar