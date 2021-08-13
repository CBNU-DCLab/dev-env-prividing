# 참고 사이트
- ansible vpc, instance 생성 스크립트 : https://honglab.tistory.com/44
- region 별 instance type 확인 : https://blog.voidmainvoid.net/390
- VPC, Subnet, Route 설정 : https://www.44bits.io/ko/post/understanding_aws_vpc
- ansible ec2_vpc example : https://runebook.dev/ko/docs/ansible/collections/community/aws/ec2_vpc_route_table_module

## 컨테이너 이미지 설명
`dind-custom` 컨테이너 이미지에는 아래와 같은 패키지가 설치되어 있음
- python3
- pip3, boto3, boto
- ansible
- aws cli
- packer
- git

## 컨테이너 실행방법
### Dockerhub로부터 컨테이너 이미지 다운로드
```
docker pull rudwns273/dind-custom:latest
```

### dind-custom 컨테이너 백그라운드 실행
```
docker run --privileged -d \
-e AWS_ACCESS_KEY_ID=<AWS ACCESS KEY> \
-e AWS_SECRET_ACCESS_KEY=<AWS SECRET ACCESS KEY> \
-e AWS_DEFAULT_REGION=<REGION NAME> \
--name dind \
rudwns273/dind-custom:latest
```
REGION NAME의 예시는 `ap-northease-2` 서울

## 실행순서
### 컨테이너 접속
```
docker exec -it dind sh
```

### github 코드 clone
```
cd ~
git clone https://github.com/CBNU-DCLab/dev-env-providing.git
```

### ECR 생성
```
cd dev-env-providing/aws/Ansible/ECR
ansible-playbook ecr-create.yml -e "name=hello/world"

(after ami created)

cat manifest.json 
{
  "builds": [
    {
      "name": "ubuntu-docker-ce",
      "builder_type": "amazon-ebs",
      "build_time": 1628497355,
      "files": null,
      "artifact_id": "ap-northeast-2:ami-00976b269d0019723",
      "packer_run_uuid": "39f29543-a872-13b2-322b-b2a56d31938e",
      "custom_data": null
    }
  ],
  "last_run_uuid": "39f29543-a872-13b2-322b-b2a56d31938e"
```
ECR을 생성하는 동시에 `/root/.docker/config.json` 파일 생성. 이 파일을 통해 ECR 사용이 가능

### Packer를 이용한 image 생성
```
cd ~/dev-env-providing/aws/Packer
packer build ami_create.json
```
실행 결과로 aws에 `~/.docker/config.json`파일이 포함되어 있고 `docker`, `docker-compose`가 설치된 ubuntu18.04 ami 이미지 생성.
ami 생성이 완료되면 `manifest.json`파일이 생성되고, 해당 파일에서 ami의 ID를 확인 가능(artifact_id)

### Ansible을 이용한 EC2 인스턴스 생성
```
ansible-playbook vpc-instance-all.yml \
-e "vpc_name=my_vpc" \
-e "vpc_cidr_block=10.1.0.0/16" \
-e "gateway_name=my_gateway" \
-e "subnet_name=my_subnet" \
-e "subnet_cidr_block=10.1.0.0/24" \
-e "routing_table_name=my_rt" \
-e "region=ap-northeast-2" \
-e "avail_zone_of_region=ap-northeast-2a" \
-e "security_group_name=my_sg" \
-e "key_name=my_key" \
-e "instance_name=myubuntu" \
-e "image_id=<manifest.json에서 확인한 ami ID>" \
-e "instance_type=t2.small" \
-e "instance_cnt=3"
```
생성되는 resource는 아래와 같음
- VPC
- Gateway
- Public Subnet
- Routing Table
- Security Group
- EC2 key
- private key : `/home/root/.ssh/`경로에 저장
- EC2 instance 생성 : `instance_cnt`로 설정한 개수만큼 생성

`vpc-instance-all.yml` 플레이북을 실행할 때, 위와같이 외부 변수와 변수 값을 설정하지 않으면 default로 설정된 아래와 같은 값들로 resource 생성
```
vpc_name: tmp_vpc_name
vpc_cidr_block: 10.0.0.0/16
gateway_name: tmp_gateway_name
subnet_name: tmp_subnet_name
subnet_cidr_block: 10.0.0.0/24
routing_table_name: tmp_routing_table_name
region: ap-northeast-2
avail_zone_of_region: ap-northeast-2a
security_group_name: tmp_security_group_name
key_name: tmp_key_name
instance_name: tmp_instance_name
image_id: ami-0ba5cd124d7a79612 # ubuntu18.04 of ap-northeast-2a
instance_type: t2.micro
instance_cnt: 1
```

## Deployment
build된 docker image를 자유롭게 배포 가능

## Built With

* [Penguin135](https://github.com/Penguin135) - README.md 작성, Docker Image 제작, Script 작성

## License / 라이센스

This project is licensed under the ISC License - see the [LICENSE.md](https://github.com/CBNU-DCLab/dev-env-providing/blob/main/aws/Ansible/EC2/LICENSE.md) file for details / 이 프로젝트는 MIT 라이센스로 라이센스가 부여되어 있습니다. 자세한 내용은 LICENSE.md 파일을 참고하세요.

## Acknowledgments / 감사의 말

* use for free
