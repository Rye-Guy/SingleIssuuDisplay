import axios from 'axios';
import {apiKey, apiSecret} from '../hide-me.js';
const md5 = require('js-md5');

//takes the api secret and the params object and creates a signature and orders params in alphabetical order before using md5 hash
function build_signature(apiSecret, params_obj){
    let ordered_params_for_hash = ''
    //orders objects keys in alphabetical order for hashing and building our signature correctly. 
    Object.keys(params_obj).sort().forEach(function(v, i){
        ordered_params_for_hash += `${v}${params_obj[v]}`
    });
    console.log(apiSecret+ordered_params_for_hash)
    const signature = md5(apiSecret+ordered_params_for_hash)
    return signature
}

function Parameters(action_string, apiKey, additional_params){
    this.action = action_string;
    this.apiKey = apiKey;
    this.additional_params = additional_params
        
}

function unpack_additional_params(obj){
    console.log(obj)
    Object.keys(obj.additional_params).sort().forEach(function(v, i){
        obj[v] = obj.additional_params[v]
    });
    delete obj.additional_params
    return obj
}

function call_to_issuu(params){
    let url = 'http://api.issuu.com/1_0'
    Object.keys(params).sort().forEach(function(v, i){
        if(i === 0){
            url += `?${v}=${params[v]}`
        }
        else{
            url += `&${v}=${params[v]}`
        }
    });
    let signature = build_signature(apiSecret, params)
    url += `&signature=${signature}`

    console.log(url)
    //need to have our own proxy for making calls to the api
    return axios.get('https://cors-anywhere.herokuapp.com/'+url)
}

const issuu_tools = {
    create_base_parameters_obj: Parameters,
    call_issuu: call_to_issuu,
    add_custom_params: unpack_additional_params,
    api_key: apiKey
}

export default issuu_tools