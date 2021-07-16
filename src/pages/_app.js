import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutSyles } from '../lib/AlurakutCommons'


const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #D9E6F6;
    font-family: sans-serif;
    background-repeat: no-repeat;
    background-size: cover; 
    background-image: url('https://img.freepik.com/vetores-gratis/folhas-realistas-com-fundo-de-quadro-de-neon_52683-32328.jpg?size=626&ext=jpg');
  }

#_next {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  }

img {
  max-width: 100%;
  height: auto;
  display: block;
 } 

 ${AlurakutSyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
