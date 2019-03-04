import React from 'react';
// import './IronImage.css';

class CreateImage extends React.Component {

  constructor( props ) {
    super( props );

    // hd css bg-image-url
    this.ironImageHd = null;
  }

  componentDidMount() {
        
    const src = this.props.src
		this.handleSrc( src )

  }

  handleSrc( src ) {
    // TODO: switch
    this.createNewImage( src )
    // this.createNewVideo( src )
  }

  createNewImage( src ) {

    const img = new Image()
    img.src = src

    // set css
    img.onload = () => {
      this.ironImageHd.setAttribute(
        'style',
        `background-image: url('${this.props.srcLoaded}')`
      );
      this.ironImageHd.classList.add('iron-image-fade-in');
    }
  }

  render() {
    return (
      <div className="">
      
        <div 
          className="" 
          ref={imageLoadedElem => this.ironImageHd = imageLoadedElem}>
        </div>
        <div 
          className="" 
          style={{ backgroundImage: `url('${this.props.srcPreload}')` }}>
        </div>
      
      </div>
    )
  }

}

export default IronImage;