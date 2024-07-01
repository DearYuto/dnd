# DND (DRAG AND DROP)

- Webpack을 직접 세팅하여 리액트 프로젝트 구성

- `react-beautiful-dnd` 라이브러리를 사용하여 드래그 앤 드롭 이벤트 구현

- 드래그앤드롭을 비허용하는 위치에 드래그 시 색상 변경 처리

  - 현재 코드에는 1번 컬럼에서 3번으로 이동 불가.
  - 짝수 번째 숫자를 가진 아이템 `앞`에 짝수 번째 아이템 이동 불가.

- react, react-beautiful-dnd 외 로직 구현을 위한 라이브러리 미사용

  (스타일링을 위한 styledComponents 제외)

## ✨ Preview

![Honeycam 2024-07-02 08-27-45](https://github.com/DearYuto/dnd/assets/154968122/29185d97-1196-47cb-89b4-faa07b67ae63)

## **프로젝트 실행 방법**

```
// 종속성 설치
npm i

// 개발 모드 실행
npm start

// 프로젝트 빌드
npm build
```

## 💎 기술 스택

<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-round&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-6EC0EB?style=flat-round&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/webpack-8DD6F9?style=flat-round&logo=webpack&logoColor=white"/> <img src="https://img.shields.io/badge/StyledComponents-CC6699?style=flat-round&logo=StyledComponents&logoColor=white"/>

## ⚽ 해결하지 못한 이슈 및 트러블슈팅

**1. 멀티 드래그 구현(미구현)**

![Honeycam 2024-07-02 08-30-10](https://github.com/DearYuto/dnd/assets/154968122/cf40cf7e-ab42-48e4-ae16-3aa7fbdf44dc)

초기 구현은 아이템의 부모 컴포넌트인 Column.tsx에서 클릭 이벤트를 달아 `이벤트 버블링`을 발생시켜 핸들링하고자 했으나, 컬럼 컴포넌트별 각각 다른 상태 값을 가지는 문제점을 인식했어요.

> **시도**

이에 최상위 부모 컴포넌트인 DragAndDropBoard.tsx로 상태 관리 로직 및 onClick 이벤트 로직을 이동시켰는데, 결국 Item 컴포넌트까지 상태 값을 내려주어야 어떤 아이템이 선택되었는지 핸들링할 수 있다는 점에서 프롭스를 내려주는 방식과 전역상태로 관리하는 방법 중 고민했고, Context로 관리하는 게 가독성 측면에서 더 좋을 것으로 생각하여 사용자가 클릭한 아이템을 상태관리하는 프로바이더를 구성했어요.

> **문제 인식**

사용자가 선택한 아이템에 대한 id 값을 배열로 관리하여 해당 id값의 아이템을 모두 찾아 dragEnd 이벤트가 발생했을 때 위치를 이동시키고자 했는데요,
문제는 여러 개의 아이템을 선택하고 드래그 이벤트를 발생시켜 다른 컬럼으로 이동 시켰을 때 최상위 부모 요소에 클릭 이벤트가 발생하여 ID 배열이 초기화되는 문제가 발생했어요.
이는 useEffect를 사용해 click 이벤트가 범위 밖에서 발생했을 때 선택 해제를 구현하기 위해 넣은 로직으로 인해 사이드 이펙트가 발생했어요.

> **아직 해결하지 못했지만, 예상 해결 방법**

이 문제는 드래그가 끝나는 시점에는 클릭 이벤트 발생을 무시하는 방법으로 해결해볼 수 있을 것으로 예상해요.
