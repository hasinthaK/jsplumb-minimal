import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BrowserJsPlumbInstance,
  newInstance,
  DotEndpoint,
  BezierConnector,
} from '@jsplumb/browser-ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poc-jsplumb',
  templateUrl: './poc-jsplumb.component.html',
  styles: [
    `
    [data-node-num] {
      cursor: pointer;
      // transition: all 0.25s ease-out;
    }`,
    `.active {
        outline: 1px solid #4fa1a5;
        // box-shadow: 0 0 10px 2px #4fa1a5;
    }`,
  ],
})
export class PocJsplumbComponent implements OnInit, OnDestroy {
  @ViewChild('nodeTreeContainer', { static: true })
  nodeContainer!: ElementRef<HTMLDivElement>;

  @ViewChildren('nodeEl')
  nodeList?: QueryList<ElementRef<HTMLDivElement>>;

  private subs = new Subscription();
  private jsPlumbInstance!: BrowserJsPlumbInstance;
  public selectedNode?: number;

  public formGroup!: FormGroup;

  // node tree configuration
  // defines steps & their possible paths
  // TODO: define typings
  public nodeTreeConfig: any = {
    dec_1: {
      id: 1,
      isConfigured: false,
      values: {
        shouldRetain: false,
      },
      goto: [2],
    },
    dec_2: {
      id: 2,
      isConfigured: false,
      values: {
        retainAmount: 0,
      },
      goto: [],
    },
  };

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = fb.group({
      isPathSelected: false,
    });
  }

  ngOnInit(): void {
    this.jsPlumbInstance = newInstance({
      container: this.nodeContainer.nativeElement,
      elementsDraggable: false,
      anchor: 'Continuous',
      connector: {
        type: BezierConnector.type,
        options: {
          curviness: 10,
          cssClass: 'node-connector',
          hoverClass: 'node-connector-hover',
        },
      },
      endpoint: { type: DotEndpoint.type, options: { radius: 3 } },
    });

    this.subs.add(
      this.formGroup
        .get('isPathSelected')
        ?.valueChanges.subscribe((val) => this.onPathSelectionChange(val))
    );
  }

  public onNodeClick(nodeNum: number, event: Event): void {
    event.stopPropagation();
    // open the configurations panel for this nodeNum
    this.selectedNode = nodeNum;
  }

  public onUnselectNode(): void {
    this.selectedNode = undefined;
  }

  private toggleConnection(fromNodeNum: number, toNodeNum: number): void {
    // add connection between nodes
    const source = this.nodeList?.find(
      (item) =>
        item.nativeElement.getAttribute('data-node-num') ==
        fromNodeNum.toString()
    );
    const target = this.nodeList?.find(
      (item) =>
        item.nativeElement.getAttribute('data-node-num') == toNodeNum.toString()
    );
    if (!source || !target) return;

    const connections = this.jsPlumbInstance.getConnections({
      source: source.nativeElement,
      target: target.nativeElement,
    });

    // toggle the connection
    if (connections.length) {
      if (Array.isArray(connections)) {
        connections.forEach((connection) =>
          this.jsPlumbInstance.deleteConnection(connection)
        );
      }
    } else {
      this.jsPlumbInstance.connect(
        {
          source: source.nativeElement,
          target: target.nativeElement,
        },
        {
          color: 'green',
        }
      );
    }
  }

  private onPathSelectionChange(value: boolean): void {
    this.toggleConnection(1, 3);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
