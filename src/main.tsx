import renderer, {create, tsx} from '@dojo/framework/core/vdom';
import {createMemoryResourceTemplate, createResourceMiddleware} from "@dojo/framework/core/middleware/resources";
import List, {ListOption} from "@dojo/widgets/list";
import icache from "@dojo/framework/core/middleware/icache";

const banana = createResourceMiddleware();
const animals = [{ value: 'cat' }, { value: 'dog' }, { value: 'mouse' }, { value: 'rat' }];
const template = createMemoryResourceTemplate<ListOption>();
const factory = create({ banana, icache })
const Example = factory(({ id, middleware: { banana, icache } }) => {
	const resourceProp = banana({
		initOptions: {
			id: 'resource-1',
			data: animals
		},
		template: template
	});
	return (
		<virtual>
			<List
				resource={resourceProp}
				onValue={(value: string) => {
					icache.set('value', value);
				}}
			/>
			<p>{`Clicked on: ${icache.getOrSet('value', '')}`}</p>
		</virtual>
	);
});

const element = document.getElementById('widget') as HTMLElement;
const r = renderer(() => <Example/>);
r.mount({ domNode: element });
