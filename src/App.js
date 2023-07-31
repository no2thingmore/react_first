import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  // console.log("props:", props);
  return (
    <header>
      <h1><a href="/" onClick={event=>{
          event.preventDefault();
          props.onChangeMode();
        }
      }>{props.title}</a></h1>
      <p>{props.body}</p>
    </header>
  );
}

function Nav(props){
  console.log("props:", props);
  //<li><a href="/read/1">html</a></li>
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let topic = props.topics[i];
    lis.push(<li key={topic.id}><a id={topic.id} href={"/read/"+topic.id} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));
        }
      }>{topic.title}</a></li>
    );
  }
  // props.topics.map((topic)=>{
  //   console.log("topic:", topic.id);
  //   lis.push(<li key={topic.id}><a href={"/read/"+topic.id}>{topic.title}</a></li>);
  // });
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props){
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

// 예제 8-3 Create 컴포넌트와 폼 만들기 p.85
function Create(props) {
    return <article>
        <h2>입력하기</h2>
        <form onSubmit={(event)=>{
            event.preventDefault();
            props.onCreate(event.target.title.value, event.target.body.value);
        }}>
            {/* 예제 8-4 Create 컴포넌트 만들기 - 제목 입력 폼 p.86 */}
            <p><input type="text" name="title" placeholder="title"></input></p>
            {/* 예제 8-5 Create 컴포넌트 만들기 - 내용 입력 폼 p.87 */}
            <p><textarea name="body" // textarea : 여러줄 표시, 이름 : body
            placeholder="body" // placeholder : body라고 지정해서 본문을 입력하는 폼
            >
            </textarea></p>
            {/* 예제 8-7 Create 컴포넌트 만들기 - 전송 버튼 p.89 */}
            <p><input type="submit" value="입력"></input></p>
        </form>
    </article>
}

function App() {
  const [mode, setMode] = useState("WELCOME"); //WELCOME, READ 
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([ 
  [
    {id:1, title:"html", body:"html is ..."},
    {id:2, title:"css", body:"css is ..."},
    {id:3, title:"js", body:"js is ..."}
  ]]);

  let content = null;
  if(mode === "WELCOME"){
    content = <Article title="Welcome" body="Hello, Web"></Article>
  }
  else if(mode === "READ"){
    let _title, _body = "";
    console.log(id);
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        _title = topics[i].title;
        _body = topics[i].body;
        break;
      }
    }
    console.log(_title, _body);
    content = <Article title={_title} body={_body}></Article>
    // 예제 8-2 mode가 CREATE일 때의 조건문추가 p.85
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
        //topics에 추가하기
        const newTopic = {id:4, title:"react", body:"react is ..."};
        topics.push(newTopic);
        setTopics(topics);
        console.log(_title, _body);
        console.log(topics);
    }}>

    </Create>
  }

  return (
    <div className="App">
      <Header title="제목입니다" body="목차입니다." onChangeMode={()=>{
        setMode("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode("READ");
        setId(_id);
      }}></Nav>
      {content}

      {/* 예제 8-1 생성페이지로 이동하는 링크 추가 */}
      <a href="/create" onClick={(event)=>{
        event.preventDefault();
        setMode("CREATE"); // create 모드 생성
      }
      }>
        Create
      </a>
    </div>
  );
}

export default App;
