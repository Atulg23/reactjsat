/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

// This sample uses an open source OAuth 2.0 library that is compatible with the Azure AD v2.0 endpoint.
// Microsoft does not provide fixes or direct support for this library.
// Refer to the library’s repository to file issues or for other support.
// For more information about auth libraries see: https://docs.microsoft.com/azure/active-directory/active-directory-v2-libraries
// Library repo: https://github.com/MrSwitch/hello.js

import React, { Component } from 'react';
import "./App.css";
import hello from 'hellojs';
import GraphSdkHelper from './helpers/GraphSdkHelper';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { BrowserRouter as Router } from "react-router-dom"; 
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { deepPurple, pink } from "@material-ui/core/colors";

import MainComponent from "./components/MainComponent/MainComponent";
// import PeoplePickerExample from './component-examples/PeoplePicker';
// import DetailsListExample from './component-examples/DetailsList';
import { applicationId, redirectUri } from './helpers/config';

window.hello = hello;
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: pink
  },
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        padding:'7px 17px 4px 23px',
        
      }
    }
  }
});
export default class App extends Component {
  constructor(props) {
    super(props);
    
    // Initialize the auth network.
    hello.init({
      aad: {
        name: 'Azure Active Directory',	
        oauth: {
          version: 2,
          auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
        },
        form: false
      }
    });
    
    // Initialize the Graph SDK helper and save it in the window object.
    this.sdkHelper = new GraphSdkHelper({ login: this.login.bind(this) });
    window.sdkHelper = this.sdkHelper;
// console.log(this.sdkHelper);
// console.log(window.sdkHelper);

    // Set the isAuthenticated prop and the (empty) Fabric example selection. 
    this.state = {
      isAuthenticated: !!hello('aad').getAuthResponse(),
      example: ''
    };
    // console.log(this.state.isAuthenticated);
    
  }

  // Get the user's display name.
  componentWillMount() {
    // console.log("will mount");
    
    if (this.state.isAuthenticated) {
      this.sdkHelper.getMe((err, me) => {
        // console.log(me);
        
        if (!err) {
          this.setState({
            //  displayName: `Hello ${me.displayName}!`
          });
        }
      });
    }
    
    
  }
 

  // Sign the user into Azure AD. HelloJS stores token info in localStorage.hello.
  login() {
    // console.log("in login");
    
    // Initialize the auth request.
    hello.init( {
      aad: applicationId
      }, {
      // redirect_uri: redirectUri,
      scope: 'user.readbasic.all+mail.send+files.read'
    });

    hello.login('aad', { 
      display: 'page',
      state: 'abcd'
    });
  }

  // Sign the user out of the session.
  logout() { 
    hello('aad').logout();
    this.setState({ 
      isAuthenticated: false,
      example: '',
      displayName: ''
    });
  }

  render() {
    return (
      <div>
       
             {/* {this.state.isAuthenticated ? */}
            
                <Router className='App'>
                     <MuiThemeProvider theme={theme} >
                       <MainComponent />
                     </MuiThemeProvider>
                   </Router>
             {/*
            <CommandBar
            items={[
              {
                key: 'component-example-menu',
                name: 'Choose component',
                disabled: !this.state.isAuthenticated,
                ariaLabel: 'Choose a component example to render in the page',
                items: [
                  {
                    key: 'people-picker-example',
                    name: 'People Picker',
                    onClick: () => { this.setState({ example: 'people-picker-example' }) }
                  },
                  {
                    key: 'details-list-example',
                    name: 'Details List',
                    onClick: () => { this.setState({ example: 'details-list-example' }) }
                  }
                ]
              }  
            ]}
            farItems={[
              {
                key: 'display-name',
                name: this.state.displayName
              },
              {
                key: 'log-in-out=button',
                name: this.state.isAuthenticated ? 'Sign out' : 'Sign in',
                onClick: this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)
              }
            ]} />
            
           }   */}
          </div>
        
    );
  }
}




// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router } from "react-router-dom"; 
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
// import { deepPurple, pink } from "@material-ui/core/colors";

// import MainComponent from "./components/MainComponent/MainComponent";


// const theme = createMuiTheme({
//   palette: {
//     primary: deepPurple,
//     secondary: pink
//   },
//   overrides: {
//     MUIDataTableBodyCell: {
//       root: {
//         padding:'7px 17px 4px 23px',
        
//       }
//     }
//   }
// });


// const App = () => {
//   return (
//       <Router className='App'>
//         <MuiThemeProvider theme={theme} >
//           <MainComponent />
//         </MuiThemeProvider>
//       </Router>
//   );
// };

// export default App;
