'use strict';

import React, { useMemo, useEffect, useState, useRef, memo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Custom Cell Renderer - note we use memo to avoid wasted renders
const RenderCounterCellRenderer = memo( (params) => {
    const renderCountRef = useRef(1);
    return (
          <span className="my-renderer">
              <span className="render-count">({renderCountRef.current++})</span> {params.value} 
          </span>
    );
});

function GridExample() {

    // never changes, so we can use useMemo
    const modules = useMemo( ()=> [ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule], []);

    const gridRef = useRef();

    const columnDefs = useMemo( ()=> [
            { field: 'athlete', cellRendererFramework: RenderCounterCellRenderer },
            { field: 'country', cellRendererFramework: RenderCounterCellRenderer },
            { field: 'gold', cellRendererFramework: RenderCounterCellRenderer },
            { field: 'silver', cellRendererFramework: RenderCounterCellRenderer }
        ], []);

    // never changes, so we can use useMemo
    const defaultColDef = useMemo( ()=> ({
        resizable: true,
        sortable: true,
        flex: 1
    }), []);

    // because row data changes, it needs to be state
    const [rowData, setRowData] = useState();

    // gets called once, no dependencies, loads the grid data
    useEffect( ()=> {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then( resp => resp.json())
            .then( data => setRowData(data.slice(0,10)));
    }, []);

    const onClickIncreaseMedals = useCallback( () => {
        const gridApi = gridRef.current.api;
        gridApi.forEachNode( rowNode => {
            ['gold','silver'].forEach( colId => {
                const currentVal = gridApi.getValue(colId, rowNode);
                rowNode.setDataValue(colId, currentVal + 1);
            });
        });
    });

    return (
        <div className={'parent-div'}>
            <div className="buttons-div">
                <button onClick={onClickIncreaseMedals}>Increase Medals</button>
            </div>
            <div className="grid-div">
                <AgGridReact 
                    ref={gridRef}
                    className="ag-theme-alpine"
                    animateRows="true"
                    modules={modules}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowData={rowData}
                    enableRangeSelection={true}
                />
            </div>
        </div>
    );
}

render(<GridExample></GridExample>, document.querySelector('#root'));
