import React from "react";

function Snap(props) {

  const handleDelete = (e) => {

    fetch('/my-snaps', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ snap_id: });
    })
      .then((res) => {
        return res.body.json;
      })
      .then(json => {console.log(json)})




  }




  let svg = '';
  if (props.url) {
    svg = <img snap_id={props.key} onClick={handleDelete} src='./images/trash.svg' className="delete-button"></img>;
  }

  return (
    <tr className="snaps-table elements">
      <td className="snaps-table elements title">
          <a href={props.url}>{props.title}</a>
          {svg}
        </td>
      <td  className="snaps-table elements text">{props.snap_text}</td>
    </tr >
  );
}

export default Snap;