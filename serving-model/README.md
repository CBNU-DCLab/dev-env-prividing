# AI Model Serving API using NodeJS-Express

AI model이 저장된 NodeJS 서버에서, REST API 형태로 wget을 통해 model을 다운받을 수 있도록하는 API 입니다.
AI model serving을 목적으로 만들었지만, 다른 형태의 파일을 serving하는 목적으로도 사용이 얼마든지 가능합니다.

## Getting Started

docker를 기반으로 실행하기 때문에, docker가 설치된 상태에서 수행합니다.

### Prerequisites / 선행 조건

아래 사항들이 설치가 되어있어야합니다.

- docker

### Installing / 설치

- image build

```
docker build -t model-serving:latest .
```

- run container

```
docker run -d -p 3000:3000 -v /home/user/models:/models --name node model-serving:latest
```


## Running the tests / 테스트의 실행

브라우저를 통해 `http://localhost:3000` 접속 또는 curl을 통해 사용방법을 확인할 수 있습니다.

```
$ curl http://localhost:3000

  <html>
  <head>
    <title>model serving API</title>
  <head>
  <body>
    <h3> list of models </h3>
    <p> /list/model <p>
    <br>
    <h3> download specific model using wget</h3>
    <p> /get/model/(model name)/(model version) <p>
    <br>
    <h3> download specific latest model using wget</h3>
    <p> /get/model/(model name) <p>
  </body>
  </html>
```

### model list 확인

컨테이너의 `/models`에 있는 model들의 목록을 확인합니다

```
$ curl http://localhost:3000/list/mode
```

### 최신 버전의 model을 다운로드 합니다

model의 이름 형식은 `<모델이름>-<모델버전>` 으로 정해져야 합니다.
해당 이름의 model이 존재하지 않으면 `404 Not Found`를 반환합니다.

```
$ wget http://localhost:3000/get/model/model
```

### 특정 버전의 model을 다운로드 합니다

model의 이름 형식은 `<모델이름>-<모델버전>` 으로 정해져야 합니다.
해당 이름의 model이 존재하지 않으면 `404 Not Found`를 반환합니다.

```
$ wget http://localhost:3000/get/model/model/1.1
```

## Deployment / 배포

build된 docker image를 자유롭게 배포 가능합니다

## Built With / 누구랑 만들었나요?

* [Penguin135](https://github.com/Penguin135) - README.md 작성, API 개발

## License / 라이센스

This project is licensed under the ISC License - see the [LICENSE.md](https://github.com/CBNU-DCLab/dev-env-providing/blob/main/serving-model/LICENSE.md) file for details / 이 프로젝트는 MIT 라이센스로 라이센스가 부여되어 있습니다. 자세한 내용은 LICENSE.md 파일을 참고하세요.

## Acknowledgments / 감사의 말

* use for free
