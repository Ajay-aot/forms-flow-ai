import React, { Component } from 'react';
// import UserService from "../../services/UserService";
// import API from "../../apiManager/endpoints/index";
// import { httpGETRequest, httpPOSTRequest } from "../../apiManager/httpRequestHandler";
// import { toast } from "react-toastify";
// import { Translation } from "react-i18next";



export default class VideoEmbed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value, 
            Uid :"",
            Origin :"",
            fbPathname:""
        };
        
    }

    urlChange = (event) => {
             const target = event.target;
             const value = target.value;
             const url = new URL(value);
             console.log(url);
             const origin = url.origin;
             console.log(origin);
             const id = url.searchParams.get("v");
             
             this.setState(
                {
                    value : value,
                    Uid: id,
                    Origin : origin
                },
                () => this.props.onChange(this.state.value)
            );
            console.log(this.state);
        } 
          
    
    render() {
        const mystyle = {
            color: "red",
            marginTop: "8px"
            };
        // let Value  = this.state.value;
        let YoutubeId = this.state.Uid;
        let OriginName = this.state.Origin;
        return (
            
            <>
            {/* {console.log(this.state.value)} */}
            <div style={{paddingBottom: "8px"}}>
                <form onSubmit={this.handleSubmit}>
                    <input className='form-control' width="500" height="315" type="text"   value={this.state.value} onChange={this.urlChange} />
                </form> 
            </div>
            {OriginName ?
                <iframe width="100%" height="320" src={OriginName + "/embed/" + YoutubeId} frameBorder="0" allowFullScreen></iframe> 
            : 
            <p style={mystyle}>Enter link here!!</p>}
            
            
            </>
            );
    }
}

