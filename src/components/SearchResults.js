import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'

export class SearchResults extends React.Component {
    
    state={
        choosenAlbums: [],
    }
    handleChange = (id, title, country, date, checked, artist) => {
        const choosenAlbums = this.state.choosenAlbums
        let obj = {}
        obj = {...obj,id, title, country, date, checked, artist}
            choosenAlbums.push(obj)
        this.setState({choosenAlbums:choosenAlbums})
        
    }
    handleClick = () => {

        var existingEntries = JSON.parse(localStorage.getItem('albums'))
        if (existingEntries == null) existingEntries = []
        var entry = this.state.choosenAlbums.map((item)=>{return {id:item.id, title:item.title, country:item.country, date:item.date, artist:item.artist}})
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
    onDelete = (id) => {
const newState = this.state.choosenAlbums.filter(item=>item.id !== id)
this.setState({choosenAlbums:newState})
this.props.addItem(id)
    }

    
    
    render(){
        if (this.props.render === true){
            if (this.props.dataCount === 0) {
                return <Container style={{textAlign:'center', marginTop:40}}><Typography variant="h3">No results</Typography></Container>
            }
        return(
            <Container style={{ overflowY:'auto', maxHeight:window.innerHeight - 70}}>
                <Container style={{backgroundColor:'#aaaaaa', borderRadius:10, opacity:'0.8'}}>
                {this.state.choosenAlbums.length !== 0 ?
                <Container style={{marginTop:10}}>
                    {this.state.choosenAlbums.map((item, key)=><Chip key={item.id} color="primary" onDelete={()=>this.onDelete(item.id)} label={item.title} style={{marginTop:10, marginRight:5}}></Chip>)}
                </Container> : <div></div>}
                <Container style={{textAlign:'center', marginBottom:10, marginTop:10}}>
               {this.state.choosenAlbums.length !== 0 ? <Button variant="contained" color="primary" style={{marginBottom:10}} onClick={()=>{this.handleClick(); this.setState({choosenAlbums:[]})}}>SAVE ALBUMS</Button> : null}
                </Container>
                </Container>
            <ul style={{listStyle:"none", listStyleType:'none', margin:0, padding: 0}}>
                {this.props.data.map((item, index)=>
                <Container style={{border:'1px solid white', marginBottom:10, borderRadius:5, backgroundColor:'#f3f3f3', opacity:'0.8', boxShadow:'6px 6px 12px -4px rgba(0,0,0,0.42)'}}>
                    <li key={item.id}>
                        <Grid container spacing = {3}>
                            <Grid item xs ={1}>
                                <Container style={{padding:5}}>
                    <Button variant="contained" color="primary" onClick={()=>{this.props.deleteItem(index); this.handleChange(item.id, item.title, item.country, item.date, item.checked, item["artist-credit"][0].artist.name )}}>add</Button>
                    </Container>
                    </Grid>
                    <Grid item xs = {11}>
                        <Container style={{textAlign:'center'}}>
                    <Typography variant="overline"> Album: </Typography><Typography variant='button'>{item.title}</Typography>
                    <Typography variant="overline"> Artist: </Typography><Typography variant="button">{item["artist-credit"][0].artist.name}</Typography>
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