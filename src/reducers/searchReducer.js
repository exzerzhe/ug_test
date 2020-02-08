import { SEARCH_DATA_ERROR, DELETE_ITEM, ADD_ITEM} from '../actions/searchActions'
import { SEARCH_DATA_PENDING } from '../actions/searchActions'
import { SEARCH_DATA_SUCCESS } from '../actions/searchActions'
import { SAVE_LOCAL_STORAGE_DATA } from '../actions/searchActions'




const initialState = {
    data: '',
    dataPending: false,
    render: false,
    localStorageData: [],
    update: false,
    refresh: false,
    removedData: [],
    dataCount: ''

}

export function searchReducer (state=initialState, action) {
    switch (action.type){
        case SEARCH_DATA_PENDING:
            return{...state, dataPending: true}
            case SEARCH_DATA_SUCCESS:
                return{...state, dataPending:false, data:action.data.releases, dataCount:action.data.count, render:true}
                case SEARCH_DATA_ERROR:
                    return{...state, dataPending:false, data: 'ОшибОчка'}
                    case SAVE_LOCAL_STORAGE_DATA:
                    return{...state, localStorageData:action.localStorageData, update:true, refresh: false}
                    case DELETE_ITEM:
                        {
                            let removedData = state.data.filter((item, index)=>index === action.payload)
                            let newData = state.removedData.concat(removedData)
                            return {...state, data: state.data.filter((item, index)=> index !== action.payload), refresh:true,
                            removedData: newData}
                        }  
                        
                        case ADD_ITEM:{
                            let removedData = state.removedData.filter((item, index)=>item.id === action.index)
                            let removedDataSaved = state.removedData.filter((item, index)=>item.id !== action.index)
                            let newData = state.data.concat(removedData)
                            return {...state, data: newData, removedData:removedDataSaved }
                        }
                    default:
                        return state
}
}