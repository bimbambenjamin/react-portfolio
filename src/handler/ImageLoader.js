import React from 'react'



class ImageLoader extends React.Component {

	constructor( props ) {
		
		super( props )
		
		this.state = {
			loaded: false,
			error: false,
			width: null,
			height: null
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
	
	componentWillUnmount() {
//		console.log( "unmounting image loader" )
	}

	render() {

		const classNames = this.props.className

		const alt = this.props.alt
		const title = this.props.title
		
		const unloadedSrc = "https://www.benjamin-jager.com/projects/sacha-assets/img/cover.gif"
		const src = this.props.src
		const imgSrc = this.state.loaded ? src : unloadedSrc
				
		return (
		
			<img
				className = { classNames }
				src = { imgSrc }
				title = { title } 
				alt = { alt } 
			/>
		
		)
		
	}
	
}

export default ImageLoader
