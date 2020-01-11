import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./Main.scss";
import { NodeCollectionStore } from './stores/nodes/NodeCollectionStore';
import { StaticTextNodeStore } from './stores/nodes/StaticTextNodeStore';
import { VideoNodeStore } from './stores/nodes/VideoNodeStore';
import { WebsiteNodeStore } from './stores/nodes/WebsiteNodeStore';
import { ImageNodeStore } from './stores/nodes/ImageNodeStore';
import { TextEditorNodeStore } from './stores/nodes/TextEditorNodeStore';
import { WorkspaceView } from './views/workspace/WorkspaceView';
import { WorkspaceStore } from './stores/workspace/WorkspaceStore';


const mainNodeCollection = new NodeCollectionStore({X: 0, Y: 0, isTopLevel: true, GetParentScale: () => 1 });
const mainWorkspace = new WorkspaceStore({ Collections: [mainNodeCollection]})
ReactDOM.render((
    <div>
        <h1>Dash Web</h1>
        <WorkspaceView store={mainWorkspace} />
    </div>), document.getElementById('root'));



// create a bunch of text and video nodes (you probably want to delete this at some point)
let numNodes = 300;
let maxX = 5000;
let maxY = 5000;
let nodes = []

nodes.push(new StaticTextNodeStore({ X: 0, Y: 0, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
nodes.push(new StaticTextNodeStore({ X: 400, Y: 0, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
nodes.push(new WebsiteNodeStore({ X: 400, Y: 400, Title: "Web Node Title", Url: "http://paulbiberstein.me" }));
nodes.push(new WebsiteNodeStore({ X: 0, Y: 400, Title: "My site", Url: "http://paulbiberstein.me" }));
nodes.push(new VideoNodeStore({ X: 0, Y: 800, Title: "Video Node Title", Url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
nodes.push(new ImageNodeStore({ X: 0, Y: 1200, Title: "Image Node Title", Url: "https://paulbiberstein.me/resources/mlchordgen.png" }));
nodes.push(new ImageNodeStore({ X: 400, Y: 1200, Title: "Image Node Title", Url: "https://via.placeholder.com/140x100" }));
nodes.push(new TextEditorNodeStore({ X: 400, Y: 800, Title: "Image Node Title" }));
const nestedNode = new NodeCollectionStore({ X: 800, Y: 400, Width: 1000, Height: 1000, })
const doubleNestedNode = new NodeCollectionStore({ X: 400, Y: 0, Width: 500, Height: 500 })
doubleNestedNode.AddNodes([new StaticTextNodeStore({ X: 0, Y: 0, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" })])
nestedNode.AddNodes([doubleNestedNode])
nestedNode.AddNodes([new StaticTextNodeStore({ X: 0, Y: 0, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" })])
nestedNode.AddNodes([new StaticTextNodeStore({ X: 0, Y: 0, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" })])
nodes.push(new WebsiteNodeStore({ X: 800, Y: 0, Title: "Pdf Node Title", Url: "https://paulbiberstein.me/resources/lorem-ipsum.pdf" }));
nodes.push(nestedNode)

/*
for (let i = 2000; i > 0; i -= 40) {
    nodes.push(new StaticTextNodeStore({ X: i, Y: 20, Width: 20, Title: i.toString()}))
}
/*


/*  
for (let i = 0; i < numNodes; i++) {
    nodes.push(new StaticTextNodeStore({ X: Math.random() * maxX, Y: Math.random() * maxY, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
}
*/


/*
for (let i = 0; i < 20; i++) {
    nodes.push(new VideoNodeStore({ X: Math.random() * maxX, Y: Math.random() * maxY, Title: "Video Node Title", Url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
}
*/

mainNodeCollection.AddNodes(nodes);