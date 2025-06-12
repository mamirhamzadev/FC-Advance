import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageLoader = ({ src, placeholder, style, className, handleImageLoad }) => {
	// Default placeholder source from environment variable
	const defaultPlaceholder = `${import.meta.env.VITE_APP_CLOUD_FRONT_URL}/placeholder.webp`;

	return (
		<LazyLoadImage
			src={!src?.includes("undefined") ? src : defaultPlaceholder} // Check if src is not undefined, null, or missing
			placeholderSrc={!placeholder?.includes("undefined") ? placeholder : defaultPlaceholder} // Check if placeholder is not undefined, null, or missing
			effect="blur"
			alt="Image"
			style={style}
			height="100%"
			width="100%"
			className={className}
			onLoad={handleImageLoad}
		/>
	);
};

export default ImageLoader;
