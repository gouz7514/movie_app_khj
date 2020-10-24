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