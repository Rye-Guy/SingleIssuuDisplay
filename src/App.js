import React from 'react';
import api from './api/coolstuff';
import FullSizePublication from './components/FullSizePublication';
import './style.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {config: {
      documentId: '',
      folderId: '6fce4bc8-130e-47de-82bb-a62aadb504fb'
    }, activeDocument: {}, bookmarksOnIssuu: []}
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
      this.setState({'bookmarksOnIssuu': res.data.rsp._content.result._content})
      this.getListOfDocumentEmbeds(this.state.bookmarksOnIssuu[0].bookmark.documentId)
      console.log(this.state)
    }).catch((err)=>{console.log(err)})
  }

  getListOfDocumentEmbeds = (documentId) =>{
    const additional_params = {
      format: 'json',
      documentId: documentId
    }
    const params = new api.create_base_parameters_obj('issuu.document_embeds.list', api.api_key, additional_params)
    console.log(params)
    const api_call = api.add_custom_params(params)
    api.call_issuu(api_call).then((res)=>{
      console.log(res)
      this.setState({activeDocument: res.data.rsp._content.result._content[0].documentEmbed})
      console.log(this.state)
    }).catch((err)=>{
        console.log(err)
    })
  }

  componentDidMount(){
    this.getListOfBookmarks()
  }

  render() {
    return (
      <div>
        <FullSizePublication activeDocument={this.state.activeDocument}></FullSizePublication>
      </div>
    );
  }
}

export default App;
