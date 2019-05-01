import React from 'react';

class FullSizePublication extends React.Component{
    render(){
        if(this.props.bookName){
            return (
                <div>
                    <iframe title={this.props.bookName} ref={this.myIframe} style={{'overflow':'hidden','border': 'none', 'height': '100vh', 'width': '100vw'}} src={`https://e.issuu.com/embed.html?embedType=script&u=wall2wall&d=${this.props.bookName}&p=1`}></iframe>
                </div>
            )
        }else{
            return (
                <div style={{'height': '100vh', 'width': '100vw'}}>
                    <div className="ui segment">
                        <div style={{'height': '100vh', 'width': '100vw'}} className="ui active dimmer">
                            <div className="ui text loader">Loading</div>
                        </div>
                    </div>
                </div>
            ) 
        }
    }
}

export default FullSizePublication