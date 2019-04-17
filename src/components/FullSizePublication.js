import React from 'react';

class FullSizePublication extends React.Component{

    render(){
        if(this.props.activeDocument.hasOwnProperty('dataConfigId')){
            return (
                <div>
                    <iframe ref={this.myIframe} style={{'overflow':'hidden','border': 'none', 'height': '100vh', 'width': '100vw'}} src={`//e.issuu.com/embed.html#${this.props.activeDocument.dataConfigId}`}></iframe>
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