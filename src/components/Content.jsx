import "./components-style/Contents.css"
function Content(){
    return(
        <section className="content-layout">
            
            <div className="form-resume">
                <form className="form-container">
                    <h2>Create Resume</h2>
                    <input type="text" />
                    <input type="email" name="" id="" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </form>
            </div>
            <div className="preview">
                <div className="preview-container"></div>
            </div>
        </section>
    )
}

export default Content