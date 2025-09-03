import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = () => {
        console.log("Button is clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to upper case", "success");
    } 
    const handleClick = () => {
        console.log("Button is clicked" + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lower case", "success");
    } 
    
    const handleClearClick = () =>{
      setText("");
    }
    const handleOnChange = (event) =>{ 
        setText(event.target.value);
    }
  const [text, setText] = useState("");
  const [pdfResponse, setPdfResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState("");
  const[chunkSummaries, setChunkSummaries] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Origin': 'http://localhost:3000',
        },
        body: formData,
      });
      const result = await response.json();
      setPdfResponse("PDF uploaded successfully! Please wait while we process your document...");
      props.showAlert("File uploaded successfully! Processing started...", "success");
      
      // Start processing after upload
      if (result.doc_id) {
        setIsProcessing(true);
        // Get summarized version
        const summaryResponse = await fetch(`http://127.0.0.1:8000/summarize-pdf/${result.doc_id}`, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Origin': 'http://localhost:3000',
          },
        });
        const summaryResult = await summaryResponse.json();
        setSummary(summaryResult.summary);
        setChunkSummaries((summaryResult.chunk_summaries || []).map(chunk => cleanChunkText(chunk)));
        setPdfResponse(summaryResult);
        setIsProcessing(false);
        props.showAlert("Summary ready!", "success");
      }
    } catch (error) {
      setPdfResponse('Upload or processing failed!');
      setIsProcessing(false);
      props.showAlert("Process failed!", "error");
    }
  };

  const cleanChunkText = (text) => {
    return text.replace(/^Here's a summary of the text:?\s*/i, '').trim();
  };

  const handleSummarizeClick = async () => {
  if (!text.trim()) {
    props.showAlert("Please enter some text to summarize", "warning");
    return;
  }

  setIsProcessing(true);
  try {
    const response = await fetch('http://127.0.0.1:8000/summarize-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify({ text: text }),
    });
    
    const result = await response.json();
    setChunkSummaries([result.summary]); // Assuming the API returns { summary: "..." }
    props.showAlert("Text summarized successfully!", "success");
  } catch (error) {
    props.showAlert("Failed to summarize text", "error");
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <>
      <div className="container my-3">
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileUpload}
          className="form-control" 
        />
        {isProcessing && (
            <div className="alert alert-info mt-2">
              Please wait while we process your document. This may take up to 2 minutes...
            </div>
          )}
      </div>
      {/* <div>
        <h2 >{props.heading}</h2>
        <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor : props.mode === "dark"? "grey": "white", color: props.mode === "dark"? "white": "#042743"}} id="myBox" rows="8"></textarea>
        </div>
        <button className={`btn btn-${props.color} mx-1`} onClick={handleClearClick}>Clear Text</button>
    </div> */}
    <div>
      <h2>{props.heading}</h2>
      <div className="mb-3">
        <textarea 
          className="form-control" 
          value={text} 
          onChange={handleOnChange} 
          style={{
            backgroundColor: props.mode === "dark" ? "grey" : "white", 
            color: props.mode === "dark" ? "white" : "#042743"
          }} 
          id="myBox" 
          rows="8"
        ></textarea>
      </div>
      <button 
        className={`btn btn-${props.color} mx-1`} 
        onClick={handleClearClick}
      >
        Clear Text
      </button>
      <button 
        className={`btn btn-${props.color} mx-1`} 
        onClick={handleSummarizeClick}
        disabled={isProcessing}
      >
        {isProcessing ? 'Summarizing...' : 'Summarize Text'}
      </button>
  </div>
    <div className="container my-3" style={{color: props.mode==="dark"? "white": "#042743"}}>
  {chunkSummaries.length > 0 && (
    <>
      <h1>Summary Statistics</h1>
      <p>{chunkSummaries.join(' ').split(/\s+/).filter(word => word.length > 0).length} words total</p>
      <p>Minutes to read: {Math.ceil(chunkSummaries.join(' ').split(/\s+/).filter(word => word.length > 0).length * 0.008)} minutes</p>
      
      <div className="mt-3">
        <h3>PDF Summary:</h3>
        <div className="card" style={{
          backgroundColor: props.mode === "dark" ? '#2b5278' : '#f8f9fa',
          color: props.mode === "dark" ? "white" : "#042743"
        }}>
          <div className="card-body">
            {chunkSummaries.map((chunk, index) => (
              <p key={index} className="card-text" style={{
                whiteSpace: 'pre-wrap',
                marginBottom: '1.5rem'
              }}>
                {chunk}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )}
  
  {/* Keep the text analysis section if needed */}
  {text && (
    <>
      <h1>Text Analysis</h1>
      <p>{text.split(" ").length} words and {text.length} characters</p>
      <p>Minutes to read: {text.split(" ").length * 0.008} minutes</p>
      <p>{text}</p>
    </>
  )}
</div>
    </>
  )
}