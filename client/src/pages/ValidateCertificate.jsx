import {useState} from "react";
import Navigation from "../components/Navigation";
const ValidateCertificate =()=>{
    const [cert,setcert]=useState({name:null,date:null,organization:null});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const viewTask =async(event)=>{
       try{
          event.preventDefault()
          const certhash = document.querySelector("#certhash").value;
          const res = await fetch(`http://localhost:3000/api/ethereum/view-certificate/${certhash}`,
          {
            method:"GET",
            headers:{
                "contetnt-type":"application/json"
            }
          });
          const data = await res.json();
          if(data.status===200){
            console.log(data.certObj);
            setcert(data.certObj);
          }else{
            throw new Error;
          }
       }catch(error){
        setModalContent("Certificate does not exist");
        setModalVisible(true);
       }
    }
    const closeModal = () => {
      setModalVisible(false);
      setModalContent("");
    };
    return<>
     <Navigation/>
     <div className="view_task todo_btn">
     {cert.name!==null && cert.date!==null && cert.organizer!==null ? (
          <div className="view_task_by_id  view_all_tasks_card">
            <p>Name: {cert.name}</p>
            <p>Date: {cert.date}</p>
            <p>Organizer: {cert.organizer}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
        <form onSubmit={viewTask}>
          <label>
            Certificate Hash:
            <input id="certhash" />
          </label>
          <button type="submit">Validate Certificate</button>
        </form>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
        </div>

    </>
}
export default ValidateCertificate;

