# 참고 사이트
- ansible vpc 생성 : https://docs.ansible.com/ansible/2.3/ecs_ecr_module.html


## 실행
- ansible playbook 실행
```
ansible-playbook ecr-create.yml
```

## docker login
`ecr-create.yml`플레이북을 실행하면 `ecr-login.sh`이 실행되고, 생성된 aws ECR에 대한 docker login을 자동으로 수행.
수행 결과, `~/.docker/config.json`이 생성됨. 


## 생성되는 resource
- ECR
