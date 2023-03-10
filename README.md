# ๐ React TypeScript๋ฅผ GraphQl์ ์ด์ฉํ์ฌ ๋ง๋  ์์ ์๋๋ค.

:octocat: ๋ฐ๋ก ๊ฐ๊ธฐ : https://light9639.github.io/React-GraphQl-TypeScript/

![light9639 github io_React-GraphQl-TypeScript_](https://user-images.githubusercontent.com/95972251/218047748-96ccea70-7a71-4802-a315-5bed2fe58df1.png)

:sparkles: ๐ React TypeScript๋ฅผ GraphQl์ ์ด์ฉํ์ฌ ๋ง๋  ์์ ์๋๋ค. :sparkles:
## :tada: React ํ๋ก์ ํธ ์์ฑ
- React ์์ฑ
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite๋ฅผ ์ด์ฉํ์ฌ ํ๋ก์ ํธ๋ฅผ ์์ฑํ๋ ค๋ฉด
```bash
npm create vite@latest
# or
yarn create vite
```
- ํฐ๋ฏธ๋์์ ์คํ ํ ํ๋ก์ ํธ ์ด๋ฆ ๋ง๋  ํ React ์ ํ, Typescirpt-SWC ์ ํํ๋ฉด ์์ฑ ์๋ฃ.
## ๐ฐ๏ธ apollo-boost ๋ฐ react-apollo ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น
- apollo-boost ๋ฐ react-apollo ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์นํ๊ธฐ
```bash
$ npm install apollo-boost react-apollo
# or
$ yarn add apollo-boost react-apollo
```
## โ๏ธ main.tsx, App.tsx ์์  ๋ฐ ์์ฑ
### โก main.tsx
- `ApolloProvider`๋ฅผ `import` ํ ํ `App` ํ์ผ์ ๊ฐ์ผ๋ค.
- `ApolloClient`๋ฅผ ๊ฐ์ ธ์จ ํ `uri` ๋ถ๋ถ์ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ฌ `Graphql` ๋งํฌ๋ฅผ ์๋ ฅํ๋ค.
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
```
### โก App.tsx
- `Continents` ์ปดํฌ๋ํธ๋ฅผ `import` ํ ํ `App` ์ปดํฌ๋ํธ ์์ ๋ฃ๋๋ค.
```typescript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Continents from "./components/Continents";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <div>
        <a href="https://graphql.org/" target="_blank">
          <img src="https://camo.githubusercontent.com/07c382b68200c1a86d52d1682346e73e038b2f160c9afbc0af773fb3646882c8/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6772617068716c2f6772617068716c2d69636f6e2e737667" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>GraphQl + React</h1>
      <Continents></Continents>
    </div>
  )
}
```
## ๐ components ํ์ผ ์ Continents.tsx ์์  ๋ฐ ์์ฑ
### โก Continents.tsx
- `gql` ์์ `query`๋ฅผ ์ฌ์ฉํ์ฌ ๋ฐ์ดํฐ ์์ ์ฝ๋๋ช๊ณผ ์ด๋ฆ์ `GET_CONTINENTS` ๋ณ์๋ช์ ํ ๋นํ๋ค.
- `graphType`์ด๋ผ๋ ํ์์ ์ค์ ํ ๋ค ํ์์ ์ง์ ํด์ค๋ค.
- `Query` ์ปดํฌ๋ํธ ์์ `query={GET_CONTINENTS}`๋ฅผ ์๋ ฅํ๊ณ  ๋ฐ์ ์ฝ๋๋ฅผ ์๋ ฅํ๋ค.
- ๋ก๋ฉ์ค์ผ ๋๋ `<p>Loading...</p>`, ์๋ฌ๊ฐ ๋ฌ์ ๋๋ `<p>Error!</p>`, ์ ์์ ์ผ ๊ฒฝ์ฐ์๋ ๋ฐ๋ณต๋ฌธ์ด ์คํ๋๋ค.
```typescript
import React from "react";
import { ApolloError, gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_CONTINENTS = gql`
    query {
        continents {
            code
            name
        }
    }
`;

interface graphType {
    loading?: boolean;
    error?: ApolloError | undefined;
    data: any;
}

interface mapType {
    code: string;
    name: string
}

export default function Continents(): JSX.Element {
    return (
        <React.Fragment>
            <h2>Continents</h2>
            <Query query={GET_CONTINENTS}>
                {({ loading, error, data }: graphType) => {

                    if (loading) return <p>Loading...</p>;

                    if (error) return <p>Error!</p>;

                    return (
                        <React.Fragment>
                            {data.continents.map(({ code, name }: mapType) => (
                                <p key={code}>{name}</p>
                            ))}
                        </React.Fragment>
                    );
                }}
            </Query>
        </React.Fragment>
    );
}
```
## ๐ ์ถ์ฒ
- <a href="https://velog.io/@gwak2837/Apollo-Client-React%EB%A1%9C-GraphQL-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-1">Apollo Client (React)๋ก GraphQL ํด๋ผ์ด์ธํธ ๊ฐ๋ฐํ๊ธฐ (1)</a>
