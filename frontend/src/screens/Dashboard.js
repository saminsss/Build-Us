import { Box, Container, Grid } from '@material-ui/core';
import Budget from '../components/Dashboard/Budget';
import Transactions from '../components/Dashboard/Transactions'
// import LatestOrders from '../components/Dashboard/LatestOrders';
// import LatestProducts from '../components/Dashboard/LatestProducts';
// import Sales from '../components/Dashboard/Sales';
// import TasksProgress from '../components/Dashboard/TasksProgress';
// import TotalCustomers from '../components/Dashboard/TotalCustomers';
// import TotalProfit from '../components/Dashboard/TotalProfit';
// import TrafficByDevice from '../components/Dashboard/TrafficByDevice';

const Dashboard = () => (
	<Box
		sx={{
			height: '100vh',
		}}
	>
		<Box sx={{
			py: 3,
		}}>
			<Container>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						<Budget />
					</Grid>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						{/* <TotalCustomers /> */}
					</Grid>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						{/* <TasksProgress /> */}
					</Grid>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						{/* <TotalProfit sx={{ height: '100%' }} /> */}
					</Grid>
					<Grid
						item
						xl={6}
						lg={6}
						md={8}
						xs={12}
					>
						<Transactions />
					</Grid>
				</Grid>
			</Container>
		</Box>

	</Box>
);

export default Dashboard;