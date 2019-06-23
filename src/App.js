import React, { useState } from 'react';
import './App.css';
import { Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'

async function addToStorage() {
  await Storage.put('javascript/MyReactComponent.js', `
    import React from 'react'
    const App = () => (
      <p>Hello World</p>
    )
    export default App
  `)
  console.log('Code stored in S3!')
}

async function addToStorageHelloWorld() {
  await Storage.put(' helloworld.txt', 'Hello World')
  console.log('HelloWorld stored in S3!')
}

async function readFolderFromStorage(folder) {
  const data = await Storage.list(folder); // 'javascript'
  console.log('Folder: ', data);
}

async function readFileFromStorage(file) {
  const data = await Storage.get(file) // 'javascript/MyReactComponent.js'
  console.log('File: ', data)
}

async function readRootFromStorage() {
  const data = await Storage.list('')
  console.log('Root: ', data)
}

async function addFile(e) {
  console.log('Uploading...')
  if (!e || !e.target || !e.target.files) return;
  const file = e.target.files[0];
  //await Storage.put(file.name, file);
  await Storage.put('example.png', file);
  console.log('image successfully stored!')
}

function App() {
  const [imageUrl, updateImage] = useState('')

  async function fetchImage() {
    const imagePath = await Storage.get('example.png')
    updateImage(imagePath)
  }

  return (
    <div className="app">
      <div className="app-header">
          <div className="app-logo">
              <img src="https://aws-amplify.github.io/images/Logos/Amplify-Logo-White.svg" alt="AWS Amplify" />
          </div>
          <h1>Welcome to the Amplify Framework</h1>
      </div>
      <div className="app-body">
        <div>
          <button onClick={addToStorage}>Add Code To Storage</button>
          <button onClick={addToStorageHelloWorld}>Add Txt To Storage</button>
        </div>
        <div>
          <button onClick={readFolderFromStorage.bind(this, 'javascript')}>Read Folder</button>
          <button onClick={readFileFromStorage.bind(this, 'javascript/MyReactComponent.js')}>Read File</button>
          <button onClick={readRootFromStorage}>Read Root</button>
        </div>
        <div className="file-input-wrapper">
          <button className="btn">Upload File</button>
          <input type="file" accept='image' onChange={addFile}/>
        </div>
        <div>
          <div className="img"><img src={imageUrl} alt="" /></div>
          <button onClick={fetchImage}>Fetch Image</button>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true })
