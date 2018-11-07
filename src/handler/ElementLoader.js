import React from 'react'
import * as helpers from './helpers'



class ElementLoader extends React.Component {

	_isMounted = false
	
	constructor( props ) {
		
		super( props )
		
		this.state = {
			loaded: false,
			error: false,
            preloader: true,
            progress: false,
            value: 0
		}
		
	}
	
	componentDidMount() {

		this._isMounted = true
		this.handleSrc()
		
	}
	
	componentWillUnmount() {
		
		this._isMounted = false

	}

	handleSrc() {
		
//		console.log( "handleSrc", this.props.src )
		if ( helpers.getFiletype( this.props.src ) === "video" ) {
			this.createVideo()
		} else {
			this.createImage()
		}
		
	}

    createImage() {
		
        const img = new Image()
		
		img.onload = () => {
			
			if ( this._isMounted ) {
				
				this.setState( {
					loaded: true,
					preloader: false
				} )
				
				const oneUp = this.props.oneUp
				
				if ( oneUp ) {
					return oneUp( this.props.count + 1 )
				}
				
			}
			
		}
		
		if ( this._isMounted ) {
		
			img.onerror = () => {
				this.setState( {
					error: true,
					preloader: false
				} )
			}
			
		}

		img.src = this.props.src
						        
    }

    createVideo() {
		
        const video = document.createElement( "video" )
		
		video.onloadeddata = () => {
			
			if ( this._isMounted ) {
				
				this.setState( {
					loaded: true,
					preloader: false
				} )
				
				const oneUp = this.props.oneUp
				
				if ( oneUp ) {
					return oneUp( this.props.count + 1 )
				}
				
			}
			
		}
		
		if ( this._isMounted ) {
		
			video.onerror = () => {
				this.setState( {
					error: true,
					preloader: false
				} )
			}
			
		}
		
		video.src = this.props.src
						        
    }
	
	render() {
		
		const className = this.props.className
		const unloadedSrc = this.props.unloadedSrc
		const src = this.props.src
        const progress = this.state.progress
        const preloader = this.state.preloader
        const loaded = this.state.loaded
        const elementSrc = loaded ? src : unloadedSrc
		const alt = this.props.alt
		const title = this.props.title
		const fileType = helpers.getFiletype( src )

		const progressTag = (
			
            <progress value = { this.state.value } max = "100" />
			
        )
		
        const preloaderTag = (
			
			<div
				className = "preloader" 
				style = { { background: "url(" + unloadedSrc + ") no-repeat center center" } }
			/>
			
		)
		
        const imgTag = (
			
			<figure className = "appear">
			
				<img
					id = { this.props.id }
					className = { className }
					src = { elementSrc }
					title = { title } 
					alt = { alt } 
				/>
			
			</figure>
			
        )
		
		const videoTag = (
			
			<figure className = "appear">
			
				<video
					id = { this.props.id }
					aria-hidden = "true" 
					className = { className }
					autoPlay
					loop
					muted
					playsInline 
					src = { src }
					tabIndex = "-1"
				/>
			
			</figure>
			
        )
		
		const imgOrVideo = fileType === "video" ? videoTag : imgTag
		
		return (
		
            <div className = "appear">
            
                { progress ? progressTag : null }
                { preloader ? preloaderTag : null }
                { loaded ? imgOrVideo : null }

            </div>
		
		)
		
	}
	
}

export default ElementLoader
