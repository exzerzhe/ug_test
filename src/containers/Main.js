import React from 'react';
import {Component} from 'react'

import { fetchData, storageData, deleteItem, addItem } from '../actions/searchActions';
import { connect } from 'react-redux';
import {Search} from '../components/Search.js'
import {SearchResults} from '../components/SearchResults'
import { Container, Grid } from '@material-ui/core';
import {UserBase} from '../components/UserBase'


class App extends Component {
  render(){
    const {data, fetchDataAction, render, localStorageData, storageDataAction, update ,deleteItemAction, addItemAction, refresh, removedData, dataCount}=this.props
    return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
        <Grid item xs={8}>
      <Search data={data} fetchData={fetchDataAction}/>
      <SearchResults data={data} render={render} localStorageData={localStorageData} storageData={storageDataAction} deleteItem={deleteItemAction} addItem={addItemAction} refresh={refresh} removedData={removedData} dataCount={dataCount}/>
      </Grid>
      <Grid item xs={4}>
        <Container >
          <UserBase update={update} localStorageData={localStorageData}/>
        </Container>
      </Grid>
      </Grid>
      </Container>
    )
  }
  
}



const mapStateToProps = store => {
  return {
    data:store.searchReducer.data,
    render: store.searchReducer.render,
    localStorageData: store.searchReducer.localStorageData,
    update: store.searchReducer.update,
    refresh: store.searchReducer.refresh,
    removedData:store.searchReducer.removedData,
    dataCount: store.searchReducer.dataCount
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchDataAction:(albumTitle)=>dispatch(fetchData(albumTitle)),
    storageDataAction:(localStorageData)=>dispatch((storageData(localStorageData))),
    deleteItemAction:(id)=>dispatch((deleteItem(id))),
    addItemAction:(id)=>dispatch(addItem(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)