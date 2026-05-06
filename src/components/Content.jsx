import { useState } from "react"
import { useRef } from "react" 
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import "./components-style/Contents.css"
function Content(){
    const [photo , setPhoto] = useState(null)
    const [aboutMe , setAboutMe] = useState("")
    const [fullName , setFullname] = useState("")
    const [skills , setSkills] = useState([""])
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")

    const [location, setLocation] = useState({
    city: "",
    country: ""
})

    const [education , setEducation] = useState([""])

    const [experiences, setExperiences] = useState([
        { company: "", position: "", duration: "" }
    ])

    const resumeRef = useRef()

    const handleResumeref = async(e) => {
        e.preventDefault()
        const element = resumeRef.current //เชื่อมไปหา ref ที่ต้องการ
        const canvas = await html2canvas(element,{scale: 2}) //แปลง html to canvas
        const data = canvas.toDataURL('image/png') //canvas to img
        const pdf = new jsPDF();

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const imgProps = pdf.getImageProperties(data)
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('resume.pdf')
    }

    

    const addExperience = () => {
    setExperiences([...experiences, { company: "", position: "", duration: "" }])
}

    const addEducation = () => {
        setEducation([...education,""])
    }

    const addSkills = () => {
        setSkills([...skills,""])
    }

    const addLocation = () => {
        setLocation([...location,{ city: "", country: "" }])
    }

    // ฟังก์ชันลบช่อง Input (ตาม index)
    const removeExperience = (index) => {
        const newExperiences = experiences.filter((_, i) => i !== index)
        setExperiences(newExperiences)
    }

    // ฟังก์ชันอัปเดตค่าเมื่อพิมพ์ในช่อง Input
    const handleExperienceChange = (index, field, value) => {
        const newExperiences = [...experiences]
        newExperiences[index][field] = value
        setExperiences(newExperiences)
    }

    const handleEducationChange = (index, value) => {
        const newEducation = [...education]
        newEducation[index] = value
        setEducation(newEducation)
    }

    const handleSkillsChange = (index, value) => {
        const newSkills = [...skills]
        newSkills[index] = value
        setSkills(newSkills)
    }

    const handleLocationChange = (field, value) => {
    setLocation(prev => ({
        ...prev,
        [field]: value
    }))
}

    return(
        <section className="content-layout">
            <div className="form-resume">
                <form className="form-container">

                    <h2>Create Resume</h2>
                    
                    <p>เลือกรูปโปรไฟล์ของคุณ</p>
                    <input
                    id="upload-photo"
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

                    <label htmlFor="upload-photo"
                    className="custom-file-upload">📁อัปโหลดรูปภาพ
                    </label>

                    <input type="text"
                    placeholder="Fullname"
                    value={fullName}
                    onChange={(e)=>setFullname(e.target.value)}
                    />

                    <input type="text" 
                    placeholder="About Me"
                    value={aboutMe}
                    onChange={(e)=>setAboutMe(e.target.value)}
                    />

                    <h4>Location</h4>
                        <input
                            type="text"
                            placeholder="City"
                            value={location.city}
                            onChange={(e)=>handleLocationChange("city", e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Country"
                            value={location.country}
                            onChange={(e)=>handleLocationChange("country", e.target.value)}
                        />
                        

                    <h4>Skills</h4>
                        {skills.map((skill,index)=>(
                            <div key={index}>
                                <input type="text" 
                                placeholder="Skills"
                                value={skill}
                                onChange={(e)=>handleSkillsChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addSkills} className="btn-add-more">
                            ➕ เพิ่มความสามารถพิเศษ
                        </button>
                    

                    <h4>Education</h4>
                        {education.map((edu,index)=>(
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Education"
                                    value={edu}
                                    onChange={(e)=>handleEducationChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" className="btn-add-more" onClick={addEducation}>
                            ➕ เพิ่มประสบการณ์การเรียน
                        </button>
                        

                    <h4>Work Experience</h4>
                        {experiences.map((exp, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                                <p style={{ color: '#aaa', fontSize: '14px' }}>ลำดับที่ {index + 1}</p>
                                <input 
                                    type="text" 
                                    placeholder="Company Name" 
                                    value={exp.company} 
                                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Position" 
                                    value={exp.position} 
                                    onChange={(e) => handleExperienceChange(index, "position", e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Duration (e.g., 2022 - 2024)" 
                                    value={exp.duration} 
                                    onChange={(e) => handleExperienceChange(index, "duration", e.target.value)} 
                                />
                                {experiences.length > 1 && (
                                    <button type="button" onClick={() => removeExperience(index)} style={{ color: 'red', alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        ❌ ลบรายการนี้
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btn-add-more" onClick={addExperience}>
                            ➕ เพิ่มประสบการณ์ทำงาน
                        </button>

                    <h4>Contact</h4>
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
                    <button type="button" className="btn-pdf" onClick={handleResumeref}>Download PDF</button>

                </form>
            </div>

            <div className="preview">
                <div className="preview-container" ref={resumeRef}>
                    {photo && <img src={photo} alt="profile" />}
                    <h1>{fullName || "Your name"}</h1>
                    <p>{aboutMe || "About Me..."}</p>
                    

                    <h2>Location</h2>
                        <p>
                            {location.city || "City"}, {location.country || "Country"}
                        </p>
                    

                    <h2>Skills</h2>
                        {skills.map((skills,index)=>(
                            <p key={index}>{skills || "skills...."}</p>
                        ))}
                        
                    <h2>Education</h2>
                        {education.map((edu, index) => (
                            <p key={index}>{edu || "Education..."}</p>
                    ))}

                    <h2>Contact</h2>
                        <p>{email || "email@gmail.com"}</p>
                        <p>{phone || "Number"}</p>
                    
                    <h2>Work Experience</h2>
                        {experiences.map((exp, index) => (
                            <div key={index} style={{ marginBottom: '15px' }}>
                                <p style={{ margin: '2px 0', fontWeight: 'bold' }}>{exp.company || "Company Name"}</p>
                                <p style={{ margin: '5px 0'}}>{exp.position || "Position Name"}</p>
                                <p style={{ margin: '2px 0'}}>{exp.duration || "Duration"}</p>
                            </div>
                        ))}

                </div>
            </div>
        </section>
    )
}

export default Content