import React from 'react'
import { Button, TextField, Container } from '@material-ui/core'

export class Search extends React.Component {
state={
    albumTitle:''
}
handleChange = (event) => {
            
    this.setState({albumTitle:event.target.value})
   }
  
  onBtnClick = (e) => {
    e.preventDefault()
    this.props.fetchData(this.state.albumTitle)
    
  }
  

render(){
    return(
        <Container style={{textAlign:"center", borderRadius:10, padding:10}}>
        <form id="myForm">
        <TextField variant="outlined" type="text" size="small" name="title" placeholder="Album title" onChange={this.handleChange}></TextField>
        <Button type="submit" variant="contained" color="primary" onClick={this.onBtnClick} style={{marginLeft:15}}>Search</Button>
        </form>
        </Container>
    )
}
}