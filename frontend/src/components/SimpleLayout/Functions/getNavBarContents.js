
const getNavBarContents = () => {
	const list =
		[
			{
				name: 'Home',
				path: '/'
			},
			{
				name: 'Features',
				path: '/features'
			},
			{
				name: 'Solutions',
				subitems:
					[
						{
							name: 'Tutoring',
							path: '/solutions/tutoring'
						},
						{
							name: 'Test Preparation',
							path: '/solutions/prep'
						},
						{
							name: 'Driving Schools',
							path: '/solutions/music'
						},
						{
							name: 'Music Schools',
							path: '/solutions/driving'
						}
					]
			},
			{
				name: 'Pricing',
				path: '/pricing'
			},
			{
				name: 'Support',
				subitems:
					[
						{
							name: 'Tutorials',
							path: '/support/tutorials'
						},
						{
							name: 'Getting Started Guide',
							path: '/support/getting-started'
						},
						{
							name: 'Knowledge Base',
							path: 'knowledge-base'
						}
					]
			},
			{
				name: 'Sign In',
				path: '/signin'
			}
		]
	return list;
}

export default getNavBarContents;