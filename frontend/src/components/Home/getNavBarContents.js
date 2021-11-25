
const getNavBarContents = () => {
	const list =
		[
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
							name: 'Agency',
							path: '/solutions/agency'
						},
						{
							name: 'Commerce',
							path: '/solutions/commerce'
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