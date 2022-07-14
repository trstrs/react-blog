import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const blogLogo = 'BlogLogo';

  // 블로그 포스팅 state
  const [postState, setPostState] = useState([
    {
      id : 11,
      subject: "포스팅 제목 테스트 1",
      date: "2022-07-13",
      like: 7
    },
    {
      id: 9,
      subject: "블로그 디자인이 좀 별로네요~ ㅎㅎ",
      date: "2022-07-05",
      like: 1
    },
    {
      id: 5,
      subject: "안녕하세요... 리액트 array of objects 정렬 어떻게 하나요 ㅜ",
      date: "2022-06-11",
      like: 2
    },
    {
      id : 1,
      subject: "다음은 블로그 포스팅 정렬을 해볼 차례입니다",
      date: "2022-05-23",
      like: 48
    },
  ]);

  // 정렬 버튼 state
  const [postSortBtnState, setPostSortBtnState] = useState([
    {
      type: 'subject',
      text: '제목순',
      isActive: false,
    },
    {
      type: 'like',
      text: '좋아요순',
      isActive: false,
    },
    {
      type: 'date',
      text: '날짜순',
      isActive: true,
    },
  ]);

  /* 
    위와 같은 array of objects useState update 하는 방법?
    1. 엘리먼트에 직접 setState 함수를 넣는 방법
    2. 아래처럼 따로 함수를 만드는 방법
  */

  // 개인적으론 이렇게 하는 게 가장 깔끔한거 같은데 실제론 어떻게 많이 쓰는지 모르겠다
  function postLikeClick(changePostId) {

    const newPostState = [...postState];

    newPostState.map(post => {

      if (post.id === changePostId) {
        post.like++;
      }
      
      return post;
    });

    setPostState(newPostState);
  }

  // array of objects useState update 이렇게도 할 수 있고
  /*
  function postLikeClick(changePostId){
    
    const newPostState = postState.map((post) => {

      if (post.id == changePostId) {
        return { ...post, like: post.like + 1 };
      }
      else {
        return post;
      }
    })

    setPostState(newPostState);
  }
  */

  // 객체 배열 정렬 때문에 머리 깨지는 줄.. javascript 좀 더 자세한 공부가 필요할 듯
  function postSort(sortType) {

    const newPostSortBtnState = [ ...postSortBtnState ];
    const newPostState = [ ...postState ];

    // 정렬 버튼 active
    newPostSortBtnState.map(sortBtn => {
        
      if (sortBtn.type == sortType) {
        sortBtn.isActive = true;
      }
      else {
        sortBtn.isActive = false;
      }
      
      return sortBtn;
    });

    // 제목 오름차순 정렬
    if (sortType == 'subject') {

      newPostState.sort((a, b) => {

        const subjectA = a.subject.toUpperCase();
        const subjectB = b.subject.toUpperCase();

        if (subjectA < subjectB) {
          return -1;
        }

        if (subjectA > subjectB) {
          return 1;
        }

        return 0;
      });
    }

    // 날짜 내림차순 정렬
    if (sortType == 'date') {

      newPostState.sort((a, b) => {

        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
   
        return dateB - dateA;
      });
    }

    // 좋아요 내림차순 정렬
    if (sortType == 'like') {
      
      newPostState.sort((a, b) => {
        return b.like - a.like;
      });
    }

    setPostSortBtnState(newPostSortBtnState);
    setPostState(newPostState);
  }

  return (
    <div className="blog_container">
      <div className="header">
          <a href="/" className="logo"><img src={ logo }></img>React Blog</a>
      </div>
      <div className="post_sort">
        <div>정렬</div>
        <div>
          {
            postSortBtnState.map(sortBtn => {
              return (
                <span key={ sortBtn.type } className={ sortBtn.isActive ? "post_sort_date active" : "post_sort_date" } onClick={ () => { postSort(sortBtn.type); } }>{ sortBtn.text }</span>
              );
            })
          }
        </div>
      </div>
      <ul className="post_list">
        {
          postState.map(post => {
            return (
              <li key={ post.id }>
                <a href="/">
                  <h4 className="post_subject">{ post.subject }</h4>
                </a>
                <div className="post_info">
                  <div className="post_date">{ post.date }</div>
                  {/* 엘리먼트에 직접 setState 함수를 넣는 방법. 따로 함수를 만들 필요가 없는게 장점인듯
                  <div className="post_like" onClick={ () => { setPostState(postState.map(prevPost => (prevPost.id === post.id) ? { ...prevPost, like: prevPost.like + 1 } : prevPost)); } }>
                  */}
                  {/* 함수를 따로 만드는 방법. 귀찮긴하지만 이게 가독성이나 관리 면에서 더 좋은듯 */}
                  <div className="post_like" onClick={ () => { postLikeClick(post.id); } }>
                    <i>👍</i>
                    <span>{ post.like }</span>
                  </div>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default App;
