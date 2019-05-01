import React from 'react';
import api from './api/coolstuff';
import FullSizePublication from './components/FullSizePublication';
import './style.css';

class App extends React.Component {

//e6f5c5a3-5623-4322-89ca-0ab60837d8b8 Commercial Investor
//66326420-2ef4-466b-85fb-a14647010d97 New Homes + Condos GTA
//b22ed976-e821-4773-b4f4-498199351a3a New Homes + Condos EDM
//7ccfd854-246f-49f1-badc-aefbc1003ace Student Renters Guide

  constructor(props){
    super(props)
    this.state = {config: {
      folderId: '7ccfd854-246f-49f1-badc-aefbc1003ace'
    }, bookName: ''}

  }
  
  getListOfBookmarks = () =>{
    const additional_params = {
      format: 'json',
      folderId: this.state.config.folderId,
      bookmarkSortBy: 'created',
      resultOrder: 'desc'
    }
    const params = new api.create_base_parameters_obj('issuu.bookmarks.list', api.api_key, additional_params)
    const api_call = api.add_custom_params(params)
    api.call_issuu(api_call).then((res)=>{
      this.setState({'bookName': res.data.rsp._content.result._content[0].bookmark.name})
      console.log(this.state)
    }).catch((err)=>{console.log(err)})
  }

  componentDidMount(){
    this.getListOfBookmarks()
  }

  render() {
    return (
      <div>
        <FullSizePublication bookName={this.state.bookName}></FullSizePublication>
      </div>
    );
  }
}

export default App;
