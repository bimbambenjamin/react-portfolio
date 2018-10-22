import React from 'react'



class ImageLoader extends React.Component {

	constructor( props ) {
		
		super( props )
		
		this.state = {
			loaded: false,
			error: false
		}
		
	}
	
	componentDidMount() {
	
		const img = new Image()
		
//		TODO: lift state up
		
		img.onload = () => {
			console.log( "mount ", img )
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
		const unloadedSrc = this.props.unloadedSrc
		const src = this.props.src
		const alt = this.props.alt
		const title = this.props.title
		
		if ( this.state.error ) {
		
			return (
			
				<img
					className = { classNames }
					src = { unloadedSrc }
					title = { title } 
					alt = { alt } 
				/>

			)
				
		} else if ( !this.state.loaded ) {

			return (
				<img
					className = { classNames }
					src = { unloadedSrc }
					title = { title }
					alt = { alt }
				/>

			)
		}
		
		return (
		
			<img
				className = { classNames }
				src = { src }
				title = { title }
				alt = { alt }
			/>
			
		)
		
	}
	
}

export default ImageLoader
