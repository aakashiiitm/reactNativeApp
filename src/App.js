import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then((result) => {
          setResources(result)
          console.log(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }, []);

  function deleteResource(resource) {
    const reqData = {
      method: 'DELETE',
      body: {
          'title': resource.title,
          'body': resource.body,
          'userId': resource.userId
        }
    }
    fetch("https://jsonplaceholder.typicode.com/posts/" + resource.id, reqData).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result)      
    },
    (error) => {
      console.log(error)
    });
  }

  function editResource(resource) {
    const reqData = {
      method: 'PATCH',
      body: {
          'title': 'newTitle',
          'body': 'newBody',
          'userId': 123
        }
    }
    fetch("https://jsonplaceholder.typicode.com/posts/" + resource.id, reqData).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result)      
    },
    (error) => {
      console.log(error)
    });
  }

  return (
    <body>
      <div class="header">
        <h1>React Assignment for Decathlon</h1>
      </div>

      <div class="row">
        {resources.map(function(resource, index){
          return (
            <div class="col-6 col-s-9">
              <h1>{resource.title}</h1>
              <p>{resource.body}</p>
              <button class="editButton" onClick={() => editResource(resource)}>Edit Button</button>
              <button class="deleteButton" onClick={() => deleteResource(resource)}>Delete Button</button>
            </div>
        )})}
      </div>
    </body>
  );
}

export default App;
