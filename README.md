
# Inverted Index

## Introduction

Inverted index takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## Key Features

* Supports Upload of JSON file created following the format displayed below:

```
[
    {"title": "Required",
    "text":"Do include some content on the subject matter."
    },
    {"title": "eg. Checkpoint 1",
    "text": "This Checkpoint is called inverted Index."
    }
]
```

* Creates an Index for any selected JSON file.

* Searching of a specific JSON file or all indexed JSON files.


## Local Installation Guide
* Clone the repository
* Install the dependencies using  `npm install`
* Run `gulp loadApp` to start the application.
* The app will start on your local server.
* Run tests with: `gulp testApp`

## Technologies

* EcmaScript 6 (JavaScript 2015)
* Node.js
* Angular.js
* Gulp (Task Runner)
* Karma (Generates Test Coverage Folder)


## Contributing

* Fork this repositry to your account.
* Clone your repositry: git clone git@github.com:your-username/inverted-index.git
* Create your feature branch: git checkout -b new-feature
* Commit your changes: git commit -m "did something"
* Push to the remote branch: git push origin new-feature
* Open a pull request.