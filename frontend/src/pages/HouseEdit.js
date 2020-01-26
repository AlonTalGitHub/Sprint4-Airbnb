import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { saveHouse } from '../actions/HouseActions'
import '../assets/styles/index.css'
import '../assets/styles/edithouse.css'
import HouseService from '../services/HouseService'
import { uploadImg } from '../services/uploadImgService'
import NavBar from "../cmps/NavBar";
import Axios from "axios";

class HouseEdit extends Component {

    state = {
        newHouse: {
            address: {
                country: '',
                coords: null
            },
            imgs: [],
            title: '',
            description: '',
            capacity: 1,
            price: '',
            addressInput: ''
        },
        isModalShown: false,
        uploadStatus: null,

    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (!id) return
        this.getHouse(id)

    }

    getHouse = async (id) => {
        const newHouse = await HouseService.get(id)
        console.log(newHouse.address.coords)
        const addressInput = await this.getAddress(newHouse.address.coords)
        newHouse.addressInput = addressInput
        this.setState({ newHouse }, () => console.log(this.state))
    }

    upload = async (ev) => {
        const fileMap = ev.target.files
        var files = []
        for (const key in fileMap) {
            files.push(fileMap[key])
        }
        files.splice(-2)
        try {
            this.setState({ uploadStatus: 'uploading' })
            let filePrms = files.map(file => uploadImg(file))
            let resFiles = await Promise.all(filePrms)
            const newHouse = { ...this.state.newHouse }
            resFiles.forEach(file => { if (file.url) newHouse.imgs.push(file.url) })
            // newHouse.imgs=uploadedImgs
            this.setState({ newHouse })
            this.setState({ uploadStatus: 'success' })

        } catch (err) {
            throw err
        }


    }

    onInputChange = (ev) => {
        const newHouse = { ...this.state.newHouse }
        const key = ev.target.name
        let value = ev.target.value
        if (ev.target.name === 'capacity' || ev.target.name === 'price') value = parseInt(value, 0)
        newHouse[key] = value
        this.setState({ newHouse })
    }

    onAddressChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        const address = { ...this.state.newHouse.address }
        const newHouse = { ...this.state.newHouse }
        address[key] = value
        newHouse.address = address
        this.setState({ newHouse }, () => console.log(this.state))
    }

    owner = {
        _id: "0987",
        fullName: "Yael Shenker",
        imgURL: "https://a0.muscache.com/im/pictures/user/e23d9c03-0de7-46f9-ba5a-c62a6358ff34.jpg?aki_policy=profile_x_medium"
    }

    onSaveHouse = async (ev) => {
        ev.preventDefault();
        const owner = this.owner
        try {
            await this.checkAddress()
            const newHouse = { ...this.state.newHouse, owner }
            delete newHouse.addressInput
            await this.props.saveHouse(newHouse)
            this.setState({ isModalShown: true })
        }
        catch{
            console.log('add house failed')
        }
    }

    onBackClick = () => {
        this.state.isModalShown && this.props.history.push('/')
    }

    displayUpload = () => {
        const { uploadStatus } = this.state
        if (uploadStatus === 'uploading') return 'Uploading...'
        else if (uploadStatus === 'success') return 'Success!'
    }

    deleteImg = (idx) => {
        const imgs = this.state.newHouse.imgs.filter((img, i) => {
            if (idx !== i) return img
        })
        const newHouse = { ...this.state.newHouse }
        newHouse.imgs = imgs
        this.setState({ newHouse }, () => console.log(this.state.newHouse))
    }

    dispalyImg = () => {
        if (this.state.newHouse.imgs.length === 0) return
        const { imgs } = this.state.newHouse
        const imgElms = imgs.map((img, idx) => {
            return (<div className="edit-img-container">
                <img key={idx} className="edit-img" src={img}></img>
                <div className="edit-img-delete flex justify-center">
                    <span onClick={() => this.deleteImg(idx)} className="edit-img-x">X</span>
                </div>
            </div>
            )
        })
        return imgElms
    }

    checkAddress = async (ev) => {
        // ev.preventDefault()
        // let addressInput = this.refs.address.value
        let addressInput = this.state.newHouse.addressInput
        addressInput = this.state.newHouse.address.country + ' ' + addressInput
        try {
            const res = await Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${addressInput}&key=029b29b812cb4bfea627a8b82b6b92c4`)
            console.log(res.data.results[0].geometry)
            const coords = res.data.results[0].geometry
            const address = { ...this.state.newHouse.address, coords }
            const newHouse = { ...this.state.newHouse, address }
            this.setState({ newHouse })
        }
        catch (err) {
            console.log(err)
        }

    }

    createOptions = () => {
        const options = []
        for (let i = 1; i < 9; i++) {
            const str = (i === 1) ? `${i} person` : `${i} persons`
            // const isSelected=(i===this.state.newHouse.capacity)? selected : ''
            options.push(<option selected={(i === this.state.newHouse.capacity) ? true : false} value={i}>{str}</option>)
        }
        return options
    }

    getAddress = async (coords) => {
        // const { coords } = this.state.newHouse.address
        console.log(coords)
        if (!coords) return
        const res = await Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=029b29b812cb4bfea627a8b82b6b92c4`)
        console.log(res.data.results)
        const addressInput = res.data.results[0].formatted
        console.log(addressInput)
        return addressInput


    }

    render() {
        const { newHouse, isModalShown, uploadStatus } = this.state
        const { id } = this.props.match.params
        return <React.Fragment>
            <NavBar style={{ "position": "fixed", "top": "0px", "backgroundColor": "lightblue" }}></NavBar>
            <form className="edit-form flex column" onSubmit={this.onSaveHouse}>
                <input required name="country" onChange={this.onAddressChange} value={newHouse.address.country} type="text" placeholder="Country"></input>
                <input required ref="address" onChange={this.onInputChange} name="addressInput" type="text" placeholder="Address" value={this.state.newHouse.addressInput}></input>
                {/* <button onClick={this.checkAddress}>check address</button> */}
                <input required name="title" onChange={this.onInputChange} value={newHouse.title} type="text" placeholder="House Title"></input>
                <textarea required name="description" onChange={this.onInputChange} value={newHouse.description} type="text" placeholder="Description"></textarea>
                <input required name="price" onChange={this.onInputChange} value={newHouse.price} type="text" placeholder="Price per night"></input>
                <label>How many people can stay in your property?</label>
                <select className="cap-select" type="number" name="capacity" onChange={this.onInputChange}>
                    {this.createOptions()}
                </select>

                {/* onChange={this.onInputChange} */}
                <div className="img-upload flex space-between">
                    <label htmlFor="file-upload" className="upload form-btn pointer flex align-center">
                        Upload Images
                        </label>
                    <span className={(uploadStatus === 'success') && "success"}>
                        {this.displayUpload()}
                    </span>
                </div>
                <input id="file-upload" required={(id) ? false : true} onChange={this.upload} type="file" multiple></input>
                {<div className="flex wrap">{this.dispalyImg()}</div>}
                <button className="form-btn pointer">Submit</button>

            </form>
            {/* <div classname ={`bananana lol weepee ${isModalShown? 'banana':none}`}></div> */}
            {/* need to fix the line below  */}
            <div className={(isModalShown) ? 'modal-shown flex column space-betwwen' : 'modal-hidden'}>
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
    saveHouse
};

export default connect(null, mapDispatchToProps)(HouseEdit)