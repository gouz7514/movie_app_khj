# Movie App Practice

React JS Fundamentals Course
### 201022
nodejs, npm, npx 정리하기
> cd documents  
npx create-react-app my-app
`VSC에서 오픈할 때`
code my-app  
npm start

> git init  
git remote add origin github링크  
git add .  
git commit -m "commit message"  
git push origin master / main

나의 모든 react application을 div 사이에 집어넣는다  
React는 app.js component를 ElementById 내부에 집어넣으려고 한다.  
그래서 `index.html`에서 `id`를 바꾸면 에러 발생함.

이래서 React가 빠르다. 소스코드에 처음부터 HTML을 넣지 않고, HTML에서 HTML을 추가하거나 제거.  
`Virtual DOM`
<br>
### 201023
#### Component
![Component](https://images.velog.io/images/gouz7514/post/fcca1b6e-cc8f-4020-a845-b5173d07ec03/image.png)  
여기서 `<React.StritMode> ~~` 부분이 `Component`
React는 `Component`와 함께 동작한다.  
`Component`는 HTML을 반환하는 함수  
이렇게 JS와 HTML 사이의 조합을 `JSX`라고 부른다.  

React는 `Component`를 가져와서 브라우저가 이해할 수 있는 평범한 HTML로 만듦.  

#### Create My Own Component  
`Potato.js`
```
import React from "react";

function Potato() {
    return (
        <h3>I Love Potato</h3>
    )
}

export default Potato;
```
이거를 `index.js`에서 사용  
```
import Potato from './Potato';

ReactDOM.render(
  <React.StrictMode>
    <App /><Potato /> // 이 부분 유의
  </React.StrictMode>,
  document.getElementById('potato')
);
```

#### Reusable Component (JSX + Prop)  
Reusable Component  
Props 만들고 react magic에서 react는 우리가 전달한 props를 가져감  
children component로 정보를 보내면 react는 이 속성들을 가져다가 function에 argument로 넣음  
`props.fav` == `{fav}`  

### 201024  
#### Dynamic Component Generation  
위의 방식은 비효율적임  
```
import React from 'react';

function Food({name, picture}) {
  return <div>
    <h3>I Love {name}</h3>
    <img src={picture}/>
  </div>
}

const foodILike = [
  {
    name : "Chicken",
    image :
    "https://upload.wikimedia.org/wikipedia/commons/3/3e/Fried-Chicken-Leg.jpg"
  },
  {
    name : "Pizza",
    image :
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg"
  }
];

function App() {
  return (
    <div className="App">
      <h1>HELLO</h1>
      {foodILike.map(food => <Food name={food.name} picture={food.image}/>)}
    </div>
  );
}

export default App;
```
이런 식으로 `map` 함수를 이용해 `Dynamic Rendering` 가능
```
function renderFood(dish) {
  console.log(dish);
  return <Food name={dish.name} picture={dish.image} />
}

function App() {
  return (
    <div className="App">
      <h1>HELLO</h1>
      {foodILike.map(renderFood)}
    </div>
  );
}
```
위랑 같은 동작  
element들을 list 안으로 집어넣을 때 유일성을 잃어버린다.  
따라서, `key` 속성을 부여해줘야 함.  
```
function App() {
  return (
    <div className="App">
      <h1>HELLO</h1>
      {foodILike.map(food => <Food key={food.id} name={food.name} picture={food.image} />)}
    </div>
  );
}
```
**PropType check**  
`npm i prop-types` : 내가 전달받은 props가 내가 원하는 props인지 확인  
꼭 ! `proptypes`로 선언되어야 함  
[React - PropTypes](https://ko.reactjs.org/docs/typechecking-with-proptypes.html)

### 201026  
#### Class Components and State  
`state` : 동적 데이터와 함께 작업할 때 만들어짐. 변하는 데이터, 존재하지 않는 데이터  

React는 자동적으로 모든 `class component`의 `render method`를 실행하고자 함  
Why `class component`? : `state`  
`state`에 바꾸고 싶은 data를 넣는다.  
여기서 문제는 App에서 data를 어떻게 바꿀 것인지  

```
class App extends React.Component {
  state = {
    count  : 0
  }
  add = () => {
    console.log("add");
  };
  minus = () => {
    console.log("minus");
  };
  render() {
    return <div>
      <h1>The number is {this.state.count}</h1>
      <button onClick={this.add}>Add</button>
      <button onClick={this.minus}>Minus</button>
      </div>
  }
}
```  

`state` 상태 변경할 때 React는 render function을 호출해서 바꿔주길 원한다.  
**`setState`를 호출하면 react는 `state`를 refresh하고 render function도 호출함**  

### 201027  
#### Life Cycle Method  
`Mounting`  
Component가 website에 갈 때 Constructor를 호출  
이 후 Component가 render 할 때 componentDidMount  
`Updating`  
render -> componentDidUpdate  
`Unmounting`  
componentWillUnmount : component 사라질 때   

이론적으로 우리가 할 일은 componentDidMount에서 data를 fetch하는 것  

### 201029  
#### Fetch  
일반적으로 `fetch`를 통해 data를 받아오지만 `Axios` 도 있음.  
`axios` : fetch 위에 있는 작은 레이어  
`axios.get`은 속도가 빠르진 않아서 JS에게 `componentDidMount`끝날 때까지 시간이 걸릴 수 있다고 알려줘야 함  
`async`, `await` axios 끝날 때까지 기다렸다가 계속해  

`setState`를 통해 state에 movies 저장  
```
getMovies = async () => {
    const {data : {data : {movies}}} = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
    this.setState({movies, isLoading:false});
}

componentDidMount() {
    this.getMovies();
}
```

#### Movie.js 만들기  
Component가 state를 필요로 하지 않으면 class 될 필요 없음  
```
import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({id, year, title, summary, poster}) {
    return (<div class="movie">
        <img src={poster} alt={title} title={title} />
        <div class="movie__data">
            <h3 class="movie__title">{title}</h3>
            <h5 class="movie__year">{year}</h5>
            <p class="movie__summary">{summary}</p>
        </div>
        
    </div>)
}

Movie.propTypes = {
    id : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    summary : PropTypes.string.isRequired,
    poster : PropTypes.string.isRequired,
    year : PropTypes.number.isRequired,
}

export default Movie;
```

### 201031  
`Invalid DOM property error 'class'` : JSX 때문에 발생하는 에러.  
`App.js` 에서 `class` 선언 부분이 자바스크립트의 class랑 충돌함  

`map` 함수는 요소와 index를 동시에 제공. 이 index를 key로 사용해서 오류 없앨 수 있음.  
```
<ul className="genres">
{genres.map((genre, index) => <li key={index} className="genres__genre">{genre}</li>)}
</ul>
```
#### Deploying to Github Pages  
`npm i gh-pages`  
`https://gouz7514.github.io/movie_app_khj`  

**• package.json**  
Deploy를 위해 `package.json`에서 `homepage` 설정 필수  
그 다음 `npm run build` 해서 만들어진 build 폴더를 gh-pages에 업로드  
![npm run build 결과물](https://images.velog.io/images/gouz7514/post/b414f7b4-6bcc-4837-97c5-4ce748e4ec49/%EC%BA%A1%EC%B2%98.PNG)
```
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  }
```
`deploy`를 호출할 때마다, `predeploy`를 호출,  
`predeploy`는 `npm run build`,  
`build`는 `build script`를 호출,  
`script`는 나에게 `build` 폴더를 줌  
완료되면 `predeploy`는 끝  

`deploy`는 `gh-pages`를 호출하고 `build` 폴더를 업로드.  

### 201102  
#### Build Router  
`react-router dom` : 네비게이션 만들어주는 패키지  
router 위해 `components`와 `routes` 폴더로 나눔  

`App.js`에서 다음과 같이 라우터를 만들 수 있다.  
```
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";

function App() {
  return <HashRouter>
    <Route path="/" component={Home} />
    <Route path="/about" component={About}/>
  </HashRouter>
}

export default App;
```
하지만 이렇게 하면 2개의 컴포넌트가 동시에 렌더링되서 겹쳐보임.  

리액트 라우터는 기본적으로 url을 가져와서 라우터에 있는 모든 것과 비교한 뒤 매치가 되는 것을 보여줌.  
![home과 home/introduction 겹침](https://images.velog.io/images/gouz7514/post/5976b518-b317-454d-9a49-5e97a812bb9a/%EC%BA%A1%EC%B2%982.PNG)
`/home`과 `/home/introduction`이 겹침  

이걸 해결하기 위해 `exact={true}`를 사용  

#### Build Navigation  
`Navigation.js` 생성  
but, 매번 누를 때마다 로딩됨  

이걸 해결하기 위해 `Link` 사용  
`Navigation.js`  
```
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </div>
    );
}

export default Navigation;
```
**`Link`는 반드시 `Router` 안에!!**  

#### Sharing Props Between Routes  
라우터에 있는 모든 라우트들은 `props`를 가짐  
`App.js`에서 route 선언하고 `Movie.js`에서 보내면 `Detail.js`에서 props 받음  

But, 바로 `movie-detail` 페이지로 갈 경우 state가 undefined.  
이를 해결하기 위해 class 컴포넌트로 바꿈  

`Detail.js`  
```
import React from "react";

class Detail extends React.Component {
    componentDidMount() {
        const {location, history} = this.props;
        if (location.state === undefined) {
            history.push("./");
        }
    }
    render() {
        return <span>Hello Detail</span>
    }
}

export default Detail;
```
state가 undefined이면 Home 경로로 리다이렉트.  
경로 바꿔줄 수도 있음.  