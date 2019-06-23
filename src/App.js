import React from 'react';
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

function App() {
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
      </div>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true })
