# 참고 사이트
- ansible vpc, instance 생성 : https://honglab.tistory.com/44
- region 별 instance type 확인 : https://blog.voidmainvoid.net/390


## 설치 방법
- 참고 : https://brunch.co.kr/@topasvga/759

## 사전 작업
- aws credential 설정
```
$ cat ~/.aws/credentials 
[default]
aws_access_key_id = <your access key>
aws_secret_access_key = <your secret key>
```

- ansible 환경변수 등록
```
export AWS_SECRET_ACCESS_KEY=zNxiejQisR7mrA/6BZWdgjh3J/BkeBKobOdZGWWd
export AWS_ACCESS_KEY_ID=AKIAVYDYMS3K3ZDNCCNX
```

## 실행
- ansible playbook 실행
```
ansible-playbook vpc-instance-all.yml
```

## 생성되는 resource
- VPC
- Gateway
- Public Subnet
- Routing Table
- Security Group
- EC2 key
- private key : `/home/ec2-user/.ssh/testkey.pem` 으로 저장
- 
