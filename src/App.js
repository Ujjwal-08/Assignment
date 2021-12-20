import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';





function App() {
  const [templates, setTemplates] = useState([]);
  
  const [body, setBody] = useState([]);
  const [head, setHead] = useState([]);
  const [foot, setFoot] = useState([]);
  const [file, setFile] = useState([]);
;

  const handleSubmit = (e) => {
    // e.preventDefault()
   
    fetch('http://localhost:8000/templates/', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
           head,body,foot
          ,file})
        
      })
   
  }
  
  useEffect(() => {
    fetch('http://localhost:8000/templates')
        .then(res => res.json())
        .then(data => setTemplates(data))
    
  }, [])
  


  const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }
  return (
    <div className="App container">
    <DropdownButton
      
      title="SELECT TEMPLATE"
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >    {templates.map(templates => (
              <div>
              <Dropdown.Item  onSelect={handleSelect} key={templates.id} eventKey={templates.id} >{templates.name }</Dropdown.Item>
              </div>
      ))} </DropdownButton>
     
      <h4>{templates.map(temp => (
        
              <form onSubmit={handleSubmit}>
              { temp.id=== value ? (
                   
                temp.components.map((tc) => (
                  
                    <>

                    {tc.type==='HEADER'?(<>
                      <h1>TEAMPLATE HEADER</h1>
                      {tc.format==='DOCUMENT' || tc.format=== 'IMAGE' || tc.format==='VIDEO'?<input className="form-control form-control-lg" id="formFileLg" type='file' onClick={(e) => setFile(e.target.value)} name='file'  required />:
                      <div>
                      <h3>{tc.text}</h3>
                      {[...Array((tc.text.match(/{([^}]+)}/g) || []).length)].map((e, i) =><> <span  key={i}><h4>PLACEHOLDER{'{'+(i+1)+'}'}</h4> <input type="text" class="form-control" placeholder="PLACEHOLDER VALUE"  onClick={(e) => setHead(e.target.value)}  name='place' required/></span></>)}
                      </div>}
                      </>
                      ):null}

                      {tc.type==='BODY'?(<>
                      <h1>TEAMPLATE BODY</h1>
                      {tc.format==='DOCUMENT' || tc.format=== 'IMAGE' || tc.format==='VIDEO'?<input className="form-control form-control-lg" id="formFileLg" type='file' onChange={(e) => setFile(e.target.value)} name='file' required />:<div>
                      <h3>{tc.text}</h3>
                      {[...Array((tc.text.match(/{([^}]+)}/g) || []).length)].map((e, i) =><> <span   key={i}><h4>PLACEHOLDER{'{'+(i+1)+'}'}</h4><input type="text" class="form-control" placeholder="PLACEHOLDER VALUE" name='place' 
                      onClick={(e) =>{ setBody(e.target.value);}}
                      
                      required/></span></>)}
                      </div>}
                      </>
                      ):null}

                      {tc.type==='FOOTER'?(<>
                      <h1>TEAMPLATE FOOTER</h1>
                      {tc.format==='DOCUMENT' || tc.format=== 'IMAGE' || tc.format==='VIDEO'?<input className="form-control form-control-lg" id="formFileLg" type='file' onChange={(e) => setFile(e.target.value)} name='file' required />:<div>
                      <h3>{tc.text}</h3>
                      {[...Array((tc.text.match(/{([^}]+)}/g) || []).length)].map((e, i) =><> <span  key={i}><h4>PLACEHOLDER{'{'+(i+1)+'}'}</h4><input type="text" class="form-control" placeholder="PLACEHOLDER VALUE" onClick={(e,i) => setFoot(e.target.value)} name='place' required/></span></>)}
                      </div>}
                      </>
                      ):null}
                     
                 
                      </>    ))
                       
                   ) 
              :null }
              { temp.id=== value ?
              <button
          type="submit" 
          className="btn-primary"
          >
          Submit
        </button>:null}
              </form>
      ))}
      </h4>
    </div>
  );
}

export default App;
