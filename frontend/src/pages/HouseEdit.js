import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { addHouse } from '../actions/HouseActions'
import '../assets/styles/index.css'
import '../assets/styles/edithouse.css'
import { uploadImg } from '../services/uploadImgService'
import NavBar from "../cmps/NavBar";

class HouseEdit extends Component {
    constructor(props) {
        super(props)
        this.fileInputRef = React.createRef();
    }

    state = {
        newHouse: {
            address: {
                country: ''
            },
            imgs: [],
            title: '',
            description: '',
            capacity: 1,
            price: ''

        },
        isModalShown: false,
        uploadStatus: null

    }

    upload = async (ev) => {
        const fileMap = ev.target.files
        console.log(fileMap)
        var files = []
        for (const key in fileMap) {
            files.push(fileMap[key])
        }
        files.splice(-2)
        try {
            this.setState({ uploadStatus: 'uploading' }, () => console.log(this.state))

            let filePrms = files.map(file => uploadImg(file))
            let resFiles = await Promise.all(filePrms)

            console.log(resFiles)
            const newHouse = { ...this.state.newHouse }
            resFiles.forEach(file => { if (file.url) newHouse.imgs.push(file.url) })
            // newHouse.imgs=uploadedImgs
            this.setState({ newHouse }, () => console.log(this.state))
            this.setState({ uploadStatus: 'success' }, () => console.log(this.state))

        } catch (err) {
            throw err
        }


    }

    onInputChange = (ev) => {
        const newHouse = { ...this.state.newHouse }
        const key = ev.target.name
        let value = ev.target.value
        console.log(ev.target.type)
        if (ev.target.name === 'capacity' || ev.target.name === 'price') value = parseInt(value, 0)
        newHouse[key] = value
        this.setState({ newHouse }, () => console.log(this.state))
    }

    onAddressChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        const address = { ...this.state.newHouse.address }
        const newHouse = { ...this.state.newHouse }
        address[key] = value
        newHouse.address = address
        this.setState({ newHouse })
    }

    onAddHouse = async (ev) => {
        ev.preventDefault()
        try {
            await this.props.addHouse(this.state.newHouse)
            this.setState({ isModalShown: true })
        }
        catch{
            console.log('add house failed')
        }



    }

    onBackClick = () => {
        this.state.isModalShown && this.props.history.push('/house')
    }

    displayUpload = () => {
        const { uploadStatus } = this.state
        if (uploadStatus === 'uploading') return 'Uploading...'
        else if (uploadStatus === 'success') return 'Success!'
    }

    render() {
        const { newHouse, isModalShown, uploadStatus } = this.state
        return <React.Fragment>
            <NavBar style={{ "position": "fixed", "top": "0px", "backgroundColor": "lightblue" }}></NavBar>
            <form className="edit-form flex column" onSubmit={this.onAddHouse}>
                <input required name="country" onChange={this.onAddressChange} value={newHouse.address.country} type="text" placeholder="Country"></input>
                <input required name="title" onChange={this.onInputChange} value={newHouse.title} type="text" placeholder="House Title"></input>
                <input required name="description" onChange={this.onInputChange} value={newHouse.description} type="text" placeholder="Description"></input>
                <input required name="price" onChange={this.onInputChange} value={newHouse.price} type="text" placeholder="Price per night"></input>
                <label>How many people can stay in your property?</label>
                <select className="cap-select" type="number" name="capacity" onChange={this.onInputChange} >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={7}>7 Guests</option>
                    <option value={8}>8 Guests</option>
                </select>

                {/* onChange={this.onInputChange} */}
                <div className="img-upload flex space-between">
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Upload Images</label>
                    <span className={(uploadStatus==='success')&&"success"}>
                        {this.displayUpload()}
                    </span>
                </div>
                <input id="file-upload" required onChange={this.upload} type="file" multiple></input>
                <button className="form-btn pointer">Submit</button>

            </form>
            <div className={isModalShown ? 'modal-shown flex column space-betwwen' : 'modal-hidden'}>
                {/* <div className='modal-shown flex column space-between'> */}
                <span>Congardulations!</span>
                <span>Your property is on TurtleHouse</span>
                <button onClick={this.onBackClick} className="form-btn pointer">Back To HomePage</button>
            </div>

            <div className={isModalShown ? 'block-screen' : 'block-screen-hidden'}></div>

        </React.Fragment>

    }
}


const mapDispatchToProps = {
    addHouse
};

export default connect(null, mapDispatchToProps)(HouseEdit)