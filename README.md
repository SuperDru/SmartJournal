# SmartJournal

## Requests
### There are all server methods and its description.
### It's assumed methods are without description have a similar form as the previous ones.

Groups:
- GET /groups
    ```json
    [
        {
            "guid": "9d8628f2-f9c3-4556-a5ac-be2697158669",
            "name": "group2",
            "days": [ true, false, false, false, true, false, false ],
            "startTimes": [ "14:00", "", "", "", "10:00", "", "" ],
            "duration": 100,
            "cost": 350
        },
        {
            "guid": "f1f52068-eeb0-460f-8fa0-253e820a4832",
            "name": "group1",
            "days": [ false, true, false, false, true, false, false ],
            "startTimes": [ "", "14:00", "", "", "10:00", "", "" ],
            "duration": 90,
            "cost": 300
        }
    ]
    ```
- POST /groups : Create new group
    - request:
    ```json
    {
        "name": "group2",
        "duration": 100,
        "cost": 350,
        "days": [ true, false, false, false, true, false, false ],
        "startTimes": [ "14:00", "", "", "", "10:00", "", "" ]
    }
    ```
    - response:
    ```json
    {
        "guid": "f1f52068-eeb0-460f-8fa0-253e820a4832",
        "name": "group1",
        "days": [ false, true, false, false, true, false, false ],
        "startTimes": [ "", "14:00", "", "", "10:00", "", "" ],
        "duration": 90,
        "cost": 300
    }
    ```
    
- PUT /groups/{id} : Update group
  - Url example: /groups/f1f52068-eeb0-460f-8fa0-253e820a4832
  - Body is same as POST
  - No response body

- DELETE /groups/{id} : Delete group
  - Url is same as PUT
  - No request body
  - No response body
  
- GET /groups/{id} : Get group
    ```json
    {
        "name": "group1",
        "days": [ false, true, false, false, true, false, false ],
        "startTimes": [ "", "14:00", "", "", "10:00", "", "" ],
        "duration": 90,
        "cost": 300
    }
    ```
   
Users:
 - GET /groups/{id}/users : Get users of group
    ```json
    [
        {
            "guid": "a4049e74-0d01-482c-b95b-e919b640e98f",
            "amount": 0,
            "dept": 0,
            "updatedAt": "2019-05-01T01:00:04.426441",
            "name": "NameUp",
            "surname": "SurnameUp",
            "patronymic": "Patronymic",
            "phoneNumber": "PhoneNumber",
            "email": "Email"
        },
        {
            "guid": "3c1426aa-a74b-43c1-a970-a3d7749341a2",
            "amount": 0,
            "dept": 0,
            "updatedAt": "2019-05-01T02:29:47.9645408+05:00",
            "name": "Name",
            "surname": "Surname",
            "patronymic": "Patronymic",
            "phoneNumber": "PhoneNumber",
            "email": "Email"
        }
    ]
    ```
 - POST /students : Create user
   - request
    ```json
    {
        "name": "Name",
        "surname": "Surname",
        "patronymic": "Patronymic",
        "email": "Email",
        "phoneNumber": "PhoneNumber"
    }
    ```
   - response
    ```json
    {
        "guid": "3c1426aa-a74b-43c1-a970-a3d7749341a2",
        "amount": 0,
        "dept": 0,
        "updatedAt": "2019-05-01T02:29:47.9645408+05:00",
        "name": "Name",
        "surname": "Surname",
        "patronymic": "Patronymic",
        "phoneNumber": "PhoneNumber",
        "email": "Email"
    }
    ```
 - PUT /students/{id} : Update user
 - DELETE /students/{id} : Delete user
 - GET /students/{id} : Get user
 - POST /students/assign : Assign user to group
    - request
    ```json
    {
        "UserId": "3c1426aa-a74b-43c1-a970-a3d7749341a2",
        "GroupId": "9d8628f2-f9c3-4556-a5ac-be2697158669"
    }
    ```
    no response body
  - DELETE /students/assign : Remove user from group
    - request
    ```json
    {
        "UserId": "3c1426aa-a74b-43c1-a970-a3d7749341a2",
        "GroupId": "9d8628f2-f9c3-4556-a5ac-be2697158669"
    }
    ```
    no response body
 
