
# Install
I’m using Windows systems, you may need to download a Bash emulator (gitbash).

## **Pre Requirement**
1. Download and install gitbash.
2. install jdk 81. 
- run env
- click on Edit environment variables for your account
- Click on the New button and enter“JAVA_HOME” as variable name and the [java_install_dir] as variable value. 
- JAVA_HOME
- C:\Program Files\Java\jdk1.8.0_321
- Click on the New button and enter “PATH” as variable name and “%JAVA_HOME%\bin” as variable value. Click OK to save.

## To Run fluree
- Download the lastest stable version of fluree.
- In the Gitbash go to your directory. This is for me:
- cd D:\GeorgeBrown\Project\fluree-0.16.1
- run command:
-  ./fluree_start.sh
- Open http://localhost:8080/1. 

## Transact
1. Create a ledger by using "create new ledger" tab in my case called test/db1
Once the ledger has been created the next step is to build your schema. Schemas in Fluree consist of collections and predicates Add collections, predicates, and data.


### Adding Collections
1. go to FlureeQL, and then hit the Transact button on the top right corner
 past your JSON Collection in the Transaction body
then execute.

This is sample JSON:
```json
[
  {
    "_id": "_collection",
    "name": "person"
  },
  {
    "_id": "_collection",
    "name": "chat"
  },
  {
    "_id": "_collection",
    "name": "comment"
  },
  {
    "_id": "_collection",
    "name": "artist"
  },
  {
    "_id": "_collection",
    "name": "movie"
  }
]
```

2. Adding Predicates and Sample Data
do the same way as you did for Collection:

This is sample Predicates JSON:
```json
[
  {
    "_id": "_predicate",
    "name": "person/handle",
    "doc": "The person's unique handle",
    "unique": true,
    "type": "string"
  },
  {
    "_id": "_predicate",
    "name": "person/fullName",
    "doc": "The person's full name.",
    "type": "string",
    "index": true
  },
  {
    "_id": "_predicate",
    "name": "person/age",
    "doc": "The person's age in years",
    "type": "int",
    "index": true
  },
  {
    "_id": "_predicate",
    "name": "person/follows",
    "doc": "Any persons this subject follows",
    "type": "ref",
    "restrictCollection": "person"
  },
  {
    "_id": "_predicate",
    "name": "person/favNums",
    "doc": "The person's favorite numbers",
    "type": "int",
    "multi": true
  },
  {
    "_id": "_predicate",
    "name": "person/favArtists",
    "doc": "The person's favorite artists",
    "type": "ref",
    "restrictCollection": "artist",
    "multi": true
  },
  {
    "_id": "_predicate",
    "name": "person/favMovies",
    "doc": "The person's favorite movies",
    "type": "ref",
    "restrictCollection": "movie",
    "multi": true
  },
  {
    "_id": "_predicate",
    "name": "person/user",
    "type": "ref",
    "restrictCollection": "_user"
  },
  {
    "_id": "_predicate",
    "name": "chat/message",
    "doc": "A chat message",
    "type": "string",
    "fullText": true
  },
  {
    "_id": "_predicate",
    "name": "chat/person",
    "doc": "A reference to the person that created the message",
    "type": "ref",
    "restrictCollection": "person"
  },
  {
    "_id": "_predicate",
    "name": "chat/instant",
    "doc": "The instant in time when this chat happened.",
    "type": "instant",
    "index": true
  },
  {
    "_id": "_predicate",
    "name": "chat/comments",
    "doc": "A reference to comments about this message",
    "type": "ref",
    "component": true,
    "multi": true,
    "restrictCollection": "comment"
  },
  {
    "_id": "_predicate",
    "name": "comment/message",
    "doc": "A comment message.",
    "type": "string",
    "fullText": true
  },
  {
    "_id": "_predicate",
    "name": "comment/person",
    "doc": "A reference to the person that made the comment",
    "type": "ref",
    "restrictCollection": "person"
  },
  {
    "_id": "_predicate",
    "name": "artist/name",
    "type": "string",
    "unique": true
  },
  {
    "_id": "_predicate",
    "name": "movie/title",
    "type": "string",
    "fullText": true,
    "unique": true
  }
]
```

This is sample Data JSON:
```json
[
  {
    "_id": "person$jdoe",
    "handle": "jdoe",
    "fullName": "Jane Doe",
    "age": 25,
    "favNums": [1223, 12, 98, 0, -2],
    "favArtists": ["artist$1", "artist$2", "artist$3"],
    "follows": "person$zsmith",
    "favMovies": ["movie$1", "movie$2", "movie$3"]
  },
  {
    "_id": "person$zsmith",
    "handle": "zsmith",
    "fullName": "Zach Smith",
    "age": 63,
    "favNums": [5, 645, 28, -1, 1223],
    "favArtists": ["artist$1"],
    "follows": "person$jdoe",
    "favMovies": ["movie$2", "movie$3"]
  },
  {
    "_id": "person$anguyen",
    "handle": "anguyen",
    "fullName": "Amy Nguyen",
    "age": 34,
    "favNums": [7, 98, 0, 2],
    "favArtists": ["artist$2", "artist$3"],
    "follows": "person$jdoe",
    "favMovies": ["movie$3"]
  },
  {
    "_id": "person$dsanchez",
    "handle": "dsanchez",
    "fullName": "Diana Sanchez",
    "age": 70,
    "favNums": [9, 1950],
    "favArtists": ["artist$2"],
    "follows": "person$anguyen",
    "favMovies": ["movie$1", "movie$2", "movie$3"]
  },
  {
    "_id": "chat",
    "message": "Hi! I'm chat from Jane.",
    "person": "person$jdoe",
    "instant": "#(- (now) 20000)",
    "comments": ["comment$zsmith", "comment$anguyen"]
  },
  {
    "_id": "chat",
    "message": "Hi! I'm a chat from Diana.",
    "person": "person$dsanchez",
    "instant": "#(- (now) 5000)",
    "comments": ["comment$zsmithagain", "comment$anguyenagain"]
  },
  {
    "_id": "chat",
    "message": "Hi! I'm a chat from Zach.",
    "person": "person$zsmith",
    "instant": "#(now)"
  },
  {
    "_id": "comment$zsmith",
    "message": "Zsmith is responding!",
    "person": "person$zsmith"
  },
  {
    "_id": "comment$anguyen",
    "message": "Hi Jane!",
    "person": "person$anguyen"
  },
  {
    "_id": "comment$zsmithagain",
    "message": "Welcome Diana!",
    "person": "person$zsmith"
  },
  {
    "_id": "comment$anguyenagain",
    "message": "Welcome Diana! This is Amy.",
    "person": "person$anguyen"
  },
  {
    "_id": "artist$1",
    "name": "Gustav Klimt"
  },
  {
    "_id": "artist$2",
    "name": "Augusta Savage"
  },
  {
    "_id": "artist$3",
    "name": "Jean-Michel Basquiat"
  },
  {
    "_id": "movie$1",
    "title": "The Shawshank Redemption"
  },
  {
    "_id": "movie$2",
    "title": "Hot Fuzz"
  },
  {
    "_id": "movie$3",
    "title": "Gran Torino"
  }
]
```

## Query

Run queries on the collection

go to the FlureeQL on the left side pane.
hit the Query Button
in the Query body, run the following query 
```
{
  "select": [
    "*"
  ],
  "from": "movie"
}
```


------------


![My Remote Image](https://i.postimg.cc/WzZsqZdR/Fluree-Schema.jpg)

------------


![My Remote Image](https://i.postimg.cc/cCRv32zB/Fluree-Query.jpg)








