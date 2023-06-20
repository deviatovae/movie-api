**To run the project :**

1. Copy `.env.example` to `.env`
2. Run `docker-compose up -d`
3. Enjoy this super API!

## Usage
- **User**
    - [Auth](#auth)
- **User**
    - [Create](#create-user)

- **Movies**
    - [Get list](#get-movies)
    - [Get one](#get-movie)
    - [Create](#add-movie)
    - [Update](#update-movie)
    - [Delete](#delete-movie)
    - [Rate](#rate-movie)

**Auth**
----
Authorizes user and returns JWT token

`POST` **/users/auth**

<details>

* **Headers**

    - **Content-Type:** `application/json`


* **Body**
    ```json
     {
        "email": "test@gmail.com",
        "password": "test"
     }
    ```
---

</details>

**Create User**
----
`POST` **/users**
Creates a new user

<details>

* **Headers**

    - **Content-Type:** `application/json`


* **Body**
    ```json
     {
    "email": "test@mail.ru",
    "password": "test1234",
    "name": "Test User"
     }
    ```
---

</details>


**Get Movies**
----

`GET` **/movies**

Returns the list of all movies

* **Params**

  - `sort: asc | desc`

* **Response**
```json
[
  {
    "id": "6491b7463128ca877e87a081",
    "name": "Titanic",
    "description": "An all-timer",
    "rating": 10
  },
  {
    "id": "6491b8f60346eddcf7a62979",
    "name": "Die Hard",
    "description": "The best action movie",
    "rating": 9.8
  }
]
   ```

**Get Movie**
----

`GET` **/movies/:id**

Returns one movie by its id

```json
     {
        "id": "6491b7463128ca877e87a081",
        "name": "Titanic",
        "description": "An all-timer",
        "rating": 10
     }
   ```

**Add movie**
---
`POST` **/movies**

Adds a new movie

<details>

* **Headers**

    - **Content-Type:** `application/json` [required]
    - **Authorization:** `Bearer <User JWT token>` [required]
---
* **Body**
  ```json
  {
  "name": "Home Alone",
  "description": "An absolute thrill, especially close to X-mas"
  }
  ```
</details>

---

**Update movie**
---
`PUT` **/movies/:id**

Updates information about the movie by its id

<details>

* **Headers**

    - **Content-Type:** `application/json` [required]
    - **Authorization:** `Bearer <User JWT token>` [required]
---
* **Body**
  ```json
  {
  "name": "Home Alone 2",
  "description": "Another beautiful story about Kevin's adventures"
  }
  ```
</details>

---
**Delete movie**
---

`DELETE` **/movies/:id**

Deletes the movie by its id

* **Headers**

    - **Content-Type:** `application/json` [required]
    - **Authorization:** `Bearer <User JWT token>` [required]

---
* **Success response** - `200 OK`

---
**Rate movie**
---
`POST` **/movies/:id/rate**

Adds rating form 1 to 10 to the movie

<details>

* **Headers**

    - **Content-Type:** `application/json` [required]
    - **Authorization:** `Bearer <User JWT token>` [required]
---
* **Body**
  ```json
  {
  "rating": 10
  }
  ```
</details>
