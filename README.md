
## J-MOVIE
<p>React의 숙련도를 쌓기 위해 넷플릭스를 참고하여 만든 영화를 시청할 수 있는 사이트입니다.</p>
<p>공부 목적으로 개발한 프로젝트이며 back-end 작업 없이 오로지 Front-end로 개발하였습니다.</p>

## :calendar: 기간 / 인원
<p> (2023-05-19 ~ 2023-07-30) Front-end 1명 </p>


## :hammer: Tools
<pre>
  <Strong>* Front-End</Strong><br>
    > React | JavaScript | HTML/CSS<br>
  <Strong>* State Management</Strong><br>
    > Redux ToolKit<br>
  <Strong>* Infrastructure</Strong><br>
    > Amazon EC2<br>
  <Strong>* Web Server</Strong><br>
    > Nginx
</pre>

## 결과화면 및 주요 구현사항
#### * 프로젝트 특성상 영화 제공이 불가하여 예고편 영상으로 대체.
#### * 예고편을 제공하지 않는 영화가 대다수이므로 28개의 예고편 영상 URL을 json형식으로 프로젝트 내부에 담아서 random하게 사용(새로고침 시 재생되는 영화가 달라짐).
#### * 시청 이력이 저장된 영화는 이어서 볼 수 있도록 URL을 저장하여 사용.
#### * 영화는 서버 작업 없이 예고편 URL을 가져와 video태그로 보여줌.
#### * chrome 정책상 소리를 켜면서 자동 재생 기능을 구현하는게 불가능하여 아래와 같이 설정해줘야 함.
#### * 설정하지 않을 경우 유저의 상호 작용이 없으면 영상이 재생되지 않음.
<pre>
chrome 브라우저 설정 > 개인 정보 보호 및 보안 > 사이트 설정 > 추가 콘텐츠 설정 > 소리 > 소리 재생 허용(URL 등록)<br>
<img width="513" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/6af06a82-58a7-4a0f-b7b3-22731a32756d">
</pre>

<pre>
J-MOVIE URL : <a href='http://ec2-18-183-76-123.ap-northeast-1.compute.amazonaws.com/'>http://ec2-18-183-76-123.ap-northeast-1.compute.amazonaws.com/</a>
</pre>

<br>
<p><Strong>1. ID는 한 글자 이상 입력하고 비밀번호는 4~60자리로 입력하여 로그인 가능. 구글 계정 로그인 가능하도록 구글 로그인 구현</Strong></p>
<p>
<img width="450" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/75aeadc4-2bda-4431-b00c-6fa002859bf4">
<img width="377" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/5fe4ebf6-d92a-47e7-8af4-c9c1930ddf20">
</p>
<br><br>
<p><Strong>2. 영화 카드 리스트는 KMDb에 axios로 API요청하여 Redux Toolkit로 상태 관리를 하고 Swiper.js를 이용하여 페이징 구성</Strong></p>
<img width="900" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/0e45ef83-045a-47ec-af4c-578082b581d7">
<img width="900" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/c40b5a1c-a05b-4fe1-9895-65668bc5009d">
<br><br>
<p><Strong>3. 스크롤이 끝에 도달하기 전 영화들을 더 불러오는 인피니티 스크롤 구현</Strong></p>
<img width="900" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/76c5671f-a61b-4ddc-97eb-963caa84279c">
<br><br>
<p><Strong>4. 영화 제목으로 검색할 수 있는 검색 기능 구현</Strong></p>
<img width="1280" alt="검색" src="https://github.com/k-min-ju/react_project/assets/105032845/4fe369b0-0d2f-4546-ac24-9d652cfc9d6e">
<br><br>
<p><Strong>5. localStorage를 사용하여 영화를 이어서 볼 수 있도록 시청 이력 저장</Strong></p>
<img width="1200" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/baae1f43-1f69-49ad-bb90-1ff6c90f7740">
<br><br>
<p><Strong>6. 영화 재생</Strong></p>
<img width="1270" alt="image" src="https://github.com/k-min-ju/react_project/assets/105032845/1a456e2b-f0f0-4051-9f75-12111b1fa4eb">

