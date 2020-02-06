import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'

export class SearchResults extends React.Component {
    
    state={
        choosenAlbums: [],
    }
    handleChange = (id, title, country, date, checked) => {
        const choosenAlbums = this.state.choosenAlbums
        let obj = {}
        obj = {...obj,id, title, country, date, checked}
            choosenAlbums.push(obj)
        this.setState({choosenAlbums:choosenAlbums})
        
    }
    handleClick = () => {

        var existingEntries = JSON.parse(localStorage.getItem('albums'))
        if (existingEntries == null) existingEntries = []
        var entry = this.state.choosenAlbums.map((item)=>{return {id:item.id, title:item.title, country:item.country, date:item.date}})
        localStorage.setItem('entry', JSON.stringify(entry))
        existingEntries.push(entry)
        localStorage.setItem('albums', JSON.stringify(existingEntries))
        var albums = JSON.parse(localStorage.getItem('albums')).flatMap((item)=>item)
        var uniq = new Set(albums.map(e=>JSON.stringify(e)))
        var res = Array.from(uniq).map(e => JSON.parse(e))
        localStorage.setItem('done', JSON.stringify(res))
        let localStorageData = localStorage.getItem('done')
        this.props.storageData(localStorageData)
         
    }

    
    
    render(){
        if (this.props.render === true){
        return(
            <Container style={{border:'1px solid black', overflowY:'scroll', maxHeight:600}}>
                {this.props.refresh ?
                <Container style={{marginTop:10}}>
                    <Container style={{textAlign:'center'}}>
                    <Button variant="contained" color="secondary" onClick={()=>{this.props.addItem(); this.setState({choosenAlbums:[]})}}>Reset</Button>
                    </Container>
                    {this.state.choosenAlbums.map((item, key)=><Chip key={item.id} label={item.title}></Chip>)}
                </Container> : <div></div>}
                <Container style={{textAlign:'center', marginBottom:10, marginTop:10}}>
               {this.props.refresh ? <Button variant="contained" color="primary" onClick={()=>{this.handleClick(); this.setState({choosenAlbums:[]})}}>SAVE CHECKED ALBUMS</Button> : null}
                </Container>
            <ul style={{listStyle:"none", listStyleType:'none', margin:0, padding: 0}}>
                {this.props.data.map((item, index)=>
                <Container style={{border:'1px solid black', marginBottom:5, borderRadius:5, backgroundColor:'#f3f3f3'}}>
                    <li key={item.id}>
                        <Grid container spacing = {3}>
                            <Grid item xs ={2}>
                                <Container style={{padding:5}}>
                    <Button variant="contained" color="primary" onClick={()=>{this.props.deleteItem(index); this.handleChange(item.id, item.title, item.country, item.date, item.checked )}}>add</Button>
                    </Container>
                    </Grid>
                    <Grid item xs = {9}>
                        <Container style={{textAlign:'center'}}>
                    <Typography variant="overline"> Album: </Typography><Typography variant='button' style={{fontSize:20}}>{item.title}</Typography>
                    <Typography variant="overline"> Date: </Typography><Typography variant="button">{item.date}</Typography>
                    </Container>
                    </Grid>
                    </Grid>
                    </li>
                </Container>)}
                </ul>
            </Container>
        )
    } else return (null)
}
}