import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsArea'
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
      id: new Date().toISOString,
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image')
    }

    const novaComunidade = [...comunidades, comunidade]
    setComunidades(novaComunidade)
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
              {comunidades.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/users/${comunidade.title}`} >
                      <img src={comunidade.image} alt="" />
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
