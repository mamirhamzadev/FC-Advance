import { useRef, useEffect } from "react";
import lottie from "lottie-web";

import cancelAnimation from "./json/cancelMinusAnimation.json";
import deleteAnimation from "./json/robotTakingOutTrash.json";
import successAnimation from "./json/successAnimation.json";
import failErrorAnimation from "./json/failErrorAnimation.json";
import sadCryFaceAnimation from "./json/sadCryFaceAnimation.json";
import happyFaceAnimation from "./json/happyFaceAnimation.json";
import processingAnimation from "./json/processingAnimation.json";

const animationConfigs = {
	delete: deleteAnimation,
	success: successAnimation,
	failError: failErrorAnimation,
	cancel: cancelAnimation,
	sad: sadCryFaceAnimation,
	happy: happyFaceAnimation,
	// transfer: fileTransferAnimation,
	// upload: uploadAnimation,
	processing: processingAnimation,
};

export const LottieIcon = ({ iconType, style }) => {
	const containerRef = useRef(null);
	const animationData = animationConfigs[iconType];

	useEffect(() => {
		if (animationData) {
			const animation = lottie.loadAnimation({
				container: containerRef.current,
				animationData,
				loop: true,
				autoplay: true,
			});

			return () => {
				animation.destroy();
			};
		}
	}, [animationData]);

	return <div ref={containerRef} style={style} />;
};
