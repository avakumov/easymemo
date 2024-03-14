import {
	MDXEditor,
	ChangeCodeMirrorLanguage,
	ConditionalContents,
	InsertCodeBlock,
	InsertSandpack,
	SandpackConfig,
	ShowSandpackInfo,
	codeBlockPlugin,
	codeMirrorPlugin,
	sandpackPlugin,
	toolbarPlugin,
	listsPlugin,
	headingsPlugin,
	diffSourcePlugin,
	DiffSourceToggleWrapper,
	UndoRedo,
	tablePlugin,
	InsertTable,
	frontmatterPlugin,
	InsertFrontmatter,
	//@ts-ignore
} from '@mdxeditor/editor';
import { IconButton } from '@mui/joy';
import SaveIcon from '@mui/icons-material/Save';

import './style.css';

const markdown = `
| foo | bar |
| --- | --- |
| baz | bim |
`;

function App() {
	function saveHandler() {
		console.log('save');
	}
	return (
		<MDXEditor
			markdown={markdown}
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				tablePlugin(),
				codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
				codeMirrorPlugin({
					codeBlockLanguages: { js: 'JavaScript', css: 'CSS', ts: 'TypeScript', html: 'HTML' },
				}),
				frontmatterPlugin(),
				diffSourcePlugin({ diffMarkdown: markdown, viewMode: 'rich-text' }),
				toolbarPlugin({
					toolbarContents: () => (
						<DiffSourceToggleWrapper>
							<UndoRedo />
							<InsertTable />
							<InsertFrontmatter />

							<ConditionalContents
								options={[
									{
										when: (editor: any) => editor?.editorType === 'codeblock',
										contents: () => <ChangeCodeMirrorLanguage />,
									},
									{
										fallback: () => (
											<>
												<InsertCodeBlock />
											</>
										),
									},
								]}
							/>
							<IconButton title='Save' onClick={saveHandler}>
								<SaveIcon />
							</IconButton>
						</DiffSourceToggleWrapper>
					),
				}),
			]}
		/>
	);
}

export default App;
