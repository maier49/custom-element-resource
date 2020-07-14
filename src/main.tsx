import renderer, {create, tsx} from '@dojo/framework/core/vdom';
import {createMemoryResourceTemplate, createResourceMiddleware} from "@dojo/framework/core/middleware/resources";
import List, {ListOption} from "@dojo/widgets/list";
import icache from "@dojo/framework/core/middleware/icache";

const resource = createResourceMiddleware();
const animals = [{ value: 'cat' }, { value: 'dog' }, { value: 'mouse' }, { value: 'rat' }];
const template = createMemoryResourceTemplate<ListOption>();
const factory = create({ resource, icache })
const Example = factory(({ id, middleware: { resource, icache } }) => {
	const resourceProp = resource({
		initOptions: {
			id: 'resource',
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
