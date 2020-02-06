
export const SEARCH_DATA_SUCCESS = 'SEARCH_DATA_SUCCESS';
export const SEARCH_DATA_ERROR = 'SEARCH_DATA_ERROR';
export const SEARCH_DATA_PENDING = 'SEARCH_DATA_PENDING';
export const SAVE_LOCAL_STORAGE_DATA = 'SAVE_LOCAL_STORAGE_DATA';
export const GET_LOCAL_STORAGE_DATA = 'GET_LOCAL_STORAGE_DATA';
export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'


export function fetchData (albumTitle) {
    return dispatch => {
        dispatch({type:SEARCH_DATA_PENDING})
        fetch('https://musicbrainz.org/ws/2/release/?query=release:'+albumTitle+'&fmt=json')
        .then(res=>res.json())
    .then(data => dispatch({type: SEARCH_DATA_SUCCESS, data}))
    }
}

export function storageData (localStorageData) {
    return dispatch => {
        dispatch({type: SAVE_LOCAL_STORAGE_DATA, localStorageData})
    }
}

export function deleteItem (index) {
    return dispatch => {
        dispatch({type:DELETE_ITEM, payload: index})
    }
} 

export function addItem () {
    return dispatch => {
        dispatch({type:ADD_ITEM})
    }
}