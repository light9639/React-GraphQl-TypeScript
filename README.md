# 📊 React TypeScript를 GraphQl을 이용하여 만든 예제입니다.

:octocat: 바로 가기 : https://light9639.github.io/React-GraphQl-TypeScript/

![light9639 github io_React-GraphQl-TypeScript_](https://user-images.githubusercontent.com/95972251/218047748-96ccea70-7a71-4802-a315-5bed2fe58df1.png)

:sparkles: 📊 React TypeScript를 GraphQl을 이용하여 만든 예제입니다. :sparkles:
## :tada: React 프로젝트 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt-SWC 선택하면 생성 완료.
## 🛰️ apollo-boost 및 react-apollo 라이브러리 설치
- apollo-boost 및 react-apollo 라이브러리 설치하기
```bash
$ npm install apollo-boost react-apollo
# or
$ yarn add apollo-boost react-apollo
```
## ✒️ main.tsx, App.tsx 수정 및 작성
### ⚡ main.tsx
- `ApolloProvider`를 `import` 한 후 `App` 파일을 감싼다.
- `ApolloClient`를 가져온 후 `uri` 부분에 데이터를 가져올 `Graphql` 링크를 입력한다.
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
### ⚡ App.tsx
- `Continents` 컴포넌트를 `import` 한 후 `App` 컴포넌트 안에 넣는다.
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
## 📝 components 파일 속 Continents.tsx 수정 및 작성
### ⚡ Continents.tsx
- `gql` 안에 `query`를 사용하여 데이터 속의 코드명과 이름을 `GET_CONTINENTS` 변수명에 할당한다.
- `graphType`이라는 타입을 설정한 뒤 타입을 지정해준다.
- `Query` 컴포넌트 안에 `query={GET_CONTINENTS}`를 입력하고 밑의 코드를 입력한다.
- 로딩중일 때는 `<p>Loading...</p>`, 에러가 났을 때는 `<p>Error!</p>`, 정상적일 경우에는 반복문이 실행된다.
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
