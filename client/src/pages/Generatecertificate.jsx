import {useState} from "react";
import Navigation from "../components/Navigation";
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

const Generatecertificate =({state})=>{

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [Name, SetName] = useState();
    const navigateTo =useNavigate();
    
    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
      };

    const generatecertificate= async(event)=>{
        event.preventDefault();
        const {contract,account}=state;

        const Date = document.querySelector("#Date").value;
        const Organizer = document.querySelector("#Organizer").value;
        console.log(Name,Date,Organizer);
        try{
            const res = await fetch("http://localhost:3000/api/ethereum/generate-certificate",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                
            })
            console.log(account)
            const data = await res.json()
            if(data.status===200){
                if(contract && contract.methods){
                    const newcert = await contract.methods
                    .generatecert(Name,Date,Organizer)
                    .send({from:account})
                    
                    const newcert1 = await contract.methods.hash(Name,Date,Organizer).call();
                    setModalContent(`${newcert1}`);
                }
            }else{
                alert("Certificate Generation Failed");
            }

        } catch (error) {
            setModalContent(``);
          } 
          finally {
            setModalOpen(true);
          }
    }
    function handleClick() {
      navigateTo("/Certificate",{name:Name});
    }  
    return(
        <>
          <Navigation />
          <div className="create_task todo_btn">
            <form onSubmit={generatecertificate}>
              <label>
                Name:
                <input id="Name" onChange={(e) => SetName(e.target.value)}/>
              </label>
              <label>
                Date:
                <input id="Date" type="date" />
              </label>
              <label>
                Organizer:
                <input id="Organizer"  />
              </label>
              <button type="submit">Generate Certificate</button>
            </form>
    
            {modalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <QRCode value={modalContent} bgColor="#FFFFFF" fgColor="#000000" size={256} />
                  <p>{modalContent}</p>
                  <button onClick={handleClick}>Certificate Preview</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
}
export default Generatecertificate;


