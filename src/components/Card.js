import React, { useState } from "react";
import QRCode from "qrcode";

function Card() {

    const [input,setInput] = useState("");
    const [qr,setQr] = useState();
    const [isLoading,setIsLoading]=useState(false);

    const getQRCode = async (e) => {
        e.preventDefault();

        try{
            setIsLoading(true);

            const res = await QRCode.toDataURL(input)

            setQr(res);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


  return (
    <form className="form" onSubmit={getQRCode}>

        <h1 className="title">QR Code Generator</h1>

        <input
        type="url"
        className="input"
        value={input}
        onChange={(e) => {
            setInput(e.target.value)
            setQr();
            }}
        required
        placeholder="Enter URL....."
        ></input>

        {isLoading && <div className="loading"><span></span>Loading</div>}

        {!isLoading && (qr?<div><img className="qr_code" src={qr} alt="qr_code"></img><a href={qr} download>Download</a></div>:<div className="loading"></div>)}

        <input type="submit" className="submit" value="Generate QR Code"></input>

    </form>
  );
}

export default Card;