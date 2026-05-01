import { useState } from "react"
import "./components-style/Contents.css"
function Content(){
    const [photo , setPhoto] = useState(null)
    const [fullName , setFullname] = useState("")
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")

    const [location , setLocation] = useState("")

    const [skills , setSkills] = useState("")
    return(
        <section className="content-layout">
            
            <div className="form-resume">
                <form className="form-container">
                    <h2>Create Resume</h2>
                    
                    <p>เลือกรูปโปรไฟล์ของคุณ</p>
                    <input
                    className="btn-photo"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e)=>{
                        const file = e.target.files[0]
                        if(file){
                            setPhoto(URL.createObjectURL(file))
                        }
                    }}
                    />

                    <input type="text"
                    placeholder="Fullname"
                    value={fullName}
                    onChange={(e)=>setFullname(e.target.value)}
                    />

                    <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    />

                    <h4>Location</h4>
                    <input type="text"
                    placeholder="City"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                    />
                    

                    <h4>Skills</h4>
                    <input type="text"
                    placeholder="Skills"
                    value={skills}
                    onChange={(e)=>setSkills(e.target.value)}
                    />
                    

                </form>
            </div>
            <div className="preview">
                <div className="preview-container">
                    {photo && <img src={photo} alt="profile" />}
                    <h1>{fullName || "Your name"}</h1>
                    <p>{email || "email@gmail.com"}</p>
                    <p>{phone || "Number"}</p>

                    <h2>Location</h2>
                    <p>{location || "location"}</p>

                    <h2>Skills</h2>
                    <p>{skills || "skill"}</p>
                </div>
            </div>
        </section>
    )
}

export default Content