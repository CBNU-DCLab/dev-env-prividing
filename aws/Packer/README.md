# docker, docker-compose가 설치된 ubuntu18.04 ami 생성

### pre requiered
1. 컨테이너에 push, pull 등의 작업을 할 수 있는 자격증명 파일인 `config.json`이 `/root/.docker/`아래 위치에 존재해야함
2. aws는 region마다 지원하는 ami ID가 다르므로 `ap-northeast-2`가 아닌 경우, 직접 소스코드를 수정하고 해당 region에 유효한 `source_ami` ID로 수정필요

### 실행 방법
아래와 같이 packer 명령어를 사용하여 실행
```
packer build ami_create.json
```

### 결과

packer 명령어를 실행한 위치에 아래와 같은 내용의 `manifest.json`파일 생성
```
cat manifest.json 
{
  "builds": [
    {
      "name": "ubuntu-docker-ce",
      "builder_type": "amazon-ebs",
      "build_time": 1628474725,
      "files": null,
      "artifact_id": "ap-northeast-2:ami-0284bfcf888d18f70",
      "packer_run_uuid": "08283fd5-3d60-77d0-b530-67467947efa7",
      "custom_data": null
    }
  ],
  "last_run_uuid": "08283fd5-3d60-77d0-b530-67467947efa7"
}
```

### advanced
manifest 파일에 추가적으로 데이터를 추가하고 싶으면 아래와 같이 `custom_data` 추가
```
{
  "post-processors": [
    {
      "type": "manifest",
      "output": "manifest.json",
      "strip_path": true,
      "custom_data": {
        "my_custom_data": "example"
      }
    }
  ]
}
```
