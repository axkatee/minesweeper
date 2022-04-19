import { 
  Directive, 
  ElementRef, 
  Input, 
  OnChanges,
  OnInit, 
  Renderer2, 
  SimpleChanges 
} from '@angular/core';
import { 
  AcceptedCells,
  Cell, 
  CellClass,
  CellClassType,
  OpenedCell,
  openedCellsTypes
} from '@config';

@Directive({
  selector: '[playFieldCell]'
})
export class PlayFieldCellDirective implements OnInit, OnChanges {
  @Input() cell: AcceptedCells;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.bindClassToElement(CellClass.unopened);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    switch (this.cell) {
      case Cell.unopened:
        this.bindClassToElement(CellClass.unopened);
        break;
      case Cell.zero:
        this.bindClassToElement(CellClass.zero);
        break;
      case Cell.flag:
        this.bindClassToElement(CellClass.flag);
        break;
      default:
        if (this.isCellOpened(this.cell)) {
          this.bindClassToElement(CellClass.opened);
        }
    }
  }

  private isCellOpened(cell: AcceptedCells): cell is OpenedCell {
    return openedCellsTypes.includes(cell as OpenedCell);
  }

  private bindClassToElement(elClass: CellClassType): void {
    if (this.elementRef.nativeElement.classList[1] === CellClass.flag) {
      this.renderer.removeClass(this.elementRef.nativeElement, CellClass.flag)
    }
    this.renderer.addClass(this.elementRef.nativeElement, elClass);
  }

}
