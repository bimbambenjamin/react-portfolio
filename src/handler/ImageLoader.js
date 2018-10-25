import React from 'react'



class ImageLoader extends React.Component {

	constructor( props ) {
		
		super( props )
		
		this.state = {
			loaded: false,
			error: false,
		}
		
	}
	
	componentDidMount() {
	
		const img = new Image()
		
		img.onload = () => {
			this.setState( {
				loaded: true
			} )
		}
		img.onerror = () => {
			this.setState( {
				error: true
			} )
		}
		img.src = this.props.src
		
	}
	
	render() {

		const classNames = this.props.className
		const unloadedSrc = this.props.unloadedSrc
		const src = this.props.src
		const imageSrc = this.state.loaded ? src : unloadedSrc
		const alt = this.props.alt
		const title = this.props.title		
				
		return (
		
			<img
				className = { classNames }
				src = { imageSrc }
				title = { title } 
				alt = { alt } 
			/>
		
		)
		
	}
	
}

export default ImageLoader
