import { GET_PRODUCTS, PRODUCTS_FAIL } from "../actions/types";

const initialState = {
    products:[],
    loading:true,
    error:{}

}

export default function(state = initialState, action ) {
    const {type, payload } = action;

    switch(type){
        case GET_PRODUCTS:
            return {
                ...state, 
                products:payload,
                loading:false
            };
        case PRODUCTS_FAIL:{
            return {
                ...state,
                error:payload,
                loading:false
            };
        }
        default:
            return state;
    }
}
