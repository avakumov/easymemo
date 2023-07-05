import { Admin, Resource, Datagrid, List, TextField, DateField, NumberField } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';

const QuestionsList = () => (
	<List>
		<Datagrid>
			<TextField source='id' />
			<TextField source='question' />
			<TextField source='answer' />
			<DateField source='createdAt' locales='en-GB' />
			<NumberField source='viewCount' />
		</Datagrid>
	</List>
);

//TODO move to settings file
const dataProvider = simpleRestProvider('http://localhost:8001');

const AdminPage = () => (
	<Admin dataProvider={dataProvider} basename='/admin'>
		<Resource name='questions' list={QuestionsList} />
	</Admin>
);

export default AdminPage;
