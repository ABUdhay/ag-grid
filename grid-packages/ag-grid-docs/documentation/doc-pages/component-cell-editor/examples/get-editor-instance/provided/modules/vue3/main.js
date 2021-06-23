import {createApp} from 'vue';
import {AgGridVue} from '@ag-grid-community/vue3';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import MySimpleEditor from './mySimpleEditorVue.js';

const VueExample = {
    template: `
      <div style="height: 100%">
          <ag-grid-vue
              style="width: 100%; height: 100%;"
              class="ag-theme-alpine"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="rowData"
              :modules="modules"
              @grid-ready="onGridReady">
          </ag-grid-vue>
      </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        mySimpleEditor: MySimpleEditor
    },
    data: function () {
        return {
            columnDefs: [
                {
                    field: "first_name",
                    headerName: "First Name",
                    width: 120,
                    editable: true
                },
                {
                    field: "last_name",
                    headerName: "Last Name",
                    width: 120,
                    editable: true
                },
                {
                    field: "gender",
                    width: 100,
                    cellEditorFramework: "mySimpleEditor"
                },
                {
                    field: "age",
                    width: 80,
                    cellEditorFramework: "mySimpleEditor"
                },
                {
                    field: "mood",
                    width: 90,
                    cellEditorFramework: "mySimpleEditor"
                },
                {
                    field: "country",
                    width: 110,
                    cellEditorFramework: "mySimpleEditor"
                },
                {
                    field: "address",
                    width: 502,
                    cellEditorFramework: "mySimpleEditor"
                }
            ],
            defaultColDef: {
                editable: true,
                sortable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
                resizable: true
            },
            modules: AllModules,
            rowData: this.createRowData(),
            interval: null
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        onGridReady(params) {
            this.interval = setInterval(() => {
                const instances = params.api.getCellEditorInstances();
                if (instances.length > 0) {
                    const instance = instances[0];
                    if (instance.getFrameworkComponentInstance && instance.getFrameworkComponentInstance().myCustomFunction) {
                        const result = instance.getFrameworkComponentInstance().myCustomFunction();
                        console.log(`found editing cell: row index = ${result.rowIndex}, column = ${result.colId}.`);
                    } else {
                        console.log('found editing cell, but method myCustomFunction not found, must be the default editor.');
                    }
                } else {
                    console.log('found not editing cell.');
                }
            }, 1000);
        },

        createRowData() {
            const cloneObject = obj => JSON.parse(JSON.stringify(obj));
            const students = [
                {
                    first_name: 'Bob',
                    last_name: 'Harrison',
                    gender: 'Male',
                    address: '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
                    mood: 'Happy',
                    country: 'Ireland'
                },
                {
                    first_name: 'Mary',
                    last_name: 'Wilson',
                    gender: 'Female',
                    age: 11,
                    address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
                    mood: 'Sad',
                    country: 'Ireland'
                },
                {
                    first_name: 'Sadiq',
                    last_name: 'Khan',
                    gender: 'Male',
                    age: 12,
                    address: '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
                    mood: 'Happy',
                    country: 'Ireland'
                },
                {
                    first_name: 'Jerry',
                    last_name: 'Mane',
                    gender: 'Male',
                    age: 12,
                    address: '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
                    mood: 'Happy',
                    country: 'Ireland'
                }
            ];
            students.forEach(item => {
                students.push(cloneObject(item));
            });
            students.forEach(item => {
                students.push(cloneObject(item));
            });
            students.forEach(item => {
                students.push(cloneObject(item));
            });
            return students;
        }
    }
}

createApp(VueExample)
    .mount("#app")