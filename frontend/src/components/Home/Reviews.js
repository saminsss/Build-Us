import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import {
	Box,
	Slide,
	makeStyles,
	Typography,
	Button,
	useTheme,
	useMediaQuery
} from '@material-ui/core';

import {
	KeyboardArrowRightOutlined,
	KeyboardArrowLeftOutlined,
} from '@material-ui/icons';

const Works = () => {
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	const useStyles = makeStyles((theme) => {
		return {
			page: {
				width: '100%',
				height: '100%',
				backgroundColor: '#f4f9ff',
				marginTop: theme.spacing(6),
				paddingTop: theme.spacing(12),
				paddingBottom: theme.spacing(12),
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'Quicksand',
				overflow: 'hidden',
			},
			sectionTitle: {
				fontSize: '26px',
				fontFamily: 'Quicksand',
				textAlign: 'center',
				color: theme.palette.secondary.main,
				marginBottom: theme.spacing(1.5),
			},
			carouselContainer: {
				width: isMdUp ? '70%' : '90%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: theme.spacing(6),
				overflow: 'hidden'
			},
			carousel: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			},
			carouselText: {
				fontFamily: 'Quicksand',
				fontWeight: 'bold',
				fontSize: isMdUp ? 30 : 20,
				textAlign: 'center',
				marginBottom: theme.spacing(3),
				textAlign: 'center',
			},
			carouselSubtext: {
				fontFamily: 'Quicksand',
				fontWeight: 'bold',
				fontSize: isMdUp ? 20 : 15,
				color: '#32CD32',
				marginBottom: theme.spacing(1),
				textAlign: 'center',
			},
			carouselAdditionalText: {
				fontFamily: 'Quicksand',
				fontWeight: 'bold',
				textAlign: 'center',
			},
			arrow: {
				color: theme.palette.primary.main,
				backgroundColor: theme.palette.secondary.main
			}
		}
	});

	const styles = useStyles();
	const containerRef = useRef(null);
	const [animation, setAnimation] = useState(true);
	const [review, setReview] = useState([]);
	const [reviewIndex, setReviewIndex] = useState(0);
	const [direction, setDirection] = useState('right');

	useEffect(() => {
		const fetchReviews = async () => {
			const res = await axios.get('/api/reviews/');
			setReview(res.data);
		};
		fetchReviews();
	}, []);

	const handleBackwardClick = () => {

		setDirection('left');
		setAnimation(false);

		setTimeout(() => {
			setReviewIndex((prev) => prev === 0 ? review.length - 1 : (prev - 1) % review.length)
			setDirection('right');
			setAnimation(true);
		}, 200);
	}

	const handleForwardClick = () => {

		setDirection('right');
		setAnimation(false);

		setTimeout(() => {
			setReviewIndex((prev) => (prev + 1) % review.length);
			setDirection('left');
			setAnimation(true);
		}, 200);
	}

	return (
		review &&
		<Box className={styles.page}>
			<Box className={styles.sectionTitle}>
				More than 10 tutors and education companies rely on Teachify
			</Box>
			<Box ref={containerRef} className={styles.carouselContainer}>
				<Button
					variant='text'
					color='secondary'
					onClick={() => handleBackwardClick()}
				>
					<KeyboardArrowLeftOutlined />
				</Button>
				<Slide in={animation} direction={direction} container={containerRef.current}>
					<Box className={styles.carousel}>
						<Typography className={styles.carouselText}>{review[reviewIndex]?.review}</Typography>
						<Typography className={styles.carouselSubtext}>{review[reviewIndex]?.firstname} {review[reviewIndex]?.lastname}</Typography>
						<Typography className={styles.carouselAdditionalText}>{review[reviewIndex]?.company}</Typography>
					</Box>
				</Slide>
				<Button
					variant='text'
					color='secondary'
					onClick={() => handleForwardClick()}
				>
					<KeyboardArrowRightOutlined />
				</Button>

			</Box>

		</Box>
	);
};

export default Works;
