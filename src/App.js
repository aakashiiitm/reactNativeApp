import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then((result) => {
          setResources(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }, []);

  function deleteResource(resource, index) {
    let tempArray = resources;
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
      //Actual delete functionality
      tempArray.splice(index, 1);
      setResources([])
      setResources(tempArray)      
    },
    (error) => {
      console.log(error)
    });
  }

  function editResource(resource, index) {
    let tempArray = resources;
    const reqData = {
      method: 'PATCH',
      body: {
          'title': 'newTitle',
          'body': 'newBody',
          'userId': resource.userId
        }
    }
    fetch("https://jsonplaceholder.typicode.com/posts/" + resource.id, reqData).then((response) => {
      return response.json();
    }).then((result) => {
      tempArray[index] = reqData.body
      tempArray[index].id = resource.id
      setResources([])
      setResources(tempArray)
    },
    (error) => {
      console.log(error)
    });
  }

  return (
    <div>
      <div className="header">
        <h1>React Assignment for Decathlon</h1>
      </div>
      <div className="row">
        {resources.map(function(resource, index){
          return (
            <div className="col-6 col-s-9">
              <h1>{resource.title}</h1>
              <p>{resource.body}</p>
              <button className="editButton" onClick={() => editResource(resource, index)}>Edit Button</button>
              <button className="deleteButton" onClick={() => deleteResource(resource, index)}>Delete Button</button>
            </div>
        )})}
      </div>
    </div>
  );
}

export default App;
