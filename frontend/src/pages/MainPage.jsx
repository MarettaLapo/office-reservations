import React, { useState } from "react";
import http from "../http-common";

import { Link, Navigate, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {
  createTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";
import { lighten, Typography } from "@mui/material";
function MainPage() {
  const [filled1, setFilled1] = useState("#519E8A");
  const [filled2, setFilled2] = useState("#519E8A");
  const [filled3, setFilled3] = useState("#519E8A");
  const [filled4, setFilled4] = useState("#519E8A");
  const [filled5, setFilled5] = useState("#519E8A");
  const [filled6, setFilled6] = useState("#519E8A");
  const [filled7, setFilled7] = useState("#519E8A");
  const [filled8, setFilled8] = useState("#519E8A");
  const [filled9, setFilled9] = useState("#519E8A");
  const [filled10, setFilled10] = useState("#519E8A");
  const [filled11, setFilled11] = useState("#519E8A");
  const [filled12, setFilled12] = useState("#519E8A");
  const [showModal, setShowModal] = useState(false);
  const [officeInfo, setOfficeInfo] = useState([]);
  const [href, setHref] = useState("");
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#519E8A",
      },
    },
  });
  const logout = () => {
    localStorage.removeItem("logged");
    navigate("/profile");
  };
  function handleClose() {
    setShowModal(false);
  }
  function handleOpen(id) {
    setShowModal(true);
    getOfficeInfo(id);
    setHref("/office/" + id);
  }
  function handleLinkOffice(id) {
    console.log("here");
    return <Navigate to="/profile" />;
  }
  function getOfficeInfo(id) {
    http
      .get("/officeShort/" + id)
      .then((response) => {
        setOfficeInfo(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="container">
      <div className={"offset-3"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180mm"
          height="180mm"
          version="1.1"
          viewBox="0 0 135 135"
          xmlSpace="preserve"
        >
          <g
            fill="none"
            stroke="#000"
            strokeWidth="0.265"
            transform="matrix(1.2801 0 0 .99977 32.185 -11.692)"
          >
            <path
              fill="none"
              strokeOpacity="1"
              d="M78.815 49.946l.1 73.904-38.468 21.815.168-73.38C54.8 63.933 65.52 57.705 78.218 50.344z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.813 102.912l-.124 8.928"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M26.62 81.9l-.125 13.105"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M27.241 82.223l-.174 13.155"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M26.52 96.198l.05 12.931"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M27.117 96.422l.05 13.13"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M26.57 110.198l-.025 9.002"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M27.167 110.571l-.025 8.953"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M51.462 97.64l.05 13.23"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M52.108 97.317l.008.945.092 12.31"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M51.613 111.888l-.07 13.223"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M52.21 111.466l-.07 13.328"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M78.938 66.768l-15.755 9.074"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M63.218 89.944c.14-.036 15.614-8.827 15.614-8.827"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M63.042 118.5l15.86-9.004"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M63.042 104.468l15.896-9.39"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M28.36 121.14l.174 18.302.721-.348-.149-18.377"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M68.177 76.193l5.626-3.13-.105 4.765-5.504 3.236z"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M18.496 22.049L3.188 12.752-23.47 28.225l15.825 9.355"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.803 73.116l.967-.633-.28 5.926-6.226 3.657-.017-1.037"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-20.444 28.225L3.047 14.44l12.942 7.526-23.703 13.926z"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.61 77.828l.756.475"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M74.63 114.191l.879-.615-.123 11.658"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.715 87.253l.704-.598v5.856l-6.172 3.78-.018-1.055"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M29.131 139.094l11.19 6.64"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M68.212 90.506l5.486-3.235.017 4.765-5.45 3.235z"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.698 92.054l.686.422"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.557 101.566l.862-.562-.141 5.732-5.943 3.692-.035-1.055"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M68.247 104.608l5.363-3.095-.035 4.66-5.258 3.183z"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M40.486 72.186L-.262 48.852l1.492-.895 38.793 22.38L75.83 50.244 22.959 19.452l-.244-.054"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M78.915 49.747l-56.2-32.128-5.992 3.283"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M67.983 128.768l-.017.791"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M40.606 75.63l22.577-13.082-.07 13.294-22.507 13.082"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M40.535 90.049l22.578-13.223.07 13.082-22.437 13.083"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.557 106.208l.686.545"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M67.93 117.884l6.735-3.763-.193 10.866-2.933 1.686-3.556 2.042z"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M40.465 104.116l22.507-13.082.07 13.363-22.49 12.906"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M71.482 115.932l.053 10.744"
              display="inline"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M40.324 118.394l22.718-13.153v13.293l-22.507 12.871"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M40.535 132.46l22.648-13.011-.14 13.363"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.258 52.21L40.606 75.77"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.258 65.573l40.723 23.21"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.188 66.487l40.794 23.421"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.118 79.78l40.513 23.21"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.188 80.624l40.653 23.562"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.258 93.706l40.793 23.562"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.258 94.902l40.77 23.33"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.118 108.055l10.62 6.119"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-.258 109.04l10.831 6.33"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M29.178 124.98l11.287 6.496"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M29.212 126.13l11.183 6.4"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M11.839 130.14l.174-11.613 15.155 8.642-.017 11.34 1.36 1.026"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M28.236 121.214L10.68 110.92l.845-.349 17.556 10.096z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M10.53 110.97l.125 18.202 1.218.82"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M10.605 128.476l-10.717-6.167V48.95"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M68.172 62.106v4.973l5.57-3.406-.124-4.675z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.605 59.058l.22-.182.738-.45-.046 5.78-6.336 3.732-.034-.76"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M73.717 63.623l.87.646"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.503 119.455l-.222 9.828-1.403.773"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.392 129.277l13.718 7.935"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M20.28 123.176l-.423 9.742"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M3.997 49.455l14.74-8.76-.249-18.5-26.21 15.318.1 89.222 7.51-4.426"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.897 29.07L3.118 16.127l11.477 6.62"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-23.68 28.225l.211 89.747 3.165 1.547.053-11.834 7.561 4.431.018 11.412 5.028 3.306"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-23.68 32.586l15.966 8.933 26.297-15.313"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-23.75 46.512l16.036 9.495 7.667-4.571"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-23.75 60.72l16.106 9.213 7.526-4.36"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-23.68 75.35l16.177 8.861L.023 79.71"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-23.68 89.135l15.825 9.354 7.808-4.783"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-23.54 103.624l15.896 9.073 7.597-4.572"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-19.178 108.406l-.088 10.533-.967.65"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-19.266 118.886l6.558 3.868"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-15.662 110.323l-.281 10.532"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M6.9 56.337l-.298 13.105"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M7.596 56.61l-.273 13.28"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.067 59.893l-.1 13.328"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.913 60.415l-.05 13.204"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M20.13 63.872l-.1 13.229"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M20.771 64.236l-.07 13.153"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M26.82 67.894l-.14 13.152"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M27.523 68.105l-.14 13.293"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M33.572 71.551v13.293"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M34.135 71.903l.14 13.504"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M6.824 36.641l4.865-2.838-.064 9.678-4.832 2.84z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.414 38.93l5.47 3.108-.1 4.675-5.296-3.083z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.38 38.97l-.628-.374.047 5.65 5.3 3.099.644-.664"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.993 44.267l.67-.696"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.344 53.156l-.076 4.566 5.412 3.121.03-4.572z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.277 53.135l-.722-.439-.012 5.447 5.66 3.352.396-.581"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-19.037 58.175l.65-.485"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.426 67.245l-.082 4.61 5.55 3.142.02-4.531z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.335 67.315l-.737-.41-.003 5.423.585-.47"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-19.072 72.457l5.683 3.177.471-.672"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.294 81.565l-.117 4.394 5.32 3.162.06-4.598z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.382 95.713l-.094 4.479 5.348 3.086.03-4.572z"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M6.142 112.837L5.93 125.78"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M6.916 113.189l-.282 12.8"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M33.717 128.787l-.29 12.904"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M34.205 129.014l-.281 12.958"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M51.528 126.139l.174 13.18"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M52.07 125.903l.174 13.11"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M57.18 122.856l.05 13.279"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M57.827 122.557l.05 13.28"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M51.511 83.566v13.13"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M52.257 83.168s-.149 12.782-.1 13.03"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M45.792 129.495l.249 13.055"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M46.314 129.222l.174 13.03"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M45.951 72.5l.035 13.188"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M46.303 72.255l.07 13.328"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M51.507 69.265V82.63"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M52.035 68.984l.035 13.258"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M57.275 65.924l.07 13.329"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M57.732 65.643l.105 13.223"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M68.018 129.542l7.438-4.379"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M11.663 33.817l.791-.422.018 10.972"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M6.84 46.305l-.018 1.407"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M18.314 21.946l4.482-2.593"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M18.486 23.407l4.079-2.532 52.153 29.928"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.211 81.609l-.862-.37v5.346l5.433 3.288.546-.756"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.334 85.952l-.598.563"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.176 95.799l-.809-.545-.105 5.433 5.644 3.235.316-.65"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M-18.422 100.177l-.598.457"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.067 74.067v13.329"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.813 74.415l-.15 13.329"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.117 88.34l-.025 13.105"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.838 88.763l-.174 12.98"
              opacity="0.653"
            ></path>
            <path
              fill="none"
              strokeOpacity="1"
              d="M13.117 102.639l-.05 8.753"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(12)}
              onMouseOver={() => setFilled12("#104547")}
              onMouseOut={() => setFilled12("#519E8A")}
              fill={filled12}
              strokeOpacity="0"
              d="M62.962 77.061l.124 12.813-10.822 6.23.106-12.88z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(11)}
              onMouseOver={() => setFilled11("#104547")}
              onMouseOut={() => setFilled11("#519E8A")}
              fill={filled11}
              strokeOpacity="0"
              d="M27.366 82.413l13.346 7.7 10.698-6.329-.018 12.875-10.822 6.335-13.389-7.67z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(10)}
              onMouseOver={() => setFilled10("#104547")}
              onMouseOut={() => setFilled10("#519E8A")}
              fill={filled10}
              strokeOpacity="0"
              d="M13.95 74.746l12.544 7.203-.12 12.865L13.8 87.611z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(9)}
              onMouseOver={() => setFilled9("#104547")}
              onMouseOut={() => setFilled9("#519E8A")}
              fill={filled9}
              strokeOpacity="0"
              d="M.015 66.692l12.949 7.46V87.14L.006 79.71z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(5)}
              onMouseOver={() => setFilled5("#104547")}
              onMouseOut={() => setFilled5("#519E8A")}
              fill={filled5}
              strokeOpacity="0"
              d="M.023 80.796l12.985 7.566-.018 12.912L.032 93.708z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(6)}
              onMouseOver={() => setFilled6("#104547")}
              onMouseOut={() => setFilled6("#519E8A")}
              fill={filled6}
              strokeOpacity="0"
              d="M13.954 88.964l12.433 7.193.054 12.855-12.642-7.335z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(7)}
              onMouseOver={() => setFilled7("#104547")}
              onMouseOut={() => setFilled7("#519E8A")}
              fill={filled7}
              strokeOpacity="0"
              d="M27.251 96.687l13.16 7.6 10.947-6.334.026 13.056-10.822 6.126-13.258-7.603z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(8)}
              onMouseOver={() => setFilled8("#104547")}
              onMouseOut={() => setFilled8("#519E8A")}
              fill={filled8}
              strokeOpacity="0"
              d="M52.236 97.388l10.642-6.138.05 13.11-10.61 6.036z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(4)}
              onMouseOver={() => setFilled4("#104547")}
              onMouseOut={() => setFilled4("#519E8A")}
              fill={filled4}
              strokeOpacity="0"
              d="M52.344 111.547l10.57-6.127.011 13.066-10.674 6.081z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(3)}
              onMouseOver={() => setFilled3("#104547")}
              onMouseOut={() => setFilled3("#519E8A")}
              fill={filled3}
              strokeOpacity="0"
              d="M27.282 110.802l13.314 7.595 10.87-6.295-.036 12.924-10.965 6.296-11.193-6.426-.035-4.266-1.95-1.146z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(2)}
              onMouseOver={() => setFilled2("#104547")}
              onMouseOut={() => setFilled2("#519E8A")}
              fill={filled2}
              strokeOpacity="0"
              d="M13.94 103.17l12.5 7.124-.011 8.693-12.611-7.254z"
              opacity="0.653"
            ></path>
            <path
              onClick={() => handleOpen(1)}
              onMouseOver={() => setFilled1("#104547")}
              onMouseOut={() => setFilled1("#519E8A")}
              fill={filled1}
              fillOpacity="1"
              strokeOpacity="0"
              d="M.015 95.211l-.016 12.746 10.442 6.012-.041-3.088 1.206-.446 1.375.828.011-8.645z"
              opacity="0.653"
            ></path>
          </g>
        </svg>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Офис №{officeInfo.number}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography> Площадь: {officeInfo.area}</Typography>
          <Typography>
            Статус: {officeInfo.status ? "Свободен" : "Забронирован"}
          </Typography>
          <div className="pt-2">
            <ThemeProvider theme={theme}>
              <Button variant="contained" href={href} color="primary">
                Детальная информация
              </Button>
            </ThemeProvider>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MainPage;
