var columnDefs = [
    // this row just shows the row index, doesn't use any data from the row
    {headerName: '#', cellRenderer: 'rowNodeIdRenderer'},
    {field: 'athlete', filterParams: {buttons: ['clear', 'reset', 'apply']}},
    {field: 'age', filterParams: {buttons: ['apply', 'cancel']}, enablePivot: true},
    {field: 'country', enableRowGroup: true},
    {field: 'year', filter: 'agNumberColumnFilter'},
    {field: 'date'},
    {
        field: 'sport',
        filter: 'agMultiColumnFilter',
        filterParams: {
            filters: [
                {
                    filter: 'agTextColumnFilter',
                    display: 'accordion'
                },
                {
                    filter: 'agSetColumnFilter',
                    display: 'accordion'
                }
            ]
        }
    },
    {field: 'gold', enableValue: true},
    {field: 'silver', enableValue: true},
    {field: 'bronze', enableValue: true},
    {field: 'total', enableValue: true}
];

var gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true
    },
    components: {
        rowNodeIdRenderer: function (params) {
            return params.node.id + 1;
        }
    },
    sideBar: true,
    statusBar: {
        statusPanels: [
            {statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left'},
            {statusPanel: 'agAggregationComponent'}
        ]
    },
    rowGroupPanelShow: 'always',
    pagination: true,
    paginationPageSize: 500,
    enableRangeSelection: true,
    enableCharts: true,
    localeTextFunc: function (key, defaultValue) {
        switch (key) {
            case 'thousandSeparator':
                return '.';
            case 'decimalSeparator':
                return ',';
            default:
                return defaultValue ? defaultValue.toUpperCase() : '';
        }
    }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(data => gridOptions.api.setRowData(data));
});
