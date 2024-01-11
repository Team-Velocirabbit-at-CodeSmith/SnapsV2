import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Snap from "./Snap.jsx";
import { setSnapsList } from "./snapsSlice";



const SnapsContainer = () => {

    const snapsList = useSelector(state => state.snaps.snapsList);
    const dispatch = useDispatch();

    console.log(" SNAPS LIST FROM STATE ", snapsList);

    //create a variable to hold all snap components
    const snapsComponentList = [<tr>
        <th>Title</th>
        <th id="snap-text">Snap</th>
      </tr>];

    for (let i = 0; i < snapsList.length; i++){

        snapsComponentList.push(<Snap key={snapsList[i].snap_id} snap_text={snapsList[i].snap_text} title={snapsList[i].title} url={snapsList[i].url}/>);

    }
    const testAdd = (e) => { console.log(process.env.REACT_APP_OPENAI_KEY)}

    const handleAdd = (e) => {
      
        //Query puppeteer
        // Query OpenAI API
        // Store ChatGPT summary in database for user
        let translated = (async () => {
          //Query puppeteer
          //send connection back to server where the puppeteer request must be performed, passing user input in on the body
          //moved variable declaration for identifying userURLInput earlier
          const userUrlInput = document.getElementById('urlInput').value;

          console.log("userUrlInput: ", userUrlInput);

          const puppeteerResponse = await fetch('/webScrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: userUrlInput})
          })
          // .then(res => res.json())
          // .then(res => res.stringify());
            
            const rawResponse = await fetch(
              "https://api.openai.com/v1/chat/completions",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ` + process.env.REACT_APP_OPENAI_KEY,
                },
                body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: [
                    {
                      role: "user",
                      content: puppeteerResponse,
                    },
                  ],
                  temperature: 0.7,
                }),
              }
            );
            const content = await rawResponse.json();
            const summary = content.choices[0].message.content.toString();
            
            const userTitleInput = document.getElementById('titleInput').value;
              console.log("snapsList before post call ", snapsList)
            fetch('/my-snaps' , {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
             },
              body: JSON.stringify({ user_id: snapsList[0].id, title: userTitleInput, url: userUrlInput, snap_text: summary })
            })
            .then(res => res.json())
            .then(res => {
              document.getElementById('urlInput').value = '';
              document.getElementById('titleInput').value = '';
              console.log('dispatching setSnapsList ', res);
              dispatch(setSnapsList(res));
            })
            .catch(() => {console.log('Error in addSnap')});

          })();

    }


    return(
        <div id="snaps-container">
            <img id="snaps-page-logo" src="./images/snaps-page-logo.png"/>
            {/* <h1>My Snaps</h1> */}
            <table className="snaps-table container">
                {snapsComponentList}
            </table>
            <input type='title' className='snaps-input' id='titleInput' placeholder='Enter a title...'/>
            <input type='url' className='snaps-input'  id='urlInput' placeholder='Enter a URL...'/>
            <button id='add-button'onClick={handleAdd}>Add</button>
        </div>
    );
}





export default SnapsContainer;


