import React from 'react'



class ImageLoader extends React.Component {

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
		this.createImage()

	}
	
	componentWillUnmount() {
		
		this._isMounted = false

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
	
	render() {
		
		const className = this.props.className
		const unloadedSrc = this.props.unloadedSrc
		const src = this.props.src
        const progress = this.state.progress
        const preloader = this.state.preloader
        const loaded = this.state.loaded
        const imageSrc = loaded ? src : unloadedSrc
		const alt = this.props.alt
		const title = this.props.title
		
		const progressTag = (
            <progress value = { this.state.value } max = "100" />
        )
        const imgTag = (
			<div className = "appear">
				<img
					className = { className }
					src = { imageSrc }
					title = { title } 
					alt = { alt } 
				/>
			</div>
        )
        const preloaderTag = (
			<div
				className = "preloader" 
				style = { { background: "url(" + unloadedSrc + ") no-repeat center center" } }
			/>
		)
		
		return (
		
            <picture className = "appear">
            
                { progress ? progressTag : null }
                { preloader ? preloaderTag : null }
                { loaded ? imgTag : null }

            </picture>
		
		)
		
	}
	
}

export default ImageLoader
