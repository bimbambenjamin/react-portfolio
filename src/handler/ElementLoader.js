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
                
		const fileType = helpers.getFiletype( this.props.src )
        console.log("fileType", fileType)
        if ( fileType ) {
            if ( fileType.includes( "vimeo" ) || fileType === "video" ) {
                window.addEventListener( "load", ( e ) => {
    //                alert( "Got loadedmetadata!" )
                }, true )
            }

            if ( fileType.includes( "vimeo" ) ) {

    //            document.getElementById( this.props.id ).onload = () => {
    //                console.log("poops")
    //            }

            }
            
        }

        this._isMounted = true
		this.handleSrc()
		
	}
	
	componentWillUnmount() {
		
//		const fileType = helpers.getFiletype( this.props.src )
//        if ( fileType.includes( "vimeo" ) || fileType === "video" ) {
//            window.removeEventListener( "loadedmetadata" )
//        }
        this._isMounted = false

	}

	handleSrc() {
		
        const fileType = helpers.getFiletype( this.props.src )
        if ( fileType ) {
            if ( fileType === "video" ) {
                this.createVideo()
            } else if ( fileType === "image" ) {
                this.createImage()
            } else if ( fileType.includes( "vimeo" ) ) {
                this.createIframe()
            }
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
            
            console.log( "video loaded", this.props.src, this._isMounted )

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

    createIframe() {
		
        const iframe = document.createElement( "iframe" )
        
        const src = this.props.src
		const vimeo = src.includes( "vimeo" ) ? true : false
		const vimeoPlayerUrl = vimeo ? "https://player.vimeo.com/video/" + src.split( "/" ).pop() : null
        
        console.log( "iframe created", src, vimeo, vimeoPlayerUrl )
		
		iframe.onload = () => {
            
            console.log( "iframe loaded", src, this._isMounted )

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
		
			iframe.onerror = () => {
				this.setState( {
					error: true,
					preloader: false
				} )
			}
			
		}
		
		iframe.src = vimeoPlayerUrl
						        
    }

	render() {
		
        const id = this.props.id
//        console.log( "ID", id )
        
		const className = this.props.className
		const unloadedSrc = this.props.unloadedSrc
		const src = this.props.src || ""
        const progress = this.state.progress ? "progress" : null
        const preloader = this.state.preloader ? "preloader" : null
        let loaded = this.state.loaded
//        const elementSrc = loaded ? src : unloadedSrc
		const alt = this.props.alt
		const title = helpers.cleanTitle( this.props.title )
		const fileType = helpers.getFiletype( src )
		
		const vimeo = src.includes( "vimeo" ) ? true : false
		const vimeoPlayerUrl = vimeo ? "https://player.vimeo.com/video/" + src.split( "/" ).pop() : null
		
//        console.log( "unloadedSrc", unloadedSrc )

        const progressTag = (
			
            <progress value = { this.state.value } max = "100" />
			
        )
		
        const preloaderTag = (
			
			<div
				className = "appear preloader" 
				style = { { background: "url(" + unloadedSrc + ") no-repeat center center" } }
			/>
			
		)
		
        const imgTag = (
			
			<figure className = "appear">
			
				<img
					id = { id }
					className = { className }
					src = { src }
					title = { title } 
					alt = { alt } 
				/>
			
			</figure>
			
        )
		
        
//        TODO: set width + height
		const iframeTag = (
			
            <div>
				<iframe
					id = { id }
					title = { id }
					src = { vimeoPlayerUrl }
					width = "640" 
					height = "480" 
					frameBorder = "0"
					webkitallowfullscreen = "true"
					mozallowfullscreen = "true"
					allowFullScreen
				>
				</iframe>
			</div>
			
		)
		
		const videoTag = (
						
			<figure className = "appear">
			
				<video
					id = { id }
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
		
		let content
        if ( fileType === "image" ) {
            content = imgTag 
        } else if ( fileType.includes( "vimeo" ) ) {
            content = iframeTag
//            loaded = true
        } else {
            content = videoTag
        }
		
        return (
		
            <div className = "appear">
            
                { progress ? progressTag : null }
                { preloader ? preloaderTag : null }
                { loaded ? content : null }

            </div>
		
		)
		
	}
	
}

export default ElementLoader
