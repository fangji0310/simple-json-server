# simple-json-server
This is JSON mock server.
It uses named url parameters and query parameters to filter response.

## how to use
```shell
$ docker-compose build
$ docker-compose up -d
$ curl http://localhost:28080/id/user1
```

## functionality
It uses named url parameters and query parameters to filter response.
You can difine your own strategy to filter response.

DefaultReponseStrategy is very simple. You can understand how to filter response by the following examples

### ex1.
In this case, you have 2 path configurations, includes two url parameters(:query1 and :query2).
#### configuration
```
{
  "routes" : [
    {"path": "/id/:query1"          , "method": "get", "repository": "./example"},
    {"path": "/id/:query1/:query2"  , "method": "get", "repository": "./example"},
  ]
}
```
#### dummy response file
/example/id/user1.json
```
{
  "id":1,
  "name":"user1",
  "detail": {
    "age": 10,
    "city" : "tokyo"
  }
}
```
#### response
```
$ curl http://localhost:28080/id/user1
{"id":1,"name":"user1","detail":{"age":10,"city":"tokyo"}}

$ curl http://localhost:28080/id/user1/detail
{"age":10,"city":"tokyo"}

```

### ex2.
In this case, you can understand how to use query parameters
#### configuration
```
{
  "routes" : [
    {"path": "/demo"                , "method": "get", "repository": "./example"},
    {"path": "/demo/:name"          , "method": "get", "repository": "./example", "strategy": "defaultStrategy"}
  ]
}
```
#### dummy response file
/example/demo.json
```
{
  "demo1": [{"id": 1, "name": "demo1", "age": 10},{"id": 2, "name": "demo1", "age": 15}],
  "demo2": [{"id": 3, "name": "demo2", "age": 20}]
}
```
#### response
```
$ curl http://localhost:28080/demo
{"demo1":[{"id":1,"name":"demo1","age":10},{"id":2,"name":"demo1","age":15}],"demo2":[{"id":3,"name":"demo2","age":20}]}

$ curl http://localhost:28080/demo/demo1
[{"id":1,"name":"demo1","age":10},{"id":2,"name":"demo1","age":15}]

$ curl http://localhost:28080/demo/demo2
[{"id":3,"name":"demo2","age":20}]

$ curl http://localhost:28080/demo/demo1?age=15
{"id":2,"name":"demo1","age":15}
```

## configuration
| name | value | remarks |
|:---|:---| :--- |
|path   | /id/:query1 | url |
|method | get         | HTTP method. it only supports get.|
|repository | ./example | the path which contains dummy response json files |
|strategy | (optional) defaultStrategy | strategy define how to use query parameter|
ex.
```
{
  "routes" : [
    {"path": "/id/:query1"          , "method": "get", "repository": "./example"},
    {"path": "/id/:query1/:query2"  , "method": "get", "repository": "./example"},
    {"path": "/demo"                , "method": "get", "repository": "./example"},
    {"path": "/demo/:name"          , "method": "get", "repository": "./example", "strategy": "defaultStrategy"}
  ]
}
```

## how to add custom strategy
1. implement your own custom strategy. this class should be child class of BaseResponseStrategy
2. Add your own strategy class in config/ResponseStrategyStore.ts
3. use your own strategy in routes.json

## TODO
- support POST method
