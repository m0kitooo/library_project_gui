import {Link} from "react-router-dom";
import React from "react";

export default function DialogBox({message, returnLink}) {
  return (
    <div>
      <h2>{message}</h2>
      <Link to={returnLink}>
        <button>Powrót</button>
      </Link>
    </div>
  )
}