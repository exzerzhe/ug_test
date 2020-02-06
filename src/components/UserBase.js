import React from 'react'
import { Container, Typography, Button } from '@material-ui/core'


export class UserBase extends React.Component {
   
deleteItem = (id) => {
    const items = JSON.parse(localStorage.getItem('done'))
    const newItems = items.filter(item=>item.id !== id)
    const albums = JSON.parse(localStorage.getItem('albums'))
    const albumsMap = albums.flatMap((item)=>item)
    const albumsMapDone = albumsMap.filter(item=>item.id !== id)
    localStorage.setItem('albums', JSON.stringify(albumsMapDone))
    localStorage.setItem('done', JSON.stringify(newItems))
    if(JSON.parse(localStorage.getItem('done')).length === 0) {
        localStorage.clear()
    }
    this.forceUpdate()
}

    render(){
         if (JSON.parse(localStorage.getItem('done')) === null) return <Container>Saved albums will be displayed here</Container>
        return(
            <Container style={{textAlign:'center', overflowY:'scroll', maxHeight:705}}>
                <Typography variant="h5">Your albums:</Typography>
                <Container style={{marginTop:50}}>
                <ul style={{listStyle:"none", listStyleType:'none', margin:0, padding: 0}}>
                {JSON.parse(localStorage.getItem('done')).map((item)=>
                <Container style={{border:'1px solid black', marginBottom:5}}>
                    <Button variant="contained" color="secondary" onClick={()=>this.deleteItem(item.id)}>Delete</Button>
                    <li>Album: {item.title} <p>date: {item.date}</p> <p>country: {item.country}</p></li></Container>)}
                </ul>
                </Container>
            </Container>
        )
        

}
}