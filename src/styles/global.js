import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        --background-primary: #262626;
        --background-second: #404040;
        --color-primary: #737373;
        --color-second: #A6A6A6;
        --color-third: #D9D9D9;
        --white: #f5f5f5;
        --black: #0C0D0B;
        --color-placeholder:#4e5555;
        --font-home: "Baloo Tamma 2", "cursive";
    }

    body {
        font-family: "Roboto", sans-serif;
        background-color: var(--background-primary);
        color: var(--black);
        font-size: 16px;
        -webkit-font-smoothing: antialiased !important;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: "PT Serif", serif;
        font-weight: 700;
    }

    a {
        text-decoration: none;
    }
    

    button {
        cursor: pointer;
        border: none;
    }

    ul {
        list-style-type: none;
    }
`;

export default GlobalStyle;
