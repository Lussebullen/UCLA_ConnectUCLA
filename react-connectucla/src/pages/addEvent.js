import React from 'react'
import {useState, useContext} from 'react'
import "./addEvent.css";
import PostAPI from '../services/post.js'
import {useNavigate} from 'react-router-dom'
// import NavBar from '../components/navbar.js'
import TagsInput from './inputTags.js';
import { AuthContext } from "../context/AuthContext";
import Button from '@mui/material/Button';

const AddEvent = () => {
    const navigate = useNavigate()
    const [title, setTitle]=useState('')
    const [startTime, setstartTime]=useState('')
    const [endTime, setendTime]=useState('')
    const [details, setDetails]=useState('')
    const [url, setUrl]=useState('')
    const [location, setLocation]=useState('')
    const [tags, setTags] = useState([]);
    const {user} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        //post object MUST CORRESPOND TO POST SCHEMA and be json object
        const event= {
            userId: user._id,
            title: title, 
            author: user.username, 
            location:location,
            startTime:startTime, 
            endTime:endTime, 
            content:details, 
            imgurl:url,
            tags: tags
        }
        
        //post request code, not working
        PostAPI.createPost(event)
        .then(response => {console.log(response.data) 
            navigate('/')})
        .catch(error => console.log(error));
    }

    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <Button color="inherit" href="/">Return to Home</Button>
            <h2>Add New Event Post</h2>
            <form onSubmit={handleSubmit}>
            <div className="inputGp">
            <label>Event Name</label>
                <input type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>Start Time</label>
                <input type="datetime-local"
                value={startTime}
                onChange={(e)=> setstartTime(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>End Time</label>
                <input type="datetime-local"
                value={endTime}
                onChange={(e)=> setendTime(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>Details</label>
                <textarea
                value={details}
                onChange={(e)=> setDetails(e.target.value)}
                required>
                </textarea>
            </div>
            <div className="inputGp">
            <label>Location</label>
                <textarea
                value={location}
                onChange={(e)=> setLocation(e.target.value)}
                required>
                </textarea>
            </div>
            <div className="inputGp">
            <label>Poster URL</label>
                <input type="url"
                value={url}
                onChange={(e)=> setUrl(e.target.value)}
                required/>
            </div>            
            <div className="inputGp">
            <label>Add Tags</label>
                <TagsInput tags={tags} setTags={setTags}/>
            </div>
            <button>Add Event</button>
            </form>
            </div>
        </div>
    );
}
export default AddEvent;