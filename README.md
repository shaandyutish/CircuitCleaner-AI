## **🚀 To Run** 

```
In the app directory in CMD 

uvicorn app:app --reload
```
```
You should now see:

Uvicorn running on http://127.0.0.1:8000
```
```
Then open:

http://127.0.0.1:8000/docs

Swagger UI should load correctly.
```

```
Open Swagger

Go to:

http://127.0.0.1:8000/docs

NOT just /

You should see the Swagger UI.
```


## 🧪 How to Test

```
* Click POST /enhance

* Click Try it out

* Upload an image

* Enter one of these modes:
    * clean
    * vector
    * noise
    * pro
    * negative

* Click Execute

You should receive a PNG image response.
```