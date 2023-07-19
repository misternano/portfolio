import React, { useState, useEffect } from "react";
import avatar from "../assets/avatar.png";
import { useLanyard } from "use-lanyard";

const Avatar = () => {
	const [borderColor, setBorderColor] = useState<string>("border-offline");
	const { data } = useLanyard("272535850200596480");
	const [idle, setIdle] = useState<boolean>(false);

	useEffect(() => {
		if (data?.listening_to_spotify)
			setBorderColor("border-spotify");
		else {
			switch (data?.discord_status) {
				case "online":
					setBorderColor("border-online");
					break;
				case "idle":
					setBorderColor("border-idle");
					setIdle(true);
					break;
				case "dnd":
					setBorderColor("border-dnd");
					break;
				default:
					setBorderColor("border-offline");
					break;
			}
		}
	}, [data]);

	console.log(data);

	return (
		// TODO: Change the coffee cup to use discord status emoji
		<>
			<div className="relative md:block hidden">
				<img src={data ? `https://cdn.discordapp.com/avatars/272535850200596480/${data?.discord_user.avatar}.webp` : avatar} alt="Avatar" className={`relative ${borderColor} w-52 h-auto backdrop-blur-xl bg-neutral-800/50 rounded-full border-2 z-20`} />
				{idle && (
					<div className={`absolute bottom-3 right-3 border ${borderColor} rounded-full aspect-square bg-idle/50 backdrop-blur z-20 flex justify-center items-center w-10 h-10`}>
						<span className="text-3xl">☕</span>
					</div>
				)}
			</div>
			<svg className="absolute z-10 -top-10 md:block hidden" xmlns="http://www.w3.org/2000/svg" width="550" height="300" preserveAspectRatio="xMidYMid" viewBox="0 0 1470 726">
				<g transform="translate(735,363) scale(1,1) translate(-735,-363)">
					<linearGradient id="lg-0.6589752743141462" x1="0" x2="1" y1="0" y2="0">
						<stop stopColor="#ff00ff" offset="0" />
						<stop stopColor="#ecba16" offset="1" />
					</linearGradient>
					<path d="M 1199 363 C 1199 486 937 587 820 625 C 703 663 464 712 392 612 C 320 512 376 255 448 155 C 520 55 722 5 839 43 C 956 81 1199 240 1199 363" fill="url(#lg-0.6589752743141462)" opacity="0.4">
						<animate attributeName="d" dur="33.333333333333336s" repeatCount="indefinite" keyTimes="0;0.3333333333333333;0.6666666666666666;1" calcMode="spline" keySplines="0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9" begin="-13.333333333333334s" values="M 1199 363 C 1199 486 937 587 820 625 C 703 663 464 712 392 612 C 320 512 376 255 448 155 C 520 55 722 5 839 43 C 956 81 1199 240 1199 363;M 1124 363 C 1124 469 932 625 831 658 C 730 691 525 646 463 560 C 401 474 418 264 480 178 C 542 92 727 42 828 75 C 929 108 1124 257 1124 363;M 1100 363 C 1100 471 930 614 827 647 C 724 680 517 656 453 568 C 389 480 369 232 433 144 C 497 56 717 68 820 101 C 923 134 1100 255 1100 363;M 1199 363 C 1199 486 937 587 820 625 C 703 663 464 712 392 612 C 320 512 376 255 448 155 C 520 55 722 5 839 43 C 956 81 1199 240 1199 363" />
					</path>
					<path d="M 1122 363 C 1122 484 962 669 847 707 C 732 745 459 713 388 615 C 317 517 311 205 382 107 C 453 9 709 51 824 88 C 939 125 1122 242 1122 363" fill="url(#lg-0.6589752743141462)" opacity="0.4">
						<animate attributeName="d" dur="33.333333333333336s" repeatCount="indefinite" keyTimes="0;0.3333333333333333;0.6666666666666666;1" calcMode="spline" keySplines="0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9" begin="-13.333333333333334s" values="M 1122 363 C 1122 484 962 669 847 707 C 732 745 459 713 388 615 C 317 517 311 205 382 107 C 453 9 709 51 824 88 C 939 125 1122 242 1122 363;M 1137 363 C 1137 481 946 633 834 669 C 722 705 497 682 428 586 C 359 490 371 245 440 149 C 509 53 731 -6 843 31 C 955 68 1137 245 1137 363;M 1227 363 C 1227 490 951 615 830 654 C 709 693 488 700 413 597 C 338 494 348 239 423 136 C 498 33 732 -39 853 0 C 974 39 1227 236 1227 363;M 1122 363 C 1122 484 962 669 847 707 C 732 745 459 713 388 615 C 317 517 311 205 382 107 C 453 9 709 51 824 88 C 939 125 1122 242 1122 363" />
					</path>
					<path d="M 1164 363 C 1164 481 933 593 821 629 C 709 665 489 687 420 592 C 351 497 367 242 436 146 C 505 50 704 76 816 112 C 928 148 1164 245 1164 363" fill="url(#lg-0.6589752743141462)" opacity="0.4">
						<animate attributeName="d" dur="33.333333333333336s" repeatCount="indefinite" keyTimes="0;0.3333333333333333;0.6666666666666666;1" calcMode="spline" keySplines="0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9" begin="-13.333333333333334s" values="M 1164 363 C 1164 481 933 593 821 629 C 709 665 489 687 420 592 C 351 497 367 242 436 146 C 505 50 704 76 816 112 C 928 148 1164 245 1164 363;M 1099 363 C 1099 476 934 608 826 643 C 718 678 528 654 461 562 C 394 470 394 256 461 164 C 528 72 716 56 824 91 C 932 126 1099 250 1099 363;M 1162 363 C 1162 471 917 576 815 609 C 713 642 496 670 433 583 C 370 496 412 261 475 174 C 538 87 709 96 811 129 C 913 162 1162 255 1162 363;M 1164 363 C 1164 481 933 593 821 629 C 709 665 489 687 420 592 C 351 497 367 242 436 146 C 505 50 704 76 816 112 C 928 148 1164 245 1164 363" />
					</path>
					<path d="M 1094 363 C 1094 470 924 597 822 630 C 720 663 540 637 477 550 C 414 463 406 257 469 170 C 532 83 731 30 833 63 C 935 96 1094 256 1094 363" fill="url(#lg-0.6589752743141462)" opacity="0.4">
						<animate attributeName="d" dur="33.333333333333336s" repeatCount="indefinite" keyTimes="0;0.3333333333333333;0.6666666666666666;1" calcMode="spline" keySplines="0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9" begin="-13.333333333333334s" values="M 1094 363 C 1094 470 924 597 822 630 C 720 663 540 637 477 550 C 414 463 406 257 469 170 C 532 83 731 30 833 63 C 935 96 1094 256 1094 363;M 1133 363 C 1133 484 954 647 839 684 C 724 721 526 664 455 566 C 384 468 323 213 394 115 C 465 17 727 -3 842 35 C 957 73 1133 242 1133 363;M 1140 363 C 1140 484 948 629 833 666 C 718 703 459 713 388 615 C 317 517 374 250 445 152 C 516 54 730 -13 845 24 C 960 61 1140 242 1140 363;M 1094 363 C 1094 470 924 597 822 630 C 720 663 540 637 477 550 C 414 463 406 257 469 170 C 532 83 731 30 833 63 C 935 96 1094 256 1094 363" />
					</path>
					<path d="M 1199 363 C 1199 486 944 608 827 646 C 710 684 482 698 410 599 C 338 500 331 221 403 122 C 475 23 727 -9 844 29 C 961 67 1199 240 1199 363" fill="url(#lg-0.6589752743141462)" opacity="0.4">
						<animate attributeName="d" dur="33.333333333333336s" repeatCount="indefinite" keyTimes="0;0.3333333333333333;0.6666666666666666;1" calcMode="spline" keySplines="0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9;0.3 0.1 0.7 0.9" begin="-13.333333333333334s" values="M 1199 363 C 1199 486 944 608 827 646 C 710 684 482 698 410 599 C 338 500 331 221 403 122 C 475 23 727 -9 844 29 C 961 67 1199 240 1199 363;M 1175 363 C 1175 476 930 595 822 630 C 714 665 516 661 450 570 C 384 479 378 244 444 152 C 510 60 707 81 815 116 C 923 151 1175 250 1175 363;M 1174 363 C 1174 481 937 604 825 640 C 713 676 526 660 457 565 C 388 470 351 229 420 134 C 489 39 730 -2 842 34 C 954 70 1174 245 1174 363;M 1199 363 C 1199 486 944 608 827 646 C 710 684 482 698 410 599 C 338 500 331 221 403 122 C 475 23 727 -9 844 29 C 961 67 1199 240 1199 363" />
					</path>
				</g>
			</svg>
		</>
	);
};

export default Avatar;
