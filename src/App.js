import React, { useState, useEffect } from "react";
import { Meme } from "./components/Meme";

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img style={{ width: 180 }} src={meme} alt="custom meme" />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center"}}>
      {template && (
        <form 
          onSubmit={async e => {
            e.preventDefault();
            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: "Twinkle_16",
              password:"16Sep@1998"
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params 
              )}`
            );
            const json = await response.json();
            setMeme(json.data.url);
          }}
        >
          <Meme template={template} />
          <br />
          <br />
          <input
            placeholder="Pass Dailog 1"
            value={topText}
            onChange={e => setTopText(e.target.value)} required
          />
          <br />
          <br />
          <input
            placeholder="Pass Dailog 2"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)} required
          />
          <br />
          <br />
          <button type="submit" >Generate Your Meme</button>
        </form>
      )}
      {!template && (
        <>
          <h2>Select the one image</h2>
          {templates.map(template => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
