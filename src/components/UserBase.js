import React from 'react'
import { Container, Typography, Button, Switch } from '@material-ui/core'



export class UserBase extends React.Component {
    state={
        checked: false
    }
   
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

switchChangeTrue = () => {
    this.setState({checked:true})
}
switchChangeFalse = () => {
    this.setState({checked:false})
}

exportToJsonFile = () => {
    let data = JSON.parse(localStorage.getItem('done'))
    let dataStr = JSON.stringify(data)
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
}


    render(){ 
        if (this.state.checked === true) {
        return <Container style={{textAlign:'center'}}>
            <Switch onChange={()=>this.switchChangeFalse()}></Switch><div>Back to browse</div><br></br>
            <Button style={{marginTop:50}} variant="contained" color="secondary" onClick={()=>this.exportToJsonFile()}>Download your albums data</Button>
        </Container>

    }

         if (JSON.parse(localStorage.getItem('done')) === null) return <Container style={{padding:17}}><Typography variant="button">Saved albums will be displayed here:</Typography></Container>
        return(
            <Container style={{textAlign:'center', overflowY:'auto', maxHeight:window.innerHeight}}>
                <Switch onChange={()=>this.switchChangeTrue()}></Switch><div>Download as JSON</div>
                <Container style={{padding:23, borderRadius:10,}}>
                <Typography variant="button">SAVED ALBUMS:</Typography><br></br>
                <Button variant="contained" color="default" onClick={()=>{localStorage.clear(); this.forceUpdate()}}>Clear</Button>
                </Container>
                <Container style={{marginTop:10}}>
                <ul style={{listStyle:"none", listStyleType:'none', margin:0, padding: 0}}>
                {JSON.parse(localStorage.getItem('done')).map((item)=>
                <Container style={{backgroundColor:'#f3f3f3', marginBottom:5, borderRadius:10, boxShadow: '6px 6px 12px -4px rgba(0,0,0,0.42)', opacity:'0.8'}}>
                    <Button style={{marginBottom:10, marginTop:10}} variant="contained" color="secondary" size='small' onClick={()=>this.deleteItem(item.id)}>Delete</Button>
                    <li><Typography variant="overline">Album: </Typography><Typography variant="button">{item.title}</Typography>
                    <br></br>
                    <Typography variant="overline">Artist: </Typography><Typography variant="button">{item.artist}</Typography>
                    <br></br>
                    <Typography variant="overline"> Date: </Typography><Typography variant="button">{item.date}</Typography>
                    <br></br>
                    <Typography variant="overline"> Country: </Typography><Typography variant="button">{item.country}</Typography></li></Container>)}
                </ul>
                </Container>
            </Container>
        )
        

}
}