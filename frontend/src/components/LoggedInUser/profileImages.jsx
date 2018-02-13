import React, { Component } from 'react';
const styles = {
    img: {
        height: "10em"
    }

};


class Images extends Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }


    componentDidMount = () => {
        axios
            .get('/p')
            .then (res =>{
                console.log(res.data)
                this.setState({
                    images: res.data.data.images
                })
            })
                .catch(err => {
                    console.log(err)
                })
        }
   
    render() {
        const { images } = this.state

        return (
            <div>
                <div class='rowOfPics'> 

                </div>
            
                <ul>
                    {images.map(img => (
                        <li>
                            <img  alt='img' src={img} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Images