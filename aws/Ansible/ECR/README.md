# 참고 사이트
- ansible vpc 생성 : https://docs.ansible.com/ansible/2.3/ecs_ecr_module.html
- repository 삭제 : https://stackoverflow.com/questions/47573616/how-to-delete-aws-ecs-repositories-which-contain-images-using-ansible


## 실행
- ansible playbook 실행
```
ansible-playbook ecr-create.yml -e "name=hello/world"
```
name으로 설정하는 문자열의 이름을 가진 repository가 됨
name을 설정하지 않고 palybook 실행 시, `up/down` 이라는 이름의 repository가 생성됨


```
ansible-playbook ecr-destroy.yml -e "name=super/cool"
```
name으로 설정하는 문자열의 이름을 가진 repository가 삭제됨. 삭제하려는 repository에 image가 이미 존재하면 삭제 불가


```
ansible-playbook ecr-destroy-force.yml -e "name=hello/world"
```
name으로 설정하는 문자열의 이름을 가진 repository가 삭제됨. 삭제하려는 repository에 image가 이미 존재해도 강제로 삭제



## docker login
`ecr-create.yml`플레이북을 실행하면 `ecr-login.sh`이 실행되고, 생성된 aws ECR에 대한 docker login을 자동으로 수행.
수행 결과, `~/.docker/config.json`이 생성됨. 


## 생성되는 resource
- ECR

## 생성되는 파일
- config.json : 자격증명파일
