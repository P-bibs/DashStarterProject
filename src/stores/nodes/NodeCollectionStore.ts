import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { NodeLinkStore } from "../interface_components/NodeLinkStore";
import { NodeType } from "../interface_components/FormItemInfo"
import { ModalStore } from "../interface_components/ModalStore";
import { NodeCreationDropdownStore } from "../interface_components/NodeCreationDropdownStore";
import { NodeCreationModalStore } from "../interface_components/NodeCreationModalStore";
import { CollectionInfoModalStore } from "../interface_components/CollectionInfoModalStore";


export class NodeCollectionStore extends NodeStore {

    constructor(initializer: Partial<NodeCollectionStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Width: number = 600;

    @observable
    public Height: number = 600;

    @observable
    public Scale: number = 1;

    @observable
    public ViewX: number = 0;

    @observable
    public ViewY: number = 0;

    @observable
    public Nodes: NodeStore[] = new Array<NodeStore>();

    @observable 
    public NodeLinks: NodeLinkStore[] = new Array<NodeLinkStore>();

    @observable
    public isTopLevel: Boolean = false;

    @observable
    private CurrentlyLinkingNode: NodeStore = null;

    @observable
    public CurrentDropdown: NodeCreationDropdownStore = null;

    @observable
    public CurrentModal: ModalStore = null;

    @computed
    public get Zoom(): string {
        return "scale(" + this.Scale + "," + this.Scale + ")";
    }

    @computed
    public get Pan(): string {
        return "translate(" + this.ViewX + "px," + this.ViewY + "px)";
    }

    @action
    public AddNodes(stores: NodeStore[]): void {
        stores.forEach((store) => {
            store.GetParentScale = () => this.GetParentScale() * this.Scale
            store.Destroy = (): void => this.RemoveNode(store)
            store.Link = (): void => this.AddNodeLink(store)
            store.HighlightNeighbors = (): void => this.HighlightNodeNeighbors(store)
            store.UndoHighlightNeighbors = (): void => this.ClearNodeHighlighting()
            if (store instanceof NodeCollectionStore) {
                // Allow nested collections to manipulate parent dropdown and modal
                store.CreateDropdown = (x: number, y: number, collection: NodeCollectionStore): void => this.CreateDropdown(x,y,collection)
                store.CreateInfoModal = (collection: NodeCollectionStore): void => this.CreateInfoModal(collection)
                store.HideDropdown = (): void => this.HideDropdown()
            }
            this.Nodes.push(store)
        });
    }

    @action
    public RemoveNode(storeToRemove: NodeStore): void {
        this.Nodes = this.Nodes.filter((store) => store != storeToRemove)
        this.NodeLinks = this.NodeLinks.filter(
            (link) => storeToRemove != link.Pair[0] && storeToRemove != link.Pair[1]
        )
    }

    @action
    public AddNodeLink(store: NodeStore): void {
        if (this.CurrentlyLinkingNode == null) {
            this.CurrentlyLinkingNode = store
            this.CurrentlyLinkingNode.IsCurrentlyLinking = true
        } else {
            if (store == this.CurrentlyLinkingNode) {
                // Deselect current node if user clicks it again
                this.CurrentlyLinkingNode.IsCurrentlyLinking = false
                this.CurrentlyLinkingNode = null
            } else {
                let newNodeLink = new NodeLinkStore({ Pair: [this.CurrentlyLinkingNode, store] })
                newNodeLink.Destroy = (): void => this.RemoveNodeLink(newNodeLink)
                this.NodeLinks.push(newNodeLink)
                this.CurrentlyLinkingNode.IsCurrentlyLinking = false
                this.CurrentlyLinkingNode = null
            }
        }
    }

    @action
    public RemoveNodeLink(linkToRemove: NodeLinkStore): void {
        this.NodeLinks = this.NodeLinks.filter((link) => link != linkToRemove)
    }

    @action
    public HighlightNodeNeighbors(store: NodeStore): void {
        this.Nodes.forEach((node) => {
            if (this.NodeLinks.some( (nodeLink) => nodeLink.ConnectsNodes(store, node) )) {
                node.Highlighted = true
            }
        })
    }
    
    @action
    public ClearNodeHighlighting(): void {
        this.Nodes.forEach((node) => node.Highlighted = false)
    }

    @action
    public CreateDropdown(x: number, y: number, collection: NodeCollectionStore ) {
        if (this.isTopLevel) {
            this.CurrentDropdown = new NodeCreationDropdownStore(x, y, collection, this)
        } else {
            // nested collections should always create dropdowns on their top-most parent
            throw new Error("Dropdowns should only be created on top-level stores")
        }        
    }

    @action
    public HideDropdown() {
        this.CurrentDropdown = null;
    }

    @action
    public CreateNodeCreationModal(x: number, y: number, collection: NodeCollectionStore, container: NodeCollectionStore, nodeType: NodeType) {
        const newModal = new NodeCreationModalStore(x, y, collection, container, nodeType);
        this.CurrentModal = newModal
    }

    @action
    public CreateInfoModal(collection: NodeCollectionStore) {
        if (this.isTopLevel) {
            this.CurrentModal = new CollectionInfoModalStore(collection, this);
        } else {
            // nested collections should always create modals on their top-most parent
            throw new Error("Modals should only be created on top-level stores")
        }
    }

    @action
    public HideModal() {
        this.CurrentModal = null;
    }

    @action
    HandleZoom (event: React.WheelEvent): void {
        // Logic to implement zoom-in at mouse-location
        event.stopPropagation()
        this.HideDropdown();
        // Calculate the click's location on the canvas
        let absoluteX = (event.pageX - this.ViewX) / this.Scale
        let absoluteY = (event.pageY - this.ViewY) / this.Scale
        // bound deltaY on either side
        event.deltaY = Math.max(-3, Math.min(3, event.deltaY)) 
        let zoomDelta = this.Scale * event.deltaY * -.01;
        let oldScale = this.Scale
        let newScale = this.Scale + zoomDelta
        // Create a slightly different normalization factor if zooming out than in
        let normalizationFactor = 1/ (zoomDelta > 0 ? newScale : oldScale)

        // Calculate offset
        let offsetX = event.pageX/(newScale*normalizationFactor) - event.pageX/(oldScale*normalizationFactor)
        // Convert offset to scaled coordinate system
        offsetX *= (zoomDelta > 0 ? newScale : oldScale) 
        // Account for zooming on negative side of axis
        if (absoluteX < 0) offsetX *= -1

        let offsetY = event.pageY/(newScale*normalizationFactor) - event.pageY/(oldScale*normalizationFactor)
        offsetY *= (zoomDelta > 0 ? newScale : oldScale)
        if (absoluteY < 0) offsetY *= -1

        this.Scale = newScale
        if (this.isTopLevel) {
            // TODO: fix zooming for nested collections
            // this.ViewX += offsetX
            // this.ViewY += offsetY
        }
    }

}