import MainGrid from '../components/MainGrid'
import Box from '../components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelationsArea'
import { useState, useEffect } from 'react'


function ProfileSideBar() {
  const gitHubUser = 'cboscariol'

  return (
    <Box>
      <img src={`https://github.com/${gitHubUser}.png`} alt="photo-profile" />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${gitHubUser}`}>
          @{gitHubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}




function ProfileRelationsBox({ title, itens, }) {

  return (
    <ProfileRelationsBoxWrapper >
      <h2 className='smallTitle'>
        {title} ({itens.length})
      </h2>

      <ul>
        {itens.filter((seguidor, index) => index < 6).map((seguidor) => {
          return (
            <li key={seguidor.login}>
              <a target="_blank" href={seguidor.html_url} >
                <img src={seguidor.avatar_url} alt="" />
                <span>{seguidor.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
  const [comunidades, setComunidades] = useState([])
  const [seguidores, setSeguidores] = useState([])
  const gitHubUser = 'cboscariol'
  const pessoasFavoritas = [
    'juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    const dadosDoForm = new FormData(event.target)

    const comunidade = {
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
      creatorSlug: dadosDoForm.get('creator'),
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
      .then(async (response) => {
        const dados = await response.json();
        console.log(dados.registroCriado);
        const comunidade = dados.registroCriado;
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas)
      })
  }

  useEffect(function () {
    fetch("https://api.github.com/users/cboscariol/followers")
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta)
        console.log(respostaCompleta)
      })


    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'cc6639206e4cccec21aeafe87e534c',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        allComunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allComunities;
        setComunidades(comunidadesVindasDoDato)
      })
    // .then(function (response) {
    //   return response.json()
    // })
  }, [])




  return (
    <>
      <AlurakutMenu profilePic={gitHubUser} />

      <MainGrid>

        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className='title'>Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box >
            <h2 className='subtitle'>O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  name="title"
                  area-label='Qual vai ser o nome da sua comunidade?' />
              </div>
              <div>
                <input
                  type="text"
                  placeholder='Coloque uma URL para usarmos de capa'
                  name="image"
                  area-label='Coloque uma URL para usarmos de capa' />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>

          </Box>
        </div>

        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title='Seguidores' itens={seguidores} />

          <ProfileRelationsBoxWrapper >
            <h2 className='smallTitle'>
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.filter((comunidade, index) => index < 6).map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/communities/${comunidade.id}`}>
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>


          <ProfileRelationsBoxWrapper >
            <h2 className='smallTitle'>
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`} >
                      <img src={`https://github.com/${pessoa}.png`} alt="" />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
