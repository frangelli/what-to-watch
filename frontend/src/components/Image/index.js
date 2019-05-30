import React, { PureComponent } from "react";
import PropTypes from "prop-types";

require("./styles.scss");
export default class Image extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alt: PropTypes.node,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ""
  };

  state = {
    isLoaded: false
  };

  loadImage = () => {
    this.setState({ isLoaded: true }, () => {
      this.img.src = this.imageToLoad.src;
      this.img.removeAttribute("data-src");
    });
  };

  componentDidMount() {
    this.imageToLoad = document.createElement("img");
    this.imageToLoad.addEventListener("load", this.loadImage);
    this.imageToLoad.src = this.props.src;
  }

  componentWillUnmount() {
    this.imageToLoad.removeEventListener("load", this.loadImage);
  }

  render() {
    const { height, width, className, src, alt, tinySrc } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div className="spinner" style={{ height, width }}>
          <i className="fa fa-loading fa-spin" />
        </div>
      );
    }
    return (
      <img
        className={`img ${className} loaded`}
        ref={img => (this.img = img)}
        height={height}
        width={width}
        data-src={src}
        alt={alt}
      />
    );
  }
}
