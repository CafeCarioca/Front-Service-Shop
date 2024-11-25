import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: "Inter", sans-serif;
        color: ${({ theme }) => theme.colors.darkGray}
    }
    a{ text-decoration:none}
    li{
        list-style: none;
    }
    .centered-section{
        width: 90%;
        margin: 0 auto;
    }
    .hoverPointerGrey{
        &:hover {
      color: ${({ theme }) => theme.colors.carioca_brickred};
      cursor: pointer;
    }}
    .hoverPointer{
       &:hover {
       cursor: pointer;
    }}
    .linkDarkGrey{
        color:${({ theme }) => theme.colors.darkGray}
    }
    .linkDarkerGray{
        color:${({ theme }) => theme.colors.darkerGray}
        
    }
    .linkDarkerGray:hover{
         color:${({ theme }) => theme.colors.mediumGray}
    }
  
    
`;

export default GlobalStyle;
