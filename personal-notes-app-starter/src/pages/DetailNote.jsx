import React from "react";
import { useParams } from "react-router-dom";

function DetailNote() {
  const { id } = useParams();

  return <p>{id}</p>;
}

export default DetailNote;
