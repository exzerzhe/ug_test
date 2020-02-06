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
        <Container style={{textAlign:"center", border:"1px solid black", padding:10}}>
        <form id="myForm">
        <TextField variant="outlined" type="text" size="small" name="title" placeholder="Album title" onChange={this.handleChange}></TextField><br></br>
        <Button type="submit" variant="contained" color="primary" onClick={this.onBtnClick} style={{marginTop:10}}>Search</Button>
        </form>
        </Container>
    )
}
}