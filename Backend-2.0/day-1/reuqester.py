import requests
import json


url = "http://localhost:8080/users"

first_name = input("first_name : ")
email = input("email : ")
age = int(input("age : "))

data = {
     'first_name':first_name,
     'email':email,
     'age':age
}

print("the data to be sent :",end=" ")
print(data)
data = json.dumps(data)
r = requests.post(url=url,data=data,headers={"content-type":"application/json"})

print(r.text)